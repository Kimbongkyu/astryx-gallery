import {Component, useEffect, useMemo, useState, type ReactNode} from 'react';
import {BY_NAME, ENTRIES, GROUPS, NO_DEMO_REASON, docsUrl, searchEntries, type Entry} from './registry';
import {DEMOS, buildCode, defaultValues, type Control, type Values} from './demos';
import {Badge} from '@astryxdesign/core/Badge';
import {Button} from '@astryxdesign/core/Button';
import {ClickableCard} from '@astryxdesign/core/ClickableCard';
import {HStack} from '@astryxdesign/core/HStack';
import {IconButton} from '@astryxdesign/core/IconButton';
import {Text} from '@astryxdesign/core/Text';
import {TextInput} from '@astryxdesign/core/TextInput';
import {VStack} from '@astryxdesign/core/VStack';
import {useFavorites} from './favorites';

/* ---------- 주소(#) 라우팅 ---------- */

type Route =
  | {view: 'all'}
  | {view: 'fav'}
  | {view: 'group'; id: string}
  | {view: 'comp'; name: string};

function parseHash(hash: string): Route {
  const parts = hash.replace(/^#\/?/, '').split('/');
  if (parts[0] === 'c' && parts[1] && BY_NAME[parts[1]]) return {view: 'comp', name: parts[1]};
  if (parts[0] === 'g' && GROUPS.some((g) => g.id === parts[1])) return {view: 'group', id: parts[1]};
  if (parts[0] === 'fav') return {view: 'fav'};
  return {view: 'all'};
}

function useRoute(): Route {
  const [hash, setHash] = useState(() => window.location.hash);
  useEffect(() => {
    const onChange = () => {
      setHash(window.location.hash);
      window.scrollTo({top: 0});
    };
    window.addEventListener('hashchange', onChange);
    return () => window.removeEventListener('hashchange', onChange);
  }, []);
  return useMemo(() => parseHash(hash), [hash]);
}

/* ---------- 미리보기가 깨져도 화면 전체가 죽지 않게 ---------- */

class PreviewBoundary extends Component<{children: ReactNode}, {error: string | null}> {
  state = {error: null as string | null};
  static getDerivedStateFromError(e: unknown) {
    return {error: e instanceof Error ? e.message : String(e)};
  }
  render() {
    if (this.state.error) {
      return (
        <p className="gx-error">
          이 속성 조합은 미리보기를 그리지 못했어요.
          <br />
          <small>{this.state.error}</small>
        </p>
      );
    }
    return this.props.children;
  }
}

/* ---------- 작은 부품들 ---------- */

async function copyText(text: string): Promise<boolean> {
  try {
    await navigator.clipboard.writeText(text);
    return true;
  } catch {
    try {
      const ta = document.createElement('textarea');
      ta.value = text;
      ta.style.position = 'fixed';
      ta.style.opacity = '0';
      document.body.appendChild(ta);
      ta.select();
      const ok = document.execCommand('copy');
      document.body.removeChild(ta);
      return ok;
    } catch {
      return false;
    }
  }
}

function CopyButton({text, label = '복사'}: {text: string; label?: string}) {
  const [done, setDone] = useState(false);
  return (
    <button
      type="button"
      className="gx-btn"
      onClick={async () => {
        const ok = await copyText(text);
        setDone(ok);
        window.setTimeout(() => setDone(false), 1500);
      }}
    >
      {done ? '복사됨' : label}
    </button>
  );
}

function Star({
  on,
  onClick,
  name,
  className,
}: {
  on: boolean;
  onClick: () => void;
  name: string;
  className?: string;
}) {
  return (
    <IconButton
      className={className}
      label={`${name} 즐겨찾기 ${on ? '해제' : '추가'}`}
      icon={
        <span aria-hidden="true" className={on ? 'gx-glyph on' : 'gx-glyph'}>
          {on ? '★' : '☆'}
        </span>
      }
      variant="ghost"
      onClick={onClick}
    />
  );
}

type FavApi = ReturnType<typeof useFavorites>;

function Card({entry, fav}: {entry: Entry; fav: FavApi}) {
  const on = fav.favs.includes(entry.name);
  return (
    <li className="gx-card">
      <ClickableCard
        label={`${entry.ko} (${entry.name}) 자세히 보기`}
        onClick={() => {
          window.location.hash = `#/c/${entry.name}`;
        }}
        padding={3}
        width="100%"
      >
        <VStack gap={1} className="gx-card-text">
          <HStack gap={2} align="center">
            <Text type="body" weight="bold" as="div">
              {entry.ko}
            </Text>
            {DEMOS[entry.name] && <Badge label="바로 해보기" variant="success" />}
          </HStack>
          <Text type="supporting" color="secondary" as="div">
            {entry.name}
          </Text>
          <Text type="supporting" color="secondary" as="div">
            {entry.desc}
          </Text>
        </VStack>
      </ClickableCard>
      <Star
        className="gx-card-star"
        on={on}
        onClick={() => fav.toggle(entry.name)}
        name={entry.ko}
      />
    </li>
  );
}

function CardList({entries, fav}: {entries: Entry[]; fav: FavApi}) {
  if (!entries.length) return <p className="gx-empty">해당하는 컴포넌트가 없어요.</p>;
  return (
    <ul className="gx-cards">
      {entries.map((e) => (
        <Card key={e.name} entry={e} fav={fav} />
      ))}
    </ul>
  );
}

/* ---------- 속성 조절 패널 ---------- */

function ControlRow({
  c,
  value,
  onChange,
}: {
  c: Control;
  value: string | boolean | number;
  onChange: (v: string | boolean | number) => void;
}) {
  const id = `ctl-${c.key}`;
  return (
    <div className="gx-ctl">
      <label htmlFor={id}>{c.label}</label>
      {c.kind === 'bool' && (
        <input
          id={id}
          type="checkbox"
          checked={value === true}
          onChange={(e) => onChange(e.target.checked)}
        />
      )}
      {c.kind === 'text' && (
        <input
          id={id}
          type="text"
          value={String(value)}
          onChange={(e) => onChange(e.target.value)}
        />
      )}
      {c.kind === 'number' && (
        <input
          id={id}
          type="number"
          inputMode="numeric"
          min={c.min}
          max={c.max}
          step={c.step ?? 1}
          value={Number(value)}
          onChange={(e) => onChange(Number(e.target.value))}
        />
      )}
      {c.kind === 'select' && (
        <select id={id} value={String(value)} onChange={(e) => onChange(e.target.value)}>
          {c.options.map((o) => (
            <option key={o} value={o}>
              {o}
            </option>
          ))}
        </select>
      )}
    </div>
  );
}

function Playground({name}: {name: string}) {
  const demo = DEMOS[name];
  const [values, setValues] = useState<Values>(() => defaultValues(demo));
  const code = buildCode(name, demo, values);
  const {Preview} = demo;
  return (
    <section className="gx-play">
      <div className="gx-stage">
        <PreviewBoundary key={JSON.stringify(values)}>
          <Preview v={values} />
        </PreviewBoundary>
      </div>
      {demo.note && <p className="gx-demo-note">{demo.note}</p>}
      {demo.controls.length > 0 && (
      <div className="gx-panel">
        <div className="gx-panel-head">
          <h3>속성 조절</h3>
          <button
            type="button"
            className="gx-btn"
            onClick={() => setValues(defaultValues(demo))}
          >
            처음으로
          </button>
        </div>
        {demo.controls.map((c) => (
          <ControlRow
            key={c.key}
            c={c}
            value={values[c.key]}
            onChange={(v) => setValues((prev) => ({...prev, [c.key]: v}))}
          />
        ))}
      </div>
      )}
      <div className="gx-code">
        <div className="gx-panel-head">
          <h3>코드</h3>
          <CopyButton text={code} label="코드 복사" />
        </div>
        <pre>
          <code>{code}</code>
        </pre>
      </div>
    </section>
  );
}

/* ---------- 상세 화면 ---------- */

function Detail({name, fav}: {name: string; fav: FavApi}) {
  const e = BY_NAME[name];
  const group = GROUPS.find((g) => g.id === e.group)!;
  const hasDemo = Boolean(DEMOS[name]);
  const siblings = ENTRIES.filter((x) => x.group === e.group && x.name !== name);
  const cli = `npx @astryxdesign/cli component ${name}`;
  return (
    <article>
      <a className="gx-back" href={`#/g/${group.id}`}>
        ← {group.label}
      </a>
      <header className="gx-detail-head">
        <div>
          <h1>{e.ko}</h1>
          <p className="gx-en">{e.name}</p>
        </div>
        <Star
          on={fav.favs.includes(name)}
          onClick={() => fav.toggle(name)}
          name={e.ko}
        />
      </header>
      <p className="gx-desc">{e.desc}</p>
      {e.guess && (
        <p className="gx-note">
          이 설명은 이름을 보고 쓴 거라 정확하지 않을 수 있어요. 공식 문서로 확인해 주세요.
        </p>
      )}

      {hasDemo ? (
        <Playground key={name} name={name} />
      ) : (
        <section className="gx-nodemo">
          <h3>바로 해보기가 없는 컴포넌트예요</h3>
          <p>
            {NO_DEMO_REASON[name] ??
              '아직 미리보기를 만들지 못했어요. 아래 명령으로 사용법을 볼 수 있어요.'}
          </p>
        </section>
      )}

      <section className="gx-howto">
        <h3>가져다 쓰기</h3>
        <pre>
          <code>{`import {...} from '@astryxdesign/core/${name}';`}</code>
        </pre>
        <div className="gx-row">
          <code className="gx-cli">{cli}</code>
          <CopyButton text={cli} label="명령 복사" />
        </div>
        <p>
          <a href={docsUrl(name)} target="_blank" rel="noreferrer">
            공식 문서 열기 ↗
          </a>
          <small> (주소가 열리지 않으면 공식 사이트의 컴포넌트 목록에서 찾아주세요)</small>
        </p>
      </section>

      {siblings.length > 0 && (
        <section>
          <h3>같은 그룹의 다른 컴포넌트</h3>
          <div className="gx-chips">
            {siblings.map((s) => (
              <a key={s.name} className="gx-chip" href={`#/c/${s.name}`}>
                {s.ko}
              </a>
            ))}
          </div>
        </section>
      )}
    </article>
  );
}

/* ---------- 즐겨찾기 백업/복원 ---------- */

function FavTools({fav}: {fav: FavApi}) {
  const [text, setText] = useState('');
  const [msg, setMsg] = useState('');
  const exportText = `astryx:${fav.favs.join(',')}`;
  return (
    <details className="gx-tools">
      <summary>폰↔PC로 즐겨찾기 옮기기</summary>
      <p>즐겨찾기는 이 기기의 브라우저에만 저장돼요. 다른 기기로 옮기려면 복사해서 붙여넣으세요.</p>
      <div className="gx-row">
        <CopyButton text={exportText} label="내 즐겨찾기 복사" />
      </div>
      <textarea
        rows={2}
        placeholder="다른 기기에서 복사한 내용을 붙여넣기"
        value={text}
        onChange={(e) => setText(e.target.value)}
      />
      <button
        type="button"
        className="gx-btn"
        onClick={() => {
          const body = text.trim().replace(/^astryx:/, '');
          const names = body
            .split(/[,\s]+/)
            .filter((n) => BY_NAME[n]);
          fav.merge(names);
          setMsg(`${names.length}개를 가져왔어요.`);
          setText('');
        }}
      >
        가져오기
      </button>
      {msg && <p className="gx-ok">{msg}</p>}
    </details>
  );
}

/* ---------- 앱 ---------- */

export function App() {
  const route = useRoute();
  const fav = useFavorites();
  const [query, setQuery] = useState('');
  const [sideOpen, setSideOpen] = useState(false);

  // 화면을 이동하면 검색어를 비우고 메뉴를 닫는다
  useEffect(() => {
    setQuery('');
    setSideOpen(false);
  }, [route]);

  const searching = query.trim().length > 0;
  const results = useMemo(() => searchEntries(ENTRIES, query), [query]);
  const favEntries = useMemo(
    () => ENTRIES.filter((e) => fav.favs.includes(e.name)),
    [fav.favs],
  );

  let main: ReactNode;
  if (searching) {
    main = (
      <>
        <h2 className="gx-h">검색 결과 {results.length}개</h2>
        <CardList entries={results} fav={fav} />
      </>
    );
  } else if (route.view === 'comp') {
    main = <Detail key={route.name} name={route.name} fav={fav} />;
  } else if (route.view === 'fav') {
    main = (
      <>
        <h2 className="gx-h">★ 즐겨찾기 {favEntries.length}개</h2>
        {favEntries.length === 0 ? (
          <p className="gx-empty">
            마음에 드는 컴포넌트의 ☆를 누르면 여기에 모여요. 나중에 요청할 때 이름을 그대로 알려주면 돼요.
          </p>
        ) : (
          <CardList entries={favEntries} fav={fav} />
        )}
        <FavTools fav={fav} />
      </>
    );
  } else if (route.view === 'group') {
    const g = GROUPS.find((x) => x.id === route.id)!;
    main = (
      <>
        <h2 className="gx-h">{g.label}</h2>
        <p className="gx-hint">{g.hint}</p>
        <CardList entries={ENTRIES.filter((e) => e.group === g.id)} fav={fav} />
      </>
    );
  } else {
    main = (
      <>
        <h2 className="gx-h">전체 {ENTRIES.length}개</h2>
        <p className="gx-hint">
          그룹별로 둘러보거나 위에서 검색하세요. 「바로 해보기」가 붙은 건 화면에서 속성을 바꿔볼 수 있어요.
        </p>
        {GROUPS.map((g) => {
          const list = ENTRIES.filter((e) => e.group === g.id);
          if (!list.length) return null;
          return (
            <section key={g.id} className="gx-section">
              <h3>
                <a href={`#/g/${g.id}`}>{g.label}</a> <small>{list.length}</small>
              </h3>
              <CardList entries={list} fav={fav} />
            </section>
          );
        })}
      </>
    );
  }

  const activeGroup = route.view === 'group' ? route.id : route.view === 'comp' ? BY_NAME[route.name].group : '';

  return (
    <div className="gx">
      <header className="gx-top">
        <IconButton
          className="gx-menu"
          label="그룹 메뉴 열기"
          icon={<span aria-hidden="true">☰</span>}
          variant="ghost"
          onClick={() => setSideOpen((o) => !o)}
        />
        <a className="gx-title" href="#/">
          Astryx 둘러보기
        </a>
        <div className="gx-search">
          <TextInput
            label="컴포넌트 검색"
            isLabelHidden
            type="search"
            value={query}
            onChange={(next) => setQuery(next)}
            placeholder="검색 (예: 팝업, 탭, 날짜)"
            hasClear
            width="100%"
          />
        </div>
        <Button
          label={`★ ${fav.favs.length}`}
          variant="ghost"
          href="#/fav"
          tooltip="즐겨찾기 보기"
        />
      </header>

      <div className="gx-body">
        <nav className={sideOpen ? 'gx-side open' : 'gx-side'} aria-label="컴포넌트 그룹">
          <a className={route.view === 'all' ? 'on' : ''} href="#/">
            전체 <small>{ENTRIES.length}</small>
          </a>
          <a className={route.view === 'fav' ? 'on' : ''} href="#/fav">
            ★ 즐겨찾기 <small>{fav.favs.length}</small>
          </a>
          <hr />
          {GROUPS.map((g) => (
            <a key={g.id} className={activeGroup === g.id ? 'on' : ''} href={`#/g/${g.id}`}>
              {g.label} <small>{ENTRIES.filter((e) => e.group === g.id).length}</small>
            </a>
          ))}
        </nav>
        {sideOpen && <div className="gx-backdrop" onClick={() => setSideOpen(false)} />}
        <main className="gx-main">{main}</main>
      </div>
    </div>
  );
}

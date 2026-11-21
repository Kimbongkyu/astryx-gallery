import {BY_NAME, ENTRIES, GROUPS, NO_DEMO_REASON, docsUrl} from '../registry';
import {DEMOS} from '../demos';
import {Playground} from './Playground';
import {CopyButton, Star, type FavApi} from './shared';

/* ---------- 상세 화면 ---------- */

export function Detail({name, fav}: {name: string; fav: FavApi}) {
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


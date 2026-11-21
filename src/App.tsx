import {useEffect, useMemo, useState, type ReactNode} from 'react';
import {Button} from '@astryxdesign/core/Button';
import {IconButton} from '@astryxdesign/core/IconButton';
import {TextInput} from '@astryxdesign/core/TextInput';
import {BY_NAME, ENTRIES, GROUPS, searchEntries} from './registry';
import {useFavorites} from './favorites';
import {Detail} from './components/Detail';
import {FavTools} from './components/FavTools';
import {CardList} from './components/Lists';
import {Sidebar} from './components/Sidebar';

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
        <Sidebar
          view={route.view}
          activeGroup={activeGroup}
          favCount={fav.favs.length}
          isOpen={sideOpen}
          onOpenChange={setSideOpen}
        />
        <main className="gx-main">{main}</main>
      </div>
    </div>
  );
}

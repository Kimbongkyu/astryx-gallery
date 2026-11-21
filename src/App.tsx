import {useEffect, useMemo, useRef, useState, type ReactNode} from 'react';
import {Button} from '@astryxdesign/core/Button';
import {IconButton} from '@astryxdesign/core/IconButton';
import {Badge} from '@astryxdesign/core/Badge';
import {Heading} from '@astryxdesign/core/Heading';
import {Link} from '@astryxdesign/core/Link';
import {Text} from '@astryxdesign/core/Text';
import {HStack} from '@astryxdesign/core/HStack';
import {VStack} from '@astryxdesign/core/VStack';
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

type ListRoute = Exclude<Route, {view: 'comp'}>;

function routeHash(r: ListRoute): string {
  if (r.view === 'group') return `#/g/${r.id}`;
  if (r.view === 'fav') return '#/fav';
  return '#/';
}

function routeLabel(r: ListRoute): string {
  if (r.view === 'group') return GROUPS.find((g) => g.id === r.id)?.label ?? '목록';
  if (r.view === 'fav') return '즐겨찾기';
  return '전체';
}

function useRoute(): Route {
  const [hash, setHash] = useState(() => window.location.hash);
  useEffect(() => {
    const onChange = () => setHash(window.location.hash);
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

  // 상세에서 돌아갈 목록(전체/그룹/즐겨찾기)을 기억한다
  const [lastList, setLastList] = useState<ListRoute | null>(null);
  useEffect(() => {
    if (route.view !== 'comp') setLastList(route);
  }, [route]);

  // 스크롤: 상세로 가면 맨 위, 상세에서 목록으로 돌아오면 방금 보던 카드로 이동
  const prevRoute = useRef<Route | null>(null);
  useEffect(() => {
    const prev = prevRoute.current;
    prevRoute.current = route;
    if (prev === route) return;
    if (route.view !== 'comp' && prev?.view === 'comp') {
      const id = `card-${prev.name}`;
      const goto = () => document.getElementById(id)?.scrollIntoView({block: 'center'});
      if (document.getElementById(id)) {
        goto();
        requestAnimationFrame(goto); // 레이아웃이 자리 잡은 뒤 한 번 더
        return;
      }
    }
    window.scrollTo({top: 0});
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
      <VStack gap={3}>
        <Heading level={2}>검색 결과 {results.length}개</Heading>
        <CardList entries={results} fav={fav} />
      </VStack>
    );
  } else if (route.view === 'comp') {
    const g = GROUPS.find((x) => x.id === BY_NAME[route.name].group)!;
    const back: ListRoute = lastList ?? {view: 'group', id: g.id};
    main = (
      <Detail
        key={route.name}
        name={route.name}
        fav={fav}
        backHref={routeHash(back)}
        backLabel={routeLabel(back)}
      />
    );
  } else if (route.view === 'fav') {
    main = (
      <VStack gap={3}>
        <Heading level={2}>★ 즐겨찾기 {favEntries.length}개</Heading>
        {favEntries.length === 0 ? (
          <Text type="body" color="secondary">
            마음에 드는 컴포넌트의 ☆를 누르면 여기에 모여요. 나중에 요청할 때 이름을 그대로 알려주면 돼요.
          </Text>
        ) : (
          <CardList entries={favEntries} fav={fav} />
        )}
        <FavTools fav={fav} />
      </VStack>
    );
  } else if (route.view === 'group') {
    const g = GROUPS.find((x) => x.id === route.id)!;
    main = (
      <VStack gap={3}>
        <Heading level={2}>{g.label}</Heading>
        <Text type="body" color="secondary">
          {g.hint}
        </Text>
        <CardList entries={ENTRIES.filter((e) => e.group === g.id)} fav={fav} />
      </VStack>
    );
  } else {
    main = (
      <VStack gap={4}>
        <Heading level={2}>전체 {ENTRIES.length}개</Heading>
        <Text type="body" color="secondary">
          그룹별로 둘러보거나 위에서 검색하세요. 「바로 해보기」가 붙은 건 화면에서 속성을 바꿔볼 수 있어요.
        </Text>
        {GROUPS.map((g) => {
          const list = ENTRIES.filter((e) => e.group === g.id);
          if (!list.length) return null;
          return (
            <VStack key={g.id} gap={3}>
              <HStack gap={2} align="center">
                <Heading level={3}>
                  <Link href={`#/g/${g.id}`} color="primary">{g.label}</Link>
                </Heading>
                <Badge label={String(list.length)} />
              </HStack>
              <CardList entries={list} fav={fav} />
            </VStack>
          );
        })}
      </VStack>
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
        <Link href="#/" color="primary" className="gx-title">
          <Text weight="bold">Astryx 둘러보기</Text>
        </Link>
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

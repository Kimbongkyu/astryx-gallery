import {ENTRIES, GROUPS} from '../registry';

type Props = {
  view: 'all' | 'fav' | 'group' | 'comp';
  activeGroup: string; // 현재 보고 있는 그룹 id (없으면 빈 문자열)
  favCount: number;
  isOpen: boolean; // 모바일에서 그룹 메뉴가 열려 있는지
  onOpenChange: (open: boolean) => void;
};

// 그룹 메뉴. 넓은 화면에서는 왼쪽에 항상 보이고, 폰에서는 ☰ 로 여는 서랍이다.
export function Sidebar({view, activeGroup, favCount, isOpen, onOpenChange}: Props) {
  return (
    <>
      <nav className={isOpen ? 'gx-side open' : 'gx-side'} aria-label="컴포넌트 그룹">
        <a className={view === 'all' ? 'on' : ''} href="#/">
          전체 <small>{ENTRIES.length}</small>
        </a>
        <a className={view === 'fav' ? 'on' : ''} href="#/fav">
          ★ 즐겨찾기 <small>{favCount}</small>
        </a>
        <hr />
        {GROUPS.map((g) => (
          <a key={g.id} className={activeGroup === g.id ? 'on' : ''} href={`#/g/${g.id}`}>
            {g.label} <small>{ENTRIES.filter((e) => e.group === g.id).length}</small>
          </a>
        ))}
      </nav>
      {isOpen && <div className="gx-backdrop" onClick={() => onOpenChange(false)} />}
    </>
  );
}

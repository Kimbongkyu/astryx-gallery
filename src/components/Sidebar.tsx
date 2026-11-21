import {useEffect, useState} from 'react';
import {Badge} from '@astryxdesign/core/Badge';
import {Divider} from '@astryxdesign/core/Divider';
import {Drawer, DrawerHeader} from '@astryxdesign/core/Drawer';
import {SideNav, SideNavItem} from '@astryxdesign/core/SideNav';
import {ENTRIES, GROUPS} from '../registry';

type Props = {
  view: 'all' | 'fav' | 'group' | 'comp';
  activeGroup: string; // 현재 보고 있는 그룹 id (없으면 빈 문자열)
  favCount: number;
  isOpen: boolean; // 모바일에서 그룹 메뉴가 열려 있는지
  onOpenChange: (open: boolean) => void;
};

const MOBILE_QUERY = '(max-width: 767px)';

// 폰 화면 여부. 화면 크기가 바뀌면 따라 바뀐다.
function useIsMobile(): boolean {
  const get = () => typeof window !== 'undefined' && typeof window.matchMedia === 'function' && window.matchMedia(MOBILE_QUERY).matches;
  const [isMobile, setIsMobile] = useState(get);
  useEffect(() => {
    if (typeof window === 'undefined' || typeof window.matchMedia !== 'function') return;
    const mq = window.matchMedia(MOBILE_QUERY);
    const onChange = () => setIsMobile(mq.matches);
    onChange();
    mq.addEventListener('change', onChange);
    return () => mq.removeEventListener('change', onChange);
  }, []);
  return isMobile;
}

// 그룹 메뉴. 넓은 화면에서는 왼쪽에 항상 보이고, 폰에서는 ☰ 로 여는 서랍이다.
export function Sidebar({view, activeGroup, favCount, isOpen, onOpenChange}: Props) {
  const isMobile = useIsMobile();
  const close = () => onOpenChange(false);

  const nav = (
    <SideNav>
      <SideNavItem
        label="전체"
        href="#/"
        isSelected={view === 'all'}
        endContent={<Badge label={String(ENTRIES.length)} />}
        onClick={close}
      />
      <SideNavItem
        label="★ 즐겨찾기"
        href="#/fav"
        isSelected={view === 'fav'}
        endContent={<Badge label={String(favCount)} />}
        onClick={close}
      />
      <Divider />
      {GROUPS.map((g) => (
        <SideNavItem
          key={g.id}
          label={g.label}
          href={`#/g/${g.id}`}
          isSelected={activeGroup === g.id}
          endContent={<Badge label={String(ENTRIES.filter((e) => e.group === g.id).length)} />}
          onClick={close}
        />
      ))}
    </SideNav>
  );

  if (isMobile) {
    return (
      <Drawer isOpen={isOpen} onOpenChange={onOpenChange} side="start" label="컴포넌트 그룹" width={280} padding={0}>
        <DrawerHeader title="그룹" onOpenChange={onOpenChange} />
        {nav}
      </Drawer>
    );
  }
  return <div className="gx-side-desktop">{nav}</div>;
}

import {useState} from 'react';
import type {CSSProperties, ReactNode} from 'react';
import {AspectRatio} from '@astryxdesign/core/AspectRatio';
import {BreadcrumbItem, Breadcrumbs} from '@astryxdesign/core/Breadcrumbs';
import {Button} from '@astryxdesign/core/Button';
import {Center} from '@astryxdesign/core/Center';
import {FormLayout} from '@astryxdesign/core/FormLayout';
import {Grid} from '@astryxdesign/core/Grid';
import {HStack} from '@astryxdesign/core/HStack';
import {Icon} from '@astryxdesign/core/Icon';
import {Layout, LayoutContent, LayoutFooter, LayoutHeader} from '@astryxdesign/core/Layout';
import {Link} from '@astryxdesign/core/Link';
import {MobileNav} from '@astryxdesign/core/MobileNav';
import {NavIcon} from '@astryxdesign/core/NavIcon';
import {Outline} from '@astryxdesign/core/Outline';
import {Pagination} from '@astryxdesign/core/Pagination';
import {ScrollableArea} from '@astryxdesign/core/ScrollableArea';
import {Section} from '@astryxdesign/core/Section';
import {SideNav, SideNavHeading, SideNavItem, SideNavSection} from '@astryxdesign/core/SideNav';
import {Stack} from '@astryxdesign/core/Stack';
import {Step, Stepper} from '@astryxdesign/core/Stepper';
import {TextInput} from '@astryxdesign/core/TextInput';
import {TopNav, TopNavHeading, TopNavItem} from '@astryxdesign/core/TopNav';
import {VStack} from '@astryxdesign/core/VStack';

import type {Demo, Values} from '../demoTypes';
import {b, s} from '../demoTypes';

const GAPS = ['0', '1', '2', '3', '4', '6', '8'];
const PADS = ['0', '1', '2', '4', '6', '8'];

function Block({children, color = '#6366f1', style}: {children?: ReactNode; color?: string; style?: CSSProperties}) {
  return (
    <div
      style={{
        background: color,
        color: '#fff',
        borderRadius: 6,
        padding: '8px 14px',
        fontSize: 13,
        minWidth: 48,
        textAlign: 'center',
        ...style,
      }}
    >
      {children}
    </div>
  );
}

const COLORS = ['#6366f1', '#0ea5e9', '#10b981', '#f59e0b', '#ef4444'];

function Blocks({n = 3}: {n?: number}) {
  return (
    <>
      {Array.from({length: n}, (_, i) => (
        <Block key={i} color={COLORS[i % COLORS.length]} style={{height: i === 1 ? 56 : undefined}}>
          {i + 1}
        </Block>
      ))}
    </>
  );
}

function BreadcrumbsPreview({v}: {v: Values}) {
  return (
    <Breadcrumbs
      separator={s(v.separator)}
      variant={s(v.variant) as 'default'}
      label="경로"
    >
      <BreadcrumbItem href="#home">홈</BreadcrumbItem>
      <BreadcrumbItem href="#customers">고객</BreadcrumbItem>
      <BreadcrumbItem href="#accounts">거래처</BreadcrumbItem>
      <BreadcrumbItem isCurrent>(주)글로벌캐스</BreadcrumbItem>
    </Breadcrumbs>
  );
}

const OUTLINE_ITEMS = [
  {id: 'intro', label: '소개', level: 1},
  {id: 'features', label: '주요 기능', level: 1},
  {id: 'accounts', label: '거래처 관리', level: 2},
  {id: 'contacts', label: '연락처 관리', level: 2},
  {id: 'api', label: 'API 안내', level: 1},
];

function OutlinePreview({v}: {v: Values}) {
  const [active, setActive] = useState('intro');
  return (
    <Outline
      items={OUTLINE_ITEMS}
      activeId={active}
      onActiveIdChange={setActive}
      density={s(v.density) as 'default'}
      hasScrollOnClick={false}
      label="목차"
    />
  );
}

function PaginationPreview({v}: {v: Values}) {
  const [page, setPage] = useState(1);
  return (
    <Pagination
      page={page}
      onChange={setPage}
      totalItems={Number(v.totalItems)}
      pageSize={10}
      variant={s(v.variant) as 'pages'}
      size={s(v.size) as 'md'}
      isDisabled={b(v.isDisabled)}
    />
  );
}

function SideNavPreview({v}: {v: Values}) {
  const [sel, setSel] = useState('거래처');
  const names = ['홈', '거래처', '연락처', '영업기회'];
  return (
    <div style={{height: 320, display: 'flex'}}>
      <SideNav
        collapsible={b(v.collapsible)}
        header={<SideNavHeading heading="글로벌캐스 CRM" subheading="영업팀" />}
      >
        <SideNavSection title="고객">
          {names.map((n) => (
            <SideNavItem key={n} label={n} isSelected={sel === n} onClick={() => setSel(n)} />
          ))}
        </SideNavSection>
        <SideNavSection title="설정">
          <SideNavItem label="사용자" onClick={() => setSel('사용자')} isSelected={sel === '사용자'} />
          <SideNavItem label="권한" isDisabled />
        </SideNavSection>
      </SideNav>
    </div>
  );
}

function StepperPreview({v}: {v: Values}) {
  const [active, setActive] = useState(1);
  return (
    <Stepper
      activeStep={active}
      onStepClick={setActive}
      orientation={s(v.orientation) as 'horizontal'}
      density={s(v.density) as 'balanced'}
      label="진행 단계"
    >
      <Step step={0} label="1단계" description="기본 정보" />
      <Step step={1} label="2단계" description="담당자 지정" />
      <Step step={2} label="3단계" description="검토" isOptional={b(v.isOptional)} />
    </Stepper>
  );
}

function TopNavPreview({v}: {v: Values}) {
  const [sel, setSel] = useState('거래처');
  return (
    <TopNav
      label="주 메뉴"
      heading={<TopNavHeading heading={s(v.heading)} headingHref="#" />}
      startContent={
        <>
          {['홈', '거래처', '연락처'].map((n) => (
            <TopNavItem key={n} label={n} href="#" isSelected={sel === n} onClick={() => setSel(n)} />
          ))}
        </>
      }
      endContent={<Button label="검색" variant="ghost" />}
    />
  );
}

function MobileNavPreview({v}: {v: Values}) {
  const [open, setOpen] = useState(false);
  return (
    <>
      <Button label="메뉴 열기" onClick={() => setOpen(true)} />
      <MobileNav
        isOpen={open}
        onOpenChange={setOpen}
        header={s(v.header)}
        side={s(v.side) as 'start'}
        width={Number(v.width)}
      >
        <SideNavItem label="홈" href="#" isSelected />
        <SideNavItem label="거래처" href="#" />
        <SideNavItem label="연락처" href="#" />
      </MobileNav>
    </>
  );
}

function NavIconPreview({v}: {v: Values}) {
  return <NavIcon icon={<Icon icon={s(v.icon)} />} />;
}

function LinkPreview({v}: {v: Values}) {
  return (
    <Link
      href="#docs"
      hasUnderline={b(v.hasUnderline)}
      isDisabled={b(v.isDisabled)}
      color={s(v.color) as 'accent'}
    >
      {s(v.text)}
    </Link>
  );
}

function StackPreview({v}: {v: Values}) {
  return (
    <Stack
      direction={s(v.direction) as 'vertical'}
      gap={Number(v.gap) as 2}
      align={s(v.align) as 'start'}
      wrap={b(v.wrap) ? 'wrap' : 'nowrap'}
    >
      <Blocks n={4} />
    </Stack>
  );
}

function HStackPreview({v}: {v: Values}) {
  return (
    <div style={{width: '100%'}}>
      <HStack gap={Number(v.gap) as 2} align={s(v.align) as 'center'} justify={s(v.justify) as 'start'}>
        <Blocks n={3} />
      </HStack>
    </div>
  );
}

function VStackPreview({v}: {v: Values}) {
  return (
    <VStack gap={Number(v.gap) as 2} align={s(v.align) as 'stretch'}>
      <Blocks n={3} />
    </VStack>
  );
}

function GridPreview({v}: {v: Values}) {
  return (
    <Grid columns={Number(v.columns)} gap={Number(v.gap) as 2}>
      <Blocks n={6} />
    </Grid>
  );
}

function CenterPreview({v}: {v: Values}) {
  return (
    <div style={{width: 320, border: '1px dashed #94a3b8'}}>
      <Center axis={s(v.axis) as 'both'} height={180} width={320}>
        <Block>가운데</Block>
      </Center>
    </div>
  );
}

function LayoutPreview({v}: {v: Values}) {
  return (
    <div style={{height: 260, border: '1px solid #cbd5e1', borderRadius: 8, overflow: 'hidden'}}>
      <Layout
        header={<LayoutHeader hasDivider={b(v.hasDivider)}>거래처 상세</LayoutHeader>}
        content={<LayoutContent>본문 영역입니다.</LayoutContent>}
        footer={<LayoutFooter>푸터 영역</LayoutFooter>}
      />
    </div>
  );
}

function ScrollableAreaPreview({v}: {v: Values}) {
  return (
    <ScrollableArea label="활동 내역" height={Number(v.height)} width={320} padding={Number(v.padding) as 2}>
      {Array.from({length: 20}, (_, i) => (
        <p key={i} style={{margin: '0 0 8px'}}>
          {i + 1}번째 활동 내역
        </p>
      ))}
    </ScrollableArea>
  );
}

function SectionPreview({v}: {v: Values}) {
  return (
    <Section variant={s(v.variant) as 'section'} padding={Number(v.padding) as 4} width={320}>
      거래처 정보를 담는 섹션입니다.
    </Section>
  );
}

function FormLayoutPreview({v}: {v: Values}) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  return (
    <FormLayout direction={s(v.direction) as 'vertical'}>
      <TextInput label="거래처명" value={name} onChange={setName} />
      <TextInput label="이메일" value={email} onChange={setEmail} />
    </FormLayout>
  );
}

function AspectRatioPreview({v}: {v: Values}) {
  const [w, h] = s(v.ratio).split(':').map(Number);
  return (
    <div style={{width: 280}}>
      <AspectRatio ratio={w / h} shape={s(v.shape) as 'rectangle'} fit="cover">
        <div style={{background: 'linear-gradient(135deg,#6366f1,#0ea5e9)', color: '#fff', width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
          {s(v.ratio)}
        </div>
      </AspectRatio>
    </div>
  );
}

export const DEMOS_NAV_LAYOUT: Record<string, Demo> = {
  Breadcrumbs: {
    tag: 'Breadcrumbs',
    controls: [
      {kind: 'text', key: 'separator', label: 'separator', default: '/'},
      {kind: 'select', key: 'variant', label: 'variant', options: ['default', 'supporting'], default: 'default'},
    ],
    Preview: BreadcrumbsPreview,
    code: (v) => `import {Breadcrumbs, BreadcrumbItem} from '@astryxdesign/core/Breadcrumbs';

<Breadcrumbs separator="${s(v.separator)}" variant="${s(v.variant)}">
  <BreadcrumbItem href="/">홈</BreadcrumbItem>
  <BreadcrumbItem href="/customers">고객</BreadcrumbItem>
  <BreadcrumbItem href="/accounts">거래처</BreadcrumbItem>
  <BreadcrumbItem isCurrent>(주)글로벌캐스</BreadcrumbItem>
</Breadcrumbs>`,
  },
  Outline: {
    tag: 'Outline',
    controls: [{kind: 'select', key: 'density', label: 'density', options: ['default', 'compact'], default: 'default'}],
    Preview: OutlinePreview,
    code: (v) => `import {Outline} from '@astryxdesign/core/Outline';

<Outline
  items={[
    {id: 'intro', label: '소개', level: 1},
    {id: 'accounts', label: '거래처 관리', level: 2},
  ]}
  density="${s(v.density)}"
/>`,
    note: '생략하면 스크롤 위치에 따라 활성 항목이 바뀝니다. 여기서는 activeId로 제어합니다.',
  },
  Pagination: {
    tag: 'Pagination',
    controls: [
      {kind: 'select', key: 'variant', label: 'variant', options: ['pages', 'count', 'compact', 'dots', 'input', 'none'], default: 'pages'},
      {kind: 'select', key: 'size', label: 'size', options: ['sm', 'md'], default: 'md'},
      {kind: 'number', key: 'totalItems', label: 'totalItems', default: 200, min: 10, max: 1000, step: 10},
      {kind: 'bool', key: 'isDisabled', label: 'isDisabled', default: false},
    ],
    Preview: PaginationPreview,
    extra: 'page={page}\nonChange={setPage}\npageSize={10}',
  },
  SideNav: {
    tag: 'SideNav',
    controls: [{kind: 'bool', key: 'collapsible', label: 'collapsible', default: false}],
    Preview: SideNavPreview,
    code: (v) => `import {SideNav, SideNavHeading, SideNavSection, SideNavItem} from '@astryxdesign/core/SideNav';

<SideNav
  collapsible={${b(v.collapsible)}}
  header={<SideNavHeading heading="글로벌캐스 CRM" subheading="영업팀" />}
>
  <SideNavSection title="고객">
    <SideNavItem label="홈" />
    <SideNavItem label="거래처" isSelected />
    <SideNavItem label="연락처" />
  </SideNavSection>
</SideNav>`,
  },
  Stepper: {
    tag: 'Stepper',
    controls: [
      {kind: 'select', key: 'orientation', label: 'orientation', options: ['horizontal', 'vertical'], default: 'horizontal'},
      {kind: 'select', key: 'density', label: 'density', options: ['compact', 'balanced', 'spacious'], default: 'balanced'},
      {kind: 'bool', key: 'isOptional', label: '3단계 isOptional', default: false},
    ],
    Preview: StepperPreview,
    code: (v) => `import {Stepper, Step} from '@astryxdesign/core/Stepper';

<Stepper
  activeStep={activeStep}
  onStepClick={setActiveStep}
  orientation="${s(v.orientation)}"
  density="${s(v.density)}"
>
  <Step step={0} label="1단계" description="기본 정보" />
  <Step step={1} label="2단계" description="담당자 지정" />
  <Step step={2} label="3단계" description="검토"${b(v.isOptional) ? ' isOptional' : ''} />
</Stepper>`,
  },
  TopNav: {
    tag: 'TopNav',
    controls: [{kind: 'text', key: 'heading', label: 'heading', default: '글로벌캐스 CRM'}],
    Preview: TopNavPreview,
    code: (v) => `import {TopNav, TopNavHeading, TopNavItem} from '@astryxdesign/core/TopNav';

<TopNav
  label="주 메뉴"
  heading={<TopNavHeading heading="${s(v.heading)}" headingHref="/" />}
  startContent={
    <>
      <TopNavItem label="홈" href="/" />
      <TopNavItem label="거래처" href="/accounts" isSelected />
    </>
  }
  endContent={<Button label="검색" variant="ghost" />}
/>`,
  },
  MobileNav: {
    tag: 'MobileNav',
    controls: [
      {kind: 'text', key: 'header', label: 'header', default: '메뉴'},
      {kind: 'select', key: 'side', label: 'side', options: ['start', 'end', 'auto'], default: 'start'},
      {kind: 'number', key: 'width', label: 'width', default: 320, min: 200, max: 480, step: 20},
    ],
    Preview: MobileNavPreview,
    code: (v) => `import {MobileNav} from '@astryxdesign/core/MobileNav';
import {SideNavItem} from '@astryxdesign/core/SideNav';

<MobileNav
  isOpen={isOpen}
  onOpenChange={setIsOpen}
  header="${s(v.header)}"
  side="${s(v.side)}"
  width={${Number(v.width)}}
>
  <SideNavItem label="홈" href="/" />
  <SideNavItem label="거래처" href="/accounts" />
</MobileNav>`,
  },
  NavIcon: {
    tag: 'NavIcon',
    controls: [{kind: 'select', key: 'icon', label: 'icon', options: ['info', 'success', 'search', 'close'], default: 'info'}],
    Preview: NavIconPreview,
    code: (v) => `import {NavIcon} from '@astryxdesign/core/NavIcon';
import {Icon} from '@astryxdesign/core/Icon';

<NavIcon icon={<Icon icon="${s(v.icon)}" />} />`,
  },
  Link: {
    tag: 'Link',
    controls: [
      {kind: 'text', key: 'text', label: 'children', default: '문서 보기'},
      {kind: 'bool', key: 'hasUnderline', label: 'hasUnderline', default: false},
      {kind: 'bool', key: 'isDisabled', label: 'isDisabled', default: false},
      {kind: 'select', key: 'color', label: 'color', options: ['accent', 'primary', 'secondary'], default: 'accent'},
    ],
    Preview: LinkPreview,
    code: (v) =>
      `import {Link} from '@astryxdesign/core/Link';

<Link href="/docs" color="${s(v.color)}"${b(v.hasUnderline) ? ' hasUnderline' : ''}${b(v.isDisabled) ? ' isDisabled' : ''}>${s(v.text)}</Link>`,
  },
  Stack: {
    tag: 'Stack',
    controls: [
      {kind: 'select', key: 'direction', label: 'direction', options: ['vertical', 'horizontal'], default: 'vertical'},
      {kind: 'select', key: 'gap', label: 'gap', options: GAPS, default: '2'},
      {kind: 'select', key: 'align', label: 'align', options: ['start', 'center', 'end', 'stretch'], default: 'start'},
      {kind: 'bool', key: 'wrap', label: 'wrap', default: false},
    ],
    Preview: StackPreview,
    code: (v) => `import {Stack} from '@astryxdesign/core/Stack';

<Stack direction="${s(v.direction)}" gap={${s(v.gap)}} align="${s(v.align)}"${b(v.wrap) ? ' wrap="wrap"' : ''}>
  <Item />
  <Item />
</Stack>`,
  },
  HStack: {
    tag: 'HStack',
    controls: [
      {kind: 'select', key: 'gap', label: 'gap', options: GAPS, default: '2'},
      {kind: 'select', key: 'align', label: 'align', options: ['start', 'center', 'end', 'stretch'], default: 'center'},
      {kind: 'select', key: 'justify', label: 'justify', options: ['start', 'center', 'end', 'between', 'around', 'evenly'], default: 'start'},
    ],
    Preview: HStackPreview,
    code: (v) => `import {HStack} from '@astryxdesign/core/HStack';

<HStack gap={${s(v.gap)}} align="${s(v.align)}" justify="${s(v.justify)}">
  <Item />
  <Item />
</HStack>`,
  },
  VStack: {
    tag: 'VStack',
    controls: [
      {kind: 'select', key: 'gap', label: 'gap', options: GAPS, default: '2'},
      {kind: 'select', key: 'align', label: 'align', options: ['start', 'center', 'end', 'stretch'], default: 'stretch'},
    ],
    Preview: VStackPreview,
    code: (v) => `import {VStack} from '@astryxdesign/core/VStack';

<VStack gap={${s(v.gap)}} align="${s(v.align)}">
  <Item />
  <Item />
</VStack>`,
  },
  Grid: {
    tag: 'Grid',
    controls: [
      {kind: 'number', key: 'columns', label: 'columns', default: 3, min: 1, max: 6},
      {kind: 'select', key: 'gap', label: 'gap', options: GAPS, default: '2'},
    ],
    Preview: GridPreview,
    code: (v) => `import {Grid} from '@astryxdesign/core/Grid';

<Grid columns={${Number(v.columns)}} gap={${s(v.gap)}}>
  <Item />
  <Item />
  <Item />
</Grid>`,
  },
  Center: {
    tag: 'Center',
    controls: [{kind: 'select', key: 'axis', label: 'axis', options: ['both', 'horizontal', 'vertical'], default: 'both'}],
    Preview: CenterPreview,
    code: (v) => `import {Center} from '@astryxdesign/core/Center';

<Center axis="${s(v.axis)}" width={320} height={180}>
  <Content />
</Center>`,
  },
  Layout: {
    tag: 'Layout',
    controls: [{kind: 'bool', key: 'hasDivider', label: 'header hasDivider', default: true}],
    Preview: LayoutPreview,
    code: (v) => `import {Layout, LayoutHeader, LayoutContent, LayoutFooter} from '@astryxdesign/core/Layout';

<Layout
  header={<LayoutHeader${b(v.hasDivider) ? ' hasDivider' : ''}>거래처 상세</LayoutHeader>}
  content={<LayoutContent>본문 영역입니다.</LayoutContent>}
  footer={<LayoutFooter>푸터 영역</LayoutFooter>}
/>`,
  },
  ScrollableArea: {
    tag: 'ScrollableArea',
    controls: [
      {kind: 'number', key: 'height', label: 'height', default: 160, min: 80, max: 300, step: 20},
      {kind: 'select', key: 'padding', label: 'padding', options: PADS, default: '2'},
    ],
    Preview: ScrollableAreaPreview,
    code: (v) => `import {ScrollableArea} from '@astryxdesign/core/ScrollableArea';

<ScrollableArea label="활동 내역" height={${Number(v.height)}} padding={${s(v.padding)}}>
  <ActivityList />
</ScrollableArea>`,
  },
  Section: {
    tag: 'Section',
    controls: [
      {kind: 'select', key: 'variant', label: 'variant', options: ['section', 'transparent', 'muted'], default: 'section'},
      {kind: 'select', key: 'padding', label: 'padding', options: PADS, default: '4'},
    ],
    Preview: SectionPreview,
    code: (v) => `import {Section} from '@astryxdesign/core/Section';

<Section variant="${s(v.variant)}" padding={${s(v.padding)}}>
  거래처 정보를 담는 섹션입니다.
</Section>`,
  },
  FormLayout: {
    tag: 'FormLayout',
    controls: [
      {kind: 'select', key: 'direction', label: 'direction', options: ['vertical', 'horizontal', 'horizontal-labels'], default: 'vertical'},
    ],
    Preview: FormLayoutPreview,
    code: (v) => `import {FormLayout} from '@astryxdesign/core/FormLayout';
import {TextInput} from '@astryxdesign/core/TextInput';

<FormLayout direction="${s(v.direction)}">
  <TextInput label="거래처명" value={name} onChange={setName} />
  <TextInput label="이메일" value={email} onChange={setEmail} />
</FormLayout>`,
  },
  AspectRatio: {
    tag: 'AspectRatio',
    controls: [
      {kind: 'select', key: 'ratio', label: 'ratio', options: ['16:9', '4:3', '1:1', '3:4'], default: '16:9'},
      {kind: 'select', key: 'shape', label: 'shape', options: ['rectangle', 'ellipse'], default: 'rectangle'},
    ],
    Preview: AspectRatioPreview,
    code: (v) => {
      const [w, h] = s(v.ratio).split(':');
      return `import {AspectRatio} from '@astryxdesign/core/AspectRatio';

<AspectRatio ratio={${w} / ${h}} shape="${s(v.shape)}" fit="cover">
  <img src="image.jpg" alt="" />
</AspectRatio>`;
    },
  },
};

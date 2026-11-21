import {useState} from 'react';
import {Avatar} from '@astryxdesign/core/Avatar';
import {Button} from '@astryxdesign/core/Button';
import {Card} from '@astryxdesign/core/Card';
import {CheckboxInput} from '@astryxdesign/core/CheckboxInput';
import {Dialog, DialogHeader} from '@astryxdesign/core/Dialog';
import {Divider} from '@astryxdesign/core/Divider';
import {Icon} from '@astryxdesign/core/Icon';
import {IconButton} from '@astryxdesign/core/IconButton';
import {Layout, LayoutContent, LayoutFooter} from '@astryxdesign/core/Layout';
import {RadioList, RadioListItem} from '@astryxdesign/core/RadioList';
import {SegmentedControl, SegmentedControlItem} from '@astryxdesign/core/SegmentedControl';
import {Selector} from '@astryxdesign/core/Selector';
import {Tab, TabList} from '@astryxdesign/core/TabList';
import {Tooltip} from '@astryxdesign/core/Tooltip';
import type {Demo, Values} from '../demoTypes';
import {b, s} from '../demoTypes';

const ICON_NAMES = ['search', 'close', 'info', 'success'];

/* ---------- IconButton ---------- */
function IconButtonPreview({v}: {v: Values}) {
  return (
    <IconButton
      label={s(v.label)}
      icon={<Icon icon={s(v.icon)} />}
      variant={s(v.variant) as 'ghost'}
      size={s(v.size) as 'md'}
      isDisabled={b(v.isDisabled)}
    />
  );
}

/* ---------- Icon ---------- */
function IconPreview({v}: {v: Values}) {
  return (
    <Icon
      icon={s(v.icon)}
      size={s(v.size) as 'md'}
      label={v.label ? s(v.label) : undefined}
    />
  );
}

/* ---------- Card ---------- */
function CardPreview({v}: {v: Values}) {
  return (
    <Card
      variant={s(v.variant) as 'default'}
      elevation={s(v.elevation) as 'none'}
      padding={Number(v.padding) as 4}
      width={Number(v.width)}
    >
      <span>{s(v.text)}</span>
    </Card>
  );
}

/* ---------- Avatar ---------- */
function AvatarPreview({v}: {v: Values}) {
  return (
    <Avatar
      name={s(v.name)}
      size={s(v.size) as 'md'}
      shape={s(v.shape) as 'circle'}
    />
  );
}

/* ---------- Tooltip ---------- */
function TooltipPreview({v}: {v: Values}) {
  return (
    <Tooltip content={s(v.content)} isEnabled={!b(v.isOff)}>
      <Button label="여기에 올려보세요" />
    </Tooltip>
  );
}

/* ---------- Dialog ---------- */
function DialogPreview({v}: {v: Values}) {
  const [open, setOpen] = useState(false);
  return (
    <>
      <Button label="대화상자 열기" variant="primary" onClick={() => setOpen(true)} />
      <Dialog
        isOpen={open}
        onOpenChange={(next) => setOpen(next)}
        purpose={s(v.purpose) as 'info'}
        width={Number(v.width)}
      >
        <Layout
          header={<DialogHeader title={s(v.title)} onOpenChange={(next) => setOpen(next)} />}
          content={<LayoutContent>{s(v.body)}</LayoutContent>}
          footer={
            <LayoutFooter hasDivider>
              <Button label="닫기" onClick={() => setOpen(false)} />
            </LayoutFooter>
          }
        />
      </Dialog>
    </>
  );
}

/* ---------- Selector ---------- */
const FRUITS = ['사과', '바나나', '오렌지', '포도', '딸기'];

function SelectorPreview({v}: {v: Values}) {
  const [value, setValue] = useState('');
  return (
    <Selector
      label={s(v.label)}
      options={FRUITS}
      value={value}
      onChange={(next: string) => setValue(next)}
      placeholder={s(v.placeholder)}
      size={s(v.size) as 'md'}
      variant={s(v.variant) as 'input'}
      hasSearch={b(v.hasSearch)}
      isDisabled={b(v.isDisabled)}
    />
  );
}

/* ---------- CheckboxInput ---------- */
function CheckboxPreview({v}: {v: Values}) {
  const [on, setOn] = useState(false);
  return (
    <CheckboxInput
      label={s(v.label)}
      description={v.description ? s(v.description) : undefined}
      value={b(v.isIndeterminate) ? 'indeterminate' : on}
      onChange={(checked) => setOn(checked)}
      size={s(v.size) as 'md'}
      isDisabled={b(v.isDisabled)}
    />
  );
}

/* ---------- RadioList ---------- */
function RadioPreview({v}: {v: Values}) {
  const [value, setValue] = useState('email');
  return (
    <RadioList
      label={s(v.label)}
      value={value}
      onChange={(next) => setValue(next)}
      orientation={s(v.orientation) as 'vertical'}
      size={s(v.size) as 'md'}
      isDisabled={b(v.isDisabled)}
    >
      <RadioListItem value="email" label="이메일" />
      <RadioListItem value="sms" label="문자" />
      <RadioListItem value="push" label="앱 알림" />
    </RadioList>
  );
}

/* ---------- SegmentedControl ---------- */
function SegmentedPreview({v}: {v: Values}) {
  const [view, setView] = useState('list');
  return (
    <SegmentedControl
      label="보기 방식"
      value={view}
      onChange={(next) => setView(next)}
      layout={s(v.layout) as 'hug'}
      isDisabled={b(v.isDisabled)}
    >
      <SegmentedControlItem value="list" label="목록" />
      <SegmentedControlItem value="card" label="카드" />
      <SegmentedControlItem value="table" label="표" />
    </SegmentedControl>
  );
}

/* ---------- TabList ---------- */
function TabsPreview({v}: {v: Values}) {
  const [tab, setTab] = useState('home');
  const names: Record<string, string> = {home: '홈', settings: '설정', alerts: '알림'};
  return (
    <div style={{width: '100%', maxWidth: 360}}>
      <TabList
        value={tab}
        onChange={(next) => setTab(next)}
        size={s(v.size) as 'md'}
        layout={s(v.layout) as 'hug'}
        hasDivider={b(v.hasDivider)}
      >
        <Tab value="home" label="홈" />
        <Tab value="settings" label="설정" />
        <Tab value="alerts" label="알림" />
      </TabList>
      <p style={{marginTop: 12}}>선택한 탭: {names[tab]}</p>
    </div>
  );
}

/* ---------- Divider ---------- */
function DividerPreview({v}: {v: Values}) {
  const vertical = s(v.orientation) === 'vertical';
  return (
    <div
      style={
        vertical
          ? {height: 80, display: 'flex', alignItems: 'stretch'}
          : {width: '100%', maxWidth: 320}
      }
    >
      <Divider
        orientation={s(v.orientation) as 'horizontal'}
        label={v.label ? s(v.label) : undefined}
        variant={s(v.variant) as 'subtle'}
      />
    </div>
  );
}

export const DEMOS_MINE: Record<string, Demo> = {
  IconButton: {
    tag: 'IconButton',
    Preview: IconButtonPreview,
    controls: [
      {kind: 'text', key: 'label', label: '이름(접근성)', default: '검색'},
      {kind: 'select', key: 'icon', label: '아이콘', options: ICON_NAMES, default: 'search'},
      {
        kind: 'select',
        key: 'variant',
        label: '종류',
        options: ['ghost', 'secondary', 'primary', 'destructive'],
        default: 'ghost',
      },
      {kind: 'select', key: 'size', label: '크기', options: ['sm', 'md', 'lg'], default: 'md'},
      {kind: 'bool', key: 'isDisabled', label: '비활성', default: false},
    ],
    code: (v) =>
      `import {IconButton} from '@astryxdesign/core/IconButton';\nimport {Icon} from '@astryxdesign/core/Icon';\n\n<IconButton label="${s(v.label)}" icon={<Icon icon="${s(v.icon)}" />} variant="${s(v.variant)}" size="${s(v.size)}"${b(v.isDisabled) ? ' isDisabled' : ''} />`,
  },
  Icon: {
    tag: 'Icon',
    Preview: IconPreview,
    controls: [
      {kind: 'select', key: 'icon', label: '아이콘', options: ICON_NAMES, default: 'search'},
      {kind: 'select', key: 'size', label: '크기', options: ['xsm', 'sm', 'md', 'lg'], default: 'lg'},
      {kind: 'text', key: 'label', label: '설명(접근성)', default: ''},
    ],
    note: '여기서는 기본 이름(search, close, info, success)만 보여줘요.',
  },
  Card: {
    tag: 'Card',
    Preview: CardPreview,
    controls: [
      {kind: 'text', key: 'text', label: '안에 넣을 글', default: '카드 안의 내용입니다.'},
      {
        kind: 'select',
        key: 'variant',
        label: '배경',
        options: ['default', 'muted', 'transparent', 'blue', 'green', 'orange', 'pink', 'purple', 'red', 'yellow'],
        default: 'default',
      },
      {kind: 'select', key: 'elevation', label: '그림자', options: ['none', 'low', 'med', 'high'], default: 'low'},
      {kind: 'select', key: 'padding', label: '안쪽 여백', options: ['1', '2', '3', '4', '6', '8'], default: '4'},
      {kind: 'number', key: 'width', label: '너비(px)', default: 280, min: 160, max: 400, step: 20},
    ],
    code: (v) =>
      `import {Card} from '@astryxdesign/core/Card';\n\n<Card variant="${s(v.variant)}" elevation="${s(v.elevation)}" padding={${s(v.padding)}} width={${s(v.width)}}>\n  ${s(v.text)}\n</Card>`,
  },
  Avatar: {
    tag: 'Avatar',
    Preview: AvatarPreview,
    controls: [
      {kind: 'text', key: 'name', label: '이름', default: '김봉규'},
      {kind: 'select', key: 'size', label: '크기', options: ['xsm', 'sm', 'md', 'lg', 'xl'], default: 'lg'},
      {kind: 'select', key: 'shape', label: '모양', options: ['circle', 'rounded', 'square'], default: 'circle'},
    ],
    note: '사진(src)이 없으면 이름의 이니셜이 나와요.',
  },
  Tooltip: {
    tag: 'Tooltip',
    Preview: TooltipPreview,
    controls: [
      {kind: 'text', key: 'content', label: '설명 글', default: '저장하면 바로 반영돼요'},
      {kind: 'bool', key: 'isOff', label: '끄기', default: false},
    ],
    code: (v) =>
      `import {Tooltip} from '@astryxdesign/core/Tooltip';\nimport {Button} from '@astryxdesign/core/Button';\n\n<Tooltip content="${s(v.content)}">\n  <Button label="저장" />\n</Tooltip>`,
    note: '폰에서는 눌러서 볼 수 있어요.',
  },
  Dialog: {
    tag: 'Dialog',
    Preview: DialogPreview,
    controls: [
      {kind: 'text', key: 'title', label: '제목', default: '삭제할까요?'},
      {kind: 'text', key: 'body', label: '내용', default: '삭제하면 되돌릴 수 없어요.'},
      {
        kind: 'select',
        key: 'purpose',
        label: '닫기 방식',
        options: ['info', 'form', 'required'],
        default: 'info',
      },
      {kind: 'number', key: 'width', label: '너비(px)', default: 400, min: 240, max: 640, step: 20},
    ],
    code: (v) =>
      `import {useState} from 'react';\nimport {Dialog, DialogHeader} from '@astryxdesign/core/Dialog';\nimport {Layout, LayoutContent, LayoutFooter} from '@astryxdesign/core/Layout';\nimport {Button} from '@astryxdesign/core/Button';\n\nconst [isOpen, setIsOpen] = useState(false);\n\n<Button label="열기" onClick={() => setIsOpen(true)} />\n<Dialog isOpen={isOpen} onOpenChange={setIsOpen} purpose="${s(v.purpose)}" width={${s(v.width)}}>\n  <Layout\n    header={<DialogHeader title="${s(v.title)}" onOpenChange={setIsOpen} />}\n    content={<LayoutContent>${s(v.body)}</LayoutContent>}\n    footer={<LayoutFooter hasDivider><Button label="닫기" onClick={() => setIsOpen(false)} /></LayoutFooter>}\n  />\n</Dialog>`,
    note: "'필수'(required)는 안의 버튼으로만 닫혀요.",
  },
  Selector: {
    tag: 'Selector',
    Preview: SelectorPreview,
    extra: "options={['사과', '바나나', '오렌지']} value={fruit} onChange={setFruit}",
    controls: [
      {kind: 'text', key: 'label', label: '라벨', default: '과일'},
      {kind: 'text', key: 'placeholder', label: '안내 문구', default: '과일을 고르세요'},
      {kind: 'select', key: 'size', label: '크기', options: ['sm', 'md', 'lg'], default: 'md'},
      {kind: 'select', key: 'variant', label: '모양', options: ['input', 'secondary', 'ghost'], default: 'input'},
      {kind: 'bool', key: 'hasSearch', label: '검색창', default: false},
      {kind: 'bool', key: 'isDisabled', label: '비활성', default: false},
    ],
  },
  CheckboxInput: {
    tag: 'CheckboxInput',
    Preview: CheckboxPreview,
    extra: 'value={checked} onChange={setChecked}',
    controls: [
      {kind: 'text', key: 'label', label: '라벨', default: '약관에 동의합니다'},
      {kind: 'text', key: 'description', label: '설명', default: ''},
      {kind: 'select', key: 'size', label: '크기', options: ['sm', 'md'], default: 'md'},
      {kind: 'bool', key: 'isIndeterminate', label: '일부 선택 표시', default: false},
      {kind: 'bool', key: 'isDisabled', label: '비활성', default: false},
    ],
  },
  RadioList: {
    tag: 'RadioList',
    Preview: RadioPreview,
    controls: [
      {kind: 'text', key: 'label', label: '그룹 이름', default: '알림 방식'},
      {kind: 'select', key: 'orientation', label: '배치', options: ['vertical', 'horizontal'], default: 'vertical'},
      {kind: 'select', key: 'size', label: '크기', options: ['sm', 'md'], default: 'md'},
      {kind: 'bool', key: 'isDisabled', label: '비활성', default: false},
    ],
    code: (v) =>
      `import {RadioList, RadioListItem} from '@astryxdesign/core/RadioList';\n\n<RadioList label="${s(v.label)}" value={value} onChange={setValue} orientation="${s(v.orientation)}" size="${s(v.size)}"${b(v.isDisabled) ? ' isDisabled' : ''}>\n  <RadioListItem value="email" label="이메일" />\n  <RadioListItem value="sms" label="문자" />\n  <RadioListItem value="push" label="앱 알림" />\n</RadioList>`,
  },
  SegmentedControl: {
    tag: 'SegmentedControl',
    Preview: SegmentedPreview,
    controls: [
      {kind: 'select', key: 'layout', label: '너비', options: ['hug', 'fill'], default: 'hug'},
      {kind: 'bool', key: 'isDisabled', label: '비활성', default: false},
    ],
    code: (v) =>
      `import {SegmentedControl, SegmentedControlItem} from '@astryxdesign/core/SegmentedControl';\n\n<SegmentedControl label="보기 방식" value={view} onChange={setView} layout="${s(v.layout)}"${b(v.isDisabled) ? ' isDisabled' : ''}>\n  <SegmentedControlItem value="list" label="목록" />\n  <SegmentedControlItem value="card" label="카드" />\n  <SegmentedControlItem value="table" label="표" />\n</SegmentedControl>`,
  },
  TabList: {
    tag: 'TabList',
    Preview: TabsPreview,
    controls: [
      {kind: 'select', key: 'size', label: '크기', options: ['sm', 'md', 'lg'], default: 'md'},
      {kind: 'select', key: 'layout', label: '너비', options: ['hug', 'fill'], default: 'hug'},
      {kind: 'bool', key: 'hasDivider', label: '아래 구분선', default: true},
    ],
    code: (v) =>
      `import {TabList, Tab} from '@astryxdesign/core/TabList';\n\n<TabList value={tab} onChange={setTab} size="${s(v.size)}" layout="${s(v.layout)}"${b(v.hasDivider) ? ' hasDivider' : ''}>\n  <Tab value="home" label="홈" />\n  <Tab value="settings" label="설정" />\n  <Tab value="alerts" label="알림" />\n</TabList>`,
  },
  Divider: {
    tag: 'Divider',
    Preview: DividerPreview,
    controls: [
      {kind: 'select', key: 'orientation', label: '방향', options: ['horizontal', 'vertical'], default: 'horizontal'},
      {kind: 'text', key: 'label', label: '가운데 글', default: '또는'},
      {kind: 'select', key: 'variant', label: '진하기', options: ['subtle', 'strong'], default: 'subtle'},
    ],
  },
};

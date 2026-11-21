import {useMemo, useState} from 'react';
import {AlertDialog} from '@astryxdesign/core/AlertDialog';
import {BottomSheet} from '@astryxdesign/core/BottomSheet';
import {Button} from '@astryxdesign/core/Button';
import {Calendar} from '@astryxdesign/core/Calendar';
import {CheckboxList, CheckboxListItem} from '@astryxdesign/core/CheckboxList';
import {CommandPalette} from '@astryxdesign/core/CommandPalette';
import {ComplexSelector} from '@astryxdesign/core/ComplexSelector';
import {Drawer, DrawerHeader} from '@astryxdesign/core/Drawer';
import {HoverCard} from '@astryxdesign/core/HoverCard';
import {InfoTip} from '@astryxdesign/core/InfoTip';
import {Layout, LayoutContent} from '@astryxdesign/core/Layout';
import {Lightbox} from '@astryxdesign/core/Lightbox';
import {MultiSelector} from '@astryxdesign/core/MultiSelector';
import {Overlay} from '@astryxdesign/core/Overlay';
import {Popover} from '@astryxdesign/core/Popover';
import {Skeleton} from '@astryxdesign/core/Skeleton';
import {StatusDot} from '@astryxdesign/core/StatusDot';
import {Timer} from '@astryxdesign/core/Timer';
import {useToast} from '@astryxdesign/core/Toast';
import {createStaticSource} from '@astryxdesign/core/Typeahead';

import type {Demo, Values} from '../demoTypes';
import {b, s} from '../demoTypes';

const FRUITS = ['사과', '바나나', '포도', '딸기', '귤'];

// 네트워크 없이 보이는 샘플 이미지 (SVG 데이터 주소)
const sampleImage = (color: string, text: string) =>
  'data:image/svg+xml;utf8,' +
  encodeURIComponent(
    `<svg xmlns="http://www.w3.org/2000/svg" width="640" height="360"><rect width="640" height="360" fill="${color}"/><text x="320" y="190" font-size="40" text-anchor="middle" fill="white">${text}</text></svg>`,
  );

function CheckboxListPreview({v}: {v: Values}) {
  const [sel, setSel] = useState<string[]>(['email']);
  return (
    <CheckboxList
      label={s(v.label)}
      description={v.description ? s(v.description) : undefined}
      value={sel}
      onChange={(next) => setSel(next)}
      hasDividers={b(v.hasDividers)}
      isDisabled={b(v.isDisabled)}
      isReadOnly={b(v.isReadOnly)}>
      <CheckboxListItem label="이메일" value="email" />
      <CheckboxListItem label="문자 메시지" value="sms" />
      <CheckboxListItem label="푸시 알림" value="push" />
    </CheckboxList>
  );
}

function MultiSelectorPreview({v}: {v: Values}) {
  const [sel, setSel] = useState<string[]>(['사과']);
  return (
    <MultiSelector
      label={s(v.label)}
      options={FRUITS}
      value={sel}
      onChange={(next) => setSel(next)}
      placeholder={v.placeholder ? s(v.placeholder) : undefined}
      size={s(v.size) as 'md'}
      triggerDisplay={s(v.triggerDisplay) as 'count'}
      hasSelectAll={b(v.hasSelectAll)}
      hasSearch={b(v.hasSearch)}
      hasClear={b(v.hasClear)}
      isDisabled={b(v.isDisabled)}
    />
  );
}

function ComplexSelectorPreview({v}: {v: Values}) {
  const [fruit, setFruit] = useState('사과');
  return (
    <ComplexSelector
      label={s(v.label)}
      value={fruit}
      onChange={(next) => setFruit(next)}
      triggerLabel={fruit}
      size={s(v.size) as 'md'}
      variant={s(v.variant) as 'input'}
      isDisabled={b(v.isDisabled)}>
      {(value, onChange, close) => (
        <Layout
          content={
            <LayoutContent>
              {FRUITS.map((f) => (
                <Button
                  key={f}
                  label={f}
                  variant={f === value ? 'primary' : 'ghost'}
                  onClick={() => {
                    onChange(f);
                    close();
                  }}
                />
              ))}
            </LayoutContent>
          }
        />
      )}
    </ComplexSelector>
  );
}

function CalendarPreview({v}: {v: Values}) {
  const [date, setDate] = useState<string | null>(null);
  return (
    <Calendar
      value={date}
      onChange={(next) => setDate(next)}
      numberOfMonths={Number(v.numberOfMonths) === 2 ? 2 : 1}
      hasWeekNumbers={b(v.hasWeekNumbers)}
      hasOutsideDays={b(v.hasOutsideDays)}
      weekStartsOn={Number(v.weekStartsOn) as 0}
    />
  );
}

function InfoTipPreview({v}: {v: Values}) {
  return (
    <InfoTip
      content={s(v.content)}
      label={v.label ? s(v.label) : undefined}
      size={s(v.size) as 'sm'}
    />
  );
}

function SkeletonPreview({v}: {v: Values}) {
  const r = s(v.radius);
  const radius = (/^\d$/.test(r) ? Number(r) : r) as 3;
  return (
    <Skeleton
      width={Number(v.width)}
      height={Number(v.height)}
      radius={radius}
    />
  );
}

function StatusDotPreview({v}: {v: Values}) {
  return (
    <StatusDot
      variant={s(v.variant) as 'success'}
      label={s(v.label)}
      isPulsing={b(v.isPulsing)}
      tooltip={v.tooltip ? s(v.tooltip) : undefined}
    />
  );
}

function ToastPreview({v}: {v: Values}) {
  const showToast = useToast();
  return (
    <Button
      label="토스트 띄우기"
      onClick={() =>
        showToast({
          body: s(v.body),
          type: s(v.type) as 'info',
          isAutoHide: b(v.isAutoHide),
          autoHideDuration: Number(v.autoHideDuration),
        })
      }
    />
  );
}

function TimerPreview({v}: {v: Values}) {
  // 렌더링마다 시작 시각이 바뀌지 않도록 한 번만 계산
  const [start] = useState(() => Date.now() - 65_000);
  return <Timer startTime={start} format={s(v.format) as 'elapsed'} />;
}

function AlertDialogPreview({v}: {v: Values}) {
  const [open, setOpen] = useState(false);
  return (
    <>
      <Button label="삭제하기" onClick={() => setOpen(true)} />
      <AlertDialog
        isOpen={open}
        onOpenChange={setOpen}
        title={s(v.title)}
        description={s(v.description)}
        actionLabel={s(v.actionLabel)}
        cancelLabel={v.cancelLabel ? s(v.cancelLabel) : undefined}
        actionVariant={s(v.actionVariant) as 'destructive'}
        onAction={() => setOpen(false)}
      />
    </>
  );
}

function DrawerPreview({v}: {v: Values}) {
  const [open, setOpen] = useState(false);
  return (
    <>
      <Button label="서랍 열기" onClick={() => setOpen(true)} />
      <Drawer
        isOpen={open}
        onOpenChange={setOpen}
        label="상세 정보"
        side={s(v.side) as 'end'}
        width={Number(v.width)}
        hasScrim={b(v.hasScrim)}
        purpose={s(v.purpose) as 'info'}>
        <Layout
          header={<DrawerHeader title="상세 정보" onOpenChange={setOpen} />}
          content={<LayoutContent>고객사 '한빛상사'의 상세 내용입니다.</LayoutContent>}
        />
      </Drawer>
    </>
  );
}

function BottomSheetPreview({v}: {v: Values}) {
  const [open, setOpen] = useState(false);
  return (
    <>
      <Button label="바텀시트 열기" onClick={() => setOpen(true)} />
      <BottomSheet
        isOpen={open}
        onOpenChange={setOpen}
        label="공유 옵션"
        purpose={s(v.purpose) as 'info'}
        hasScrim={b(v.hasScrim)}>
        <Button label="닫기" onClick={() => setOpen(false)} />
      </BottomSheet>
    </>
  );
}

function PopoverPreview({v}: {v: Values}) {
  return (
    <Popover
      label="필터 설정"
      content="필터 조건을 여기에서 고를 수 있습니다."
      placement={s(v.placement) as 'below'}
      alignment={s(v.alignment) as 'start'}
      hasCloseButton={b(v.hasCloseButton)}
      isModal={b(v.isModal)}>
      <Button label="필터" />
    </Popover>
  );
}

function HoverCardPreview({v}: {v: Values}) {
  return (
    <HoverCard
      content="김민수 팀장 · 영업 1팀"
      placement={s(v.placement) as 'above'}
      delay={Number(v.delay)}
      hideDelay={Number(v.hideDelay)}>
      <Button label="담당자 보기" />
    </HoverCard>
  );
}

const COMMANDS = [
  {id: 'new', label: '새 거래처 만들기', auxiliaryData: {group: '만들기'}},
  {id: 'contact', label: '새 연락처 만들기', auxiliaryData: {group: '만들기'}},
  {id: 'settings', label: '설정 열기', auxiliaryData: {group: '이동'}},
  {id: 'home', label: '홈으로 이동', auxiliaryData: {group: '이동'}},
];

function CommandPalettePreview({v}: {v: Values}) {
  const [open, setOpen] = useState(false);
  const source = useMemo(() => createStaticSource(COMMANDS), []);
  return (
    <>
      <Button label="명령 팔레트 열기" onClick={() => setOpen(true)} />
      <CommandPalette
        isOpen={open}
        onOpenChange={setOpen}
        searchSource={source}
        label={s(v.label)}
        emptySearchText={s(v.emptySearchText)}
        onValueChange={() => setOpen(false)}
      />
    </>
  );
}

function LightboxPreview({v}: {v: Values}) {
  const [open, setOpen] = useState(false);
  const media = [
    {src: sampleImage('#4f6bed', '사진 1'), alt: '첫 번째 사진', caption: '첫 번째 사진'},
    {src: sampleImage('#2f9e6e', '사진 2'), alt: '두 번째 사진', caption: '두 번째 사진'},
  ];
  return (
    <>
      <Button label="사진 보기" onClick={() => setOpen(true)} />
      <Lightbox
        isOpen={open}
        onOpenChange={setOpen}
        media={b(v.isGallery) ? media : media[0]}
        hasZoom={b(v.hasZoom)}
      />
    </>
  );
}

function OverlayPreview({v}: {v: Values}) {
  return (
    <Overlay
      showOn={s(v.showOn) as 'hover'}
      content={<Button label="빠른 보기" />}>
      <img
        src={sampleImage('#6b5bd6', '미리보기')}
        alt="샘플"
        width={320}
        height={180}
      />
    </Overlay>
  );
}

export const DEMOS_CHOICE_FEEDBACK_OVERLAY: Record<string, Demo> = {
  CheckboxList: {
    tag: 'CheckboxList',
    controls: [
      {kind: 'text', key: 'label', label: 'label', default: '알림 방식'},
      {kind: 'text', key: 'description', label: 'description', default: ''},
      {kind: 'bool', key: 'hasDividers', label: 'hasDividers', default: false},
      {kind: 'bool', key: 'isDisabled', label: 'isDisabled', default: false},
      {kind: 'bool', key: 'isReadOnly', label: 'isReadOnly', default: false},
    ],
    Preview: CheckboxListPreview,
    code: (v) => `import {CheckboxList, CheckboxListItem} from '@astryxdesign/core/CheckboxList';

<CheckboxList
  label="${s(v.label)}"${v.description ? `\n  description="${s(v.description)}"` : ''}
  value={selected}
  onChange={setSelected}${b(v.hasDividers) ? '\n  hasDividers' : ''}${b(v.isDisabled) ? '\n  isDisabled' : ''}${b(v.isReadOnly) ? '\n  isReadOnly' : ''}>
  <CheckboxListItem label="이메일" value="email" />
  <CheckboxListItem label="문자 메시지" value="sms" />
  <CheckboxListItem label="푸시 알림" value="push" />
</CheckboxList>`,
  },

  MultiSelector: {
    tag: 'MultiSelector',
    controls: [
      {kind: 'text', key: 'label', label: 'label', default: '과일'},
      {kind: 'text', key: 'placeholder', label: 'placeholder', default: '선택하세요'},
      {kind: 'select', key: 'size', label: 'size', options: ['sm', 'md', 'lg'], default: 'md'},
      {
        kind: 'select',
        key: 'triggerDisplay',
        label: 'triggerDisplay',
        options: ['count', 'labels', 'badges'],
        default: 'count',
      },
      {kind: 'bool', key: 'hasSelectAll', label: 'hasSelectAll', default: false},
      {kind: 'bool', key: 'hasSearch', label: 'hasSearch', default: false},
      {kind: 'bool', key: 'hasClear', label: 'hasClear', default: false},
      {kind: 'bool', key: 'isDisabled', label: 'isDisabled', default: false},
    ],
    Preview: MultiSelectorPreview,
    extra: `options={['사과', '바나나', '포도', '딸기', '귤']}\nvalue={selected}\nonChange={setSelected}`,
  },

  ComplexSelector: {
    tag: 'ComplexSelector',
    controls: [
      {kind: 'text', key: 'label', label: 'label', default: '과일'},
      {kind: 'select', key: 'size', label: 'size', options: ['sm', 'md', 'lg'], default: 'md'},
      {
        kind: 'select',
        key: 'variant',
        label: 'variant',
        options: ['input', 'secondary', 'ghost'],
        default: 'input',
      },
      {kind: 'bool', key: 'isDisabled', label: 'isDisabled', default: false},
    ],
    Preview: ComplexSelectorPreview,
    code: (v) => `import {Button} from '@astryxdesign/core/Button';
import {ComplexSelector} from '@astryxdesign/core/ComplexSelector';
import {Layout, LayoutContent} from '@astryxdesign/core/Layout';

<ComplexSelector
  label="${s(v.label)}"
  value={fruit}
  onChange={setFruit}
  triggerLabel={fruit}
  size="${s(v.size)}"
  variant="${s(v.variant)}"${b(v.isDisabled) ? '\n  isDisabled' : ''}>
  {(value, onChange, close) => (
    <Layout
      content={
        <LayoutContent>
          {['사과', '바나나', '포도'].map((f) => (
            <Button
              key={f}
              label={f}
              variant={f === value ? 'primary' : 'ghost'}
              onClick={() => { onChange(f); close(); }}
            />
          ))}
        </LayoutContent>
      }
    />
  )}
</ComplexSelector>`,
  },

  Calendar: {
    tag: 'Calendar',
    controls: [
      {kind: 'number', key: 'numberOfMonths', label: 'numberOfMonths', default: 1, min: 1, max: 2},
      {kind: 'number', key: 'weekStartsOn', label: 'weekStartsOn (0=일 … 6=토)', default: 0, min: 0, max: 6},
      {kind: 'bool', key: 'hasWeekNumbers', label: 'hasWeekNumbers', default: false},
      {kind: 'bool', key: 'hasOutsideDays', label: 'hasOutsideDays', default: true},
    ],
    Preview: CalendarPreview,
    extra: `value={date}\nonChange={setDate}`,
  },

  InfoTip: {
    tag: 'InfoTip',
    controls: [
      {kind: 'text', key: 'content', label: 'content', default: '편집자는 이 항목을 바꿀 수 있고 보기 권한자는 바꿀 수 없습니다.'},
      {kind: 'text', key: 'label', label: 'label', default: ''},
      {kind: 'select', key: 'size', label: 'size', options: ['xsm', 'sm', 'md', 'lg'], default: 'sm'},
    ],
    Preview: InfoTipPreview,
  },

  Skeleton: {
    tag: 'Skeleton',
    controls: [
      {kind: 'number', key: 'width', label: 'width', default: 240, min: 20, max: 400, step: 10},
      {kind: 'number', key: 'height', label: 'height', default: 20, min: 8, max: 120, step: 4},
      {
        kind: 'select',
        key: 'radius',
        label: 'radius',
        options: ['none', '0', '1', '2', '3', '4', 'rounded'],
        default: '3',
      },
    ],
    Preview: SkeletonPreview,
    code: (v) =>
      `import {Skeleton} from '@astryxdesign/core/Skeleton';\n\n<Skeleton width={${Number(v.width)}} height={${Number(v.height)}} radius=${/^\d$/.test(s(v.radius)) ? `{${s(v.radius)}}` : `"${s(v.radius)}"`} />`,
  },

  StatusDot: {
    tag: 'StatusDot',
    controls: [
      {
        kind: 'select',
        key: 'variant',
        label: 'variant',
        options: ['success', 'warning', 'error', 'accent', 'neutral'],
        default: 'success',
      },
      {kind: 'text', key: 'label', label: 'label', default: '온라인'},
      {kind: 'text', key: 'tooltip', label: 'tooltip', default: ''},
      {kind: 'bool', key: 'isPulsing', label: 'isPulsing', default: false},
    ],
    Preview: StatusDotPreview,
  },

  Toast: {
    tag: 'Toast',
    controls: [
      {kind: 'text', key: 'body', label: 'body', default: '저장되었습니다.'},
      {kind: 'select', key: 'type', label: 'type', options: ['info', 'error'], default: 'info'},
      {kind: 'bool', key: 'isAutoHide', label: 'isAutoHide', default: true},
      {kind: 'number', key: 'autoHideDuration', label: 'autoHideDuration (ms)', default: 5000, min: 1000, max: 10000, step: 500},
    ],
    Preview: ToastPreview,
    code: (v) => `import {Button} from '@astryxdesign/core/Button';
import {useToast} from '@astryxdesign/core/Toast';

const showToast = useToast();

<Button
  label="토스트 띄우기"
  onClick={() =>
    showToast({
      body: '${s(v.body)}',
      type: '${s(v.type)}',
      isAutoHide: ${b(v.isAutoHide)},
      autoHideDuration: ${Number(v.autoHideDuration)},
    })
  }
/>`,
    note: 'useToast()는 ToastViewport가 없으면 임시 뷰포트를 자동으로 만듭니다. 앱에서는 루트에 <ToastViewport>를 두세요.',
  },

  Timer: {
    tag: 'Timer',
    controls: [
      {kind: 'select', key: 'format', label: 'format', options: ['elapsed', 'clock'], default: 'elapsed'},
    ],
    Preview: TimerPreview,
  },

  AlertDialog: {
    tag: 'AlertDialog',
    controls: [
      {kind: 'text', key: 'title', label: 'title', default: '항목을 삭제할까요?'},
      {kind: 'text', key: 'description', label: 'description', default: '삭제하면 되돌릴 수 없습니다.'},
      {kind: 'text', key: 'actionLabel', label: 'actionLabel', default: '삭제'},
      {kind: 'text', key: 'cancelLabel', label: 'cancelLabel', default: ''},
    ],
    Preview: AlertDialogPreview,
    code: (v) => `import {AlertDialog} from '@astryxdesign/core/AlertDialog';

<AlertDialog
  isOpen={isOpen}
  onOpenChange={setIsOpen}
  title="${s(v.title)}"
  description="${s(v.description)}"
  actionLabel="${s(v.actionLabel)}"${v.cancelLabel ? `\n  cancelLabel="${s(v.cancelLabel)}"` : ''}
  onAction={() => setIsOpen(false)}
/>`,
  },

  Drawer: {
    tag: 'Drawer',
    controls: [
      {kind: 'select', key: 'side', label: 'side', options: ['start', 'end'], default: 'end'},
      {kind: 'number', key: 'width', label: 'width', default: 400, min: 240, max: 640, step: 20},
      {kind: 'select', key: 'purpose', label: 'purpose', options: ['info', 'form', 'required'], default: 'info'},
      {kind: 'bool', key: 'hasScrim', label: 'hasScrim', default: true},
    ],
    Preview: DrawerPreview,
    code: (v) => `import {Drawer, DrawerHeader} from '@astryxdesign/core/Drawer';
import {Layout, LayoutContent} from '@astryxdesign/core/Layout';

<Drawer
  isOpen={isOpen}
  onOpenChange={setIsOpen}
  label="상세 정보"
  side="${s(v.side)}"
  width={${Number(v.width)}}
  purpose="${s(v.purpose)}"${b(v.hasScrim) ? '' : '\n  hasScrim={false}'}>
  <Layout
    header={<DrawerHeader title="상세 정보" onOpenChange={setIsOpen} />}
    content={<LayoutContent>내용</LayoutContent>}
  />
</Drawer>`,
  },

  BottomSheet: {
    tag: 'BottomSheet',
    controls: [
      {kind: 'select', key: 'purpose', label: 'purpose', options: ['info', 'form', 'required'], default: 'info'},
      {kind: 'bool', key: 'hasScrim', label: 'hasScrim', default: true},
    ],
    Preview: BottomSheetPreview,
    code: (v) => `import {BottomSheet} from '@astryxdesign/core/BottomSheet';

<BottomSheet
  isOpen={isOpen}
  onOpenChange={setIsOpen}
  label="공유 옵션"
  purpose="${s(v.purpose)}"${b(v.hasScrim) ? '' : '\n  hasScrim={false}'}>
  내용
</BottomSheet>`,
  },

  Popover: {
    tag: 'Popover',
    controls: [
      {kind: 'select', key: 'placement', label: 'placement', options: ['below', 'above'], default: 'below'},
      {kind: 'select', key: 'alignment', label: 'alignment', options: ['start', 'center'], default: 'start'},
      {kind: 'bool', key: 'hasCloseButton', label: 'hasCloseButton', default: true},
      {kind: 'bool', key: 'isModal', label: 'isModal', default: true},
    ],
    Preview: PopoverPreview,
    code: (v) => `import {Button} from '@astryxdesign/core/Button';
import {Popover} from '@astryxdesign/core/Popover';

<Popover
  label="필터 설정"
  content="필터 조건을 여기에서 고를 수 있습니다."
  placement="${s(v.placement)}"
  alignment="${s(v.alignment)}"${b(v.hasCloseButton) ? '' : '\n  hasCloseButton={false}'}${b(v.isModal) ? '' : '\n  isModal={false}'}>
  <Button label="필터" />
</Popover>`,
  },

  HoverCard: {
    tag: 'HoverCard',
    controls: [
      {kind: 'select', key: 'placement', label: 'placement', options: ['above', 'below'], default: 'above'},
      {kind: 'number', key: 'delay', label: 'delay (ms)', default: 300, min: 0, max: 1500, step: 100},
      {kind: 'number', key: 'hideDelay', label: 'hideDelay (ms)', default: 200, min: 0, max: 1500, step: 100},
    ],
    Preview: HoverCardPreview,
    code: (v) => `import {Button} from '@astryxdesign/core/Button';
import {HoverCard} from '@astryxdesign/core/HoverCard';

<HoverCard
  content="김민수 팀장 · 영업 1팀"
  placement="${s(v.placement)}"
  delay={${Number(v.delay)}}
  hideDelay={${Number(v.hideDelay)}}>
  <Button label="담당자 보기" />
</HoverCard>`,
  },

  CommandPalette: {
    tag: 'CommandPalette',
    controls: [
      {kind: 'text', key: 'label', label: 'label', default: '명령 팔레트'},
      {kind: 'text', key: 'emptySearchText', label: 'emptySearchText', default: '검색 결과가 없습니다'},
    ],
    Preview: CommandPalettePreview,
    code: (v) => `import {useMemo, useState} from 'react';
import {CommandPalette} from '@astryxdesign/core/CommandPalette';
import {createStaticSource} from '@astryxdesign/core/Typeahead';

const commands = [
  {id: 'new', label: '새 거래처 만들기', auxiliaryData: {group: '만들기'}},
  {id: 'home', label: '홈으로 이동', auxiliaryData: {group: '이동'}},
];
const source = useMemo(() => createStaticSource(commands), []);

<CommandPalette
  isOpen={isOpen}
  onOpenChange={setIsOpen}
  searchSource={source}
  label="${s(v.label)}"
  emptySearchText="${s(v.emptySearchText)}"
  onValueChange={(id) => run(id)}
/>`,
    note: 'createStaticSource의 항목 형태는 {id, label, auxiliaryData?.group}을 기준으로 작성했습니다.',
  },

  Lightbox: {
    tag: 'Lightbox',
    controls: [
      {kind: 'bool', key: 'isGallery', label: '여러 장(갤러리)', default: true},
      {kind: 'bool', key: 'hasZoom', label: 'hasZoom', default: false},
    ],
    Preview: LightboxPreview,
    code: (v) => `import {Lightbox} from '@astryxdesign/core/Lightbox';

<Lightbox
  isOpen={isOpen}
  onOpenChange={setIsOpen}
  media={${b(v.isGallery) ? "[{src: '/a.jpg', alt: '첫 번째 사진'}, {src: '/b.jpg', alt: '두 번째 사진'}]" : "{src: '/a.jpg', alt: '첫 번째 사진'}"}}${b(v.hasZoom) ? '\n  hasZoom' : ''}
/>`,
  },

  Overlay: {
    tag: 'Overlay',
    controls: [
      {kind: 'select', key: 'showOn', label: 'showOn', options: ['always', 'hover'], default: 'hover'},
    ],
    Preview: OverlayPreview,
    code: (v) => `import {Button} from '@astryxdesign/core/Button';
import {Overlay} from '@astryxdesign/core/Overlay';

<Overlay showOn="${s(v.showOn)}" content={<Button label="빠른 보기" />}>
  <img src="/hero.jpg" alt="샘플" width={320} height={180} />
</Overlay>`,
  },
};

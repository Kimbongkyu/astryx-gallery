import {useState} from 'react';
import {Avatar} from '@astryxdesign/core/Avatar';
import {AvatarGroup, AvatarGroupOverflow} from '@astryxdesign/core/AvatarGroup';
import {Blockquote} from '@astryxdesign/core/Blockquote';
import {Button} from '@astryxdesign/core/Button';
import {Carousel} from '@astryxdesign/core/Carousel';
import {
  ChatComposer,
  ChatMessage,
  ChatMessageBubble,
  ChatMessageList,
} from '@astryxdesign/core/Chat';
import {Citation} from '@astryxdesign/core/Citation';
import {ClickableCard} from '@astryxdesign/core/ClickableCard';
import {Code} from '@astryxdesign/core/Code';
import {CodeBlock} from '@astryxdesign/core/CodeBlock';
import {Collapsible, CollapsibleGroup} from '@astryxdesign/core/Collapsible';
import {EmptyState} from '@astryxdesign/core/EmptyState';
import {Heading} from '@astryxdesign/core/Heading';
import {Item} from '@astryxdesign/core/Item';
import {Kbd} from '@astryxdesign/core/Kbd';
import {List, ListItem} from '@astryxdesign/core/List';
import {Markdown} from '@astryxdesign/core/Markdown';
import {MetadataList, MetadataListItem} from '@astryxdesign/core/MetadataList';
import {OverflowList} from '@astryxdesign/core/OverflowList';
import {SelectableCard} from '@astryxdesign/core/SelectableCard';
import {proportional, Table} from '@astryxdesign/core/Table';
import {Text} from '@astryxdesign/core/Text';
import {Thumbnail} from '@astryxdesign/core/Thumbnail';
import {Timestamp} from '@astryxdesign/core/Timestamp';
import {Token} from '@astryxdesign/core/Token';
import {TreeList} from '@astryxdesign/core/TreeList';
import {VisuallyHidden} from '@astryxdesign/core/VisuallyHidden';

import type {Demo} from '../demoTypes';
import {b, s} from '../demoTypes';

const PADDING = ['0', '1', '2', '3', '4', '6', '8'];
const CARD_VARIANTS = ['default', 'transparent', 'muted', 'blue', 'green', 'orange', 'purple', 'red'];

const colorBox = (color: string, label: string, width = 120) => (
  <div
    key={label}
    style={{
      width,
      height: 80,
      background: color,
      borderRadius: 8,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      color: '#fff',
      flex: 'none',
    }}>
    {label}
  </div>
);

const svgDataUri = (color: string) =>
  'data:image/svg+xml;utf8,' +
  encodeURIComponent(
    `<svg xmlns="http://www.w3.org/2000/svg" width="96" height="96"><rect width="96" height="96" fill="${color}"/></svg>`,
  );

type Account = {id: string; name: string; owner: string; status: string};
const ACCOUNTS: Account[] = [
  {id: '1', name: '한빛전자', owner: '김민준', status: '진행 중'},
  {id: '2', name: '새봄무역', owner: '이서연', status: '계약 완료'},
  {id: '3', name: '대한물류', owner: '박지호', status: '검토 중'},
];

export const DEMOS_CONTAINER_CONTENT_DATA: Record<string, Demo> = {
  ClickableCard: {
    tag: 'ClickableCard',
    controls: [
      {kind: 'select', key: 'variant', label: 'variant', options: CARD_VARIANTS, default: 'default'},
      {kind: 'select', key: 'padding', label: 'padding', options: PADDING, default: '4'},
      {kind: 'select', key: 'elevation', label: 'elevation', options: ['none', 'low', 'med', 'high'], default: 'low'},
      {kind: 'bool', key: 'isDisabled', label: 'isDisabled', default: false},
    ],
    Preview: ({v}) => {
      const [count, setCount] = useState(0);
      return (
        <ClickableCard
          label="거래처 카드"
          variant={s(v.variant) as 'default'}
          padding={Number(v.padding) as 4}
          elevation={s(v.elevation) as 'low'}
          isDisabled={b(v.isDisabled)}
          width={280}
          onClick={() => setCount((c) => c + 1)}>
          <Text type="body" weight="bold" as="div">한빛전자</Text>
          <Text type="supporting" color="secondary" as="div">카드를 클릭한 횟수: {count}</Text>
        </ClickableCard>
      );
    },
    extra: 'label="거래처 카드" onClick={() => {}}',
    code: (v) =>
      `import {ClickableCard} from '@astryxdesign/core/ClickableCard';
import {Text} from '@astryxdesign/core/Text';

<ClickableCard
  label="거래처 카드"
  variant="${s(v.variant)}"
  padding={${s(v.padding)}}
  elevation="${s(v.elevation)}"${b(v.isDisabled) ? '\n  isDisabled' : ''}
  onClick={() => {}}>
  <Text type="body" weight="bold">한빛전자</Text>
</ClickableCard>`,
  },

  SelectableCard: {
    tag: 'SelectableCard',
    controls: [
      {kind: 'select', key: 'variant', label: 'variant', options: CARD_VARIANTS, default: 'default'},
      {kind: 'select', key: 'padding', label: 'padding', options: PADDING, default: '4'},
      {kind: 'bool', key: 'isDisabled', label: 'isDisabled', default: false},
    ],
    Preview: ({v}) => {
      const [sel, setSel] = useState<string | null>('basic');
      const plans = [
        {id: 'basic', name: '기본 요금제'},
        {id: 'pro', name: '프로 요금제'},
      ];
      return (
        <div style={{display: 'flex', gap: 12}}>
          {plans.map((p) => (
            <SelectableCard
              key={p.id}
              label={p.name}
              isSelected={sel === p.id}
              onChange={(next) => setSel(next ? p.id : null)}
              variant={s(v.variant) as 'default'}
              padding={Number(v.padding) as 4}
              isDisabled={b(v.isDisabled)}
              width={180}>
              <Text type="body" weight="bold">{p.name}</Text>
            </SelectableCard>
          ))}
        </div>
      );
    },
    code: (v) =>
      `import {useState} from 'react';
import {SelectableCard} from '@astryxdesign/core/SelectableCard';
import {Text} from '@astryxdesign/core/Text';

const [selected, setSelected] = useState(false);

<SelectableCard
  label="기본 요금제"
  isSelected={selected}
  onChange={setSelected}
  variant="${s(v.variant)}"
  padding={${s(v.padding)}}${b(v.isDisabled) ? '\n  isDisabled' : ''}>
  <Text type="body" weight="bold">기본 요금제</Text>
</SelectableCard>`,
  },

  Carousel: {
    tag: 'Carousel',
    controls: [
      {kind: 'select', key: 'gap', label: 'gap', options: ['0', '1', '2', '3', '4'], default: '1'},
      {kind: 'bool', key: 'hasButtons', label: 'hasButtons', default: true},
      {kind: 'bool', key: 'hasEdgeFade', label: 'hasEdgeFade', default: true},
      {kind: 'bool', key: 'hasLoop', label: 'hasLoop', default: false},
      {kind: 'bool', key: 'hasSnap', label: 'hasSnap', default: false},
    ],
    Preview: ({v}) => (
      <div style={{width: 360}}>
        <Carousel
          gap={Number(v.gap) as 1}
          hasButtons={b(v.hasButtons)}
          hasEdgeFade={b(v.hasEdgeFade)}
          hasLoop={b(v.hasLoop)}
          hasSnap={b(v.hasSnap)}
          aria-label="캐러셀">
          {[
            ['#3b82f6', '첫째'],
            ['#10b981', '둘째'],
            ['#f59e0b', '셋째'],
            ['#ef4444', '넷째'],
            ['#8b5cf6', '다섯째'],
          ].map(([c, l]) => colorBox(c, l))}
        </Carousel>
      </div>
    ),
    code: (v) =>
      `import {Carousel} from '@astryxdesign/core/Carousel';

<Carousel
  gap={${s(v.gap)}}
  hasButtons={${b(v.hasButtons)}}
  hasEdgeFade={${b(v.hasEdgeFade)}}
  hasLoop={${b(v.hasLoop)}}
  hasSnap={${b(v.hasSnap)}}>
  <div style={{width: 120, height: 80}}>첫째</div>
  <div style={{width: 120, height: 80}}>둘째</div>
  <div style={{width: 120, height: 80}}>셋째</div>
</Carousel>`,
  },

  Collapsible: {
    tag: 'Collapsible',
    controls: [
      {kind: 'text', key: 'trigger', label: 'trigger', default: '배송 정책이 궁금해요'},
      {kind: 'select', key: 'chevronPosition', label: 'chevronPosition', options: ['end', 'start'], default: 'end'},
      {kind: 'bool', key: 'defaultIsOpen', label: 'defaultIsOpen (초기값)', default: true},
      {kind: 'bool', key: 'isDisabled', label: 'isDisabled', default: false},
    ],
    Preview: ({v}) => (
      <div style={{width: 360}} key={String(v.defaultIsOpen)}>
        <Collapsible
          trigger={s(v.trigger)}
          chevronPosition={s(v.chevronPosition) as 'end'}
          defaultIsOpen={b(v.defaultIsOpen)}
          isDisabled={b(v.isDisabled)}>
          <Text type="body">주문 후 2~3일 이내에 출고되며, 도서 산간 지역은 하루 더 걸릴 수 있습니다.</Text>
        </Collapsible>
      </div>
    ),
    code: (v) =>
      `import {Collapsible} from '@astryxdesign/core/Collapsible';
import {Text} from '@astryxdesign/core/Text';

<Collapsible
  trigger="${s(v.trigger)}"
  chevronPosition="${s(v.chevronPosition)}"
  defaultIsOpen={${b(v.defaultIsOpen)}}${b(v.isDisabled) ? '\n  isDisabled' : ''}>
  <Text type="body">주문 후 2~3일 이내에 출고됩니다.</Text>
</Collapsible>`,
  },

  AvatarGroup: {
    tag: 'AvatarGroup',
    controls: [
      {kind: 'select', key: 'size', label: 'size', options: ['xsm', 'sm', 'md', 'lg', 'xl'], default: 'md'},
      {kind: 'select', key: 'shape', label: 'shape', options: ['circle', 'rounded', 'square'], default: 'circle'},
      {kind: 'number', key: 'visible', label: '표시 개수', default: 3, min: 1, max: 5},
    ],
    Preview: ({v}) => {
      const names = ['김민준', '이서연', '박지호', '최유나', '정도윤'];
      const n = Number(v.visible);
      return (
        <AvatarGroup size={s(v.size) as 'md'} shape={s(v.shape) as 'circle'}>
          {names.slice(0, n).map((name) => (
            <Avatar key={name} name={name} />
          ))}
          {names.length > n ? <AvatarGroupOverflow count={names.length - n} /> : null}
        </AvatarGroup>
      );
    },
    code: (v) =>
      `import {Avatar} from '@astryxdesign/core/Avatar';
import {AvatarGroup, AvatarGroupOverflow} from '@astryxdesign/core/AvatarGroup';

<AvatarGroup size="${s(v.size)}" shape="${s(v.shape)}">
  <Avatar name="김민준" />
  <Avatar name="이서연" />
  <Avatar name="박지호" />
  <AvatarGroupOverflow count={2} />
</AvatarGroup>`,
  },

  Blockquote: {
    tag: 'Blockquote',
    controls: [
      {kind: 'text', key: 'text', label: '내용', default: '좋은 디자인은 눈에 띄지 않을 만큼 자연스럽다.'},
      {kind: 'text', key: 'cite', label: 'cite', default: '디터 람스'},
    ],
    Preview: ({v}) => (
      <Blockquote cite={v.cite ? s(v.cite) : undefined}>{s(v.text)}</Blockquote>
    ),
    code: (v) =>
      `import {Blockquote} from '@astryxdesign/core/Blockquote';

<Blockquote${v.cite ? ` cite="${s(v.cite)}"` : ''}>${s(v.text)}</Blockquote>`,
  },

  Code: {
    tag: 'Code',
    controls: [
      {kind: 'text', key: 'text', label: '내용', default: 'const total = 1;'},
      {kind: 'select', key: 'color', label: 'color', options: ['primary', 'secondary', 'inherit'], default: 'primary'},
    ],
    Preview: ({v}) => (
      <Text type="body">
        변수를 선언하려면 <Code color={s(v.color) as 'primary'}>{s(v.text)}</Code> 처럼 쓰세요.
      </Text>
    ),
    code: (v) =>
      `import {Code} from '@astryxdesign/core/Code';
import {Text} from '@astryxdesign/core/Text';

<Text type="body">
  변수를 선언하려면 <Code color="${s(v.color)}">${s(v.text)}</Code> 처럼 쓰세요.
</Text>`,
  },

  CodeBlock: {
    tag: 'CodeBlock',
    controls: [
      {kind: 'select', key: 'language', label: 'language', options: ['javascript', 'typescript', 'json', 'plaintext'], default: 'javascript'},
      {kind: 'text', key: 'title', label: 'title', default: 'example.js'},
      {kind: 'bool', key: 'hasLineNumbers', label: 'hasLineNumbers', default: true},
      {kind: 'bool', key: 'hasCopyButton', label: 'hasCopyButton', default: true},
      {kind: 'bool', key: 'isWrapped', label: 'isWrapped', default: false},
    ],
    Preview: ({v}) => (
      <CodeBlock
        code={`function greet(name) {\n  return \`안녕하세요, \${name}님\`;\n}\n\ngreet('민준');`}
        language={s(v.language)}
        title={v.title ? s(v.title) : undefined}
        hasLineNumbers={b(v.hasLineNumbers)}
        hasCopyButton={b(v.hasCopyButton)}
        isWrapped={b(v.isWrapped)}
      />
    ),
    code: (v) =>
      `import {CodeBlock} from '@astryxdesign/core/CodeBlock';

<CodeBlock
  code={"const x = 42;"}
  language="${s(v.language)}"${v.title ? `\n  title="${s(v.title)}"` : ''}
  hasLineNumbers={${b(v.hasLineNumbers)}}
  hasCopyButton={${b(v.hasCopyButton)}}
  isWrapped={${b(v.isWrapped)}}
/>`,
  },

  Citation: {
    tag: 'Citation',
    controls: [
      {kind: 'text', key: 'title', label: 'source.title', default: '2026년 시장 보고서'},
      {kind: 'number', key: 'number', label: 'number', default: 1, min: 1, max: 9},
      {kind: 'select', key: 'variant', label: 'variant', options: ['label', 'number'], default: 'label'},
    ],
    Preview: ({v}) => (
      <Text type="body">
        매출이 전년 대비 12% 증가했습니다.{' '}
        <Citation
          source={{title: s(v.title)}}
          number={Number(v.number)}
          variant={s(v.variant) as 'label'}
        />
      </Text>
    ),
    code: (v) =>
      `import {Citation} from '@astryxdesign/core/Citation';

<Citation
  source={{title: '${s(v.title)}'}}
  number={${s(v.number)}}
  variant="${s(v.variant)}"
/>`,
  },

  EmptyState: {
    tag: 'EmptyState',
    controls: [
      {kind: 'text', key: 'title', label: 'title', default: '거래처가 없습니다'},
      {kind: 'text', key: 'description', label: 'description', default: '새 거래처를 등록해 시작해 보세요.'},
      {kind: 'bool', key: 'isCompact', label: 'isCompact', default: false},
      {kind: 'bool', key: 'hasAction', label: '버튼 표시', default: true},
    ],
    Preview: ({v}) => (
      <EmptyState
        title={s(v.title)}
        description={v.description ? s(v.description) : undefined}
        isCompact={b(v.isCompact)}
        actions={b(v.hasAction) ? <Button label="거래처 추가" variant="primary" /> : undefined}
      />
    ),
    code: (v) =>
      `import {Button} from '@astryxdesign/core/Button';
import {EmptyState} from '@astryxdesign/core/EmptyState';

<EmptyState
  title="${s(v.title)}"${v.description ? `\n  description="${s(v.description)}"` : ''}
  isCompact={${b(v.isCompact)}}${b(v.hasAction) ? '\n  actions={<Button label="거래처 추가" variant="primary" />}' : ''}
/>`,
  },

  Heading: {
    tag: 'Heading',
    controls: [
      {kind: 'text', key: 'text', label: '내용', default: '분기 실적 요약'},
      {kind: 'select', key: 'level', label: 'level', options: ['1', '2', '3', '4', '5', '6'], default: '2'},
      {kind: 'select', key: 'type', label: 'type', options: ['기본', 'display-1', 'display-2', 'display-3'], default: '기본'},
      {kind: 'select', key: 'color', label: 'color', options: ['primary', 'secondary'], default: 'primary'},
      {kind: 'number', key: 'maxLines', label: 'maxLines (0=제한 없음)', default: 0, min: 0, max: 3},
    ],
    Preview: ({v}) => (
      <div style={{width: 320}}>
        <Heading
          level={Number(v.level) as 2}
          type={v.type === '기본' ? undefined : (s(v.type) as 'display-1')}
          color={s(v.color) as 'primary'}
          maxLines={Number(v.maxLines)}>
          {s(v.text)}
        </Heading>
      </div>
    ),
    code: (v) =>
      `import {Heading} from '@astryxdesign/core/Heading';

<Heading level={${s(v.level)}}${v.type === '기본' ? '' : ` type="${s(v.type)}"`} color="${s(v.color)}"${Number(v.maxLines) > 0 ? ` maxLines={${s(v.maxLines)}}` : ''}>
  ${s(v.text)}
</Heading>`,
  },

  Kbd: {
    tag: 'Kbd',
    controls: [
      {kind: 'select', key: 'keys', label: 'keys', options: ['mod+k', 'mod+shift+p', 'enter', 'esc', 'shift+plus', 'alt+up'], default: 'mod+k'},
    ],
    Preview: ({v}) => (
      <Text type="body">
        명령 팔레트 열기: <Kbd keys={s(v.keys)} />
      </Text>
    ),
    code: (v) =>
      `import {Kbd} from '@astryxdesign/core/Kbd';

<Kbd keys="${s(v.keys)}" />`,
  },

  Markdown: {
    tag: 'Markdown',
    controls: [
      {kind: 'select', key: 'density', label: 'density', options: ['default', 'compact'], default: 'default'},
      {kind: 'select', key: 'headingLevelStart', label: 'headingLevelStart', options: ['1', '2', '3'], default: '2'},
    ],
    Preview: ({v}) => (
      <Markdown
        density={s(v.density) as 'default'}
        headingLevelStart={Number(v.headingLevelStart) as 2}>
        {'# 회의록\n\n**참석자**와 _안건_을 정리했습니다.\n\n- 거래처 신규 등록\n- 계약 갱신 검토\n\n`npm run build` 로 확인하세요.'}
      </Markdown>
    ),
    code: (v) =>
      `import {Markdown} from '@astryxdesign/core/Markdown';

<Markdown density="${s(v.density)}" headingLevelStart={${s(v.headingLevelStart)}}>
  {'# 회의록\\n\\n**참석자**와 _안건_을 정리했습니다.\\n\\n- 거래처 신규 등록\\n- 계약 갱신 검토'}
</Markdown>`,
  },

  Text: {
    tag: 'Text',
    controls: [
      {kind: 'text', key: 'text', label: '내용', default: '이번 달 신규 거래처가 12곳 늘었습니다.'},
      {kind: 'select', key: 'type', label: 'type', options: ['body', 'large', 'label', 'supporting', 'code', 'display-3'], default: 'body'},
      {kind: 'select', key: 'color', label: 'color', options: ['primary', 'secondary'], default: 'primary'},
      {kind: 'number', key: 'maxLines', label: 'maxLines (0=제한 없음)', default: 0, min: 0, max: 3},
      {kind: 'bool', key: 'hasStrikethrough', label: 'hasStrikethrough', default: false},
    ],
    Preview: ({v}) => (
      <div style={{width: 260}}>
        <Text
          type={s(v.type) as 'body'}
          color={s(v.color) as 'primary'}
          maxLines={Number(v.maxLines)}
          hasStrikethrough={b(v.hasStrikethrough)}>
          {s(v.text)}
        </Text>
      </div>
    ),
  },

  Thumbnail: {
    tag: 'Thumbnail',
    controls: [
      {kind: 'text', key: 'label', label: 'label', default: 'photo.png'},
      {kind: 'bool', key: 'hasRemove', label: 'onRemove 사용', default: true},
      {kind: 'select', key: 'showRemoveOn', label: 'showRemoveOn', options: ['hover', 'always'], default: 'always'},
      {kind: 'bool', key: 'isLoading', label: 'isLoading', default: false},
      {kind: 'bool', key: 'isDisabled', label: 'isDisabled', default: false},
    ],
    Preview: ({v}) => {
      const [clicks, setClicks] = useState(0);
      return (
        <div style={{display: 'flex', alignItems: 'center', gap: 12}}>
          <Thumbnail
            src={svgDataUri('#3b82f6')}
            alt="파란색 샘플 이미지"
            label={v.label ? s(v.label) : undefined}
            onRemove={b(v.hasRemove) ? () => {} : undefined}
            showRemoveOn={s(v.showRemoveOn) as 'hover'}
            isLoading={b(v.isLoading)}
            isDisabled={b(v.isDisabled)}
            onClick={() => setClicks((c) => c + 1)}
          />
          <Text type="supporting">클릭 {clicks}회</Text>
        </div>
      );
    },
    code: (v) =>
      `import {Thumbnail} from '@astryxdesign/core/Thumbnail';

<Thumbnail
  src="/photo.png"
  alt="샘플 이미지"${v.label ? `\n  label="${s(v.label)}"` : ''}${b(v.hasRemove) ? '\n  onRemove={() => {}}' : ''}
  showRemoveOn="${s(v.showRemoveOn)}"
  isLoading={${b(v.isLoading)}}
  isDisabled={${b(v.isDisabled)}}
  onClick={() => {}}
/>`,
  },

  Timestamp: {
    tag: 'Timestamp',
    controls: [
      {
        kind: 'select',
        key: 'format',
        label: 'format',
        options: ['auto', 'relative', 'relative_short', 'date', 'date_long', 'date_weekday', 'date_time', 'time', 'system_date_time', 'unix_seconds'],
        default: 'date_time',
      },
      {kind: 'select', key: 'timezoneID', label: 'timezoneID', options: ['Asia/Seoul', 'UTC', 'local'], default: 'Asia/Seoul'},
      {kind: 'bool', key: 'isTimezoneShown', label: 'isTimezoneShown', default: false},
      {kind: 'bool', key: 'hasTooltip', label: 'hasTooltip', default: true},
    ],
    Preview: ({v}) => (
      <Timestamp
        value="2026-02-19T17:00:00Z"
        format={s(v.format) as 'date_time'}
        timezoneID={s(v.timezoneID)}
        isTimezoneShown={b(v.isTimezoneShown)}
        hasTooltip={b(v.hasTooltip)}
      />
    ),
    code: (v) =>
      `import {Timestamp} from '@astryxdesign/core/Timestamp';

<Timestamp
  value="2026-02-19T17:00:00Z"
  format="${s(v.format)}"
  timezoneID="${s(v.timezoneID)}"
  isTimezoneShown={${b(v.isTimezoneShown)}}
  hasTooltip={${b(v.hasTooltip)}}
/>`,
  },

  Token: {
    tag: 'Token',
    controls: [
      {kind: 'text', key: 'label', label: 'label', default: '우수 거래처'},
      {kind: 'select', key: 'color', label: 'color', options: ['default', 'red', 'orange', 'yellow', 'green', 'teal', 'cyan', 'blue', 'purple', 'pink', 'gray'], default: 'blue'},
      {kind: 'select', key: 'size', label: 'size', options: ['sm', 'md', 'lg'], default: 'md'},
      {kind: 'bool', key: 'hasRemove', label: 'onRemove 사용', default: true},
      {kind: 'bool', key: 'isDisabled', label: 'isDisabled', default: false},
    ],
    Preview: ({v}) => (
      <Token
        label={s(v.label)}
        color={s(v.color) as 'blue'}
        size={s(v.size) as 'md'}
        onRemove={b(v.hasRemove) ? () => {} : undefined}
        isDisabled={b(v.isDisabled)}
      />
    ),
    code: (v) =>
      `import {Token} from '@astryxdesign/core/Token';

<Token
  label="${s(v.label)}"
  color="${s(v.color)}"
  size="${s(v.size)}"${b(v.hasRemove) ? '\n  onRemove={() => {}}' : ''}${b(v.isDisabled) ? '\n  isDisabled' : ''}
/>`,
  },

  List: {
    tag: 'List',
    controls: [
      {kind: 'select', key: 'density', label: 'density', options: ['compact', 'balanced', 'spacious'], default: 'balanced'},
      {kind: 'bool', key: 'hasDividers', label: 'hasDividers', default: true},
      {kind: 'select', key: 'edge', label: 'edge', options: ['padded', 'flush', 'outset', 'bleed'], default: 'padded'},
      {kind: 'select', key: 'listStyle', label: 'listStyle', options: ['none', 'decimal'], default: 'none'},
    ],
    Preview: ({v}) => (
      <div style={{width: 320}}>
        <List
          density={s(v.density) as 'balanced'}
          hasDividers={b(v.hasDividers)}
          edge={s(v.edge) as 'padded'}
          listStyle={s(v.listStyle) as 'none'}>
          <ListItem label="알림" description="알림 수신 방식을 관리합니다" />
          <ListItem label="개인정보" description="데이터 공개 범위를 설정합니다" />
          <ListItem label="보안" description="비밀번호와 로그인 기기" />
        </List>
      </div>
    ),
    code: (v) =>
      `import {List, ListItem} from '@astryxdesign/core/List';

<List
  density="${s(v.density)}"
  hasDividers={${b(v.hasDividers)}}
  edge="${s(v.edge)}"
  listStyle="${s(v.listStyle)}">
  <ListItem label="알림" description="알림 수신 방식을 관리합니다" />
  <ListItem label="개인정보" description="데이터 공개 범위를 설정합니다" />
</List>`,
  },

  Item: {
    tag: 'Item',
    controls: [
      {kind: 'text', key: 'label', label: 'label', default: '김민준'},
      {kind: 'text', key: 'description', label: 'description', default: '영업 1팀 팀장'},
      {kind: 'select', key: 'density', label: 'density', options: ['compact', 'balanced', 'spacious'], default: 'balanced'},
      {kind: 'select', key: 'layout', label: 'layout', options: ['stacked', 'inline'], default: 'stacked'},
      {kind: 'bool', key: 'isSelected', label: 'isSelected', default: false},
      {kind: 'bool', key: 'isDisabled', label: 'isDisabled', default: false},
    ],
    Preview: ({v}) => (
      <div style={{width: 320}}>
        <Item
          startContent={<Avatar name={s(v.label) || '이름'} size="sm" />}
          label={s(v.label)}
          description={v.description ? s(v.description) : undefined}
          density={s(v.density) as 'balanced'}
          layout={s(v.layout) as 'stacked'}
          isSelected={b(v.isSelected)}
          isDisabled={b(v.isDisabled)}
          onClick={() => {}}
        />
      </div>
    ),
    code: (v) =>
      `import {Avatar} from '@astryxdesign/core/Avatar';
import {Item} from '@astryxdesign/core/Item';

<Item
  startContent={<Avatar name="${s(v.label)}" size="sm" />}
  label="${s(v.label)}"${v.description ? `\n  description="${s(v.description)}"` : ''}
  density="${s(v.density)}"
  layout="${s(v.layout)}"
  isSelected={${b(v.isSelected)}}
  isDisabled={${b(v.isDisabled)}}
  onClick={() => {}}
/>`,
  },

  MetadataList: {
    tag: 'MetadataList',
    controls: [
      {kind: 'select', key: 'orientation', label: 'orientation', options: ['vertical', 'horizontal'], default: 'vertical'},
      {kind: 'select', key: 'columns', label: 'columns', options: ['single', 'multi'], default: 'single'},
      {kind: 'text', key: 'title', label: 'title', default: '거래처 정보'},
    ],
    Preview: ({v}) => (
      <div style={{width: 420}}>
        <MetadataList
          orientation={s(v.orientation) as 'vertical'}
          columns={s(v.columns) as 'single'}
          title={v.title ? s(v.title) : undefined}>
          <MetadataListItem label="거래처명">한빛전자</MetadataListItem>
          <MetadataListItem label="담당자">김민준</MetadataListItem>
          <MetadataListItem label="상태">진행 중</MetadataListItem>
          <MetadataListItem label="등록일">2026-02-19</MetadataListItem>
        </MetadataList>
      </div>
    ),
    code: (v) =>
      `import {MetadataList, MetadataListItem} from '@astryxdesign/core/MetadataList';

<MetadataList
  orientation="${s(v.orientation)}"
  columns="${s(v.columns)}"${v.title ? `\n  title="${s(v.title)}"` : ''}>
  <MetadataListItem label="거래처명">한빛전자</MetadataListItem>
  <MetadataListItem label="담당자">김민준</MetadataListItem>
  <MetadataListItem label="상태">진행 중</MetadataListItem>
</MetadataList>`,
  },

  OverflowList: {
    tag: 'OverflowList',
    controls: [
      {kind: 'number', key: 'width', label: '컨테이너 너비(px)', default: 260, min: 120, max: 520, step: 20},
      {kind: 'select', key: 'gap', label: 'gap', options: ['1', '2', '3', '4'], default: '2'},
      {kind: 'select', key: 'collapseFrom', label: 'collapseFrom', options: ['end', 'start'], default: 'end'},
      {kind: 'number', key: 'minVisibleItems', label: 'minVisibleItems', default: 0, min: 0, max: 4},
    ],
    Preview: ({v}) => (
      <div style={{width: Number(v.width)}}>
        <OverflowList
          gap={Number(v.gap) as 2}
          collapseFrom={s(v.collapseFrom) as 'end'}
          minVisibleItems={Number(v.minVisibleItems)}
          overflowRenderer={(items) => <Token label={`+${items.length}`} color="gray" />}>
          {['영업', '마케팅', '개발', '디자인', '재무', '인사'].map((t) => (
            <Token key={t} label={t} color="blue" />
          ))}
        </OverflowList>
      </div>
    ),
    code: (v) =>
      `import {OverflowList} from '@astryxdesign/core/OverflowList';
import {Token} from '@astryxdesign/core/Token';

<OverflowList
  gap={${s(v.gap)}}
  collapseFrom="${s(v.collapseFrom)}"
  minVisibleItems={${s(v.minVisibleItems)}}
  overflowRenderer={(items) => <Token label={\`+\${items.length}\`} color="gray" />}>
  <Token label="영업" />
  <Token label="마케팅" />
  <Token label="개발" />
  <Token label="디자인" />
</OverflowList>`,
  },

  Table: {
    tag: 'Table',
    controls: [
      {kind: 'select', key: 'density', label: 'density', options: ['compact', 'balanced', 'spacious'], default: 'balanced'},
      {kind: 'select', key: 'dividers', label: 'dividers', options: ['rows', 'columns', 'grid', 'none'], default: 'rows'},
      {kind: 'bool', key: 'isStriped', label: 'isStriped', default: false},
      {kind: 'bool', key: 'hasHover', label: 'hasHover', default: true},
    ],
    Preview: ({v}) => (
      <div style={{width: 480}}>
        <Table<Account>
          data={ACCOUNTS}
          idKey="id"
          columns={[
            {key: 'name', header: '거래처명', width: proportional(1)},
            {key: 'owner', header: '담당자', width: proportional(1)},
            {key: 'status', header: '상태', width: proportional(1)},
          ]}
          density={s(v.density) as 'balanced'}
          dividers={s(v.dividers) as 'rows'}
          isStriped={b(v.isStriped)}
          hasHover={b(v.hasHover)}
        />
      </div>
    ),
    code: (v) =>
      `import {proportional, Table} from '@astryxdesign/core/Table';

type Account = {id: string; name: string; owner: string; status: string};
const data: Account[] = [
  {id: '1', name: '한빛전자', owner: '김민준', status: '진행 중'},
  {id: '2', name: '새봄무역', owner: '이서연', status: '계약 완료'},
];

<Table<Account>
  data={data}
  idKey="id"
  columns={[
    {key: 'name', header: '거래처명', width: proportional(1)},
    {key: 'owner', header: '담당자', width: proportional(1)},
    {key: 'status', header: '상태', width: proportional(1)},
  ]}
  density="${s(v.density)}"
  dividers="${s(v.dividers)}"
  isStriped={${b(v.isStriped)}}
  hasHover={${b(v.hasHover)}}
/>`,
  },

  TreeList: {
    tag: 'TreeList',
    controls: [
      {kind: 'select', key: 'density', label: 'density', options: ['compact', 'balanced', 'spacious'], default: 'balanced'},
      {kind: 'select', key: 'variant', label: 'variant', options: ['lineGuides', 'noGuides'], default: 'lineGuides'},
    ],
    Preview: ({v}) => (
      <div style={{width: 280}}>
        <TreeList
          density={s(v.density) as 'balanced'}
          variant={s(v.variant) as 'lineGuides'}
          aria-label="파일 목록"
          items={[
            {
              id: 'src',
              label: 'src',
              isExpanded: true,
              children: [
                {id: 'app', label: 'App.tsx'},
                {id: 'index', label: 'index.tsx'},
              ],
            },
            {id: 'docs', label: 'docs', children: [{id: 'readme', label: 'README.md'}]},
            {id: 'pkg', label: 'package.json'},
          ]}
        />
      </div>
    ),
    code: (v) =>
      `import {TreeList} from '@astryxdesign/core/TreeList';

<TreeList
  density="${s(v.density)}"
  variant="${s(v.variant)}"
  aria-label="파일 목록"
  items={[
    {
      id: 'src',
      label: 'src',
      isExpanded: true,
      children: [
        {id: 'app', label: 'App.tsx'},
        {id: 'index', label: 'index.tsx'},
      ],
    },
    {id: 'pkg', label: 'package.json'},
  ]}
/>`,
  },

  Chat: {
    tag: 'Chat',
    controls: [
      {kind: 'select', key: 'density', label: 'density', options: ['compact', 'balanced', 'spacious'], default: 'balanced'},
      {kind: 'select', key: 'variant', label: '말풍선 variant', options: ['filled', 'ghost'], default: 'filled'},
    ],
    note: '입력창에 메시지를 쓰고 보내면 대화가 추가됩니다.',
    Preview: ({v}) => {
      const [text, setText] = useState('');
      const [sent, setSent] = useState<string[]>([]);
      const variant = s(v.variant) as 'filled';
      return (
        <div style={{width: 420, display: 'flex', flexDirection: 'column', gap: 12}}>
          <ChatMessageList density={s(v.density) as 'balanced'} align="top">
            <ChatMessage sender="assistant" name="도우미" avatar={<Avatar name="도우미" size="md" />}>
              <ChatMessageBubble variant={variant}>안녕하세요! 무엇을 도와드릴까요?</ChatMessageBubble>
            </ChatMessage>
            <ChatMessage sender="user" name="민준">
              <ChatMessageBubble variant={variant}>이번 달 신규 거래처를 알려 주세요.</ChatMessageBubble>
            </ChatMessage>
            {sent.map((m, i) => (
              <ChatMessage key={i} sender="user" name="민준">
                <ChatMessageBubble variant={variant}>{m}</ChatMessageBubble>
              </ChatMessage>
            ))}
          </ChatMessageList>
          <ChatComposer
            value={text}
            onChange={setText}
            onSubmit={(val) => {
              if (val) setSent((p) => [...p, val]);
              setText('');
            }}
            placeholder="메시지를 입력하세요"
          />
        </div>
      );
    },
    code: (v) =>
      `import {Avatar} from '@astryxdesign/core/Avatar';
import {
  ChatComposer,
  ChatMessage,
  ChatMessageBubble,
  ChatMessageList,
} from '@astryxdesign/core/Chat';

<ChatMessageList density="${s(v.density)}" align="top">
  <ChatMessage sender="assistant" name="도우미" avatar={<Avatar name="도우미" size="md" />}>
    <ChatMessageBubble variant="${s(v.variant)}">안녕하세요! 무엇을 도와드릴까요?</ChatMessageBubble>
  </ChatMessage>
  <ChatMessage sender="user" name="민준">
    <ChatMessageBubble variant="${s(v.variant)}">이번 달 신규 거래처를 알려 주세요.</ChatMessageBubble>
  </ChatMessage>
</ChatMessageList>
<ChatComposer onSubmit={(value) => console.log(value)} placeholder="메시지를 입력하세요" />`,
  },

  VisuallyHidden: {
    tag: 'VisuallyHidden',
    controls: [],
    note: '화면에는 보이지 않고 스크린 리더만 읽는 텍스트입니다. 아이콘만 있는 버튼에 이름을 붙일 때 씁니다.',
    Preview: () => (
      <div style={{display: 'flex', alignItems: 'center', gap: 8}}>
        <button type="button">
          ×<VisuallyHidden>거래처 삭제</VisuallyHidden>
        </button>
        <Text type="supporting">버튼 안에 숨은 텍스트가 있습니다(스크린 리더용).</Text>
      </div>
    ),
    code: () =>
      `import {VisuallyHidden} from '@astryxdesign/core/VisuallyHidden';

<VisuallyHidden>거래처 삭제</VisuallyHidden>
<VisuallyHidden as="div" aria-live="polite">
  {'한빛전자를 진행 중으로 이동했습니다'}
</VisuallyHidden>`,
  },
};

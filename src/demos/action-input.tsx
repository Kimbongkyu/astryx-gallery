import {useState} from 'react';
import {Button} from '@astryxdesign/core/Button';
import {ButtonGroup} from '@astryxdesign/core/ButtonGroup';
import {ContextMenu} from '@astryxdesign/core/ContextMenu';
import {DateInput} from '@astryxdesign/core/DateInput';
import {DateRangeInput} from '@astryxdesign/core/DateRangeInput';
import {DateTimeInput} from '@astryxdesign/core/DateTimeInput';
import {DropdownMenu} from '@astryxdesign/core/DropdownMenu';
import {Field} from '@astryxdesign/core/Field';
import {FieldStatus} from '@astryxdesign/core/FieldStatus';
import {FileInput} from '@astryxdesign/core/FileInput';
import {InputGroup, InputGroupText} from '@astryxdesign/core/InputGroup';
import {MoreMenu} from '@astryxdesign/core/MoreMenu';
import {NumberInput} from '@astryxdesign/core/NumberInput';
import {PowerSearch} from '@astryxdesign/core/PowerSearch';
import {TextArea} from '@astryxdesign/core/TextArea';
import {TextInput} from '@astryxdesign/core/TextInput';
import {TimeInput} from '@astryxdesign/core/TimeInput';
import {Toolbar} from '@astryxdesign/core/Toolbar';
import {Tokenizer} from '@astryxdesign/core/Tokenizer';
import {Typeahead, createStaticSource} from '@astryxdesign/core/Typeahead';

import type {Demo, Values} from '../demoTypes';
import {b, s} from '../demoTypes';

const SIZES = ['sm', 'md', 'lg'];

const menuItems = [
  {label: '수정', onClick: () => undefined},
  {label: '복사', onClick: () => undefined},
  {type: 'divider' as const},
  {label: '삭제', onClick: () => undefined},
];

const fruitItems = [
  {id: 'apple', label: '사과'},
  {id: 'banana', label: '바나나'},
  {id: 'grape', label: '포도'},
  {id: 'orange', label: '오렌지'},
  {id: 'peach', label: '복숭아'},
];

function ButtonGroupPreview({v}: {v: Values}) {
  return (
    <ButtonGroup
      label="편집 동작"
      orientation={s(v.orientation) as 'horizontal'}
      size={s(v.size) as 'md'}
      isDisabled={b(v.isDisabled)}
    >
      <Button label="복사" />
      <Button label="잘라내기" />
      <Button label="붙여넣기" />
    </ButtonGroup>
  );
}

function ToolbarPreview({v}: {v: Values}) {
  return (
    <Toolbar
      label="도구 모음"
      size={s(v.size) as 'md'}
      gap={Number(v.gap) as 1}
      orientation={s(v.orientation) as 'horizontal'}
      dividers={b(v.hasDivider) ? ['bottom'] : undefined}
      startContent={<Button label="잘라내기" variant="ghost" />}
      centerContent={<Button label="복사" variant="ghost" />}
      endContent={<Button label="설정" variant="ghost" />}
    />
  );
}

function DropdownMenuPreview({v}: {v: Values}) {
  return (
    <DropdownMenu
      button={{label: s(v.label)}}
      items={menuItems}
      hasChevron={b(v.hasChevron)}
      placement={s(v.placement) as 'below'}
      alignment={s(v.alignment) as 'start'}
    />
  );
}

function MoreMenuPreview({v}: {v: Values}) {
  return (
    <MoreMenu
      label={v.label ? s(v.label) : undefined}
      items={menuItems}
      variant={s(v.variant) as 'ghost'}
      size={s(v.size) as 'md'}
      isDisabled={b(v.isDisabled)}
    />
  );
}

function ContextMenuPreview({v}: {v: Values}) {
  return (
    <ContextMenu
      items={menuItems}
      size={s(v.size) as 'md'}
      isDisabled={b(v.isDisabled)}
    >
      <div style={{padding: 32, border: '1px dashed currentColor', borderRadius: 8}}>
        이 영역에서 마우스 오른쪽 버튼을 누르세요
      </div>
    </ContextMenu>
  );
}

function TextAreaPreview({v}: {v: Values}) {
  const [text, setText] = useState('');
  return (
    <TextArea
      label={s(v.label)}
      value={text}
      onChange={(next) => setText(next)}
      placeholder={v.placeholder ? s(v.placeholder) : undefined}
      description={v.description ? s(v.description) : undefined}
      rows={Number(v.rows)}
      size={s(v.size) as 'md'}
      isDisabled={b(v.isDisabled)}
      isRequired={b(v.isRequired)}
    />
  );
}

function NumberInputPreview({v}: {v: Values}) {
  const [n, setN] = useState<number | null>(3);
  return (
    <NumberInput
      label={s(v.label)}
      value={n}
      hasClear
      onChange={(next) => setN(next)}
      min={Number(v.min)}
      max={Number(v.max)}
      step={Number(v.step)}
      units={v.units ? s(v.units) : undefined}
      isIntegerOnly={b(v.isIntegerOnly)}
      hasNumberSteppers={b(v.hasNumberSteppers)}
      size={s(v.size) as 'md'}
      isDisabled={b(v.isDisabled)}
    />
  );
}

function DateInputPreview({v}: {v: Values}) {
  const [d, setD] = useState<string | undefined>(undefined);
  return (
    <DateInput
      label={s(v.label)}
      value={d as never}
      onChange={(next) => setD(next as string | undefined)}
      placeholder={v.placeholder ? s(v.placeholder) : undefined}
      hasClear={b(v.hasClear)}
      numberOfMonths={Number(v.numberOfMonths) as 1}
      size={s(v.size) as 'md'}
      isDisabled={b(v.isDisabled)}
    />
  );
}

function DateRangeInputPreview({v}: {v: Values}) {
  const [r, setR] = useState<{start: string; end: string} | null>(null);
  return (
    <DateRangeInput
      label={s(v.label)}
      value={r as never}
      onChange={(next) => setR(next as {start: string; end: string} | null)}
      hasClear={b(v.hasClear)}
      numberOfMonths={Number(v.numberOfMonths) as 1}
      size={s(v.size) as 'md'}
      isDisabled={b(v.isDisabled)}
    />
  );
}

function DateTimeInputPreview({v}: {v: Values}) {
  const [d, setD] = useState<string | undefined>(undefined);
  return (
    <DateTimeInput
      label={s(v.label)}
      value={d as never}
      onChange={(next) => setD(next as string | undefined)}
      hasSeconds={b(v.hasSeconds)}
      hourFormat={s(v.hourFormat) as '24h'}
      hasClear={b(v.hasClear)}
      size={s(v.size) as 'md'}
      isDisabled={b(v.isDisabled)}
    />
  );
}

function TimeInputPreview({v}: {v: Values}) {
  const [t, setT] = useState<string | undefined>(undefined);
  return (
    <TimeInput
      label={s(v.label)}
      value={t as never}
      onChange={(next) => setT(next as string | undefined)}
      hasSeconds={b(v.hasSeconds)}
      hourFormat={s(v.hourFormat) as '24h'}
      increment={Number(v.increment)}
      hasClear={b(v.hasClear)}
      size={s(v.size) as 'md'}
      isDisabled={b(v.isDisabled)}
    />
  );
}

function FileInputPreview({v}: {v: Values}) {
  const [f, setF] = useState<File | File[] | null>(null);
  return (
    <FileInput
      label={s(v.label)}
      value={f}
      onChange={(next) => setF(next)}
      mode={s(v.mode) as 'input'}
      isMultiple={b(v.isMultiple)}
      isDisabled={b(v.isDisabled)}
      description={v.description ? s(v.description) : undefined}
    />
  );
}

function FieldPreview({v}: {v: Values}) {
  const status = s(v.statusType);
  return (
    <Field
      label={s(v.label)}
      inputID="gallery-field-input"
      description={v.description ? s(v.description) : undefined}
      isRequired={b(v.isRequired)}
      isDisabled={b(v.isDisabled)}
      status={status === 'none' ? undefined : {type: status as 'error', message: '상태 메시지 예시입니다'}}
      statusVariant={s(v.statusVariant) as 'attached'}
    >
      <input id="gallery-field-input" disabled={b(v.isDisabled)} />
    </Field>
  );
}

function FieldStatusPreview({v}: {v: Values}) {
  return (
    <FieldStatus
      type={s(v.type) as 'error'}
      message={s(v.message)}
      variant={s(v.variant) as 'attached'}
    />
  );
}

function InputGroupPreview({v}: {v: Values}) {
  const [price, setPrice] = useState('');
  return (
    <InputGroup
      label={s(v.label)}
      size={s(v.size) as 'md'}
      isDisabled={b(v.isDisabled)}
      description={v.description ? s(v.description) : undefined}
    >
      <InputGroupText>₩</InputGroupText>
      <TextInput label="가격" isLabelHidden value={price} onChange={(next) => setPrice(next)} />
    </InputGroup>
  );
}

function TypeaheadPreview({v}: {v: Values}) {
  const [item, setItem] = useState<(typeof fruitItems)[number] | null>(null);
  const [source] = useState(() => createStaticSource(fruitItems));
  return (
    <Typeahead
      label={s(v.label)}
      searchSource={source}
      value={item}
      onChange={(next) => setItem(next)}
      placeholder={v.placeholder ? s(v.placeholder) : undefined}
      hasEntriesOnFocus={b(v.hasEntriesOnFocus)}
      hasClear={b(v.hasClear)}
      size={s(v.size) as 'md'}
      isDisabled={b(v.isDisabled)}
    />
  );
}

function TokenizerPreview({v}: {v: Values}) {
  const [items, setItems] = useState<typeof fruitItems>([]);
  const [source] = useState(() => createStaticSource(fruitItems));
  return (
    <Tokenizer
      label={s(v.label)}
      searchSource={source}
      value={items}
      onChange={(next) => setItems(next)}
      placeholder={v.placeholder ? s(v.placeholder) : undefined}
      hasCreate={b(v.hasCreate)}
      hasClear={b(v.hasClear)}
      hasEntriesOnFocus={b(v.hasEntriesOnFocus)}
      size={s(v.size) as 'md'}
      isDisabled={b(v.isDisabled)}
    />
  );
}

const powerSearchConfig = {
  name: 'GallerySearch',
  contentSearchFieldKey: 'title',
  fields: [
    {
      key: 'title',
      label: '제목',
      operators: [{key: 'contains', label: '포함', value: {type: 'string' as const}}],
    },
    {
      key: 'status',
      label: '상태',
      operators: [
        {
          key: 'is',
          label: '일치',
          value: {
            type: 'enum' as const,
            values: [
              {value: 'open', label: '진행 중'},
              {value: 'closed', label: '완료'},
            ],
          },
        },
      ],
    },
  ],
};

function PowerSearchPreview({v}: {v: Values}) {
  const [filters, setFilters] = useState<never[]>([]);
  return (
    <PowerSearch
      config={powerSearchConfig as never}
      filters={filters}
      onChange={(next) => setFilters(next as never[])}
      label={s(v.label)}
      placeholder={v.placeholder ? s(v.placeholder) : undefined}
      hasClear={b(v.hasClear)}
      size={s(v.size) as 'md'}
      isDisabled={b(v.isDisabled)}
    />
  );
}

const sizeCtl = {kind: 'select' as const, key: 'size', label: 'size', options: SIZES, default: 'md'};
const disabledCtl = {kind: 'bool' as const, key: 'isDisabled', label: 'isDisabled', default: false};
const MENU_ITEMS_CODE = `[
    {label: '수정', onClick: () => {}},
    {label: '복사', onClick: () => {}},
    {type: 'divider'},
    {label: '삭제', onClick: () => {}},
  ]`;

export const DEMOS_ACTION_INPUT: Record<string, Demo> = {
  ButtonGroup: {
    tag: 'ButtonGroup',
    controls: [
      {kind: 'select', key: 'orientation', label: 'orientation', options: ['horizontal', 'vertical'], default: 'horizontal'},
      sizeCtl,
      disabledCtl,
    ],
    Preview: ButtonGroupPreview,
    code: (v) => `import {Button} from '@astryxdesign/core/Button';
import {ButtonGroup} from '@astryxdesign/core/ButtonGroup';

<ButtonGroup label="편집 동작" orientation="${s(v.orientation)}" size="${s(v.size)}"${b(v.isDisabled) ? ' isDisabled' : ''}>
  <Button label="복사" />
  <Button label="잘라내기" />
  <Button label="붙여넣기" />
</ButtonGroup>`,
  },
  Toolbar: {
    tag: 'Toolbar',
    controls: [
      sizeCtl,
      {kind: 'number', key: 'gap', label: 'gap', default: 1, min: 0, max: 10, step: 1},
      {kind: 'select', key: 'orientation', label: 'orientation', options: ['horizontal', 'vertical'], default: 'horizontal'},
      {kind: 'bool', key: 'hasDivider', label: 'dividers(bottom)', default: false},
    ],
    Preview: ToolbarPreview,
    code: (v) => `import {Button} from '@astryxdesign/core/Button';
import {Toolbar} from '@astryxdesign/core/Toolbar';

<Toolbar
  label="도구 모음"
  size="${s(v.size)}"
  gap={${Number(v.gap)}}
  orientation="${s(v.orientation)}"${b(v.hasDivider) ? "\n  dividers={['bottom']}" : ''}
  startContent={<Button label="잘라내기" variant="ghost" />}
  centerContent={<Button label="복사" variant="ghost" />}
  endContent={<Button label="설정" variant="ghost" />}
/>`,
  },
  DropdownMenu: {
    tag: 'DropdownMenu',
    controls: [
      {kind: 'text', key: 'label', label: 'button.label', default: '동작'},
      {kind: 'bool', key: 'hasChevron', label: 'hasChevron', default: true},
      {kind: 'select', key: 'placement', label: 'placement', options: ['below', 'above'], default: 'below'},
      {kind: 'select', key: 'alignment', label: 'alignment', options: ['start', 'end'], default: 'start'},
    ],
    Preview: DropdownMenuPreview,
    note: 'placement 값은 소스에서 기본값(below)만 확인되었습니다.',
    code: (v) => `import {DropdownMenu} from '@astryxdesign/core/DropdownMenu';

<DropdownMenu
  button={{label: '${s(v.label)}'}}
  hasChevron={${b(v.hasChevron)}}
  placement="${s(v.placement)}"
  alignment="${s(v.alignment)}"
  items={${MENU_ITEMS_CODE}}
/>`,
  },
  MoreMenu: {
    tag: 'MoreMenu',
    controls: [
      {kind: 'text', key: 'label', label: 'label', default: '더보기'},
      {kind: 'select', key: 'variant', label: 'variant', options: ['ghost', 'secondary', 'primary'], default: 'ghost'},
      sizeCtl,
      disabledCtl,
    ],
    Preview: MoreMenuPreview,
    code: (v) => `import {MoreMenu} from '@astryxdesign/core/MoreMenu';

<MoreMenu
  label="${s(v.label)}"
  variant="${s(v.variant)}"
  size="${s(v.size)}"${b(v.isDisabled) ? '\n  isDisabled' : ''}
  items={${MENU_ITEMS_CODE}}
/>`,
  },
  ContextMenu: {
    tag: 'ContextMenu',
    controls: [sizeCtl, disabledCtl],
    Preview: ContextMenuPreview,
    code: (v) => `import {ContextMenu} from '@astryxdesign/core/ContextMenu';

<ContextMenu
  size="${s(v.size)}"${b(v.isDisabled) ? '\n  isDisabled' : ''}
  items={${MENU_ITEMS_CODE}}
>
  <div>이 영역에서 마우스 오른쪽 버튼을 누르세요</div>
</ContextMenu>`,
  },
  TextArea: {
    tag: 'TextArea',
    extra: 'value={value} onChange={setValue}',
    controls: [
      {kind: 'text', key: 'label', label: 'label', default: '설명'},
      {kind: 'text', key: 'placeholder', label: 'placeholder', default: '내용을 입력하세요'},
      {kind: 'text', key: 'description', label: 'description', default: ''},
      {kind: 'number', key: 'rows', label: 'rows', default: 3, min: 1, max: 12, step: 1},
      sizeCtl,
      disabledCtl,
      {kind: 'bool', key: 'isRequired', label: 'isRequired', default: false},
    ],
    Preview: TextAreaPreview,
  },
  NumberInput: {
    tag: 'NumberInput',
    extra: 'value={value} onChange={setValue}',
    controls: [
      {kind: 'text', key: 'label', label: 'label', default: '수량'},
      {kind: 'number', key: 'min', label: 'min', default: 0, min: -100, max: 100, step: 1},
      {kind: 'number', key: 'max', label: 'max', default: 100, min: 0, max: 1000, step: 1},
      {kind: 'number', key: 'step', label: 'step', default: 1, min: 1, max: 50, step: 1},
      {kind: 'text', key: 'units', label: 'units', default: '개'},
      {kind: 'bool', key: 'isIntegerOnly', label: 'isIntegerOnly', default: false},
      {kind: 'bool', key: 'hasNumberSteppers', label: 'hasNumberSteppers', default: true},
      sizeCtl,
      disabledCtl,
    ],
    Preview: NumberInputPreview,
  },
  DateInput: {
    tag: 'DateInput',
    extra: 'value={date} onChange={setDate}',
    controls: [
      {kind: 'text', key: 'label', label: 'label', default: '날짜'},
      {kind: 'text', key: 'placeholder', label: 'placeholder', default: '날짜를 선택하세요'},
      {kind: 'bool', key: 'hasClear', label: 'hasClear', default: true},
      {kind: 'number', key: 'numberOfMonths', label: 'numberOfMonths', default: 1, min: 1, max: 2, step: 1},
      sizeCtl,
      disabledCtl,
    ],
    Preview: DateInputPreview,
  },
  DateRangeInput: {
    tag: 'DateRangeInput',
    extra: 'value={range} onChange={setRange}',
    controls: [
      {kind: 'text', key: 'label', label: 'label', default: '기간'},
      {kind: 'bool', key: 'hasClear', label: 'hasClear', default: true},
      {kind: 'number', key: 'numberOfMonths', label: 'numberOfMonths', default: 2, min: 1, max: 2, step: 1},
      sizeCtl,
      disabledCtl,
    ],
    Preview: DateRangeInputPreview,
  },
  DateTimeInput: {
    tag: 'DateTimeInput',
    extra: 'value={dateTime} onChange={setDateTime}',
    controls: [
      {kind: 'text', key: 'label', label: 'label', default: '회의 시간'},
      {kind: 'bool', key: 'hasSeconds', label: 'hasSeconds', default: false},
      {kind: 'select', key: 'hourFormat', label: 'hourFormat', options: ['12h', '24h'], default: '24h'},
      {kind: 'bool', key: 'hasClear', label: 'hasClear', default: true},
      sizeCtl,
      disabledCtl,
    ],
    Preview: DateTimeInputPreview,
  },
  TimeInput: {
    tag: 'TimeInput',
    extra: 'value={time} onChange={setTime}',
    controls: [
      {kind: 'text', key: 'label', label: 'label', default: '시작 시간'},
      {kind: 'bool', key: 'hasSeconds', label: 'hasSeconds', default: false},
      {kind: 'select', key: 'hourFormat', label: 'hourFormat', options: ['12h', '24h'], default: '24h'},
      {kind: 'number', key: 'increment', label: 'increment(분)', default: 1, min: 1, max: 60, step: 1},
      {kind: 'bool', key: 'hasClear', label: 'hasClear', default: true},
      sizeCtl,
      disabledCtl,
    ],
    Preview: TimeInputPreview,
  },
  FileInput: {
    tag: 'FileInput',
    extra: 'value={file} onChange={setFile}',
    controls: [
      {kind: 'text', key: 'label', label: 'label', default: '첨부 파일'},
      {kind: 'text', key: 'description', label: 'description', default: ''},
      {kind: 'select', key: 'mode', label: 'mode', options: ['input', 'dropzone'], default: 'input'},
      {kind: 'bool', key: 'isMultiple', label: 'isMultiple', default: false},
      disabledCtl,
    ],
    Preview: FileInputPreview,
  },
  Field: {
    tag: 'Field',
    controls: [
      {kind: 'text', key: 'label', label: 'label', default: '이메일'},
      {kind: 'text', key: 'description', label: 'description', default: '다른 사람에게 공개되지 않습니다'},
      {kind: 'select', key: 'statusType', label: 'status.type', options: ['none', 'error', 'warning', 'success'], default: 'none'},
      {kind: 'select', key: 'statusVariant', label: 'statusVariant', options: ['attached', 'detached', 'tooltip'], default: 'attached'},
      {kind: 'bool', key: 'isRequired', label: 'isRequired', default: false},
      disabledCtl,
    ],
    Preview: FieldPreview,
    code: (v) => `import {Field} from '@astryxdesign/core/Field';

<Field
  label="${s(v.label)}"
  inputID="email-input"${v.description ? `\n  description="${s(v.description)}"` : ''}${b(v.isRequired) ? '\n  isRequired' : ''}${s(v.statusType) !== 'none' ? `\n  status={{type: '${s(v.statusType)}', message: '상태 메시지 예시입니다'}}` : ''}
  statusVariant="${s(v.statusVariant)}"
>
  <input id="email-input" />
</Field>`,
  },
  FieldStatus: {
    tag: 'FieldStatus',
    controls: [
      {kind: 'select', key: 'type', label: 'type', options: ['error', 'warning', 'success'], default: 'error'},
      {kind: 'text', key: 'message', label: 'message', default: '필수 입력 항목입니다'},
      {kind: 'select', key: 'variant', label: 'variant', options: ['attached', 'detached'], default: 'detached'},
    ],
    Preview: FieldStatusPreview,
  },
  InputGroup: {
    tag: 'InputGroup',
    controls: [
      {kind: 'text', key: 'label', label: 'label', default: '가격'},
      {kind: 'text', key: 'description', label: 'description', default: ''},
      sizeCtl,
      disabledCtl,
    ],
    Preview: InputGroupPreview,
    code: (v) => `import {InputGroup, InputGroupText} from '@astryxdesign/core/InputGroup';
import {TextInput} from '@astryxdesign/core/TextInput';

<InputGroup label="${s(v.label)}" size="${s(v.size)}"${b(v.isDisabled) ? ' isDisabled' : ''}>
  <InputGroupText>₩</InputGroupText>
  <TextInput label="가격" isLabelHidden value={price} onChange={setPrice} />
</InputGroup>`,
  },
  Typeahead: {
    tag: 'Typeahead',
    controls: [
      {kind: 'text', key: 'label', label: 'label', default: '과일'},
      {kind: 'text', key: 'placeholder', label: 'placeholder', default: '과일 이름을 입력하세요'},
      {kind: 'bool', key: 'hasEntriesOnFocus', label: 'hasEntriesOnFocus', default: true},
      {kind: 'bool', key: 'hasClear', label: 'hasClear', default: true},
      sizeCtl,
      disabledCtl,
    ],
    Preview: TypeaheadPreview,
    code: (v) => `import {Typeahead, createStaticSource} from '@astryxdesign/core/Typeahead';

const source = createStaticSource([
  {id: 'apple', label: '사과'},
  {id: 'banana', label: '바나나'},
  {id: 'grape', label: '포도'},
]);

<Typeahead
  label="${s(v.label)}"
  searchSource={source}
  value={item}
  onChange={setItem}
  hasEntriesOnFocus={${b(v.hasEntriesOnFocus)}}
  hasClear={${b(v.hasClear)}}
  size="${s(v.size)}"
/>`,
  },
  Tokenizer: {
    tag: 'Tokenizer',
    controls: [
      {kind: 'text', key: 'label', label: 'label', default: '좋아하는 과일'},
      {kind: 'text', key: 'placeholder', label: 'placeholder', default: '과일을 추가하세요'},
      {kind: 'bool', key: 'hasCreate', label: 'hasCreate', default: false},
      {kind: 'bool', key: 'hasClear', label: 'hasClear', default: true},
      {kind: 'bool', key: 'hasEntriesOnFocus', label: 'hasEntriesOnFocus', default: true},
      sizeCtl,
      disabledCtl,
    ],
    Preview: TokenizerPreview,
    code: (v) => `import {Tokenizer} from '@astryxdesign/core/Tokenizer';
import {createStaticSource} from '@astryxdesign/core/Typeahead';

const source = createStaticSource([
  {id: 'apple', label: '사과'},
  {id: 'banana', label: '바나나'},
  {id: 'grape', label: '포도'},
]);

<Tokenizer
  label="${s(v.label)}"
  searchSource={source}
  value={items}
  onChange={setItems}
  hasCreate={${b(v.hasCreate)}}
  hasClear={${b(v.hasClear)}}
  size="${s(v.size)}"
/>`,
  },
  PowerSearch: {
    tag: 'PowerSearch',
    controls: [
      {kind: 'text', key: 'label', label: 'label', default: '검색'},
      {kind: 'text', key: 'placeholder', label: 'placeholder', default: '필터를 입력하세요'},
      {kind: 'bool', key: 'hasClear', label: 'hasClear', default: true},
      sizeCtl,
      disabledCtl,
    ],
    Preview: PowerSearchPreview,
    code: () => `import {useState} from 'react';
import {PowerSearch} from '@astryxdesign/core/PowerSearch';

const config = {
  name: 'MySearch',
  contentSearchFieldKey: 'title',
  fields: [
    {
      key: 'title',
      label: '제목',
      operators: [{key: 'contains', label: '포함', value: {type: 'string'}}],
    },
    {
      key: 'status',
      label: '상태',
      operators: [
        {
          key: 'is',
          label: '일치',
          value: {
            type: 'enum',
            values: [
              {value: 'open', label: '진행 중'},
              {value: 'closed', label: '완료'},
            ],
          },
        },
      ],
    },
  ],
};

const [filters, setFilters] = useState([]);
<PowerSearch config={config} filters={filters} onChange={(next) => setFilters(next)} />`,
  },
};

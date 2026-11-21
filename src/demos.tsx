import {useState} from 'react';
import {Badge} from '@astryxdesign/core/Badge';
import {Banner} from '@astryxdesign/core/Banner';
import {Button} from '@astryxdesign/core/Button';
import {ProgressBar} from '@astryxdesign/core/ProgressBar';
import {Slider} from '@astryxdesign/core/Slider';
import {Spinner} from '@astryxdesign/core/Spinner';
import {Switch} from '@astryxdesign/core/Switch';
import {TextInput} from '@astryxdesign/core/TextInput';
import {ToggleButton} from '@astryxdesign/core/ToggleButton';

import type {Control, Demo, Values} from './demoTypes';
import {b, s} from './demoTypes';
import {GROUP_DEMOS} from './demos/index';

export type {Control, Demo, Values};

function ButtonPreview({v}: {v: Values}) {
  return (
    <Button
      label={s(v.label)}
      variant={s(v.variant) as 'primary'}
      size={s(v.size) as 'md'}
      isDisabled={b(v.isDisabled)}
      isLoading={b(v.isLoading)}
    />
  );
}

function SwitchPreview({v}: {v: Values}) {
  const [on, setOn] = useState(false);
  return (
    <Switch
      label={s(v.label)}
      value={on}
      onChange={(checked) => setOn(checked)}
      description={v.description ? s(v.description) : undefined}
      isDisabled={b(v.isDisabled)}
      size={s(v.size) as 'md'}
      labelPosition={s(v.labelPosition) as 'end'}
    />
  );
}

function TextInputPreview({v}: {v: Values}) {
  const [text, setText] = useState('');
  return (
    <TextInput
      label={s(v.label)}
      value={text}
      onChange={(next) => setText(next)}
      placeholder={v.placeholder ? s(v.placeholder) : undefined}
      description={v.description ? s(v.description) : undefined}
      type={s(v.type) as 'text'}
      size={s(v.size) as 'md'}
      isDisabled={b(v.isDisabled)}
      isRequired={b(v.isRequired)}
      hasClear={b(v.hasClear)}
    />
  );
}

function BadgePreview({v}: {v: Values}) {
  return <Badge label={s(v.label)} variant={s(v.variant) as 'neutral'} />;
}

function BannerPreview({v}: {v: Values}) {
  const [shown, setShown] = useState(true);
  if (!shown) {
    return <Button label="배너 다시 보기" onClick={() => setShown(true)} />;
  }
  return (
    <Banner
      status={s(v.status) as 'info'}
      title={s(v.title)}
      description={v.description ? s(v.description) : undefined}
      isDismissable={b(v.isDismissable)}
      onDismiss={() => setShown(false)}
    />
  );
}

function ProgressBarPreview({v}: {v: Values}) {
  return (
    <ProgressBar
      label={s(v.label)}
      value={Number(v.value)}
      variant={s(v.variant) as 'accent'}
      hasValueLabel={b(v.hasValueLabel)}
      isIndeterminate={b(v.isIndeterminate)}
      isDisabled={b(v.isDisabled)}
    />
  );
}

function SliderPreview({v}: {v: Values}) {
  const [val, setVal] = useState(40);
  return (
    <Slider
      label={s(v.label)}
      value={val}
      onChange={(next) => setVal(next as number)}
      step={Number(v.step)}
      valueDisplay={s(v.valueDisplay) as 'tooltip'}
      isDisabled={b(v.isDisabled)}
      width={280}
    />
  );
}

function ToggleButtonPreview({v}: {v: Values}) {
  const [pressed, setPressed] = useState(false);
  return (
    <ToggleButton
      label={s(v.label)}
      isPressed={pressed}
      onPressedChange={(next) => setPressed(next)}
      size={s(v.size) as 'md'}
      isDisabled={b(v.isDisabled)}
    />
  );
}

function SpinnerPreview({v}: {v: Values}) {
  return (
    <Spinner
      size={s(v.size) as 'md'}
      shade={s(v.shade) as 'default'}
      label={v.label ? s(v.label) : undefined}
    />
  );
}

const BASE_DEMOS: Record<string, Demo> = {
  Button: {
    tag: 'Button',
    Preview: ButtonPreview,
    controls: [
      {kind: 'text', key: 'label', label: '글자', default: '저장'},
      {
        kind: 'select',
        key: 'variant',
        label: '종류',
        options: ['primary', 'secondary', 'ghost', 'destructive'],
        default: 'primary',
      },
      {kind: 'select', key: 'size', label: '크기', options: ['sm', 'md', 'lg'], default: 'md'},
      {kind: 'bool', key: 'isDisabled', label: '비활성', default: false},
      {kind: 'bool', key: 'isLoading', label: '로딩 중', default: false},
    ],
  },
  Switch: {
    tag: 'Switch',
    Preview: SwitchPreview,
    extra: 'value={on} onChange={setOn}',
    controls: [
      {kind: 'text', key: 'label', label: '글자', default: '알림 받기'},
      {kind: 'text', key: 'description', label: '설명', default: ''},
      {kind: 'select', key: 'size', label: '크기', options: ['sm', 'md'], default: 'md'},
      {
        kind: 'select',
        key: 'labelPosition',
        label: '글자 위치',
        options: ['start', 'end'],
        default: 'end',
      },
      {kind: 'bool', key: 'isDisabled', label: '비활성', default: false},
    ],
  },
  TextInput: {
    tag: 'TextInput',
    Preview: TextInputPreview,
    extra: 'value={text} onChange={setText}',
    controls: [
      {kind: 'text', key: 'label', label: '라벨', default: '이름'},
      {kind: 'text', key: 'placeholder', label: '안내 문구', default: '홍길동'},
      {kind: 'text', key: 'description', label: '설명', default: ''},
      {
        kind: 'select',
        key: 'type',
        label: '종류',
        options: ['text', 'password', 'email', 'search', 'tel', 'url'],
        default: 'text',
      },
      {kind: 'select', key: 'size', label: '크기', options: ['sm', 'md'], default: 'md'},
      {kind: 'bool', key: 'isRequired', label: '필수', default: false},
      {kind: 'bool', key: 'hasClear', label: '지우기 버튼', default: false},
      {kind: 'bool', key: 'isDisabled', label: '비활성', default: false},
    ],
  },
  Badge: {
    tag: 'Badge',
    Preview: BadgePreview,
    controls: [
      {kind: 'text', key: 'label', label: '글자', default: '신규'},
      {
        kind: 'select',
        key: 'variant',
        label: '색·종류',
        options: [
          'neutral',
          'info',
          'success',
          'warning',
          'error',
          'blue',
          'cyan',
          'green',
          'orange',
          'pink',
          'purple',
          'red',
          'teal',
          'yellow',
        ],
        default: 'neutral',
      },
    ],
  },
  Banner: {
    tag: 'Banner',
    Preview: BannerPreview,
    controls: [
      {
        kind: 'select',
        key: 'status',
        label: '종류',
        options: ['info', 'success', 'warning', 'error'],
        default: 'info',
      },
      {kind: 'text', key: 'title', label: '제목', default: '저장되었습니다'},
      {kind: 'text', key: 'description', label: '설명', default: '변경 내용이 반영됐어요.'},
      {kind: 'bool', key: 'isDismissable', label: '닫기 버튼', default: true},
    ],
  },
  ProgressBar: {
    tag: 'ProgressBar',
    Preview: ProgressBarPreview,
    controls: [
      {kind: 'text', key: 'label', label: '라벨', default: '업로드'},
      {kind: 'number', key: 'value', label: '값(0~100)', default: 60, min: 0, max: 100, step: 5},
      {
        kind: 'select',
        key: 'variant',
        label: '색·종류',
        options: ['accent', 'success', 'warning', 'error', 'neutral', 'disabled'],
        default: 'accent',
      },
      {kind: 'bool', key: 'hasValueLabel', label: '퍼센트 표시', default: true},
      {kind: 'bool', key: 'isIndeterminate', label: '끝을 모름(무한)', default: false},
      {kind: 'bool', key: 'isDisabled', label: '비활성', default: false},
    ],
  },
  Slider: {
    tag: 'Slider',
    Preview: SliderPreview,
    extra: 'value={value} onChange={setValue}',
    controls: [
      {kind: 'text', key: 'label', label: '라벨', default: '볼륨'},
      {kind: 'number', key: 'step', label: '간격(step)', default: 1, min: 1, max: 20, step: 1},
      {
        kind: 'select',
        key: 'valueDisplay',
        label: '값 표시',
        options: ['tooltip', 'text', 'none'],
        default: 'tooltip',
      },
      {kind: 'bool', key: 'isDisabled', label: '비활성', default: false},
    ],
  },
  ToggleButton: {
    tag: 'ToggleButton',
    Preview: ToggleButtonPreview,
    extra: 'isPressed={pressed} onPressedChange={setPressed}',
    controls: [
      {kind: 'text', key: 'label', label: '글자', default: '좋아요'},
      {kind: 'select', key: 'size', label: '크기', options: ['sm', 'md', 'lg'], default: 'md'},
      {kind: 'bool', key: 'isDisabled', label: '비활성', default: false},
    ],
  },
  Spinner: {
    tag: 'Spinner',
    Preview: SpinnerPreview,
    controls: [
      {
        kind: 'select',
        key: 'size',
        label: '크기',
        options: ['sm', 'md', 'lg', 'xl'],
        default: 'lg',
      },
      {
        kind: 'select',
        key: 'shade',
        label: '색 톤',
        options: ['default', 'subtle', 'onMedia', 'inherit'],
        default: 'default',
      },
      {kind: 'text', key: 'label', label: '글자', default: '불러오는 중'},
    ],
  },
};

export const DEMOS: Record<string, Demo> = {...BASE_DEMOS, ...GROUP_DEMOS};

export function defaultValues(demo: Demo): Values {
  return Object.fromEntries(demo.controls.map((c) => [c.key, c.default]));
}

// 현재 설정을 그대로 복사해서 쓸 수 있는 JSX 코드로 만든다.
export function buildCode(name: string, demo: Demo, v: Values): string {
  if (demo.code) return demo.code(v);
  // 갤러리의 기본값이 컴포넌트 기본값과 다를 수 있어서, 값이 있는 속성은 모두 적는다.
  const parts: string[] = [];
  for (const c of demo.controls) {
    const val = v[c.key];
    if (val === undefined || val === '') continue;
    if (c.kind === 'bool') {
      if (val === true) parts.push(c.key);
    } else if (c.kind === 'number') {
      parts.push(`${c.key}={${val}}`);
    } else {
      parts.push(`${c.key}="${String(val).replace(/"/g, '&quot;')}"`);
    }
  }
  if (demo.extra) parts.push(demo.extra);
  const attrs = parts.length ? ` ${parts.join(' ')}` : '';
  const importLine = `import {${demo.tag}} from '@astryxdesign/core/${name}';`;
  return `${importLine}\n\n<${demo.tag}${attrs} />`;
}

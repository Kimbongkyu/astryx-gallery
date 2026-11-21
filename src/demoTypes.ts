import type {ReactNode} from 'react';

// 속성 조절 패널에 나오는 항목
export type Control =
  | {kind: 'text'; key: string; label: string; default: string}
  | {kind: 'bool'; key: string; label: string; default: boolean}
  | {kind: 'select'; key: string; label: string; options: string[]; default: string}
  | {
      kind: 'number';
      key: string;
      label: string;
      default: number;
      min: number;
      max: number;
      step?: number;
    };

export type Values = Record<string, string | boolean | number>;

export type Demo = {
  tag: string; // 코드 복사에 쓰는 JSX 태그 이름 (buildCode 기본 동작에 사용)
  controls: Control[]; // 비어 있으면 속성 조절 패널을 숨긴다
  Preview: (props: {v: Values}) => ReactNode;
  // 상태(value/onChange)처럼 코드에만 붙는 속성 (buildCode 기본 동작)
  extra?: string;
  // 여러 컴포넌트를 조합하는 예제처럼 기본 코드 생성이 맞지 않을 때, 복사할 코드를 직접 지정
  code?: (v: Values) => string;
  note?: string; // 화면에 보여줄 짧은 안내(선택)
};

export const s = (x: string | boolean | number): string => String(x);
export const b = (x: string | boolean | number): boolean => x === true;

import {Component, type ReactNode} from 'react';

/* ---------- 미리보기가 깨져도 화면 전체가 죽지 않게 ---------- */

export class PreviewBoundary extends Component<{children: ReactNode}, {error: string | null}> {
  state = {error: null as string | null};
  static getDerivedStateFromError(e: unknown) {
    return {error: e instanceof Error ? e.message : String(e)};
  }
  render() {
    if (this.state.error) {
      return (
        <p className="gx-error">
          이 속성 조합은 미리보기를 그리지 못했어요.
          <br />
          <small>{this.state.error}</small>
        </p>
      );
    }
    return this.props.children;
  }
}


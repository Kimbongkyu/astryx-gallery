import {useState} from 'react';
import {DEMOS, buildCode, defaultValues, type Control, type Values} from '../demos';
import {PreviewBoundary} from './PreviewBoundary';
import {CopyButton} from './shared';

/* ---------- 속성 조절 패널 ---------- */

function ControlRow({
  c,
  value,
  onChange,
}: {
  c: Control;
  value: string | boolean | number;
  onChange: (v: string | boolean | number) => void;
}) {
  const id = `ctl-${c.key}`;
  return (
    <div className="gx-ctl">
      <label htmlFor={id}>{c.label}</label>
      {c.kind === 'bool' && (
        <input
          id={id}
          type="checkbox"
          checked={value === true}
          onChange={(e) => onChange(e.target.checked)}
        />
      )}
      {c.kind === 'text' && (
        <input
          id={id}
          type="text"
          value={String(value)}
          onChange={(e) => onChange(e.target.value)}
        />
      )}
      {c.kind === 'number' && (
        <input
          id={id}
          type="number"
          inputMode="numeric"
          min={c.min}
          max={c.max}
          step={c.step ?? 1}
          value={Number(value)}
          onChange={(e) => onChange(Number(e.target.value))}
        />
      )}
      {c.kind === 'select' && (
        <select id={id} value={String(value)} onChange={(e) => onChange(e.target.value)}>
          {c.options.map((o) => (
            <option key={o} value={o}>
              {o}
            </option>
          ))}
        </select>
      )}
    </div>
  );
}

export function Playground({name}: {name: string}) {
  const demo = DEMOS[name];
  const [values, setValues] = useState<Values>(() => defaultValues(demo));
  const code = buildCode(name, demo, values);
  const {Preview} = demo;
  return (
    <section className="gx-play">
      <div className="gx-stage">
        <PreviewBoundary key={JSON.stringify(values)}>
          <Preview v={values} />
        </PreviewBoundary>
      </div>
      {demo.note && <p className="gx-demo-note">{demo.note}</p>}
      {demo.controls.length > 0 && (
      <div className="gx-panel">
        <div className="gx-panel-head">
          <h3>속성 조절</h3>
          <button
            type="button"
            className="gx-btn"
            onClick={() => setValues(defaultValues(demo))}
          >
            처음으로
          </button>
        </div>
        {demo.controls.map((c) => (
          <ControlRow
            key={c.key}
            c={c}
            value={values[c.key]}
            onChange={(v) => setValues((prev) => ({...prev, [c.key]: v}))}
          />
        ))}
      </div>
      )}
      <div className="gx-code">
        <div className="gx-panel-head">
          <h3>코드</h3>
          <CopyButton text={code} label="코드 복사" />
        </div>
        <pre>
          <code>{code}</code>
        </pre>
      </div>
    </section>
  );
}


import {useState} from 'react';
import {Button} from '@astryxdesign/core/Button';
import {Card} from '@astryxdesign/core/Card';
import {CodeBlock} from '@astryxdesign/core/CodeBlock';
import {Heading} from '@astryxdesign/core/Heading';
import {HStack} from '@astryxdesign/core/HStack';
import {NumberInput} from '@astryxdesign/core/NumberInput';
import {Selector} from '@astryxdesign/core/Selector';
import {Switch} from '@astryxdesign/core/Switch';
import {Text} from '@astryxdesign/core/Text';
import {TextInput} from '@astryxdesign/core/TextInput';
import {VStack} from '@astryxdesign/core/VStack';
import {DEMOS, buildCode, defaultValues, type Control, type Values} from '../demos';
import {PreviewBoundary} from './PreviewBoundary';

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
  switch (c.kind) {
    case 'bool':
      return <Switch label={c.label} value={value === true} onChange={onChange} size="sm" />;
    case 'text':
      return (
        <TextInput
          label={c.label}
          value={String(value)}
          onChange={onChange}
          size="sm"
          width="100%"
        />
      );
    case 'number':
      return (
        <NumberInput
          label={c.label}
          value={Number(value)}
          min={c.min}
          max={c.max}
          step={c.step ?? 1}
          onChange={onChange}
          size="sm"
          width="100%"
        />
      );
    case 'select':
      return (
        <Selector
          label={c.label}
          options={c.options}
          value={String(value)}
          onChange={onChange}
          size="sm"
        />
      );
  }
}

export function Playground({name}: {name: string}) {
  const demo = DEMOS[name];
  const [values, setValues] = useState<Values>(() => defaultValues(demo));
  const code = buildCode(name, demo, values);
  const {Preview} = demo;
  return (
    <section className="gx-play">
      <Card variant="muted" padding={4} width="100%" className="gx-stage">
        <HStack align="center" justify="center">
          <PreviewBoundary key={JSON.stringify(values)}>
            <Preview v={values} />
          </PreviewBoundary>
        </HStack>
      </Card>
      {demo.note && (
        <Text type="supporting" color="secondary" as="div">
          {demo.note}
        </Text>
      )}
      {demo.controls.length > 0 && (
        <Card padding={3} width="100%" className="gx-panel">
          <VStack gap={3}>
            <HStack gap={2} align="center" justify="between">
              <Heading level={3}>속성 조절</Heading>
              <Button
                label="처음으로"
                variant="secondary"
                size="sm"
                onClick={() => setValues(defaultValues(demo))}
              />
            </HStack>
            {demo.controls.map((c) => (
              <ControlRow
                key={c.key}
                c={c}
                value={values[c.key]}
                onChange={(v) => setValues((prev) => ({...prev, [c.key]: v}))}
              />
            ))}
          </VStack>
        </Card>
      )}
      <Card padding={3} width="100%" className="gx-code">
        <VStack gap={3}>
          <Heading level={3}>코드</Heading>
          <CodeBlock code={code} language="tsx" isWrapped container="section" width="100%" />
        </VStack>
      </Card>
    </section>
  );
}

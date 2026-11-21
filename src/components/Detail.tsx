import {Banner} from '@astryxdesign/core/Banner';
import {Button} from '@astryxdesign/core/Button';
import {Card} from '@astryxdesign/core/Card';
import {CodeBlock} from '@astryxdesign/core/CodeBlock';
import {Heading} from '@astryxdesign/core/Heading';
import {HStack} from '@astryxdesign/core/HStack';
import {Link} from '@astryxdesign/core/Link';
import {Text} from '@astryxdesign/core/Text';
import {VStack} from '@astryxdesign/core/VStack';
import {BY_NAME, ENTRIES, GROUPS, NO_DEMO_REASON, docsUrl} from '../registry';
import {DEMOS} from '../demos';
import {Playground} from './Playground';
import {CopyButton, Star, type FavApi} from './shared';

/* ---------- 상세 화면 ---------- */

export function Detail({name, fav}: {name: string; fav: FavApi}) {
  const e = BY_NAME[name];
  const group = GROUPS.find((g) => g.id === e.group)!;
  const hasDemo = Boolean(DEMOS[name]);
  const siblings = ENTRIES.filter((x) => x.group === e.group && x.name !== name);
  const cli = `npx @astryxdesign/cli component ${name}`;
  return (
    <VStack gap={4} align="stretch">
      <Link href={`#/g/${group.id}`} hasUnderline={false} color="secondary">
        ← {group.label}
      </Link>
      <HStack justify="between" align="center" gap={2}>
        <VStack gap={0.5}>
          <Heading level={1}>{e.ko}</Heading>
          <Text type="supporting" color="secondary" as="div">
            {e.name}
          </Text>
        </VStack>
        <Star
          on={fav.favs.includes(name)}
          onClick={() => fav.toggle(name)}
          name={e.ko}
        />
      </HStack>
      <Text type="body" as="div">
        {e.desc}
      </Text>
      {e.guess && (
        <Banner
          status="warning"
          title="이 설명은 정확하지 않을 수 있어요"
          description="이름을 보고 쓴 설명이에요. 공식 문서로 확인해 주세요."
        />
      )}

      {hasDemo ? (
        <Playground key={name} name={name} />
      ) : (
        <Banner
          status="info"
          title="바로 해보기가 없는 컴포넌트예요"
          description={
            NO_DEMO_REASON[name] ??
            '아직 미리보기를 만들지 못했어요. 아래 명령으로 사용법을 볼 수 있어요.'
          }
        />
      )}

      <Card padding={4}>
        <VStack gap={3} align="stretch">
          <Heading level={3}>가져다 쓰기</Heading>
          <CodeBlock
            code={`import {...} from '@astryxdesign/core/${name}';`}
            language="tsx"
          />
          <HStack gap={2} align="center" wrap="wrap">
            <CodeBlock code={cli} language="bash" hasCopyButton={false} hasLanguageLabel={false} />
            <CopyButton text={cli} label="명령 복사" />
          </HStack>
          <Link href={docsUrl(name)} target="_blank" rel="noreferrer">
            공식 문서 열기 ↗
          </Link>
          <Text type="supporting" color="secondary" as="div">
            주소가 열리지 않으면 공식 사이트의 컴포넌트 목록에서 찾아주세요.
          </Text>
        </VStack>
      </Card>

      {siblings.length > 0 && (
        <VStack gap={2} align="stretch">
          <Heading level={3}>같은 그룹의 다른 컴포넌트</Heading>
          <HStack gap={2} wrap="wrap">
            {siblings.map((s) => (
              <Button
                key={s.name}
                label={s.ko}
                variant="secondary"
                size="sm"
                href={`#/c/${s.name}`}
              />
            ))}
          </HStack>
        </VStack>
      )}
    </VStack>
  );
}

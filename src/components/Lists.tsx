import {Badge} from '@astryxdesign/core/Badge';
import {ClickableCard} from '@astryxdesign/core/ClickableCard';
import {HStack} from '@astryxdesign/core/HStack';
import {Text} from '@astryxdesign/core/Text';
import {VStack} from '@astryxdesign/core/VStack';
import {DEMOS} from '../demos';
import type {Entry} from '../registry';
import {Star, type FavApi} from './shared';

function Card({entry, fav}: {entry: Entry; fav: FavApi}) {
  const on = fav.favs.includes(entry.name);
  return (
    <li className="gx-card">
      <ClickableCard
        label={`${entry.ko} (${entry.name}) 자세히 보기`}
        onClick={() => {
          window.location.hash = `#/c/${entry.name}`;
        }}
        padding={3}
        width="100%"
      >
        <VStack gap={1} className="gx-card-text">
          <HStack gap={2} align="center">
            <Text type="body" weight="bold" as="div">
              {entry.ko}
            </Text>
            {DEMOS[entry.name] && <Badge label="바로 해보기" variant="success" />}
          </HStack>
          <Text type="supporting" color="secondary" as="div">
            {entry.name}
          </Text>
          <Text type="supporting" color="secondary" as="div">
            {entry.desc}
          </Text>
        </VStack>
      </ClickableCard>
      <Star
        className="gx-card-star"
        on={on}
        onClick={() => fav.toggle(entry.name)}
        name={entry.ko}
      />
    </li>
  );
}

export function CardList({entries, fav}: {entries: Entry[]; fav: FavApi}) {
  if (!entries.length) return <p className="gx-empty">해당하는 컴포넌트가 없어요.</p>;
  return (
    <ul className="gx-cards">
      {entries.map((e) => (
        <Card key={e.name} entry={e} fav={fav} />
      ))}
    </ul>
  );
}


import {useState} from 'react';
import {Banner} from '@astryxdesign/core/Banner';
import {Button} from '@astryxdesign/core/Button';
import {Collapsible} from '@astryxdesign/core/Collapsible';
import {Text} from '@astryxdesign/core/Text';
import {TextArea} from '@astryxdesign/core/TextArea';
import {VStack} from '@astryxdesign/core/VStack';
import {BY_NAME} from '../registry';
import {CopyButton, type FavApi} from './shared';

/* ---------- 즐겨찾기 백업/복원 ---------- */

export function FavTools({fav}: {fav: FavApi}) {
  const [text, setText] = useState('');
  const [msg, setMsg] = useState('');
  const exportText = `astryx:${fav.favs.join(',')}`;
  return (
    <Collapsible trigger="폰↔PC로 즐겨찾기 옮기기" defaultIsOpen={false}>
      <VStack gap={3} align="start">
        <Text type="supporting" color="secondary" as="div">
          즐겨찾기는 이 기기의 브라우저에만 저장돼요. 다른 기기로 옮기려면 복사해서 붙여넣으세요.
        </Text>
        <CopyButton text={exportText} label="내 즐겨찾기 복사" />
        <TextArea
          label="가져올 즐겨찾기"
          rows={2}
          placeholder="다른 기기에서 복사한 내용을 붙여넣기"
          value={text}
          onChange={(v) => setText(v)}
          width="100%"
        />
        <Button
          label="가져오기"
          variant="secondary"
          onClick={() => {
            const body = text.trim().replace(/^astryx:/, '');
            const names = body.split(/[,\s]+/).filter((n) => BY_NAME[n]);
            fav.merge(names);
            setMsg(`${names.length}개를 가져왔어요.`);
            setText('');
          }}
        />
        {msg && <Banner status="success" title={msg} />}
      </VStack>
    </Collapsible>
  );
}

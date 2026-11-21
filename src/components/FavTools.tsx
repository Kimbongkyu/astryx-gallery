import {useState} from 'react';
import {BY_NAME} from '../registry';
import {CopyButton, type FavApi} from './shared';

/* ---------- 즐겨찾기 백업/복원 ---------- */

export function FavTools({fav}: {fav: FavApi}) {
  const [text, setText] = useState('');
  const [msg, setMsg] = useState('');
  const exportText = `astryx:${fav.favs.join(',')}`;
  return (
    <details className="gx-tools">
      <summary>폰↔PC로 즐겨찾기 옮기기</summary>
      <p>즐겨찾기는 이 기기의 브라우저에만 저장돼요. 다른 기기로 옮기려면 복사해서 붙여넣으세요.</p>
      <div className="gx-row">
        <CopyButton text={exportText} label="내 즐겨찾기 복사" />
      </div>
      <textarea
        rows={2}
        placeholder="다른 기기에서 복사한 내용을 붙여넣기"
        value={text}
        onChange={(e) => setText(e.target.value)}
      />
      <button
        type="button"
        className="gx-btn"
        onClick={() => {
          const body = text.trim().replace(/^astryx:/, '');
          const names = body
            .split(/[,\s]+/)
            .filter((n) => BY_NAME[n]);
          fav.merge(names);
          setMsg(`${names.length}개를 가져왔어요.`);
          setText('');
        }}
      >
        가져오기
      </button>
      {msg && <p className="gx-ok">{msg}</p>}
    </details>
  );
}


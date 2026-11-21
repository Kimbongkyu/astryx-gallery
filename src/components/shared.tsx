import {useState} from 'react';
import {Button} from '@astryxdesign/core/Button';
import {IconButton} from '@astryxdesign/core/IconButton';
import type {useFavorites} from '../favorites';

export type FavApi = ReturnType<typeof useFavorites>;

/* ---------- 작은 부품들 ---------- */

export async function copyText(text: string): Promise<boolean> {
  try {
    await navigator.clipboard.writeText(text);
    return true;
  } catch {
    try {
      const ta = document.createElement('textarea');
      ta.value = text;
      ta.style.position = 'fixed';
      ta.style.opacity = '0';
      document.body.appendChild(ta);
      ta.select();
      const ok = document.execCommand('copy');
      document.body.removeChild(ta);
      return ok;
    } catch {
      return false;
    }
  }
}

export function CopyButton({text, label = '복사'}: {text: string; label?: string}) {
  const [done, setDone] = useState(false);
  return (
    <Button
      label={done ? '복사됨' : label}
      variant="secondary"
      size="sm"
      onClick={async () => {
        const ok = await copyText(text);
        setDone(ok);
        window.setTimeout(() => setDone(false), 1500);
      }}
    />
  );
}

export function Star({
  on,
  onClick,
  name,
  className,
}: {
  on: boolean;
  onClick: () => void;
  name: string;
  className?: string;
}) {
  return (
    <IconButton
      className={className}
      label={`${name} 즐겨찾기 ${on ? '해제' : '추가'}`}
      icon={
        <span aria-hidden="true" className={on ? 'gx-glyph on' : 'gx-glyph'}>
          {on ? '★' : '☆'}
        </span>
      }
      variant="ghost"
      onClick={onClick}
    />
  );
}


import {useCallback, useEffect, useState} from 'react';

const KEY = 'astryx-gallery:favorites:v1';

function load(): string[] {
  try {
    const raw = localStorage.getItem(KEY);
    const parsed = raw ? JSON.parse(raw) : [];
    return Array.isArray(parsed) ? parsed.filter((x) => typeof x === 'string') : [];
  } catch {
    return [];
  }
}

function save(list: string[]) {
  try {
    localStorage.setItem(KEY, JSON.stringify(list));
  } catch {
    // 저장이 막힌 브라우저(사생활 보호 모드 등)에서는 이번 방문 동안만 유지된다.
  }
}

export function useFavorites() {
  const [favs, setFavs] = useState<string[]>(load);

  // 다른 탭에서 바꾼 내용도 반영
  useEffect(() => {
    const onStorage = (e: StorageEvent) => {
      if (e.key === KEY) setFavs(load());
    };
    window.addEventListener('storage', onStorage);
    return () => window.removeEventListener('storage', onStorage);
  }, []);

  const toggle = useCallback((name: string) => {
    setFavs((prev) => {
      const next = prev.includes(name) ? prev.filter((n) => n !== name) : [...prev, name];
      save(next);
      return next;
    });
  }, []);

  // 가져오기(백업 복원)용: 기존 목록과 합친다
  const merge = useCallback((names: string[]) => {
    setFavs((prev) => {
      const next = Array.from(new Set([...prev, ...names]));
      save(next);
      return next;
    });
  }, []);

  return {favs, toggle, merge};
}

# Astryx 컴포넌트 둘러보기

[Astryx](https://astryx.atmeta.com) 컴포넌트를 그룹별로 찾고, 한글로 검색하고, 즐겨찾기하고, 바로 속성을 바꿔보는 갤러리입니다. 모바일에서도 쓸 수 있습니다.

- 그룹: 버튼·액션, 입력, 선택, 알림·상태, 팝업, 내비게이션, 레이아웃, 카드, 콘텐츠, 표·목록, 채팅, 유틸리티
- 검색: 한글 이름, 영문 이름, 설명, 키워드
- 즐겨찾기: 브라우저(localStorage)에 저장. 폰↔PC 이동은 「즐겨찾기」 화면의 복사/가져오기 사용
- 바로 해보기: 속성 조절 + 코드 복사 (Button, Switch, TextInput, Badge, Banner, ProgressBar, Slider, ToggleButton, Spinner)

## 실행

```bash
npm install
npm run dev      # 같은 Wi-Fi의 폰에서도 http://PC주소:5173 으로 접속
npm run build
```

## 배포 (GitHub Pages)

1. 저장소 **Settings → Pages → Build and deployment → Source** 를 **GitHub Actions** 로 설정
2. `main` 에 푸시하면 `.github/workflows/deploy.yml` 이 빌드해서 배포

## 컴포넌트 추가·수정

- 목록, 그룹, 한글 설명: `src/registry.ts` (`guess`가 true면 이름만 보고 쓴 설명)
- 바로 해보기 추가: `src/demos.tsx` 에 `DEMOS` 항목을 추가 (속성 이름은 `npx @astryxdesign/cli component <이름>` 으로 확인)

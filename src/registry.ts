// Astryx 컴포넌트 목록. 이름은 @astryxdesign/core 의 exports 서브패스(./Button 등) 기준이다.
// ko(한글 이름)·desc(설명)·kw(검색 키워드)는 이 갤러리에서 붙인 것이다.
// guess=true 는 이름만 보고 쓴 설명이라 공식 문서로 확인이 필요하다는 뜻이다.

export type Group = {id: string; label: string; hint: string};

export type Entry = {
  name: string;
  ko: string;
  desc: string;
  group: string;
  kw: string;
  guess: boolean;
};

export const GROUPS: Group[] = [
  {id: 'action', label: '버튼·액션', hint: '눌러서 동작을 실행하거나 메뉴를 여는 것'},
  {id: 'input', label: '입력', hint: '글자·숫자·날짜·파일을 입력받는 것'},
  {id: 'choice', label: '선택', hint: '체크, 라디오, 스위치, 드롭다운처럼 고르는 것'},
  {id: 'feedback', label: '알림·상태', hint: '배지, 배너, 로딩, 진행률처럼 상태를 알리는 것'},
  {id: 'overlay', label: '팝업·오버레이', hint: '화면 위에 겹쳐 뜨는 것'},
  {id: 'nav', label: '내비게이션', hint: '이동·탭·단계·경로를 보여주는 것'},
  {id: 'layout', label: '레이아웃', hint: '배치와 간격을 잡는 것'},
  {id: 'container', label: '카드·컨테이너', hint: '내용을 묶어서 담는 것'},
  {id: 'content', label: '콘텐츠', hint: '글, 이미지, 코드, 아바타 같은 표시용'},
  {id: 'data', label: '표·목록', hint: '데이터를 줄과 칸으로 보여주는 것'},
  {id: 'chat', label: '채팅', hint: '메시지·AI 대화 화면 부품'},
  {id: 'utility', label: '유틸리티', hint: '보조 기능'},
];

type Row = [name: string, ko: string, desc: string, kw?: string, guess?: boolean];

const SOURCE: Record<string, Row[]> = {
  action: [
    ['Button', '버튼', '눌러서 동작을 실행하는 기본 버튼', '확인 저장 제출 클릭 취소 삭제'],
    ['ButtonGroup', '버튼 그룹', '관련된 버튼 여러 개를 한 줄로 묶어서 배치', '묶음 세트'],
    ['IconButton', '아이콘 버튼', '글자 없이 아이콘만 있는 버튼', '아이콘 닫기 설정'],
    ['ToggleButton', '토글 버튼', '누를 때마다 켜짐/꺼짐이 바뀌는 버튼', '체크 버튼 눌림 켜기 끄기 좋아요'],
    ['Toolbar', '툴바', '자주 쓰는 동작 버튼을 모아둔 막대', '도구 모음 편집기'],
    ['DropdownMenu', '드롭다운 메뉴', '버튼을 누르면 항목 목록이 펼쳐지는 메뉴', '펼침 메뉴 목록'],
    ['MoreMenu', '더보기 메뉴', '보조 동작을 모아 여는 더보기 메뉴', '점 세개 더보기 케밥', true],
    ['ContextMenu', '컨텍스트 메뉴', '우클릭이나 길게 눌러서 여는 메뉴', '우클릭 길게 누르기'],
  ],
  input: [
    ['TextInput', '텍스트 입력', '한 줄짜리 글자 입력칸', '입력창 이름 이메일 비밀번호 검색'],
    ['TextArea', '여러 줄 입력', '여러 줄을 쓰는 입력칸', '메모 설명 내용 textarea'],
    ['NumberInput', '숫자 입력', '숫자만 입력받는 입력칸', '수량 금액 증가 감소'],
    ['DateInput', '날짜 입력', '날짜를 입력하거나 달력에서 고르는 입력칸', '날짜 달력 생일'],
    ['DateRangeInput', '기간 입력', '시작일과 종료일을 함께 입력', '기간 범위 시작 종료'],
    ['DateTimeInput', '날짜·시간 입력', '날짜와 시간을 함께 입력', '일시 예약'],
    ['TimeInput', '시간 입력', '시각을 입력', '시 분 시간'],
    ['FileInput', '파일 선택', '파일을 선택하거나 끌어다 놓는 입력', '업로드 첨부 파일 드래그'],
    ['Field', '입력 필드 틀', '라벨·설명·오류 메시지를 입력칸에 붙여주는 틀', '라벨 폼 필드', true],
    ['FieldStatus', '입력 상태 표시', '입력칸의 오류·성공 같은 상태 메시지 표시', '검증 에러 메시지', true],
    ['InputGroup', '입력 그룹', '여러 입력칸을 한 줄로 묶음', '묶음 결합', true],
    ['Slider', '슬라이더', '막대를 밀어서 값을 고르는 입력', '범위 볼륨 조절 밝기'],
    ['Typeahead', '자동완성', '입력하면 후보를 보여주는 입력', '자동완성 검색 추천 후보'],
    ['Tokenizer', '토큰 입력', '입력한 값을 칩(태그) 형태로 쌓는 입력', '태그 칩 이메일 여러개', true],
    ['PowerSearch', '고급 검색', '조건을 조합하는 고급 검색 입력', '필터 검색 조건', true],
  ],
  choice: [
    ['CheckboxInput', '체크박스', '하나를 켜고 끄는 체크박스', '체크 동의 약관'],
    ['CheckboxList', '체크박스 목록', '여러 개 중 하나 이상 고르는 체크박스 목록', '다중 선택 체크'],
    ['RadioList', '라디오 목록', '여러 개 중 정확히 하나를 고르는 목록', '라디오 단일 선택'],
    ['Switch', '스위치', '켜짐/꺼짐을 바꾸는 스위치', '토글 on off 설정 알림'],
    ['Selector', '선택 상자', '목록에서 하나를 고르는 드롭다운', '셀렉트 드롭다운 콤보 선택'],
    ['MultiSelector', '다중 선택 상자', '목록에서 여러 개를 고르는 드롭다운', '다중 셀렉트 여러개'],
    ['ComplexSelector', '복합 선택', '구조가 복잡한 항목을 고르는 선택 상자', '복합 계층 선택', true],
    ['SegmentedControl', '세그먼트 컨트롤', '버튼 줄 중에서 하나를 고르는 컨트롤', '탭 같은 선택 보기 전환 목록 카드'],
    ['Calendar', '달력', '달력에서 날짜를 고르는 화면', '날짜 일정 월'],
  ],
  feedback: [
    ['Badge', '배지', '숫자나 짧은 상태를 표시하는 작은 라벨', '뱃지 라벨 상태 태그 개수'],
    ['Banner', '배너', '화면 상단 등에 띄우는 안내·경고 메시지', '알림 공지 경고 오류 성공'],
    ['InfoTip', '정보 툴팁', '(i) 아이콘에 마우스를 올리면 부가 설명을 보여줌', '도움말 힌트 설명'],
    ['ProgressBar', '진행 막대', '진행률을 보여주는 막대', '프로그레스 퍼센트 업로드 로딩'],
    ['Skeleton', '스켈레톤', '로딩 중 자리 표시용 회색 틀', '로딩 자리표시 placeholder'],
    ['Spinner', '스피너', '빙글빙글 도는 로딩 표시', '로딩 대기 처리중'],
    ['StatusDot', '상태 점', '색 점으로 상태를 표시', '온라인 오프라인 상태 점 신호'],
    ['Toast', '토스트', '잠깐 떴다 사라지는 알림', '스낵바 알림 저장됨 완료'],
    ['Indicator', '인디케이터', '아이콘 위에 붙는 작은 표시', '알림 점 읽지 않음', true],
    ['Timer', '타이머', '시간을 세어 보여주는 표시', '카운트다운 시간', true],
  ],
  overlay: [
    ['Dialog', '대화상자', '화면 가운데에 뜨는 창(모달)', '모달 팝업 창 확인'],
    ['AlertDialog', '확인 대화상자', '삭제 같은 중요한 동작 전에 한 번 더 묻는 창', '삭제 확인 경고 confirm'],
    ['Drawer', '서랍 패널', '화면 옆에서 밀려 나오는 패널', '사이드 패널 슬라이드'],
    ['BottomSheet', '바텀시트', '모바일에서 아래에서 올라오는 패널', '모바일 아래 시트'],
    ['Popover', '팝오버', '요소 옆에 말풍선처럼 뜨는 작은 패널', '말풍선 팝업'],
    ['Tooltip', '툴팁', '마우스를 올리면 뜨는 짧은 설명', '설명 말풍선 힌트'],
    ['HoverCard', '호버 카드', '마우스를 올리면 미리보기 카드가 뜸', '미리보기 프로필 카드'],
    ['CommandPalette', '명령 팔레트', '검색해서 기능을 바로 실행하는 창', '단축키 검색 명령 ctrl k'],
    ['Lightbox', '라이트박스', '이미지를 화면 가득 크게 보기', '이미지 확대 갤러리'],
    ['Layer', '레이어', '겹침 순서를 관리하는 계층', '겹침 z-index', true],
    ['Overlay', '오버레이', '화면을 덮는 바탕층', '딤 배경', true],
  ],
  nav: [
    ['Breadcrumbs', '경로 표시', '현재 위치를 홈 > 목록 > 상세 식으로 표시', '빵부스러기 경로 위치'],
    ['Outline', '목차', '문서 안 제목 목록으로 이동하는 목차', '목차 앵커 toc'],
    ['Pagination', '페이지 넘기기', '목록의 페이지를 넘기는 번호 표시', '페이지 번호 이전 다음'],
    ['SideNav', '사이드 내비', '왼쪽에 세로로 놓는 메뉴', '사이드바 왼쪽 메뉴'],
    ['Stepper', '단계 표시', '진행 단계를 1→2→3 식으로 보여줌', '스텝 위저드 단계'],
    ['TabList', '탭', '화면 전환 없이 내용을 바꾸는 탭', '탭 전환'],
    ['TopNav', '상단 내비', '화면 위쪽에 가로로 놓는 메뉴 바', '상단바 헤더 메뉴'],
    ['MobileNav', '모바일 내비', '모바일용 내비게이션', '모바일 하단 메뉴 햄버거'],
    ['NavMenu', '내비 메뉴', '내비게이션에 쓰는 메뉴', '메뉴', true],
    ['NavIcon', '내비 아이콘', '내비게이션 항목용 아이콘', '메뉴 아이콘', true],
    ['Link', '링크', '다른 곳으로 이동하는 링크', '하이퍼링크 이동'],
  ],
  layout: [
    ['AppShell', '앱 틀', '상단바·사이드바·본문을 갖춘 앱 전체 틀', '앱 구조 프레임 셸'],
    ['Stack', '스택', '요소를 한 방향으로 쌓고 간격을 줌', '쌓기 간격 정렬'],
    ['HStack', '가로 스택', '요소를 가로로 나란히 배치', '가로 정렬 row'],
    ['VStack', '세로 스택', '요소를 세로로 쌓아 배치', '세로 정렬 column'],
    ['Grid', '그리드', '칸을 나눠 격자로 배치', '격자 열 컬럼'],
    ['Layout', '레이아웃', '페이지 영역을 나누는 배치 틀', '배치 영역'],
    ['Center', '가운데 정렬', '내용을 가운데에 놓음', '중앙 정렬'],
    ['Divider', '구분선', '영역을 나누는 선', '선 가로선 라인'],
    ['FormLayout', '폼 배치', '입력 폼을 줄맞춰 배치', '양식 폼 입력 정렬'],
    ['ScrollableArea', '스크롤 영역', '내용이 넘치면 스크롤되는 영역', '스크롤 넘침'],
    ['Section', '섹션', '내용을 구역으로 나눔', '구역 영역', true],
    ['AspectRatio', '비율 고정', '가로세로 비율을 고정', '16:9 비율 이미지'],
    ['Resizable', '크기 조절', '끌어서 크기를 바꾸는 영역', '분할 드래그 리사이즈'],
    ['SnapPaging', '스냅 페이징', '스크롤하면 한 칸씩 딱 맞게 넘어감', '스냅 스크롤 페이지', true],
    ['Swipe', '스와이프', '밀어서 넘기는 동작', '스와이프 슬라이드 터치', true],
  ],
  container: [
    ['Card', '카드', '내용을 테두리로 묶어 담는 상자', '상자 박스 패널'],
    ['ClickableCard', '클릭 카드', '카드 전체를 눌러 이동·실행하는 카드', '카드 링크 누르기'],
    ['SelectableCard', '선택 카드', '카드를 눌러 선택하는 카드', '카드 선택 요금제 옵션'],
    ['Carousel', '캐러셀', '옆으로 넘겨 보는 슬라이드', '슬라이드 배너 회전'],
    ['Collapsible', '접기/펼치기', '눌러서 내용을 접고 펼침', '아코디언 접기 펼치기 FAQ'],
  ],
  content: [
    ['Avatar', '아바타', '사람·조직의 프로필 사진이나 이니셜', '프로필 사진 사용자 이니셜'],
    ['AvatarGroup', '아바타 묶음', '아바타 여러 개를 겹쳐서 표시', '참여자 멤버'],
    ['Blockquote', '인용문', '인용 글을 따로 표시', '인용 따옴표'],
    ['Code', '인라인 코드', '문장 안에 들어가는 짧은 코드', '코드 인라인'],
    ['CodeBlock', '코드 블록', '여러 줄 코드를 보여주고 복사', '코드 소스 복사 문법'],
    ['Citation', '출처 표기', '인용·출처 표시', '출처 각주 참고', true],
    ['EmptyState', '빈 상태', '데이터가 없을 때 보여주는 안내 화면', '비어있음 결과없음 데이터 없음'],
    ['Heading', '제목', '제목 글자', '타이틀 헤딩 h1'],
    ['Icon', '아이콘', '작은 그림 아이콘', '그림 심볼'],
    ['Kbd', '키보드 키', '단축키를 키 모양으로 표시', '단축키 키캡'],
    ['Markdown', '마크다운', '마크다운 글을 서식 있게 보여줌', '문서 렌더링 md'],
    ['Text', '텍스트', '본문 글자', '본문 문단 글씨'],
    ['Thumbnail', '썸네일', '작은 미리보기 이미지', '미리보기 이미지 사진'],
    ['Timestamp', '시각 표시', '날짜·시간을 읽기 좋게 표시', '몇 분 전 날짜 시간', true],
    ['Token', '토큰(칩)', '짧은 값을 칩 모양으로 표시', '칩 태그 라벨', true],
  ],
  data: [
    ['List', '목록', '항목을 줄로 나열', '리스트 줄'],
    ['Item', '목록 항목', '목록의 한 줄(제목·설명·액션)', '리스트 아이템 행'],
    ['MetadataList', '메타데이터 목록', '라벨과 값을 짝지어 나열', '상세 정보 키 값 속성'],
    ['OverflowList', '넘침 목록', '공간이 모자라면 일부를 +N으로 묶어줌', '더보기 말줄임 +n'],
    ['Table', '표', '행과 열로 데이터를 보여주는 표', '테이블 그리드 정렬 선택 데이터'],
    ['TreeList', '트리 목록', '계층 구조를 펼치고 접는 목록', '트리 폴더 계층 조직도'],
  ],
  chat: [
    ['Chat', '채팅', '채팅 입력창·메시지·도구 호출 표시 등 대화 화면 부품 묶음', '메시지 대화 AI 어시스턴트 입력'],
  ],
  utility: [
    ['VisuallyHidden', '화면 숨김 텍스트', '눈에는 안 보이고 스크린리더만 읽는 글자', '접근성 스크린리더'],
  ],
};

export const ENTRIES: Entry[] = Object.entries(SOURCE).flatMap(([group, rows]) =>
  rows.map(([name, ko, desc, kw, guess]) => ({
    name,
    ko,
    desc,
    group,
    kw: kw ?? '',
    guess: guess === true,
  })),
);

export const BY_NAME: Record<string, Entry> = Object.fromEntries(
  ENTRIES.map((e) => [e.name, e]),
);

export function searchEntries(list: Entry[], query: string): Entry[] {
  const q = query.trim().toLowerCase();
  if (!q) return list;
  const words = q.split(/\s+/);
  return list.filter((e) => {
    const hay = `${e.name} ${e.ko} ${e.desc} ${e.kw}`.toLowerCase();
    return words.every((w) => hay.includes(w));
  });
}

export function docsUrl(name: string): string {
  const kebab = name.replace(/([a-z0-9])([A-Z])/g, '$1-$2').toLowerCase();
  return `https://astryx.atmeta.com/components/${kebab}`;
}

// 바로 해보기를 만들 수 없는 이유 (화면 컴포넌트가 아니라 훅·내부 부품이거나, 화면 전체를 차지하는 경우)
export const NO_DEMO_REASON: Record<string, string> = {
  Indicator: '단독 컴포넌트가 아니라 체크·라디오 같은 다른 컴포넌트 안에서 쓰는 내부 부품이에요.',
  Layer: '화면에 그려지는 컴포넌트가 아니라, 팝업류가 쓰는 위치 계산 훅(useLayer)과 프로바이더예요.',
  AppShell: '화면 전체(100% 높이)를 차지하는 앱 틀이라 작은 미리보기로 보여줄 수 없어요. 공식 문서의 예제를 참고하세요.',
  NavMenu: '문서에서 컴포넌트 형태를 확인하지 못했어요. CLI 명령으로 사용법을 확인해 주세요.',
  Resizable: '컴포넌트가 아니라 크기 조절 훅(useResizable)과 손잡이(ResizeHandle)로 구성돼 있어요.',
  SnapPaging: '컴포넌트가 아니라 훅(useSnapPaging)이에요. 스크롤 영역에 연결해서 써요.',
  Swipe: '컴포넌트가 아니라 스와이프 동작을 만드는 함수(createSwipe)예요.',
};

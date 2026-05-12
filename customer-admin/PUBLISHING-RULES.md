# Customer Admin 퍼블리싱 규칙

`customer-admin/` 작업에 적용되는 HTML/CSS 퍼블리싱 규칙. 새 페이지/컴포넌트를 만들거나 기존 파일을 수정할 때 이 문서를 따른다.

---

## 1. 기본 원칙

### 1.1 기술 스택
- **HTML + CSS만 사용**. Vue, JavaScript 프레임워크, 빌드 도구 사용 금지.
- 인터랙션이 필요한 부분만 인라인 `<script>` 또는 `onclick` 핸들러로 처리.
- Pretendard 폰트 사용.
- **CSS 프레임워크(Bootstrap 등) 사용 금지.** 반응형은 미디어 쿼리로만 구현.

### 1.2 CSS 작성 위치
- 모든 커스텀 CSS는 **`customer-admin/css/base.css`** 한 곳에만 작성.
- HTML 파일 내 `<style>` 태그 사용 금지 (스타일가이드 파일 제외).
- 일회성 미세 조정만 인라인 `style="..."` 허용.

### 1.3 BEM 네이밍
- `.block__element--modifier` 형식.
- 한국어 이름 가능 (예: `.notif-section`, `.credit-paid`).
- 자식 요소는 `__`, 변형은 `--`.

```css
.list-panel { ... }
.list-panel__title { ... }
.list-panel--flush { ... }
.list-panel--filter { ... }
```

### 1.4 반응형 (Responsive)
- **PC 우선 설계 후 모바일·태블릿에 미디어 쿼리로 대응**한다.
- 부트스트랩 등 CSS 프레임워크 도입 없이 `@media` 쿼리로만 처리.
- 브레이크포인트 2단계 고정 (§16 참조):
  - **모바일**: `max-width: 768px`
  - **태블릿**: `max-width: 1024px`
- 신규 컴포넌트 작성 시 PC 레이아웃 완료 후 반드시 모바일 동작도 확인.

---

## 2. 파일 구조

```
customer-admin/
├── css/
│   └── base.css                  # 모든 커스텀 CSS
├── src/
│   ├── images/                   # 이미지 자산
│   └── views/
│       ├── {section}/            # 섹션별 폴더 (account, sales, setting 등)
│       │   ├── list.html
│       │   ├── detail-{tab}.html
│       │   ├── add.html
│       │   ├── edit.html
│       │   └── *-modal.html      # 별도 모달 페이지
│       ├── styleguide/           # 스타일가이드 파일
│       ├── home.html
│       └── sitemap.html
└── PUBLISHING-RULES.md           # 본 문서
```

### 파일 명명
- 목록: `list.html`
- 상세 (탭별): `detail-{tab-name}.html` (예: `detail-basic.html`, `detail-settlement.html`)
- 등록/수정: `add.html`, `edit.html`
- 별도 모달 페이지: `{용도}-modal.html` (예: `invitation-modal.html`)

---

## 3. 페이지 공통 구조

```html
<!DOCTYPE html>
<html lang="ko">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Admin - {페이지 타이틀}</title>
    <link rel="stylesheet" href="../../../../css/base.css">
</head>
<body>
    <header class="admin-header"> … </header>
    <div class="admin-wrap">
        <aside class="admin-lnb"> … </aside>
        <main class="admin-content">
            <div class="admin-body">
                <!-- 인포팁 / 액션바 / 통계카드 / 검색필터 / 목록패널 -->
            </div>
        </main>
    </div>

    <!-- 하단 일괄처리 바 (선택) -->
    <div class="c-bulk-bar hidden" id="bulkBar"> … </div>

    <!-- 모달창 모음 (display:none / is-hidden 상태) -->
    <div class="c-modal-overlay is-hidden" id="…"> … </div>

    <script> … </script>
</body>
</html>
```

### CSS/이미지 경로
- `views/{section}/{file}.html` 기준: `../../../css/base.css`, `../../../images/{name}`
- `views/{section}/{sub}/{file}.html` 기준: `../../../../css/base.css`, `../../../images/{name}`

---

## 4. 레이아웃 & 여백 (모달 제외 페이지)

새로운 페이지를 제작할 때 반드시 따른다. (모달은 별도 규격 — 5장 참조)

### 4.1 전체 레이아웃 원칙
- **PC Admin 우선 + 모바일/태블릿 반응형 대응**.
- 헤더(`.admin-header`) + 메뉴(`.admin-lnb`) + 작업 영역(`.admin-content`)으로 구성.
- 헤더와 LNB는 **위치 고정(sticky)**, 작업 영역만 스크롤.
- PC 기준 최저 사이즈: **1,440px** (그 이하에서는 가로 스크롤 또는 반응형 전환).
- 1,440 초과 시: 목록 조회 등 작업 영역이 가로 한도까지 자동으로 늘어남 (적응형).
- 모바일(`max-width: 768px`)에서는 LNB가 햄버거 메뉴로 토글 (§16 참조).
- 상세 페이지의 **액션 버튼은 기능 버튼 영역 상단에 플로팅으로 고정**한다.

### 4.2 작업 영역 좌우 여백
- 좌우 30px 패딩 (1단/2단/3단/4단 모두 동일).
- 컬럼 사이 간격(gap): **30px**.
- 상하 패딩: **30px**.

```
[ 30 | 컬럼1 | 30 | 컬럼2 | 30 | 컬럼3 | 30 | 컬럼4 | 30 ]
```

### 4.3 콘텐츠 블록 간 수직 여백

| 블록 | 다음 블록과 간격 |
|------|-----------------|
| 헤더(H) → Info & Tip | **15px** |
| Info & Tip → 버튼 영역 | **15px** |
| 버튼 영역 → 콘텐츠 영역 | **10px** |
| 콘텐츠 영역 → 콘텐츠 영역 | **10px** |
| 콘텐츠 영역 → 플로팅 버튼 | **15px** |
| 플로팅 버튼 → 페이지 끝 | **30px** |

### 4.4 적용 패턴

```html
<main class="admin-content">
    <div class="admin-body">
        <!-- 1. Info & Tip (필요 시) -->
        <div class="admin-infotip"> … </div>          <!-- ↓ 15px -->

        <!-- 2. 액션 버튼 영역 -->
        <div class="admin-action-bar"> … </div>        <!-- ↓ 10px -->

        <!-- 3. 콘텐츠 (통계 카드, 검색 필터, 목록 등) -->
        <div class="count-card-grid"> … </div>         <!-- ↓ 10px -->
        <div class="list-panel list-panel--filter"> … </div>  <!-- ↓ 10px -->
        <div class="list-panel"> … </div>              <!-- ↓ 15px -->

        <!-- 4. 플로팅 버튼 (상세 페이지의 저장/취소 등) -->
        <div class="c-fab-bar"> … </div>
    </div>
</main>
```

### 4.5 컬럼 분할 가이드
- 1단: 작업 영역 전체 폭 (1,440 - 60 = **1,380px**, 1,440 초과 시 가변)
- 2단: 컬럼 = `(작업 영역 - 30) / 2`
- 3단: 컬럼 = `(작업 영역 - 60) / 3`
- 4단: 컬럼 = `(작업 영역 - 90) / 4`

### 4.6 페이지 구성 시 체크 포인트
- ☐ 좌우 30px 여백이 일관되게 적용되어 있는가
- ☐ 콘텐츠 블록 간 수직 간격이 위 표를 따르는가
- ☐ 1,440px 이상에서 작업 영역이 자연스럽게 늘어나는가 (목록형)
- ☐ 상세 페이지의 액션 버튼이 플로팅으로 고정되어 있는가

---

## 5. 모달 시스템

### 5.1 너비별 컴포넌트

| 너비 | 클래스 | 용도 |
|------|--------|------|
| 360px | `.c-modal` | 알럿/확인 (single message + 1~2 버튼) |
| 480px | `.c-modal.completion-modal` | 폼/액션 (헤더 + 바디 + 버튼) |
| 600px | `.c-modal.completion-modal.completion-modal--lg` | 확장 폼/테이블 포함 |
| custom | inline `width: …` | 1280 등 특수 케이스 |

### 5.2 360px 알럿 구조

```html
<div class="c-modal-overlay is-hidden" id="…">
    <div class="c-modal">
        <div class="c-modal__content">
            <div class="c-modal__icon-wrap [c-modal__icon-wrap--error|--notice]">
                <img src="../../../images/ico-modal-{success|error|notice}.svg" width="36" height="36" alt="">
            </div>
            <p class="c-modal__title">선택사항</p>
            <p class="c-modal__desc">메인 메시지</p>
            <p class="c-modal__desc-sub">보조 안내</p>
        </div>
        <div class="c-modal__footer [c-modal__footer--split]">
            <button class="btn lg border">취소</button>
            <button class="btn lg">확인</button>
        </div>
    </div>
</div>
```

**아이콘 변형**:
- 기본 (블루 체크) — 성공/완료 → `c-modal__icon-wrap` + `ico-modal-success.svg`
- `--error` (레드 삼각형) — 오류 → `ico-modal-error.svg`
- `--notice` (그린 느낌표) — 경고/확인 → `ico-modal-notice.svg`

**푸터 변형**:
- 기본: 단일 풀폭 버튼 `<button class="btn lg" style="width:100%;">확인</button>`
- `--split`: 취소/확인 2버튼 (좌우 1:1)

### 5.3 480px 모달 구조

```html
<div class="c-modal completion-modal">
    <div class="completion-modal__header">
        <h3 class="completion-modal__heading">제목</h3>
        <button class="completion-modal__close">
            <img src="../../../images/btn-modal-close.svg" width="24" height="24" alt="">
        </button>
    </div>
    <div class="c-modal__content completion-modal__body"> … </div>
    <div class="c-modal__footer">
        <button class="btn lg" style="width:100%;">확인</button>
    </div>
</div>
```

### 5.4 모달 배치
- **페이지 내 모달**: `</main>` 다음, `<script>` 이전에 `<!-- 모달창 모음 -->` 주석으로 그룹화하고 `is-hidden` 또는 `style="display:none;"`으로 숨김.
- **별도 모달 페이지**: 단독 페이지로 작업할 때 `*-modal.html` 파일로 분리 (LNB 없이 모달만 표시).

### 5.5 패딩 / 간격 표준
- `.c-modal` 패딩: 30px (사방 동일).
- `.c-modal__footer` gap: 6px (취소/확인 버튼 간격).

---

## 6. 패널 시스템

| 클래스 | 용도 |
|--------|------|
| `.list-panel` | 기본 카드 패널 (하단 패딩 30) |
| `.list-panel--flush` | 테이블이 좌우 30 마진으로 붙는 설정형 패널 |
| `.list-panel--filter` | 검색/필터 컨테이너 (안에 `.admin-filter` 또는 `.c-date-filter`) |
| `.list-panel--p30` | 사방 30 패딩 |

### 패널 헤더
- 기본: `.list-panel__header > .list-panel__title`
- 액션 버튼이 우측에 붙는 경우: `.panel-form-header > .list-panel__title.list-panel__title--flat + 버튼`
- 메타 정보가 우측에 붙는 경우: `.list-panel__header.list-panel__header--meta`

### 검색 패널 (통일 패턴)
```html
<div class="list-panel list-panel--filter">
    <div class="admin-filter">
        <div class="admin-filter__search"> … </div>
        <div class="admin-filter__selects"> … </div>
    </div>
</div>
```

---

## 7. 테이블 시스템

| 클래스 | 용도 |
|--------|------|
| `.admin-table` | 메인 데이터 테이블 (목록 페이지) |
| `.tab-table` | 탭 안의 콘텐츠 테이블 (44px th 높이) |
| `.tab-table--compact` | tab-table td 상하 패딩 8px |
| `.tab-info-table` | 좌측 라벨 + 우측 콘텐츠 (상세 정보) |
| `.setting-table` | 설정 폼 테이블 (입력 필드 포함) |
| `.modal-info-table` | 모달 안의 라벨-값 2열 |

### 테이블 위 타이틀
- `.tab-info-title` — 17px, border 없음, 테이블과 8px 간격 (탭 정보 섹션 타이틀)
- `.list-panel__title` — 패널 헤더 타이틀

### 셀 정렬 규칙

**🔒 제목 셀(`<th>`)은 무조건 중앙정렬** — 어떤 클래스를 추가해도 변경되지 않음 (`.admin-table th { text-align: center !important }`).

본문 셀(`<td>`)만 정렬 클래스 적용:

| 클래스 | 정렬 | 용도 |
|--------|------|------|
| `.td-left` | 왼쪽 | 텍스트 컬럼 (상품명, 주문자명 등) |
| `.td-right` | 오른쪽 | 숫자/금액 컬럼 (실 구매금액, 할인 등) |
| (기본) | 중앙 | 상태, 날짜, 코드 등 짧은 값 |

**컬럼별 정렬 가이드**
- 텍스트 (상품명, 사용자명, 이메일, 주소 등) → **왼쪽**
- 숫자/금액 (가격, 수량, 진도율 등) → **오른쪽**
- 상태/뱃지/날짜/ID → **중앙** (기본값 그대로)

**기타 셀 클래스**
- `.th-check` — 체크박스 헤더 (좁은 폭)
- 인라인 `style="white-space:nowrap;"` — 줄바꿈 방지

---

## 8. 폼 컴포넌트

### 8.1 그리드 (상세 페이지 폼)
```html
<div class="detail-form__grid">                   <!-- 기본 2열 -->
<div class="detail-form__grid detail-form__grid--1col">  <!-- 1열 -->
<div class="detail-form__grid detail-form__grid--3col">  <!-- 3열 -->
<div class="detail-form__grid detail-form__grid--mb20">  <!-- 하단 마진 20 -->
    <div class="detail-form__field">
        <span class="detail-form__label">라벨 <span class="auth-required">*</span></span>
        <input type="text" class="detail-form__input">
    </div>
</div>
```

### 8.2 입력 컴포넌트
| 클래스 | 용도 |
|--------|------|
| `.c-toggle` | 일반 토글 스위치 (46×24) |
| `.c-toggle-text` | 텍스트 라벨 토글 (활성/비활성, 64×28) |
| `.c-radio` | 커스텀 라디오 |
| `.c-check`, `.c-check-blue`, `.c-check-setting` | 커스텀 체크박스 |
| `.c-dropdown` | 드롭다운 (44px 기본) |
| `.c-dropdown--ghost` | 테두리 없음 (36px 높이) |
| `.c-dropdown--full-border` | 사방 보더 라운드 |

### 8.3 라디오/체크 + 라벨
```html
<label class="c-radio">
    <input type="radio" name="…" checked>
    <span>옵션</span>
</label>
```

---

## 9. 인포메이션 컴포넌트

### 9.1 인포팁 배너
```html
<div class="admin-infotip">
    <span class="admin-infotip__icon">i</span>
    <span class="admin-infotip__text">메시지 <a href="#" class="admin-infotip__link">가이드보기</a></span>
</div>

<!-- 빨강 변형 -->
<div class="admin-infotip admin-infotip--error">
    <span class="admin-infotip__icon">!</span>
    …
</div>
```

### 9.2 토스트 알림
참조: [styleguide/alert.html](src/views/styleguide/alert.html)
- 너비 320px, 그림자 모달처럼 떠있는 형태
- 헤더(X 버튼) + 메인(아이콘 + 타이틀 + 설명)
- 아이콘: `ico-toast-confirm.svg` (성공) / `ico-toast-error.svg` (실패)

---

## 10. 일괄 작업 바 (Bulk Bar)

체크박스 다중 선택 후 하단에 표시되는 액션 바.

```html
<div class="c-bulk-bar hidden" id="bulkBar">
    <div class="c-bulk-bar__left">
        <button class="c-bulk-bar__close" onclick="closeBulkBar()">×</button>
        <span class="c-bulk-bar__text" id="bulkText">(n)개 항목 선택됨</span>
    </div>
    <div class="c-bulk-bar__actions">
        <button class="c-bulk-bar__btn">액션1</button>
        <button class="c-bulk-bar__btn">액션2</button>
    </div>
</div>
```

---

## 11. 페이지네이션

```html
<div class="pagination" style="padding:20px 0 4px;">
    <button class="pagination__btn disabled" disabled>처음</button>
    <button class="pagination__btn disabled" disabled>이전</button>
    <button class="pagination__btn active">1</button>
    <button class="pagination__btn">2</button>
    …
    <button class="pagination__btn">다음</button>
    <button class="pagination__btn">마지막</button>
</div>
```

---

## 12. 버튼 시스템

| 클래스 | 용도 |
|--------|------|
| `.btn.lg` | 일반 사이즈 (44px 높이) |
| `.btn.big` | 큰 사이즈 (52px 높이) |
| `.btn.md` | 중간 (36px) |
| `.btn.nm` | 노멀 (32px) |
| `.btn.sm` | 작은 (28px) |
| `.btn.xs` | 매우 작은 (24px) |

| 변형 | 용도 |
|------|------|
| 기본 | primary (블루) |
| `.dark` | 다크 (검정) |
| `.border` | 외곽선만 (회색) |
| `.border-primary` | 외곽선만 (블루) |
| `.btn--icon` | 아이콘 + 텍스트 (gap 6px) |

---

## 13. 상태/뱃지

| 클래스 | 용도 |
|--------|------|
| `.status-chip` `.status-chip--green/red/neutral/active/inactive/left` | 상태 칩 |
| `.role-badge` `.role-badge--learner/manager/sub/instructor/first` | 역할 뱃지 |
| `.sale-status-tag` `.sale-status-tag--selling/closed/ongoing` | 판매 상태 |
| `.cate-tag`, `.grade-tag`, `.join-tag` | 카테고리/등급/가입유형 태그 |
| `.product-tag` | 상품 유형 태그 |
| `.learn-badge` | 학습 상태 뱃지 |

---

## 14. 작업 참조

| 파일 | 내용 |
|------|------|
| [src/views/styleguide/index.html](src/views/styleguide/index.html) | 전체 컴포넌트 카탈로그 |
| [src/views/styleguide/alert.html](src/views/styleguide/alert.html) | 360px 알럿 모달 + 인포 + 토스트 |
| [src/views/styleguide/popup.html](src/views/styleguide/popup.html) | 480/500/600 모달 모음 |
| [src/views/styleguide/badge.html](src/views/styleguide/badge.html) | 뱃지 & 상태 칩 |
| [src/views/styleguide/table.html](src/views/styleguide/table.html) | 데이터 테이블 패턴 |
| [src/views/sitemap.html](src/views/sitemap.html) | 전체 페이지 목록 |

---

## 15. 자주 하는 작업

### 15.1 새 페이지 만들기
1. 같은 섹션의 비슷한 페이지를 카피한다.
2. `<title>`, 페이지 타이틀, LNB `active` 위치를 변경한다.
3. 컨텐츠 영역만 교체.
4. **🔒 페이지 생성 직후 [sitemap.html](src/views/sitemap.html) 반드시 업데이트** — 누락 금지.

### 15.1.1 사이트맵 업데이트 규칙

**페이지(또는 모달)를 새로 만든 직후, 다음 작업이 다른 작업으로 넘어가기 전에 무조건 진행한다.**

체크 항목:
1. 해당 카테고리 섹션의 `<ul class="page-list">` 안에 `<li>` 추가
2. **카테고리 내 항목 순서** = **생성 순서** (카피한 부모 페이지 다음에 배치)
   - 예: `list.html` → `detail-notice.html` → `add.html` → `add-free.html` → `*-modal.html`
   - 새로 만든 페이지는 같은 흐름의 기존 페이지 바로 옆에 끼워 넣음
3. 모달 페이지(`*-modal.html`)는 제목 끝에 `<span class="modal-tag">MODAL</span>` 추가
4. 섹션 헤더의 `<span class="count">N개</span>` 수치 갱신
5. 페이지 상단 desc의 총 페이지 수 갱신:
   `customer-admin 내 모든 페이지 목록 (총 <strong>N</strong>건)`
6. 새로운 카테고리(폴더)인 경우:
   - TOC `<nav class="toc">`에 `<a href="#xxx">`추가
   - 새 `<section id="xxx">` 추가

### 15.2 알럿 모달 추가
1. 페이지 끝 `</main>` 다음에 `<!-- 모달창 모음 -->` 블록 안에 추가.
2. `is-hidden` 또는 `style="display:none;"`으로 숨김.
3. 단일 메시지 알럿이면 360px `.c-modal` 사용.

### 15.3 검색 영역 추가
1. `.list-panel.list-panel--filter` 컨테이너로 감싼다.
2. 안에 `.admin-filter`, `.admin-filter__search`, `.admin-filter__selects` 배치.
3. 날짜 지정이 있으면 위에 `.c-date-filter` 추가.

### 15.4 상세 정보 표시
- 읽기 전용 → `.tab-info-table`
- 폼 입력 → `.setting-table` 또는 `.detail-form__grid`
- 위에 섹션 타이틀이 있으면 → `.tab-info-title`

---

## 16. 반응형 (Responsive)

PC Admin 우선으로 작성하되, 모바일·태블릿에서 깨지지 않도록 미디어 쿼리로 대응한다. **부트스트랩 사용 금지**, `@media` 쿼리만 사용.

### 16.1 브레이크포인트

| 디바이스 | 브레이크포인트 | 용도 |
|---|---|---|
| 모바일 | `max-width: 768px` | LNB 토글, 1열 전환, 모달 전체 폭 |
| 태블릿 | `max-width: 1024px` | 컬럼 축소, 일부 폼 2열 → 1열 |
| PC | `min-width: 1025px` | 기본 (Adaptive, 1,440px 최적) |

### 16.2 6대 반응형 원칙

#### ① 레이아웃 — LNB 햄버거 메뉴
- `.admin-wrap`은 PC에서 `flex-direction: row` (LNB 좌, 콘텐츠 우)
- 모바일에서 LNB를 **숨김 + 햄버거 버튼 토글**로 전환
- `.admin-lnb`에 `--open` 모디파이어 추가 시 슬라이드 인

```css
@media (max-width: 768px) {
    .admin-lnb { position: fixed; top: 0; left: -260px; height: 100vh; transition: left 0.25s; z-index: 50; }
    .admin-lnb--open { left: 0; }
    .admin-header__menu-toggle { display: inline-flex; } /* 햄버거 버튼 */
}
```

#### ② 테이블 — 가로 스크롤 또는 카드 변환
- `.admin-table-wrap`은 기본적으로 가로 스크롤로 대응 (`overflow-x: auto`).
- 컬럼 수가 많거나 가독성이 떨어지는 경우 모바일에서 **카드 변환** 검토.

```css
@media (max-width: 768px) {
    .admin-table-wrap { overflow-x: auto; -webkit-overflow-scrolling: touch; }
    .admin-table { min-width: 720px; }
}
```

#### ③ 폼 — 1열 전환
- `.detail-form__grid`는 PC에서 2열(`grid-template-columns: 1fr 1fr`), 모바일에서 1열로 전환.
- 행 내부의 라벨 + 입력 인라인은 모바일에서 세로 스택으로.

```css
@media (max-width: 768px) {
    .detail-form__grid { grid-template-columns: 1fr; gap: 16px; }
}
```

#### ④ 모달 — 화면 폭에 맞춰 100% width
- `.c-modal`은 PC에서 고정 너비(360 / 480 / 600 / 800 등), 모바일에서 화면 좌우 16px 마진 두고 100%.

```css
@media (max-width: 768px) {
    .c-modal { width: calc(100vw - 32px); max-width: 100%; }
    .c-modal__footer .btn.big,
    .c-modal__footer .btn.lg { min-width: 0; }
}
```

#### ⑤ 사이드바 — 토글 LNB + 백드롭
- LNB 열림 시 어두운 백드롭으로 본문 클릭 방지.
- 백드롭 클릭 시 LNB 닫힘.

```css
.admin-lnb__backdrop { display: none; }

@media (max-width: 768px) {
    .admin-lnb__backdrop { position: fixed; inset: 0; background: rgba(0,0,0,0.4); z-index: 40; }
    .admin-lnb--open + .admin-lnb__backdrop { display: block; }
}
```

#### ⑥ 카드 그리드 — 4열 → 2열 (태블릿)
- 통계 카드/요약 카드 등 **4개 컬럼으로 나열된 그리드**는 태블릿(1024px 이하)에서 **2열**로 전환.
- 모바일(768px 이하)에서도 2열을 유지하거나 1열로 전환 (콘텐츠에 따라 선택).
- 대상 패턴: `.admin-grid--4`, `.count-card-grid`, `.stat-card` 4개 그리드 등.

```css
@media (max-width: 1024px) {
    .admin-grid--4,
    .count-card-grid { grid-template-columns: repeat(2, 1fr); }
}

@media (max-width: 768px) {
    /* 필요 시 1열로 추가 축소 */
    .admin-grid--4,
    .count-card-grid { grid-template-columns: 1fr; }
}
```

### 16.3 작업 체크리스트 (모바일 확인)

새 페이지/컴포넌트 작업 시 PC 완료 후 다음을 확인한다.

- ☐ 768px 이하에서 가로 스크롤이 발생하지 않는가 (테이블 제외)
- ☐ LNB가 햄버거 메뉴로 토글되고 백드롭이 동작하는가
- ☐ 폼(`.detail-form__grid`)이 1열로 자연스럽게 전환되는가
- ☐ 4열 카드 그리드(`.admin-grid--4`, `.count-card-grid` 등)가 태블릿에서 2열로 전환되는가
- ☐ 모달이 화면 폭에 맞춰 표시되고 footer 버튼이 깨지지 않는가
- ☐ 액션바/벌크바의 버튼이 줄바꿈되어도 사용 가능한가
- ☐ 텍스트가 끊기거나 영역 밖으로 흐르지 않는가 (`word-break`, `flex-wrap`)
- ☐ 터치 타깃이 최소 44×44px 이상인가 (버튼·링크)

### 16.4 작성 순서 권장
1. PC 레이아웃 완료
2. `@media (max-width: 1024px)`로 태블릿 레이아웃 보정 (필요 시)
3. `@media (max-width: 768px)`로 모바일 레이아웃 완성
4. 모바일 → 태블릿 → PC 순으로 확인하며 깨짐 수정

---

## 17. 금지 사항

- ❌ HTML 파일에 `<style>` 태그 (스타일가이드 제외)
- ❌ Vue/React 등 프레임워크 마크업
- ❌ ES Module import/export, build 필요한 코드
- ❌ `<script src="...">` 외부 JS 의존
- ❌ jQuery 등 라이브러리 추가
- ❌ admin-filter-panel (구식, list-panel--filter로 대체)
- ❌ 절대 경로 (모든 자원은 상대 경로로)
- ❌ **Bootstrap/Tailwind 등 CSS 프레임워크 도입** (반응형은 `@media` 쿼리만)
- ❌ **반응형 미적용 페이지 배포** (모바일 768px 이하에서 깨짐 금지)

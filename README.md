# joy
`joy`는 2D 게임 개발을 쉽게 할 수 있도록 돕는 JavaScript 라이브러리입니다.

## 사용법
아래와 같이 `index.html` 파일을 만듭니다.

```html
<!doctype html>
<html>
  <head>
    <meta charset="utf-8">
    <script src="https://cdn.jsdelivr.net/npm/joylib@latest"></script>
  </head>
  <body>
    <script src="game.js"></script>
  </body>
</html>
```

그 다음 `game.js`라는 파일을 만들고, 게임 코드를 작성합니다.

```js
var go = $({ image: 'assets/dog.png' });
go.on('update', function (deltaTime) {
  go.rotation += deltaTime * 100; // 강아지가 뱅글뱅글 돕니다.
});
```

이후 로컬 서버를 실행해 `index.html`에 접속하거나, `index.html`과 `game.js`를 인터넷에 업로드해 접속합니다.

```bash
# 로컬 서버 실행 방법

# 파이썬이 설치되어 있는 경우
python3 -m http.server 8000

# node.js가 설치되어 있는 경우
npx serve .
```

[인터넷 업로드 예시](https://joy-js.github.io/joy/examples/dog/)

## 함수 `$`사용하기
`$`는 `joy`의 모든 기능을 담고 있는 함수입니다. 단순히 `$()`로 게임 오브젝트를 생성하는 것에서부터, `$.gameWidth`와 같은 각종 전역 변수들을 내장하고 있습니다.

게임 오브젝트 생성에 사용되는 기본 옵션들은 다음과 같습니다.
```js
var go = $({
  image: 'assets/dog.png', // 오브젝트의 이미지 지정
  x: 100, // 게임 오브젝트의 x 좌표
  y: 200, // 게임 오브젝트의 y 좌표
  scale: 2, // 게임 오브젝트의 크기 비율 (scaleX, scaleY로 각각 지정할 수도 있습니다.)
  rotation: 90, // 화전 각도 (pivotX, pivotY로 회전의 중점을 지정할 수 있습니다.)
  alpha: 0.5, // 투명도
  drawOrder: 123, // 그리기 순서, 클수록 앞에 놓입니다.
});

// 다음과 같이 추후에 옵션을 변경할 수도 있습니다.
go.x = 300;
```

### 물리 관련 옵션들
`joy`는 게임 오브젝트에 충돌체를 지정해 물리를 적용시킬 수 있습니다.

충돌체의 종류는 3가지입니다.
- `{ type: 'rect', x: 1, y: 2, width: 10, height: 20 }` 사각형 충돌체
- `{ type: 'circle', x: 1, y: 2, radius: 5 }` 원형 충돌체
- `{ type: 'vert', x: 1, y: 2, vertices: [{ x: 0, y: 0 }, { x: 0, y: 10 }, { x: 10, y: 10 }] }` 정점 충돌체

이러한 충돌체 및 물리 설정들을 옵션으로 지정할 수 있습니다.
```js
var go = $({
  collider: { type: 'circle', x: 1, y: 2, radius: 5 }, // 충돌체
  isStatic: true, // 고정된 물리체
  isSensor: true, // 직접 충돌이 아닌 충돌 감지용 물리체
  velocityX: 10, // x축 속도
  velocityY: 20, // y축 속도
  fixedRotation: true, // 물리에 의한 회전 방지
})
```

### 게임 오브젝트 함수 목록
- `go.add(child1, child2, ...)` 자식 오브젝트를 추가합니다.
- `go.remove()` 현재 오브젝트를 제거합니다.
- `go.on('eventName', listener)` 오브젝트에 이벤트를 등록합니다.
- `go.off('eventName', listener)` 오브젝트에서 이벤트를 제거합니다.
- `go.emit('eventName')` 오브젝트에 이벤트를 발생시킵니다.

### 전역 변수/함수 목록
- `$.gameWidth` 게임 화면의 너비
- `$.gameHeight` 게임 화면의 높이
- `$.gravity` 게임의 중력 설정
- `await $.preload(image, sound, ..., function (percent) { /* 퍼센트를 화면에 표시하는 등 */ })` 게임에서 사용되는 리소스들을 미리 로딩합니다.

## 조금 더 규모있는 게임을 만드려면...
조금 더 규모있는 게임을 만들기 위해서는 단일 `game.js` 파일만으로는 어려울 수 있습니다.

JavaScript 환경에서는 여러 JavaScript 파일을 만들고, `export`, `import` 등을 사용해 기능을 공유할 수 있습니다.

이후에는 [`esbuild`](https://esbuild.github.io/)와 같은 도구를 활용해 여러 `.js` 들을 단일 `.js`파일로 만들어 사용할 수 있습니다.

## 라이센스
MIT

## 문의 & 피드백
궁금한 점이나 개선 제안이 있다면 언제든지 [**GitHub Issues**](https://github.com/joy-js/joy/issues)에 남겨주세요.

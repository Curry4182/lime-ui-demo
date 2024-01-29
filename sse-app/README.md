
# SSE-App 프로젝트 설정 및 실행 가이드

이 문서는 React를 사용하여 개발된 SSE (Server-Sent Events) 애플리케이션인 'sse-app'의 설정과 실행 방법을 설명합니다. 프로젝트는 'lime-ui-demo' 폴더 내에 위치하고 있으며, GitHub 저장소에서 복제하여 사용할 수 있습니다.

## 1. GitHub 저장소에서 프로젝트 복제

먼저, 다음 명령어를 사용하여 GitHub에서 프로젝트를 복제합니다.

```bash
git clone https://github.com/Curry4182/lime-ui-demo
```

## 2. 프로젝트 폴더로 이동

복제한 프로젝트 폴더로 이동합니다.

```bash
cd lime-ui-demo/sse-app
```

## 3. 프로젝트 설정

프로젝트의 루트 디렉토리에서 다음 명령어를 실행하여 필요한 패키지들을 설치합니다.

```bash
npm install
```

## 4. `event-source-polyfill` 설치

`event-source-polyfill`을 설치합니다.

```bash
npm install event-source-polyfill
npm install --save-dev @types/event-source-polyfill
```

## 5. 서버 실행

React 애플리케이션을 시작하기 위해 다음 명령어를 실행합니다.

```bash
npm start
```

이 명령은 개발 서버를 시작하고, 기본적으로 `http://localhost:3000` 주소에서 애플리케이션을 호스팅합니다.

## 6. 애플리케이션 접속

브라우저를 열고 `https://api.uju-lime.shop/login` 주소로 접속합니다. 
카카오톡 로그인을 진행하고 login 버튼을 누르면 React 애플리케이션의 UI를 볼 수 있으며,이 후 서버에서 보내는 이벤트를 확인할 수 있습니다.

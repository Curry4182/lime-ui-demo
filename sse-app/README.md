
# SSE-App 프로젝트 설정 및 실행 가이드

이 문서는 React를 사용하여 개발된 SSE (Server-Sent Events) 애플리케이션의 설정과 실행 방법을 설명합니다.

## 1. 프로젝트 설정

프로젝트의 루트 디렉토리에서 다음 명령어를 실행하여 필요한 패키지들을 설치합니다.

```bash
npm install
```

## 2. `event-source-polyfill` 설치

SSE를 지원하지 않는 브라우저에서도 SSE를 사용할 수 있도록 `event-source-polyfill`을 설치합니다.

```bash
npm install event-source-polyfill
npm install --save-dev @types/event-source-polyfill
```

## 3. 서버 실행

React 애플리케이션을 시작하기 위해 다음 명령어를 실행합니다.

```bash
npm start
```

이 명령은 개발 서버를 시작하고, 기본적으로 `http://localhost:3000` 주소에서 애플리케이션을 호스팅합니다.

## 4. 애플리케이션 접속

브라우저를 열고 `https://api.uju-lime.shop/login` 주소로 접속합니다. 이제 React 애플리케이션의 UI를 볼 수 있으며, 서버에서 보내는 이벤트를 확인할 수 있습니다.

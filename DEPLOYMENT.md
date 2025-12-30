# 배포 가이드

이 Tetris 웹앱은 순수 정적 웹앱으로, API 키 없이 Netlify 또는 Vercel에 바로 배포할 수 있습니다.

## Netlify 배포

1. [Netlify](https://www.netlify.com/)에 로그인
2. "New site from Git" 클릭
3. GitHub 저장소 연결
4. 빌드 설정 확인 (자동으로 감지됨):
   - Build command: `npm run build`
   - Publish directory: `dist`
5. "Deploy site" 클릭

## Vercel 배포

1. [Vercel](https://vercel.com/)에 로그인
2. "New Project" 클릭
3. GitHub 저장소 임포트
4. 빌드 설정 확인 (자동으로 감지됨):
   - Framework Preset: Vite
   - Build Command: `npm run build`
   - Output Directory: `dist`
5. "Deploy" 클릭

## 로컬 개발

```bash
npm install
npm run dev
```

## 로컬 빌드 테스트

배포 전에 로컬에서 빌드가 정상적으로 되는지 확인:

```bash
npm run build
npm run preview
```

배포 후 제공되는 URL로 게임에 접속할 수 있습니다!

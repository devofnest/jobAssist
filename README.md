# JobAassist Service

## 소개
JobAssist Service는 여러 구인구직 플랫폼(예: 잡코리아, 사람인)의 채용 공고를 통합 검색할 수 있는 스터디용 서비스입니다. <br/>
이 서비스는 학습 및 연습 목적으로 제작되었으며, 상업적 용도로 사용되지 않습니다.

## 주요 기능
- 통합 채용 공고 검색 (잡코리아 등)
- 데이터 크롤링 및 저장
- 반응형 프론트엔드 인터페이스 제공

## 프로젝트 구조
- `backend/`: 파이썬 백엔드 서버
- `frontend/`: React 프론트엔드 UI
- 
### 더보기
더 자세한 내용은 여기서 확인 가능합니다.
- [Frontend 관련 자세히 보기](./frontend/README.md)
- [Backend 관련 자세히 보기](./backend/README.md)
   
### 설치 및 실행법

```bash
# backend 설치
cd backend
python -m venv venv
source venv/bin/activate (Windows: venv\\Scripts\\activate)
pip install -r requirements.txt
uvicorn main:app --reload

# frontend 설치
cd frontend
npm install
npm run dev
```

### 개발 일정
- 총 기간: 2주
- 2주 이터레이션: 각 2주마다 하나의 핵심 기능 또는 구성 요소를 완성합니다.
- 1차 이터레이션: 기본 백엔드 및 프론트엔드 환경 구축
- 2차/3차 이터레이션: 데이터 크롤링 기능 구현, 통합 검색 기능 구현 및 최적화

### 라이센스
- 이 프로젝트는 스터디 및 학습 목적으로만 사용됩니다. 상업적 배포 및 이용은 금지됩니다.

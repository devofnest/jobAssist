# JobAassist Service

## 소개

JobAssist Service는 여러 구인구직 플랫폼(예: 잡코리아, 사람인)의 채용 공고를 통합 검색할 수 있는 스터디용 서비스입니다. <br/>
이 서비스는 학습 및 연습 목적으로 제작되었으며, 상업적 용도로 사용되지 않습니다.

## 주요 기능

- 통합 채용 공고 검색 (잡코리아 등)
- 데이터 크롤링 및 저장
- 반응형 프론트엔드 인터페이스 제공

디렉토리 구조
```
`project-root/
├── backend/ # 파이썬 백엔드 관련 코드
│ ├── venv/ # 프로젝트마다 독립된 Python 실행 환경을 만들어주는 도구
│ ├── Database.py/ # 데이터베이스 모델과 ORM(Object-Relational Mapping) 설정을 담당
│ ├── main.py/ # FastAPI를 활용한 웹 API서버
│ ├── requirements.txt # 파이썬 패키지 목록
│ └── README.md # 백엔드 관련 문서
│
├── frontend/ # React.js 프론트엔드 관련 코드b
│ ├── public/ # 정적 파일 (index.html, favicon 등)
│ ├── src/ # React 컴포넌트 및 소스코드
│ │ ├── main.js # 사용자 인터페임스 및 API 통신 로직
│ │ └── App.js # 사용자 인터페임스 및 API 통신 로직
│ ├── package.json # 프론트엔드 패키지 목록 및 스크립트
│ └── README.md # 프론트엔드 관련 문서
│
├── .gitignore # Git에 포함시키지 않을 파일 목록
├── README.md # 전체 프로젝트 개요 및 설정법
└── docker-compose.yml # 도커 사용 시, 백엔드와 프론트엔드를 한 번에 실행하기 위한 설정 파일 (선택 사항)`
```
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

# 🏟️ [프로젝트명: 예 - PlaySpot] : 공공 체육시설 예약 서비스

> **"시민들의 건강한 여가 생활을 위한, 쉽고 공정한 체육시설 통합 예약 플랫폼"**
>
> **개발 기간:** 202X.XX.XX ~ 202X.XX.XX
> **팀 구성:** Backend 2명, Frontend 2명 (본인 역할: **Backend & Infra**)

<br/>

## 📖 프로젝트 소개 (Introduction)
기존 공공 체육시설 예약 시스템의 복잡한 UI와 불안정한 예약 프로세스를 개선하기 위해 개발했습니다.
단순한 예약 기능을 넘어, **대용량 트래픽 상황에서의 동시성 제어**와 **사용자 편의성을 고려한 검색 필터** 구현에 집중했습니다.

<br/>

## 🛠️ Tech Stack

| 구분 | 기술 스택 |
| :-- | :-- |
| **Backend** | <img src="https://img.shields.io/badge/Java 17-007396?logo=java&logoColor=white"> <img src="https://img.shields.io/badge/Spring Boot 3.x-6DB33F?logo=springboot&logoColor=white"> <img src="https://img.shields.io/badge/Spring Security-6DB33F?logo=springsecurity&logoColor=white"> <img src="https://img.shields.io/badge/JPA (Hibernate)-59666C?logo=hibernate&logoColor=white"> |
| **Database** | <img src="https://img.shields.io/badge/MySQL 8.0-4479A1?logo=mysql&logoColor=white"> |
| **Frontend** | <img src="https://img.shields.io/badge/React-61DAFB?logo=react&logoColor=white"> <img src="https://img.shields.io/badge/Tailwind CSS-06B6D4?logo=tailwindcss&logoColor=white"> |
| **Tools** | <img src="https://img.shields.io/badge/Git-F05032?logo=git&logoColor=white"> <img src="https://img.shields.io/badge/Postman-FF6C37?logo=postman&logoColor=white"> |

<br/>

## 🏛️ System Architecture & ERD
**RDB 설계의 정규화 원칙**을 준수하며, 예약 시스템의 핵심인 '시설-예약-사용자' 간의 관계를 효율적으로 모델링했습니다.

*(여기에 ERD 이미지 캡처해서 넣으세요. `![ERD](./assets/erd.png)` 형태)*

<br/>

## 👨‍💻 My Contribution (담당 역할)
**Backend Core & API Design**
* **RESTful API 설계:** 자원 중심의 URL 설계 및 `ResponseEntity`를 활용한 명확한 응답 상태 코드 관리.
* **DB 모델링:** 회원, 시설, 예약, 결제 테이블 설계 및 연관관계 매핑 (JPA).
* **Git 전략 수립:** Frontend/Backend 리포지토리 분리 운영 후, `Git Subtree`를 활용하여 모노레포(Monorepo) 형태로 통합 및 이관 작업 주도.

<br/>

## 💥 Troubleshooting & Tech Insights
*(건호님이 물어보셨던 내용을 바탕으로 작성한 '기술적 고민' 예시입니다. 실제로 적용한 것 위주로 남기세요.)*

### 1. 협업을 위한 Git Repository 전략 변경 (Git Subtree)
* **상황:** 초기 개발 시 프론트/백엔드 레포지토리를 분리하여 개발했으나, 프로젝트 완료 후 포트폴리오 관리 및 배포 편의성을 위해 통합이 필요해짐.
* **문제:** 단순 파일 복사(`Ctrl+C/V`)로 합칠 경우, 팀원들의 소중한 **Commit History(기여도, 코드 변경 이력)**가 모두 사라지는 문제 발생.
* **해결:** `Git Subtree` 기능을 활용하여 기존 레포지토리의 커밋 로그를 유지한 채 `backend/`, `frontend/` 폴더 구조로 병합 성공.
* **배운점:** Git의 내부 구조와 브랜치 병합 전략에 대한 이해도 향상.

### 2. 예약 동시성 이슈 제어 (Concurrency Control)
* **상황:** 인기 체육시설 예약 시, 다수의 사용자가 동시에 '예약하기'를 누를 경우 **중복 예약(Over-booking)**이 발생할 위험 확인.
* **해결:**
    * Java의 `synchronized` 키워드는 다중 서버 환경에서 한계가 있음을 인지.
    * DB 레벨에서의 **비관적 락(Pessimistic Lock)**을 도입하여, 트랜잭션이 끝날 때까지 해당 예약 슬롯(Row)에 접근하지 못하도록 제어.
* **결과:** JMeter 부하 테스트 결과, 데이터 무결성 100% 보장.

### 3. JPA N+1 문제 해결 (Performance)
* **상황:** '내 예약 내역' 조회 시, 예약된 시설 정보를 가져오기 위해 예약 개수만큼 추가 쿼리가 발생하는 N+1 문제 확인.
* **해결:** `Fetch Join`을 적용하여 한 번의 쿼리로 연관된 엔티티를 함께 조회하도록 최적화.

<br/>

## 📂 Folder Structure
```bash
root
├── backend/      # Spring Boot Server Application
│   ├── src/main/java
│   └── build.gradle
└── frontend/     # React Client Application
    ├── src/
    └── package.json

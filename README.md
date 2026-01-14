# 🏟️ JE:O CENTER (제오 센터)

> **Join Every One**  
> 모두를 위한 공공 체육시설 통합 관리 플랫폼

공공 체육시설 예약 과정의 복잡함과 운영 비효율을 해결하기 위해 개발한 **통합 예약·관리 플랫폼**입니다.  
단순 예약을 넘어 **실시간 채팅**, **안정적인 결제 검증**, **QR 기반 출석 관리**를 통해  
사용자와 관리자 모두에게 신뢰할 수 있는 디지털 체육시설 경험을 제공합니다.

---

## 📅 Project Overview

- **개발 기간**: 2025.10.27 ~ 2026.01.11 (약 3개월)
- **팀 구성**: Full Stack 3명
- **담당 역할**
  - Backend Lead
  - 시스템 아키텍처 설계
  - 결제 / 실시간 채팅 모듈 구현

---

## 🎯 기획 의도

> **"사용자에게는 편리함을, 관리자에게는 효율을."**

기존 공공 체육시설 시스템은
- 예약 절차가 복잡하고
- 실시간 문의가 불가능하며
- 결제 및 출석 관리의 신뢰성이 낮다는 문제를 안고 있었습니다.

JE:O CENTER는 이러한 문제를 해결하기 위해  
**시설 이용의 전 과정을 디지털화**하는 것을 목표로 설계되었습니다.

---

## 🛠 Tech Stack

### Backend
- Java 17
- Spring Boot 3.x
- Spring Security
- Spring Data JPA
- Redis
- WebSocket (STOMP)

### Frontend
- React
- Tailwind CSS

### Database
- MySQL 8.0

### Infra
- AWS EC2
- Docker

---

## 🚀 Key Contributions

### 1️⃣ WebSocket 기반 실시간 채팅 & 보안 강화
- STOMP 프로토콜을 활용한 **관리자 ↔ 사용자 1:1 실시간 채팅** 구현
- WebSocket 환경에서 Spring Security 인증이 적용되지 않는 문제 해결
  - `ChannelInterceptor` 직접 구현
  - CONNECT 시점에 JWT 토큰 검증
  - 인증 객체(SecurityContext) 주입으로 보안 사각지대 제거

---

### 2️⃣ 결제 무결성 검증 (Payment Integrity)
- **PortOne API** 연동 결제 시스템 구축
- 클라이언트 위·변조 방지를 위한 **서버단 2중 검증 로직 구현**
  - DB에 저장된 실제 상품 가격
  - PG사 결제 내역의 실결제 금액
- 금액 불일치 시 결제 승인 취소 및 자동 환불 처리

---

### 3️⃣ 협업을 위한 코드 표준화 & Git 전략
- **Git Subtree 전략**을 활용한 Monorepo 구성
  - 프론트엔드 / 백엔드 레포지토리 통합
  - 기존 Commit History 완전 보존
- 결제 모듈에 공통 인터페이스 도입
  - PG사 교체에 유연한 구조
  - 유지보수성 및 확장성 확보

---

## 🧩 Troubleshooting

### 🔐 Issue 1. WebSocket 보안 사각지대
**문제**
- WebSocket 연결 시 Spring Security 인증 정보가 `null`

**해결**
- `ChannelInterceptor` 구현
- CONNECT 요청 헤더의 JWT 토큰을 가로채 인증 객체 주입
- HTTP 요청과 동일한 보안 컨텍스트 유지

---

### 💳 Issue 2. 결제 금액 변조 방어
**문제**
- 클라이언트에서 결제 금액을 조작해 요청할 가능성

**해결**
- 결제 완료 직후 서버에서
  - `[DB 상품 가격]` ↔ `[PG사 결제 금액]` 교차 검증
- 불일치 시 자동 결제 취소 및 환불 처리

---

### 🌳 Issue 3. Git Repository 이관
**문제**
- 배포 및 관리 편의성을 위해 Monorepo 구조 필요

**해결**
- `git subtree` 사용
- 기존 커밋 로그를 유지한 채 레포지토리 통합 성공

---

## ✍️ Epilogue

> **"Make Code Readable, Make Logic Reusable."**

JE:O CENTER는 단순한 기능 구현을 넘어  
**백엔드 리드로서 아키텍처, 보안, 코드 품질을 책임진 프로젝트**입니다.

기능 확장에도 흔들리지 않는 구조와  
**다음 개발자가 바로 이해할 수 있는 코드**를 목표로 설계했습니다.

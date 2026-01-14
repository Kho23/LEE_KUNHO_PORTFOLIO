#!/bin/bash

APP_DIR="/home/ubuntu/app"
JAR_NAME="project.jar"

echo "Current Java PID checking..."
# 기존 프로세스 확실하게 종료
CURRENT_PID=$(pgrep -f $JAR_NAME)

if [ -n "$CURRENT_PID" ]; then
  echo "Killing running server: $CURRENT_PID"
  kill -15 $CURRENT_PID
  sleep 5
  # 종료 안 되면 강제 종료
  RECHECK_PID=$(pgrep -f $JAR_NAME)
  if [ -n "$RECHECK_PID" ]; then
    kill -9 $RECHECK_PID
  fi
else
  echo "No running server found."
fi

echo "Moving to app directory..."
cd $APP_DIR || exit 1

echo "Starting Backend Server..."
# 1. 모든 환경변수를 따옴표로 감싸서 공백/특수문자 에러 방지ㅇㅁㄴㅇㄴㅁㅇㅁㄴ
# 2. 실행 끝에 & 를 붙이고 disown을 실행해서 터미널 종료에 영향 안 받게 함
nohup java -jar $JAR_NAME \
  --spring.profiles.active=prod \
  --spring.datasource.url="${RDS_URL}" \
  --spring.datasource.username="${RDS_USERNAME}" \
  --spring.datasource.password="${RDS_PASSWORD}" \
  --spring.jpa.hibernate.ddl-auto=update \
  --Google="${GOOGLE_KEY}" \
  --JWT_SECRET="${JWT_SECRET}" \
  --KAKAO_CLIENT_ID="${KAKAO_CLIENT_ID}" \
  --KAKAO_CLIENT_SECRET="${KAKAO_CLIENT_SECRET}" \
  --NAVER_CLIENT_ID="${NAVER_CLIENT_ID}" \
  --NAVER_CLIENT_SECRET="${NAVER_CLIENT_SECRET}" \
  --iamport.api.key="${IAMPORT_API_KEY}" \
  --iamport.api.secret="${IAMPORT_API_SECRET}" \
  > nohup.out 2>&1 &

# 깃허브 액션 연결이 끊겨도 프로세스가 계속 돌게 함
disown

echo "Deployment finished. Check nohup.out for details."
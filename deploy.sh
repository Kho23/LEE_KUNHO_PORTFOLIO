#!/bin/bash

APP_DIR="/home/ubuntu/app"
JAR_NAME="project.jar"

echo "Current Java PID checking..."
CURRENT_PID=$(pgrep -f $JAR_NAME)

if [ -n "$CURRENT_PID" ]; then
  echo "Killing running server: $CURRENT_PID"
  kill -9 $CURRENT_PID
  sleep 3
else
  echo "No running server found."
fi

echo "Moving to app directory..."
cd $APP_DIR || exit 1

echo "Starting Backend Server..."
nohup java -jar $JAR_NAME \
  --spring.profiles.active=prod \
  --spring.datasource.url="$RDS_URL" \
  --spring.datasource.username="$RDS_USERNAME" \
  --spring.datasource.password="$RDS_PASSWORD" \
  --spring.jpa.hibernate.ddl-auto=update \
  --Google="$GOOGLE_KEY" \
  --JWT_SECRET="$JWT_SECRET" \
  --KAKAO_CLIENT_ID="$KAKAO_CLIENT_ID" \
  --KAKAO_CLIENT_SECRET="$KAKAO_CLIENT_SECRET" \
  --NAVER_CLIENT_ID="$NAVER_CLIENT_ID" \
  --NAVER_CLIENT_SECRET="$NAVER_CLIENT_SECRET" \
  --iamport.api.key="$IAMPORT_API_KEY" \
  --iamport.api.secret="$IAMPORT_API_SECRET" \
  > nohup.out 2>&1 &

echo "Deployment finished."
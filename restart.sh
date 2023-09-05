#!/bin/bash

# 一直检测端口占用直到关闭成功
while :; do

  # 检测端口
  nc -z localhost 3000
  if [ $? -eq 0 ]; then
    # 端口被占用,关闭
    fuser -k -n tcp 3000
  else
    # 端口已关闭
    break
  fi

done

# 端口已关闭,启动项目
cd /www/wwwroot/AI-Code-Convert
npm run build
nohup npm run start >> aicodeconvert.log 2>&1 &
#!/bin/bash

# 强调当前执行的用户权限
npm install --unsafe-perm=true

startTime_s=`date +%s`
nuxt_s="/root/blogNuxt"
nuxt_j="/var/lib/jenkins/workspace/blogNuxt"

# npm源切换
npm config set registry https://registry.npm.taobao.org
npm install
npm run build

if [ $? -eq 1 ]
then 
  echo "打包失败"
  exit 1
fi

# 删除文件及移动打包文件
rm -rf $nuxt_s/.nuxt
mv $nuxt_j/.nuxt $nuxt_s
cp -f $nuxt_j/nuxt.config.js $nuxt_s
cp -f $nuxt_j/package.json $nuxt_s
cp -rf $nuxt_j/static $nuxt_s

# 安装依赖
npm install --prefix $nuxt_s

# 热加载pm2进程守护
pm2 restart blogNuxt

# 统计时间
endTime_s=`date +%s`
durationTime=$[ $endTime_s - $startTime_s ]
echo -e "\033[1;32m 用时：${durationTime}s \033[0m"
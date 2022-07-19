# docker部署Gitlab+Jenkins+Sonarqube实现代码质量扫描

- [1. sonarqube安装](#1-sonarqube安装)
  - [1.1. 创建目录结构](#11-创建目录结构)
  - [1.2. 编写dokcer-compose.yml](#12-编写dokcer-composeyml)
  - [1.3. 构建镜像并启动容器](#13-构建镜像并启动容器)
  - [1.4. sonarqube汉化](#14-sonarqube汉化)
- [2. gitlab安装](#2-gitlab安装)
  - [2.1. 搜索镜像](#21-搜索镜像)
  - [2.2. 准备挂载目录](#22-准备挂载目录)
  - [2.3. 创建容器](#23-创建容器)
  - [2.4. 更改external_url](#24-更改external_url)
  - [2.5. gitlab汉化](#25-gitlab汉化)
- [3. jenkins安装](#3-jenkins安装)
  - [3.1. 本地安装jkd、maven、git](#31-本地安装jkdmavengit)
  - [3.2. 创建容器](#32-创建容器)

## 1. sonarqube安装

- Sonarqube使用需要用到数据库，由于最新版的sonarqube不支持mysql，故选用sonarqube 6.7.4，数据库选用mysql 5.7.16
- sonarqube6.7 Requirements 说明地址：[https://docs.sonarqube.org/display/SONARQUBE67/Requirements](https://docs.sonarqube.org/display/SONARQUBE67/Requirements)

### 1.1. 创建目录结构

``` yml
[root@iZbp12a57ehfe3z2g7t0u7Z home]# mkdir /home/mysonar
[root@iZbp12a57ehfe3z2g7t0u7Z mysql]# mkdir /home/mysonar/mysql /home/mysonar/sonar
[root@iZbp12a57ehfe3z2g7t0u7Z mysql]# cd /home/mysonar
```

### 1.2. 编写dokcer-compose.yml

- 创建mysql的配置文件：my.conf，放入/home/mysql

``` yml
[root@iZbp12a57ehfe3z2g7t0u7Z mysql]# vi /home/mysql/my.conf
```

``` yml
[mysqld]
user=mysql
default-storage-engine=INNODB
#character-set-server=utf8
character-set-client-handshake=FALSE
character-set-server=utf8mb4
collation-server=utf8mb4_unicode_ci
init_connect='SET NAMES utf8mb4'
[client]
#utf8mb4字符集可以存储emoji表情字符
#default-character-set=utf8
default-character-set=utf8mb4
[mysql]
#default-character-set=utf8
default-character-set=utf8mb4
```

``` yml
[root@iZbp12a57ehfe3z2g7t0u7Z mysql]# vim docker-compose.yml
```

``` yml
version: '2'

services:
  mysql:
    image: mysql:5.7
    ports:
      - "3306:3306"
    volumes:
      - ./mysql/data:/var/lib/mysql
      - ./mysql/conf.d:/etc/mysql/conf.d
    environment:
      - MYSQL_ROOT_PASSWORD=root
      - MYSQL_DATABASE=sonarqube
    restart: "always"

  sonarqube:
    image: sonarqube:6.7.4
    ports:
      - "9000:9000"
    volumes:
      - ./sonar/data:/opt/sonarqube/data
      - ./sonar/log:/opt/sonarqube/log
      - ./sonar/extensions:/opt/sonarqube/extensions
      - ./sonar/conf:/opt/sonarqube/conf
      - ./sonar/extensions/plugins/sonar-l10n-zh-plugin-1.19.jar:/opt/sonarqube/extensions/plugins/sonar-l10n-zh-plugin-1.19.jar
    environment:
      - SONARQUBE_JDBC_USERNAME=root
      - SONARQUBE_JDBC_PASSWORD=root
      - SONARQUBE_JDBC_URL=jdbc:mysql://mysql:3306/sonarqube?useUnicode=true&characterEncoding=utf8&rewriteBatchedStatements=true&useConfigs=maxPer
formance
    links:
      - mysql:mysql
    depends_on:
      - mysql
    restart: "always"
```

### 1.3. 构建镜像并启动容器

``` yml
sudo docker-compose -f ./docker-compose.yml up -d
```

### 1.4. sonarqube汉化

查看对应版本的汉化包：[https://github.com/xuhuisheng/sonar-l10n-zh](https://github.com/xuhuisheng/sonar-l10n-zh)
![alt](https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fimg2020.cnblogs.com%2Fblog%2F1678765%2F202101%2F1678765-20210111160136202-641019203.png&refer=http%3A%2F%2Fimg2020.cnblogs.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=jpeg?sec=1614948592&t=e793ac16d552823e5b939148c27e7e7e)

汉化包下载地址：[https://github.com/xuhuisheng/sonar-l10n-zh/tags?after=sonar-l10n-zh-plugin-1.27](https://github.com/xuhuisheng/sonar-l10n-zh/tags?after=sonar-l10n-zh-plugin-1.27)

- 将下载好的汉化包放入：/home/mysonar/sonar/extensions/plugins/
- 切换到：/home/mysonar
- 删除原来构建好的镜像
- 重新构建镜像并启动容器

```yml
sudo docker-compose -f ./docker-compose.yml up -d --build
```

## 2. gitlab安装

### 2.1. 搜索镜像

``` yml
[root@iZbp12a57ehfe3z2g7t0u7Z mysonar]# docker search gitlab
```

### 2.2. 准备挂载目录

``` yml
[root@iZbp12a57ehfe3z2g7t0u7Z home]# mkdir /home/mygitlab
[root@iZbp12a57ehfe3z2g7t0u7Z mygitlab]# mkdir /home/mygitlab/etc/ /home/mygitlab/log/ /home/mygitlab/opt/
```

### 2.3. 创建容器

``` yml
docker run -d -p 8888:80 -p 2222:22 \
 --name mygitlab \
 --restart always \
 --privileged=true \
 -v /home/mygitlab/etc:/etc/gitlab \
 -v /home/mygitlab/log:/var/log/gitlab \
 -v /home/mygitlab/opt:/var/opt/gitlab \
 gitlab/gitlab-ce
```

### 2.4. 更改external_url

``` yml
vim /home/mygitlab/etc/gitlab.rb          #编辑配置文件  
external_url 'http://192.168.1.21'        #改为自己的ip地址
docker restart mygitlab                   #重启容器
```

### 2.5. gitlab汉化

- 查看gitlab版本

``` yml
cat /home/mygitlab/opt/gitlab-rails/VERSION
```

- 下载对应版本到服务器中：[https://gitlab.com/xhang/gitlab/-/tags](https://gitlab.com/xhang/gitlab/-/tags)

- 解压并拷贝文件到目录

``` yml
cp -rf gitlab-v12.4.0-zh/* \
/home/mygitlab/opt/gitlab-rails/opt/gitlab/embedded/service/gitlab-rails/
docker restart mygitlab              #重启容器
```

## 3. jenkins安装

### 3.1. 本地安装jkd、maven、git

也可以在jenkins容器生成后，进入容器中安装

### 3.2. 创建容器

``` yml
docker run -d --restart=always -p 9001:8080 \
-v /var/jenkins_home:/var/jenkins_home \
-v /var/run/docker.sock:/var/run/docker.sock \
-v /usr/bin/git:/usr/bin/git \
-v /usr/local/java/jdk1.8.0_271:/usr/local/java/jdk1.8.0_271 \
-v /usr/local/maven/apache-maven-3.6.3:/usr/local/maven/apache-maven-3.6.3 --name jenkins jenkins/jenkins:latest
```

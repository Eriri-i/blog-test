# 部署传统web程序到linux服务器

## 安装Oracle jdk

### 卸载openjdk

```shell
# 查询已安装的openjdk
[root@localhost usr]# rpm -qa | grep openjdk
java-1.8.0-openjdk-headless-1.8.0.292.b10-1.el7_9.x86_64
java-1.8.0-openjdk-1.8.0.292.b10-1.el7_9.x86_64

# 卸载
[root@localhost usr]# rpm -qa | grep openjdk | xargs rpm -ev
```

### 下载Oracle jdk

> 选用jdk1.8最后一个免费版本，u202，地址：<https://www.oracle.com/java/technologies/javase/javase8-archive-downloads.html>

```shell
# 解压
[root@localhost ~]# cd /usr/local
[root@localhost local]# tar zxvf jdk-8u202-linux-x64.tar.gz 

# 设置所有者
[root@localhost local]# chown -R root:root jdk1.8.0_202/

# 配置环境变量
[root@localhost jdk1.8.0_202]# vim /etc/profile

JAVA_HOME=/usr/local/jdk1.8.0_202
PATH=$PATH:$JAVA_HOME/bin
export JAVA_HOME PATH

# 使配置生效
[root@localhost jdk1.8.0_202]# source /etc/profile
```

## 安装tomcat

> 选用tomcat 8.5.x，地址：<https://tomcat.apache.org/download-80.cgi>

```shell
# 解压
[root@localhost local]# tar -zxvf apache-tomcat-8.5.68.tar.gz 

# 启动
[root@localhost bin]# sh /usr/local/apache-tomcat-8.5.68/bin/startup.sh
Using CATALINA_BASE:   /usr/local/apache-tomcat-8.5.68
Using CATALINA_HOME:   /usr/local/apache-tomcat-8.5.68
Using CATALINA_TMPDIR: /usr/local/apache-tomcat-8.5.68/temp
Using JRE_HOME:        /usr/local/jdk1.8.0_202
Using CLASSPATH:       /usr/local/apache-tomcat-8.5.68/bin/bootstrap.jar:/usr/local/apache-tomcat-8.5.68/bin/tomcat-juli.jar
Using CATALINA_OPTS:   
Tomcat started.

# 测试
[root@localhost bin]# curl localhost:8080

# 停止
[root@localhost bin]# sh /usr/local/apache-tomcat-8.5.68/bin/shutdown.sh 
Using CATALINA_BASE:   /usr/local/apache-tomcat-8.5.68
Using CATALINA_HOME:   /usr/local/apache-tomcat-8.5.68
Using CATALINA_TMPDIR: /usr/local/apache-tomcat-8.5.68/temp
Using JRE_HOME:        /usr/local/jdk1.8.0_202
Using CLASSPATH:       /usr/local/apache-tomcat-8.5.68/bin/bootstrap.jar:/usr/local/apache-tomcat-8.5.68/bin/tomcat-juli.jar
Using CATALINA_OPTS: 

# 再次访问测试
[root@localhost bin]# curl localhost:8080
curl: (7) Failed connect to localhost:8080; Connection refused

```

## 新建测试项目

> 采用ssm框架

### 创建maven工程

使用webapp模板

编辑pom.xml加入依赖

```xml
<dependencies>
  <dependency>
    <groupId>org.springframework</groupId>
    <artifactId>spring-webmvc</artifactId>
    <version>5.1.2.RELEASE</version>
  </dependency>
  <dependency>
    <groupId>org.springframework</groupId>
    <artifactId>spring-jdbc</artifactId>
    <version>5.1.2.RELEASE</version>
  </dependency>
  <dependency>
    <groupId>org.springframework</groupId>
    <artifactId>spring-aop</artifactId>
    <version>5.1.2.RELEASE</version>
  </dependency>
  <dependency>
    <groupId>org.mybatis</groupId>
    <artifactId>mybatis</artifactId>
    <version>3.5.0</version>
  </dependency>
  <dependency>
    <groupId>org.mybatis</groupId>
    <artifactId>mybatis-spring</artifactId>
    <version>1.3.2</version>
  </dependency>
  <dependency>
    <groupId>mysql</groupId>
    <artifactId>mysql-connector-java</artifactId>
    <version>8.0.21</version>
  </dependency>
  <dependency>
    <groupId>com.mchange</groupId>
    <artifactId>c3p0</artifactId>
    <version>0.9.5.2</version>
  </dependency>
  <dependency>
    <groupId>jstl</groupId>
    <artifactId>jstl</artifactId>
    <version>1.2</version>
  </dependency>
  <dependency>
    <groupId>javax.servlet</groupId>
    <artifactId>javax.servlet-api</artifactId>
    <version>4.0.1</version>
  </dependency>
  <dependency>
    <groupId>org.projectlombok</groupId>
    <artifactId>lombok</artifactId>
    <version>1.18.2</version>
  </dependency>
</dependencies>
```

如果相关mapper.xml放在java目录下，需要在pom.xml的build标签中加入一段配置xml资源位置的代码

```xml
    <build>
        # 添加内容开始行
        <resources>
            <resource>
                <directory>src/main/java</directory>
                <includes>
                    <include>**/*.xml</include>
                </includes>
            </resource>
        </resources>
        # 添加内容结束
    </build>
```

### 编辑web.xml

先在main目录下新建resource目录，并mark as resource root

新建spring.xml，springmvc.xml文件

编辑web.xml，配置spring，springmvc，字符编码过滤器，加载静态资源

> 都说web应用程序使用ssm框架，其中的spring，springmvc，就是在web.xml中通过加载对应的配置文件（spring.xml，springweb.xml）并设置相应的属性来整合的

```xml
<web-app>
  <display-name>Archetype Created Web Application</display-name>
<!--  启动spring-->
  <context-param>
    <param-name>contextConfigLocation</param-name>
    <param-value>classpath:spring.xml</param-value>
  </context-param>
  <listener>
    <listener-class>org.springframework.web.context.ContextLoaderListener</listener-class>
  </listener>
<!--  spring MVC-->
  <servlet>
    <servlet-name>dispatcherServlet</servlet-name>
    <servlet-class>org.springframework.web.servlet.DispatcherServlet</servlet-class>
    <init-param>
      <param-name>contextConfigLocation</param-name>
      <param-value>classpath:springmvc.xml</param-value>
    </init-param>
  </servlet>
  <servlet-mapping>
    <servlet-name>dispatcherServlet</servlet-name>
    <url-pattern>/</url-pattern>
  </servlet-mapping>
<!--  字符编码过滤器-->
  <filter>
    <filter-name>characterEncodingFilter</filter-name>
    <filter-class>org.springframework.web.filter.CharacterEncodingFilter</filter-class>
    <init-param>
      <param-name>encoding</param-name>
      <param-value>UTF-8</param-value>
    </init-param>
  </filter>
  <filter-mapping>
    <filter-name>characterEncodingFilter</filter-name>
    <url-pattern>/*</url-pattern>
  </filter-mapping>
<!--  加载静态资源-->
  <servlet-mapping>
    <servlet-name>default</servlet-name>
    <url-pattern>*.js</url-pattern>
  </servlet-mapping>
  <servlet-mapping>
    <servlet-name>default</servlet-name>
    <url-pattern>*.css</url-pattern>
  </servlet-mapping>
  <servlet-mapping>
    <servlet-name>default</servlet-name>
    <url-pattern>*.jpg</url-pattern>
  </servlet-mapping>
</web-app>
```

### 编辑spring.xml

在resource目录下新建config.xml

在main目录下新建java目录，mark as source root

在java目录下新建包com.xxx.repository用来存放map.xml，在包下新建test.xml

在 spring.xml 中配置属性来整合mybatis

> sqlSessionfactorybean 自动生成mapper接口对应的代理对象

```xml
<?xml version="1.0" encoding="UTF-8"?>
<beans xmlns="http://www.springframework.org/schema/beans"
       xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
       xmlns:context="http://www.springframework.org/schema/context"
       xmlns:p="http://www.springframework.org/schema/p"
       xsi:schemaLocation="http://www.springframework.org/schema/beans http://www.springframework.org/schema/beans/spring-beans-3.2.xsd
   http://www.springframework.org/schema/context http://www.springframework.org/schema/context/spring-context-4.3.xsd
">
<!--    整合mybatis-->
    <bean id="datasource" class="com.mchange.v2.c3p0.ComboPooledDataSource">
        <property name="user" value="root"></property>
        <property name="password" value="root"></property>
        <property name="jdbcUrl" value="jdbc:mysql://localhost:3306/test?useUnicode=true&amp;characterEncoding=UTF-8"></property>
        <property name="driverClass" value="com.mysql.cj.jdbc.Driver"></property>
        <property name="initialPoolSize" value="5"></property>
        <property name="maxPoolSize" value="10"></property>
    </bean>
<!--    配置mybatis SqlSessionFactory-->
    <bean id="sqlSessionFactory" class="org.mybatis.spring.SqlSessionFactoryBean">
        <property name="dataSource" ref="datasource"></property>
        <property name="mapperLocations" value="classpath:com/tangshijie/repository/*.xml"></property>
        <property name="configLocation" value="classpath:config.xml"></property>
    </bean>
<!--    扫描自定义的mapper接口-->
    <bean class="org.mybatis.spring.mapper.MapperScannerConfigurer">
        <property name="basePackage" value="com.tangshijie.repository"></property>
    </bean>
    
</beans>
```

### 编辑config.xml

配置mybatis辅助信息

```xml
<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE configuration PUBLIC "-//mybatis.org//DTD Config 3.0//EN" "http://mybatis.org/dtd/mybatis-3-config.dtd">
<configuration>
    <settings>
        <!-- 打印SQL-->
        <setting name="logImpl" value="STDOUT_LOGGING" />
    </settings>

    <typeAliases>
        <!-- 指定一个包名，MyBatis会在包名下搜索需要的JavaBean-->
        <package name="com.tangshijie.entity"/>
    </typeAliases>

</configuration>
```

### 编辑springmvc.xml

> 如果不需要加入的其他bean中（依赖注入），bean标签可以不用配id属性

```xml
<?xml version="1.0" encoding="UTF-8"?>
<beans xmlns="http://www.springframework.org/schema/beans"
       xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
       xmlns:context="http://www.springframework.org/schema/context"
       xmlns:mvc="http://www.springframework.org/schema/mvc"
       xsi:schemaLocation="http://www.springframework.org/schema/beans http://www.springframework.org/schema/beans/spring-beans-3.0.xsd
        http://www.springframework.org/schema/context http://www.springframework.org/schema/context/spring-context-3.0.xsd
        http://www.springframework.org/schema/mvc http://www.springframework.org/schema/mvc/spring-mvc-3.2.xsd">
<!--    启动注解驱动-->
    <mvc:annotation-driven></mvc:annotation-driven>
    
<!--    扫描业务代码-->
    <context:component-scan base-package="com.tangshijie"></context:component-scan>
    
<!--    配置视图解析器-->
    <bean class="org.springframework.web.servlet.view.InternalResourceViewResolver">
        <property name="prefix" value="/"></property>
        <property name="suffix" value=".jsp"></property>
    </bean>
    
</beans>
```

### 业务代码

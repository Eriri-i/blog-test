# docker常用命令



## 其他常用命令

### 查看元数据

```shell
[root@centos7 ~]# docker inspect -s d
WARNING: --size ignored for image
[
    {
        "Id": "sha256:d1165f2212346b2bab48cb01c1e39ee8ad1be46b87873d9ca7a4e434980a7726",
        "RepoTags": [
            "hello-world:latest"
        ],
        "RepoDigests": [
            "hello-world@sha256:9f6ad537c5132bcce57f7a0a20e317228d382c3cd61edae14650eec68b2b345c"
        ],
        "Parent": "",
        "Comment": "",
        "Created": "2021-03-05T23:25:25.230064203Z",
        "Container": "f5a78ef54769bb8490754e9e063a89f90cc8eee6a6c5a0a72655826e99df116e",
        "ContainerConfig": {
            "Hostname": "f5a78ef54769",
            "Domainname": "",
            "User": "",
            "AttachStdin": false,
            "AttachStdout": false,
            "AttachStderr": false,
            "Tty": false,
            "OpenStdin": false,
            "StdinOnce": false,
            "Env": [
                "PATH=/usr/local/sbin:/usr/local/bin:/usr/sbin:/usr/bin:/sbin:/bin"
            ],
            "Cmd": [
                "/bin/sh",
                "-c",
                "#(nop) ",
                "CMD [\"/hello\"]"
            ],
            "Image": "sha256:77fe0a37fa6ce641a004815f2761a9042618557d253f312cd3da61780e372c8f",
            "Volumes": null,
            "WorkingDir": "",
            "Entrypoint": null,
            "OnBuild": null,
            "Labels": {}
        },
        "DockerVersion": "19.03.12",
        "Author": "",
        "Config": {
            "Hostname": "",
            "Domainname": "",
            "User": "",
            "AttachStdin": false,
            "AttachStdout": false,
            "AttachStderr": false,
            "Tty": false,
            "OpenStdin": false,
            "StdinOnce": false,
            "Env": [
                "PATH=/usr/local/sbin:/usr/local/bin:/usr/sbin:/usr/bin:/sbin:/bin"
            ],
            "Cmd": [
                "/hello"
            ],
            "Image": "sha256:77fe0a37fa6ce641a004815f2761a9042618557d253f312cd3da61780e372c8f",
            "Volumes": null,
            "WorkingDir": "",
            "Entrypoint": null,
            "OnBuild": null,
            "Labels": null
        },
        "Architecture": "amd64",
        "Os": "linux",
        "Size": 13336,
        "VirtualSize": 13336,
        "GraphDriver": {
            "Data": {
                "MergedDir": "/var/lib/docker/overlay2/779f14f2c4ea5e9f46b85fd56aaab2f020a75e9f5d6ab34d0616170384b49c60/merged",
                "UpperDir": "/var/lib/docker/overlay2/779f14f2c4ea5e9f46b85fd56aaab2f020a75e9f5d6ab34d0616170384b49c60/diff",
                "WorkDir": "/var/lib/docker/overlay2/779f14f2c4ea5e9f46b85fd56aaab2f020a75e9f5d6ab34d0616170384b49c60/work"
            },
            "Name": "overlay2"
        },
        "RootFS": {
            "Type": "layers",
            "Layers": [
                "sha256:f22b99068db93900abe17f7f5e09ec775c2826ecfe9db961fea68293744144bd"
            ]
        },
        "Metadata": {
            "LastTagTime": "0001-01-01T00:00:00Z"
        }
    }
]
```

### 查看容器信息

```shell
[root@centos7 ~]# docker container ls --help

Usage:  docker container ls [OPTIONS]

List containers

Aliases:
  ls, ps, list

Options:
  -a, --all             Show all containers (default shows just running)
  -f, --filter filter   Filter output based on conditions provided
      --format string   Pretty-print containers using a Go template
  -n, --last int        Show n last created containers (includes all states) (default -1)
  -l, --latest          Show the latest created container (includes all states)
      --no-trunc        Don't truncate output
  -q, --quiet           Only display container IDs
  -s, --size            Display total file sizes
```

### 找出最近创建的容器并获取它的container ID，通过管道xargs 作为查询容器历史的参数

```shell
[root@centos7 ~]# docker container ls -lq |xargs docker logs -t
[root@50dab31f1449 /]# exit
```

### 进入容器

```shell
# 方式1：exec进入正在运行的容器
[root@centos7 ~]# docker exec --help	#指令说明

Usage:  docker exec [OPTIONS] CONTAINER COMMAND [ARG...]

Run a command in a running container

Options:
  -d, --detach               Detached mode: run command in the background
      --detach-keys string   Override the key sequence for detaching a container
  -e, --env list             Set environment variables
      --env-file list        Read in a file of environment variables
  -i, --interactive          Keep STDIN open even if not attached
      --privileged           Give extended privileges to the command
  -t, --tty                  Allocate a pseudo-TTY
  -u, --user string          Username or UID (format: <name|uid>[:<group|gid>])
  -w, --workdir string       Working directory inside the container

# 例子
[root@centos7 ~]# docker exec -it 50 /bin/bash
[root@50dab31f1449 /]# read escape sequence


# 例子2：通过docker attach 容器id
[root@centos7 ~]# docker attach --help	 #指令说明

Usage:  docker attach [OPTIONS] CONTAINER

Attach local standard input, output, and error streams to a running container

Options:
      --detach-keys string   Override the key sequence for detaching a container
      --no-stdin             Do not attach STDIN
      --sig-proxy            Proxy all received signals to the process (default true)

#例子
[root@centos7 ~]# docker attach 50
[root@50dab31f1449 /]# ls
bin  dev  etc  home  lib  lib64  lost+found  media  mnt  opt  proc  root  run  sbin  srv  sys  tmp  usr  var
```

### 将容器内的文件或目录复制到宿主机/从宿主机复制目录到容器内

```shell
# 指令说明
[root@centos7 ~]# docker cp --help

Usage:  docker cp [OPTIONS] CONTAINER:SRC_PATH DEST_PATH|-
	docker cp [OPTIONS] SRC_PATH|- CONTAINER:DEST_PATH

Copy files/folders between a container and the local filesystem

Use '-' as the source to read a tar archive from stdin
and extract it to a directory destination in a container.
Use '-' as the destination to stream a tar archive of a
container source to stdout.

Options:
  -a, --archive       Archive mode (copy all uid/gid information)
  -L, --follow-link   Always follow symbol link in SRC_PATH
# 从宿主机复制到容器内
[root@centos7 ~]# docker cp ./test/ 50:/usr/local		#复制例子
[root@centos7 ~]# docker exec -it 50 /bin/bash			#进入容器查看
[root@50dab31f1449 /]# cd /usr/local
[root@50dab31f1449 local]# ls
bin  etc  games  include  lib  lib64  libexec  sbin  share  src  test

# 从容器内复制到宿主机
[root@50dab31f1449 local]# mkdir dirFromContainer		#容器内创建目录
[root@50dab31f1449 local]# cd dirFromContainer/			
[root@50dab31f1449 dirFromContainer]# touch test.txt	#容器内创建文件
[root@50dab31f1449 local]# exit							#退出容器
exit
[root@centos7 ~]# docker cp 50:/usr/local/dirFromContainer/ /root/		#从容器内复制到宿主机
[root@centos7 ~]# ls									#查看是否成功
dirFromContainer  test
```

## 小结

![image-20210620183559552](D:/Documents/docker%E5%AD%A6%E4%B9%A0%E7%AC%94%E8%AE%B0/docker%E7%AC%94%E8%AE%B0.assets/image-20210620183559552.png)

## 作业练习

> docker安装nginx

```shell
# hub.docker.com 查看需要的nginx镜像版本
# docker pull nginx
# docker run --name nginx1 -p 3333:80 -d nginx
# curl localhost:3333
```

> docker安装tomcat

```shell
# hub.docker.com 查看需要的tomcat镜像版本
# 运行一次就删除容器:docker run -it --rm tomcat
# docker pull tomcat
# docker run --name tomcat -p 3344:8080 -d tomcat
# curl localhost:3344
# 注意：默认镜像中webapp目录为空，需要自己解压缩内容到webapp
```

> docker安装elasticsearch kibana

```shell
# 对于内存占用较大的镜像，应该限制内存
# 查看docker占用的内存情况：docker stats
# elasticsearch 启动时附带参数，限制使用的内存
docker run -d --name es -p 9200:9200 -p 9300:9300 -e "discovery.type=single-node" -e ES_JAVA_OPTS="-Xms64m -Xmx512m" elasticsearch
```


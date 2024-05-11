---
date: 2024-05-10
category:
  - 技术
tag:
  - docker
---

# docker

## 安装docker
1. 卸载旧版本


```shell
$ sudo yum remove docker \
            docker-client \
            docker-client-latest \
            docker-common \
            docker-latest \
            docker-latest-logrotate \
            docker-logrotate \
            docker-engine
```

2. 安装依赖
   
```shell
$ sudo yum install -y yum-utils \
         device-mapper-persistent-data \
         lvm2
```

3. 设置稳定的仓库
   
```shell
$ sudo yum-config-manager \
      --add-repo \
      https://download.docker.com/linux/centos/docker-ce.repo
```

4. 安装最新版docker
   
```shell
$ sudo yum install docker-ce docker-ce-cli containerd.io
```

## 设置阿里云镜像

[https://cr.console.aliyun.com/cn-hangzhou/instances/mirrors](https://cr.console.aliyun.com/cn-hangzhou/instances/mirrors)



## 安装docker-compose

```shell
# $ sudo curl -L "https://github.com/docker/compose/releases/download/1.25.5/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose

//如果速度太慢可以换成下面的地址执行
#$ curl -L https://get.daocloud.io/docker/compose/releases/download/1.25.5/docker-compose-`uname -s`-`uname -m` > /usr/local/bin/docker-compose


$ curl -SL https://github.com/docker/compose/releases/download/v2.20.3/docker-compose-linux-x86_64 -o /usr/local/bin/docker-compose

$ sudo chmod +x /usr/local/bin/docker-compose

$ sudo ln -s /usr/local/bin/docker-compose /usr/bin/docker-compose
```

## 设置开机服务

```shell
systemctl enable docker.service 
```
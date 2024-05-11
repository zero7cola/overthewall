---
date: 2024-05-10
category:
  - 技术
tag:
  - vm
---

# VM虚拟机

## centos 安装vm tools 

### 

1. 更新yum 源

```shell
https://developer.aliyun.com/mirror/centos?spm=a2c6h.13651102.0.0.3e221b11D06pKo
```

2. 安装

```shell
yum install open-vm-tools -y
```

> 完成之后重新虚拟机

验证是否安装成功，输入命令vmware-直接按tab键，如果自动出现下面的这些命令就表示已经安装成功了

```shell
vmware-checkvm             vmware-hgfsclient          vmware-rpctool             vmware-vgauth-cmd          
vmware-guestproxycerttool  vmware-namespace-cmd       vmware-toolbox-cmd         vmware-xferlogs
```

3. 设置共享宿主机的文件夹

- 右键虚拟机 `设置`->`选项`->`共享文件夹`->`添加`
- 这里会选择一个文件夹，并设置一个名字记住这个名字，这里用 `vm-share` 名称为例，在选择的文件夹下创建一个1.txt的文件
- 执行 `vmhgfs-fuse .host:/vm-share /data/vm-share`  这里的/data/vm-share 请先创建好; 执行之后会在 /data/vm-share 里看到上一步创建的1.txt文件，说明共享成功

但是上面的操作只是临时的，重新启动系统后，共享文件夹就会失效，想要永久生效还需要进行其他的配置

```shell
# 修改配置
vim /etc/rc.local
```


在文件的下面新增以下内容

```shell
# mount shared floder
vmhgfs-fuse .host:/vm-share /data/vm-share

# 加参数
# vmhgfs-fuse .host:/vm-share /data/vm-share -o subtype=vmhgfs-fuse,allow_other
```


/etc/rc.local其实是/etc/rc.d/rc.local的一个软连接，需要保证/etc/rc.d/rc.local具有可执行权限

```shell
# 新增执行权限
chmod +x /etc/rc.d/rc.local
```

可以重启虚拟机验证下，/data/vm-share 下是否还可以看到 1.txt, 能看到说明已经全部设置好了




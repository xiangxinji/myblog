

# 安装docker 


这次主要讲述在linux centos 中安装 docker , 主要还是根据官方网站进行 

[centos install ](https://docs.docker.com/engine/install/centos/)




首先先删除掉之前的版本
```bash
 sudo yum remove docker \
                  docker-client \
                  docker-client-latest \
                  docker-common \
                  docker-latest \
                  docker-latest-logrotate \
                  docker-logrotate \
                  docker-engine
```

然后安装 yum-utils 以及更改他的仓库 

```bash
sudo yum install -y yum-utils

sudo yum-config-manager --add-repo http://mirrors.aliyun.com/docker-ce/linux/centos/docker-ce.repo
```


安装 docker 引擎 

```bash
yum install -y docker-ce docker-ce-cli containerd.io
```

启动后台服务 

```bash
sudo systemctl start docker
```

使用helloword
```bash
docker run hello-world
```


开启镜像加速(在 docker pull 或自动拉取时,使用指定的远程仓库 )

编辑  /etc/docker/daemon.json
```bash
vi /etc/docker/daemon.json
```
为 
```json
{
   "registry-mirrors": [
     "https://registry.docker-cn.com", 
     "https://3laho3y3.mirror.aliyuncs.com", 
     "http://f1361db2.m.daocloud.io"
   ]
}
```
并且进行 service docker restart 重启这个服务 





之后 
创建并运行一个服务 名称叫 s2_mysql 端口映射 : 本地 3306 -> docker 的 3306 中     
mysql 版本为5.5 
```bash
docker run --name s2_mysql -p 3306:3306  -e MYSQL_ROOT_PASSWORD=123456  mysql:5.5
```
 




## 安装docker-compose 
docker-compose 就相当于一组docker命令的集合, 我们可以通过一个配置文件,一次性的将运行配置启动给docker 


**安装**

[官方文档](https://docs.docker.com/compose/install/)

建议直接参考这篇文章 
[解决docker-compose 安装缓慢的问题](https://blog.csdn.net/Qcg0223/article/details/105221767)

改下最新版本号即可 

查看是否安装成功
```bash
   docker-compose -v 
```








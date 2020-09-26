# 使用docker-compose 安装 redis 服务


1. 首先使用docker-compose 需要先开启docker 
```bash
systemctl start docker
```

再编写安装redis 的 docker-compose.yml 配置文件, 让docker-compose 来进行安装
```bash
version : "3"
services :
  redis-server: 
    image: redis
    restart: always
    container_name : redis-container
    ports :
      - 10050:6379 
    volumes:
      - /home/redis-local:/data
    command:  ["redis-server" , "--requirepass" , "123456"]
```


使用 docker-compose -d  进行安装 

----------------

使用docker ps | grep redis 查看容器运行状态 

----------------

使用 docker logs redis-container(容器名称) 进行查看容器日志 

-----------------

测试并且连接 redis 

```bash
docker exec -it redis-container(容器名) /bin/bash
```
```bash
redis-cli --pass 123456
```
测试
```
set name zhangsan 
```

------------------






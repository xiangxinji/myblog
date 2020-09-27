

# 更改默认ssh 端口 



在客户端 ,我们可以使用 ssh 命令来连接一台主机 , windows 使用 cmd 打开终端, 敲入 ssh 命令 即可进行连接 

root: 用户名 

@后方表示: 主机名 

敲入之后会提示,让你输入密码

```bash
ssh root@39.26.100.213 
```



之后我们成功连接之后就可以去更改 ssh 连接的默认端口, 因为更改这个端口的话,可以防止被攻击

:::tip

操作系统的话,还是 centos 

:::







首先修改主机上的 ssh 的配置文件 

```bash
vi /etc/ssh/sshd_config
```

找到Port 字段 , 将默认的 22 端口更改成其他端口(当然10000 以上的最好)  , 我们改成10022  . 

他上方的注释, 表示 如果你更改这个端口, 你需要键入命令 

```bash
semanage port -a -t ssh_port_t -p tcp 
```

:::warning

建议保留22 端口, 测试成功之后再进行注释

:::

```
# If you want to change the port on a SELinux system, you have to tell
# SELinux about this change.
# semanage port -a -t ssh_port_t -p tcp #PORTNUMBER
# Port 22
```







###  向SELinux中添加修改的SSH端口

 先安装SELinux的管理工具 semanage (如果已经安装了就直接到下一步) ：

```bash
yum provides semanage
```

安装运行semanage所需依赖工具包 policycoreutils-python：

```bash
yum -y install policycoreutils-python
```

查询当前 ssh 服务端口：

```bash
semanage port -l | grep ssh
```

向 SELinux 中添加 ssh 端口：

```bash
semanage port -a -t ssh_port_t -p tcp 22345
```

重启 ssh 服务：

```bash
systemctl restart sshd.service
```





:::warning

云服务器请把你的端口加入进安全组 ,并配置安全策略

:::








































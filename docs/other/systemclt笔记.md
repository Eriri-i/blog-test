# systemctl笔记

## 一、由来

最近公司安全管理部门扫描公司服务器，发现由我负责维护的几台服务器有几个安全漏洞，需要在指定时间内修复。我浏览了下公司漏洞扫描报告，发现这些漏洞主要由目前不使用的服务引起的，停掉这些服务就 ok。

由于这些服务是直接安装在 linux 服务的，需要停掉这些服务，就需要用到 linux 的系统工具 ——Systemd。

## 二、解决方式

以要停止 postfix 服务为例。

1. 查看在运行的服务
2. 停止服务
3. 取消守护进程
4. 刷新配置

```bash
[root@centripetal ~]# systemctl | grep running

NetworkManager.service                                                      loaded active running   Network Manager                                                              
polkit.service                                                              loaded active running   Authorization Manager                                                        
postfix.service                                                             loaded active running   Postfix Mail Transport Agent                                                 
systemd-journald.socket                                                     loaded active running   Journal Socket                                                               
systemd-udevd-control.socket                                                loaded active running   udev Control Socket                                                          
systemd-udevd-kernel.socket                                                 loaded active running   udev Kernel Socket 
```

## 三、补充资料

| 对应操作               | 指令                                        |
| :--------------------- | :------------------------------------------ |
| 启动服务               | systemctl start postfix.service              |
| 关闭服务               | systemctl stop postfix.service               |
| 重启服务               | systemctl restart postfix.service            |
| 显示服务的状态         | systemctl status postfix.service             |
| 在开机时启用服务       | systemctl enable postfix.service             |
| 在开机时禁用服务       | systemctl disable postfix.service            |
| 查看服务是否开机启动   | systemctl is-enabled postfix.service         |
| 查看已启动的服务列表   | systemctl list-unit-files &#124; grep enabled |
| 查看启动失败的服务列表 | systemctl --failed                          |

# 问题记录 

## 关于微信支付成功之后自动关闭页面 
在之前使用了微信原生的支付没有问题，但是接入了服务商，导致支付成功之后页面直接被关闭

大致就是该服务商没有加入某个计划吧,官方把这个功能给关闭了, 导致出现这个问题

[微信JSAPI支付，支付成功会把当前的H5页面关闭](https://developers.weixin.qq.com/community/pay/doc/000a60c2038c48ce85fa98f325b800)

[微信：关于对“支付后跳转指定页面”功能升级的通知](https://pay.weixin.qq.com/index.php/public/cms/content_detail?platformType=1&lang=zh&id=121505)

## webpack 编译出现警告 There are multiple modules with names that only differ in casing. 
虽然他是一个警告,是还是比较影响终端查看信息的,因为很多信息都是这个警告信息

在网上看了一些文章,说是大小写的问题,说 import 的时候路径大小写错了,但我仔细检查了一下,并没有错, 那就表示不是这个问题 

然后我看到了我的目录结构, 发现确实是有两种风格 , 如下

src/base-components/RouterLink/Circle.vue 

从上面这个路径看出来确实是有两种风格 , 当我全部更改成 - 分割命名时, 依然还有这个错, 然后我把这个 Circle.vue -> circle.vue 就没有这个问题

[组件编译时出现警告：There are multiple modules with names that only differ in casing](https://blog.csdn.net/Time_is_going/article/details/103404274?utm_medium=distribute.pc_relevant.none-task-blog-BlogCommendFromMachineLearnPai2-1.compare&depth_1-utm_source=distribute.pc_relevant.none-task-blog-BlogCommendFromMachineLearnPai2-1.compare)




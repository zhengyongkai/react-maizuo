# React实现卖座App

> 娱乐项目，请勿当真 ！！！

## 简介

之前在`学习React`的时候，在 `bilibili` 看到 `React` 学习视频，于是马上着手 `React版本的卖座App` 开发

## 技术栈

```js
// 前端
React TypeScript Antd-Mobile Dayjs 3D-selection tailwindcss
// 后端
nestjs(websocket+jwt等)
```

## 接口对接

1.  部分直接调用 `卖座App` 的 `接口`
2.  支付接口自己写的 `nestjs` 后端 , 用的是 `支付宝沙盒`
3.  很小部分用的是 `mock` 的接口

## 部分详情截图

### 选择城市

![在这里插入图片描述](https://img-blog.csdnimg.cn/direct/03126901932041c8b384d72057986c49.jpeg)

### 选择电影

![在这里插入图片描述](https://img-blog.csdnimg.cn/direct/11e9fde9f3c545b3b7de30c4b325038b.png)

### 影院搜索

![在这里插入图片描述](https://img-blog.csdnimg.cn/direct/3e1f1931cf3342139650dfc0baec9e6d.png)

### 登录

![在这里插入图片描述](https://img-blog.csdnimg.cn/direct/89fc50e5d7694c51a1c2078b441d438f.png)
![在这里插入图片描述](https://img-blog.csdnimg.cn/direct/fa2fd9f39f3845ab97ae3f2354ddb91e.png)

### 选择电影

![在这里插入图片描述](https://img-blog.csdnimg.cn/direct/bc8ad3fb486b4100bb97b5553c51d5fe.png)

### 选座

![在这里插入图片描述](https://img-blog.csdnimg.cn/direct/d20e9fe997ed4ab6a3f32f3f63708004.png)

### 提交订单

![在这里插入图片描述](https://img-blog.csdnimg.cn/direct/1122ee8f3b9c42ef81953c5abc2c6cc7.jpeg)

### 支付

![在这里插入图片描述](https://img-blog.csdnimg.cn/direct/bedcf4b6787a4853a04b9d466e0de43a.png)

### 支付成功和出票

![在这里插入图片描述](https://img-blog.csdnimg.cn/direct/399df6769a0942298f9433e77d35825f.png)

### 我的订单

![在这里插入图片描述](https://img-blog.csdnimg.cn/direct/d266a831d00e4ffe87d3af2212e3e5b8.png)

### 优惠卷

![在这里插入图片描述](https://img-blog.csdnimg.cn/direct/a9856e87fdba4f939d1a533df04e4279.png)

### 客服

![在这里插入图片描述](https://img-blog.csdnimg.cn/direct/9b41b7eb0eaa4f898250553ca0fe6c74.png)

## 结尾

1. 大概就这些功能，感觉自己搞了个 `低配版`的 `卖座App`
2. 自己对 `TS` 其实并不太能掌握，可能导致有些混乱，`请见谅`
3. 自己的 `后端水平`, `emmmm`,真不好说，如果我这个`建表`给我大学老师看到估计头都给锤烂 ╮(╯▽╰)╭
4. 用的是 `卖座App的接口`,谢谢 `卖座App` 提供给我这么宝贵的接口供我 `学习`，万分感谢
5. 如果可以的话，可以直接 `folk` 和 `提issue`,`旨在互相学习(*^▽^*)`

## 代码

前端: `https://github.com/zhengyongkai/react-maizuo` <br>
后端 `https://github.com/zhengyongkai/nest-maizuo-backend/tree/master`

## 实现和待实现

- [x] 基础功能
- [x] 选座
- [x] 简单聊天
- [x] 订单转成图片下载
- [x] 支付功能，包括选择优惠券
- [x] 用上 `tailwindcss`
- [ ] 百度地图实现路线规划
- [ ] 余额支付
- [ ] 优化....

## 关于学习

1. 自己封装了少量 `hook` , 以及将自己工作的经验和学习相互转化
2. 将一些工具封装成 `单例模式`
3. 不会用ts类型体操，所以有些`ts类型`比较简单
4. 年后可能再找`工作机会`，希望有大佬可以给一次机会

## 待优化

1. 一些类型声明
2. 一些功能页面拆分

## 线上地址

等我回去更新个最新版本 ==

## 更新

暂无

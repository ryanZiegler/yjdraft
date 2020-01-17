![logo.png](/images/logo.png "太阳花-lowPoly style")

<details>
<summary>展开查看</summary>
太阳花 - lowPoly风格 ~
</details>

[我的一亩三分田](https://iiamego.com)



## 前端学习笔记 FE-Notes

<!-- <details>
<summary>JavaScript基础</summary>
</details>

<details>
<summary>CSS3</summary>
</details>

<details>
<summary>浏览器原理</summary>
</details>

<details>
<summary>计算机原理</summary>
</details>

<details>
<summary>Vue一把梭</summary>
</details>

<details>
<summary>React全家桶</summary>
</details>

<details>
<summary>前端工程化</summary>
</details>

<details>
<summary>性能优化</summary>
</details>

<details>
<summary>数据库</summary>
</details>

<details>
<summary>服务器</summary>
</details>

<details>
<summary>小程序</summary>
</details> -->

### JavaScript基础

- [原生js发请求](/base/ajax.js)
- [手写并发池](/base/concurrent.js)
- [柯里化](/base/curry.js)  
- [深拷贝](/base/deepCopy.js)
- [继承](/base/inherit.js)
- [jsonp请求](/base/jsonp.js)
- [koa简析](/base/koa.js)
- [笛卡尔积](/base/myDescartes.js)
- [call, apply 和 bind](/base/myPoint.js)
- [Promise](/base/myPromise.js)
- [Array.reduce](/base/myReduce.js)
- [手写parseInt](/base/parseInt.js)
- [定时器setTimeout](/base/setTimeout.js)
- [排序](/base/sort.js)
- [防抖/节流](/base/throttle.js)
- [事件总线](/base/vueBus.js)
- [大文件上传](/back/static/index.html)
- [Node多线程(worke_threads)](/back/worker_threads/main.js)
- [简单的VUE双向绑定](/vueStudy/proxy.html)

### 练习 Practice

> 记录一些平时工作,面试,生活中遇到的练习题  
> 更多算法题可以登录 [LeetCode](https://leetcode-cn.com/problemset/all/) 题库进行系统地学习  
> 每天一道大厂面试题 [壹题](https://github.com/Advanced-Frontend/Daily-Interview-Question/issues) - 木易杨   
> 用JavaScript实现的算法和数据结构 [awesome-coding-js](http://www.conardli.top/docs/) - ConardLi  
> [前端该如何准备数据结构和算法？](https://juejin.im/post/5d5b307b5188253da24d3cd1) - 知乎ConardLi  

1. [大数相加](/practice/bigNumber.js)
```
Number.MAX_VALUE
=> 1.7976931348623157e+308

Number.MIN_VALUE
=> 5e-324

计算超出范围的大数相加
```

2. [二叉搜索树](/practice/bst.js)
```
1.生成一颗二叉搜索树,并写出其前序,中序,后序遍历,最大深度
2.输入前序遍历序列 [1,2,4,7,3,5,6,8] 和中序遍历序列 [4,7,2,1,5,3,8,6]，则重建二叉树并返回
3.给定一棵二叉树的前序遍历和中序遍历，求其后序遍历
4.镜像二叉树
5.二叉搜索树找出第k小的节点
```

3. [背包问题-动态规划](/practice/dynamicProgramming.js)
```
有1块、4块、5块的硬币，求总数和为n的最小硬币数
```

4. [斐波那契数列](/practice/fibonacci.js)
```
1.求斐波那契数列第n项
2.减少额外空间开销
```

5. [数组交集](/practice/intersection.js)
```
计算两个数组的交集
输入: [1,1,2,2] [1,2]
输出: [1,2]
```

6. [字符串最长子序列](/practice/maxCount.js)
```
找出字符串中最长子序列
```

7. [二叉树寻址](/practice/pathSum.js)
```
给出一个sum,判断二叉树中是否存在和为sum的头尾路径
```



## 魔法禁书目录

1. [lowPoly 风格](http://www.iiamego.com/animation/canvas/lowPoly/)  
通过Canvas获取图片像素点(边缘检测算法 Sobel 收集亮度大于40的边缘点), delaunay 获取三角坐标,获取三角中心坐标,计算中心点色值,最后绘制三角形
![doggy.png](/images/animation/lowPoly.png "doggy-lowPoly")

2. [灭霸响指](http://www.iiamego.com/animation/canvas/thanos/)  
将图片像素点平均分布到多个Canvas画布上,通过js动画移除 Canvas,营造出粒子灰飞烟灭效果
![thanos.gif](/images/animation/thanos.gif "thanos-animate")

3. [爱, 死亡和机器人（Love,Death&Robots）](http://www.iiamego.com/animation/gsap/LoveDeathRobots/)  
通过gsap创造补间动画,让页面按照设置的时间轴变化动画  
![loveDeathRobots.gif](/images/animation/loveDeathRobots.gif "loveDeathRobots-animate")

4. [3D耐克标](http://www.iiamego.com/animation/threejs/init.html)  
玩玩 ThreeJs, 通过贝塞尔曲线画一个耐克钩子
![nike.png](/images/animation/nike.png "nike-3d")

5. [动态简历](http://www.iiamego.com/resume)  
通过 Vue 制作的动态简历,通过 requestAnimationFrame 优化



## 工具人装备列表


### 一派溪山千古秀
- [ping](http://ping.pe/) ping IP是否可用

### 图画里龙不吟虎不啸
- [github图标](https://github.com/caiyongji/emoji-list) github图标大全
- [iconfont+](https://www.iconfont.cn/) 阿里妈妈MUX倾力打造的矢量图标管理、交流平台。
- [画SVG](http://editor.method.ac/) 在线画图自定义生成svg, 完成后点击网页上的File->save默认保存为svg格式



## 待办

- [ ] 魔法目录页
- [ ] 灭霸响指动画

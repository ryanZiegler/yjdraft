#来自阿汤同学的shell基操

#!/bin/bash
echo ---1---
#第一节介绍注释，转义字符以便书写脚本
echo tip:通过本脚本了解基本shell命令
echo tip:脚本首行#/bin/bash代表调用的解释器
echo tip:以#开头的一行为单行注释
echo tip:通过反斜杠\\对字符转义
echo tip:单引号内不会转义
echo 'tip:以:<<!开头和!结尾的中间跨行内容为多行注释'
:<<!
1.多
2.行
3.注
4.释
!

echo ---2---
#第二节介绍变量赋值和条件语句
echo tip:变量赋值等号两边不能有空格
echo tip:条件表达式的方括号两边都要留一个空格
age=24
if [ $age -lt 18 ]
then
  echo $age:children
elif [ $age -ge 60 ]
then
  echo $age:old
else
  echo $age:adult
fi
#这条判断语句可以写成一行 
age=16
if [ $age -lt 18 ]; then echo $age:children; elif [ $age -ge 60 ]; then echo $age:old; else echo $age:adult; fi

echo ---3---
#第三节介绍数组和循环语句（注意数组获取元素的语法）
echo tip:定义数组用括号表示，元素用空格分割，数组是弱类型的
slogan=("Linux" " Is" " Not" " a" " UniX")
echo slogan:${slogan[*]}
echo slogan size:${#slogan[*]}
#用for-each输出
echo repeat..
for word in ${slogan[*]}
do
  echo $word
done
#用for输出
echo repeat...
for ((i=0;i<${#slogan[*]};i++));
do
  echo ${slogan[$i]}
done

echo ---4---
#第四节介绍运算和比较（注意空格语法）
echo 'tip:运算符: + - * / % = == !='
echo tip:比较符: -eq -ne -lt -le -gt -ge
echo tip:运算符和比较符两边必须留空格
echo tip:原生bash不支持数学运算，可以通过expr命令实现，计算小数需要用bc
echo tip:使用反引号执行命令拿到结果
one=1
two=2
result=`expr $one + $two`
echo The result of $one+$two is $result
pi=3.14
e=2.71
result=`echo "$pi + $e"|bc`
echo The result of pi-e is $result

echo ---5---
#第五节介绍变量类型和脚本参数
echo tip:变量包含1.局部变量2.环境变量3.shell变量
echo 局部变量 e:$e
echo 环境变量 MAIL:$MAIL
echo shell变量 JAVA_HOME:$JAVA_HOME
echo tip:键入执行脚本命令后可跟参数，可以带入脚本
echo 传参个数:$#
echo 参数数组:$* #用$@也可以
echo 第一个参数:$1 #后面的以此类推 
echo 其他变量:1.文件名:$0,2.脚本运行的进程ID:$$,3.脚本的运行选项:$-


echo ---end---

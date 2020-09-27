

# 数据类型 

参考于菜鸟教程 [doc](https://www.runoob.com/redis/redis-tutorial.html)

## String(字符串) 
String(字符串) 类型是 redis 中的最基础数据类型. 
String 类型是二进制安全,意思是redis的String类型可以包含任何数据,如图片和序列化的对象 

String类型的值最大能存储512M 
```
set <key>
get <key>
```

```bash
set version "v1.0.0"
get version #"v1.0.0"
```

## Hash (哈希)
Redis Hash 是一个键值对集合  

Redis Hash 是一个 String 类型的 field -> value 的映射表, Hash特别适合用于存储对象 
```
hmset <key> <field> <value>
```
```bash
hmset datas <field1 field> <"李四" value>
hmset datas <field2 field> <"张三" value>
hget datas field1 #"李四" 
hget datas field2 #"张三"
```

## List(列表)
Redis 列表是简单的字符串列表，按照插入顺序排序。你可以添加一个元素到列表的头部（左边）或者尾部（右边）。
```
lpush <key> <data>
```
```bash
lpush lists <data1 value>
lpush lists <data2 value>
lrange lists 0 2  # 截取list 列表索引
```
列表最多可存储 232 - 1 元素 (4294967295, 每个列表可存储40多亿)。

## Set(集合)
Redis 的 Set 是 string 类型的无序集合。
使用的 sadd 命令 

集合是通过哈希表实现的，所以添加，删除，查找的复杂度都是 O(1)。
```
sadd <key> <member> 
```
```bash
sadd sets redis
sadd sets mongodb
sadd sets rabitmq
smembers sets # redis , mongodb , rabitmq 
```


## Zset(有序集合)
Redis zset 和 set 一样也是string类型元素的集合,且不允许重复的成员。

不同的是每个元素都会**关联一个double类型的分数**。redis正是通过**分数来为集合中的成员进行从小到大的排序**。
zset的成员是唯一的,但分数(score)却可以重复。

```
zadd <keyname> <scope> <value>
```
```bash
zadd stacks 0 redis
zadd stacks 0 mongodb
zadd stacks 0 rabitmq
ZRANGEBYSCORE runoob 0 1000 #redis,mongodb,rabitmq 
```

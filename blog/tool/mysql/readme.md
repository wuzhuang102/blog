# Mysql

## 1. 基本数据库操作
### 1.1 创建/删除/选择 数据库
``` bash
mysql> create database '数据库名';
mysql> drop database '数据库名';
mysql> use database '数据库名';
```

### 1.2 创建  数据表
``` bash
# 创建数据表
mysql> create table book(
    # -> column_name column_type,
    -> book_id int auto_increment primary key not null,
    -> )ENGINE=InnoDB DEFAULT CHARSET=utf8;

#  删除数据表
mysql> drop table book;
```
数据类型
| 类型     | 大小(byte) | 范围 |
|:---------|:-----------|:-----|
| TINYINT  | 1          |      |
| SMALLINT | 2          |      |
| INT      | 4          |      |
| BIGINT   | 8          |      |
| FLOAT    | 4          |      |
| DOUBLE   | 8          |      |
| DECIMAL  |            |      |
日期类型
| 类型     | 大小(byte) | 范围 | 格式                |
|:---------|:-----------|:-----|:--------------------|
| DATE     | 3          |      | YYYY-MM-DD          |
| TIME     | 3          |      | HH:MM:SS            |
| YEAR     | 1          |      | YYYY                |
| DATETIME | 8          |      | YYYY-MM-DD HH:MM:SS |
字符串类型
| 类型    | 大小(byte)      | 用途       |
|:--------|:----------------|:-----------|
| CHAR    | 0-255(2^8-1)    | 定长字符串 |
| VARCHAR | 0-65535(2^16-1) | 变长字符串 |
| TEXT    | 0-65535(2^16-1) | 长文本数据 |
### 1.3 数据插入
``` bash
mysql> insert into book (id,name, author, desc) values (2,'你当像鸟飞往你的山','塔拉','还没看完呢');
```
### 1.4 数据查询
select column_name,column_name from table_name [where clause] [limit n] [offset m];
``` bash
mysql> select * from book;
```
#### where


### 1.5 ALTER命令
ALTER命令是用来修改数据库名和数据字段的
``` bash
# 修改表名
mysql> alter table book rename to book_rename;
# 添加、删除、修改表字段
mysql> alter table book add update_time datetime;
mysql> alter table book drop update_time;
mysql> alter table book modify update_time date;
mysql> alter table book change update_time updateTime date;
# 修改默认值，一般值与时间不一样
mysql> alter table book alter column desc set default '';
mysql> alter table book modify column create_time datetime  default CURRENT_TIMESTAMP;
```
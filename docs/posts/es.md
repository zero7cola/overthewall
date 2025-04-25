---
date: 2024-05-10
category:
  - 技术
tag:
  - es
  - Elasticsearch
  - kibana
---

# Elasticsearch & kibana

## Elasticsearch

### 基本概念
Elasticsearch 本质上是一个数据库，但并不是 MySQL 这种关系型数据库，查询语言也不是 SQL，而是 Elasticsearch 自己的一套查询语言。

既然是数据库，有一些概念是互通的，如下表：

MySQL|Elasticsearch|
:--:|:--:|
表（Table）|索引（Index）
记录（Row）|文档（Document）
字段（Column）|字段（Fields）

### docker安装es
>这里以 es 8.18.0 为例 es-net 名称随意取

```shell
$ docker network create es-net
```

``` shell
mkdir -p /data/es/data /data/es/plugins /data/es/config
chmod -R 777 /data/
```

``` shell
$ docker run -d \
--restart=always \
--name es \
--network es-net \
-p 9200:9200 \
-p 9300:9300 \
--privileged \
-v /home/zero7/data/es/data:/usr/share/elasticsearch/data \
-v /home/zero7/data/es/plugins:/usr/share/elasticsearch/plugins \
-e "discovery.type=single-node" \
-e "ES_JAVA_OPTS=-Xms512m -Xmx512m" \
elasticsearch:8.18.0
```

测试是否安装成功

```shell
$ curl localhost:9200
{
  "name" : "3a6ad1b9945a",
  "cluster_name" : "docker-cluster",
  "cluster_uuid" : "Txe7Fbg2R6amEaxs5Pvf-g",
  "version" : {
    "number" : "8.18.0",
    "build_flavor" : "default",
    "build_type" : "docker",
    "build_hash" : "04e979aa50b657bebd4a0937389308de82c2bdad",
    "build_date" : "2025-04-10T10:09:16.444104780Z",
    "build_snapshot" : false,
    "lucene_version" : "9.12.1",
    "minimum_wire_compatibility_version" : "7.17.0",
    "minimum_index_compatibility_version" : "7.0.0"
  },
  "tagline" : "You Know, for Search"
}
```


### 安装中文分词ik

::: danger
ik 的版本必须与es版本一致
:::

```shell 
//进入容器
$ docker exec -it es /bin/bash
//安装插件
$ bin/elasticsearch-plugin install https://get.infini.cloud/elasticsearch/analysis-ik/8.18.0
//退出容器并重启
$ Ctrl+Q+P
$ docker restart es

```

### 基本使用

1. 创建index
```shell
$ curl -XPUT http://localhost:9200/test_index?pretty
```
2. 创建map
```shell
$ curl -H'Content-Type: application/json' -XPUT http://localhost:9200/test_index/_mapping?pretty -d'{
"properties": {
    "title": { "type": "text", "analyzer": "ik_max_word" }, 
    "description": { "type": "text", "analyzer": "ik_max_word" },
    "price": { "type": "scaled_float", "scaling_factor": 100 }
    }
}'
```

解析：

- 提交数据中的 properties 代表这个索引中各个字段的定义，其中 key 为字段名称，value 是字段的类型定义；
- type 定义了字段的数据类型，常用的有 text / integer / date / boolean，当然还有许多类型，不一一列出。
- analyzer 是一个新的概念，这是告诉 Elasticsearch 应该用什么方式去给这个字段做分词，这里我们用了 ik_max_word ik分词器提供
  

3. 创建_doc
```shell
$ curl -H'Content-Type: application/json' -XPUT http://localhost:9200/test_index/_doc/1?pretty -d'{
    "title": "iPhone X",
    "description": "新品到货",
    "price": 8848
}'
$ curl -H'Content-Type: application/json' -XPUT http://localhost:9200/test_index/_doc/2?pretty -d'{
    "title": "OPPO R15",
    "description": "新品到货",
    "price": 2000
}'
```

4. 读取数据
```shell
$ curl http://localhost:9200/test_index/_doc/1?pretty
```

5. 搜索
```shell
$ curl 'localhost:9200/test_index/_search' //会返回所有记录
```
6. 简单搜索
```shell
$ curl -XPOST -H'Content-Type:application/json' http://localhost:9200/test_index/_doc/_search?pretty -d'
{
    "query" : { "match" : { "description" : "新" }}
}'
```

- 获取所有index
```shell
$ curl 'localhost:9200/_cat/indices?v'
```


- 获取指定index的map
```shell
$ curl 'localhost:9200/index/_mapping?pretty=true'
``` 


- 获取指定index的所有数据
```shell
$ curl 'localhost:9200/index/_search'
``` 
- 获取指定index的单条数据
```shell
$ curl 'localhost:9200/index/_doc/id'
``` 




### 安装 elasticsearch/elasticsearch

```shell
$ composer require elasticsearch/elasticsearch '~7.0'
```
>我们用的是 7.x，因此需使用 ~7.0 来指定包版本

使用

```php
<?php

require 'vendor/autoload.php';

use Elasticsearch\ClientBuilder;

$client = ClientBuilder::create()->build();
```


## Kibana

### docker安装kibana

::: danger
kibana 的版本必须与es版本一致
:::


```shell
$ ifconfig //查出 ip 如:172.170.0.15
$ docker run -d --name kibana --net somenetwork --ip 172.170.0.15  -v /home/docker/kibana/kibana.yml:/usr/share/kibana/config/kibana.yml  -p 5601:5601 kibana:7.7.0
```
>这里的 --net somenetwork 需要与上面 docker network create somenetwork 这一步中的 somenetwork 取值一样

浏览器中访问 x.x.x.x:5601 即可打开页面  x.x.x.x换成你虚拟机的局域网ip

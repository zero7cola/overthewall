---
date: 2025-11-01
category:
  - 技术
tag:
  - api
---


# 接口文档

::: danger 注意！
接口文档返回值统一为json格式，并且一定包含code和msg的值，例如
:::


```json
{"code":0, "msg":"ok"}
```

当code不为0时，代表发生了错误，错误信息会包含在msg中，例如

```json
{"code":1, "msg":"缺少参数"}
```

>除了code和msg字段，还可能存在data字段，data字段用于传递接口的返回结果

例如 `/api/user/get` 接口返回的结果为

```json
{
    "code": 0,
    "msg": "ok",
    "data": {
        "uid": 10,
        "username": "jerry",
        "nickname": "小老鼠",
        "sign": "",
        "avatar": "/static/img/avatar.jpg",
        "state": "offline",
        "logout_timestamp": 0,
        "account_state": "normal",
        "is_friend": true,
        "remark": "备注名"
    }
}
```


### 新增接口


#### 发送短信(注册/忘记密码)

/{web/h5}/service/send_sms


类型：`POST`


参数：

字段|属性|是否必须|说明
:--:|:--:|:--:|:--:
phone|int|是| 手机号码
type|string|是| `register` （注册）;`forget`（忘记密码）

返回：

```json
{
    "code": 0,
    "msg": "ok"
}
```

#### 发送短信(重置密码)

/{web/h5}/user/send_sms_pass


类型：`POST`


参数：

字段|属性|是否必须|说明
:--:|:--:|:--:|:--:
phone|int|是| 手机号码
type|string|是| `retrieve`(重置密码)

返回：

```json
{
    "code": 0,
    "msg": "ok"
}
```


#### 忘记密码

/{web/h5}/service/forget_pass


类型：`POST`


新增参数：

字段|属性|是否必须|说明
:--:|:--:|:--:|:--:
phone|int|是| 手机号码
code|int|是|手机验证码
username|string|是|账号
newpass|string|是|新密码


返回：

```json
{
    "code": 0,
    "msg": "ok"
}
```


#### 注册(非新增)

/api/login/join


类型：`POST`


新增参数：

字段|属性|是否必须|说明
:--:|:--:|:--:|:--:
phone|int|是| 手机号码
code|int|是|手机验证码


返回：

```json
{
    "code": 0,
    "msg": "ok"
}
```




#### 获取临时会话玩家列表

/api/friend/get_temp_list


类型：GET

参数：

- login\_uid 登录者uid

返回：

```json
{
    "code": 0,
    "msg": "ok",
    "data": {
        "M": { // name字段首字母，用来在通讯录中按照首字母排序
            "9": {  // 以用户uid为键
                "uid": 9,
                "avatar": "//pop.com/upload/avatars/9/9/265cea5d13d5b0.jpg",
                "state": "offline",
                "name": "猫猫", // 好友备注或者昵称，如果没有好友备注则是好友昵称
                "initials": "M", // name字段首字母,
            },
            "11": {
                "uid": 11,
                "avatar": "", //pop.com/upload/avatars/10/10/265cea5d13d5b0.jpg",
                "state": "offline",
                "name": "喵星人", 
                "initials": "M",
                }
            }
        "X": { 
            "10": {
                "uid": 10,
                "avatar": "",//pop.com/upload/avatars/10/10/265cea5d13d5b0.jpg",
                "state": "offline",
                "name": "小老鼠", 
                "initials": "X",
                "is_member" 1
                }
            }
        }
          
}
```


#### 删除消息

/api/message/delete

类型：POST

参数：

- login\_uid 当前登录用户uid
- id 接收者id，可能是群组gid，也可能是uid，具体取决于tpye类型
- type 类型，`group`群组消息;`friend`好友消息
- mid 消息id，messsage表的主键
- ty 1单删2全删
  
返回：

```json
{"code":0,"msg":"ok","data":[]}
```

> 会推送 `message_delete` 事件

#### 获取回复消息列表

地址：/api/reply/get

类型：`GET`


返回值：

```json
{
    "code":0, 
    "msg":"ok",
    "data" : {
        "1" : [
            {
                "id" :1,
                "type": 1, //1欢迎语2快捷回复3常见问题
                "title": "jerry",
                "keyword": "小老鼠",
                "content": 7269454, // 数字ID
                "is_show": 1, // 是否会员1是0否
                "weights": 100 ,// 排序越大越靠前
                "is_default":1,// 是否设置成默认
            },
            {
                "id" :2,
                "type": 1, //1欢迎语2快捷回复3常见问题
                "title": "jerry",
                "keyword": "小老鼠",
                "content": 7269454, // 数字ID
                "is_show": 1, // 是否会员1是0否
                "weights": 100 ,// 排序越大越靠前
                "is_default":1,// 是否设置成默认
            }
        ],
        "2" : [
            {
                "id" :3,
                "type": 2, //1欢迎语2快捷回复3常见问题
                "title": "jerry",
                "keyword": "小老鼠",
                "content": 7269454, // 数字ID
                "is_show": 1, // 是否会员1是0否
                "weights": 100 ,// 排序越大越靠前
                "is_default":1,// 是否设置成默认
            }
            ...
        ]
    }
}
```


#### 添加回复消息

地址：/api/reply/add

类型：`POST`

参数：
字段|属性|是否必须|说明
:--:|:--:|:--:|:--:
type|int|是| 1欢迎语2快捷回复3常见问题
title|string|是|type=3时，这里为问题
content|string|是|内容
weights|int|否|排序，越大越靠前
is_default|int|否|是否设置成默认

返回值：

```json
{
    "code":0, 
    "msg":"ok",
}
```



#### 更新回复消息

地址：/api/reply/update

类型：`POST`

参数：
字段|属性|是否必须|说明
:--:|:--:|:--:|:--:
rid|int|是| 对应gei接口里的 `id` 字段
type|int|是| 1欢迎语2快捷回复3常见问题
title|string|是|type=3时，这里为问题
content|string|是|内容
weights|int|否|排序，越大越靠前
is_default|int|否|是否设置成默认

返回值：

```json
{
    "code":0, 
    "msg":"ok",
}
```

#### 删除回复消息

地址：/api/reply/delete

类型：`POST`

参数：
字段|属性|是否必须|说明
:--:|:--:|:--:|:--:
rid|int|是| 

返回值：

```json
{
    "code":0, 
    "msg":"ok"
}
```


#### 添加下级用户(会员专有)

地址：/api/user/open_user

类型：`POST`

参数：
字段|属性|是否必须|说明
:--:|:--:|:--:|:--:
username|string|是|登录名，格式为字母和数字
nickname|string|是|昵称，格式任意
avatar|string|否|头像url地址
password|string|是|密码
sign|string|否|个性签名

返回值：

```json
{
    "code":0, 
    "msg":"ok",
    "data": {
        "uid":13
    }
}
```

>data里的uid字段为系统分配的用户的uid字段





### 回复消息接口

#### 获取回复消息列表

地址：/api/reply/get

类型：`GET`


返回值：

```json
{
    "code":0, 
    "msg":"ok",
    "data" : {
        "1" : [
            {
                "id" :1,
                "type": 1, //1欢迎语2快捷回复3常见问题
                "title": "jerry",
                "keyword": "小老鼠",
                "content": 7269454, // 数字ID
                "is_show": 1, // 是否会员1是0否
                "weights": 100 ,// 排序越大越靠前
                "is_default":1,// 是否设置成默认
            },
            {
                "id" :2,
                "type": 1, //1欢迎语2快捷回复3常见问题
                "title": "jerry",
                "keyword": "小老鼠",
                "content": 7269454, // 数字ID
                "is_show": 1, // 是否会员1是0否
                "weights": 100 ,// 排序越大越靠前
                "is_default":1,// 是否设置成默认
            }
        ],
        "2" : [
            {
                "id" :3,
                "type": 2, //1欢迎语2快捷回复3常见问题
                "title": "jerry",
                "keyword": "小老鼠",
                "content": 7269454, // 数字ID
                "is_show": 1, // 是否会员1是0否
                "weights": 100 ,// 排序越大越靠前
                "is_default":1,// 是否设置成默认
            }
            ...
        ]
    }
}
```


#### 添加回复消息

地址：/api/reply/add

类型：`POST`

参数：
字段|属性|是否必须|说明
:--:|:--:|:--:|:--:
type|int|是| 1欢迎语2快捷回复3常见问题
title|string|是|type=3时，这里为问题
content|string|是|内容
weights|int|否|排序，越大越靠前
is_default|int|否|是否设置成默认

返回值：

```json
{
    "code":0, 
    "msg":"ok",
}
```



#### 更新回复消息

地址：/api/reply/update

类型：`POST`

参数：
字段|属性|是否必须|说明
:--:|:--:|:--:|:--:
rid|int|是| 对应gei接口里的 `id` 字段
type|int|是| 1欢迎语2快捷回复3常见问题
title|string|是|type=3时，这里为问题
content|string|是|内容
weights|int|否|排序，越大越靠前
is_default|int|否|是否设置成默认

返回值：

```json
{
    "code":0, 
    "msg":"ok",
}
```

#### 删除回复消息

地址：/api/reply/delete

类型：`POST`

参数：
字段|属性|是否必须|说明
:--:|:--:|:--:|:--:
rid|int|是| 

返回值：

```json
{
    "code":0, 
    "msg":"ok"
}
```



### 用户接口

#### 添加下级用户(会员专有)

地址：/api/user/open_user

类型：`POST`

参数：
字段|属性|是否必须|说明
:--:|:--:|:--:|:--:
username|string|是|登录名，格式为字母和数字
nickname|string|是|昵称，格式任意
avatar|string|否|头像url地址
password|string|是|密码
sign|string|否|个性签名

返回值：

```json
{
    "code":0, 
    "msg":"ok",
    "data": {
        "uid":13
    }
}
```

>data里的uid字段为系统分配的用户的uid字段




#### 添加用户

地址：/api/user/add

类型：GET

参数：

- username 登录名，格式为字母和数字
- nickname 昵称，格式任意
- avatar 头像url地址
- password 密码
- sign 个性签名，可选参数

返回值：

```json
{
    "code":0, 
    "msg":"ok",
    "data": {
        "uid":13
    }
}
```

>data里的uid字段为系统分配的用户的uid字段

#### 获取单个用户信息

/api/user/get

类型：GET

参数：

- uid 用户uid，可选参数，但是uid和username必须传递其中一个
- username 用户登录名，可选参数，但是uid和username必须传递其中一个
- password 密码，可选参数。当传递password参数时，username参数必须传递
- login\_uid 当前登录用户的uid，当传递这个参数时，返回值会增加is\_friend字段，用来判断是否是好友。以及remark好友备注字段

返回值：

```json
{
    "code": 0,
    "msg": "ok",
    "data": {
        "uid": 10,
        "username": "jerry",
        "nickname": "小老鼠",
        "nid": 7269454, // 数字ID
        "is_member": 1, // 是否会员1是0否
        "sign": "",
        "avatar": "/static/img/avatar.jpg",
        "state": "offline",
        "logout_timestamp": 0,
        "account_state": "normal",
        "is_friend": true,
        "remark": "备注名",
    }
}
```

>其中 `account_state` 为对应用户的账号状态，`normal`为正常，`disabled`为禁用状态。`disabled`状态的用户无法执行加好友、发送消息等操作。

#### 获取多个用户信息

/api/user/multiGet

参数：

- uid，用户uid数组

返回：

```json
{
    "code": 0,
    "msg": "ok",
    "data": [
        {
            "uid": 9,
            "username": "tom",
            "nickname": "猫猫",
            "sign": "大懒猫",
            "avatar": "//pop.com/upload/avatars/9/9/265cea5d13d5b0.jpg",
            "state": "offline",
            "logout_timestamp": 0
        },
        {
            "uid": 10,
            "username": "jerry",
            "nickname": "小老鼠",
            "sign": "",
            "avatar": "/static/img/avatar.jpg",
            "state": "offline",
            "logout_timestamp": 0
        }
    ]
}
```

#### 更新用户信息

api/user/update

类型：POST

参数：

- login\_uid 账户uid
- nickname 昵称字段
- avatar 头像
- sign 个性签名
- account\_state 用户账户状态，`normal`为正常，`disabled`为禁用状态

返回：

```json
{"code":0,"msg":"ok","data":[]}
```

#### 更新用户密码

api/user/updatepassword

类型：POST

参数：

- login\_uid 账户uid
- password1 新密码
- password2 新密码
- password\_old 旧密码
- code 手机验证码

返回：

```json
{"code":0,"msg":"ok","data":[]}
```

### 好友接口

#### 发起好友申请

/api/friend/apply

类型：POST

参数：

- login\_uid 登录者uid
- friend\_uid 对方uid

返回：

```json
{"code":0,"msg":"ok","data":[]}
```

#### 同意好友申请

/api/friend/agree

类型：POST

参数：

- login\_uid 登录者uid
- nid 对应notice表的主键

返回：

```json
{"code":0,"msg":"ok","data":[]}
```

#### 拒绝好友申请

/api/friend/refuse

类型：POST

参数：

- login\_uid 登录者uid
- nid 对应notice表的主键

返回：

```json
{"code":0,"msg":"ok","data":[]}
```

#### 加好友

/api/friend/add

说明：直接将2个账户互相加为好友，并执行推送通知给客户端完成客户端加好友渲染

类型：POST

参数：

- login\_uid 登录者uid
- friend\_uid 对方uid

返回：

```json
{"code":0,"msg":"ok","data":[]}
```

#### 设置好友备注

/api/friend/remark

类型：POST

参数：

- login\_uid 登录者uid
- friend\_uid 好友uid
- remark 备注名

返回：

```json
{"code":0,"msg":"ok","data":[]}
```

#### 获取好友申请列表

/api/friend/applylist

类型：GET

参数：

- login\_uid 登录者uid

返回：

```json
{
    "code": 0,
    "msg": "ok",
    "data": [
        {
            "nid": 102, // notcie表主键id
            "from": 9,  // 发起者uid
            "to": 10,   // 接收者uid，也就是login_uid
            "type": "add_friend", // 加好友类型
            "data": "{\"postscript\":\"这里是加好友的附言\"}", // 加好友的附言信息
            "operation": "not_operated", // 是否操作过，not_operated无操作，refuse拒绝，agree同意
            "timestamp": 1559290158, // 时间戳
            "nickname": "猫猫", // 发起者昵称
            "avatar": "//pop.com/upload/avatars/9/9/265cea5d13d5b0.jpg" // 发起者头像
        }
    ]
}
```

#### 获取好友列表(通讯录)

/api/friend/getlist

类型：GET

参数：

- login\_uid 登录者uid

返回：

```json
{
    "code": 0,
    "msg": "ok",
    "data": {
        "M": { // name字段首字母，用来在通讯录中按照首字母排序
            "9": {  // 以用户uid为键
                "uid": 9,
                "avatar": "//pop.com/upload/avatars/9/9/265cea5d13d5b0.jpg",
                "state": "offline",
                "name": "猫猫", // 好友备注或者昵称，如果没有好友备注则是好友昵称
                "initials": "M", // name字段首字母,
                "is_member" 1
            },
            "11: {
                "uid": 11,
                "avatar": "//pop.com/upload/avatars/10/10/265cea5d13d5b0.jpg",
                "state": "offline",
                "name": "喵星人", 
                "initials": "M",
                "is_member" 1
            }
        },
        "X": { 
            "10: {
                "uid": 10,
                "avatar": "//pop.com/upload/avatars/10/10/265cea5d13d5b0.jpg",
                "state": "offline",
                "name": "小老鼠", 
                "initials": "X",
                "is_member" 1
            }
        }
    }
}
```



#### 获取临时会话玩家列表

/api/friend/get_temp_list


类型：GET

参数：

- login\_uid 登录者uid

返回：

```json
{
    "code": 0,
    "msg": "ok",
    "data": {
        "M": { // name字段首字母，用来在通讯录中按照首字母排序
            "9": {  // 以用户uid为键
                "uid": 9,
                "avatar": "//pop.com/upload/avatars/9/9/265cea5d13d5b0.jpg",
                "state": "offline",
                "name": "猫猫", // 好友备注或者昵称，如果没有好友备注则是好友昵称
                "initials": "M", // name字段首字母,
            },
            "11: {
                "uid": 11,
                "avatar": "//pop.com/upload/avatars/10/10/265cea5d13d5b0.jpg",
                "state": "offline",
                "name": "喵星人", 
                "initials": "M",
            }
        },
        "X": { 
            "10: {
                "uid": 10,
                "avatar": "//pop.com/upload/avatars/10/10/265cea5d13d5b0.jpg",
                "state": "offline",
                "name": "小老鼠", 
                "initials": "X",
                "is_member" 1
            }
        }
    }
}
```

#### 获取未处理好友申请数

/api/friend/applycount

类型：GET

参数：

- login\_uid 登录者uid

返回：

```json
{
    "code": 0,
    "msg": "ok",
    "data": 1
}
```

#### 获取好友申请详情

/api/friend/applydetail

类型：GET

参数：

- login\_uid 登录者uid
- nid notice表主键

返回：

```json
{
    "code": 0,
    "msg": "ok",
    "data": {
        "nid": 101,
        "from": 11,  // 申请者uid
        "to": 9,     // login_uid
        "type": "add_friend", 
        "data": "{\"postscript\":\"\\u6211\\u662fcat\"}", // 附言
        "operation": "agree",
        "timestamp": 1559096934,
        "nickname": "喵喵", // 申请者昵称
        "username": "cat",  // 申请者账户名
        "avatar": "/static/img/avatar.jpg" // 申请者头像
    }
}
```

#### 删除好友

/api/friend/delete

类型：POST

参数：

- login\_uid 登录者uid
- friend\_uid 好友uid

返回：

```json
{"code":0,"msg":"ok","data":[]}
```

#### 更新好友信息

/api/friend/update

类型：POST

参数：

- state 登录者uid
- last\_read\_time 上次读消息时间戳
- unread\_count 更新未读消息数字
- top 是否置顶 0不置顶，1置顶

返回：

```json
{"code":0,"msg":"ok","data":[]}
```

### 群组接口

#### 创建群组

/api/group/create

类型：POST

参数：

- login\_uid 登录者uid
- members 成员uid，数组类型，可选参数

返回：

```json
{
    "code": 0,
    "msg": "ok",
    "data": {
        "gid": "51", // 群组id
        "groupname": "群聊(猫猫)", // 群组名称
        "avatar": "/h5/group/avatar?uid=9" // 群组头像
    }
}
```

#### 删除群组

/api/group/delete

类型：POST

参数：

- login\_uid 登录者uid
- gid 群id

返回：

```json
{"code":0,"msg":"ok","data":[]}
```

#### 邀请人加入群

/api/group/memberadd

类型：POST

参数：

- login\_uid 登录者uid
- gid 群id
- members 成员uid，数组类型

返回：

```json
{"code":0,"msg":"ok","data":[]}
```

#### 加入群组

/api/group/join

说明：主要给给二维码直接加群使用

类型：POST

参数：

- login\_uid 登录者uid
- gid 群id

返回：

```json
{"code":0,"msg":"ok","data":[]}
```

#### 获得群成员

/api/group/members

类型：GET

参数：

- login\_uid 登录者uid
- gid 群id
- limit 一次获取多少条
- index 从哪个主键开始查找，主键为group\_member表的主键

返回：

```json
{
    "code": 0,
    "msg": "ok",
    "data": {
        "9": {
            "uid": 9,
            "avatar": "\/\/pop.com\/upload\/avatars\/9\/9\/145d037918a6a6.jpg",
            "nickname": "猫猫",
            "name": "猫猫",
            "index": 140
        },
        "10": {
            "uid": 10,
            "avatar": "\/\/pop.com\/upload\/avatars\/10\/10\/055cf77102c0a5.jpg",
            "nickname": "小老鼠",
            "name": "小老鼠",
            "index": 160
        },
        "11": {
            "uid": 11,
            "avatar": "\/\/pop.com\/upload\/avatars\/11\/11\/055cf7705898a8.jpg",
            "nickname": "喵喵",
            "name": "喵喵",
            "index": 142
        },
        "13": {
            "uid": 13,
            "avatar": "\/\/pop.com\/upload\/avatars\/13\/13\/055cf77d3e8d4a.jpg",
            "nickname": "新萌",
            "name": "新萌-备注",
            "index": 144
        },
        "14": {
            "uid": 14,
            "avatar": "\/\/pop.com\/upload\/avatars\/14\/14\/055cf77f281840.jpg",
            "nickname": "车神",
            "name": "车神",
            "index": 141
        },
        "15": {
            "uid": 15,
            "avatar": "\/\/pop.com\/upload\/avatars\/15\/15\/065cf8b10645b5.jpg",
            "nickname": "泡泡",
            "name": "泡泡",
            "index": 145
        },
        "16": {
            "uid": 16,
            "avatar": "\/\/pop.com\/upload\/avatars\/16\/16\/065cf8b30ad06e.jpg",
            "nickname": "小美",
            "name": "小美",
            "index": 146
        },
        "17": {
            "uid": 17,
            "avatar": "\/\/pop.com\/upload\/avatars\/17\/17\/065cf8bc84d542.jpeg",
            "nickname": "念初",
            "name": "念初",
            "index": 147
        },
        "19": {
            "uid": 19,
            "avatar": "\/\/pop.com\/upload\/avatars\/19\/19\/065cf8ba10f9d2.jpg",
            "nickname": "沫沫",
            "name": "沫沫",
            "index": 148
        }
    }
}
```

#### 删除群成员

/api/group/memberdel

只有login\_uid是对应群的创建者才能删除群成员

类型：POST

参数：

- login\_uid 登录者uid
- gid 群id
- members 成员uid，数组类型

返回：

```json
{"code":0,"msg":"ok","data":[]}
```

#### 群组详情

/api/group/detail

类型：GET

参数：

- login\_uid 登录者uid
- gid 群id
- simple 0 返回详细信息，包括members群成员；1 返回简略信息，不包括members信息
- at 0 不返回@信息；1返回@信息

返回：

```json
{
    "code": 0,
    "msg": "ok",
    "data": {
        "info": {
            "gid": 50,
            "uid": 9,
            "avatar": "/h5/group/avatar?uid=9,10,11",
            "state": "normal",
            "timestamp": 1559034094,
            "remark": "群聊(猫猫,小老鼠)"
        },
        "members": {
            "9": {
                "uid": 9,
                "avatar": "//pop.com/upload/avatars/9/9/265cea5d13d5b0.jpg",
                "nickname": "猫猫",
                "remark": "群组备注"
            },
            "10": {
                "uid": 10,
                "avatar": "/static/img/avatar.jpg",
                "nickname": "小老鼠",
                "remark": "群组备注"
            },
            "11": {
                "uid": 11,
                "avatar": "/static/img/avatar.jpg",
                "nickname": "喵喵",
                "remark": "群组备注"
            }
        }
    }
}
```

注意：members为群成员，最多获取15个群成员数据

#### 设置群组备注

/api/group/remark

类型：POST

参数：

- login\_uid 登录者uid
- gid 群id
- remark 备注信息

返回：

```json
{"code":0,"msg":"ok","data":[]}
```

#### 设置或取消管理员

/api/group/manager

类型：POST

参数：

- login\_uid 登录者uid
- uid 用户uid
- gid 群id
- value 0 取消管理员，1设置为管理员

返回：

```json
{"code":0,"msg":"ok","data":[]}
```

#### 判断是否是管理员

/api/group/ismanager

类型：POST

参数：

- login\_uid 登录者uid
- uid 用户uid
- gid 群id

返回：

```json
{"code":0,"msg":"ok","data":["is_manager": 0]}
```

is\_manager为1时是管理员，为0时不是管理员

#### 禁言群里的某个用户

/api/group/forbiddenuser

类型：POST

参数：

- login\_uid 登录者uid
- gid 群id
- uid 备注信息
- time 解除禁言的时间戳。传0的话就是立刻解除禁言；传 当前时间戳+60 则禁言1分钟

返回：

```json
{"code":0,"msg":"ok","data":[]}
```

#### 全体禁言

/api/group/forbiddenall

类型：POST

参数：

- login\_uid 登录者uid
- gid 群id
- value 1 全体禁言；0 解除全体禁言

返回：

```json
{"code":0,"msg":"ok","data":[]}
```

#### 退出群组

/api/group/leave

类型：POST

参数：

- login\_uid 登录者uid
- gid 群id

返回：

```json
{"code":0,"msg":"ok","data":[]}
```

#### 更新用户对应群组信息

/api/group/memberupdate

类型：POST

参数：

- login\_uid 登录者uid
- gid 群id
- state 当前用户的群组状态，如果为`chatting`，则聊天会显示在消息列表中，如果是`hidden`则不会显示在消息列表中
- last\_read\_time 上一次阅读消息的时间，结合message表中的timestamp能计算出该群组哪些消息未读
    
    state 和 last\_read\_time都是可选的，但是两项不能同时为空
    

返回：

```json
{"code":0,"msg":"ok","data":[]}
```

### 消息接口

#### 发送消息

/api/message/send

类型：POST

参数：

- login\_uid 当前登录用户uid
- to 接收者id，可能是群组gid，也可能是uid，具体取决于tpye类型
- type 类型，`group`群组消息;`friend`好友消息
- content 消息内容
- quote_mid 引用的消息ID ，没有可以不传

content特殊消息格式

- 1、表情格式：`[表情X]`，X为数字，从0到100
- 2、图片格式：`![](图片url)`
- 3、文件格式：`file[文件名\t大小](文件url下载地址)`
- 4、语音格式：`voice(语音url)`
- 5、连接格式：`[显示字符](url地址)`

返回：

```json
{"code":0,"msg":"ok","data":[]}
```

#### 获得消息历史记录

/api/message/get

类型：GET

参数：

- login\_uid 当前登录用户uid
- id 可能是群组gid，也可能是uid，具体取决于tpye类型
- type 类型，`group`群组消息;`friend`好友消息
- limit 获取多少条。可选参数
- mid message主键id，查找小于mid的记录，用于分页展示。可选参数

返回：

```json
{
    "code": 0,
    "msg": "ok",
    "data": [
        {
            "mid": 842, // message表主键
            "from": "9", // 消息发送者uid
            "avatar": "//pop.com/upload/avatars/9/9/265cea5d13d5b0.jpg",
            "timestamp": 1559031383,
            "content": "我通过了你的好友请求，我们来聊天吧",
            "sub_type": "message", // 消息子类型，message为正常消息，notice为系统消息
            "quote_mid": 845, // 引用的message id
            "quote_content": "xxxxxxxxxxx", // 引用的消息内容
        },
        {
            "mid": 845,
            "from": "9",
            "avatar": "//pop.com/upload/avatars/9/9/265cea5d13d5b0.jpg",
            "timestamp": 1559032013,
            "content": "你好",
            "sub_type": "message",
            "quote_mid": 845,
            "quote_content": "xxxxxxxxxxx", // 引用的消息内容
        }
    ]
}
```

#### 撤回消息

/api/message/revoke

类型：POST

参数：

- login\_uid 当前登录用户uid
- id 接收者id，可能是群组gid，也可能是uid，具体取决于tpye类型
- type 类型，`group`群组消息;`friend`好友消息
- mid 消息id，messsage表的主键

返回：

```json
{"code":0,"msg":"ok","data":[]}
```


#### 删除消息

/api/message/delete

类型：POST

参数：

- login\_uid 当前登录用户uid
- id 接收者id，可能是群组gid，也可能是uid，具体取决于tpye类型
- type 类型，`group`群组消息;`friend`好友消息
- mid 消息id，messsage表的主键
- ty 1单删2全删
返回：

```json
{"code":0,"msg":"ok","data":[]}
```

#### 获得与某用户/群的未读消息数

/api/message/unreadcount

类型：GET

参数：

- login\_uid 当前登录用户uid
- id 接收者id，可能是群组gid，也可能是uid，具体取决于tpye类型
- type 类型，`group`群组消息;`friend`好友消息

返回：

```json
{"code":0,"msg":"ok","data":"未读消息数"}
```

#### 更新消息最后读取时间

/api/message/updateLastReadTime

说明：用来记录哪些消息已读

类型：POST

参数：

- login\_uid 当前登录用户uid
- id 接收者id，可能是群组gid，也可能是uid，具体取决于tpye类型
- type 类型，`group`群组消息;`friend`好友消息

返回：

```json
{"code":0,"msg":"ok","data":[]}
```

### 上传

#### 上传头像

/api/upload/avatar

类型：POST

参数：

- login\_uid 当前登录用户uid
- file 文件数据

返回：

```json
{
    "code": 0, 
    "msg": "ok", 
    "data": {
        "src": "//p.com/upload/avatars/7/7/30608bd8e4d09d.png", 
        "name": "文件名.png", 
        "size": "7.15 KB"
    }
}
```

#### 上传图片

/api/upload/img

类型：POST

参数：

- file 文件数据

返回：

```json
{
    "code": 0, 
    "msg": "ok", 
    "data": {
        "src": "//p.com/upload/images/202104/30608bd9666e76.png", 
        "name": "文件名.png", 
        "size": "7.15 KB"
    }
}
```

注意：上传图片不需要传递login\_uid

#### 上传文件

/api/upload/file

类型：POST

参数：

- file 文件数据

返回：

```json
{
    "code": 0, 
    "msg": "ok", 
    "data": {
        "src": "//p.com/upload/files/202104/30608bd9f444b2.png", 
        "name": "文件名.png", 
        "size": "7.15 KB"
    }
}
```

注意：上传文件不需要传递login\_uid

### 二维码

#### 根据内容生成二维码

/api/qrcode/get

类型：GET

参数：

- content 二维码内容

返回：二维码图片流

### 聚合接口

#### 获取当前登录用户的主页信息

/api/pop/get

包括当前登录者信息、消息列表、通讯录数据、群组数据

类型：GET

参数：

- login\_uid

返回：

```json
{
    "code": 0,
    "msg": "ok",
    "data": {
        "mine": { // 当前登录者信息
            "uid": 9, // uid
            "username": "tom",  // 登录账号
            "sign": "大懒猫",  // 个性签名
            "nickname": "猫猫", // 昵称
            "avatar": "//pop.com/upload/avatars/9/9/265cea5d13d5b0.jpg", // 头像
            "unread_friend_apply_count": 0 // 未操作好友申请记录数
        },
        "friend": { // 通讯录数据
            "M": {  // 名称首字母
                "11": { // 以好友uid为键
                    "uid": 11, // 好友uid
                    "avatar": "/static/img/avatar.jpg", // 头像
                    "state": "offline", // 是否在线， online为在线
                    "name": "喵喵",  // 名称，备注或者昵称呢
                    "initials": "M" // 名称首字母
                }
            },
            "X": {
                "10": {
                    "uid": 10,
                    "avatar": "/static/img/avatar.jpg",
                    "state": "offline",
                    "name": "小老鼠",
                    "initials": "X"
                }
            }
        },
        "group": [ // 群组信息
            {
                "gid": 50, // 群组id
                "avatar": "/h5/group/avatar?uid=9,10,11", // 群组头像
                "name": "群聊(猫猫,小老鼠)" // 群组名称
            },
            {
                "gid": 51,
                "avatar": "/h5/group/avatar?uid=9",
                "name": "群聊(猫猫)"
            }
        ],
        "chatting": { // 消息列表数据
            "friend10": { // 格式为 'friend'+uid 或者 'group'+gid
                "type": "friend", // 类型， friend或者group
                "id": 10, // 好友id或者群组id，取决于 type
                "avatar": "/static/img/avatar.jpg", // 好友或者群组头像
                "name": "小老鼠", // 名称，优先显示备注
                "unread_count": 0, // 未读消息数量
                "items": [ // 最后一条消息
                    {
                        "mid": 845,
                        "from": "9",
                        "to": "10",
                        "content": "我通过了你的好友请求，我们来聊天吧",
                        "timestamp": 1559032013,
                        "sub_type": "message",
                        "avatar": "//pop.com/upload/avatars/9/9/265cea5d13d5b0.jpg"
                    }
                ]
            },
            "friend11": {
                "type": "friend",
                "id": 11,
                "avatar": "/static/img/avatar.jpg",
                "name": "喵喵",
                "unread_count": 0,
                "items": [
                    {
                        "mid": 890,
                        "from": "9",
                        "to": "11",
                        "content": "file[wx.png|13.48 KB](//pop.com/upload/files/201905/315cf104b5cac8.png)",
                        "timestamp": 1559299253,
                        "sub_type": "message",
                        "avatar": "//pop.com/upload/avatars/9/9/265cea5d13d5b0.jpg"
                    }
                ]
            },
            "group50": {
                "type": "group",
                "id": 50,
                "url": "/pop/group/chat/50",
                "avatar": "/h5/group/avatar?uid=9,10,11",
                "name": "群聊(猫猫,小老鼠)",
                "unread_count": 0,
                "key": "group-50",
                "items": [
                    {
                        "mid": 883,
                        "from": "11",
                        "to": "50",
                        "content": "pdf",
                        "sub_type": "message",
                        "timestamp": 1559036471,
                        "avatar": "/static/img/avatar.jpg",
                        "name": "喵喵"
                    }
                ]
            },
            "group51": {
                "type": "group",
                "id": 51,
                "url": "/pop/group/chat/51",
                "avatar": "/h5/group/avatar?uid=9",
                "name": "群聊(猫猫)",
                "key": "group-51",
                "items": []
            }
        },
        "setting": {
            "id": 2,
            "voice": "on", // 是否开启语音发送
            "audio": "off", // 是否开启实时语音，目前暂时未实现
            "video": "off", // 是否开启实时视频，目前暂时未实现
            "prompt_tone": "on", // 是否开启提示音
            "group_chat": "on", // 是否开启群聊
            "private_chat": "on", // 是否开启私聊
            "add_friend": "on",  // 是否开启加好友
            "create_group": "on", // 是否开启创建群组
            "upload_file": "on", // 是否开启上传文件
            "upload_img": "on", // 是否开启上传图片
            "emoji": "on",  // 是否开启表情
            "dirty_words": "", // 脏字过滤
            "stranger_chat": "on", // 是否允许陌生人聊天
            "appkey": "063a5f0aca64b1ba87c776b8f8343c1c", // websocket推送appkey
            "ws_address": "ws://pop.com:6060" // websocket地址
        }
    }
}
```

#### 删除对话

/api/pop/delchat

类型：POST

参数：

- login\_uid 当前登录用户uid
- id 接收者id，可能是群组gid，也可能是uid，具体取决于tpye类型
- type 类型，`group`群组消息;`friend`好友消息

返回：

```json
{"code":0,"msg":"ok","data":[]}
```

#### 获取系统配置

/api/pop/getsetting

类型：GET

参数：无

返回：

```json
{
    "code": 0, 
    "msg": "ok", 
    "data": {
        "id": "2", 
        "voice": "on", 
        "audio": "off", 
        "video": "off", 
        "prompt_tone": "on", 
        "group_chat": "on", 
        "private_chat": "on", 
        "add_friend": "on", 
        "create_group": "on", 
        "upload_file": "on", 
        "upload_img": "on", 
        "emoji": "on", 
        "member_detail": "on", 
        "stranger_chat": "on", 
        "appkey": "id28hdzhfus8sjk20104dka", 
        "ws_address": "wss://你的域名.com/ws", 
        "app_name": "泡泡IM", 
        "register": "on", 
        "register_captcha": "off", 
        "login_captcha": "off", 
        "explore_url": "https://m.baidu.com", 
        "qrcode_friend": "on", 
        "qrcode_group": "on", 
        "qrcode_scan": "on"
    }
}
```
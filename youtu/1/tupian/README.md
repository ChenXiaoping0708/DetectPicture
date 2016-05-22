# TencentYoutuyun-person-face-service

php sdk for [腾讯云智能优图服务](http://www.qcloud.com/product/fr.html) & [腾讯优图开放平台](http://open.youtu.qq.com)

## 安装（直接下载源码集成）


从github下载源码装入到您的程序中，并加载include.php

## 名词

- `AppId` 平台添加应用后分配的AppId
- `SecretId` 平台添加应用后分配的SecretId
- `SecretKey` 平台添加应用后分配的SecretKey
- `签名` 接口鉴权凭证，由`AppId`、`SecretId`、`SecretKey`等生成，详见<http://open.youtu.qq.com/welcome/authentication>

## 使用示例

```
// 引入SDK
require('./include.php');
use TencentYoutuyun\Youtu;
use TencentYoutuyun\Conf;
use TencentYoutuyun\Auth;

// 设置APP 鉴权信息
$appid='your appid';
$secretId='your secretId ';
$secretKey='your secretKey';
$userid='your qq';

//根据你使用的平台选择一种初始化方式
//优图开放平台初始化
Conf::setAppInfo($appid, $secretId, $secretKey, $userid,conf::API_YOUTU_END_POINT);
//腾讯云初始化
Conf::setAppInfo($appid, $secretId, $secretKey, $userid,conf::API_TENCENTYUN_END_POINT);

//人脸检测接口调用
$uploadRet = YouTu::detectface('test.jpg', 1);
var_dump($uploadRet);
```


### `鉴权`

接口调用时 计算签名鉴权相关逻辑。

#### `Auth::appSign($expired, $userid)`

获取签名，依赖`conf`中的配置项。

- 参数
    - `expired` 过期时间，UNIX时间戳, 计算的签名在过期时间之前有效.
    - `userid` 业务中的用户标识，填写用户QQ号即可
- 返回值： 签名

#### 其它

- `auth.AUTH_PARAMS_ERROR` 参数错误常量（-1）
- `auth.AUTH_SECRET_ID_KEY_ERROR` 密钥ID或者密钥KEY错误常量（-2）

### `SDK API介绍`

优图相关API封装，均为同步函数。


#### `YouTu::detectface($image_path, $isbigface)`
#### `YouTu::detectfaceurl($url, $isbigface)`

人脸检测，检测给定图片(Image)中的所有人脸(Face)的位置和相应的面部属性。位置包括(x, y, w, h)，面部属性包括性别(gender)、年龄(age)
表情(expression)、眼镜(glass)和姿态(pitch，roll，yaw)。

- 参数
	- `$image_path` 待检测图片路径
	- `$url` 待检测图片的url
	- `$isbigface` 是否大脸模式 ０表示检测所有人脸， 1表示只检测照片最大人脸　适合单人照模式

- 返回值
	- 返回的结果，JSON字符串，字段参见API文档


#### `YouTu::faceshape($image_path, $isbigface)`
#### `YouTu::faceshapeurl($url, $isbigface)`

人脸定位，检测给定图片中人脸的五官。对请求图片进行人脸配准，计算构成人脸轮廓的88个点，
包括眉毛（左右各8点）、眼睛（左右各8点）、鼻子（13点）、嘴巴（22点）、脸型轮廓（21点）

- 参数
	- `$image_path` 待检测图片路径
	- `$url` 待检测图片的url
	- `$isbigface` 是否大脸模式 ０表示检测所有人脸， 1表示只检测照片最大人脸　适合单人照模式
- 返回值
	- 返回的结果，JSON字符串，字段参见API文档


#### `YouTu::facecompare($image_path_a, $image_path_b)`
#### `YouTu::facecompareurl($urlA, $urlB)`

人脸对比，计算两个Face的相似性以及五官相似度。

- 参数
	- `$image_path_a` 第一张待检测图片路径
	- `$image_path_b` 第二张待检测图片路径
	- `$urlA` 第一张图片url
	- `$urlB` 第二张图片url
- 返回值
	- 返回的结果，JSON字符串，字段参见API文档

#### `YouTu::faceverify($image_path, $person_id)`
#### `YouTu::faceverifyurl($url,$person_id)`

人脸验证，给定一个Face和一个Person，返回是否是同一个人的判断以及置信度。

- 参数
	- `$image_path` 待检测图片路径
	- `$url` 待检测图片的url
	- `$person_id` 待验证的Person
- 返回值
	- 返回的结果，JSON字符串，字段参见API文档

#### `YouTu::faceidentify($image_path, $group_id)`
#### `YouTu::faceidentifyurl($url,$group_id)`
人脸识别，对于一个待识别的人脸图片，在一个Group中识别出最相似的Top5 Person作为其身份返回，返回的Top5中按照相似度从大到小排列。

- 参数
	- `$image_path` 待检测图片路径
	- `$url` 待检测图片的url
	- `$group_id` 需要识别的人 所在的组
- 返回值
	- 返回的结果，JSON字符串，字段参见API文档

#### `YouTu::newperson($image_path, $person_id, array $group_ids, $person_name="", $person_tag="")`
#### `YouTu::newpersonurl($url, $person_id, array $group_ids, $person_name="", $person_tag="")`

个体创建，创建一个Person，并将Person放置到$group_ids指定的组当中。

- 参数
	- `$image_path` 待检测图片路径
	- `$url` 待检测图片的url
	- `$person_id` 个体id
	- `$person_name` 个体的名字
	- `$group_ids` 要加入的组的列表（数组）
	- `$person_name` 个体名称
	- `$person_tag` 备注信息，用户自解释字段
- 返回值
	- 返回的结果，JSON字符串，字段参见API文档

#### `YouTu::delperson($person_id)`

删除一个Person

- 参数
	- `$person_id` 个体Person
- 返回值
	- 返回的结果，JSON字符串，字段参见API文档


#### `YouTu::addface($person_id, $images, $facetag)`
#### `YouTu::addfaceurl($person_id, $url_arr, $facetag="")`

添加人脸，在创建一个Person后， 增加person下面的人脸, 可以用于后面的比对。

- 参数
	- `$person_id` 个体Person
	- `$images` 待检测图片路径(数组)
	- `$url_arr` 图片url(数组)
	- `$facetag` 人脸自定义标签
- 返回值
	- 返回的结果，JSON字符串，字段参见API文档


#### `YouTu::delface($person_id, $face_ids)`

删除人脸，删除一个person下的face，包括特征，属性和face_id。

- 参数
	- `$person_id` 个体Person
	- `$face_ids` 要删除的faceId列表（数组）
- 返回值
	- 返回的结果，JSON字符串，字段参见API文档

#### `YouTu::setinfo($person_name, $person_id, $tag)`

设置Person的信息

- 参数
	- `$person_name` 个体Person的name
	- `$person_id` 个体Person
	- `$tag` 个体Person的tag, 用户自解释字段
- 返回值
	- 返回的结果，JSON字符串，字段参见API文档

#### `YouTu::getinfo($person_id)`

获取一个Person的信息，包括name、id、$tag、相关的face以及groups等信息。

- 参数
	- `$person_id` 个体Person
- 返回值
	- 返回的结果，JSON字符串，字段参见API文档

#### `YouTu::getgroupids()`

获取一个AppId下所有group列表

- 返回值
	- 返回的结果，JSON字符串，字段参见API文档

#### `YouTu::getpersonIds($group_id)`

获取一个组Group中所有person列表

- 参数
	- `$group_id` 组
- 返回值
	- 返回的结果，JSON字符串，字段参见API文档

#### `YouTu::getfaceIds($person_id)`

获取一个组person中所有face列表

- 参数
	- `$person_id` 个体Person
- 返回值
	- 返回的结果，JSON字符串，字段参见API文档

#### `YouTu::getfaceinfo($face_id)`

获取一个face的相关特征信息

- 参数
	- `$face_id` 需要获取的faceid
- 返回值
	- 返回的结果，JSON字符串，字段参见API文档

#### `YouTu::fuzzydetect($image_path)`
#### `YouTu::fuzzydetecturl($url)`

判断一个图像的模糊程度

- 参数
	- `$image_path` 待检测图片路径
	- `$url` 待检测图片的url
- 返回值
	- 返回的结果，JSON字符串，字段参见API文档

#### `YouTu::fooddetect($image_path)`
#### `YouTu::fooddetecturl($url)`

识别一个图像是否为美食图像

- 参数
	- `$image_path` 待检测图片路径
	- `$url` 待检测图片的url
- 返回值
	- 返回的结果，JSON字符串，字段参见API文档

#### `YouTu::imagetag($image_path)`
#### `YouTu::imagetagurl($url)`

识别一个图像的标签信息,对图像分类

- 参数
	- `$image_path` 待检测图片路径
	- `$url` 待检测图片的url
- 返回值
	- 返回的结果，JSON字符串，字段参见API文档
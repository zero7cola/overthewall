---
date: 2025-11-03
category:
  - 技术
tag:
  - wechatpay
  - 微信支付
  - 支付
---

# 微信支付流程

## 总流程

- 在 [微信商户平台](https://pay.weixin.qq.com/index.php/core/home/login?return_url=%2F),注册、登录；
- 在 `产品中心` 申请开通需要的支付

> `native支付` 就是扫码支付

<!-- ![](../.vuepress/public/pay/vx_payment.png) -->


## 代码

### 所使用的第三方包

``` 
"overtrue/wechat": "~4.0",
```


### H5支付


```php
$this->wechat_configs = [
    // 必要配置
    'app_id' => 'wx61d01cbcxxxxxxxxx',
    'mch_id' => '1626xxxxxxx',
    //'key'                => '812219e4662b9a272f8262b146d6252b',   // API v2 密钥 (注意: 是v2密钥 是v2密钥 是v2密钥)
    'key' => 'asdiohsdhiadhad2xxxxxxxxxxx',

    // 如需使用敏感接口（如退款、发送红包等）需要配置 API 证书路径(登录商户平台下载 API 证书)
    'cert_path' => '/www/wwwroot/net/xxxxx/ssh/im_apiclient_cert.pem', // XXX: 绝对路径！！！！
    'key_path' => '/www/wwwroot/net/xxxxxx/ssh/im_apiclient_key.pem',      // XXX: 绝对路径！！！！

    'notify_url' => 'https://tuisong.xxxxx.com/api/pay/wechat_notify',     // 你也可以在下单时单独设置来想覆盖它
];


$config = $this->wechat_configs;
$app = Factory::payment($config);

$attributes = [
    'trade_type' => 'MWEB', // h5支付 // JSAPI，NATIVE，APP...
    'body' => $product['name'],
    'detail' => $product['desc'] ?: $product['name'],
    'out_trade_no' => $bill_no,
    'total_fee' => $product['price'] * 100, // 单位：分
    'notify_url' => 'https://tuisong.zhanim.com/api/pay/wechat_notify', // 支付结果通知网址，如果不设置则会使用配置里的默认地址
    //'openid'           => '当前用户的 openid', // trade_type=JSAPI，此参数必传，用户在商户appid下的唯一标识，
    // ...
];

// H5支付 下单返回
/**
 * appid: "wx61d01cbce12ff068"
 * mch_id: "1626800916"
 * mweb_url: "https://wx.tenpay.com/cgi-bin/mmpayweb-bin/checkmweb?prepay_id=wx300732138415085404c91b85975f2b0000&package=1472621727"
 * nonce_str: "Dw72JY9cHukDPUNT"
 * prepay_id: "wx300732138415085404c91b85975f2b0000"
 * result_code: "SUCCESS"
 * return_code: "SUCCESS"
 * return_msg: "OK"
 * sign: "69C61891D8638240FFD3242BFDB81483"
 * trade_type: "MWEB"
 */
$result = $app->order->unify($attributes);


if ($result['return_code'] == 'SUCCESS' && $result['result_code'] == 'SUCCESS') {

    // 支付成功，处理业务逻辑；将返回的 `mweb_url` 返回给前端，做跳转,前端可以拼接 成功后需跳转的url  &redirect_url=https://www.xxx.com

   
} else {
    // 支付失败
}

```


### 扫二维码支付



```php
$this->wechat_configs = [
    // 必要配置
    'app_id' => 'wx61d01cbcxxxxxxxxx',
    'mch_id' => '1626xxxxxxx',
    //'key'                => '812219e4662b9a272f8262b146d6252b',   // API v2 密钥 (注意: 是v2密钥 是v2密钥 是v2密钥)
    'key' => 'asdiohsdhiadhad2xxxxxxxxxxx',

    // 如需使用敏感接口（如退款、发送红包等）需要配置 API 证书路径(登录商户平台下载 API 证书)
    'cert_path' => '/www/wwwroot/net/xxxxx/ssh/im_apiclient_cert.pem', // XXX: 绝对路径！！！！
    'key_path' => '/www/wwwroot/net/xxxxxx/ssh/im_apiclient_key.pem',      // XXX: 绝对路径！！！！

    'notify_url' => 'https://tuisong.xxxxx.com/api/pay/wechat_notify',     // 你也可以在下单时单独设置来想覆盖它
];

$config = $this->wechat_configs;


$app = Factory::payment($config);

$attributes = [
    'trade_type' => 'NATIVE', // h5支付 // JSAPI，NATIVE，APP...
    'product_id' => $product['id'],
    'body' => $product['name'],
    'detail' => $product['desc'] ?: $product['name'],
    'out_trade_no' => $bill_no,
    'total_fee' => $product['price'] * 100, // 单位：分
    'notify_url' => 'https://tuisong.xxxx.com/api/pay/wechat_notify', // 支付结果通知网址，如果不设置则会使用配置里的默认地址
    //'openid'           => '当前用户的 openid', // trade_type=JSAPI，此参数必传，用户在商户appid下的唯一标识，
    // ...
];


// 扫描二维码支付
/**
 *appid: "wx61d01cbce12ff068"
    * code_url: "weixin://wxpay/bizpayurl?pr=4Y2AVcXzz"
    * mch_id: "1626800916"
    * nonce_str: "zS4rtk3VD9bo0yez"
    * prepay_id: "wx30084316816247eb354b152ccba7100000"
    * result_code: "SUCCESS"
    * return_code: "SUCCESS"
    * return_msg: "OK"
    * sign: "1F6778EB3824F95D4209E477B66EF409"
    * trade_type: "NATIVE"
    */

$result = $app->order->unify($attributes);

if ($result['return_code'] == 'SUCCESS' && $result['result_code'] == 'SUCCESS') {


     // 支付成功，处理业务逻辑；将返回的 `code_url` 返回给前端，生成二维码
} else {
    // 支付失败
}


```

### 支付回调

```php
/**
 * 微信支付 - 异步回调通知
 *
 * @throws \EasyWeChat\Kernel\Exceptions\Exception
 */
public function wechat_notify()
{

    $app = Factory::payment($this->wechat_configs);

    /**
     * 
     * message:
     * {
     * "appid":"wx61d01cbce12ff068",
     * "bank_type":"OTHERS",
     * "cash_fee":"1",
     * "fee_type":"CNY",
     * "is_subscribe":"Y",
     * "mch_id":"1626800916",
     * "nonce_str":"62bcf948a3aa3",
     * "openid":"o22wx5_3hApYUm2HAKJMH5Cwh4cc",
     * "out_trade_no":"pay_2022063009155293490",
     * "result_code":"SUCCESS",
     * "return_code":"SUCCESS",
     * "sign":"1BCE9891A1082B721F3F8DC66A99A1CC",
     * "time_end":"20220630091604",
     * "total_fee":"1",
     * "trade_type":"MWEB",
     * "transaction_id":"4200001530202206302614478192"
     * }
     */
    $response = $app->handlePaidNotify(function ($message, $fail) {
        // 使用通知里的 "微信支付订单号" 或者 "商户订单号" 去自己的数据库找到订单
        $bill_no = $message['out_trade_no'];
        $order = Db::table('orders')->where('bill_no', $message['out_trade_no'])->find();

        if (!$order || $order['paid_at'] > 0) { // 如果订单不存在 或者 订单已经支付过了
            return true; // 告诉微信，我已经处理完了，订单没找到，别再通知我了
        }

        ///////////// <- 建议在这里调用微信的【订单查询】接口查一下该笔订单的情况，确认是已经支付 /////////////

        if ($message['return_code'] == 'SUCCESS') { // return_code 表示通信状态，不代表支付状态

            $pay_state = 'fail';
            if (isset($message['result_code']) && $message['result_code'] == 'SUCCESS') {
                // 支付成功；处理业务逻辑

            } elseif (isset($message['result_code']) && $message['result_code'] == 'FAIL') {
                // 支付失败；处理业务逻辑
            }


        } else {
            return $fail('通信失败，请稍后再通知我');
        }

        return true; // 返回处理完成
    });

    $response->send();
}
```
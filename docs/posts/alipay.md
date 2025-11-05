---
date: 2025-11-03
category:
  - 技术
tag:
  - alipay
  - 支付宝支付
  - 支付
---


# 支付宝支付流程

## 总流程

- 登录 [支付宝开放平台 (opens new window)](https://open.alipay.com/)，进入控制台页面
- [创建移动应用 (opens new window)](https://opendocs.alipay.com/open/200/105310)，填写应用信息并提交审核
- 在应用详情页面的`能力列表`中添加`APP支付`功能，详情参考[添加应用功能 (opens new window)](https://opendocs.alipay.com/open/200/105310#%E6%B7%BB%E5%8A%A0%E5%BA%94%E7%94%A8%E5%8A%9F%E8%83%BD)
- 进入开发设置完成加密方式、IP白名单等开发信息设置，详情参考[配置应用环境 (opens new window)](https://opendocs.alipay.com/open/200/105310#%E9%85%8D%E7%BD%AE%E5%BA%94%E7%94%A8%E7%8E%AF%E5%A2%83)
- 添加功能和配置密钥后（获取公钥、私钥，用于服务器生成订单），将应用提交审核，详情参考[上线应用 (opens new window)](https://opendocs.alipay.com/open/200/golive/)
- 应用上线后，完成签约才能在生产环境使用支付功能，详情参考[签约功能 (opens new window)](https://opendocs.alipay.com/open/200/105314/)

更多信息详见支付宝官方文档 [App 支付接入准备 (opens new window)](https://opendocs.alipay.com/open/204/105297/)


## 代码

### 所使用的第三方包

``` 
 "alipaysdk/easysdk": "2.0"
```


### app/H5支付


```php

use Alipay\EasySDK\Kernel\Config;
use Alipay\EasySDK\Kernel\Factory as AliFactory;
use Alipay\EasySDK\Kernel\Util\ResponseChecker;


public function getOptions()
	{
		$options = new Config();
		$options->protocol = 'https';
		$options->gatewayHost = 'openapi.alipay.com';
		$options->signType = 'RSA2';

        $options->appId = '2021003xxxxxxxx';

		// 为避免私钥随源码泄露，推荐从文件中读取私钥字符串而不是写入源码中

        $options->merchantPrivateKey = 'xxxx';
//		$options->alipayCertPath = '/www/wwwroot/net/popim-web-source/pop-web/ssh/alipay/alipayCertPublicKey_RSA2.crt';
//		$options->alipayRootCertPath = '/www/wwwroot/net/popim-web-source/pop-web/ssh/alipay/alipayRootCert.crt';
//		$options->merchantCertPath = '/www/wwwroot/net/popim-web-source/pop-web/ssh/alipay/appCertPublicKey_2021003131694042.crt';

		//注：如果采用非证书模式，则无需赋值上面的三个证书路径，改为赋值如下的支付宝公钥字符串即可

        $options->alipayPublicKey = 'xxxxx';

        //可设置异步通知接收服务地址（可选）
		$options->notifyUrl = "https://tuisong.xxxxxx.com/api/pay/alipay_notify";

		//可设置AES密钥，调用AES加解密相关接口时需要（可选）
		//$options->encryptKey = "";
		//$options->encryptKey = "<-- 请填写您的AES密钥，例如：aa4BtZ4tspm2wnXLb1ThQA== -->";


		return $options;
	}

//1. 设置参数（全局只需设置一次）
AliFactory::setOptions($this->getOptions());


try {
    //$result = AliFactory::payment()->wap()->pay($product['name'], $bill_no, $product['price'], 'https://tuisong.zhanim.com/im/pay', 'https://tuisong.zhanim.com/alipay.html');
    if ($client_type == 'app') {
        $result = AliFactory::payment()->app()->pay($product['name'], $bill_no, $product['price']); // app支付
    } else {
        $result = AliFactory::payment()->wap()->pay($product['name'], $bill_no, $product['price'], 'https://wap.xxxx.com/pages/mine/pay_success', 'https://wap.xxxx.com/pages/mine/pay_success'); // H5 支付
    }


    $responseChecker = new ResponseChecker();
    //3. 处理响应或异常
    if ($responseChecker->success($result)) {

        
        /**
 *  H5支付返回
 * <form id='alipaysubmit' name='alipaysubmit' action='https://openapi.alipay.com/gateway.do?charset=UTF-8' method='POST'><input type='hidden' name='method' value='alipay.trade.wap.pay'/><input type='hidden' name='app_id' value='2021003132634127'/><input type='hidden' name='timestamp' value='2022-07-02 20:57:03'/><input type='hidden' name='format' value='json'/><input type='hidden' name='version' value='1.0'/><input type='hidden' name='alipay_sdk' value='alipay-easysdk-php-2.2.2'/><input type='hidden' name='charset' value='UTF-8'/><input type='hidden' name='sign_type' value='RSA2'/><input type='hidden' name='biz_content' value='{"subject":"1个月","out_trade_no":"order_2022070220570364783","total_amount":"0.01","quit_url":"https:\/\/im.zhanim.com\/im\/pay","product_code":"QUICK_WAP_WAY"}'/><input type='hidden' name='return_url' value='https://im.zhanim.com/alipay.html'/><input type='hidden' name='notify_url' value='https://im.zhanim.com/api/pay/alipay_notify'/><input type='hidden' name='sign' value='eQstLbtO15RzOS1xcN8sLkJRCSmX3YtuJJXayua3z7pEDWa3fi94/PXOiTANBujgL1SMIoiW6raEsG9NMKRs15swPcfiMoDl3M7eLreKeQiVPpzK6ZxHXGjHxpP/wP+ft0q++UblTeZNeax4BrZNss29b9jD1x0HPj0a8C+7cXFHlAlCVKsELaYKlXR4sPVpVCqZNk5Noelaug4qFT5z52ZOs6UkyRntwl49gV7RhuUCcCa5y8tM82bS3gn5mzjHPL7Z31ZsNpgKlhGm5zkDtpky9ScttlENbCnZ7FrfQ69m8AZ6+dmrcwzvvFF2yr+YiozdC2Rapx5DLO9gefqLFg=='/><input type='submit' value='ok' style='display:none;''></form><script>document.forms['alipaysubmit'].submit();</script>
 * 
 * 
 * APP支付返回
 * 
 * app_id=2015052600090779&biz_content=%7B%22timeout_express%22%3A%2230m%22%2C%22seller_id%22%3A%22%22%2C%22product_code%22%3A%22QUICK_MSECURITY_PAY%22%2C%22total_amount%22%3A%220.02%22%2C%22subject%22%3A%221%22%2C%22body%22%3A%22%E6%88%91%E6%98%AF%E6%B5%8B%E8%AF%95%E6%95%B0%E6%8D%AE%22%2C%22out_trade_no%22%3A%22314VYGIAGG7ZOYY%22%7D&charset=utf-8&method=alipay.trade.app.pay&sign_type=RSA2&timestamp=2016-08-15%2012%3A12%3A15&version=1.0&sign=MsbylYkCzlfYLy9PeRwUUIg9nZPeN9SfXPNavUCroGKR5Kqvx0nEnd3eRmKxJuthNUx4ERCXe552EV9PfwexqW%2B1wbKOdYtDIb4%2B7PL3Pc94RZL0zKaWcaY3tSL89%2FuAVUsQuFqEJdhIukuKygrXucvejOUgTCfoUdwTi7z%2BZzQ%3D

 *  
*/
        // 支付成功,处理业务逻辑；h5支付，前端做跳转; app支付 前端拿到数据做支付调用

        return $result->body;
    } else {
        // 支付失败
    }
} catch (\Exception $e) {
    //echo "调用失败，" . $e->getMessage() . PHP_EOL;;
}

```


### 扫二维码支付



```php

use Alipay\EasySDK\Kernel\Config;
use Alipay\EasySDK\Kernel\Factory as AliFactory;
use Alipay\EasySDK\Kernel\Util\ResponseChecker;


public function getOptions()
	{
		$options = new Config();
		$options->protocol = 'https';
		$options->gatewayHost = 'openapi.alipay.com';
		$options->signType = 'RSA2';

        $options->appId = '2021003xxxxxxxx';

		// 为避免私钥随源码泄露，推荐从文件中读取私钥字符串而不是写入源码中

        $options->merchantPrivateKey = 'xxxx';
//		$options->alipayCertPath = '/www/wwwroot/net/popim-web-source/pop-web/ssh/alipay/alipayCertPublicKey_RSA2.crt';
//		$options->alipayRootCertPath = '/www/wwwroot/net/popim-web-source/pop-web/ssh/alipay/alipayRootCert.crt';
//		$options->merchantCertPath = '/www/wwwroot/net/popim-web-source/pop-web/ssh/alipay/appCertPublicKey_2021003131694042.crt';

		//注：如果采用非证书模式，则无需赋值上面的三个证书路径，改为赋值如下的支付宝公钥字符串即可

        $options->alipayPublicKey = 'xxxxx';

        //可设置异步通知接收服务地址（可选）
		$options->notifyUrl = "https://tuisong.xxxxxx.com/api/pay/alipay_notify";

		//可设置AES密钥，调用AES加解密相关接口时需要（可选）
		//$options->encryptKey = "";
		//$options->encryptKey = "<-- 请填写您的AES密钥，例如：aa4BtZ4tspm2wnXLb1ThQA== -->";


		return $options;
	}

//1. 设置参数（全局只需设置一次）
AliFactory::setOptions($this->getOptions());


try {
    
    $result = AliFactory::payment()->page()->pay($product['name'], $bill_no, $product['price'], 'https://tuisong.xxxx.com/im/pay');


    $responseChecker = new ResponseChecker();
    //3. 处理响应或异常
    if ($responseChecker->success($result)) {

        
        /**
 *  支付返回
 * <form id='alipaysubmit' name='alipaysubmit' action='https://openapi.alipay.com/gateway.do?charset=UTF-8' method='POST'><input type='hidden' name='method' value='alipay.trade.page.pay'/><input type='hidden' name='app_id' value='2021003132634127'/><input type='hidden' name='timestamp' value='2022-07-02 20:52:34'/><input type='hidden' name='format' value='json'/><input type='hidden' name='version' value='1.0'/><input type='hidden' name='alipay_sdk' value='alipay-easysdk-php-2.2.2'/><input type='hidden' name='charset' value='UTF-8'/><input type='hidden' name='sign_type' value='RSA2'/><input type='hidden' name='biz_content' value='{"subject":"1个月","out_trade_no":"order_2022070220523449218","total_amount":"0.01","product_code":"FAST_INSTANT_TRADE_PAY"}'/><input type='hidden' name='return_url' value='https://im.zhanim.com/im/pay'/><input type='hidden' name='notify_url' value='https://im.zhanim.com/api/pay/alipay_notify'/><input type='hidden' name='sign' value='Iqu50gQ/45rxmdzn5r7tqiAxh3OQKp1NXOVjLPI8+S2LZglfHK8XvIbgZnOoyiqWmiVcN18zezU76Q+cx99poIPVpaIK2ewNiGeIWZAZB/rLPCGRC/1b5PE/+IRzU7asJYXjKHqsBSfXtbIDldlSCSMvgWVc1j9sPuhT7Sv8b7cyzuMQOT3IJ2ETrOwLZ/s8ISo6tN2DvUPYnJCm5xJZTck4rz/QslHQHJPT2JoKhdQwNOVPmOqm6vNhnjeHVYF0+WEZV0khWATpnr70KLfPuHnjDr/RdN1ZywG4oK/NCRqcbI18QpRby1me4JNnLZD5ppaTJOygG56+OmuUmjBM9g=='/><input type='submit' value='ok' style='display:none;''></form><script>document.forms['alipaysubmit'].submit();</script>
 * 
 * 

 *  
*/
        // 支付成功,处理业务逻辑；前端做页面跳转

        return $result->body;
    } else {
        // 支付失败
    }
} catch (\Exception $e) {
    //echo "调用失败，" . $e->getMessage() . PHP_EOL;;
}
```


### 支付回调

```php

/**
 * 支付宝 - 异步回调通知
 *
 * {
 * "gmt_create":"2022-07-02 20:24:20",
 * "charset":"UTF-8",
 * "gmt_payment":"2022-07-02 20:24:25",
 * "notify_time":"2022-07-02 20:24:25",
 * "subject":"1\u4e2a\u6708",
 * "sign":"M1UkkTg35l\/huOZe9apu7IfN3\/\/lby0fK03F4enrkWs+OXu3RNCqBAuEPdoAVEdzH\/hFtk8PqpZrQQcsCGNJlvr0xKbqIJyGQapdH5teMDGLoMZbk0A53Zow3pMFjfSSu0i69+tydhsLGboyrfwY1GNRTC3PkULQvbM197ugS9YMN0pwbE895X+BQVVrab1aLgQEazP0VFP6JCcPg9xtXL84ozKv6kGOClrRQfbx7XpyYHIJiaChnlovnipjgavUsy9OP9sTrxsQNvy3piKHRBtUaft9YGrvsU+7TnJOMpXYUej3MuAIsnuEwH86lUkVqxxK6eZ6TZm4AIuJbp0agg==",
 * "buyer_id":"2088202891288381",
 * "invoice_amount":"0.01",
 * "version":"1.0",
 * "notify_id":"2022070200222202425088381419117482",
 * "fund_bill_list":"[{\"amount\":\"0.01\",\"fundChannel\":\"ALIPAYACCOUNT\"}]",
 * "notify_type":"trade_status_sync",
 * "out_trade_no":"order_2022070220235324839",
 * "total_amount":"0.01",
 * "trade_status":"TRADE_SUCCESS",
 * "trade_no":"2022070222001488381404118255",
 * "auth_app_id":"2021003132634127",
 * "receipt_amount":"0.01",
 * "point_amount":"0.00",
 * "buyer_pay_amount":"0.01",
 * "app_id":"2021003132634127",
 * "sign_type":"RSA2",
 * "seller_id":"2088441134518201"
 * }
 * @return bool|string|void
 * @throws \think\db\exception\DataNotFoundException
 * @throws \think\db\exception\ModelNotFoundException
 * @throws \think\exception\DbException
 */
public function alipay_notify()
{
    $my_seller_id = 2001111111;
    $post = $this->_post();

    $trade_status = $post['trade_status'] ?? NULL;
    $bill_no = $post['out_trade_no'] ?? NULL;
    $total_amount = $post['total_amount'] ?? 0;
    $pay_bill_no = $post['trade_no'] ?? '';
    $notify_id = $post['notify_id'] ?? 0;
    $seller_id = $post['seller_id'] ?? 0;

    $config = $this->alipay_configs;
    if ($seller_id != $my_seller_id)
        return 'success';


    $order = Db::table('orders')->where('bill_no', $bill_no)->find();

    if (!$order || $order['paid_at'] > 0) { // 如果订单不存在 或者 订单已经支付过了
        return 'success';
    }

    ///////////// <- 建议在这里调用微信的【订单查询】接口查一下该笔订单的情况，确认是已经支付 /////////////
    $pay_state = 'fail';
    if (in_array($trade_status, ['TRADE_SUCCESS', 'TRADE_FINISHED'])) {
        // 支付成功;处理业务逻辑
    } else {
       // 支付失败;处理业务逻辑
    }

    return 'success';
}
```
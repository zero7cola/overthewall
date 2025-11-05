import{_ as t,r as e,o as p,c as o,a as n,b as s,d as i,e as l}from"./app-CrO7TU3o.js";const c={},u=n("h1",{id:"微信支付流程",tabindex:"-1"},[n("a",{class:"header-anchor",href:"#微信支付流程"},[n("span",null,"微信支付流程")])],-1),r=n("h2",{id:"总流程",tabindex:"-1"},[n("a",{class:"header-anchor",href:"#总流程"},[n("span",null,"总流程")])],-1),d={href:"https://pay.weixin.qq.com/index.php/core/home/login?return_url=%2F",target:"_blank",rel:"noopener noreferrer"},k=n("li",null,[s("在 "),n("code",null,"产品中心"),s(" 申请开通需要的支付")],-1),v=l(`<blockquote><p><code>native支付</code> 就是扫码支付</p></blockquote><h2 id="代码" tabindex="-1"><a class="header-anchor" href="#代码"><span>代码</span></a></h2><h3 id="所使用的第三方包" tabindex="-1"><a class="header-anchor" href="#所使用的第三方包"><span>所使用的第三方包</span></a></h3><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>&quot;overtrue/wechat&quot;: &quot;~4.0&quot;,
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h3 id="h5支付" tabindex="-1"><a class="header-anchor" href="#h5支付"><span>H5支付</span></a></h3><div class="language-php line-numbers-mode" data-ext="php" data-title="php"><pre class="language-php"><code><span class="token variable">$this</span><span class="token operator">-&gt;</span><span class="token property">wechat_configs</span> <span class="token operator">=</span> <span class="token punctuation">[</span>
    <span class="token comment">// 必要配置</span>
    <span class="token string single-quoted-string">&#39;app_id&#39;</span> <span class="token operator">=&gt;</span> <span class="token string single-quoted-string">&#39;wx61d01cbcxxxxxxxxx&#39;</span><span class="token punctuation">,</span>
    <span class="token string single-quoted-string">&#39;mch_id&#39;</span> <span class="token operator">=&gt;</span> <span class="token string single-quoted-string">&#39;1626xxxxxxx&#39;</span><span class="token punctuation">,</span>
    <span class="token comment">//&#39;key&#39;                =&gt; &#39;812219e4662b9a272f8262b146d6252b&#39;,   // API v2 密钥 (注意: 是v2密钥 是v2密钥 是v2密钥)</span>
    <span class="token string single-quoted-string">&#39;key&#39;</span> <span class="token operator">=&gt;</span> <span class="token string single-quoted-string">&#39;asdiohsdhiadhad2xxxxxxxxxxx&#39;</span><span class="token punctuation">,</span>

    <span class="token comment">// 如需使用敏感接口（如退款、发送红包等）需要配置 API 证书路径(登录商户平台下载 API 证书)</span>
    <span class="token string single-quoted-string">&#39;cert_path&#39;</span> <span class="token operator">=&gt;</span> <span class="token string single-quoted-string">&#39;/www/wwwroot/net/xxxxx/ssh/im_apiclient_cert.pem&#39;</span><span class="token punctuation">,</span> <span class="token comment">// XXX: 绝对路径！！！！</span>
    <span class="token string single-quoted-string">&#39;key_path&#39;</span> <span class="token operator">=&gt;</span> <span class="token string single-quoted-string">&#39;/www/wwwroot/net/xxxxxx/ssh/im_apiclient_key.pem&#39;</span><span class="token punctuation">,</span>      <span class="token comment">// XXX: 绝对路径！！！！</span>

    <span class="token string single-quoted-string">&#39;notify_url&#39;</span> <span class="token operator">=&gt;</span> <span class="token string single-quoted-string">&#39;https://tuisong.xxxxx.com/api/pay/wechat_notify&#39;</span><span class="token punctuation">,</span>     <span class="token comment">// 你也可以在下单时单独设置来想覆盖它</span>
<span class="token punctuation">]</span><span class="token punctuation">;</span>


<span class="token variable">$config</span> <span class="token operator">=</span> <span class="token variable">$this</span><span class="token operator">-&gt;</span><span class="token property">wechat_configs</span><span class="token punctuation">;</span>
<span class="token variable">$app</span> <span class="token operator">=</span> <span class="token class-name static-context">Factory</span><span class="token operator">::</span><span class="token function">payment</span><span class="token punctuation">(</span><span class="token variable">$config</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token variable">$attributes</span> <span class="token operator">=</span> <span class="token punctuation">[</span>
    <span class="token string single-quoted-string">&#39;trade_type&#39;</span> <span class="token operator">=&gt;</span> <span class="token string single-quoted-string">&#39;MWEB&#39;</span><span class="token punctuation">,</span> <span class="token comment">// h5支付 // JSAPI，NATIVE，APP...</span>
    <span class="token string single-quoted-string">&#39;body&#39;</span> <span class="token operator">=&gt;</span> <span class="token variable">$product</span><span class="token punctuation">[</span><span class="token string single-quoted-string">&#39;name&#39;</span><span class="token punctuation">]</span><span class="token punctuation">,</span>
    <span class="token string single-quoted-string">&#39;detail&#39;</span> <span class="token operator">=&gt;</span> <span class="token variable">$product</span><span class="token punctuation">[</span><span class="token string single-quoted-string">&#39;desc&#39;</span><span class="token punctuation">]</span> <span class="token operator">?</span><span class="token punctuation">:</span> <span class="token variable">$product</span><span class="token punctuation">[</span><span class="token string single-quoted-string">&#39;name&#39;</span><span class="token punctuation">]</span><span class="token punctuation">,</span>
    <span class="token string single-quoted-string">&#39;out_trade_no&#39;</span> <span class="token operator">=&gt;</span> <span class="token variable">$bill_no</span><span class="token punctuation">,</span>
    <span class="token string single-quoted-string">&#39;total_fee&#39;</span> <span class="token operator">=&gt;</span> <span class="token variable">$product</span><span class="token punctuation">[</span><span class="token string single-quoted-string">&#39;price&#39;</span><span class="token punctuation">]</span> <span class="token operator">*</span> <span class="token number">100</span><span class="token punctuation">,</span> <span class="token comment">// 单位：分</span>
    <span class="token string single-quoted-string">&#39;notify_url&#39;</span> <span class="token operator">=&gt;</span> <span class="token string single-quoted-string">&#39;https://tuisong.zhanim.com/api/pay/wechat_notify&#39;</span><span class="token punctuation">,</span> <span class="token comment">// 支付结果通知网址，如果不设置则会使用配置里的默认地址</span>
    <span class="token comment">//&#39;openid&#39;           =&gt; &#39;当前用户的 openid&#39;, // trade_type=JSAPI，此参数必传，用户在商户appid下的唯一标识，</span>
    <span class="token comment">// ...</span>
<span class="token punctuation">]</span><span class="token punctuation">;</span>

<span class="token comment">// H5支付 下单返回</span>
<span class="token doc-comment comment">/**
 * appid: &quot;wx61d01cbce12ff068&quot;
 * mch_id: &quot;1626800916&quot;
 * mweb_url: &quot;https://wx.tenpay.com/cgi-bin/mmpayweb-bin/checkmweb?prepay_id=wx300732138415085404c91b85975f2b0000&amp;package=1472621727&quot;
 * nonce_str: &quot;Dw72JY9cHukDPUNT&quot;
 * prepay_id: &quot;wx300732138415085404c91b85975f2b0000&quot;
 * result_code: &quot;SUCCESS&quot;
 * return_code: &quot;SUCCESS&quot;
 * return_msg: &quot;OK&quot;
 * sign: &quot;69C61891D8638240FFD3242BFDB81483&quot;
 * trade_type: &quot;MWEB&quot;
 */</span>
<span class="token variable">$result</span> <span class="token operator">=</span> <span class="token variable">$app</span><span class="token operator">-&gt;</span><span class="token property">order</span><span class="token operator">-&gt;</span><span class="token function">unify</span><span class="token punctuation">(</span><span class="token variable">$attributes</span><span class="token punctuation">)</span><span class="token punctuation">;</span>


<span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token variable">$result</span><span class="token punctuation">[</span><span class="token string single-quoted-string">&#39;return_code&#39;</span><span class="token punctuation">]</span> <span class="token operator">==</span> <span class="token string single-quoted-string">&#39;SUCCESS&#39;</span> <span class="token operator">&amp;&amp;</span> <span class="token variable">$result</span><span class="token punctuation">[</span><span class="token string single-quoted-string">&#39;result_code&#39;</span><span class="token punctuation">]</span> <span class="token operator">==</span> <span class="token string single-quoted-string">&#39;SUCCESS&#39;</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>

    <span class="token comment">// 支付成功，处理业务逻辑；将返回的 \`mweb_url\` 返回给前端，做跳转,前端可以拼接 成功后需跳转的url  &amp;redirect_url=https://www.xxx.com</span>

   
<span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token punctuation">{</span>
    <span class="token comment">// 支付失败</span>
<span class="token punctuation">}</span>

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="扫二维码支付" tabindex="-1"><a class="header-anchor" href="#扫二维码支付"><span>扫二维码支付</span></a></h3><div class="language-php line-numbers-mode" data-ext="php" data-title="php"><pre class="language-php"><code><span class="token variable">$this</span><span class="token operator">-&gt;</span><span class="token property">wechat_configs</span> <span class="token operator">=</span> <span class="token punctuation">[</span>
    <span class="token comment">// 必要配置</span>
    <span class="token string single-quoted-string">&#39;app_id&#39;</span> <span class="token operator">=&gt;</span> <span class="token string single-quoted-string">&#39;wx61d01cbcxxxxxxxxx&#39;</span><span class="token punctuation">,</span>
    <span class="token string single-quoted-string">&#39;mch_id&#39;</span> <span class="token operator">=&gt;</span> <span class="token string single-quoted-string">&#39;1626xxxxxxx&#39;</span><span class="token punctuation">,</span>
    <span class="token comment">//&#39;key&#39;                =&gt; &#39;812219e4662b9a272f8262b146d6252b&#39;,   // API v2 密钥 (注意: 是v2密钥 是v2密钥 是v2密钥)</span>
    <span class="token string single-quoted-string">&#39;key&#39;</span> <span class="token operator">=&gt;</span> <span class="token string single-quoted-string">&#39;asdiohsdhiadhad2xxxxxxxxxxx&#39;</span><span class="token punctuation">,</span>

    <span class="token comment">// 如需使用敏感接口（如退款、发送红包等）需要配置 API 证书路径(登录商户平台下载 API 证书)</span>
    <span class="token string single-quoted-string">&#39;cert_path&#39;</span> <span class="token operator">=&gt;</span> <span class="token string single-quoted-string">&#39;/www/wwwroot/net/xxxxx/ssh/im_apiclient_cert.pem&#39;</span><span class="token punctuation">,</span> <span class="token comment">// XXX: 绝对路径！！！！</span>
    <span class="token string single-quoted-string">&#39;key_path&#39;</span> <span class="token operator">=&gt;</span> <span class="token string single-quoted-string">&#39;/www/wwwroot/net/xxxxxx/ssh/im_apiclient_key.pem&#39;</span><span class="token punctuation">,</span>      <span class="token comment">// XXX: 绝对路径！！！！</span>

    <span class="token string single-quoted-string">&#39;notify_url&#39;</span> <span class="token operator">=&gt;</span> <span class="token string single-quoted-string">&#39;https://tuisong.xxxxx.com/api/pay/wechat_notify&#39;</span><span class="token punctuation">,</span>     <span class="token comment">// 你也可以在下单时单独设置来想覆盖它</span>
<span class="token punctuation">]</span><span class="token punctuation">;</span>

<span class="token variable">$config</span> <span class="token operator">=</span> <span class="token variable">$this</span><span class="token operator">-&gt;</span><span class="token property">wechat_configs</span><span class="token punctuation">;</span>


<span class="token variable">$app</span> <span class="token operator">=</span> <span class="token class-name static-context">Factory</span><span class="token operator">::</span><span class="token function">payment</span><span class="token punctuation">(</span><span class="token variable">$config</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token variable">$attributes</span> <span class="token operator">=</span> <span class="token punctuation">[</span>
    <span class="token string single-quoted-string">&#39;trade_type&#39;</span> <span class="token operator">=&gt;</span> <span class="token string single-quoted-string">&#39;NATIVE&#39;</span><span class="token punctuation">,</span> <span class="token comment">// h5支付 // JSAPI，NATIVE，APP...</span>
    <span class="token string single-quoted-string">&#39;product_id&#39;</span> <span class="token operator">=&gt;</span> <span class="token variable">$product</span><span class="token punctuation">[</span><span class="token string single-quoted-string">&#39;id&#39;</span><span class="token punctuation">]</span><span class="token punctuation">,</span>
    <span class="token string single-quoted-string">&#39;body&#39;</span> <span class="token operator">=&gt;</span> <span class="token variable">$product</span><span class="token punctuation">[</span><span class="token string single-quoted-string">&#39;name&#39;</span><span class="token punctuation">]</span><span class="token punctuation">,</span>
    <span class="token string single-quoted-string">&#39;detail&#39;</span> <span class="token operator">=&gt;</span> <span class="token variable">$product</span><span class="token punctuation">[</span><span class="token string single-quoted-string">&#39;desc&#39;</span><span class="token punctuation">]</span> <span class="token operator">?</span><span class="token punctuation">:</span> <span class="token variable">$product</span><span class="token punctuation">[</span><span class="token string single-quoted-string">&#39;name&#39;</span><span class="token punctuation">]</span><span class="token punctuation">,</span>
    <span class="token string single-quoted-string">&#39;out_trade_no&#39;</span> <span class="token operator">=&gt;</span> <span class="token variable">$bill_no</span><span class="token punctuation">,</span>
    <span class="token string single-quoted-string">&#39;total_fee&#39;</span> <span class="token operator">=&gt;</span> <span class="token variable">$product</span><span class="token punctuation">[</span><span class="token string single-quoted-string">&#39;price&#39;</span><span class="token punctuation">]</span> <span class="token operator">*</span> <span class="token number">100</span><span class="token punctuation">,</span> <span class="token comment">// 单位：分</span>
    <span class="token string single-quoted-string">&#39;notify_url&#39;</span> <span class="token operator">=&gt;</span> <span class="token string single-quoted-string">&#39;https://tuisong.xxxx.com/api/pay/wechat_notify&#39;</span><span class="token punctuation">,</span> <span class="token comment">// 支付结果通知网址，如果不设置则会使用配置里的默认地址</span>
    <span class="token comment">//&#39;openid&#39;           =&gt; &#39;当前用户的 openid&#39;, // trade_type=JSAPI，此参数必传，用户在商户appid下的唯一标识，</span>
    <span class="token comment">// ...</span>
<span class="token punctuation">]</span><span class="token punctuation">;</span>


<span class="token comment">// 扫描二维码支付</span>
<span class="token doc-comment comment">/**
 *appid: &quot;wx61d01cbce12ff068&quot;
    * code_url: &quot;weixin://wxpay/bizpayurl?pr=4Y2AVcXzz&quot;
    * mch_id: &quot;1626800916&quot;
    * nonce_str: &quot;zS4rtk3VD9bo0yez&quot;
    * prepay_id: &quot;wx30084316816247eb354b152ccba7100000&quot;
    * result_code: &quot;SUCCESS&quot;
    * return_code: &quot;SUCCESS&quot;
    * return_msg: &quot;OK&quot;
    * sign: &quot;1F6778EB3824F95D4209E477B66EF409&quot;
    * trade_type: &quot;NATIVE&quot;
    */</span>

<span class="token variable">$result</span> <span class="token operator">=</span> <span class="token variable">$app</span><span class="token operator">-&gt;</span><span class="token property">order</span><span class="token operator">-&gt;</span><span class="token function">unify</span><span class="token punctuation">(</span><span class="token variable">$attributes</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token variable">$result</span><span class="token punctuation">[</span><span class="token string single-quoted-string">&#39;return_code&#39;</span><span class="token punctuation">]</span> <span class="token operator">==</span> <span class="token string single-quoted-string">&#39;SUCCESS&#39;</span> <span class="token operator">&amp;&amp;</span> <span class="token variable">$result</span><span class="token punctuation">[</span><span class="token string single-quoted-string">&#39;result_code&#39;</span><span class="token punctuation">]</span> <span class="token operator">==</span> <span class="token string single-quoted-string">&#39;SUCCESS&#39;</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>


     <span class="token comment">// 支付成功，处理业务逻辑；将返回的 \`code_url\` 返回给前端，生成二维码</span>
<span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token punctuation">{</span>
    <span class="token comment">// 支付失败</span>
<span class="token punctuation">}</span>


</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="支付回调" tabindex="-1"><a class="header-anchor" href="#支付回调"><span>支付回调</span></a></h3><div class="language-php line-numbers-mode" data-ext="php" data-title="php"><pre class="language-php"><code><span class="token doc-comment comment">/**
 * 微信支付 - 异步回调通知
 *
 * <span class="token keyword">@throws</span> <span class="token class-name"><span class="token punctuation">\\</span>EasyWeChat<span class="token punctuation">\\</span>Kernel<span class="token punctuation">\\</span>Exceptions<span class="token punctuation">\\</span>Exception</span>
 */</span>
<span class="token keyword">public</span> <span class="token keyword">function</span> <span class="token function-definition function">wechat_notify</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
<span class="token punctuation">{</span>

    <span class="token variable">$app</span> <span class="token operator">=</span> <span class="token class-name static-context">Factory</span><span class="token operator">::</span><span class="token function">payment</span><span class="token punctuation">(</span><span class="token variable">$this</span><span class="token operator">-&gt;</span><span class="token property">wechat_configs</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

    <span class="token doc-comment comment">/**
     * 
     * message:
     * <span class="token punctuation">{</span>
     * &quot;appid&quot;:&quot;wx61d01cbce12ff068&quot;,
     * &quot;bank_type&quot;:&quot;OTHERS&quot;,
     * &quot;cash_fee&quot;:&quot;1&quot;,
     * &quot;fee_type&quot;:&quot;CNY&quot;,
     * &quot;is_subscribe&quot;:&quot;Y&quot;,
     * &quot;mch_id&quot;:&quot;1626800916&quot;,
     * &quot;nonce_str&quot;:&quot;62bcf948a3aa3&quot;,
     * &quot;openid&quot;:&quot;o22wx5_3hApYUm2HAKJMH5Cwh4cc&quot;,
     * &quot;out_trade_no&quot;:&quot;pay_2022063009155293490&quot;,
     * &quot;result_code&quot;:&quot;SUCCESS&quot;,
     * &quot;return_code&quot;:&quot;SUCCESS&quot;,
     * &quot;sign&quot;:&quot;1BCE9891A1082B721F3F8DC66A99A1CC&quot;,
     * &quot;time_end&quot;:&quot;20220630091604&quot;,
     * &quot;total_fee&quot;:&quot;1&quot;,
     * &quot;trade_type&quot;:&quot;MWEB&quot;,
     * &quot;transaction_id&quot;:&quot;4200001530202206302614478192&quot;
     * <span class="token punctuation">}</span>
     */</span>
    <span class="token variable">$response</span> <span class="token operator">=</span> <span class="token variable">$app</span><span class="token operator">-&gt;</span><span class="token function">handlePaidNotify</span><span class="token punctuation">(</span><span class="token keyword">function</span> <span class="token punctuation">(</span><span class="token variable">$message</span><span class="token punctuation">,</span> <span class="token variable">$fail</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token comment">// 使用通知里的 &quot;微信支付订单号&quot; 或者 &quot;商户订单号&quot; 去自己的数据库找到订单</span>
        <span class="token variable">$bill_no</span> <span class="token operator">=</span> <span class="token variable">$message</span><span class="token punctuation">[</span><span class="token string single-quoted-string">&#39;out_trade_no&#39;</span><span class="token punctuation">]</span><span class="token punctuation">;</span>
        <span class="token variable">$order</span> <span class="token operator">=</span> <span class="token class-name static-context">Db</span><span class="token operator">::</span><span class="token function">table</span><span class="token punctuation">(</span><span class="token string single-quoted-string">&#39;orders&#39;</span><span class="token punctuation">)</span><span class="token operator">-&gt;</span><span class="token function">where</span><span class="token punctuation">(</span><span class="token string single-quoted-string">&#39;bill_no&#39;</span><span class="token punctuation">,</span> <span class="token variable">$message</span><span class="token punctuation">[</span><span class="token string single-quoted-string">&#39;out_trade_no&#39;</span><span class="token punctuation">]</span><span class="token punctuation">)</span><span class="token operator">-&gt;</span><span class="token function">find</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

        <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token operator">!</span><span class="token variable">$order</span> <span class="token operator">||</span> <span class="token variable">$order</span><span class="token punctuation">[</span><span class="token string single-quoted-string">&#39;paid_at&#39;</span><span class="token punctuation">]</span> <span class="token operator">&gt;</span> <span class="token number">0</span><span class="token punctuation">)</span> <span class="token punctuation">{</span> <span class="token comment">// 如果订单不存在 或者 订单已经支付过了</span>
            <span class="token keyword">return</span> <span class="token constant boolean">true</span><span class="token punctuation">;</span> <span class="token comment">// 告诉微信，我已经处理完了，订单没找到，别再通知我了</span>
        <span class="token punctuation">}</span>

        <span class="token comment">///////////// &lt;- 建议在这里调用微信的【订单查询】接口查一下该笔订单的情况，确认是已经支付 /////////////</span>

        <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token variable">$message</span><span class="token punctuation">[</span><span class="token string single-quoted-string">&#39;return_code&#39;</span><span class="token punctuation">]</span> <span class="token operator">==</span> <span class="token string single-quoted-string">&#39;SUCCESS&#39;</span><span class="token punctuation">)</span> <span class="token punctuation">{</span> <span class="token comment">// return_code 表示通信状态，不代表支付状态</span>

            <span class="token variable">$pay_state</span> <span class="token operator">=</span> <span class="token string single-quoted-string">&#39;fail&#39;</span><span class="token punctuation">;</span>
            <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token keyword">isset</span><span class="token punctuation">(</span><span class="token variable">$message</span><span class="token punctuation">[</span><span class="token string single-quoted-string">&#39;result_code&#39;</span><span class="token punctuation">]</span><span class="token punctuation">)</span> <span class="token operator">&amp;&amp;</span> <span class="token variable">$message</span><span class="token punctuation">[</span><span class="token string single-quoted-string">&#39;result_code&#39;</span><span class="token punctuation">]</span> <span class="token operator">==</span> <span class="token string single-quoted-string">&#39;SUCCESS&#39;</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
                <span class="token comment">// 支付成功；处理业务逻辑</span>

            <span class="token punctuation">}</span> <span class="token keyword">elseif</span> <span class="token punctuation">(</span><span class="token keyword">isset</span><span class="token punctuation">(</span><span class="token variable">$message</span><span class="token punctuation">[</span><span class="token string single-quoted-string">&#39;result_code&#39;</span><span class="token punctuation">]</span><span class="token punctuation">)</span> <span class="token operator">&amp;&amp;</span> <span class="token variable">$message</span><span class="token punctuation">[</span><span class="token string single-quoted-string">&#39;result_code&#39;</span><span class="token punctuation">]</span> <span class="token operator">==</span> <span class="token string single-quoted-string">&#39;FAIL&#39;</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
                <span class="token comment">// 支付失败；处理业务逻辑</span>
            <span class="token punctuation">}</span>


        <span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token punctuation">{</span>
            <span class="token keyword">return</span> <span class="token variable">$fail</span><span class="token punctuation">(</span><span class="token string single-quoted-string">&#39;通信失败，请稍后再通知我&#39;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>

        <span class="token keyword">return</span> <span class="token constant boolean">true</span><span class="token punctuation">;</span> <span class="token comment">// 返回处理完成</span>
    <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

    <span class="token variable">$response</span><span class="token operator">-&gt;</span><span class="token function">send</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,10);function m(g,b){const a=e("ExternalLinkIcon");return p(),o("div",null,[u,r,n("ul",null,[n("li",null,[s("在 "),n("a",d,[s("微信商户平台"),i(a)]),s(",注册、登录；")]),k]),v])}const h=t(c,[["render",m],["__file","wechatpay.html.vue"]]),x=JSON.parse('{"path":"/posts/wechatpay.html","title":"微信支付流程","lang":"zh-CN","frontmatter":{"date":"2025-11-03T00:00:00.000Z","category":["技术"],"tag":["wechatpay","微信支付","支付"]},"headers":[{"level":2,"title":"总流程","slug":"总流程","link":"#总流程","children":[]},{"level":2,"title":"代码","slug":"代码","link":"#代码","children":[{"level":3,"title":"所使用的第三方包","slug":"所使用的第三方包","link":"#所使用的第三方包","children":[]},{"level":3,"title":"H5支付","slug":"h5支付","link":"#h5支付","children":[]},{"level":3,"title":"扫二维码支付","slug":"扫二维码支付","link":"#扫二维码支付","children":[]},{"level":3,"title":"支付回调","slug":"支付回调","link":"#支付回调","children":[]}]}],"git":{"updatedTime":1762310562000},"filePathRelative":"posts/wechatpay.md","excerpt":"\\n<h2>总流程</h2>\\n<ul>\\n<li>在 <a href=\\"https://pay.weixin.qq.com/index.php/core/home/login?return_url=%2F\\" target=\\"_blank\\" rel=\\"noopener noreferrer\\">微信商户平台</a>,注册、登录；</li>\\n<li>在 <code>产品中心</code> 申请开通需要的支付</li>\\n</ul>\\n<blockquote>\\n<p><code>native支付</code> 就是扫码支付</p>\\n</blockquote>\\n<!-- ![](../.vuepress/public/pay/vx_payment.png) -->"}');export{h as comp,x as data};

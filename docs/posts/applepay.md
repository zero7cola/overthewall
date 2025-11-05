---
date: 2025-11-03
category:
  - 技术
tag:
  - applepay
  - 苹果支付
  - 支付
---

# 苹果支付流程

## 总流程

- 前端调用接口，创建订单
- 前端调用支付，拿到凭证等信息，发给后端验证


## 代码

### 创建订单


```php
$bill_no = $this->getBillNo();

// TODO 创建订单的 操作


return $this->json(0, '', ['order_no' => $bill_no]);

```


### 验证支付


```php
public function actionsApplepay()
	{
		$ret = [];
		$ret['code'] = 0;
		$ret['msg'] = "ok";

		$post = $this->_post();

		// 检查必要字段是否为空
		$required = ['rdata', 'order_no', 'transaction_id', 'is_test'];
		foreach ($required as $key) {
			if (!isset($post[$key])) {
				return $this->json(1, "缺少参数");
			}
		}

		$receipt_data = $post['rdata'];
		$order_no = $post['order_no'];
		$transaction_id = $post['transaction_id'];
		$is_test = (int)$post['is_test'];

        // TODO 验证订单是否存在


		$order_pay_state = 'fail';
		$pay_status = false;
		$new_member_at = 0;


		try {

			if ($is_test == 1) {    //沙盒购买地址
				$url = "https://sandbox.itunes.apple.com/verifyReceipt";
			} else {  //正式购买地址
				$url = "https://buy.itunes.apple.com/verifyReceipt";
			}

			$receipt_data = str_replace(' ', "+", $receipt_data);
			$post_data = json_encode(array("receipt-data" => $receipt_data));
			$response = $this->http_post_json($post_data, $url);
			file_put_contents('/tmp/log_applepay.log', date('Y-m-d H:i:s') . 'applepay res ' . $response . PHP_EOL, FILE_APPEND);

			$res = json_decode($response, true);


			$update_data = [
				'state' => 2
			];
			// 判断是否购买成功
			if (intval($res['status']) === 0) {
				//支付成功 更改订单状态
				if ($res['receipt']['bundle_id'] != 'com.zhanim.imtest') {
					return $this->json(101, '非法操作');

				}
				$pay_status = false;//默认支付为失败态
				if (count($res['receipt']['in_app'])) {
					foreach ($res['receipt']['in_app'] as $apple_order) {
						//满足二次验证的商品和客户端的商品一致 且 apple订单号一致 且支付状态为 PURCHASED 方式
						if ($apple_order['product_id'] == $product['productid'] && $apple_order['transaction_id'] == $transaction_id && $apple_order['in_app_ownership_type'] == 'PURCHASED') {
							//如果查询到里面有满足条件的 将状态置为true
							$pay_status = true;
						}
					}
				}

				if ($pay_status == true) {

					$update_data = [
						'paid_at' => time(),
						'state' => 99
					];

					$order_pay_state = 'success';
				} else {
					$ret['code'] = 101;
					$ret['msg'] = '未查询到当前订单的支付成功记录';
				}

			} else {

				//沙盒情况下直接走完流程
				if ($res['status'] == 21007) {

					$update_data = [
						'paid_at' => time(),
						'state' => 99
					];

					$order_pay_state = 'success';

				} else {
					$ret['code'] = 101;
					$ret['msg'] = '购买失败 status:' . $res['status'] . ' - ' . $this->appleCode[$res['status']];

				}
			}

			$uid = $order['uid'];
			$pid = $order['pid'];
			$length = $order['product_length'];
			$max_num = $order['product_num'];


			$low_level_num = Db::table('user')->where('parent_id', $uid)->count(); // 已经开设的下级账号
			$new_store_limit = $max_num - (1 + $low_level_num) <= 0 ? 0 : $max_num - (1 + $low_level_num);// 还可以开设客服号的个数;这里要减去自己，还要减去已经开设的客服账号

			$user = Db::table('user')->where('uid', $uid)->find();

			$old_pid = $user['last_buy_pid'];

			// 购买相同套餐 = 续费；即直接续时间;否则直接重新算时间
			$new_member_at = $member_at = $user['member_at'] > 0 ? $user['member_at'] : time();
			if ($pay_status) {
				if ($pid == $old_pid) {
					$new_member_at = $member_at + $length * 30 * 24 * 3600;
				} else {
					$new_member_at = time() + $length * 30 * 24 * 3600;
				}
			}


			Db::startTrans();


			Db::table('orders')->where('bill_no', $order_no)->update($update_data);

			//file_put_contents('/tmp/log_applepay.log', date('Y-m-d H:i:s') . 'applepay $order_pay_state ' . $order_pay_state .'|$update_data:'.json_encode($update_data).'|ret:'.json_encode($ret) . PHP_EOL, FILE_APPEND);


			if ($order_pay_state == 'success') {

				Db::table('user')->where('uid', $order['uid'])->update([
					'is_member' => 1,
					'member_at' => $new_member_at,
					'is_server' => 1,
					'last_buy_pid' => $pid,
					'store_limit' => $new_store_limit
				]);


				// 该账号的下级也更新到期时间
				Db::table('user')->where('parent_id', $order['uid'])->update([
					'member_at' => $new_member_at,
					'is_server' => 1,
				]);

				Db::table('member_records')->insert([
					'bill_no' => $order_no,
					'uid' => $uid,
					'state' => 1,
					'before_at' => $member_at,
					'after_at' => $new_member_at,
					'product_name' => $order['product_name'],
					'product_price' => $order['product_price'],
					'product_length' => $order['product_length'],
				]);
			}

			Db::commit();

			// 支付结果通知前端
			$channel1 = 'user-' . $uid;
			$channel2 = 'webuser-' . $uid;
			$data = [
				'state' => $order_pay_state,
				'p_name' => $order['product_name'],
				'm_at' => $new_member_at
			];
			Gateway::sendToGroup($channel1, 'pay_member_notify', $data);
			Gateway::sendToGroup($channel2, 'pay_member_notify', $data);

		} catch (\Exception $e) {
			//修改状态为校验中
			$ret['code'] = 203;
			$ret['msg'] = $e->getMessage();
		}

		return $this->json($ret['code'], $ret['msg'], ['member_at' => $new_member_at]);
	}
```


# go代码片段

## 发送post请求
``` go
package main

import (
	"bytes"
	"encoding/json"
	"fmt"
	"io/ioutil"
	"net/http"
)

type RequestData struct {
	Key string `json:"key"`
}

func main() {
	// 创建请求数据对象
	data := RequestData{
		Key: "value",
	}

	// 将数据进行JSON序列化
	jsonData, err := json.Marshal(data)
	if err != nil {
		fmt.Println("JSON序列化失败:", err)
		return
	}

	// 创建POST请求
	req, err := http.NewRequest("POST", "http://example.com/api", bytes.NewBuffer(jsonData))
	if err != nil {
		fmt.Println("创建请求失败:", err)
		return
	}

	// 设置请求头部信息
	req.Header.Set("Content-Type", "application/json")

	// 发送请求并获取响应
	client := &http.Client{}
	resp, err := client.Do(req)
	if err != nil {
		fmt.Println("发送请求失败:", err)
		return
	}
	defer resp.Body.Close()

	// 读取响应的内容
	respBody, err := ioutil.ReadAll(resp.Body)
	if err != nil {
		fmt.Println("读取响应失败:", err)
		return
	}

	// 打印响应内容
	fmt.Println("响应内容:", string(respBody))
}

```
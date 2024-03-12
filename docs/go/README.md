# go注意事项

## 打包

> 在windows打包成linux可执行文件

``` sh
go env -w GOOS=linux
go env -w GOARCH=amd64
go build -o your_app_name_linux
```

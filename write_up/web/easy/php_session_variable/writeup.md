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


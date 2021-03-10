# php路由绕过
``` php
<?php 
show_source(__FILE__);
// code by SEC@USTC 

echo '<html><head><meta http-equiv="charset" content="gbk"></head><body>'; 

$URL = $_SERVER['REQUEST_URI'];
 
// echo 'URL: '.$URL.'<br/>'; 
include("flag.php"); 

$code = str_replace($flag, 'CTF{???}', file_get_contents('./index.php')); 
$stop = 0; 

if($flag && strpos($URL, './') !== FALSE){ 
    $flag = ""; 
    $stop = 1;        //Pass 
} 

if($flag && strpos($URL, '\\') !== FALSE){ 
    $flag = ""; 
    $stop = 2;        //Pass 
} 

$matches = array(); 

preg_match('/^([a-z0-9\/.]+)$/', $URL, $matches);


if($flag && empty($matches) || $matches[1] != $URL){ 
    $flag = ""; 
    $stop = 3;        //Pass 
} 

if($flag && strpos($URL, '//') !== FALSE){ 
    $flag = ""; 
    $stop = 4;        //Pass 
} 

if($flag && substr($URL, -9) !== 'index.php'){ 
                            
    $flag = ""; 
    $stop = 5;        //Not Pass 
} 

if($flag && strpos($URL, 'p.') !== FALSE){ 
    $flag = ""; 
    $stop = 6;        //Not Pass 
} 

if($flag && $URL == '/hdxg/index.php'){ 
    $flag = ""; 
    $stop = 7;        //Not Pass 
} 
if(!$stop) $stop = 8; 

echo 'Flag: '.$flag."</br>"; 
echo 'Stop: '.$stop;

echo '<hr />'; 
for($i = 1; $i < $stop; $i++) 
    $code = str_replace('//Pass '.$i, '//Pass', $code); 
for(; $i < 8; $i++) 
    $code = str_replace('//Pass '.$i, '//Not Pass', $code); 


echo highlight_string($code, TRUE); 

echo '</body></html>';
```
通过观察代码，和测试，能得知能通过到哪一步。这题就考察个php的一种特殊路由方式，当明确`index.php`后，再加入的会被当作参数加入到`index.php`中，即`/index.php/test`其实访问的文件说`index.php`,最后`test`作为参数穿入`index.php`中。

由于访问默认连接时，已经导向`/index.php`于是构建`/index.php`即可。
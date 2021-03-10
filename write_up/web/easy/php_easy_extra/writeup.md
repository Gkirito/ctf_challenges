# php 变量覆盖

看题目代码
``` php
<?php  

show_source(__FILE__);

$filename=__FILE__; 
include("flag.php");
extract($_GET); 
if(isset($hdxgctf)){ 
    $content=trim(file_get_contents($filename)); 
    if($hdxgctf==$content) { echo $flag; } 
    else{ echo'Oh.no';} }

?>
```
由于`extract($_GET)`会导致变量漏洞覆盖，所以对`$filename`传入一个不存在的位置，即可构建payload：`?hdxgctf=&filename=xxxx`即可拿到flag
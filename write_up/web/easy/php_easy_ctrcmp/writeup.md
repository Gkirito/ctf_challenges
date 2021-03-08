# ctrcmp
根据题意，是一题关于`ctrcmp()`函数的题，看代码
``` php
<?php


include("flag.php");


if (isset($_GET['a'])) {  
    if (strcmp($_GET['a'], $flag) == 0)  
        die('Flag: '.$flag);  
    else  
        print '离成功更近一步了';  
}
else{
    show_source(__FILE__);
}


?>
```
当strcmp()函数参数是数组的时候,函数执行出错，返回NULL
NULL和0做==比较的时候是True,所以构建`?a[]=`传入即可
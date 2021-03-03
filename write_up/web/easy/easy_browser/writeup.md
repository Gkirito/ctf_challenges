# ctf安全浏览器

根据题意：`只有CTF安全浏览器打开本题才能看的到秘密`
之后尝试随便登录，发现返回了  
![picture 4](https://libget.com/gkirito/blog/image/2021/image-20210303xm0kmfjh%402x.png)    
也就是要安全浏览器登录，一般这种安全浏览器什么的判断都在`User-Agent`中，所以尝试改写`User-Agent`为CTF安全浏览器

1. ctf安全浏览器
   在浏览器`Inspect`下选择  
   ![picture 5](https://libget.com/gkirito/blog/image/2021/image-20210303D6pHWy6j%402x.png)   
    More tools --> Network conditions
    在`User Agent`中  
    ![picture 6](https://libget.com/gkirito/blog/image/2021/image-20210303cCRmr9Sh%402x.png)  
    取消选择 Select automatically --> 选择 Custom --> 填入`CTF Security Browser`
    然后再次尝试登录，即可获得flag

2. Burp
   拦截登录请求,修改`User-Agent:`内容为`CTF Security Browser`，再发起请求获得flag  
   ![picture 7](https://libget.com/gkirito/blog/image/2021/image-20210303jfFI0Yyn%402x.png)  

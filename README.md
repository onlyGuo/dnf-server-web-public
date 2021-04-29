# dnf-server-web

## Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

### Lints and fixes files
```
npm run lint
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).

## 演示地址
http://8.140.189.172:9002/
可下载游戏登录玩耍。

配套登陆器：
https://github.com/onlyGuo/dnf-client-public.git

配套后台系统：
https://github.com/onlyGuo/dnf-server-public.git
Email：719348277@qq.com

## 界面预览
目前已完成主页注册、充值、后台管理（账号管理、角色管理、制卡、查卡）

### 门户主页
![home](https://github.com/onlyGuo/dnf-server-web-public/blob/main/doc/1_home.jpg?raw=true)
### 登陆器
![login](https://github.com/onlyGuo/dnf-server-web-public/blob/main/doc/2_login_client.jpg?raw=true)
### 账号注册页面
![register](https://github.com/onlyGuo/dnf-server-web-public/blob/main/doc/3_register.jpg?raw=true)
### 账号充值页面
![recharge](https://github.com/onlyGuo/dnf-server-web-public/blob/main/doc/4_recharge.jpg?raw=true)
### 制作充值卡
![keys create](https://github.com/onlyGuo/dnf-server-web-public/blob/main/doc/5_key_create.jpg?raw=true)
### 充值卡列表
![kyes list](https://github.com/onlyGuo/dnf-server-web-public/blob/main/doc/6_key_list.jpg?raw=true)
### 账号管理
![account list](https://github.com/onlyGuo/dnf-server-web-public/blob/main/doc/9_accounts.jpg?raw=true)
### 角色管理
![role list](https://github.com/onlyGuo/dnf-server-web-public/blob/main/doc/8_role.jpg?raw=true)
### 登陆器通知
![login notice](https://github.com/onlyGuo/dnf-server-web-public/blob/main/doc/7_client_notice.jpg?raw=true)

## 部署步骤
推荐以docker方式部署到服务器中，且推荐此类方式。另外推荐一个基于官方openjdk修改的镜像，调整了时区，使其对应中国时区： `guoshengkai/openjdk:8`。
以下讲解在物理机中的部署方式。
1. 服务器安装JDK8
2. 数据库创建用户，要求具有dof数据库的增删改查权限，也可以直接使用game用户但不建议。
3. 数据库`d_taiwan`库下创建`login_notice`表，用于存放登陆器公告
````sql
create table login_notice
(
    id      INT(10) auto_increment
        primary key,
    content TEXT(65535) null comment '通知内容'
);

INSERT INTO d_taiwan.login_notice (id, content) VALUES (1, 'MS4g5paw54mI55qE55m76ZmG5Zmo5byA5Y+R5a6M5q+V77yM546w5bey5pSv5oyB6Ieq5Yqo5pu05pawCjIuIOWFrOWFseWFheWAvOmhtemdouW3suW8gOaUvu+8jOi0reS5sOWFheWAvOWNoeWSjENES+iBlOezu+WQhOS7o+eQhgozLiDlhoXkvqfljbPlsIbliKDmoaPov47mnaXlhazmtYs=');
````
4. 数据库创建`dnf_service`库,用于存放后台管理系统相关业务,并导入以下SQL
````sql
create table dnf_service.recharge_key
(
    id          INT(10) auto_increment
        primary key,
    content     VARCHAR(50)  null comment '卡密本体',
    type        INT(10)      null comment '0 = 点券, 1 = 装备',
    face        INT(10)      null comment '点券数量或装备编号',
    face_name   VARCHAR(500) null,
    status      INT(10)      null comment '0=未使用，1=已使用',
    use_account VARCHAR(20)  null comment '使用账号',
    use_uid     INT(10)      null comment '使用账号ID',
    create_time DATETIME(19) null comment '创建时间',
    use_time    DATETIME(19) null comment '使用时间'
);
````
5. 安装后台服务：https://github.com/onlyGuo/dnf-server-public.git
6. 本地安装nodejs环境
7. cd到本项目根目录下编译源码
````bash
npm install
npm run build
````
8. 服务器创建站点，将本项目源码编译文件放到站点目录中，并配置反向代理防止本项目与后台交互产生跨域问题，以nginx为例。
````
server{
    listen       9002;        # 页面访问端口
    listen  [::]:9002;        # 页面访问端口
    server_name  localhost;
    
    # 站点目录， “/home/html/dnf”改为你自己的目录
    location / {
        root   /home/html/dnf;
        try_files $uri $uri/ /index.html;
    }

    error_page   500 502 503 504  /50x.html;
    location = /50x.html {
        root   /usr/share/nginx/html;
    }

    # 后台服务代理，“http://172.18.0.3:9001;”改为你自己的服务路径和端口
    location ~/api/v1 {
        proxy_pass http://172.18.0.3:9001;
        proxy_set_header Host $host:$server_port;
    }
}
````
9. 访问http://servername:9002即可。
10. 补充一下，修改源码中的Home.vue改为自己的客户端下载地址，重新编译并上传。



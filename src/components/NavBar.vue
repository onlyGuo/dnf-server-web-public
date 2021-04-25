<template>
    <div class="nav-con">
        <div style="width: 1000px; margin: auto;">
            <el-menu
                :default-active="$route.path"
                mode="horizontal"
                router
                style="height: 60px"
                background-color="#545c64"
                text-color="#fff"
                active-text-color="#ffd04b">
                <el-menu-item index="/">主页</el-menu-item>
                <el-submenu index="/source">
                    <template slot="title">资源</template>
                    <el-menu-item index="mod" disabled>模型补丁</el-menu-item>
                    <el-menu-item index="strategy" disabled>游戏攻略</el-menu-item>
                </el-submenu>
                <el-menu-item index="notice" disabled>公告中心</el-menu-item>
                <el-submenu index="/account">
                    <template slot="title">账号服务</template>
                    <el-menu-item index="/register">账号注册</el-menu-item>
                    <el-menu-item index="/recharge">充值/CDK兑换</el-menu-item>
                </el-submenu>
                <el-menu-item index="/notice" disabled>游戏社区</el-menu-item>
                <el-menu-item index="/manager">管理员入口</el-menu-item>
            </el-menu>
        </div>
    </div>
</template>

<script>
export default {
    name: "NavBar"
}
</script>

<style scoped>
    .el-menu--horizontal{
        text-align: center;
    }
    .el-menu--horizontal>.el-menu-item{
        float: none;
        display: inline-block!important;
        vertical-align: top;
    }
    .el-menu--horizontal>.el-submenu{
        float: none;
        display: inline-block!important;
        vertical-align: top;
    }
    .nav-con{
        background-color: rgb(84, 92, 100);
        border-bottom: solid 1px #e6e6e6;
        height: 60px;
    }
</style>
<template>
    <div>
        <el-form ref="form" :model="form" label-width="80px">
            <el-form-item label="账号">
                <el-input v-model="form.account"></el-input>
            </el-form-item>
            <el-form-item label="密码">
                <el-input v-model="form.password"></el-input>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="onSubmit">登录</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>

<script>
export default {
    name: "Login",
    data(){
        return {
            form: {
                account: '',
                password: ''
            }
        }
    },
    methods: {
        onSubmit(){
            this.ser.post("login", this.form).then(res => {
                window.localStorage.setItem("token", res.data);
                this.go("/manager");
            })
        }
    }
}
</script>

<style scoped>

</style>
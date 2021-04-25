<template>
    <div>
        <el-breadcrumb separator="/" style="margin-bottom: 30px">
            <el-breadcrumb-item>首页</el-breadcrumb-item>
            <el-breadcrumb-item>玩家管理</el-breadcrumb-item>
            <el-breadcrumb-item>角色列表</el-breadcrumb-item>
        </el-breadcrumb>

        <div>
            <!-- 搜索条件 -->
            <div style="margin: 20px auto;">
                <el-form :inline="true" :model="from" class="demo-form-inline">
                    <el-form-item label="账号">
                        <el-input v-model="from.account" placeholder="所属账号"></el-input>
                    </el-form-item>
                    <el-form-item label="昵称">
                        <el-input v-model="from.name" placeholder="角色名称"></el-input>
                    </el-form-item>
                    <el-form-item label="等级">
                        <el-input v-model="from.minLev" placeholder="最低等级" type="number" style="width: 100px" min="1" max="86"></el-input>
                    </el-form-item>
                    <el-form-item label="~">
                        <el-input v-model="from.maxLev" placeholder="最高等级" type="number" style="width: 100px" min="1" max="86"></el-input>
                    </el-form-item>

                    <el-form-item label="职业">
                        <el-select v-model="from.job" placeholder="选择职业">
                            <el-option label="全部职业" value=""></el-option>
                            <el-option v-for="(job, index) in jobs" :label="job.name" :value="index" v-bind:key="index"></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="是否转职">
                        <el-switch v-model="from.superJob" />
                    </el-form-item>
                    <el-form-item>
                        <el-button type="primary" @click="load">查询</el-button>
                    </el-form-item>
                </el-form>
            </div>

            <el-table
                :data="tableData.list"
                border
                v-loading="loading"
                style="width: 100%">
                <el-table-column fixed prop="characNo" label="ID" min-width="50" />
                <el-table-column prop="characName" label="昵称" min-width="120"/>
                <el-table-column prop="job" label="职业" min-width="100">
                    <template slot-scope="scope">
                        <span v-text="jobs[scope.row.job].name"></span>
                    </template>
                </el-table-column>
                <el-table-column prop="lev" label="等级" width="60" />
                <el-table-column prop="growType" label="转职类型" width="100">
                    <template slot-scope="scope">
                        <span v-text="jobs[scope.row.job].subs[scope.row.growType] ? jobs[scope.row.job].subs[scope.row.growType] : '_:' + scope.row.growType"></span>
                    </template>
                </el-table-column>
                <el-table-column prop="maxHp" label="HP" width="80" />
                <el-table-column prop="maxMp" label="MP" width="80" />
                <el-table-column prop="phyAttack" label="物攻" width="80" />
                <el-table-column prop="phyDefense" label="物防" width="80" />
                <el-table-column prop="magAttack" label="魔攻" width="80" />
                <el-table-column prop="magDefense" label="魔防" width="80" />
                <el-table-column prop="attackSpeed" label="攻速" width="80" />
                <el-table-column prop="castSpeed" label="施速" width="80" />
                <el-table-column prop="hitRecovery" label="回避" width="80" />
                <el-table-column prop="jump" label="跳跃力" width="80" />
                <el-table-column prop="fatigue" label="疲劳" width="80" />
                <el-table-column
                    fixed="right"
                    label="操作"
                    width="100">
                    <template slot-scope="scope">
                        <el-button type="text" size="small">编辑</el-button>
                        <el-button type="text" size="small" @click="sendMail(scope.row.characNo, scope.row.characName)">发送</el-button>
                    </template>
                </el-table-column>
            </el-table>
        </div>


        <div style="text-align: right; margin-top: 20px">
            <el-pagination
                background
                :page-sizes="[10, 20, 50, 100]"
                layout="total, sizes, prev, pager, next, jumper"
                @current-change="load"
                @size-change="sizeChange"
                :current-page="tableData.page"
                :page-size="tableData.length"
                :total="tableData.totalSize">
            </el-pagination>
        </div>


        <!-- 弹窗等 -->
        <div class="box">
            <send-email :option="sendMailOption"></send-email>
        </div>

    </div>
</template>

<script>
import SendEmail from "@/views/manager/box/SendEmail";
export default {
    name: "MgrCharach",
    components: {SendEmail},
    data(){
        return {
            from: {
                name: '',
                account: '',
                job: '',
                superJob: false,
                minLev: '',
                maxLev: ''
            },
            loading: false,
            tableData: {
                list: [],
                page: 1,
                totalSize: 0,
                length: 10
            },
            jobs: this.jobs(),
            sendMailOption: {
                open: false,
                id: 0
            }
        }
    },
    methods: {
        sizeChange(size){
            this.tableData.length = size;
            this.tableData.page = 1;
            this.load();
        },
        load(page){
            if (page >= 1){
                this.tableData.page = page;
            }
            this.loading = true;
            this.ser.get("charac?page=" + this.tableData.page + "&pageSize=" + this.tableData.length
                + "&name=" + this.from.name + "&account=" + this.from.account + "&job=" + this.from.job
                + "&minLev=" + this.from.minLev + "&maxLev=" + this.from.maxLev).then(res => {
                this.tableData = res.data;
            }).finally(() => {
                this.loading = false;
            })
        },
        sendMail(id, name){
            this.sendMailOption.id = id;
            this.sendMailOption.open = true;
            this.sendMailOption.receiveCharacName = name
        }
    },
    mounted() {
        this.load();
    }
}
</script>

<style scoped>

</style>
<template>
    <div>
        <el-dialog
                :title="'发送邮件到:' + option.receiveCharacName"
                :visible.sync="option.open"
                v-loading="loading"
                width="50%">
            <div>
                <el-form ref="form" :model="form" label-width="80px">
                    <el-form-item label="发件人">
                        <el-input v-model="form.sendCharacName" disabled></el-input>
                    </el-form-item>
                    <el-form-item label="物品名称">
                        <el-select style="width: calc(100% - 150px)"
                                v-model="form.itemId"
                                filterable
                                remote
                                placeholder="请输入关键词"
                                :remote-method="searchItem"
                                :loading="searchLoading">
                            <el-option
                                    v-for="item in itemOptions"
                                    :key="item.code"
                                    :label="item.name"
                                    :value="item.code">
                            </el-option>
                        </el-select>
                        <el-input-number style="width: 150px" v-model="form.addInfo" :min="0" :max="100000" label="数量"></el-input-number>
                    </el-form-item>
                    <el-form-item label="强化等级" style="width: 50%; float: left">
                        <el-input-number v-model="form.upgrade" :min="0" :max="31" label="强化等级"></el-input-number>
                    </el-form-item>

                    <el-form-item label="锻造等级" style="width: 50%; float: right">
                        <el-input-number v-model="form.seperateUpgrade" :min="0" :max="31" label="强化等级"></el-input-number>
                    </el-form-item>

                    <el-form-item label="金币数量">
                        <el-input-number v-model="form.gold" :min="0" :max="10000000000" label="强化等级"></el-input-number>
                    </el-form-item>

                    <el-form-item label="红字属性">
                        <el-select v-model="form.amplifyOption" placeholder="请选择属性">
                            <el-option label="体力" value="1"></el-option>
                            <el-option label="精神" value="2"></el-option>
                            <el-option label="力量" value="3"></el-option>
                            <el-option label="智力" value="4"></el-option>
                        </el-select>
                        <el-input-number v-model="form.amplifyValue" :min="0" :max="65535" label="加成数值"></el-input-number>
                    </el-form-item>

                    <el-form-item label="是否封装">
                        <el-switch v-model="form.sealFlag"></el-switch>
                        <span style="color: red; font-size: 12px; margin-left: 15px;">注意: 史诗装备 (即：所有金色名称的物品) 不可封装，否则引起游戏崩溃</span>
                    </el-form-item>
                </el-form>
            </div>
            <span slot="footer" class="dialog-footer">
                <el-button @click="option.open = false">取 消</el-button>
                <el-button type="primary" @click="onsubmit">确 定</el-button>
            </span>
        </el-dialog>
    </div>
</template>

<script>
let ITEM_LIST = require('../../../assets/itemList.json');
export default {
    name: "SendEmail",
    props: {
        option: Object,
    },
    data(){
        return {
            form: {
                sendCharacNo: 0,
                sendCharacName: 'DNF Manageer',
                receiveCharacNo: 0,
                itemId: null,
                addInfo: 0,
                upgrade: 0,
                seperateUpgrade: 0,
                sealFlag: false,
                amplifyOption: 0,
                amplifyValue: 0,
                gold: 0
            },
            searchLoading: false,
            loading: false,
            itemOptions:[
            ]
        }
    },methods: {
        onsubmit(){
            this.form.receiveCharacNo = this.option.id;
            if (!this.form.itemId){
                this.$message.error("必须选择一个物品");
                return;
            }
            this.loading = true;
            this.ser.post("postal", this.form).then(() => {
                this.$message.success("发送成功, 重新选择角色即可查看邮件");
                this.form =  {
                    sendCharacNo: 0,
                    sendCharacName: 'DNF Manageer',
                    receiveCharacNo: 0,
                    itemId: null,
                    addInfo: 0,
                    upgrade: 0,
                    seperateUpgrade: 0,
                    sealFlag: false,
                    amplifyOption: 0,
                    amplifyValue: 0,
                    gold: 0
                };
                this.option.open = false;
            }).finally(() => {
                this.loading = false;
            })
        },
        /**
         * 远程搜索物品列表
         * @param query
         */
        searchItem(query){
            this.searchLoading = true;
            this.itemOptions = [];
            setTimeout(() => {
                let count = 0;
                for (let i in ITEM_LIST){
                    if (count === 10){
                        break;
                    }
                    if(ITEM_LIST[i].name.indexOf(query) !== -1){
                        this.itemOptions.push(ITEM_LIST[i]);
                        count ++;
                    }
                }
                this.searchLoading = false;
            });
        }
    }
}
</script>

<style scoped>

</style>
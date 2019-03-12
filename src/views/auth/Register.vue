<template>
    <div class="row">
        <div class="col-md-4 col-md-offset-4 floating-box">
            <!-- 消息组件 -->
            <Message :show.sync="msgShow" :type="msgType" :msg="msg"/>
            <div class="panel panel-default">
                <div class="panel-heading">
                    <h3 class="panel-title">请注册</h3>
                </div>

                <div class="panel-body" data-validator-form>
                    <div class="form-group">
                        <label class="control-label">用户名</label>
                        <input type="text" v-model.trim="username" v-validator.input.required="{ regex: /^[a-zA-Z]+\w*\s?\w*$/, error: '用户名要求以字母开头的单词字符' }" class="form-control" placeholder="请填写用户名">
                    </div>
                    <div class="form-group">
                        <label class="control-label">密码</label>
                        <input type="password" v-model.trim="password" id="password" v-validator.input.required="{ regex: /^\w{6,16}$/, error: '密码要求 6 ~ 16 个单词字符' }"  class="form-control" placeholder="请填写密码">
                    </div>
                    <div class="form-group">
                        <label class="control-label">确认密码</label>
                        <input type="password" v-model.trim="confirm" v-validator.input.required="{target:'#password'}" class="form-control" placeholder="请填写确认密码">
                    </div>
                    <div class="form-group">
                        <label class="control-label">图片验证码</label>
                        <input type="text" v-model.trim="captcha" v-validator.input.required="{title:'图片验证码'}"  class="form-control" placeholder="请填写验证码">
                    </div>
                    <div class="thumbnail" title="点击图片重新获取验证码">
                        <div class="captcha"></div>
                    </div>
                    <button type="submit" @click="register" class="btn btn-lg btn-success btn-block">
                        <i class="fa fa-btn fa-sign-in"></i> 注册
                    </button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import ls from '@/utils/localStorage';
    export default {
        name: "register",
        data(){
            return {
                username:'',
                password:'',
                confirm:'',
                captcha:'',
                msg:'',
                msgType:'',
                msgShow:false,
            };
        },
        methods:{
            register(e){
                this.$nextTick(() => {
                    const target = e.target.type === 'submit' ? e.target : e.target.parentElement

                    if (target.canSubmit) {
                        this.submit()
                    }
                })
            },
            submit(){
                const user = {
                    name: this.username,
                    password: this.password,
                    avatar: `https://api.adorable.io/avatars/200/${this.username}.png`
                }
                const localUser = ls.getItem('user')

                if (localUser) {
                    if (localUser.name === user.name) {
                        this.showMsg('用户名已存在')
                    } else {
                        this.login(user)
                    }
                } else {
                    this.login(user)
                }
            },
            login(user){
                ls.setItem('user', user)
                this.showMsg('注册成功')
            },
            showMsg(msg,type = 'warning'){
                this.msg = msg;
                this.msgType = type;
                this.msgShow = false;
                this.$nextTick(() => {
                    this.msgShow = true
                })
            }
        },
        created(){

        },

    }
</script>

<style scoped>
    .thumbnail { width: 170px; margin-top: 10px; cursor: pointer;}
    .thumbnail .captcha { height: 46px; background: #E1E6E8;}
</style>
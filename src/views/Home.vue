<template>
    <div>
        <Message :show.sync="msgShow" :type="msgType" :msg="msg" />
    </div>
</template>

<script>
    export default {
        name: "home",
        data(){
            return {
                msg:'',
                msgType:'',
                msgShow:false
            }
        },
        beforeRouteEnter(to, from, next) {
            const fromName = from.name
            const logout = to.params.logout
            next(vm => {

                if (vm.$store.state.login.auth) {
                    switch (fromName) {
                        case 'Register':
                            vm.showMsg('注册成功')
                            break
                    }
                } else if(logout){
                    vm.showMsg('操作成功')
                }
            })
        },
        computed:{
            auth(){
                return this.$store.state.login.auth;
            }
        },
        watch: {
            // 监听 auth，它的值变为 false 时，显示操作成功提示
            auth(value) {
                if (!value) {
                    this.showMsg('操作成功')
                }
            }
        },
        methods:{
            showMsg(msg,type = "success"){
                this.msg = msg;
                this.msgType = type;
                this.msgShow = true;
            }
        }
    }
</script>

<style scoped>

</style>
import router from "../../router";

export const loginAction = {
    login({ commit }, user) {
        if (user) commit('UPDATE_USER', user)
        // 更新当前用户的登录状态为已登录
        commit('UPDATE_AUTH', true)
        router.push('/')
    },
    logout({ commit }){
        commit('UPDATE_AUTH', false)
        router.push({name:'Home',params:{logout:true}})
    }
}
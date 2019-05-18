import Vue from 'vue'
import Vuex from 'vuex'
import ls from '../utils/localStorage'
import router from '../router'

Vue.use(Vuex)

import login from './modules/login'


const store = new Vuex.Store({
    modules:{
        login
    }
})

export default store
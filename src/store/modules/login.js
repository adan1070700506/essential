import ls from "../../utils/localStorage";
import {loginMutation} from "../mutations/login";
import {loginAction} from "../actions/login";

const login = {
    state:{
        user: ls.getItem('user'),
        auth: ls.getItem('auth'),
    },
    mutations:loginMutation,
    actions:loginAction
}
export default login;
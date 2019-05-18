import ls from "../../utils/localStorage";

export const loginMutation = {
    UPDATE_USER(state, user) {
        state.user = user
        ls.setItem('user', user)
    },
    UPDATE_AUTH(state, auth) {
        state.auth = auth
        ls.setItem('auth', auth)
    }
}

export const state = () => ({
    error: null
})

export const mutations = {
    setError: (state, payload) => state.error = payload,
    clearError: (state) => state.error = null
}

export const actions = {
    nuxtServerInit({dispatch}) {
        dispatch('auth/autoLogin')
    }
}

export const getters = {
   error: state => state.error 
}
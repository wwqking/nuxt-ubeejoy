export const state = () => ({
	locales: ['en', 'kr', 'zh'],
	locale: 'zh',
	userId: '123',
	loginStatus: false
})

export const mutations = {
	SET_LANG(state, locale) {
		if(state.locales.indexOf(locale) !== -1) {
			state.locale = locale
		}
	},
	INIT_USERID(state, userid) {
		if(userid) {
			state.userId = userid
		}
	},
	SET_LOGIN(state, status) {
		state.loginStatus = status
	}
}

export const getters = {
  isAuthenticated (state) {
    return state.loginStatus
  },
  loggedUser (state) {
    return state.user
  }
}
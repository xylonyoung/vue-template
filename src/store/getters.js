import { getValue } from '@/utils/get-value.js'
const getters = {
  language: state => state.app.language,
	token: state => state.user.token,
	user: state => state.user.user,
	profile: state => getValue(state, 'user.user.profile.__metadata') || {}
}
export default getters

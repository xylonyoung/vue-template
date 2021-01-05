import { getValue } from '@/utils/get-value.js'
const getters = {
  mobile: state => state.app.mobile,
  language: state => state.app.language,
  mainWidth: state => state.app.mainWidth,
  token: state => state.user.token,
  user: state => state.user.user,
  profile: state => getValue(state, 'user.user.profile.__metadata') || {},
}
export default getters

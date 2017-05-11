import Ember from 'ember'
const { get } = Ember

export default Ember.Component.extend({
  username: '',
  password: '',
  actions: {
    login () {
      get(this, 'login')(get(this, 'username'), get(this, 'password'))
    }
  }
})

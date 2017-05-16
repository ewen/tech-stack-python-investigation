import Ember from 'ember'
const { get } = Ember

export default Ember.Component.extend({
  user: {
    username: '',
    password: ''
  },
  roles: [{
    label: 'Create author',
    value: 'add_author'
  }, {
    label: 'Update author',
    value: 'change_author'
  }, {
    label: 'Delete author',
    value: 'delete_author'
  }],
  actions: {
    createUser () {
      // clone the object, so the following operations don't mess with it
      const user = JSON.parse(JSON.stringify(get(this, 'user')))
      user.roles = user.roles.filter(role => role.checked).map(role => role.value)
      get(this, 'createUser')(user)
    }
  }
})

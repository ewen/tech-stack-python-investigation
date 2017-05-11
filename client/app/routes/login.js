import Ember from 'ember'
const {get, inject} = Ember

export default Ember.Route.extend({
  session: inject.service(),
  actions: {
    login (username, password) {
      get(this, 'session').login(username, password)
        .then(() => {
          this.transitionTo('index')
        })
        .catch(() => alert('boo'))
    }
  }
})

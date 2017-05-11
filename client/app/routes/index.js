import Ember from 'ember'

const {inject, get} = Ember

export default Ember.Route.extend({
  session: inject.service(),
  actions: {
    logout () {
      return get(this, 'session').logout()
    }
  }
})

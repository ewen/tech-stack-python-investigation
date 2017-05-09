import Ember from 'ember'
const {get, set, inject} = Ember

export default Ember.Mixin.create({
  flashMessages: inject.service(),
  beforeModel (transition) {
    return get(this, 'session.currentUser').then(() => {
      if (!get(this, 'session.isAuthenticated')) {
        set(this, 'session.returnTo', transition.intent.url)
        transition.abort()
        get(this, 'flashMessages.danger')('You must be logged in to access that')
        get(this, 'session').login()
      } else {
        return this._super(...arguments)
      }
    })
  }
})

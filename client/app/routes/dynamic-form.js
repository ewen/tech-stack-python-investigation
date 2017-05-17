import Ember from 'ember'
import form from 'client/temp-fixtures/basic-form'

export default Ember.Route.extend({
  model () {
    return form
  },

  actions: {
    save (state) {
      // Todo: Strip invalid values - or leave to the server?
      // the state here may include values that are not legitimate.  For example, if you add a Reference Number
      // and then change other values that cause the reference number field to be hidden, the value remains in the state.
      // Maybe it should be stripped immediately so as not to impact other conditions, but that means if you change the
      // Reference Number field to be displayed again, then you've lost it
      // OR... we could just leave it in, send it to the server, and let the server figure it out.  We can't rely on client
      // data after all
    }
  }
})

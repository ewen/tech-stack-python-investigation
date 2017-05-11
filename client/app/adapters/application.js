import Ember from 'ember'
import DS from 'ember-data'
import ENV from 'client/config/environment'
import CSRFToken from 'client/mixins/csrf-token'

const {computed, inject, get} = Ember

export default DS.JSONAPIAdapter.extend(CSRFToken, {
  session: inject.service(),
  headers: computed('session.token', function () {
    return {
      Authorization: 'Token ' + get(this, 'session.token')
    }
  }),
  host: ENV.apiHost,
  buildURL: function (type, id, record) {
    // call the default buildURL and then append a slash
    return this._super(type, id, record) + '/'
  },
  handleResponse: function (status, headers, payload) {
    if (status >= 400 && status < 500 && payload.errors) {
      if (payload.errors[0].code === 'AUTHORIZATION_REQUIRED') {
        return get(this, 'session').logout()
      }
      return new DS.InvalidError(payload.errors)
    }
    return this._super(...arguments)
  }
})

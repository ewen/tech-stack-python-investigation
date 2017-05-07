import DS from 'ember-data'
import ENV from 'client/config/environment'
import CSRFToken from 'client/mixins/csrf-token'

export default DS.JSONAPIAdapter.extend(CSRFToken, {
  host: ENV.apiHost,
  buildURL: function (type, id, record) {
    // call the default buildURL and then append a slash
    return this._super(type, id, record) + '/'
  }
})

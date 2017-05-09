import DS from 'ember-data'
import Ember from 'ember'
import ENV from 'client/config/environment'

const {computed, inject, get} = Ember

export default DS.JSONAPIAdapter.extend({
  session: inject.service(),
  headers: computed('session.token', function () {
    return {
      Authorization: 'Token ' + get(this, 'session.token')
    }
  }),
  host: ENV.apiHost,
  buildURL: function(type, id, record) {
     //call the default buildURL and then append a slash
     return this._super(type, id, record) + '/';
   }
});

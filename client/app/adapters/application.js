import DS from 'ember-data';
import ENV from 'client/config/environment';
export default DS.JSONAPIAdapter.extend({
   host: ENV.apiHost,
   buildURL: function(type, id, record) {
     //call the default buildURL and then append a slash
     return this._super(type, id, record) + '/';
   }
});

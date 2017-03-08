import DS from 'ember-data'
import Ember from 'ember'

export default DS.JSONAPISerializer.extend({
  keyForAttribute: function (attr) {
    return Ember.String.decamelize(attr)
  },
  keyForRelationship: function (key) {
    return Ember.String.camelize(key)
  }
})

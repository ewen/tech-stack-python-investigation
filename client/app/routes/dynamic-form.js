import Ember from 'ember'
import form from 'client/temp-fixtures/basic-form'

export default Ember.Route.extend({
  model () {
    return form
  }
})

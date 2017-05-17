import Ember from 'ember'
const { computed, get } = Ember
// import DynamicComponent from 'client/mixins/components/dynamic-component'

export default Ember.Component.extend({
  // Text elements need the value to be updated as you type in order to update
  value: computed('state', 'component.name', function () {
    const updated = get(this, 'state').find(item => item.name === get(this, 'component.name'))
    return updated.value
  }),

  actions: {
    updateState (value) {
      get(this, 'updateState')(get(this, 'component'), value)
    }
  }
})

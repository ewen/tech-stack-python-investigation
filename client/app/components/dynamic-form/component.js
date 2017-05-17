import Ember from 'ember'
const { set, get } = Ember

export default Ember.Component.extend({
  actions: {
    updateState (component, value) {
      const state = get(this, 'form.state')
      const updated = state.find(item => item.name === component.name)
      set(updated, 'value', value)
      set(this, 'form.state', JSON.parse(JSON.stringify(state)))
    }
  }
})

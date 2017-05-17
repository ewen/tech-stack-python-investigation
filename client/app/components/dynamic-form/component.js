import Ember from 'ember'
const { set, get, copy } = Ember

export default Ember.Component.extend({
  actions: {
    updateState (component, value, index) {
      const state = copy(get(this, 'form.state'), true)

      if (state[component.name]) {
        state[component.name][index] = value
      } else {
        // The element is not in the state, so we need to add it
        state[component.name] = [value]
      }
      set(this, 'form.state', state)
    }
  }
})

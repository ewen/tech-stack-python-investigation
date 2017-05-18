import Ember from 'ember'
import { buildState } from 'client/utils/dynamic-forms-utils'

const { set, get, copy } = Ember

export default Ember.Component.extend({
  // Want to populate the initial state with any missing items.  Might not be necessary if the server does this for us,
  // but no bad thing to have
  didReceiveAttrs () {
    set(this, 'form.state', buildState(get(this, 'form.state'), get(this, 'form.components')))
  },

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

/**
 * Text areas may need to include a unit (e.g. meters) after the input
 * Conditionally required
 */

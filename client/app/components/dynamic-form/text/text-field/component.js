import Ember from 'ember'
const { get, set } = Ember

export default Ember.Component.extend({
  value: null,
  init () {
    this._super(...arguments)
    const componentName = get(this, 'component.name')
    const newVal = get(this, `state.${componentName}`).objectAt(get(this, 'index'))
    set(this, 'value', newVal)
  },

  actions: {
    updateState (index, value) {
      set(this, 'value', value)
      get(this, 'updateState')(get(this, 'component'), value, index)
    }
  }
})


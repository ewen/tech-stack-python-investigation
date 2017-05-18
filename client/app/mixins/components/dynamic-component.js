import Ember from 'ember'

const { computed, get, observer } = Ember

export default Ember.Mixin.create({
  values: [],

  init () {
    this._super()
    this.conditionalSetValues()
  },

  display: computed('state', 'component.{name,conditions}', function () {
    const conditions = get(this, 'component.conditions')
    const state = get(this, 'state')
    if (!conditions || conditions.length === 0) return true

    // todo: move to lodash at some point
    const keys = Object.keys(state)
    return conditions.every(condition => {
      const target = keys.find(key => key === condition.name)
      // Purposeful non-strict compare so we don't fall foul of "string or number" type issues
      // Also, note that we only use the first element.  Not sure yet how we would handle a condition with repeated elements
      return (state[target][0] == condition.value) // eslint-disable-line eqeqeq
    })
  }),

  // Text elements need the value to be updated as you type in order to update
  valuesObserver: observer('state', 'component.name', function () {
    this.conditionalSetValues()
  }),

  actions: {
    updateState (index, selectedItem) {
      // Need a custom updateState to pick the value off the selectedItem
      get(this, 'updateState')(get(this, 'component'), selectedItem.value, index)
    },
    add () {
      get(this, 'updateState')(get(this, 'component'), null, get(this, 'values.length'))
    }
  }
})

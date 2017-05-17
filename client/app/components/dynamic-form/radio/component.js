import Ember from 'ember'
import DynamicComponent from 'client/mixins/components/dynamic-component'
const { get, set } = Ember

export default Ember.Component.extend(DynamicComponent, {
  // select and radio elements will throw an error if you keep the value updated with a computed property due
  // to a double render.  The control represents the new value, without the 'value' being kept in sync, so can
  // get away with just setting on init
  init () {
    this._super()
    this.conditionalSetValues()
  },

  conditionalSetValues () {
    set(this, 'values', get(this, `state.${get(this, 'component.name')}`).map(val => {
      return get(this, 'component.options').find(option => option.value === val)
    }))
  },

  actions: {
    updateState (index, selectedItem) {
      // Need a custom updateState to pick the value off the selectedItem
      get(this, 'updateState')(get(this, 'component'), selectedItem.value, index)
    }
  }
})

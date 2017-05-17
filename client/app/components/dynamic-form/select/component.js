import Ember from 'ember'
const { get, set } = Ember

export default Ember.Component.extend({
  // select and radio elements will throw an error if you keep the value updated with a computed property due
  // to a double render.  The control represents the new value, without the 'value' being kept in sync, so can
  // get away with just setting on init
  init () {
    this._super()
    const updated = get(this, 'state').find(item => item.name === get(this, 'component.name'))
    set(this, 'value', get(this, 'component.options').find(option => option.value === updated.value))
  },
  actions: {
    updateState (selectedItem) {
      // Need a custom updateState to pick the value off the selectedItem
      get(this, 'updateState')(get(this, 'component'), selectedItem.value)
    }
  }
})

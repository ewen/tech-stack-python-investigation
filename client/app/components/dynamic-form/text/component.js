import Ember from 'ember'
const { get, set } = Ember
import DynamicComponent from 'client/mixins/components/dynamic-component'

export default Ember.Component.extend(DynamicComponent, {

  conditionalSetValues () {
    const componentName = get(this, 'component.name')
    const stateItem = get(this, `state.${componentName}`)
    if (stateItem.length !== get(this, 'values.length')) {
      set(this, 'values', stateItem)
    }
  },
  init () {
    this._super(...arguments)
    this.conditionalSetValues()
  }

})

// Each component is responsible for
// - Deciding whether it should be rendered or not based on conditions
// - Providing the right data to be updated on change
// - Rendering multiple versions when repeatable

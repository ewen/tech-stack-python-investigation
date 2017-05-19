import Ember from 'ember'
const { get } = Ember

export function getSubstate ([state, component, index]) {
  const wholeComponentState = get(state, component.name)
  return wholeComponentState.objectAt(index)
}

export default Ember.Helper.helper(getSubstate)

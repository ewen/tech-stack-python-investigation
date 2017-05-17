// import Ember from 'ember'
// const { set, get } = Ember
//
// export default Ember.Mixin.create({
//   // value: computed('state', 'component.name', function () {
//   //   const updated = get(this, 'state').find(item => item.name === get(this, 'component.name'))
//   //   return updated.value
//   // }),
//
//   init () {
//     this._super(...arguments)
//     const updated = get(this, 'state').find(item => item.name === get(this, 'component.name'))
//     set(this, 'value', updated.value)
//   },
//
//   actions: {
//     updateState (value) {
//       get(this, 'updateState')(get(this, 'component'), value)
//     }
//   }
// })

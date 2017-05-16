import Ember from 'ember'
import Headers from 'client/mixins/request-headers'
const {get} = Ember

export default Ember.Route.extend(Headers, {
  actions: {
    createUser (user) {
      Ember.$.ajax({
        type: 'POST',
        url: '/api/register',
        headers: get(this, 'headers'),
        data: user
      })
        .then(() => {
          this.transitionTo('login')
        })
        .catch((err) => {
          alert('Faild to create user')
        })
    }
  }
})

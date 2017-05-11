import Ember from 'ember'

const {computed, inject, get} = Ember

// Note: this code will likely break once we have multiple cookies and values, but is a starter for 10
const cookieFragments = document.cookie.split('=')
const csrfToken = cookieFragments[cookieFragments.indexOf('csrftoken') + 1]

export default Ember.Mixin.create({
  session: inject.service(),
  headers: computed('session.token', function () {
    const headers = {
      'x-csrftoken': csrfToken
    }
    if (get(this, 'session.token')) {
      headers.Authorization = 'Token ' + get(this, 'session.token')
    }
    return headers
  })
})

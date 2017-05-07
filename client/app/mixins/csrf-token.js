import Ember from 'ember'

// Note: this code will likely break once we have multiple cookies and values, but is a starter for 10
const cookieFragments = document.cookie.split('=')
const csrfToken = cookieFragments[cookieFragments.indexOf('csrftoken') + 1]

export default Ember.Mixin.create({
  headers: {
    'x-csrftoken': csrfToken
  }
})

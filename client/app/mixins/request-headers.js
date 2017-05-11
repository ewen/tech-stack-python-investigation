import Ember from 'ember'

const {computed, inject, get} = Ember

export default Ember.Mixin.create({
  session: inject.service(),
  cookies: inject.service(),
  headers: computed('session.token', function () {
    const headers = {}

    const csrfToken = get(this, 'cookies').read('csrftoken')
    if (csrfToken) headers['x-csrftoken'] = csrfToken

    const authToken = get(this, 'cookies').read('authtoken')
    if (authToken) headers['Authorization'] = `Token ${authToken}`

    return headers
  })
})

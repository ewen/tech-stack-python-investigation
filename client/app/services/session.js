import Ember from 'ember'
import AjaxService from 'ember-ajax/services/ajax'
import ENV from 'client/config/environment'
import RequestHeaders from 'client/mixins/request-headers'
const { inject, set, computed, get } = Ember

// const CurrentUserProxy = Ember.ObjectProxy.extend(Ember.PromiseProxyMixin)
// CurrentUserProxy[NAME_KEY] = 'current-user'

export default AjaxService.extend(RequestHeaders, {
  store: inject.service(),
  cookies: inject.service(),
  // nameNumber: inject.service(),
  returnTo: '',
  userId: computed.alias('currentUser.id').readOnly(),
  isAuthenticated: computed.bool('userId'),

  // currentUser: computed(function () {
  //   return CurrentUserProxy.create({
  //     promise: this.request('water-users/me')
  //       .then((userJSON) => {
  //         get(this, 'store').pushPayload('water-user', userJSON)
  //         return get(this, 'store').peekRecord('water-user', userJSON.data.id)
  //       })
  //       .catch((err) => {
  //         return err
  //       })
  //   })
  // }).readOnly(),

  // currentUserCINameNumbersPromise: computed('currentUser', function () {
  //   return get(this, 'nameNumber').getCINameNumbersForEmailAddress(get(this, 'currentUser.email'))
  //     .then(results => {
  //       return results
  //     })
  //     .catch(() => '')
  // }),

  // loginPath: computed('returnTo', function () {
  //   return get(this, 'returnTo') ? `/login?returnTo=${get(this, 'returnTo')}` : '/login'
  // }),

  login (username, password) {
    // window.location.assign(get(this, 'loginPath'))
    return this.post(`${ENV.apiHost}/api-auth-token`, {data: {username, password}})
      .then(data => {
        get(this, 'cookies').write('authtoken', data.token)
        set(this, 'token', data.token)
        return
      })
  },

  logout () {
    get(this, 'cookies').clear('authtoken')
    set(this, 'token', undefined)
    window.location.assign('/')
  },

  changePassword () {
    window.location.assign('/change-password')
  }
})

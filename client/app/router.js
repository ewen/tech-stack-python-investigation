import Ember from 'ember'
import config from './config/environment'

const Router = Ember.Router.extend({
  location: config.locationType,
  rootURL: config.rootURL
})

Router.map(function () {
  this.route('login', {path: '/'})
  this.route('index')
  this.route('books')
  this.route('authors')
})

export default Router

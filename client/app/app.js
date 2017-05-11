import Ember from 'ember'
import Resolver from './resolver'
import loadInitializers from 'ember-load-initializers'
import config from './config/environment'
import AuthenticatedRouteMixin from 'client/mixins/authenticated-route-mixin'

let App

Ember.MODEL_FACTORY_INJECTIONS = true

App = Ember.Application.extend({
  modulePrefix: config.modulePrefix,
  podModulePrefix: config.podModulePrefix,
  Resolver
})

loadInitializers(App, config.modulePrefix)

// Ember.UnprotectedRoute = Ember.Route
// Ember.Route = Ember.Route.extend(AuthenticatedRouteMixin)

export default App


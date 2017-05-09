import Ember from 'ember'

export default Ember.Route.extend({
  model () {
    return {
      authors: this.get('store').findAll('author', {include: 'books,books.genre'}),
      newAuthor: this.get('store').createRecord('author')
    }
  },

  actions: {
    saveAuthor (author) {
      author.save()
        .then(() => alert('success'))
        .catch(e => alert('failed with ', e))
    }
  }
})

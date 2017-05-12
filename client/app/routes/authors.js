import Ember from 'ember'
const { set } = Ember

export default Ember.Route.extend({
  model () {
    return {
      authors: this.get('store').findAll('author', {include: 'books,books.genre'}),
      newAuthor: this.get('store').createRecord('author'),
      filters: {}
    }
  },

  actions: {
    saveAuthor (author) {
      author.save()
        .then(() => alert('success'))
        .catch(e => alert('failed with ', e))
    },

    search (filters) {
      this.get('store').query('author', {name__icontains: filters.name, include: 'books,books.genre'})
        .then(authors => set(this, 'controller.model.authors', authors))
    }
  }
})

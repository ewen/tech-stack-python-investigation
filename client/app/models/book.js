import Ember from 'ember';
import DS from 'ember-data';

const {computed, get} = Ember;
const {attr, belongsTo} = DS;

export default DS.Model.extend({
  title: attr('string'),
  pubDate: attr('date'),
  author: belongsTo(),
  genre: belongsTo(),
  displayPubDate: computed('pubDate', function () {
    const d = get(this, 'pubDate')
    return `${d.getDate()}/${d.getMonth() + 1}/${d.getFullYear()}`;
  })
});

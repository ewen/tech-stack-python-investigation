import DS from 'ember-data';

const {attr} = DS

export default DS.Model.extend({
  title: attr('string'),
  pubDate: attr('date')
});

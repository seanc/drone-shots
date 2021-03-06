var keystone = require('keystone');

exports = module.exports = function(req, res) {
  
  var view = new keystone.View(req, res);
  var locals = res.locals;
  
  locals.section = 'videos';
  
  view.query('videos', keystone.list('Video').model.find().sort('sortOrder'));
  
  view.render('videos');  
};
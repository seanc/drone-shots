var keystone = require('keystone');

exports = module.exports = function(req, res) {
  
  var view = new keystone.View(req, res);
  var locals = res.locals;
  
  locals.section = 'about';
  
  view.query('about', keystone.list('About').model.find('sortOrder'));
  
  view.render('about');
}
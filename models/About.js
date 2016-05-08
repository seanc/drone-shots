var keystone = require('keystone');
var Types = keystone.Field.Types;

var About = new keystone.List('About', {
  autokey: {
    from: 'name',
    path: 'key'
  }
});

About.add({
  name: {
    type: String,
    required: true,
    label: 'Description Name'
  },
  avatar: {
    type: Types.CloudinaryImage
  },
  enabled: {
    type: Types.Boolean,
    label: 'Enabled'
  },
  content: {
    type: Types.Markdown,
    label: 'Description'
  }
});

About.register();
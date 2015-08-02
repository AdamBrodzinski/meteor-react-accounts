Package.describe({
  name: 'skinnygeek1010:react-accounts',
  version: '0.1.0',
  summary: 'React Accounts',
  git: 'https://github.com/AdamBrodzinski/meteor-react-accounts.git',
  documentation: 'README.md'
});

Package.onUse(function(api) {
  api.versionsFrom('1.0');
  api.use('react');
  api.addFiles('ra-login.js');
  api.export('ReactAccounts');
});

const serverSuffix = 'data-stats-system';
const serverUrl = process.env.NODE_ENV === 'production' ? `${window.location.protocol}//${process.env.SERVER_ENV}` : '';
const appName = 'DBOPlatform';
const appAuthor = 'liuwzhb';
const authorEmail = 'liuwzhb@yonyou.com';

module.exports = {
  serverSuffix,
  serverUrl,
  appName,
  appAuthor,
  authorEmail,
};

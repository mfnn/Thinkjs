const view = require('think-view');
const model = require('think-model');
const cache = require('think-cache');
const session = require('think-session');
const mongo = require('think-mongo');

module.exports = [
  view, // make application support view
  model(think.app),  ////将 think.app 传递给 model 扩展
  mongo(think.app),
  cache,
  session
];

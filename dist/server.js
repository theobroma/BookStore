'use strict';

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _fs = require('fs');

var _fs2 = _interopRequireDefault(_fs);

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _bodyParser = require('body-parser');

var _bodyParser2 = _interopRequireDefault(_bodyParser);

var _serveFavicon = require('serve-favicon');

var _serveFavicon2 = _interopRequireDefault(_serveFavicon);

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

var _morgan = require('morgan');

var _morgan2 = _interopRequireDefault(_morgan);

var _decodedId = require('./middlewares/decodedId');

var _decodedId2 = _interopRequireDefault(_decodedId);

var _books = require('./routes/books');

var _books2 = _interopRequireDefault(_books);

var _genres = require('./routes/genres');

var _genres2 = _interopRequireDefault(_genres);

var _users = require('./routes/users');

var _users2 = _interopRequireDefault(_users);

var _authors = require('./routes/authors');

var _authors2 = _interopRequireDefault(_authors);

var _auth = require('./routes/auth');

var _auth2 = _interopRequireDefault(_auth);

var _profile = require('./routes/profile');

var _profile2 = _interopRequireDefault(_profile);

var _cart = require('./routes/cart');

var _cart2 = _interopRequireDefault(_cart);

var _log = require('./routes/log');

var _log2 = _interopRequireDefault(_log);

var _config = require('../etc/config.json');

var _config2 = _interopRequireDefault(_config);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var app = (0, _express2.default)();
// server routes


app.set('port', process.env.PORT || 8080);
_mongoose2.default.Promise = global.Promise;
var mongoUri = process.env.MONGOLAB_URI || 'mongodb://' + _config2.default.db.host + ':' + _config2.default.db.port + '/' + _config2.default.db.name;

/* mongoose.connect(`mongodb://${config.db.host}:${config.db.port}/${config.db.name}`);*/

_mongoose2.default.connect(mongoUri, function (error) {
  if (error) console.error(error);else console.log('mongo connected');
});

app.use(_decodedId2.default);
app.use((0, _morgan2.default)('dev'));
app.use(_bodyParser2.default.json());
app.use(_bodyParser2.default.urlencoded({ extended: true }));

app.use((0, _serveFavicon2.default)(_path2.default.join(__dirname, 'public', 'build', 'favicon.png')));
app.use(_express2.default.static(_path2.default.join(__dirname, 'public', 'build')));

// All routes in the end
app.use('/api/books', _books2.default);
app.use('/api/genres', _genres2.default);
app.use('/api/users', _users2.default);
app.use('/api/authors', _authors2.default);
app.use('/api/auth', _auth2.default);
app.use('/api/profile', _profile2.default);
app.use('/api/cart', _cart2.default);
app.use('/api/log', _log2.default);

// Redirect all non api requests to the index
app.get('*', function (req, res) {
  res.sendFile(_path2.default.join(__dirname, 'public', 'build', 'index.html'));
});

app.listen(app.get('port'), function () {
  console.log('Node app is running on port', app.get('port'));
});

module.exports = app;
//# sourceMappingURL=server.js.map
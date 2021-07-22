(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["vendors~reactPlayerYouTube"],{

/***/ "./node_modules/react-player/lazy/players/YouTube.js":
/*!***********************************************************!*\
  !*** ./node_modules/react-player/lazy/players/YouTube.js ***!
  \***********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nObject.defineProperty(exports, \"__esModule\", {\n  value: true\n});\nexports[\"default\"] = void 0;\n\nvar _react = _interopRequireWildcard(__webpack_require__(/*! react */ \"./node_modules/react/index.js\"));\n\nvar _utils = __webpack_require__(/*! ../utils */ \"./node_modules/react-player/lazy/utils.js\");\n\nvar _patterns = __webpack_require__(/*! ../patterns */ \"./node_modules/react-player/lazy/patterns.js\");\n\nfunction _getRequireWildcardCache() { if (typeof WeakMap !== \"function\") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }\n\nfunction _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== \"object\" && typeof obj !== \"function\") { return { \"default\": obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj[\"default\"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }\n\nfunction _typeof(obj) { \"@babel/helpers - typeof\"; if (typeof Symbol === \"function\" && typeof Symbol.iterator === \"symbol\") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === \"function\" && obj.constructor === Symbol && obj !== Symbol.prototype ? \"symbol\" : typeof obj; }; } return _typeof(obj); }\n\nfunction ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }\n\nfunction _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }\n\nfunction _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }\n\nfunction _nonIterableRest() { throw new TypeError(\"Invalid attempt to destructure non-iterable instance.\\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.\"); }\n\nfunction _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === \"string\") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === \"Object\" && o.constructor) n = o.constructor.name; if (n === \"Map\" || n === \"Set\") return Array.from(o); if (n === \"Arguments\" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }\n\nfunction _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }\n\nfunction _iterableToArrayLimit(arr, i) { if (typeof Symbol === \"undefined\" || !(Symbol.iterator in Object(arr))) return; var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i[\"return\"] != null) _i[\"return\"](); } finally { if (_d) throw _e; } } return _arr; }\n\nfunction _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }\n\nfunction _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError(\"Cannot call a class as a function\"); } }\n\nfunction _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if (\"value\" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }\n\nfunction _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }\n\nfunction _inherits(subClass, superClass) { if (typeof superClass !== \"function\" && superClass !== null) { throw new TypeError(\"Super expression must either be null or a function\"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }\n\nfunction _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }\n\nfunction _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }\n\nfunction _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === \"object\" || typeof call === \"function\")) { return call; } return _assertThisInitialized(self); }\n\nfunction _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError(\"this hasn't been initialised - super() hasn't been called\"); } return self; }\n\nfunction _isNativeReflectConstruct() { if (typeof Reflect === \"undefined\" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === \"function\") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }\n\nfunction _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }\n\nfunction _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }\n\nvar SDK_URL = 'https://www.youtube.com/iframe_api';\nvar SDK_GLOBAL = 'YT';\nvar SDK_GLOBAL_READY = 'onYouTubeIframeAPIReady';\nvar MATCH_PLAYLIST = /[?&](?:list|channel)=([a-zA-Z0-9_-]+)/;\nvar MATCH_USER_UPLOADS = /user\\/([a-zA-Z0-9_-]+)\\/?/;\nvar MATCH_NOCOOKIE = /youtube-nocookie\\.com/;\nvar NOCOOKIE_HOST = 'https://www.youtube-nocookie.com';\n\nvar YouTube = /*#__PURE__*/function (_Component) {\n  _inherits(YouTube, _Component);\n\n  var _super = _createSuper(YouTube);\n\n  function YouTube() {\n    var _this;\n\n    _classCallCheck(this, YouTube);\n\n    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {\n      args[_key] = arguments[_key];\n    }\n\n    _this = _super.call.apply(_super, [this].concat(args));\n\n    _defineProperty(_assertThisInitialized(_this), \"callPlayer\", _utils.callPlayer);\n\n    _defineProperty(_assertThisInitialized(_this), \"parsePlaylist\", function (url) {\n      if (url instanceof Array) {\n        return {\n          listType: 'playlist',\n          playlist: url.map(_this.getID).join(',')\n        };\n      }\n\n      if (MATCH_PLAYLIST.test(url)) {\n        var _url$match = url.match(MATCH_PLAYLIST),\n            _url$match2 = _slicedToArray(_url$match, 2),\n            playlistId = _url$match2[1];\n\n        return {\n          listType: 'playlist',\n          list: playlistId.replace(/^UC/, 'UU')\n        };\n      }\n\n      if (MATCH_USER_UPLOADS.test(url)) {\n        var _url$match3 = url.match(MATCH_USER_UPLOADS),\n            _url$match4 = _slicedToArray(_url$match3, 2),\n            username = _url$match4[1];\n\n        return {\n          listType: 'user_uploads',\n          list: username\n        };\n      }\n\n      return {};\n    });\n\n    _defineProperty(_assertThisInitialized(_this), \"onStateChange\", function (event) {\n      var data = event.data;\n      var _this$props = _this.props,\n          onPlay = _this$props.onPlay,\n          onPause = _this$props.onPause,\n          onBuffer = _this$props.onBuffer,\n          onBufferEnd = _this$props.onBufferEnd,\n          onEnded = _this$props.onEnded,\n          onReady = _this$props.onReady,\n          loop = _this$props.loop,\n          _this$props$config = _this$props.config,\n          playerVars = _this$props$config.playerVars,\n          onUnstarted = _this$props$config.onUnstarted;\n      var _window$SDK_GLOBAL$Pl = window[SDK_GLOBAL].PlayerState,\n          UNSTARTED = _window$SDK_GLOBAL$Pl.UNSTARTED,\n          PLAYING = _window$SDK_GLOBAL$Pl.PLAYING,\n          PAUSED = _window$SDK_GLOBAL$Pl.PAUSED,\n          BUFFERING = _window$SDK_GLOBAL$Pl.BUFFERING,\n          ENDED = _window$SDK_GLOBAL$Pl.ENDED,\n          CUED = _window$SDK_GLOBAL$Pl.CUED;\n      if (data === UNSTARTED) onUnstarted();\n\n      if (data === PLAYING) {\n        onPlay();\n        onBufferEnd();\n      }\n\n      if (data === PAUSED) onPause();\n      if (data === BUFFERING) onBuffer();\n\n      if (data === ENDED) {\n        var isPlaylist = !!_this.callPlayer('getPlaylist'); // Only loop manually if not playing a playlist\n\n        if (loop && !isPlaylist) {\n          if (playerVars.start) {\n            _this.seekTo(playerVars.start);\n          } else {\n            _this.play();\n          }\n        }\n\n        onEnded();\n      }\n\n      if (data === CUED) onReady();\n    });\n\n    _defineProperty(_assertThisInitialized(_this), \"mute\", function () {\n      _this.callPlayer('mute');\n    });\n\n    _defineProperty(_assertThisInitialized(_this), \"unmute\", function () {\n      _this.callPlayer('unMute');\n    });\n\n    _defineProperty(_assertThisInitialized(_this), \"ref\", function (container) {\n      _this.container = container;\n    });\n\n    return _this;\n  }\n\n  _createClass(YouTube, [{\n    key: \"componentDidMount\",\n    value: function componentDidMount() {\n      this.props.onMount && this.props.onMount(this);\n    }\n  }, {\n    key: \"getID\",\n    value: function getID(url) {\n      if (!url || url instanceof Array || MATCH_PLAYLIST.test(url)) {\n        return null;\n      }\n\n      return url.match(_patterns.MATCH_URL_YOUTUBE)[1];\n    }\n  }, {\n    key: \"load\",\n    value: function load(url, isReady) {\n      var _this2 = this;\n\n      var _this$props2 = this.props,\n          playing = _this$props2.playing,\n          muted = _this$props2.muted,\n          playsinline = _this$props2.playsinline,\n          controls = _this$props2.controls,\n          loop = _this$props2.loop,\n          config = _this$props2.config,\n          _onError = _this$props2.onError;\n      var playerVars = config.playerVars,\n          embedOptions = config.embedOptions;\n      var id = this.getID(url);\n\n      if (isReady) {\n        if (MATCH_PLAYLIST.test(url) || MATCH_USER_UPLOADS.test(url) || url instanceof Array) {\n          this.player.loadPlaylist(this.parsePlaylist(url));\n          return;\n        }\n\n        this.player.cueVideoById({\n          videoId: id,\n          startSeconds: (0, _utils.parseStartTime)(url) || playerVars.start,\n          endSeconds: (0, _utils.parseEndTime)(url) || playerVars.end\n        });\n        return;\n      }\n\n      (0, _utils.getSDK)(SDK_URL, SDK_GLOBAL, SDK_GLOBAL_READY, function (YT) {\n        return YT.loaded;\n      }).then(function (YT) {\n        if (!_this2.container) return;\n        _this2.player = new YT.Player(_this2.container, _objectSpread({\n          width: '100%',\n          height: '100%',\n          videoId: id,\n          playerVars: _objectSpread(_objectSpread({\n            autoplay: playing ? 1 : 0,\n            mute: muted ? 1 : 0,\n            controls: controls ? 1 : 0,\n            start: (0, _utils.parseStartTime)(url),\n            end: (0, _utils.parseEndTime)(url),\n            origin: window.location.origin,\n            playsinline: playsinline ? 1 : 0\n          }, _this2.parsePlaylist(url)), playerVars),\n          events: {\n            onReady: function onReady() {\n              if (loop) {\n                _this2.player.setLoop(true); // Enable playlist looping\n\n              }\n\n              _this2.props.onReady();\n            },\n            onStateChange: _this2.onStateChange,\n            onError: function onError(event) {\n              return _onError(event.data);\n            }\n          },\n          host: MATCH_NOCOOKIE.test(url) ? NOCOOKIE_HOST : undefined\n        }, embedOptions));\n      }, _onError);\n\n      if (embedOptions.events) {\n        console.warn('Using `embedOptions.events` will likely break things. Use ReactPlayer’s callback props instead, eg onReady, onPlay, onPause');\n      }\n    }\n  }, {\n    key: \"play\",\n    value: function play() {\n      this.callPlayer('playVideo');\n    }\n  }, {\n    key: \"pause\",\n    value: function pause() {\n      this.callPlayer('pauseVideo');\n    }\n  }, {\n    key: \"stop\",\n    value: function stop() {\n      if (!document.body.contains(this.callPlayer('getIframe'))) return;\n      this.callPlayer('stopVideo');\n    }\n  }, {\n    key: \"seekTo\",\n    value: function seekTo(amount) {\n      this.callPlayer('seekTo', amount);\n\n      if (!this.props.playing) {\n        this.pause();\n      }\n    }\n  }, {\n    key: \"setVolume\",\n    value: function setVolume(fraction) {\n      this.callPlayer('setVolume', fraction * 100);\n    }\n  }, {\n    key: \"setPlaybackRate\",\n    value: function setPlaybackRate(rate) {\n      this.callPlayer('setPlaybackRate', rate);\n    }\n  }, {\n    key: \"setLoop\",\n    value: function setLoop(loop) {\n      this.callPlayer('setLoop', loop);\n    }\n  }, {\n    key: \"getDuration\",\n    value: function getDuration() {\n      return this.callPlayer('getDuration');\n    }\n  }, {\n    key: \"getCurrentTime\",\n    value: function getCurrentTime() {\n      return this.callPlayer('getCurrentTime');\n    }\n  }, {\n    key: \"getSecondsLoaded\",\n    value: function getSecondsLoaded() {\n      return this.callPlayer('getVideoLoadedFraction') * this.getDuration();\n    }\n  }, {\n    key: \"render\",\n    value: function render() {\n      var display = this.props.display;\n      var style = {\n        width: '100%',\n        height: '100%',\n        display: display\n      };\n      return /*#__PURE__*/_react[\"default\"].createElement(\"div\", {\n        style: style\n      }, /*#__PURE__*/_react[\"default\"].createElement(\"div\", {\n        ref: this.ref\n      }));\n    }\n  }]);\n\n  return YouTube;\n}(_react.Component);\n\nexports[\"default\"] = YouTube;\n\n_defineProperty(YouTube, \"displayName\", 'YouTube');\n\n_defineProperty(YouTube, \"canPlay\", _patterns.canPlay.youtube);\n\n//# sourceURL=webpack:///./node_modules/react-player/lazy/players/YouTube.js?");

/***/ })

}]);
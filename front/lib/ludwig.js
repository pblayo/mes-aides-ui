/******/ (function(modules) { // webpackBootstrap
/******/    // The module cache
/******/    var installedModules = {};

/******/    // The require function
/******/    function __webpack_require__(moduleId) {

/******/        // Check if module is in cache
/******/        if(installedModules[moduleId])
/******/            return installedModules[moduleId].exports;

/******/        // Create a new module (and put it into the cache)
/******/        var module = installedModules[moduleId] = {
/******/            exports: {},
/******/            id: moduleId,
/******/            loaded: false
/******/        };

/******/        // Execute the module function
/******/        modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/        // Flag the module as loaded
/******/        module.loaded = true;

/******/        // Return the exports of the module
/******/        return module.exports;
/******/    }


/******/    // expose the modules object (__webpack_modules__)
/******/    __webpack_require__.m = modules;

/******/    // expose the module cache
/******/    __webpack_require__.c = installedModules;

/******/    // __webpack_public_path__
/******/    __webpack_require__.p = "";

/******/    // Load entry module and return exports
/******/    return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

    'use strict';

    var _ludwig = __webpack_require__(1);

    window.Ludwig = _ludwig.Ludwig;

/***/ },
/* 1 */
/***/ function(module, exports) {

    'use strict';

    Object.defineProperty(exports, "__esModule", {
        value: true
    });

    var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

    function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

    var Ludwig = function () {
        function Ludwig(configuration) {
            _classCallCheck(this, Ludwig);

            this.repoUrl = configuration.repoUrl;
            this.web = configuration.web;
            this.template = configuration.template;
            this.prefix = configuration.prefix;
            this.expectedTemplate = configuration.expectedTemplate;
            this.ludwigCreateSuggestionURL = configuration.ludwigCreateSuggestionURL;
        }

        _createClass(Ludwig, [{
            key: 'defaultSuggestionFormatter',
            value: function defaultSuggestionFormatter(template, currentState, expectedResult) {
                var result = this.template;
                if (currentState) {
                    result += '\r\n' + JSON.stringify(currentState, null, '\t');
                }
                if (expectedResult) {
                    result += '\r\n' + JSON.stringify(expectedResult, null, '\t');
                }
                return result;
            }
            /*
       @returns the URL to call to create a pull request
       */

        }, {
            key: 'generateSuggestionURL',
            value: function generateSuggestionURL(currentState, expectedResult, customSuggestionFormatter) {
                var suggestionURL = '' + this.repoUrl + this.web.addPath + '?filename=' + this.generateSuggestionName() + '&value=';

                if (customSuggestionFormatter) {
                    if (typeof customSuggestionFormatter === 'function') {
                        suggestionURL += encodeURIComponent(customSuggestionFormatter(this.template, currentState, expectedResult));
                    } else {
                        throw new Error('customSuggestionFormatter expected to be a clojure');
                    }
                } else {
                    suggestionURL += encodeURIComponent(this.defaultSuggestionFormatter(this.template, currentState, expectedResult));
                }

                return suggestionURL;
            }

            /*
       @returns a suggestion name that is generated on the fly
       using the configured prefix and the current timestamp
       */

        }, {
            key: 'generateSuggestionName',
            value: function generateSuggestionName() {
                var date = new Date();
                var suggestionName = '';
                if (this.prefix) {
                    suggestionName = this.prefix + date.getTime();
                } else {
                    suggestionName = date.getTime();
                }
                return suggestionName;
            }
        }, {
            key: 'canGenerateLudwigSuggestionEndpointURL',
            value: function canGenerateLudwigSuggestionEndpointURL(title, description, currentState, expectedState) {
                return title && description && currentState && expectedState && this.ludwigCreateSuggestionURL;
            }
        }, {
            key: 'generateLudwigSuggestionEndpointURL',
            value: function generateLudwigSuggestionEndpointURL(title, description, currentState, expectedState) {
                if (!this.canGenerateLudwigSuggestionEndpointURL(title, description, currentState, expectedState)) {
                    throw new Error('Cannot generate Ludwig suggestions creation endpoint URL');
                } else {
                    var URIEncodedState = encodeURIComponent(JSON.stringify(currentState));
                    var URIEncodedExpectedState = encodeURIComponent(expectedState);
                    var URIEncodedTitle = encodeURIComponent(title);
                    var URIEncodedDescription = encodeURIComponent(description);
                    return this.ludwigCreateSuggestionURL + '?title=' + URIEncodedTitle + '&description=' + URIEncodedDescription + '&state=' + URIEncodedState + '&expectedState=' + URIEncodedExpectedState;
                }
            }
        }, {
            key: 'acceptedTestsURL',
            value: function acceptedTestsURL() {
                return this.repoUrl + this.web.acceptedTestsPath;
            }
        }, {
            key: 'suggestedTestsURL',
            value: function suggestedTestsURL() {
                return this.repoUrl + this.web.suggestedTestsPath;
            }
        }]);

        return Ludwig;
    }();

    exports.Ludwig = Ludwig;

/***/ }
/******/ ]);

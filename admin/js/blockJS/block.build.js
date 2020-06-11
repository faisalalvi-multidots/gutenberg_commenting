/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__component_board__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__component_suggestion_sidebar__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__component_suggestion_sidebar___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1__component_suggestion_sidebar__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__component_block_extend_controls__ = __webpack_require__(4);
var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }



var __ = wp.i18n.__;
var addFilter = wp.hooks.addFilter;
var _wp$element = wp.element,
    Fragment = _wp$element.Fragment,
    Component = _wp$element.Component;
var toggleFormat = wp.richText.toggleFormat;
var RichTextToolbarButton = wp.blockEditor.RichTextToolbarButton;
var _wp$richText = wp.richText,
    registerFormatType = _wp$richText.registerFormatType,
    applyFormat = _wp$richText.applyFormat,
    removeFormat = _wp$richText.removeFormat;


function fetchComments() {

    var newNode = document.createElement('div');
    newNode.setAttribute("id", 'md-span-comments');
    newNode.setAttribute("class", 'comments-loader');
    var referenceNode = document.querySelector('.block-editor-writing-flow');
    if (null !== referenceNode) {
        referenceNode.appendChild(newNode);

        var selectedText = void 0;
        var txtselectedText = void 0;
        var allThreads = [];

        // If no comment tag exist, remove the loader and temp style tag immediately.
        var span_count = jQuery('.wp-block mdspan').length;
        if (0 === span_count) {
            jQuery('#md-span-comments').removeClass('comments-loader');
            jQuery('#loader_style').remove();
        } else {
            jQuery('.wp-block mdspan').each(function () {

                selectedText = jQuery(this).attr('datatext');

                if (jQuery('#' + selectedText).length === 0) {

                    var newNode = document.createElement('div');
                    newNode.setAttribute("id", selectedText);
                    newNode.setAttribute("class", "cls-board-outer is_active");

                    var referenceNode = document.getElementById('md-span-comments');
                    referenceNode.appendChild(newNode);

                    ReactDOM.render(wp.element.createElement(__WEBPACK_IMPORTED_MODULE_0__component_board__["a" /* default */], { datatext: selectedText, onLoadFetch: 1 }), document.getElementById(selectedText));
                }
                allThreads.push(selectedText);
            });

            var loadAttempts = 0;
            var loadComments = setInterval(function () {
                loadAttempts++;
                if (1 <= jQuery('.commentContainer').length) {
                    clearInterval(loadComments);
                    jQuery('#loader_style').remove();
                    jQuery('#md-span-comments').removeClass('comments-loader');
                }
                if (loadAttempts >= 10) {
                    clearInterval(loadComments);
                    jQuery('#loader_style').remove();
                    jQuery('#md-span-comments').removeClass('comments-loader');
                }
            }, 1000);
        }

        //jQuery('.cls-board-outer').addClass('is_active');

        // Reset Draft Comments Data.
        var CurrentPostID = wp.data.select('core/editor').getCurrentPostId();
        var data = {
            'action': 'reset_drafts_meta',
            'currentPostID': CurrentPostID
        };
        jQuery.post(ajaxurl, data, function (response) {});
    }
}

// Load.
jQuery(window).load(function () {

    // Add history button.
    var customHistoryButton = '<div class="components-dropdown custom-buttons"><button type="button" aria-expanded="false" class="components-button has-icon" aria-label="Tools"><span class="dashicons dashicons-text-page" id="history-toggle"></span></button></div>';
    jQuery('.edit-post-header-toolbar').append(customHistoryButton);

    // Add comments toggle button.
    var customCommentsToggleButton = '<div class="components-dropdown custom-buttons"><button type="button" aria-expanded="false" class="components-button has-icon" aria-label="Tools"><span class="dashicons dashicons-admin-comments" id="comments-toggle"></span></button></div>';
    jQuery('.edit-post-header-toolbar').append(customCommentsToggleButton);

    var customHistoryPopup = '<div id="custom-history-popup"></div>';
    jQuery('.edit-post-layout').append(customHistoryPopup);

    fetchComments();

    var $ = jQuery;
    $(document).on('click', '.components-notice__action', function () {

        if ('View the autosave' === $(this).text()) {
            bring_back_comments();
        }
        if ('Restore the backup' === $(this).text()) {

            setTimeout(function () {
                // Sync popups with highlighted texts.
                $('.wp-block mdspan').each(function () {
                    var selectedText = jQuery(this).attr('datatext');
                    if ($('#' + selectedText).length === 0) {
                        createBoard(selectedText, 'value', 'onChange');
                    }
                });

                bring_back_comments();
            }, 500);
        }
    });
});

function bring_back_comments() {
    var $ = jQuery;

    // Reset Draft Comments Data.
    var CurrentPostID = wp.data.select('core/editor').getCurrentPostId();
    var data = {
        'action': 'merge_draft_stacks',
        'currentPostID': CurrentPostID
    };
    $.post(ajaxurl, data, function (response) {

        response = JSON.parse(response);

        if (response.resolved) {
            $.each(response.resolved, function (k, el) {
                el = el.replace('_', '');
                $('#' + el).addClass('reverted_back resolved');
                // Hide popups if their tags don't exist.
                if (0 === $('[datatext="' + el + '"]').length) {
                    $('#' + el).hide();
                }
            });
        }

        if (response.comments) {
            $.each(response.comments, function (el, timestamps) {
                $.each(timestamps, function (el, t) {
                    $('#' + t).removeClass('publish').addClass('reverted_back added');
                    /*taking extra care to display new threads*/
                    $('head').append('<style>[id="' + t + '"]{display: block !important}</style>');
                });
            });
        }

        if (response.deleted) {
            $.each(response.deleted, function (el, timestamps) {
                $.each(timestamps, function (el, t) {
                    $('#' + t).remove();
                });
            });
        }

        if (response.edited) {
            $.each(response.edited, function (el, timestamps) {

                $.each(timestamps, function (el, t) {
                    $('#' + t).removeClass('publish').addClass('reverted_back edited');

                    // Update the component with new text.
                    var someElement = document.getElementById(t);
                    var myComp = FindReact(someElement);
                    myComp.setState({ showEditedDraft: true });

                    $('#' + t + ' .commentText').append(' <i style="font-size:12px;color:#23282dba">(edited)</i>');
                });
            });
        }
    });

    return false;
}

function FindReact(dom) {
    var traverseUp = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;

    var key = Object.keys(dom).find(function (key) {
        return key.startsWith("__reactInternalInstance$");
    });
    var domFiber = dom[key];
    if (domFiber == null) return null;

    // react <16
    if (domFiber._currentElement) {
        var _compFiber = domFiber._currentElement._owner;
        for (var i = 0; i < traverseUp; i++) {
            _compFiber = _compFiber._currentElement._owner;
        }
        return _compFiber._instance;
    }

    // react 16+
    var GetCompFiber = function GetCompFiber(fiber) {
        //return fiber._debugOwner; // this also works, but is __DEV__ only
        var parentFiber = fiber.return;
        while (typeof parentFiber.type == "string") {
            parentFiber = parentFiber.return;
        }
        return parentFiber;
    };
    var compFiber = GetCompFiber(domFiber);
    for (var _i = 0; _i < traverseUp; _i++) {
        compFiber = GetCompFiber(compFiber);
    }
    return compFiber.stateNode;
}

function createBoard(selectedText, value, onChange) {
    var referenceNode = document.getElementById('md-span-comments');
    var newNode = document.createElement('div');
    newNode.setAttribute("id", selectedText);
    newNode.setAttribute("class", "cls-board-outer is_active");

    referenceNode.appendChild(newNode);
    ReactDOM.render(wp.element.createElement(__WEBPACK_IMPORTED_MODULE_0__component_board__["a" /* default */], { datatext: selectedText, lastVal: value, onChanged: onChange }), document.getElementById(selectedText));
}

// Register Custom Format Type: Comment.
var name = 'multidots/comment';
var title = __('Comment');
var mdComment = {
    name: name,
    title: title,
    tagName: 'mdspan',
    className: 'mdspan-comment',
    attributes: {
        datatext: 'datatext',
        style: 'style'
    },
    edit: function (_Component) {
        _inherits(myClass, _Component);

        function myClass(props) {
            _classCallCheck(this, myClass);

            var _this = _possibleConstructorReturn(this, (myClass.__proto__ || Object.getPrototypeOf(myClass)).call(this, props));

            _this.onToggle = _this.onToggle.bind(_this);
            _this.getSelectedText = _this.getSelectedText.bind(_this);
            _this.storeSelectionValue = _this.storeSelectionValue.bind(_this);
            _this.removeSuggestion = _this.removeSuggestion.bind(_this);
            _this.hidethread = _this.hidethread.bind(_this);
            _this.floatComments = _this.floatComments.bind(_this);

            _this.latestValue = _this.latestBoard = '';

            return _this;
        }

        _createClass(myClass, [{
            key: 'onToggle',
            value: function onToggle() {

                var currentTime = Date.now();
                currentTime = 'el' + currentTime;
                var newNode = document.createElement('div');
                newNode.setAttribute("id", currentTime);
                newNode.setAttribute("class", 'cls-board-outer');

                var referenceNode = document.getElementById('md-span-comments');

                referenceNode.appendChild(newNode);

                var simpleCurrentPostID = wp.data.select('core/editor').getCurrentPostId();
                var _props = this.props,
                    value = _props.value,
                    onChange = _props.onChange;
                var text = value.text,
                    start = value.start,
                    end = value.end;


                var commentedOnText = text.substring(start, end);

                onChange(toggleFormat(value, { type: name }), ReactDOM.render(wp.element.createElement(__WEBPACK_IMPORTED_MODULE_0__component_board__["a" /* default */], { datatext: currentTime, onChanged: onChange, lastVal: value, freshBoard: 1, commentedOnText: commentedOnText }), document.getElementById(currentTime)));

                onChange(applyFormat(value, { type: name, attributes: { datatext: currentTime, style: 'background:#fdf0b6' } }));

                this.latestBoard = currentTime;
                this.latestValue = value;
            }
        }, {
            key: 'getSelectedText',
            value: function getSelectedText() {

                var referenceNode = document.getElementById('md-span-comments');

                var _props2 = this.props,
                    onChange = _props2.onChange,
                    value = _props2.value,
                    activeAttributes = _props2.activeAttributes;

                // Remove tags if selected tag ID exist in 'remove-comment' attribute of body.

                var removedComments = jQuery('body').attr('remove-comment');
                if (undefined !== activeAttributes.datatext && undefined !== removedComments && removedComments.indexOf(activeAttributes.datatext) !== -1) {
                    onChange(removeFormat(value, name));
                }

                if (undefined !== this.props.value.start && null !== referenceNode) {
                    var selectedText = void 0;
                    var txtselectedText = void 0;

                    jQuery('.cls-board-outer').removeClass('has_text');

                    // Sync popups with highlighted texts.
                    jQuery('.wp-block mdspan').each(function () {

                        selectedText = jQuery(this).attr('datatext');

                        // This will help to create CTRL-Z'ed Text's popup.
                        // remove this logic... <-- ne_pending, instead, remove highlight after CTRL-Z
                        // because we will not have comments in Board so we should not create new!
                        // user will have to add comment from scratch.
                        if (undefined !== selectedText && jQuery('#' + selectedText).length === 0) {

                            var _removedComments = jQuery('body').attr('remove-comment');
                            if (undefined === _removedComments || undefined !== _removedComments && _removedComments.indexOf(selectedText) === -1) {
                                createBoard(selectedText, value, onChange);
                            } else {
                                jQuery('[datatext="' + selectedText + '"]').css('background', 'transparent');
                            }
                        }

                        jQuery('#' + selectedText).addClass('has_text').show();
                    });

                    //selectedText = jQuery('mdspan[data-rich-text-format-boundary="true"]').attr('datatext');
                    selectedText = activeAttributes.datatext;

                    // Delete the popup and its highlight if user
                    // leaves the new popup without adding comment.
                    if ('' !== this.latestBoard && selectedText !== this.latestBoard && 0 !== jQuery('#' + this.latestBoard).length && 0 === jQuery('#' + this.latestBoard + ' .commentContainer').length) {
                        onChange(removeFormat(this.latestValue, name));
                        jQuery('#' + this.latestBoard).remove();
                    }

                    // If the text removed, remove comment from db and its popup.
                    // new_logic ->
                    // just hide these popups and only display on CTRLz
                    jQuery('#md-span-comments .cls-board-outer:not(.has_text)').each(function () {
                        jQuery(this).hide();
                    });

                    // Adding lastVal and onChanged props to make it deletable,
                    // these props were not added on load.
                    // It also helps to 'correct' the lastVal of CTRL-Z'ed Text's popup.
                    if (jQuery('#' + selectedText).length !== 0) {
                        ReactDOM.render(wp.element.createElement(__WEBPACK_IMPORTED_MODULE_0__component_board__["a" /* default */], { datatext: selectedText, lastVal: value, onChanged: onChange }), document.getElementById(selectedText));
                    }

                    // Adding focus on selected text's popup.
                    jQuery('.cls-board-outer').removeClass('focus');
                    jQuery('#' + selectedText + '.cls-board-outer').addClass('focus');

                    // Removing dark highlights from other texts.
                    jQuery('mdspan:not([datatext="' + selectedText + '"])').removeAttr('data-rich-text-format-boundary');

                    // Float comments column.
                    this.floatComments(selectedText);
                }
            }
        }, {
            key: 'storeSelectionValue',
            value: function storeSelectionValue(value) {
                var objValue = JSON.stringify(value);
                localStorage.setItem('commentVal', objValue);
            }
        }, {
            key: 'floatComments',
            value: function floatComments(selectedText) {

                if (jQuery('mdspan[data-rich-text-format-boundary="true"]').length !== 0) {

                    var scrollTop = '';
                    if (0 !== jQuery('.block-editor-editor-skeleton__content').length) {
                        // Latest WP Version
                        scrollTop = jQuery('.block-editor-editor-skeleton__content').scrollTop();
                    } else if (0 !== jQuery('.edit-post-layout__content').length) {
                        // Old WP Versions
                        scrollTop = jQuery('.edit-post-layout__content').scrollTop();
                    } else {
                        // Default
                        scrollTop = jQuery('body').scrollTop();
                    }

                    var commentTop = jQuery('mdspan[data-rich-text-format-boundary="true"]').offset().top;
                    var currentPopupTop = jQuery('#' + selectedText + '.cls-board-outer').offset().top;
                    var commentColTop = jQuery('#md-span-comments').offset().top;
                    var diff = commentTop - currentPopupTop;
                    diff = commentColTop + diff + scrollTop;

                    jQuery('#md-span-comments').css({
                        'top': diff - 150
                    });
                }
            }
        }, {
            key: 'removeSuggestion',
            value: function removeSuggestion() {
                var _props3 = this.props,
                    onChange = _props3.onChange,
                    value = _props3.value;

                onChange(removeFormat(value, name));
            }
        }, {
            key: 'hidethread',
            value: function hidethread() {
                jQuery('.cls-board-outer').removeClass('is_active');
            }
        }, {
            key: 'render',
            value: function render() {
                var _props4 = this.props,
                    isActive = _props4.isActive,
                    inputValue = _props4.inputValue,
                    onChange = _props4.onChange,
                    value = _props4.value;


                return wp.element.createElement(
                    Fragment,
                    null,
                    wp.element.createElement(RichTextToolbarButton, {
                        title: __('Comment'),
                        isActive: isActive,
                        icon: 'admin-links',
                        onClick: this.onToggle,
                        shortcutType: 'primary',
                        shortcutCharacter: 'm',
                        className: 'toolbar-button-with-text toolbar-button__' + name
                    }),
                    wp.element.createElement(
                        Fragment,
                        null,
                        this.getSelectedText()
                    ),
                    !isActive && wp.element.createElement(Fragment, null)
                );
            }
        }]);

        return myClass;
    }(Component)
};
registerFormatType(name, mdComment);




addFilter('editor.BlockEdit', 'md/block-extend-controls', __WEBPACK_IMPORTED_MODULE_2__component_block_extend_controls__["a" /* default */]);
addFilter('blocks.registerBlockType', 'md/suggestionBlockAttributes', addCustomAttributes);

function addCustomAttributes(settings, name) {

    if ('core/paragraph' === name) {
        if (settings.attributes) {
            settings.attributes.oldClientId = {
                type: 'string',
                default: ''
            };
        }
    }
    return settings;
}

/***/ }),
/* 1 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__comment__ = __webpack_require__(2);
var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }



var removeFormat = wp.richText.removeFormat;

var Board = function (_React$Component) {
    _inherits(Board, _React$Component);

    function Board(props) {
        _classCallCheck(this, Board);

        var _this2 = _possibleConstructorReturn(this, (Board.__proto__ || Object.getPrototypeOf(Board)).call(this, props));

        _this2.displayComments = _this2.displayComments.bind(_this2);
        _this2.updateComment = _this2.updateComment.bind(_this2);
        _this2.removeComment = _this2.removeComment.bind(_this2);
        _this2.addNewComment = _this2.addNewComment.bind(_this2);
        _this2.enableUpdateBtn = _this2.enableUpdateBtn.bind(_this2);
        var currentPostID = wp.data.select('core/editor').getCurrentPostId();
        var postSelections = [];
        var selectedText = void 0;
        var txtselectedText = void 0;
        var metaselectedText = void 0;

        // `this` is the div
        selectedText = _this2.props.datatext;
        txtselectedText = 'txt' + selectedText;
        metaselectedText = '_' + selectedText;
        setTimeout(function () {
            jQuery('#' + selectedText + ' textarea').attr('id', txtselectedText);
        }, 3000);

        _this2.commentedOnText = _this2.props.commentedOnText;

        if (1 !== _this2.props.freshBoard) {
            var allPosts = wp.apiFetch({ path: 'career-data-by-select1/my-route1/?currentPostID=' + currentPostID + '&elID=' + metaselectedText }).then(function (fps) {
                var userDetails = fps.userDetails,
                    resolved = fps.resolved,
                    commentedOnText = fps.commentedOnText;

                // Update the 'commented on text' if not having value.

                _this2.commentedOnText = undefined !== _this2.commentedOnText ? _this2.commentedOnText : commentedOnText;

                if ('true' === resolved || 0 === userDetails.length) {
                    var elIDRemove = selectedText;
                    var removed_comments = jQuery('body').attr('remove-comment');
                    removed_comments = undefined !== removed_comments ? removed_comments + ',' + elIDRemove : elIDRemove;
                    jQuery('body').attr('remove-comment', removed_comments);
                    jQuery('body').append('<style>body [datatext="' + elIDRemove + '"] {background-color:transparent !important;}</style>');
                    jQuery('[datatext="' + elIDRemove + '"]').addClass('removed');
                    jQuery('#' + elIDRemove).remove();

                    return false;
                }

                jQuery.each(userDetails, function (key, val) {
                    postSelections.push(val);
                });

                // Add text that the comment is removed.
                if (0 !== postSelections.length) {
                    _this2.hasComments = 1;
                } else {
                    _this2.hasComments = 0;
                }

                _this2.state = { comments: [postSelections] };
                _this2.setState({ comments: postSelections });
            });
        }

        // Actions on load.
        if (1 === _this2.props.onLoadFetch) {

            // Handling Older WordPress Versions.
            // The function wp.data.select("core").getCurrentUser() is not
            // defined for v5.2.2, so getting data from PHP.
            try {
                wp.data.select("core").getCurrentUser().id;
            } catch (e) {

                // Fetch User details from AJAX.
                jQuery.post(ajaxurl, {
                    'action': 'cf_get_user'
                }, function (user) {
                    user = JSON.parse(user);
                    localStorage.setItem("userID", user.id);
                    localStorage.setItem("userName", user.name);
                    localStorage.setItem("userURL", user.url);
                });
            }
        }

        _this2.state = { comments: [] };
        return _this2;
    }

    _createClass(Board, [{
        key: 'enableUpdateBtn',
        value: function enableUpdateBtn() {
            // Removing disabled attribute from "Update" button on load.
            // Doing so to handle the process even when content is not changed but comments are modified/added.
            // The custom function is added in 'commenting_block-admin.js', find there 'custom_publish_handle' label.
            jQuery('button.components-button.editor-post-publish-button').removeAttr('aria-disabled');
        }
    }, {
        key: 'removeComment',
        value: function removeComment(idx, cTimestamp, elID) {

            this.enableUpdateBtn();

            var arr = this.state.comments;

            arr.splice(idx, 1);
            var CurrentPostID = wp.data.select('core/editor').getCurrentPostId();
            var _props = this.props,
                value = _props.value,
                onChange = _props.onChange;

            elID = '_' + elID;
            var data = {
                'action': 'my_action_delete',
                'currentPostID': CurrentPostID,
                'timestamp': cTimestamp,
                metaId: elID
            };
            // since 2.8 ajaxurl is always defined in the admin header and points to admin-ajax.php
            jQuery.post(ajaxurl, data, function (response) {});
            this.setState({ comments: arr });
        }
    }, {
        key: 'updateComment',
        value: function updateComment(newText, idx, cTimestamp, dateTime, metaID) {

            this.enableUpdateBtn();

            var arr = this.state.comments;

            try {
                var userID = wp.data.select("core").getCurrentUser().id;
                var userName = wp.data.select("core").getCurrentUser().name;
                var userProfile = wp.data.select("core").getCurrentUser().avatar_urls;
                userProfile = userProfile[Object.keys(userProfile)[1]];
            } catch (e) {
                var userID = localStorage.getItem("userID");
                var userName = localStorage.getItem("userName");
                var userProfile = localStorage.getItem("userURL");
            }

            var newArr = {};
            newArr['userName'] = userName;
            newArr['profileURL'] = userProfile;
            newArr['dtTime'] = dateTime;
            newArr['thread'] = newText;
            newArr['userData'] = userID;
            newArr['index'] = idx;
            newArr['status'] = 'draft reverted_back';
            newArr['timestamp'] = cTimestamp;
            arr[idx] = newArr;
            var CurrentPostID = wp.data.select('core/editor').getCurrentPostId();
            metaID = '_' + metaID;
            var data = {
                'action': 'my_action_edit',
                'currentPostID': CurrentPostID,
                'editedComment': JSON.stringify(newArr),
                'metaId': metaID
            };
            // since 2.8 ajaxurl is always defined in the admin header and points to admin-ajax.php
            var _this = this;

            jQuery.post(ajaxurl, data, function () {});
            this.setState({ comments: arr });
        }
    }, {
        key: 'addNewComment',
        value: function addNewComment(event) {

            this.enableUpdateBtn();

            event.preventDefault();

            var datatext = this.props.datatext;


            var currentTextID = 'txt' + datatext;

            var newText = jQuery('#' + currentTextID).val();

            if ('' !== newText) {

                try {
                    var userID = wp.data.select("core").getCurrentUser().id;
                    var userName = wp.data.select("core").getCurrentUser().name;
                    var userProfile = wp.data.select("core").getCurrentUser().avatar_urls;
                    userProfile = userProfile[Object.keys(userProfile)[1]];
                } catch (e) {
                    var userID = localStorage.getItem("userID");
                    var userName = localStorage.getItem("userName");
                    var userProfile = localStorage.getItem("userURL");
                }

                var arr = this.state.comments;
                var newArr = {};
                newArr['userData'] = userID;
                newArr['thread'] = newText;
                newArr['commentedOnText'] = undefined !== this.commentedOnText ? this.commentedOnText : '';
                newArr['userName'] = userName;
                newArr['profileURL'] = userProfile;
                newArr['status'] = 'draft reverted_back';

                arr.push(newArr);

                var CurrentPostID = wp.data.select('core/editor').getCurrentPostId();

                var el = currentTextID.substring(3);
                var metaId = '_' + el;
                var data = {
                    'action': 'my_action',
                    'currentPostID': CurrentPostID,
                    'commentList': JSON.stringify(arr),
                    'metaId': metaId
                };

                jQuery('#' + el + ' .shareCommentContainer').addClass('loading');
                var _this = this;
                jQuery.post(ajaxurl, data, function (data) {

                    jQuery('#' + el + ' .shareCommentContainer').removeClass('loading');

                    data = jQuery.parseJSON(data);
                    if (undefined !== data.error) {
                        alert(data.error);
                        return false;
                    }
                    arr[arr.length - 1]['dtTime'] = data.dtTime;
                    arr[arr.length - 1]['timestamp'] = data.timestamp;

                    // Update hasComment prop for dynamic button text.
                    _this.hasComments = 1;

                    // Set the state.
                    _this.setState({ comments: arr });

                    // Flushing the text from the textarea
                    jQuery('#' + currentTextID).val('');
                    jQuery('#' + datatext + ' .no-comments').remove();
                });
            } else alert("Please write a comment to share!");
        }
    }, {
        key: 'displayComments',
        value: function displayComments(text, i) {
            var _props2 = this.props,
                isActive = _props2.isActive,
                inputValue = _props2.inputValue,
                myval2 = _props2.myval2,
                value = _props2.value; /*onChange*/

            var _props3 = this.props,
                lastVal = _props3.lastVal,
                onChanged = _props3.onChanged,
                selectedText = _props3.selectedText,
                suserProfile = _props3.suserProfile,
                suserName = _props3.suserName;


            var username = void 0,
                postedTime = void 0,
                postedComment = void 0,
                profileURL = void 0,
                userID = void 0,
                status = void 0,
                cTimestamp = void 0,
                editedDraft = void 0; /*value, onChange*/
            Object.keys(text).map(function (i) {
                if ('userName' === i) {
                    username = text[i];
                } else if ('dtTime' === i) {
                    postedTime = text[i];
                } else if ('thread' === i) {
                    postedComment = text[i];
                } else if ('profileURL' === i) {
                    profileURL = text[i];
                } else if ('userData' === i) {
                    userID = text[i];
                } else if ('status' === i) {
                    status = text[i];
                } else if ('timestamp' === i) {
                    cTimestamp = text[i];
                } else if ('editedDraft' === i) {
                    editedDraft = text[i];
                }
            });

            return wp.element.createElement(
                __WEBPACK_IMPORTED_MODULE_0__comment__["a" /* default */],
                {
                    key: i,
                    index: i,
                    removeCommentFromBoard: this.removeComment,
                    updateCommentFromBoard: this.updateComment,
                    userName: username,
                    dateTime: postedTime,
                    profileURL: profileURL,
                    userID: userID,
                    status: status,
                    lastVal: lastVal,
                    onChanged: onChanged
                    /*lastVal={value}
                    onChanged={onChange}*/
                    , selectedText: selectedText,
                    timestamp: cTimestamp,
                    editedDraft: editedDraft
                },
                postedComment = postedComment ? postedComment : text
            );
        }
    }, {
        key: 'render',
        value: function render() {
            var _this3 = this;

            var _props4 = this.props,
                isActive = _props4.isActive,
                inputValue = _props4.inputValue,
                onChange = _props4.onChange,
                value = _props4.value,
                myval2 = _props4.myval2,
                selectedText = _props4.selectedText,
                datatext = _props4.datatext;

            var buttonText = 1 === this.hasComments && 1 !== this.props.freshBoard ? 'Reply' : 'Comment';

            return wp.element.createElement(
                'div',
                { className: 'board' },
                wp.element.createElement(
                    'div',
                    { className: 'boardTop' },
                    0 === this.hasComments && wp.element.createElement(
                        'div',
                        { className: 'no-comments' },
                        wp.element.createElement(
                            'i',
                            null,
                            'The are no comments!'
                        )
                    ),
                    this.state.comments && this.state.comments.map(function (item, index) {
                        return _this3.displayComments(item, index);
                    })
                ),
                wp.element.createElement(
                    'div',
                    { className: 'shareCommentContainer' },
                    wp.element.createElement('textarea', { id: "txt" + datatext, placeholder: 'Write a comment..' }),
                    wp.element.createElement(
                        'button',
                        { onClick: this.addNewComment, className: 'btn btn-success' },
                        buttonText
                    )
                )
            );
        }
    }]);

    return Board;
}(React.Component);

/* harmony default export */ __webpack_exports__["a"] = (Board);

/***/ }),
/* 2 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Fragment = wp.element.Fragment;
var removeFormat = wp.richText.removeFormat;

var Comment = function (_React$Component) {
    _inherits(Comment, _React$Component);

    function Comment(props) {
        _classCallCheck(this, Comment);

        var _this = _possibleConstructorReturn(this, (Comment.__proto__ || Object.getPrototypeOf(Comment)).call(this, props));

        _this.edit = _this.edit.bind(_this);
        _this.save = _this.save.bind(_this);
        _this.remove = _this.remove.bind(_this);
        _this.resolve = _this.resolve.bind(_this);
        _this.cancelEdit = _this.cancelEdit.bind(_this);
        _this.state = { editing: false, showEditedDraft: false };
        return _this;
    }

    _createClass(Comment, [{
        key: 'edit',
        value: function edit() {
            this.setState({ editing: true });
        }
    }, {
        key: 'save',
        value: function save(event) {

            var newText = this.newText.value;
            if ('' === newText) {
                alert("Please write a comment to share!");
                return false;
            }
            var metaId = this.newText.id.substring(3);
            var elID = event.currentTarget.parentElement.parentElement.parentElement.parentElement.id;
            this.props.updateCommentFromBoard(newText, this.props.index, this.props.timestamp, this.props.dateTime, elID);

            this.setState({ editing: false });
        }
    }, {
        key: 'remove',
        value: function remove(event) {

            if (confirm('Are you sure you want to delete this comment ?')) {
                var elID = jQuery(event.currentTarget).closest('.cls-board-outer');
                //	var elID = event.currentTarget.parentElement.parentElement.parentElement.id;

                this.props.removeCommentFromBoard(this.props.index, this.props.timestamp, elID[0].id);
            }
        }
    }, {
        key: 'resolve',
        value: function resolve(event) {
            //const myvalue = this.props.myval2;
            if (confirm('Are you sure you want to delete this thread ?')) {
                var elID = jQuery(event.currentTarget).closest('.cls-board-outer');
                elID = elID[0].id;
                var elIDRemove = elID;
                var CurrentPostID = wp.data.select('core/editor').getCurrentPostId();
                var _props = this.props,
                    value = _props.value,
                    onChange = _props.onChange;

                elID = '_' + elID;

                var data = {
                    'action': 'resolve_thread',
                    'currentPostID': CurrentPostID,
                    'metaId': elID
                };
                // since 2.8 ajaxurl is always defined in the admin header and points to admin-ajax.php
                jQuery.post(ajaxurl, data, function (response) {
                    jQuery('div#' + elIDRemove).remove();
                });

                var name = 'multidots/comment';

                var _props2 = this.props,
                    lastVal = _props2.lastVal,
                    onChanged = _props2.onChanged;

                //if (null === lastVal || undefined === onChanged) {

                jQuery('[datatext="' + elIDRemove + '"]').addClass('removed');

                var removedComments = jQuery('body').attr('remove-comment');
                removedComments = undefined !== removedComments ? removedComments + ',' + elIDRemove : elIDRemove;
                jQuery('body').attr('remove-comment', removedComments);
                jQuery('body').append('<style>body [datatext="' + elIDRemove + '"] {background-color:transparent !important;}</style>');
                /*} else {
                    onChanged(removeFormat(lastVal, name));
                }*/
            }
        }
    }, {
        key: 'cancelEdit',
        value: function cancelEdit() {
            this.setState({ editing: false });
        }
    }, {
        key: 'renderNormalMode',
        value: function renderNormalMode() {
            var _props3 = this.props,
                lastVal = _props3.lastVal,
                onChanged = _props3.onChanged,
                selectedText = _props3.selectedText,
                index = _props3.index;

            var commentStatus = this.props.status ? this.props.status : 'draft';

            try {
                var owner = wp.data.select("core").getCurrentUser().id;
            } catch (e) {
                var owner = localStorage.getItem("userID");
            }

            return wp.element.createElement(
                'div',
                { className: "commentContainer " + commentStatus, id: this.props.timestamp },
                wp.element.createElement(
                    'div',
                    { className: 'comment-header' },
                    wp.element.createElement(
                        'div',
                        { className: 'avtar' },
                        wp.element.createElement('img', { src: this.props.profileURL, alt: 'avatar' })
                    ),
                    wp.element.createElement(
                        'div',
                        { className: 'commenter-name-time' },
                        wp.element.createElement(
                            'div',
                            { className: 'commenter-name' },
                            this.props.userName
                        ),
                        wp.element.createElement(
                            'div',
                            { className: 'comment-time' },
                            this.props.dateTime
                        )
                    ),
                    index === 0 && wp.element.createElement(
                        'button',
                        { onClick: this.resolve.bind(this), className: 'btn-comment' },
                        'Resolve'
                    ),
                    wp.element.createElement(
                        'div',
                        { className: 'buttons-holder' },
                        wp.element.createElement(
                            'div',
                            { className: 'buttons-opner' },
                            wp.element.createElement(
                                Fragment,
                                null,
                                this.props.userID === owner && wp.element.createElement(
                                    'svg',
                                    { 'aria-hidden': 'true', role: 'img', focusable: 'false', className: 'dashicon dashicons-ellipsis',
                                        xmlns: 'http://www.w3.org/2000/svg', width: '20', height: '20', viewBox: '0 0 20 20' },
                                    wp.element.createElement('path', {
                                        d: 'M5 10c0 1.1-.9 2-2 2s-2-.9-2-2 .9-2 2-2 2 .9 2 2zm12-2c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm-7 0c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z' })
                                )
                            )
                        ),
                        wp.element.createElement(
                            Fragment,
                            null,
                            this.props.userID === owner && wp.element.createElement(
                                'div',
                                { className: 'buttons-wrapper' },
                                wp.element.createElement(
                                    'button',
                                    { onClick: this.edit, className: 'btn btn-comment' },
                                    'Edit'
                                ),
                                wp.element.createElement(
                                    'button',
                                    { onClick: index === 0 ? this.resolve.bind(this) : this.remove.bind(this), className: 'btn btn-comment' },
                                    'Delete'
                                )
                            )
                        )
                    )
                ),
                wp.element.createElement(
                    'div',
                    { className: 'commentText' },
                    this.state.showEditedDraft ? this.props.editedDraft : this.props.children
                )
            );
        }
    }, {
        key: 'renderEditingMode',
        value: function renderEditingMode() {
            var _this2 = this;

            return wp.element.createElement(
                'div',
                { className: 'commentContainer' },
                wp.element.createElement(
                    'div',
                    { className: 'commentText' },
                    wp.element.createElement('textarea', {
                        ref: function ref(input) {
                            _this2.newText = input;
                        },
                        onChange: this.handleChange,
                        defaultValue: this.state.showEditedDraft ? this.props.editedDraft : this.props.children })
                ),
                wp.element.createElement(
                    'button',
                    { onClick: this.save.bind(this), className: 'btn-comment' },
                    'Save'
                ),
                wp.element.createElement(
                    'button',
                    { onClick: this.cancelEdit.bind(this), className: 'btn-comment' },
                    'Cancel'
                )
            );
        }
    }, {
        key: 'render',
        value: function render() {

            if (this.state.editing) {
                return this.renderEditingMode();
            } else {
                return this.renderNormalMode();
            }
        }
    }]);

    return Comment;
}(React.Component);

/* harmony default export */ __webpack_exports__["a"] = (Comment);

/***/ }),
/* 3 */
/***/ (function(module, exports) {

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

(function (wpI18n, wpData, wpElement, wpCompose, wpEditPost, wpPlugins, wpComponents) {
  var withSelect = wpData.withSelect,
      withDispatch = wpData.withDispatch;
  var PluginSidebar = wpEditPost.PluginSidebar,
      PluginSidebarMoreMenuItem = wpEditPost.PluginSidebarMoreMenuItem;
  var Component = wpElement.Component,
      Fragment = wpElement.Fragment;
  var compose = wpCompose.compose;
  var __ = wpI18n.__;
  var registerPlugin = wpPlugins.registerPlugin;
  var ToggleControl = wpComponents.ToggleControl;

  var SBSidebar = function (_Component) {
    _inherits(SBSidebar, _Component);

    function SBSidebar() {
      _classCallCheck(this, SBSidebar);

      return _possibleConstructorReturn(this, (SBSidebar.__proto__ || Object.getPrototypeOf(SBSidebar)).apply(this, arguments));
    }

    _createClass(SBSidebar, [{
      key: "render",
      value: function render() {
        // Nested object destructuring.
        var _props = this.props,
            _props$meta = _props.meta;
        _props$meta = _props$meta === undefined ? {} : _props$meta;
        var suggestionEnable = _props$meta.sb_is_suggestion_mode,
            updateMeta = _props.updateMeta;


        return wp.element.createElement(
          Fragment,
          null,
          wp.element.createElement(
            PluginSidebarMoreMenuItem,
            {
              name: "suggestion-sidebar",
              type: "sidebar",
              target: "suggestion-sidebar"
            },
            __('Edit Mode', 'suggestion_block')
          ),
          wp.element.createElement(
            PluginSidebar,
            {
              name: "suggestion-sidebar",
              title: __('Edit Mode', 'suggestion_block'),
              icon: "welcome-write-blog"
            },
            wp.element.createElement(ToggleControl, {
              label: __('Suggestion mode'),
              checked: suggestionEnable,
              onChange: function onChange(value) {
                updateMeta({ sb_is_suggestion_mode: value });
              }
            })
          )
        );
      }
    }]);

    return SBSidebar;
  }(Component);

  // Fetch the post meta.


  var applyWithSelect = withSelect(function (select) {
    var _select = select('core/editor'),
        getEditedPostAttribute = _select.getEditedPostAttribute;

    return {
      meta: getEditedPostAttribute('meta')
    };
  });

  // Provide method to update post meta.
  var applyWithDispatch = withDispatch(function (dispatch, _ref) {
    var meta = _ref.meta;

    var _dispatch = dispatch('core/editor'),
        editPost = _dispatch.editPost;

    return {
      updateMeta: function updateMeta(newMeta) {
        editPost({ meta: Object.assign({}, meta, newMeta) });
      }
    };
  });

  // Combine the higher-order components.
  var render = compose([applyWithSelect, applyWithDispatch])(SBSidebar);

  registerPlugin('suggestion-sidebar', {
    render: render
  });
})(wp.i18n, wp.data, wp.element, wp.compose, wp.editPost, wp.plugins, wp.components);

/***/ }),
/* 4 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__suggestion_board__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_diff_match_patch__ = __webpack_require__(7);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_diff_match_patch___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_diff_match_patch__);
var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }



var dmp = new __WEBPACK_IMPORTED_MODULE_1_diff_match_patch___default.a();

var createHigherOrderComponent = wp.compose.createHigherOrderComponent;
var Component = wp.element.Component;
var select = wp.data.select;

var beforeChangeContent = {};
var currentNewContent = '';
var loadInitialSuggestion = [];
var displayInitialSuggestion = true;

/* harmony default export */ __webpack_exports__["a"] = (createHigherOrderComponent(function (BlockEdit) {
  return function (_Component) {
    _inherits(_class, _Component);

    function _class(props) {
      _classCallCheck(this, _class);

      var _this = _possibleConstructorReturn(this, (_class.__proto__ || Object.getPrototypeOf(_class)).call(this, props));

      _this.handleLoad = _this.handleLoad.bind(_this);
      return _this;
    }

    _createClass(_class, [{
      key: 'componentDidMount',
      value: function componentDidMount() {
        window.addEventListener('load', this.handleLoad);
      }
    }, {
      key: 'handleLoad',
      value: function handleLoad() {
        var oldClientId = this.props.attributes.oldClientId;

        var suggestionHistory = wp.data.select('core/editor').getEditedPostAttribute('meta')['sb_suggestion_history'];
        var commentNode = document.getElementById('md-suggestion-comments');

        if (null === commentNode) {
          commentNode = document.createElement('div');
          commentNode.setAttribute('id', 'md-suggestion-comments');
          commentNode.setAttribute('class', 'comments-loader');
          var wpEditoNode = document.querySelector('.block-editor-writing-flow');
          wpEditoNode.appendChild(commentNode);
          this.addEvents();
        }

        if (0 < suggestionHistory.length && '' !== oldClientId && displayInitialSuggestion) {
          var displayHistory = JSON.parse(suggestionHistory);
          if (undefined !== displayHistory[oldClientId] && -1 === loadInitialSuggestion.indexOf(oldClientId)) {
            loadInitialSuggestion.push(oldClientId);
            this.renderAllSuggestion(displayHistory, commentNode);
          }
        }
      }
    }, {
      key: 'componentDidUpdate',
      value: function componentDidUpdate() {
        if ('core/paragraph' === this.props.name) {
          var _props = this.props,
              attributes = _props.attributes,
              setAttributes = _props.setAttributes,
              clientId = _props.clientId,
              isSelected = _props.isSelected;
          var oldClientId = attributes.oldClientId;

          var postStatus = wp.data.select('core/editor').getCurrentPost().status;
          var suggestionHistory = wp.data.select('core/editor').getEditedPostAttribute('meta')['sb_suggestion_history'];

          if ('publish' !== postStatus && isSelected) {
            if (wp.data.select('core/editor').getEditedPostAttribute('meta')['sb_is_suggestion_mode']) {
              var editRecord = wp.data.select('core').getUndoEdit();
              var currentBlockIndex = select('core/block-editor').getBlockIndex(clientId);
              if (editRecord && editRecord.edits && editRecord.edits.blocks) {
                if (editRecord.edits.blocks[currentBlockIndex] && editRecord.edits.blocks[currentBlockIndex].name === 'core/paragraph') {
                  var attr = editRecord.edits.blocks[currentBlockIndex].attributes;
                  var currentAttr = wp.data.select('core/block-editor').getBlockAttributes(clientId);
                  if (currentNewContent !== currentAttr.content) {
                    displayInitialSuggestion = false;
                    if (0 === Object.keys(beforeChangeContent).length || undefined === beforeChangeContent[clientId]) {
                      beforeChangeContent[clientId] = attr.content;
                    }
                    if (currentAttr.content !== attr.content) {

                      var currentUser = wp.data.select('core').getCurrentUser().id;
                      var userName = wp.data.select('core').getCurrentUser().name;
                      var userAvtars = wp.data.select('core').getCurrentUser().avatar_urls;
                      var avtarUrl = userAvtars[Object.keys(userAvtars)[1]];

                      if (0 < suggestionHistory.length) {
                        suggestionHistory = JSON.parse(suggestionHistory);
                      }

                      var insRegPattern = /<(ins|\/ins)/g;
                      var delRegPattern = /<(del|\/del)/g;
                      var patternResult = false;
                      if (insRegPattern.test(beforeChangeContent[clientId])) {
                        patternResult = true;
                      } else if (delRegPattern.test(beforeChangeContent[clientId])) {
                        patternResult = true;
                      }

                      var filterContent = currentAttr.content;
                      if (!patternResult) {
                        filterContent = currentAttr.content.replace(/<\/?ins[^>]*>/g, "").replace(/<\/?del[^>]*>/g, "");
                      }

                      var objClientId = oldClientId;

                      if ('' === oldClientId) {
                        setAttributes({ oldClientId: clientId });
                        objClientId = clientId;
                      }

                      var diff = dmp.diff_main(beforeChangeContent[clientId], filterContent);

                      var tagArray = ['strong', 'em', 'a', 's', 'code', 'span'];
                      var matchRegex = false;
                      var ignoreCleanUp = false;

                      console.log(diff[0][1]);

                      for (var v = 0; v < diff.length; v++) {

                        var operation = diff[v][0];
                        var diffText = diff[v][1];

                        if (__WEBPACK_IMPORTED_MODULE_1_diff_match_patch___default.a.DIFF_INSERT === operation) {
                          var nextDiffText = diff[v + 1] ? diff[v + 1][1].substring(0, 6) : '';
                          if ('</del>' === nextDiffText) {
                            if (0 === diff[v + 1][0] && diff[v - 1]) {
                              diff[v + 1][1] = diff[v + 1][1].substring(6);
                              diff[v - 1][1] += nextDiffText;
                            }
                          } else {
                            nextDiffText = diff[v + 1] ? diff[v + 1][1].substring(0, 20) : '';
                            var diffMatchPattern = /<\/del>/;
                            var prevLastChar = diff[v - 1] ? diff[v - 1][1].slice(-3) : '';
                            var prevTagIndex = diff[v - 1] ? diff[v - 1][1].lastIndexOf('<del') : -1;
                            if (-1 !== prevTagIndex && ';">' === prevLastChar && diffMatchPattern.test(nextDiffText)) {
                              var lastDelTag = diff[v - 1][1].substring(prevTagIndex);
                              diff[v - 1][1] = diff[v - 1][1].substring(0, prevTagIndex);
                              diff[v + 1][1] = lastDelTag + diff[v + 1][1];
                            }
                          }
                        }

                        var diffCurrentLastTag = diff[v][1].slice(-5);
                        var missingCurrentLastTag = diff[v][1].match(/<ins id="[\d]{0,1}$/);
                        var diffNextCloseTag = diff[v + 1] ? diff[v + 1][1].substring(0, 1) : '';
                        var diffNextTagId = diff[v + 1] ? diff[v + 1][1].substring(0, 3) : '';

                        if (('</del' === diffCurrentLastTag || '</ins' === diffCurrentLastTag) && '>' === diffNextCloseTag) {
                          diff[v][1] += diffNextCloseTag;
                          diff[v + 1][1] = diff[v + 1][1].substring(1);
                          ignoreCleanUp = true;
                        } else if ('<ins ' === diffCurrentLastTag && 'id=' === diffNextTagId) {
                          diff[v][1] = diff[v][1].substring(0, diff[v][1].lastIndexOf(diffCurrentLastTag));
                          diff[v + 1][1] = diffCurrentLastTag + diff[v + 1][1];
                          ignoreCleanUp = true;
                        } else if (null !== missingCurrentLastTag) {
                          diff[v][1] = diff[v][1].substring(0, diff[v][1].lastIndexOf(missingCurrentLastTag));
                          diff[v + 1][1] = missingCurrentLastTag + diff[v + 1][1];
                          ignoreCleanUp = true;
                        } else if (null !== diff[v][1].match(/<del id="[\d]{0,1}$/)) {
                          var missDelLastTag = diff[v][1].match(/<del id="[\d]{0,1}$/);
                          diff[v][1] = diff[v][1].substring(0, diff[v][1].lastIndexOf(missDelLastTag));
                          diff[v + 1][1] = missDelLastTag + diff[v + 1][1];
                          ignoreCleanUp = true;
                        }

                        if (__WEBPACK_IMPORTED_MODULE_1_diff_match_patch___default.a.DIFF_EQUAL !== operation) {

                          var currentDiff = diff[v][1].substring(0, 3);
                          var prevDiff = diff[v - 1] ? diff[v - 1][1].slice(-1) : '';
                          var nextDiff = diff[v + 1] ? diff[v + 1][1].substring(0, 3) : '';
                          var currentLastdiff = diff[v][1].slice(-1);
                          if (('ins' === currentDiff || 'del' === currentDiff) && '<' === prevDiff && ('ins' === nextDiff || 'del') && '<' === currentLastdiff) {
                            var prevLastIndex = diff[v - 1][1].lastIndexOf(prevDiff);
                            var currentLastIndex = diff[v][1].lastIndexOf(currentLastdiff);
                            diff[v - 1][1] = diff[v - 1][1].substring(0, prevLastIndex);
                            diff[v][1] = prevDiff + diff[v][1].substring(0, currentLastIndex);
                            diff[v + 1][1] = currentLastdiff + diff[v + 1][1];
                            ignoreCleanUp = true;
                          }

                          diffText = diffText.replace(/<\/?ins[^>]*>/g, "").replace(/<\/?del[^>]*>/g, "");

                          for (var i = 0; i < tagArray.length; i++) {
                            var dynamicRegex = void 0;
                            if (__WEBPACK_IMPORTED_MODULE_1_diff_match_patch___default.a.DIFF_INSERT === operation) {
                              dynamicRegex = "<(" + tagArray[i] + "|\/" + tagArray[i] + ")";
                            } else {
                              dynamicRegex = 'a' === tagArray[i] ? "a [^>]*>" : "(" + tagArray[i] + "|\/" + tagArray[i] + ")>";
                            }

                            var regex = new RegExp(dynamicRegex, "g");
                            if (regex.test(diffText)) {
                              matchRegex = true;
                              break;
                            }
                          }
                        }
                      }
                      if (!matchRegex && !ignoreCleanUp) {
                        dmp.diff_cleanupSemantic(diff);
                      }

                      var html = [];
                      var updateOldContent = false;
                      var isFormating = false;
                      var nextFomatingIndex = 0;

                      var _loop = function _loop(x) {
                        var op = diff[x][0];
                        var text = diff[x][1];
                        var tagFound = false;
                        if ((patternResult || matchRegex) && __WEBPACK_IMPORTED_MODULE_1_diff_match_patch___default.a.DIFF_EQUAL !== op) {
                          text = text.replace(/<\/?ins[^>]*>/g, "").replace(/<\/?del[^>]*>/g, "");
                          if (!isFormating) {
                            tagArray.forEach(function (tagName) {
                              var dynamicRegex = void 0;
                              if (__WEBPACK_IMPORTED_MODULE_1_diff_match_patch___default.a.DIFF_INSERT === op) {
                                dynamicRegex = "<(" + tagName + "|\/" + tagName + ")";
                              } else {
                                dynamicRegex = 'a' === tagName ? "a [^>]*>" : "(" + tagName + "|\/" + tagName + ")>";
                              }

                              var regex = new RegExp(dynamicRegex, "g");
                              if (regex.test(text)) {
                                tagFound = true;
                              }
                            });
                          }
                        }

                        var uniqueId = Math.floor(Math.random() * 100).toString() + Date.now().toString();
                        var today = new Date();
                        var date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
                        var time = today.getHours() + ':' + today.getMinutes() + ':' + today.getSeconds();
                        var dateTime = date + ' ' + time;

                        switch (op) {
                          case __WEBPACK_IMPORTED_MODULE_1_diff_match_patch___default.a.DIFF_INSERT:
                            if (!isFormating && tagFound) {
                              isFormating = true;
                              nextFomatingIndex = x + 2;
                              diff[x + 1][0] = 1;
                              html[x] = text;
                              updateOldContent = true;
                            } else if (isFormating && nextFomatingIndex === x) {
                              isFormating = false;
                              nextFomatingIndex = 0;
                              html[x] = text;
                            } else {

                              html[x] = '<ins id="' + uniqueId + '" style="color: #008000;">' + text + '</ins>';
                              var tempObject = {};
                              tempObject[uniqueId] = [{ 'name': userName, 'uid': currentUser, 'avtar': avtarUrl, 'action': 'Add', 'text': text, 'time': dateTime }];
                              if (0 === suggestionHistory.length) {
                                suggestionHistory = {};
                                suggestionHistory[objClientId] = tempObject;
                              } else if (!suggestionHistory[objClientId]) {
                                suggestionHistory[objClientId] = tempObject;
                              } else {
                                Object.assign(suggestionHistory[objClientId], tempObject);
                              }
                            }
                            break;
                          case __WEBPACK_IMPORTED_MODULE_1_diff_match_patch___default.a.DIFF_DELETE:
                            if (!isFormating && tagFound) {
                              isFormating = true;
                              nextFomatingIndex = x + 2;
                            } else if (isFormating && nextFomatingIndex === x) {
                              isFormating = false;
                              nextFomatingIndex = 0;
                            } else {
                              html[x] = '<del id="' + uniqueId + '" style="color: #ff0000;">' + text + '</del>';
                              var _tempObject = {};
                              _tempObject[uniqueId] = [{ 'name': userName, 'uid': currentUser, 'avtar': avtarUrl, 'action': 'Delete', 'text': text, 'time': dateTime }];
                              if (0 === suggestionHistory.length) {
                                suggestionHistory = {};
                                suggestionHistory[objClientId] = _tempObject;
                              } else if (!suggestionHistory[objClientId]) {
                                suggestionHistory[objClientId] = _tempObject;
                              } else {
                                Object.assign(suggestionHistory[objClientId], _tempObject);
                              }
                            }
                            updateOldContent = true;
                            break;
                          case __WEBPACK_IMPORTED_MODULE_1_diff_match_patch___default.a.DIFF_EQUAL:
                            html[x] = text;
                            break;
                        }
                      };

                      for (var x = 0; x < diff.length; x++) {
                        _loop(x);
                      }
                      var finalDiff = html.join('');

                      if (updateOldContent) {
                        beforeChangeContent[clientId] = finalDiff;
                      }
                      currentNewContent = finalDiff;

                      if (suggestionHistory[objClientId]) {
                        var suggestionChildKey = Object.keys(suggestionHistory[objClientId]);

                        var clientIdNode = document.getElementById(objClientId);
                        if (!clientIdNode) {
                          clientIdNode = document.createElement('div');
                          clientIdNode.setAttribute('id', objClientId);
                        } else {
                          clientIdNode.innerHTML = '';
                        }

                        for (var _i = 0; _i < suggestionChildKey.length; _i++) {
                          var findItem = 'id="' + suggestionChildKey[_i] + '"';

                          if (-1 === finalDiff.indexOf(findItem)) {
                            delete suggestionHistory[objClientId][suggestionChildKey[_i]];
                          } else {
                            var newNode = document.createElement('div');
                            newNode.setAttribute('id', 'sg' + suggestionChildKey[_i]);
                            newNode.setAttribute('data-sid', suggestionChildKey[_i]);
                            newNode.setAttribute('class', 'cls-board-outer'); // need to change class
                            clientIdNode.appendChild(newNode);

                            var referenceNode = document.getElementById('md-suggestion-comments');
                            referenceNode.appendChild(clientIdNode);

                            ReactDOM.render(wp.element.createElement(__WEBPACK_IMPORTED_MODULE_0__suggestion_board__["a" /* default */], { oldClientId: objClientId, clientId: clientId, suggestionID: suggestionChildKey[_i], suggestedOnText: suggestionHistory[objClientId][suggestionChildKey[_i]] }), document.getElementById('sg' + suggestionChildKey[_i]));
                          }
                        }
                      }
                      if ('' !== finalDiff) {
                        setAttributes({ content: finalDiff });
                        wp.data.dispatch('core/editor').editPost({ meta: { sb_suggestion_history: JSON.stringify(suggestionHistory) } });
                      }
                    }
                  }
                }
              }
            }
          }
        }
      }
    }, {
      key: 'addEvents',
      value: function addEvents() {
        jQuery(document).on('keyup', '.wp-block-paragraph', function () {
          if (0 < jQuery(this).find('[data-rich-text-format-boundary="true"]').length && undefined !== jQuery(this).find('[data-rich-text-format-boundary="true"]').attr('id')) {
            jQuery('#sg' + jQuery(this).find('[data-rich-text-format-boundary="true"]').attr('id')).addClass('focus');
          } else {
            jQuery('#md-suggestion-comments .cls-board-outer').removeClass('focus');
          }
        });
        jQuery(document).on('mouseup', '.wp-block-paragraph', function () {
          if (0 < jQuery(this).find('[data-rich-text-format-boundary="true"]').length && undefined !== jQuery(this).find('[data-rich-text-format-boundary="true"]').attr('id')) {
            jQuery('#sg' + jQuery(this).find('[data-rich-text-format-boundary="true"]').attr('id')).addClass('focus');
          } else {
            jQuery('#md-suggestion-comments .cls-board-outer').removeClass('focus');
          }
        });
        jQuery(document).on('click', '#md-suggestion-comments .cls-board-outer:not(".focus")', function (e) {
          var sid = jQuery(this).attr('data-sid');
          if (undefined !== sid && null !== sid && 0 < jQuery('#' + sid).length) {
            jQuery('.wp-block').removeClass('is-selected');
            jQuery('#' + sid).parents('.wp-block').addClass('is-selected');
            jQuery('#' + sid).attr('data-rich-text-format-boundary', true);
          }
          jQuery('#md-suggestion-comments .cls-board-outer').removeClass('focus');
          jQuery(this).addClass('focus');
        });
      }
    }, {
      key: 'renderAllSuggestion',
      value: function renderAllSuggestion(displayHistory, commentNode) {
        var _props2 = this.props,
            attributes = _props2.attributes,
            clientId = _props2.clientId;
        var oldClientId = attributes.oldClientId;


        var suggestionChildKey = Object.keys(displayHistory[oldClientId]);
        var clientIdNode = document.getElementById(oldClientId);
        if (!clientIdNode) {
          clientIdNode = document.createElement('div');
          clientIdNode.setAttribute('id', oldClientId);
        }

        for (var i = 0; i < suggestionChildKey.length; i++) {
          var newNode = document.createElement('div');
          newNode.setAttribute('id', 'sg' + suggestionChildKey[i]);
          newNode.setAttribute('data-sid', suggestionChildKey[i]);
          newNode.setAttribute('class', 'cls-board-outer');
          clientIdNode.appendChild(newNode);
          commentNode.appendChild(clientIdNode);

          ReactDOM.render(wp.element.createElement(__WEBPACK_IMPORTED_MODULE_0__suggestion_board__["a" /* default */], { oldClientId: oldClientId, clientId: clientId, suggestionID: suggestionChildKey[i], suggestedOnText: displayHistory[oldClientId][suggestionChildKey[i]] }), document.getElementById('sg' + suggestionChildKey[i]));
        }
      }
    }, {
      key: 'render',
      value: function render() {
        return wp.element.createElement(BlockEdit, this.props);
      }
    }]);

    return _class;
  }(Component);
}, 'withBlockExtendControls'));

/***/ }),
/* 5 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__suggestion_comment__ = __webpack_require__(6);
var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }



var removeFormat = wp.richText.removeFormat;
var Fragment = wp.element.Fragment;

var SuggestionBoard = function (_React$Component) {
  _inherits(SuggestionBoard, _React$Component);

  function SuggestionBoard(props) {
    _classCallCheck(this, SuggestionBoard);

    var _this = _possibleConstructorReturn(this, (SuggestionBoard.__proto__ || Object.getPrototypeOf(SuggestionBoard)).call(this, props));

    _this.displayComments = _this.displayComments.bind(_this);
    _this.updateComment = _this.updateComment.bind(_this);
    _this.removeComment = _this.removeComment.bind(_this);
    _this.addNewComment = _this.addNewComment.bind(_this);

    _this.state = { suggestedOnText: _this.props.suggestedOnText };
    return _this;
  }

  _createClass(SuggestionBoard, [{
    key: 'removeComment',
    value: function removeComment(index) {
      var _props = this.props,
          oldClientId = _props.oldClientId,
          suggestionID = _props.suggestionID;

      var currentBoardSuggestion = this.state.suggestedOnText;
      var suggestionHistory = wp.data.select('core/editor').getEditedPostAttribute('meta')['sb_suggestion_history'];
      suggestionHistory = JSON.parse(suggestionHistory);
      currentBoardSuggestion.splice(index, 1);
      suggestionHistory[oldClientId][suggestionID] = currentBoardSuggestion;
      wp.data.dispatch('core/editor').editPost({ meta: { sb_suggestion_history: JSON.stringify(suggestionHistory) } });
      this.setState({ suggestedOnText: currentBoardSuggestion });
    }
  }, {
    key: 'updateComment',
    value: function updateComment(newText, index) {
      var _props2 = this.props,
          oldClientId = _props2.oldClientId,
          suggestionID = _props2.suggestionID;

      var currentBoardSuggestion = this.state.suggestedOnText;
      var suggestionHistory = wp.data.select('core/editor').getEditedPostAttribute('meta')['sb_suggestion_history'];
      suggestionHistory = JSON.parse(suggestionHistory);
      currentBoardSuggestion[index]['text'] = newText;
      suggestionHistory[oldClientId][suggestionID] = currentBoardSuggestion;
      wp.data.dispatch('core/editor').editPost({ meta: { sb_suggestion_history: JSON.stringify(suggestionHistory) } });
      this.setState({ suggestedOnText: currentBoardSuggestion });
    }
  }, {
    key: 'addNewComment',
    value: function addNewComment(event) {
      event.preventDefault();

      var _props3 = this.props,
          suggestionID = _props3.suggestionID,
          oldClientId = _props3.oldClientId;

      var currentTextID = 'txt' + suggestionID;
      var newText = jQuery('#' + currentTextID).val();

      if ('' !== newText) {
        var currentUser = wp.data.select('core').getCurrentUser().id;
        var userName = wp.data.select('core').getCurrentUser().name;
        var userAvtars = wp.data.select('core').getCurrentUser().avatar_urls;
        var avtarUrl = userAvtars[Object.keys(userAvtars)[1]];

        var suggestionHistory = wp.data.select('core/editor').getEditedPostAttribute('meta')['sb_suggestion_history'];
        suggestionHistory = JSON.parse(suggestionHistory);
        var today = new Date();
        var date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
        var time = today.getHours() + ':' + today.getMinutes() + ':' + today.getSeconds();
        var dateTime = date + ' ' + time;
        var newCommentInfo = { 'name': userName, 'uid': currentUser, 'avtar': avtarUrl, 'action': 'reply', 'text': newText, 'time': dateTime };
        suggestionHistory[oldClientId][suggestionID].push(newCommentInfo);
        wp.data.dispatch('core/editor').editPost({ meta: { sb_suggestion_history: JSON.stringify(suggestionHistory) } });
        jQuery('#' + currentTextID).val('');
        this.setState({ suggestedOnText: suggestionHistory[oldClientId][suggestionID] });
      } else {
        alert("Please write a comment to share!");
      }
    }
  }, {
    key: 'displayComments',
    value: function displayComments(text, i) {
      var suggestionID = this.props.suggestionID;


      return wp.element.createElement(
        __WEBPACK_IMPORTED_MODULE_0__suggestion_comment__["a" /* default */],
        {
          key: i,
          index: i,
          removeCommentFromBoard: this.removeComment,
          updateCommentFromBoard: this.updateComment,
          userName: text.name,
          dateTime: text.time,
          profileURL: text.avtar,
          userID: text.uid,
          action: text.action,
          suggestionID: suggestionID,
          clientId: this.props.clientId
        },
        'reply' === text.action && text.text,
        'reply' !== text.action && wp.element.createElement(
          Fragment,
          null,
          wp.element.createElement(
            'strong',
            null,
            text.action,
            ': '
          ),
          text.text
        )
      );
    }
  }, {
    key: 'render',
    value: function render() {
      var _this2 = this;

      var suggestionID = this.props.suggestionID;

      return wp.element.createElement(
        'div',
        { className: 'board' },
        wp.element.createElement(
          'div',
          { className: 'boardTop' },
          this.state.suggestedOnText && this.state.suggestedOnText.map(function (item, index) {
            return _this2.displayComments(item, index);
          })
        ),
        wp.element.createElement(
          'div',
          { className: 'shareCommentContainer' },
          wp.element.createElement('textarea', { id: "txt" + suggestionID, placeholder: 'Reply...' }),
          wp.element.createElement(
            'button',
            { onClick: this.addNewComment, className: 'btn btn-success' },
            'Reply'
          )
        )
      );
    }
  }]);

  return SuggestionBoard;
}(React.Component);

/* harmony default export */ __webpack_exports__["a"] = (SuggestionBoard);

/***/ }),
/* 6 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Fragment = wp.element.Fragment;
var removeFormat = wp.richText.removeFormat;

var SuggestionComment = function (_React$Component) {
  _inherits(SuggestionComment, _React$Component);

  function SuggestionComment(props) {
    _classCallCheck(this, SuggestionComment);

    var _this = _possibleConstructorReturn(this, (SuggestionComment.__proto__ || Object.getPrototypeOf(SuggestionComment)).call(this, props));

    _this.editComment = _this.editComment.bind(_this);
    _this.saveComment = _this.saveComment.bind(_this);
    _this.removeComment = _this.removeComment.bind(_this);
    _this.cancelEdit = _this.cancelEdit.bind(_this);
    _this.removeSuggestion = _this.removeSuggestion.bind(_this);
    _this.acceptSuggestion = _this.acceptSuggestion.bind(_this);
    _this.state = { editing: false };
    return _this;
  }

  _createClass(SuggestionComment, [{
    key: 'editComment',
    value: function editComment() {
      this.setState({ editing: true });
    }
  }, {
    key: 'saveComment',
    value: function saveComment(event) {
      var newText = this.newText.value;
      if ('' === newText) {
        alert('Please write a comment to update!');
        return false;
      }
      this.props.updateCommentFromBoard(newText, this.props.index);

      this.setState({ editing: false });
    }
  }, {
    key: 'removeComment',
    value: function removeComment(event) {

      if (confirm('Are you sure you want to delete this comment?')) {
        this.props.removeCommentFromBoard(this.props.index);
      }
    }
  }, {
    key: 'cancelEdit',
    value: function cancelEdit() {
      this.setState({ editing: false });
    }
  }, {
    key: 'removeSuggestion',
    value: function removeSuggestion() {
      var _props = this.props,
          clientId = _props.clientId,
          suggestionID = _props.suggestionID;

      var blockAttributes = wp.data.select('core/block-editor').getBlockAttributes(clientId);
      var oldClientId = blockAttributes.oldClientId,
          content = blockAttributes.content;

      if ('' !== oldClientId && '' !== content) {
        var suggestionHistory = wp.data.select('core/editor').getEditedPostAttribute('meta')['sb_suggestion_history'];
        if (0 < suggestionHistory.length) {
          suggestionHistory = JSON.parse(suggestionHistory);
          var findItem = 'id="' + suggestionID + '"';
          if (suggestionHistory[oldClientId][suggestionID] && -1 !== content.indexOf(findItem)) {
            var action = suggestionHistory[oldClientId][suggestionID][0].action;
            var tempDiv = document.createElement('div');
            tempDiv.innerHTML = content;
            var childElements = 'add' === action.toLowerCase() ? tempDiv.getElementsByTagName('ins') : tempDiv.getElementsByTagName('del');
            for (var i = 0; i < childElements.length; i++) {
              if (undefined !== childElements[i].id && suggestionID === childElements[i].id) {
                if ('add' === action.toLowerCase()) {
                  tempDiv.removeChild(childElements[i]);
                } else {
                  tempDiv.replaceChild(document.createTextNode(childElements[i].innerText), childElements[i]);
                }
                delete suggestionHistory[oldClientId][suggestionID];
                var finalContent = tempDiv.innerHTML;
                wp.data.dispatch('core/editor').updateBlock(clientId, {
                  attributes: {
                    content: finalContent
                  }
                });
                document.getElementById('sg' + suggestionID).remove();
                wp.data.dispatch('core/editor').editPost({ meta: { sb_suggestion_history: JSON.stringify(suggestionHistory) } });
                break;
              }
            }
          }
        }
      }
    }
  }, {
    key: 'acceptSuggestion',
    value: function acceptSuggestion() {
      var _props2 = this.props,
          clientId = _props2.clientId,
          suggestionID = _props2.suggestionID;

      var blockAttributes = wp.data.select('core/block-editor').getBlockAttributes(clientId);
      var oldClientId = blockAttributes.oldClientId,
          content = blockAttributes.content;

      if ('' !== oldClientId && '' !== content) {
        var suggestionHistory = wp.data.select('core/editor').getEditedPostAttribute('meta')['sb_suggestion_history'];
        if (0 < suggestionHistory.length) {
          suggestionHistory = JSON.parse(suggestionHistory);
          var findItem = 'id="' + suggestionID + '"';
          if (suggestionHistory[oldClientId][suggestionID] && -1 !== content.indexOf(findItem)) {
            var action = suggestionHistory[oldClientId][suggestionID][0].action;
            var tempDiv = document.createElement('div');
            tempDiv.innerHTML = content;
            var childElements = 'add' === action.toLowerCase() ? tempDiv.getElementsByTagName('ins') : tempDiv.getElementsByTagName('del');
            for (var i = 0; i < childElements.length; i++) {
              if (undefined !== childElements[i].id && suggestionID === childElements[i].id) {
                if ('add' === action.toLowerCase()) {
                  tempDiv.replaceChild(document.createTextNode(childElements[i].innerText), childElements[i]);
                } else {
                  tempDiv.removeChild(childElements[i]);
                }
                delete suggestionHistory[oldClientId][suggestionID];
                var finalContent = tempDiv.innerHTML;
                wp.data.dispatch('core/editor').updateBlock(clientId, {
                  attributes: {
                    content: finalContent
                  }
                });
                document.getElementById('sg' + suggestionID).remove();
                wp.data.dispatch('core/editor').editPost({ meta: { sb_suggestion_history: JSON.stringify(suggestionHistory) } });
                break;
              }
            }
          }
        }
      }
    }
  }, {
    key: 'renderNormalMode',
    value: function renderNormalMode() {
      var _props3 = this.props,
          userName = _props3.userName,
          profileURL = _props3.profileURL,
          dateTime = _props3.dateTime,
          action = _props3.action,
          userID = _props3.userID,
          index = _props3.index;


      var owner = wp.data.select("core").getCurrentUser().id;
      return wp.element.createElement(
        'div',
        { className: 'commentContainer' },
        wp.element.createElement(
          'div',
          { className: 'comment-header' },
          wp.element.createElement(
            'div',
            { className: 'avtar' },
            wp.element.createElement('img', { src: profileURL, alt: 'avatar' })
          ),
          wp.element.createElement(
            'div',
            { className: 'commenter-name-time' },
            wp.element.createElement(
              'div',
              { className: 'commenter-name' },
              userName
            ),
            wp.element.createElement(
              'div',
              { className: 'comment-time' },
              dateTime
            )
          ),
          index === 0 && wp.element.createElement(
            'div',
            { className: 'suggest-box-action' },
            wp.element.createElement(
              'button',
              { onClick: this.acceptSuggestion.bind(this), className: 'btn-add-suggestion' },
              wp.element.createElement(
                'svg',
                { xmlns: 'http://www.w3.org/2000/svg', width: '20', height: '20' },
                wp.element.createElement('path', { d: 'M9 16.2L4.8 12l-1.4 1.4L9 19 21 7l-1.4-1.4L9 16.2z' })
              )
            ),
            wp.element.createElement(
              'button',
              { onClick: this.removeSuggestion.bind(this), className: 'btn-remove-suggestion' },
              wp.element.createElement(
                'svg',
                { xmlns: 'http://www.w3.org/2000/svg', width: '20', height: '20' },
                wp.element.createElement('path', { d: 'M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z' })
              )
            )
          ),
          'reply' === action && wp.element.createElement(
            'div',
            { className: 'buttons-holder' },
            wp.element.createElement(
              'div',
              { className: 'buttons-opner' },
              wp.element.createElement(
                Fragment,
                null,
                userID === owner && wp.element.createElement(
                  'svg',
                  { 'aria-hidden': 'true', role: 'img', focusable: 'false', className: 'dashicon dashicons-ellipsis',
                    xmlns: 'http://www.w3.org/2000/svg', width: '20', height: '20', viewBox: '0 0 20 20' },
                  wp.element.createElement('path', {
                    d: 'M5 10c0 1.1-.9 2-2 2s-2-.9-2-2 .9-2 2-2 2 .9 2 2zm12-2c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm-7 0c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z' })
                )
              )
            ),
            wp.element.createElement(
              Fragment,
              null,
              userID === owner && wp.element.createElement(
                'div',
                { className: 'buttons-wrapper' },
                wp.element.createElement(
                  'button',
                  { onClick: this.editComment, className: 'btn btn-comment' },
                  'Edit'
                ),
                wp.element.createElement(
                  'button',
                  { onClick: this.removeComment.bind(this), className: 'btn btn-comment' },
                  'Delete'
                )
              )
            )
          )
        ),
        wp.element.createElement(
          'div',
          { className: 'commentText' },
          this.props.children
        )
      );
    }
  }, {
    key: 'renderEditingMode',
    value: function renderEditingMode() {
      var _this2 = this;

      return wp.element.createElement(
        'div',
        { className: 'commentContainer' },
        wp.element.createElement(
          'div',
          { className: 'commentText' },
          wp.element.createElement('textarea', {
            ref: function ref(input) {
              _this2.newText = input;
            },
            defaultValue: this.props.children[0]
          })
        ),
        wp.element.createElement(
          'button',
          { onClick: this.saveComment.bind(this), className: 'btn-comment' },
          'Save'
        ),
        wp.element.createElement(
          'button',
          { onClick: this.cancelEdit.bind(this), className: 'btn-comment' },
          'Cancel'
        )
      );
    }
  }, {
    key: 'render',
    value: function render() {
      return this.state.editing ? this.renderEditingMode() : this.renderNormalMode();
    }
  }]);

  return SuggestionComment;
}(React.Component);

/* harmony default export */ __webpack_exports__["a"] = (SuggestionComment);

/***/ }),
/* 7 */
/***/ (function(module, exports) {

/**
 * Diff Match and Patch
 * Copyright 2018 The diff-match-patch Authors.
 * https://github.com/google/diff-match-patch
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

/**
 * @fileoverview Computes the difference between two texts to create a patch.
 * Applies the patch onto another text, allowing for errors.
 * @author fraser@google.com (Neil Fraser)
 */

/**
 * Class containing the diff, match and patch methods.
 * @constructor
 */
var diff_match_patch = function() {

  // Defaults.
  // Redefine these in your program to override the defaults.

  // Number of seconds to map a diff before giving up (0 for infinity).
  this.Diff_Timeout = 1.0;
  // Cost of an empty edit operation in terms of edit characters.
  this.Diff_EditCost = 4;
  // At what point is no match declared (0.0 = perfection, 1.0 = very loose).
  this.Match_Threshold = 0.5;
  // How far to search for a match (0 = exact location, 1000+ = broad match).
  // A match this many characters away from the expected location will add
  // 1.0 to the score (0.0 is a perfect match).
  this.Match_Distance = 1000;
  // When deleting a large block of text (over ~64 characters), how close do
  // the contents have to be to match the expected contents. (0.0 = perfection,
  // 1.0 = very loose).  Note that Match_Threshold controls how closely the
  // end points of a delete need to match.
  this.Patch_DeleteThreshold = 0.5;
  // Chunk size for context length.
  this.Patch_Margin = 4;

  // The number of bits in an int.
  this.Match_MaxBits = 32;
};


//  DIFF FUNCTIONS


/**
 * The data structure representing a diff is an array of tuples:
 * [[DIFF_DELETE, 'Hello'], [DIFF_INSERT, 'Goodbye'], [DIFF_EQUAL, ' world.']]
 * which means: delete 'Hello', add 'Goodbye' and keep ' world.'
 */
var DIFF_DELETE = -1;
var DIFF_INSERT = 1;
var DIFF_EQUAL = 0;

/**
 * Class representing one diff tuple.
 * ~Attempts to look like a two-element array (which is what this used to be).~
 * Constructor returns an actual two-element array, to allow destructing @JackuB
 * See https://github.com/JackuB/diff-match-patch/issues/14 for details
 * @param {number} op Operation, one of: DIFF_DELETE, DIFF_INSERT, DIFF_EQUAL.
 * @param {string} text Text to be deleted, inserted, or retained.
 * @constructor
 */
diff_match_patch.Diff = function(op, text) {
  return [op, text];
};

/**
 * Find the differences between two texts.  Simplifies the problem by stripping
 * any common prefix or suffix off the texts before diffing.
 * @param {string} text1 Old string to be diffed.
 * @param {string} text2 New string to be diffed.
 * @param {boolean=} opt_checklines Optional speedup flag. If present and false,
 *     then don't run a line-level diff first to identify the changed areas.
 *     Defaults to true, which does a faster, slightly less optimal diff.
 * @param {number=} opt_deadline Optional time when the diff should be complete
 *     by.  Used internally for recursive calls.  Users should set DiffTimeout
 *     instead.
 * @return {!Array.<!diff_match_patch.Diff>} Array of diff tuples.
 */
diff_match_patch.prototype.diff_main = function(text1, text2, opt_checklines,
    opt_deadline) {
  // Set a deadline by which time the diff must be complete.
  if (typeof opt_deadline == 'undefined') {
    if (this.Diff_Timeout <= 0) {
      opt_deadline = Number.MAX_VALUE;
    } else {
      opt_deadline = (new Date).getTime() + this.Diff_Timeout * 1000;
    }
  }
  var deadline = opt_deadline;

  // Check for null inputs.
  if (text1 == null || text2 == null) {
    throw new Error('Null input. (diff_main)');
  }

  // Check for equality (speedup).
  if (text1 == text2) {
    if (text1) {
      return [new diff_match_patch.Diff(DIFF_EQUAL, text1)];
    }
    return [];
  }

  if (typeof opt_checklines == 'undefined') {
    opt_checklines = true;
  }
  var checklines = opt_checklines;

  // Trim off common prefix (speedup).
  var commonlength = this.diff_commonPrefix(text1, text2);
  var commonprefix = text1.substring(0, commonlength);
  text1 = text1.substring(commonlength);
  text2 = text2.substring(commonlength);

  // Trim off common suffix (speedup).
  commonlength = this.diff_commonSuffix(text1, text2);
  var commonsuffix = text1.substring(text1.length - commonlength);
  text1 = text1.substring(0, text1.length - commonlength);
  text2 = text2.substring(0, text2.length - commonlength);

  // Compute the diff on the middle block.
  var diffs = this.diff_compute_(text1, text2, checklines, deadline);

  // Restore the prefix and suffix.
  if (commonprefix) {
    diffs.unshift(new diff_match_patch.Diff(DIFF_EQUAL, commonprefix));
  }
  if (commonsuffix) {
    diffs.push(new diff_match_patch.Diff(DIFF_EQUAL, commonsuffix));
  }
  this.diff_cleanupMerge(diffs);
  return diffs;
};


/**
 * Find the differences between two texts.  Assumes that the texts do not
 * have any common prefix or suffix.
 * @param {string} text1 Old string to be diffed.
 * @param {string} text2 New string to be diffed.
 * @param {boolean} checklines Speedup flag.  If false, then don't run a
 *     line-level diff first to identify the changed areas.
 *     If true, then run a faster, slightly less optimal diff.
 * @param {number} deadline Time when the diff should be complete by.
 * @return {!Array.<!diff_match_patch.Diff>} Array of diff tuples.
 * @private
 */
diff_match_patch.prototype.diff_compute_ = function(text1, text2, checklines,
    deadline) {
  var diffs;

  if (!text1) {
    // Just add some text (speedup).
    return [new diff_match_patch.Diff(DIFF_INSERT, text2)];
  }

  if (!text2) {
    // Just delete some text (speedup).
    return [new diff_match_patch.Diff(DIFF_DELETE, text1)];
  }

  var longtext = text1.length > text2.length ? text1 : text2;
  var shorttext = text1.length > text2.length ? text2 : text1;
  var i = longtext.indexOf(shorttext);
  if (i != -1) {
    // Shorter text is inside the longer text (speedup).
    diffs = [new diff_match_patch.Diff(DIFF_INSERT, longtext.substring(0, i)),
             new diff_match_patch.Diff(DIFF_EQUAL, shorttext),
             new diff_match_patch.Diff(DIFF_INSERT,
                 longtext.substring(i + shorttext.length))];
    // Swap insertions for deletions if diff is reversed.
    if (text1.length > text2.length) {
      diffs[0][0] = diffs[2][0] = DIFF_DELETE;
    }
    return diffs;
  }

  if (shorttext.length == 1) {
    // Single character string.
    // After the previous speedup, the character can't be an equality.
    return [new diff_match_patch.Diff(DIFF_DELETE, text1),
            new diff_match_patch.Diff(DIFF_INSERT, text2)];
  }

  // Check to see if the problem can be split in two.
  var hm = this.diff_halfMatch_(text1, text2);
  if (hm) {
    // A half-match was found, sort out the return data.
    var text1_a = hm[0];
    var text1_b = hm[1];
    var text2_a = hm[2];
    var text2_b = hm[3];
    var mid_common = hm[4];
    // Send both pairs off for separate processing.
    var diffs_a = this.diff_main(text1_a, text2_a, checklines, deadline);
    var diffs_b = this.diff_main(text1_b, text2_b, checklines, deadline);
    // Merge the results.
    return diffs_a.concat([new diff_match_patch.Diff(DIFF_EQUAL, mid_common)],
                          diffs_b);
  }

  if (checklines && text1.length > 100 && text2.length > 100) {
    return this.diff_lineMode_(text1, text2, deadline);
  }

  return this.diff_bisect_(text1, text2, deadline);
};


/**
 * Do a quick line-level diff on both strings, then rediff the parts for
 * greater accuracy.
 * This speedup can produce non-minimal diffs.
 * @param {string} text1 Old string to be diffed.
 * @param {string} text2 New string to be diffed.
 * @param {number} deadline Time when the diff should be complete by.
 * @return {!Array.<!diff_match_patch.Diff>} Array of diff tuples.
 * @private
 */
diff_match_patch.prototype.diff_lineMode_ = function(text1, text2, deadline) {
  // Scan the text on a line-by-line basis first.
  var a = this.diff_linesToChars_(text1, text2);
  text1 = a.chars1;
  text2 = a.chars2;
  var linearray = a.lineArray;

  var diffs = this.diff_main(text1, text2, false, deadline);

  // Convert the diff back to original text.
  this.diff_charsToLines_(diffs, linearray);
  // Eliminate freak matches (e.g. blank lines)
  this.diff_cleanupSemantic(diffs);

  // Rediff any replacement blocks, this time character-by-character.
  // Add a dummy entry at the end.
  diffs.push(new diff_match_patch.Diff(DIFF_EQUAL, ''));
  var pointer = 0;
  var count_delete = 0;
  var count_insert = 0;
  var text_delete = '';
  var text_insert = '';
  while (pointer < diffs.length) {
    switch (diffs[pointer][0]) {
      case DIFF_INSERT:
        count_insert++;
        text_insert += diffs[pointer][1];
        break;
      case DIFF_DELETE:
        count_delete++;
        text_delete += diffs[pointer][1];
        break;
      case DIFF_EQUAL:
        // Upon reaching an equality, check for prior redundancies.
        if (count_delete >= 1 && count_insert >= 1) {
          // Delete the offending records and add the merged ones.
          diffs.splice(pointer - count_delete - count_insert,
                       count_delete + count_insert);
          pointer = pointer - count_delete - count_insert;
          var subDiff =
              this.diff_main(text_delete, text_insert, false, deadline);
          for (var j = subDiff.length - 1; j >= 0; j--) {
            diffs.splice(pointer, 0, subDiff[j]);
          }
          pointer = pointer + subDiff.length;
        }
        count_insert = 0;
        count_delete = 0;
        text_delete = '';
        text_insert = '';
        break;
    }
    pointer++;
  }
  diffs.pop();  // Remove the dummy entry at the end.

  return diffs;
};


/**
 * Find the 'middle snake' of a diff, split the problem in two
 * and return the recursively constructed diff.
 * See Myers 1986 paper: An O(ND) Difference Algorithm and Its Variations.
 * @param {string} text1 Old string to be diffed.
 * @param {string} text2 New string to be diffed.
 * @param {number} deadline Time at which to bail if not yet complete.
 * @return {!Array.<!diff_match_patch.Diff>} Array of diff tuples.
 * @private
 */
diff_match_patch.prototype.diff_bisect_ = function(text1, text2, deadline) {
  // Cache the text lengths to prevent multiple calls.
  var text1_length = text1.length;
  var text2_length = text2.length;
  var max_d = Math.ceil((text1_length + text2_length) / 2);
  var v_offset = max_d;
  var v_length = 2 * max_d;
  var v1 = new Array(v_length);
  var v2 = new Array(v_length);
  // Setting all elements to -1 is faster in Chrome & Firefox than mixing
  // integers and undefined.
  for (var x = 0; x < v_length; x++) {
    v1[x] = -1;
    v2[x] = -1;
  }
  v1[v_offset + 1] = 0;
  v2[v_offset + 1] = 0;
  var delta = text1_length - text2_length;
  // If the total number of characters is odd, then the front path will collide
  // with the reverse path.
  var front = (delta % 2 != 0);
  // Offsets for start and end of k loop.
  // Prevents mapping of space beyond the grid.
  var k1start = 0;
  var k1end = 0;
  var k2start = 0;
  var k2end = 0;
  for (var d = 0; d < max_d; d++) {
    // Bail out if deadline is reached.
    if ((new Date()).getTime() > deadline) {
      break;
    }

    // Walk the front path one step.
    for (var k1 = -d + k1start; k1 <= d - k1end; k1 += 2) {
      var k1_offset = v_offset + k1;
      var x1;
      if (k1 == -d || (k1 != d && v1[k1_offset - 1] < v1[k1_offset + 1])) {
        x1 = v1[k1_offset + 1];
      } else {
        x1 = v1[k1_offset - 1] + 1;
      }
      var y1 = x1 - k1;
      while (x1 < text1_length && y1 < text2_length &&
             text1.charAt(x1) == text2.charAt(y1)) {
        x1++;
        y1++;
      }
      v1[k1_offset] = x1;
      if (x1 > text1_length) {
        // Ran off the right of the graph.
        k1end += 2;
      } else if (y1 > text2_length) {
        // Ran off the bottom of the graph.
        k1start += 2;
      } else if (front) {
        var k2_offset = v_offset + delta - k1;
        if (k2_offset >= 0 && k2_offset < v_length && v2[k2_offset] != -1) {
          // Mirror x2 onto top-left coordinate system.
          var x2 = text1_length - v2[k2_offset];
          if (x1 >= x2) {
            // Overlap detected.
            return this.diff_bisectSplit_(text1, text2, x1, y1, deadline);
          }
        }
      }
    }

    // Walk the reverse path one step.
    for (var k2 = -d + k2start; k2 <= d - k2end; k2 += 2) {
      var k2_offset = v_offset + k2;
      var x2;
      if (k2 == -d || (k2 != d && v2[k2_offset - 1] < v2[k2_offset + 1])) {
        x2 = v2[k2_offset + 1];
      } else {
        x2 = v2[k2_offset - 1] + 1;
      }
      var y2 = x2 - k2;
      while (x2 < text1_length && y2 < text2_length &&
             text1.charAt(text1_length - x2 - 1) ==
             text2.charAt(text2_length - y2 - 1)) {
        x2++;
        y2++;
      }
      v2[k2_offset] = x2;
      if (x2 > text1_length) {
        // Ran off the left of the graph.
        k2end += 2;
      } else if (y2 > text2_length) {
        // Ran off the top of the graph.
        k2start += 2;
      } else if (!front) {
        var k1_offset = v_offset + delta - k2;
        if (k1_offset >= 0 && k1_offset < v_length && v1[k1_offset] != -1) {
          var x1 = v1[k1_offset];
          var y1 = v_offset + x1 - k1_offset;
          // Mirror x2 onto top-left coordinate system.
          x2 = text1_length - x2;
          if (x1 >= x2) {
            // Overlap detected.
            return this.diff_bisectSplit_(text1, text2, x1, y1, deadline);
          }
        }
      }
    }
  }
  // Diff took too long and hit the deadline or
  // number of diffs equals number of characters, no commonality at all.
  return [new diff_match_patch.Diff(DIFF_DELETE, text1),
          new diff_match_patch.Diff(DIFF_INSERT, text2)];
};


/**
 * Given the location of the 'middle snake', split the diff in two parts
 * and recurse.
 * @param {string} text1 Old string to be diffed.
 * @param {string} text2 New string to be diffed.
 * @param {number} x Index of split point in text1.
 * @param {number} y Index of split point in text2.
 * @param {number} deadline Time at which to bail if not yet complete.
 * @return {!Array.<!diff_match_patch.Diff>} Array of diff tuples.
 * @private
 */
diff_match_patch.prototype.diff_bisectSplit_ = function(text1, text2, x, y,
    deadline) {
  var text1a = text1.substring(0, x);
  var text2a = text2.substring(0, y);
  var text1b = text1.substring(x);
  var text2b = text2.substring(y);

  // Compute both diffs serially.
  var diffs = this.diff_main(text1a, text2a, false, deadline);
  var diffsb = this.diff_main(text1b, text2b, false, deadline);

  return diffs.concat(diffsb);
};


/**
 * Split two texts into an array of strings.  Reduce the texts to a string of
 * hashes where each Unicode character represents one line.
 * @param {string} text1 First string.
 * @param {string} text2 Second string.
 * @return {{chars1: string, chars2: string, lineArray: !Array.<string>}}
 *     An object containing the encoded text1, the encoded text2 and
 *     the array of unique strings.
 *     The zeroth element of the array of unique strings is intentionally blank.
 * @private
 */
diff_match_patch.prototype.diff_linesToChars_ = function(text1, text2) {
  var lineArray = [];  // e.g. lineArray[4] == 'Hello\n'
  var lineHash = {};   // e.g. lineHash['Hello\n'] == 4

  // '\x00' is a valid character, but various debuggers don't like it.
  // So we'll insert a junk entry to avoid generating a null character.
  lineArray[0] = '';

  /**
   * Split a text into an array of strings.  Reduce the texts to a string of
   * hashes where each Unicode character represents one line.
   * Modifies linearray and linehash through being a closure.
   * @param {string} text String to encode.
   * @return {string} Encoded string.
   * @private
   */
  function diff_linesToCharsMunge_(text) {
    var chars = '';
    // Walk the text, pulling out a substring for each line.
    // text.split('\n') would would temporarily double our memory footprint.
    // Modifying text would create many large strings to garbage collect.
    var lineStart = 0;
    var lineEnd = -1;
    // Keeping our own length variable is faster than looking it up.
    var lineArrayLength = lineArray.length;
    while (lineEnd < text.length - 1) {
      lineEnd = text.indexOf('\n', lineStart);
      if (lineEnd == -1) {
        lineEnd = text.length - 1;
      }
      var line = text.substring(lineStart, lineEnd + 1);

      if (lineHash.hasOwnProperty ? lineHash.hasOwnProperty(line) :
          (lineHash[line] !== undefined)) {
        chars += String.fromCharCode(lineHash[line]);
      } else {
        if (lineArrayLength == maxLines) {
          // Bail out at 65535 because
          // String.fromCharCode(65536) == String.fromCharCode(0)
          line = text.substring(lineStart);
          lineEnd = text.length;
        }
        chars += String.fromCharCode(lineArrayLength);
        lineHash[line] = lineArrayLength;
        lineArray[lineArrayLength++] = line;
      }
      lineStart = lineEnd + 1;
    }
    return chars;
  }
  // Allocate 2/3rds of the space for text1, the rest for text2.
  var maxLines = 40000;
  var chars1 = diff_linesToCharsMunge_(text1);
  maxLines = 65535;
  var chars2 = diff_linesToCharsMunge_(text2);
  return {chars1: chars1, chars2: chars2, lineArray: lineArray};
};


/**
 * Rehydrate the text in a diff from a string of line hashes to real lines of
 * text.
 * @param {!Array.<!diff_match_patch.Diff>} diffs Array of diff tuples.
 * @param {!Array.<string>} lineArray Array of unique strings.
 * @private
 */
diff_match_patch.prototype.diff_charsToLines_ = function(diffs, lineArray) {
  for (var i = 0; i < diffs.length; i++) {
    var chars = diffs[i][1];
    var text = [];
    for (var j = 0; j < chars.length; j++) {
      text[j] = lineArray[chars.charCodeAt(j)];
    }
    diffs[i][1] = text.join('');
  }
};


/**
 * Determine the common prefix of two strings.
 * @param {string} text1 First string.
 * @param {string} text2 Second string.
 * @return {number} The number of characters common to the start of each
 *     string.
 */
diff_match_patch.prototype.diff_commonPrefix = function(text1, text2) {
  // Quick check for common null cases.
  if (!text1 || !text2 || text1.charAt(0) != text2.charAt(0)) {
    return 0;
  }
  // Binary search.
  // Performance analysis: https://neil.fraser.name/news/2007/10/09/
  var pointermin = 0;
  var pointermax = Math.min(text1.length, text2.length);
  var pointermid = pointermax;
  var pointerstart = 0;
  while (pointermin < pointermid) {
    if (text1.substring(pointerstart, pointermid) ==
        text2.substring(pointerstart, pointermid)) {
      pointermin = pointermid;
      pointerstart = pointermin;
    } else {
      pointermax = pointermid;
    }
    pointermid = Math.floor((pointermax - pointermin) / 2 + pointermin);
  }
  return pointermid;
};


/**
 * Determine the common suffix of two strings.
 * @param {string} text1 First string.
 * @param {string} text2 Second string.
 * @return {number} The number of characters common to the end of each string.
 */
diff_match_patch.prototype.diff_commonSuffix = function(text1, text2) {
  // Quick check for common null cases.
  if (!text1 || !text2 ||
      text1.charAt(text1.length - 1) != text2.charAt(text2.length - 1)) {
    return 0;
  }
  // Binary search.
  // Performance analysis: https://neil.fraser.name/news/2007/10/09/
  var pointermin = 0;
  var pointermax = Math.min(text1.length, text2.length);
  var pointermid = pointermax;
  var pointerend = 0;
  while (pointermin < pointermid) {
    if (text1.substring(text1.length - pointermid, text1.length - pointerend) ==
        text2.substring(text2.length - pointermid, text2.length - pointerend)) {
      pointermin = pointermid;
      pointerend = pointermin;
    } else {
      pointermax = pointermid;
    }
    pointermid = Math.floor((pointermax - pointermin) / 2 + pointermin);
  }
  return pointermid;
};


/**
 * Determine if the suffix of one string is the prefix of another.
 * @param {string} text1 First string.
 * @param {string} text2 Second string.
 * @return {number} The number of characters common to the end of the first
 *     string and the start of the second string.
 * @private
 */
diff_match_patch.prototype.diff_commonOverlap_ = function(text1, text2) {
  // Cache the text lengths to prevent multiple calls.
  var text1_length = text1.length;
  var text2_length = text2.length;
  // Eliminate the null case.
  if (text1_length == 0 || text2_length == 0) {
    return 0;
  }
  // Truncate the longer string.
  if (text1_length > text2_length) {
    text1 = text1.substring(text1_length - text2_length);
  } else if (text1_length < text2_length) {
    text2 = text2.substring(0, text1_length);
  }
  var text_length = Math.min(text1_length, text2_length);
  // Quick check for the worst case.
  if (text1 == text2) {
    return text_length;
  }

  // Start by looking for a single character match
  // and increase length until no match is found.
  // Performance analysis: https://neil.fraser.name/news/2010/11/04/
  var best = 0;
  var length = 1;
  while (true) {
    var pattern = text1.substring(text_length - length);
    var found = text2.indexOf(pattern);
    if (found == -1) {
      return best;
    }
    length += found;
    if (found == 0 || text1.substring(text_length - length) ==
        text2.substring(0, length)) {
      best = length;
      length++;
    }
  }
};


/**
 * Do the two texts share a substring which is at least half the length of the
 * longer text?
 * This speedup can produce non-minimal diffs.
 * @param {string} text1 First string.
 * @param {string} text2 Second string.
 * @return {Array.<string>} Five element Array, containing the prefix of
 *     text1, the suffix of text1, the prefix of text2, the suffix of
 *     text2 and the common middle.  Or null if there was no match.
 * @private
 */
diff_match_patch.prototype.diff_halfMatch_ = function(text1, text2) {
  if (this.Diff_Timeout <= 0) {
    // Don't risk returning a non-optimal diff if we have unlimited time.
    return null;
  }
  var longtext = text1.length > text2.length ? text1 : text2;
  var shorttext = text1.length > text2.length ? text2 : text1;
  if (longtext.length < 4 || shorttext.length * 2 < longtext.length) {
    return null;  // Pointless.
  }
  var dmp = this;  // 'this' becomes 'window' in a closure.

  /**
   * Does a substring of shorttext exist within longtext such that the substring
   * is at least half the length of longtext?
   * Closure, but does not reference any external variables.
   * @param {string} longtext Longer string.
   * @param {string} shorttext Shorter string.
   * @param {number} i Start index of quarter length substring within longtext.
   * @return {Array.<string>} Five element Array, containing the prefix of
   *     longtext, the suffix of longtext, the prefix of shorttext, the suffix
   *     of shorttext and the common middle.  Or null if there was no match.
   * @private
   */
  function diff_halfMatchI_(longtext, shorttext, i) {
    // Start with a 1/4 length substring at position i as a seed.
    var seed = longtext.substring(i, i + Math.floor(longtext.length / 4));
    var j = -1;
    var best_common = '';
    var best_longtext_a, best_longtext_b, best_shorttext_a, best_shorttext_b;
    while ((j = shorttext.indexOf(seed, j + 1)) != -1) {
      var prefixLength = dmp.diff_commonPrefix(longtext.substring(i),
                                               shorttext.substring(j));
      var suffixLength = dmp.diff_commonSuffix(longtext.substring(0, i),
                                               shorttext.substring(0, j));
      if (best_common.length < suffixLength + prefixLength) {
        best_common = shorttext.substring(j - suffixLength, j) +
            shorttext.substring(j, j + prefixLength);
        best_longtext_a = longtext.substring(0, i - suffixLength);
        best_longtext_b = longtext.substring(i + prefixLength);
        best_shorttext_a = shorttext.substring(0, j - suffixLength);
        best_shorttext_b = shorttext.substring(j + prefixLength);
      }
    }
    if (best_common.length * 2 >= longtext.length) {
      return [best_longtext_a, best_longtext_b,
              best_shorttext_a, best_shorttext_b, best_common];
    } else {
      return null;
    }
  }

  // First check if the second quarter is the seed for a half-match.
  var hm1 = diff_halfMatchI_(longtext, shorttext,
                             Math.ceil(longtext.length / 4));
  // Check again based on the third quarter.
  var hm2 = diff_halfMatchI_(longtext, shorttext,
                             Math.ceil(longtext.length / 2));
  var hm;
  if (!hm1 && !hm2) {
    return null;
  } else if (!hm2) {
    hm = hm1;
  } else if (!hm1) {
    hm = hm2;
  } else {
    // Both matched.  Select the longest.
    hm = hm1[4].length > hm2[4].length ? hm1 : hm2;
  }

  // A half-match was found, sort out the return data.
  var text1_a, text1_b, text2_a, text2_b;
  if (text1.length > text2.length) {
    text1_a = hm[0];
    text1_b = hm[1];
    text2_a = hm[2];
    text2_b = hm[3];
  } else {
    text2_a = hm[0];
    text2_b = hm[1];
    text1_a = hm[2];
    text1_b = hm[3];
  }
  var mid_common = hm[4];
  return [text1_a, text1_b, text2_a, text2_b, mid_common];
};


/**
 * Reduce the number of edits by eliminating semantically trivial equalities.
 * @param {!Array.<!diff_match_patch.Diff>} diffs Array of diff tuples.
 */
diff_match_patch.prototype.diff_cleanupSemantic = function(diffs) {
  var changes = false;
  var equalities = [];  // Stack of indices where equalities are found.
  var equalitiesLength = 0;  // Keeping our own length var is faster in JS.
  /** @type {?string} */
  var lastEquality = null;
  // Always equal to diffs[equalities[equalitiesLength - 1]][1]
  var pointer = 0;  // Index of current position.
  // Number of characters that changed prior to the equality.
  var length_insertions1 = 0;
  var length_deletions1 = 0;
  // Number of characters that changed after the equality.
  var length_insertions2 = 0;
  var length_deletions2 = 0;
  while (pointer < diffs.length) {
    if (diffs[pointer][0] == DIFF_EQUAL) {  // Equality found.
      equalities[equalitiesLength++] = pointer;
      length_insertions1 = length_insertions2;
      length_deletions1 = length_deletions2;
      length_insertions2 = 0;
      length_deletions2 = 0;
      lastEquality = diffs[pointer][1];
    } else {  // An insertion or deletion.
      if (diffs[pointer][0] == DIFF_INSERT) {
        length_insertions2 += diffs[pointer][1].length;
      } else {
        length_deletions2 += diffs[pointer][1].length;
      }
      // Eliminate an equality that is smaller or equal to the edits on both
      // sides of it.
      if (lastEquality && (lastEquality.length <=
          Math.max(length_insertions1, length_deletions1)) &&
          (lastEquality.length <= Math.max(length_insertions2,
                                           length_deletions2))) {
        // Duplicate record.
        diffs.splice(equalities[equalitiesLength - 1], 0,
                     new diff_match_patch.Diff(DIFF_DELETE, lastEquality));
        // Change second copy to insert.
        diffs[equalities[equalitiesLength - 1] + 1][0] = DIFF_INSERT;
        // Throw away the equality we just deleted.
        equalitiesLength--;
        // Throw away the previous equality (it needs to be reevaluated).
        equalitiesLength--;
        pointer = equalitiesLength > 0 ? equalities[equalitiesLength - 1] : -1;
        length_insertions1 = 0;  // Reset the counters.
        length_deletions1 = 0;
        length_insertions2 = 0;
        length_deletions2 = 0;
        lastEquality = null;
        changes = true;
      }
    }
    pointer++;
  }

  // Normalize the diff.
  if (changes) {
    this.diff_cleanupMerge(diffs);
  }
  this.diff_cleanupSemanticLossless(diffs);

  // Find any overlaps between deletions and insertions.
  // e.g: <del>abcxxx</del><ins>xxxdef</ins>
  //   -> <del>abc</del>xxx<ins>def</ins>
  // e.g: <del>xxxabc</del><ins>defxxx</ins>
  //   -> <ins>def</ins>xxx<del>abc</del>
  // Only extract an overlap if it is as big as the edit ahead or behind it.
  pointer = 1;
  while (pointer < diffs.length) {
    if (diffs[pointer - 1][0] == DIFF_DELETE &&
        diffs[pointer][0] == DIFF_INSERT) {
      var deletion = diffs[pointer - 1][1];
      var insertion = diffs[pointer][1];
      var overlap_length1 = this.diff_commonOverlap_(deletion, insertion);
      var overlap_length2 = this.diff_commonOverlap_(insertion, deletion);
      if (overlap_length1 >= overlap_length2) {
        if (overlap_length1 >= deletion.length / 2 ||
            overlap_length1 >= insertion.length / 2) {
          // Overlap found.  Insert an equality and trim the surrounding edits.
          diffs.splice(pointer, 0, new diff_match_patch.Diff(DIFF_EQUAL,
              insertion.substring(0, overlap_length1)));
          diffs[pointer - 1][1] =
              deletion.substring(0, deletion.length - overlap_length1);
          diffs[pointer + 1][1] = insertion.substring(overlap_length1);
          pointer++;
        }
      } else {
        if (overlap_length2 >= deletion.length / 2 ||
            overlap_length2 >= insertion.length / 2) {
          // Reverse overlap found.
          // Insert an equality and swap and trim the surrounding edits.
          diffs.splice(pointer, 0, new diff_match_patch.Diff(DIFF_EQUAL,
              deletion.substring(0, overlap_length2)));
          diffs[pointer - 1][0] = DIFF_INSERT;
          diffs[pointer - 1][1] =
              insertion.substring(0, insertion.length - overlap_length2);
          diffs[pointer + 1][0] = DIFF_DELETE;
          diffs[pointer + 1][1] =
              deletion.substring(overlap_length2);
          pointer++;
        }
      }
      pointer++;
    }
    pointer++;
  }
};


/**
 * Look for single edits surrounded on both sides by equalities
 * which can be shifted sideways to align the edit to a word boundary.
 * e.g: The c<ins>at c</ins>ame. -> The <ins>cat </ins>came.
 * @param {!Array.<!diff_match_patch.Diff>} diffs Array of diff tuples.
 */
diff_match_patch.prototype.diff_cleanupSemanticLossless = function(diffs) {
  /**
   * Given two strings, compute a score representing whether the internal
   * boundary falls on logical boundaries.
   * Scores range from 6 (best) to 0 (worst).
   * Closure, but does not reference any external variables.
   * @param {string} one First string.
   * @param {string} two Second string.
   * @return {number} The score.
   * @private
   */
  function diff_cleanupSemanticScore_(one, two) {
    if (!one || !two) {
      // Edges are the best.
      return 6;
    }

    // Each port of this function behaves slightly differently due to
    // subtle differences in each language's definition of things like
    // 'whitespace'.  Since this function's purpose is largely cosmetic,
    // the choice has been made to use each language's native features
    // rather than force total conformity.
    var char1 = one.charAt(one.length - 1);
    var char2 = two.charAt(0);
    var nonAlphaNumeric1 = char1.match(diff_match_patch.nonAlphaNumericRegex_);
    var nonAlphaNumeric2 = char2.match(diff_match_patch.nonAlphaNumericRegex_);
    var whitespace1 = nonAlphaNumeric1 &&
        char1.match(diff_match_patch.whitespaceRegex_);
    var whitespace2 = nonAlphaNumeric2 &&
        char2.match(diff_match_patch.whitespaceRegex_);
    var lineBreak1 = whitespace1 &&
        char1.match(diff_match_patch.linebreakRegex_);
    var lineBreak2 = whitespace2 &&
        char2.match(diff_match_patch.linebreakRegex_);
    var blankLine1 = lineBreak1 &&
        one.match(diff_match_patch.blanklineEndRegex_);
    var blankLine2 = lineBreak2 &&
        two.match(diff_match_patch.blanklineStartRegex_);

    if (blankLine1 || blankLine2) {
      // Five points for blank lines.
      return 5;
    } else if (lineBreak1 || lineBreak2) {
      // Four points for line breaks.
      return 4;
    } else if (nonAlphaNumeric1 && !whitespace1 && whitespace2) {
      // Three points for end of sentences.
      return 3;
    } else if (whitespace1 || whitespace2) {
      // Two points for whitespace.
      return 2;
    } else if (nonAlphaNumeric1 || nonAlphaNumeric2) {
      // One point for non-alphanumeric.
      return 1;
    }
    return 0;
  }

  var pointer = 1;
  // Intentionally ignore the first and last element (don't need checking).
  while (pointer < diffs.length - 1) {
    if (diffs[pointer - 1][0] == DIFF_EQUAL &&
        diffs[pointer + 1][0] == DIFF_EQUAL) {
      // This is a single edit surrounded by equalities.
      var equality1 = diffs[pointer - 1][1];
      var edit = diffs[pointer][1];
      var equality2 = diffs[pointer + 1][1];

      // First, shift the edit as far left as possible.
      var commonOffset = this.diff_commonSuffix(equality1, edit);
      if (commonOffset) {
        var commonString = edit.substring(edit.length - commonOffset);
        equality1 = equality1.substring(0, equality1.length - commonOffset);
        edit = commonString + edit.substring(0, edit.length - commonOffset);
        equality2 = commonString + equality2;
      }

      // Second, step character by character right, looking for the best fit.
      var bestEquality1 = equality1;
      var bestEdit = edit;
      var bestEquality2 = equality2;
      var bestScore = diff_cleanupSemanticScore_(equality1, edit) +
          diff_cleanupSemanticScore_(edit, equality2);
      while (edit.charAt(0) === equality2.charAt(0)) {
        equality1 += edit.charAt(0);
        edit = edit.substring(1) + equality2.charAt(0);
        equality2 = equality2.substring(1);
        var score = diff_cleanupSemanticScore_(equality1, edit) +
            diff_cleanupSemanticScore_(edit, equality2);
        // The >= encourages trailing rather than leading whitespace on edits.
        if (score >= bestScore) {
          bestScore = score;
          bestEquality1 = equality1;
          bestEdit = edit;
          bestEquality2 = equality2;
        }
      }

      if (diffs[pointer - 1][1] != bestEquality1) {
        // We have an improvement, save it back to the diff.
        if (bestEquality1) {
          diffs[pointer - 1][1] = bestEquality1;
        } else {
          diffs.splice(pointer - 1, 1);
          pointer--;
        }
        diffs[pointer][1] = bestEdit;
        if (bestEquality2) {
          diffs[pointer + 1][1] = bestEquality2;
        } else {
          diffs.splice(pointer + 1, 1);
          pointer--;
        }
      }
    }
    pointer++;
  }
};

// Define some regex patterns for matching boundaries.
diff_match_patch.nonAlphaNumericRegex_ = /[^a-zA-Z0-9]/;
diff_match_patch.whitespaceRegex_ = /\s/;
diff_match_patch.linebreakRegex_ = /[\r\n]/;
diff_match_patch.blanklineEndRegex_ = /\n\r?\n$/;
diff_match_patch.blanklineStartRegex_ = /^\r?\n\r?\n/;

/**
 * Reduce the number of edits by eliminating operationally trivial equalities.
 * @param {!Array.<!diff_match_patch.Diff>} diffs Array of diff tuples.
 */
diff_match_patch.prototype.diff_cleanupEfficiency = function(diffs) {
  var changes = false;
  var equalities = [];  // Stack of indices where equalities are found.
  var equalitiesLength = 0;  // Keeping our own length var is faster in JS.
  /** @type {?string} */
  var lastEquality = null;
  // Always equal to diffs[equalities[equalitiesLength - 1]][1]
  var pointer = 0;  // Index of current position.
  // Is there an insertion operation before the last equality.
  var pre_ins = false;
  // Is there a deletion operation before the last equality.
  var pre_del = false;
  // Is there an insertion operation after the last equality.
  var post_ins = false;
  // Is there a deletion operation after the last equality.
  var post_del = false;
  while (pointer < diffs.length) {
    if (diffs[pointer][0] == DIFF_EQUAL) {  // Equality found.
      if (diffs[pointer][1].length < this.Diff_EditCost &&
          (post_ins || post_del)) {
        // Candidate found.
        equalities[equalitiesLength++] = pointer;
        pre_ins = post_ins;
        pre_del = post_del;
        lastEquality = diffs[pointer][1];
      } else {
        // Not a candidate, and can never become one.
        equalitiesLength = 0;
        lastEquality = null;
      }
      post_ins = post_del = false;
    } else {  // An insertion or deletion.
      if (diffs[pointer][0] == DIFF_DELETE) {
        post_del = true;
      } else {
        post_ins = true;
      }
      /*
       * Five types to be split:
       * <ins>A</ins><del>B</del>XY<ins>C</ins><del>D</del>
       * <ins>A</ins>X<ins>C</ins><del>D</del>
       * <ins>A</ins><del>B</del>X<ins>C</ins>
       * <ins>A</del>X<ins>C</ins><del>D</del>
       * <ins>A</ins><del>B</del>X<del>C</del>
       */
      if (lastEquality && ((pre_ins && pre_del && post_ins && post_del) ||
                           ((lastEquality.length < this.Diff_EditCost / 2) &&
                            (pre_ins + pre_del + post_ins + post_del) == 3))) {
        // Duplicate record.
        diffs.splice(equalities[equalitiesLength - 1], 0,
                     new diff_match_patch.Diff(DIFF_DELETE, lastEquality));
        // Change second copy to insert.
        diffs[equalities[equalitiesLength - 1] + 1][0] = DIFF_INSERT;
        equalitiesLength--;  // Throw away the equality we just deleted;
        lastEquality = null;
        if (pre_ins && pre_del) {
          // No changes made which could affect previous entry, keep going.
          post_ins = post_del = true;
          equalitiesLength = 0;
        } else {
          equalitiesLength--;  // Throw away the previous equality.
          pointer = equalitiesLength > 0 ?
              equalities[equalitiesLength - 1] : -1;
          post_ins = post_del = false;
        }
        changes = true;
      }
    }
    pointer++;
  }

  if (changes) {
    this.diff_cleanupMerge(diffs);
  }
};


/**
 * Reorder and merge like edit sections.  Merge equalities.
 * Any edit section can move as long as it doesn't cross an equality.
 * @param {!Array.<!diff_match_patch.Diff>} diffs Array of diff tuples.
 */
diff_match_patch.prototype.diff_cleanupMerge = function(diffs) {
  // Add a dummy entry at the end.
  diffs.push(new diff_match_patch.Diff(DIFF_EQUAL, ''));
  var pointer = 0;
  var count_delete = 0;
  var count_insert = 0;
  var text_delete = '';
  var text_insert = '';
  var commonlength;
  while (pointer < diffs.length) {
    switch (diffs[pointer][0]) {
      case DIFF_INSERT:
        count_insert++;
        text_insert += diffs[pointer][1];
        pointer++;
        break;
      case DIFF_DELETE:
        count_delete++;
        text_delete += diffs[pointer][1];
        pointer++;
        break;
      case DIFF_EQUAL:
        // Upon reaching an equality, check for prior redundancies.
        if (count_delete + count_insert > 1) {
          if (count_delete !== 0 && count_insert !== 0) {
            // Factor out any common prefixies.
            commonlength = this.diff_commonPrefix(text_insert, text_delete);
            if (commonlength !== 0) {
              if ((pointer - count_delete - count_insert) > 0 &&
                  diffs[pointer - count_delete - count_insert - 1][0] ==
                  DIFF_EQUAL) {
                diffs[pointer - count_delete - count_insert - 1][1] +=
                    text_insert.substring(0, commonlength);
              } else {
                diffs.splice(0, 0, new diff_match_patch.Diff(DIFF_EQUAL,
                    text_insert.substring(0, commonlength)));
                pointer++;
              }
              text_insert = text_insert.substring(commonlength);
              text_delete = text_delete.substring(commonlength);
            }
            // Factor out any common suffixies.
            commonlength = this.diff_commonSuffix(text_insert, text_delete);
            if (commonlength !== 0) {
              diffs[pointer][1] = text_insert.substring(text_insert.length -
                  commonlength) + diffs[pointer][1];
              text_insert = text_insert.substring(0, text_insert.length -
                  commonlength);
              text_delete = text_delete.substring(0, text_delete.length -
                  commonlength);
            }
          }
          // Delete the offending records and add the merged ones.
          pointer -= count_delete + count_insert;
          diffs.splice(pointer, count_delete + count_insert);
          if (text_delete.length) {
            diffs.splice(pointer, 0,
                new diff_match_patch.Diff(DIFF_DELETE, text_delete));
            pointer++;
          }
          if (text_insert.length) {
            diffs.splice(pointer, 0,
                new diff_match_patch.Diff(DIFF_INSERT, text_insert));
            pointer++;
          }
          pointer++;
        } else if (pointer !== 0 && diffs[pointer - 1][0] == DIFF_EQUAL) {
          // Merge this equality with the previous one.
          diffs[pointer - 1][1] += diffs[pointer][1];
          diffs.splice(pointer, 1);
        } else {
          pointer++;
        }
        count_insert = 0;
        count_delete = 0;
        text_delete = '';
        text_insert = '';
        break;
    }
  }
  if (diffs[diffs.length - 1][1] === '') {
    diffs.pop();  // Remove the dummy entry at the end.
  }

  // Second pass: look for single edits surrounded on both sides by equalities
  // which can be shifted sideways to eliminate an equality.
  // e.g: A<ins>BA</ins>C -> <ins>AB</ins>AC
  var changes = false;
  pointer = 1;
  // Intentionally ignore the first and last element (don't need checking).
  while (pointer < diffs.length - 1) {
    if (diffs[pointer - 1][0] == DIFF_EQUAL &&
        diffs[pointer + 1][0] == DIFF_EQUAL) {
      // This is a single edit surrounded by equalities.
      if (diffs[pointer][1].substring(diffs[pointer][1].length -
          diffs[pointer - 1][1].length) == diffs[pointer - 1][1]) {
        // Shift the edit over the previous equality.
        diffs[pointer][1] = diffs[pointer - 1][1] +
            diffs[pointer][1].substring(0, diffs[pointer][1].length -
                                        diffs[pointer - 1][1].length);
        diffs[pointer + 1][1] = diffs[pointer - 1][1] + diffs[pointer + 1][1];
        diffs.splice(pointer - 1, 1);
        changes = true;
      } else if (diffs[pointer][1].substring(0, diffs[pointer + 1][1].length) ==
          diffs[pointer + 1][1]) {
        // Shift the edit over the next equality.
        diffs[pointer - 1][1] += diffs[pointer + 1][1];
        diffs[pointer][1] =
            diffs[pointer][1].substring(diffs[pointer + 1][1].length) +
            diffs[pointer + 1][1];
        diffs.splice(pointer + 1, 1);
        changes = true;
      }
    }
    pointer++;
  }
  // If shifts were made, the diff needs reordering and another shift sweep.
  if (changes) {
    this.diff_cleanupMerge(diffs);
  }
};


/**
 * loc is a location in text1, compute and return the equivalent location in
 * text2.
 * e.g. 'The cat' vs 'The big cat', 1->1, 5->8
 * @param {!Array.<!diff_match_patch.Diff>} diffs Array of diff tuples.
 * @param {number} loc Location within text1.
 * @return {number} Location within text2.
 */
diff_match_patch.prototype.diff_xIndex = function(diffs, loc) {
  var chars1 = 0;
  var chars2 = 0;
  var last_chars1 = 0;
  var last_chars2 = 0;
  var x;
  for (x = 0; x < diffs.length; x++) {
    if (diffs[x][0] !== DIFF_INSERT) {  // Equality or deletion.
      chars1 += diffs[x][1].length;
    }
    if (diffs[x][0] !== DIFF_DELETE) {  // Equality or insertion.
      chars2 += diffs[x][1].length;
    }
    if (chars1 > loc) {  // Overshot the location.
      break;
    }
    last_chars1 = chars1;
    last_chars2 = chars2;
  }
  // Was the location was deleted?
  if (diffs.length != x && diffs[x][0] === DIFF_DELETE) {
    return last_chars2;
  }
  // Add the remaining character length.
  return last_chars2 + (loc - last_chars1);
};


/**
 * Convert a diff array into a pretty HTML report.
 * @param {!Array.<!diff_match_patch.Diff>} diffs Array of diff tuples.
 * @return {string} HTML representation.
 */
diff_match_patch.prototype.diff_prettyHtml = function(diffs) {
  var html = [];
  var pattern_amp = /&/g;
  var pattern_lt = /</g;
  var pattern_gt = />/g;
  var pattern_para = /\n/g;
  for (var x = 0; x < diffs.length; x++) {
    var op = diffs[x][0];    // Operation (insert, delete, equal)
    var data = diffs[x][1];  // Text of change.
    var text = data.replace(pattern_amp, '&amp;').replace(pattern_lt, '&lt;')
        .replace(pattern_gt, '&gt;').replace(pattern_para, '&para;<br>');
    switch (op) {
      case DIFF_INSERT:
        html[x] = '<ins style="background:#e6ffe6;">' + text + '</ins>';
        break;
      case DIFF_DELETE:
        html[x] = '<del style="background:#ffe6e6;">' + text + '</del>';
        break;
      case DIFF_EQUAL:
        html[x] = '<span>' + text + '</span>';
        break;
    }
  }
  return html.join('');
};


/**
 * Compute and return the source text (all equalities and deletions).
 * @param {!Array.<!diff_match_patch.Diff>} diffs Array of diff tuples.
 * @return {string} Source text.
 */
diff_match_patch.prototype.diff_text1 = function(diffs) {
  var text = [];
  for (var x = 0; x < diffs.length; x++) {
    if (diffs[x][0] !== DIFF_INSERT) {
      text[x] = diffs[x][1];
    }
  }
  return text.join('');
};


/**
 * Compute and return the destination text (all equalities and insertions).
 * @param {!Array.<!diff_match_patch.Diff>} diffs Array of diff tuples.
 * @return {string} Destination text.
 */
diff_match_patch.prototype.diff_text2 = function(diffs) {
  var text = [];
  for (var x = 0; x < diffs.length; x++) {
    if (diffs[x][0] !== DIFF_DELETE) {
      text[x] = diffs[x][1];
    }
  }
  return text.join('');
};


/**
 * Compute the Levenshtein distance; the number of inserted, deleted or
 * substituted characters.
 * @param {!Array.<!diff_match_patch.Diff>} diffs Array of diff tuples.
 * @return {number} Number of changes.
 */
diff_match_patch.prototype.diff_levenshtein = function(diffs) {
  var levenshtein = 0;
  var insertions = 0;
  var deletions = 0;
  for (var x = 0; x < diffs.length; x++) {
    var op = diffs[x][0];
    var data = diffs[x][1];
    switch (op) {
      case DIFF_INSERT:
        insertions += data.length;
        break;
      case DIFF_DELETE:
        deletions += data.length;
        break;
      case DIFF_EQUAL:
        // A deletion and an insertion is one substitution.
        levenshtein += Math.max(insertions, deletions);
        insertions = 0;
        deletions = 0;
        break;
    }
  }
  levenshtein += Math.max(insertions, deletions);
  return levenshtein;
};


/**
 * Crush the diff into an encoded string which describes the operations
 * required to transform text1 into text2.
 * E.g. =3\t-2\t+ing  -> Keep 3 chars, delete 2 chars, insert 'ing'.
 * Operations are tab-separated.  Inserted text is escaped using %xx notation.
 * @param {!Array.<!diff_match_patch.Diff>} diffs Array of diff tuples.
 * @return {string} Delta text.
 */
diff_match_patch.prototype.diff_toDelta = function(diffs) {
  var text = [];
  for (var x = 0; x < diffs.length; x++) {
    switch (diffs[x][0]) {
      case DIFF_INSERT:
        text[x] = '+' + encodeURI(diffs[x][1]);
        break;
      case DIFF_DELETE:
        text[x] = '-' + diffs[x][1].length;
        break;
      case DIFF_EQUAL:
        text[x] = '=' + diffs[x][1].length;
        break;
    }
  }
  return text.join('\t').replace(/%20/g, ' ');
};


/**
 * Given the original text1, and an encoded string which describes the
 * operations required to transform text1 into text2, compute the full diff.
 * @param {string} text1 Source string for the diff.
 * @param {string} delta Delta text.
 * @return {!Array.<!diff_match_patch.Diff>} Array of diff tuples.
 * @throws {!Error} If invalid input.
 */
diff_match_patch.prototype.diff_fromDelta = function(text1, delta) {
  var diffs = [];
  var diffsLength = 0;  // Keeping our own length var is faster in JS.
  var pointer = 0;  // Cursor in text1
  var tokens = delta.split(/\t/g);
  for (var x = 0; x < tokens.length; x++) {
    // Each token begins with a one character parameter which specifies the
    // operation of this token (delete, insert, equality).
    var param = tokens[x].substring(1);
    switch (tokens[x].charAt(0)) {
      case '+':
        try {
          diffs[diffsLength++] =
              new diff_match_patch.Diff(DIFF_INSERT, decodeURI(param));
        } catch (ex) {
          // Malformed URI sequence.
          throw new Error('Illegal escape in diff_fromDelta: ' + param);
        }
        break;
      case '-':
        // Fall through.
      case '=':
        var n = parseInt(param, 10);
        if (isNaN(n) || n < 0) {
          throw new Error('Invalid number in diff_fromDelta: ' + param);
        }
        var text = text1.substring(pointer, pointer += n);
        if (tokens[x].charAt(0) == '=') {
          diffs[diffsLength++] = new diff_match_patch.Diff(DIFF_EQUAL, text);
        } else {
          diffs[diffsLength++] = new diff_match_patch.Diff(DIFF_DELETE, text);
        }
        break;
      default:
        // Blank tokens are ok (from a trailing \t).
        // Anything else is an error.
        if (tokens[x]) {
          throw new Error('Invalid diff operation in diff_fromDelta: ' +
                          tokens[x]);
        }
    }
  }
  if (pointer != text1.length) {
    throw new Error('Delta length (' + pointer +
        ') does not equal source text length (' + text1.length + ').');
  }
  return diffs;
};


//  MATCH FUNCTIONS


/**
 * Locate the best instance of 'pattern' in 'text' near 'loc'.
 * @param {string} text The text to search.
 * @param {string} pattern The pattern to search for.
 * @param {number} loc The location to search around.
 * @return {number} Best match index or -1.
 */
diff_match_patch.prototype.match_main = function(text, pattern, loc) {
  // Check for null inputs.
  if (text == null || pattern == null || loc == null) {
    throw new Error('Null input. (match_main)');
  }

  loc = Math.max(0, Math.min(loc, text.length));
  if (text == pattern) {
    // Shortcut (potentially not guaranteed by the algorithm)
    return 0;
  } else if (!text.length) {
    // Nothing to match.
    return -1;
  } else if (text.substring(loc, loc + pattern.length) == pattern) {
    // Perfect match at the perfect spot!  (Includes case of null pattern)
    return loc;
  } else {
    // Do a fuzzy compare.
    return this.match_bitap_(text, pattern, loc);
  }
};


/**
 * Locate the best instance of 'pattern' in 'text' near 'loc' using the
 * Bitap algorithm.
 * @param {string} text The text to search.
 * @param {string} pattern The pattern to search for.
 * @param {number} loc The location to search around.
 * @return {number} Best match index or -1.
 * @private
 */
diff_match_patch.prototype.match_bitap_ = function(text, pattern, loc) {
  if (pattern.length > this.Match_MaxBits) {
    throw new Error('Pattern too long for this browser.');
  }

  // Initialise the alphabet.
  var s = this.match_alphabet_(pattern);

  var dmp = this;  // 'this' becomes 'window' in a closure.

  /**
   * Compute and return the score for a match with e errors and x location.
   * Accesses loc and pattern through being a closure.
   * @param {number} e Number of errors in match.
   * @param {number} x Location of match.
   * @return {number} Overall score for match (0.0 = good, 1.0 = bad).
   * @private
   */
  function match_bitapScore_(e, x) {
    var accuracy = e / pattern.length;
    var proximity = Math.abs(loc - x);
    if (!dmp.Match_Distance) {
      // Dodge divide by zero error.
      return proximity ? 1.0 : accuracy;
    }
    return accuracy + (proximity / dmp.Match_Distance);
  }

  // Highest score beyond which we give up.
  var score_threshold = this.Match_Threshold;
  // Is there a nearby exact match? (speedup)
  var best_loc = text.indexOf(pattern, loc);
  if (best_loc != -1) {
    score_threshold = Math.min(match_bitapScore_(0, best_loc), score_threshold);
    // What about in the other direction? (speedup)
    best_loc = text.lastIndexOf(pattern, loc + pattern.length);
    if (best_loc != -1) {
      score_threshold =
          Math.min(match_bitapScore_(0, best_loc), score_threshold);
    }
  }

  // Initialise the bit arrays.
  var matchmask = 1 << (pattern.length - 1);
  best_loc = -1;

  var bin_min, bin_mid;
  var bin_max = pattern.length + text.length;
  var last_rd;
  for (var d = 0; d < pattern.length; d++) {
    // Scan for the best match; each iteration allows for one more error.
    // Run a binary search to determine how far from 'loc' we can stray at this
    // error level.
    bin_min = 0;
    bin_mid = bin_max;
    while (bin_min < bin_mid) {
      if (match_bitapScore_(d, loc + bin_mid) <= score_threshold) {
        bin_min = bin_mid;
      } else {
        bin_max = bin_mid;
      }
      bin_mid = Math.floor((bin_max - bin_min) / 2 + bin_min);
    }
    // Use the result from this iteration as the maximum for the next.
    bin_max = bin_mid;
    var start = Math.max(1, loc - bin_mid + 1);
    var finish = Math.min(loc + bin_mid, text.length) + pattern.length;

    var rd = Array(finish + 2);
    rd[finish + 1] = (1 << d) - 1;
    for (var j = finish; j >= start; j--) {
      // The alphabet (s) is a sparse hash, so the following line generates
      // warnings.
      var charMatch = s[text.charAt(j - 1)];
      if (d === 0) {  // First pass: exact match.
        rd[j] = ((rd[j + 1] << 1) | 1) & charMatch;
      } else {  // Subsequent passes: fuzzy match.
        rd[j] = (((rd[j + 1] << 1) | 1) & charMatch) |
                (((last_rd[j + 1] | last_rd[j]) << 1) | 1) |
                last_rd[j + 1];
      }
      if (rd[j] & matchmask) {
        var score = match_bitapScore_(d, j - 1);
        // This match will almost certainly be better than any existing match.
        // But check anyway.
        if (score <= score_threshold) {
          // Told you so.
          score_threshold = score;
          best_loc = j - 1;
          if (best_loc > loc) {
            // When passing loc, don't exceed our current distance from loc.
            start = Math.max(1, 2 * loc - best_loc);
          } else {
            // Already passed loc, downhill from here on in.
            break;
          }
        }
      }
    }
    // No hope for a (better) match at greater error levels.
    if (match_bitapScore_(d + 1, loc) > score_threshold) {
      break;
    }
    last_rd = rd;
  }
  return best_loc;
};


/**
 * Initialise the alphabet for the Bitap algorithm.
 * @param {string} pattern The text to encode.
 * @return {!Object} Hash of character locations.
 * @private
 */
diff_match_patch.prototype.match_alphabet_ = function(pattern) {
  var s = {};
  for (var i = 0; i < pattern.length; i++) {
    s[pattern.charAt(i)] = 0;
  }
  for (var i = 0; i < pattern.length; i++) {
    s[pattern.charAt(i)] |= 1 << (pattern.length - i - 1);
  }
  return s;
};


//  PATCH FUNCTIONS


/**
 * Increase the context until it is unique,
 * but don't let the pattern expand beyond Match_MaxBits.
 * @param {!diff_match_patch.patch_obj} patch The patch to grow.
 * @param {string} text Source text.
 * @private
 */
diff_match_patch.prototype.patch_addContext_ = function(patch, text) {
  if (text.length == 0) {
    return;
  }
  if (patch.start2 === null) {
    throw Error('patch not initialized');
  }
  var pattern = text.substring(patch.start2, patch.start2 + patch.length1);
  var padding = 0;

  // Look for the first and last matches of pattern in text.  If two different
  // matches are found, increase the pattern length.
  while (text.indexOf(pattern) != text.lastIndexOf(pattern) &&
         pattern.length < this.Match_MaxBits - this.Patch_Margin -
         this.Patch_Margin) {
    padding += this.Patch_Margin;
    pattern = text.substring(patch.start2 - padding,
                             patch.start2 + patch.length1 + padding);
  }
  // Add one chunk for good luck.
  padding += this.Patch_Margin;

  // Add the prefix.
  var prefix = text.substring(patch.start2 - padding, patch.start2);
  if (prefix) {
    patch.diffs.unshift(new diff_match_patch.Diff(DIFF_EQUAL, prefix));
  }
  // Add the suffix.
  var suffix = text.substring(patch.start2 + patch.length1,
                              patch.start2 + patch.length1 + padding);
  if (suffix) {
    patch.diffs.push(new diff_match_patch.Diff(DIFF_EQUAL, suffix));
  }

  // Roll back the start points.
  patch.start1 -= prefix.length;
  patch.start2 -= prefix.length;
  // Extend the lengths.
  patch.length1 += prefix.length + suffix.length;
  patch.length2 += prefix.length + suffix.length;
};


/**
 * Compute a list of patches to turn text1 into text2.
 * Use diffs if provided, otherwise compute it ourselves.
 * There are four ways to call this function, depending on what data is
 * available to the caller:
 * Method 1:
 * a = text1, b = text2
 * Method 2:
 * a = diffs
 * Method 3 (optimal):
 * a = text1, b = diffs
 * Method 4 (deprecated, use method 3):
 * a = text1, b = text2, c = diffs
 *
 * @param {string|!Array.<!diff_match_patch.Diff>} a text1 (methods 1,3,4) or
 * Array of diff tuples for text1 to text2 (method 2).
 * @param {string|!Array.<!diff_match_patch.Diff>=} opt_b text2 (methods 1,4) or
 * Array of diff tuples for text1 to text2 (method 3) or undefined (method 2).
 * @param {string|!Array.<!diff_match_patch.Diff>=} opt_c Array of diff tuples
 * for text1 to text2 (method 4) or undefined (methods 1,2,3).
 * @return {!Array.<!diff_match_patch.patch_obj>} Array of Patch objects.
 */
diff_match_patch.prototype.patch_make = function(a, opt_b, opt_c) {
  var text1, diffs;
  if (typeof a == 'string' && typeof opt_b == 'string' &&
      typeof opt_c == 'undefined') {
    // Method 1: text1, text2
    // Compute diffs from text1 and text2.
    text1 = /** @type {string} */(a);
    diffs = this.diff_main(text1, /** @type {string} */(opt_b), true);
    if (diffs.length > 2) {
      this.diff_cleanupSemantic(diffs);
      this.diff_cleanupEfficiency(diffs);
    }
  } else if (a && typeof a == 'object' && typeof opt_b == 'undefined' &&
      typeof opt_c == 'undefined') {
    // Method 2: diffs
    // Compute text1 from diffs.
    diffs = /** @type {!Array.<!diff_match_patch.Diff>} */(a);
    text1 = this.diff_text1(diffs);
  } else if (typeof a == 'string' && opt_b && typeof opt_b == 'object' &&
      typeof opt_c == 'undefined') {
    // Method 3: text1, diffs
    text1 = /** @type {string} */(a);
    diffs = /** @type {!Array.<!diff_match_patch.Diff>} */(opt_b);
  } else if (typeof a == 'string' && typeof opt_b == 'string' &&
      opt_c && typeof opt_c == 'object') {
    // Method 4: text1, text2, diffs
    // text2 is not used.
    text1 = /** @type {string} */(a);
    diffs = /** @type {!Array.<!diff_match_patch.Diff>} */(opt_c);
  } else {
    throw new Error('Unknown call format to patch_make.');
  }

  if (diffs.length === 0) {
    return [];  // Get rid of the null case.
  }
  var patches = [];
  var patch = new diff_match_patch.patch_obj();
  var patchDiffLength = 0;  // Keeping our own length var is faster in JS.
  var char_count1 = 0;  // Number of characters into the text1 string.
  var char_count2 = 0;  // Number of characters into the text2 string.
  // Start with text1 (prepatch_text) and apply the diffs until we arrive at
  // text2 (postpatch_text).  We recreate the patches one by one to determine
  // context info.
  var prepatch_text = text1;
  var postpatch_text = text1;
  for (var x = 0; x < diffs.length; x++) {
    var diff_type = diffs[x][0];
    var diff_text = diffs[x][1];

    if (!patchDiffLength && diff_type !== DIFF_EQUAL) {
      // A new patch starts here.
      patch.start1 = char_count1;
      patch.start2 = char_count2;
    }

    switch (diff_type) {
      case DIFF_INSERT:
        patch.diffs[patchDiffLength++] = diffs[x];
        patch.length2 += diff_text.length;
        postpatch_text = postpatch_text.substring(0, char_count2) + diff_text +
                         postpatch_text.substring(char_count2);
        break;
      case DIFF_DELETE:
        patch.length1 += diff_text.length;
        patch.diffs[patchDiffLength++] = diffs[x];
        postpatch_text = postpatch_text.substring(0, char_count2) +
                         postpatch_text.substring(char_count2 +
                             diff_text.length);
        break;
      case DIFF_EQUAL:
        if (diff_text.length <= 2 * this.Patch_Margin &&
            patchDiffLength && diffs.length != x + 1) {
          // Small equality inside a patch.
          patch.diffs[patchDiffLength++] = diffs[x];
          patch.length1 += diff_text.length;
          patch.length2 += diff_text.length;
        } else if (diff_text.length >= 2 * this.Patch_Margin) {
          // Time for a new patch.
          if (patchDiffLength) {
            this.patch_addContext_(patch, prepatch_text);
            patches.push(patch);
            patch = new diff_match_patch.patch_obj();
            patchDiffLength = 0;
            // Unlike Unidiff, our patch lists have a rolling context.
            // https://github.com/google/diff-match-patch/wiki/Unidiff
            // Update prepatch text & pos to reflect the application of the
            // just completed patch.
            prepatch_text = postpatch_text;
            char_count1 = char_count2;
          }
        }
        break;
    }

    // Update the current character count.
    if (diff_type !== DIFF_INSERT) {
      char_count1 += diff_text.length;
    }
    if (diff_type !== DIFF_DELETE) {
      char_count2 += diff_text.length;
    }
  }
  // Pick up the leftover patch if not empty.
  if (patchDiffLength) {
    this.patch_addContext_(patch, prepatch_text);
    patches.push(patch);
  }

  return patches;
};


/**
 * Given an array of patches, return another array that is identical.
 * @param {!Array.<!diff_match_patch.patch_obj>} patches Array of Patch objects.
 * @return {!Array.<!diff_match_patch.patch_obj>} Array of Patch objects.
 */
diff_match_patch.prototype.patch_deepCopy = function(patches) {
  // Making deep copies is hard in JavaScript.
  var patchesCopy = [];
  for (var x = 0; x < patches.length; x++) {
    var patch = patches[x];
    var patchCopy = new diff_match_patch.patch_obj();
    patchCopy.diffs = [];
    for (var y = 0; y < patch.diffs.length; y++) {
      patchCopy.diffs[y] =
          new diff_match_patch.Diff(patch.diffs[y][0], patch.diffs[y][1]);
    }
    patchCopy.start1 = patch.start1;
    patchCopy.start2 = patch.start2;
    patchCopy.length1 = patch.length1;
    patchCopy.length2 = patch.length2;
    patchesCopy[x] = patchCopy;
  }
  return patchesCopy;
};


/**
 * Merge a set of patches onto the text.  Return a patched text, as well
 * as a list of true/false values indicating which patches were applied.
 * @param {!Array.<!diff_match_patch.patch_obj>} patches Array of Patch objects.
 * @param {string} text Old text.
 * @return {!Array.<string|!Array.<boolean>>} Two element Array, containing the
 *      new text and an array of boolean values.
 */
diff_match_patch.prototype.patch_apply = function(patches, text) {
  if (patches.length == 0) {
    return [text, []];
  }

  // Deep copy the patches so that no changes are made to originals.
  patches = this.patch_deepCopy(patches);

  var nullPadding = this.patch_addPadding(patches);
  text = nullPadding + text + nullPadding;

  this.patch_splitMax(patches);
  // delta keeps track of the offset between the expected and actual location
  // of the previous patch.  If there are patches expected at positions 10 and
  // 20, but the first patch was found at 12, delta is 2 and the second patch
  // has an effective expected position of 22.
  var delta = 0;
  var results = [];
  for (var x = 0; x < patches.length; x++) {
    var expected_loc = patches[x].start2 + delta;
    var text1 = this.diff_text1(patches[x].diffs);
    var start_loc;
    var end_loc = -1;
    if (text1.length > this.Match_MaxBits) {
      // patch_splitMax will only provide an oversized pattern in the case of
      // a monster delete.
      start_loc = this.match_main(text, text1.substring(0, this.Match_MaxBits),
                                  expected_loc);
      if (start_loc != -1) {
        end_loc = this.match_main(text,
            text1.substring(text1.length - this.Match_MaxBits),
            expected_loc + text1.length - this.Match_MaxBits);
        if (end_loc == -1 || start_loc >= end_loc) {
          // Can't find valid trailing context.  Drop this patch.
          start_loc = -1;
        }
      }
    } else {
      start_loc = this.match_main(text, text1, expected_loc);
    }
    if (start_loc == -1) {
      // No match found.  :(
      results[x] = false;
      // Subtract the delta for this failed patch from subsequent patches.
      delta -= patches[x].length2 - patches[x].length1;
    } else {
      // Found a match.  :)
      results[x] = true;
      delta = start_loc - expected_loc;
      var text2;
      if (end_loc == -1) {
        text2 = text.substring(start_loc, start_loc + text1.length);
      } else {
        text2 = text.substring(start_loc, end_loc + this.Match_MaxBits);
      }
      if (text1 == text2) {
        // Perfect match, just shove the replacement text in.
        text = text.substring(0, start_loc) +
               this.diff_text2(patches[x].diffs) +
               text.substring(start_loc + text1.length);
      } else {
        // Imperfect match.  Run a diff to get a framework of equivalent
        // indices.
        var diffs = this.diff_main(text1, text2, false);
        if (text1.length > this.Match_MaxBits &&
            this.diff_levenshtein(diffs) / text1.length >
            this.Patch_DeleteThreshold) {
          // The end points match, but the content is unacceptably bad.
          results[x] = false;
        } else {
          this.diff_cleanupSemanticLossless(diffs);
          var index1 = 0;
          var index2;
          for (var y = 0; y < patches[x].diffs.length; y++) {
            var mod = patches[x].diffs[y];
            if (mod[0] !== DIFF_EQUAL) {
              index2 = this.diff_xIndex(diffs, index1);
            }
            if (mod[0] === DIFF_INSERT) {  // Insertion
              text = text.substring(0, start_loc + index2) + mod[1] +
                     text.substring(start_loc + index2);
            } else if (mod[0] === DIFF_DELETE) {  // Deletion
              text = text.substring(0, start_loc + index2) +
                     text.substring(start_loc + this.diff_xIndex(diffs,
                         index1 + mod[1].length));
            }
            if (mod[0] !== DIFF_DELETE) {
              index1 += mod[1].length;
            }
          }
        }
      }
    }
  }
  // Strip the padding off.
  text = text.substring(nullPadding.length, text.length - nullPadding.length);
  return [text, results];
};


/**
 * Add some padding on text start and end so that edges can match something.
 * Intended to be called only from within patch_apply.
 * @param {!Array.<!diff_match_patch.patch_obj>} patches Array of Patch objects.
 * @return {string} The padding string added to each side.
 */
diff_match_patch.prototype.patch_addPadding = function(patches) {
  var paddingLength = this.Patch_Margin;
  var nullPadding = '';
  for (var x = 1; x <= paddingLength; x++) {
    nullPadding += String.fromCharCode(x);
  }

  // Bump all the patches forward.
  for (var x = 0; x < patches.length; x++) {
    patches[x].start1 += paddingLength;
    patches[x].start2 += paddingLength;
  }

  // Add some padding on start of first diff.
  var patch = patches[0];
  var diffs = patch.diffs;
  if (diffs.length == 0 || diffs[0][0] != DIFF_EQUAL) {
    // Add nullPadding equality.
    diffs.unshift(new diff_match_patch.Diff(DIFF_EQUAL, nullPadding));
    patch.start1 -= paddingLength;  // Should be 0.
    patch.start2 -= paddingLength;  // Should be 0.
    patch.length1 += paddingLength;
    patch.length2 += paddingLength;
  } else if (paddingLength > diffs[0][1].length) {
    // Grow first equality.
    var extraLength = paddingLength - diffs[0][1].length;
    diffs[0][1] = nullPadding.substring(diffs[0][1].length) + diffs[0][1];
    patch.start1 -= extraLength;
    patch.start2 -= extraLength;
    patch.length1 += extraLength;
    patch.length2 += extraLength;
  }

  // Add some padding on end of last diff.
  patch = patches[patches.length - 1];
  diffs = patch.diffs;
  if (diffs.length == 0 || diffs[diffs.length - 1][0] != DIFF_EQUAL) {
    // Add nullPadding equality.
    diffs.push(new diff_match_patch.Diff(DIFF_EQUAL, nullPadding));
    patch.length1 += paddingLength;
    patch.length2 += paddingLength;
  } else if (paddingLength > diffs[diffs.length - 1][1].length) {
    // Grow last equality.
    var extraLength = paddingLength - diffs[diffs.length - 1][1].length;
    diffs[diffs.length - 1][1] += nullPadding.substring(0, extraLength);
    patch.length1 += extraLength;
    patch.length2 += extraLength;
  }

  return nullPadding;
};


/**
 * Look through the patches and break up any which are longer than the maximum
 * limit of the match algorithm.
 * Intended to be called only from within patch_apply.
 * @param {!Array.<!diff_match_patch.patch_obj>} patches Array of Patch objects.
 */
diff_match_patch.prototype.patch_splitMax = function(patches) {
  var patch_size = this.Match_MaxBits;
  for (var x = 0; x < patches.length; x++) {
    if (patches[x].length1 <= patch_size) {
      continue;
    }
    var bigpatch = patches[x];
    // Remove the big old patch.
    patches.splice(x--, 1);
    var start1 = bigpatch.start1;
    var start2 = bigpatch.start2;
    var precontext = '';
    while (bigpatch.diffs.length !== 0) {
      // Create one of several smaller patches.
      var patch = new diff_match_patch.patch_obj();
      var empty = true;
      patch.start1 = start1 - precontext.length;
      patch.start2 = start2 - precontext.length;
      if (precontext !== '') {
        patch.length1 = patch.length2 = precontext.length;
        patch.diffs.push(new diff_match_patch.Diff(DIFF_EQUAL, precontext));
      }
      while (bigpatch.diffs.length !== 0 &&
             patch.length1 < patch_size - this.Patch_Margin) {
        var diff_type = bigpatch.diffs[0][0];
        var diff_text = bigpatch.diffs[0][1];
        if (diff_type === DIFF_INSERT) {
          // Insertions are harmless.
          patch.length2 += diff_text.length;
          start2 += diff_text.length;
          patch.diffs.push(bigpatch.diffs.shift());
          empty = false;
        } else if (diff_type === DIFF_DELETE && patch.diffs.length == 1 &&
                   patch.diffs[0][0] == DIFF_EQUAL &&
                   diff_text.length > 2 * patch_size) {
          // This is a large deletion.  Let it pass in one chunk.
          patch.length1 += diff_text.length;
          start1 += diff_text.length;
          empty = false;
          patch.diffs.push(new diff_match_patch.Diff(diff_type, diff_text));
          bigpatch.diffs.shift();
        } else {
          // Deletion or equality.  Only take as much as we can stomach.
          diff_text = diff_text.substring(0,
              patch_size - patch.length1 - this.Patch_Margin);
          patch.length1 += diff_text.length;
          start1 += diff_text.length;
          if (diff_type === DIFF_EQUAL) {
            patch.length2 += diff_text.length;
            start2 += diff_text.length;
          } else {
            empty = false;
          }
          patch.diffs.push(new diff_match_patch.Diff(diff_type, diff_text));
          if (diff_text == bigpatch.diffs[0][1]) {
            bigpatch.diffs.shift();
          } else {
            bigpatch.diffs[0][1] =
                bigpatch.diffs[0][1].substring(diff_text.length);
          }
        }
      }
      // Compute the head context for the next patch.
      precontext = this.diff_text2(patch.diffs);
      precontext =
          precontext.substring(precontext.length - this.Patch_Margin);
      // Append the end context for this patch.
      var postcontext = this.diff_text1(bigpatch.diffs)
                            .substring(0, this.Patch_Margin);
      if (postcontext !== '') {
        patch.length1 += postcontext.length;
        patch.length2 += postcontext.length;
        if (patch.diffs.length !== 0 &&
            patch.diffs[patch.diffs.length - 1][0] === DIFF_EQUAL) {
          patch.diffs[patch.diffs.length - 1][1] += postcontext;
        } else {
          patch.diffs.push(new diff_match_patch.Diff(DIFF_EQUAL, postcontext));
        }
      }
      if (!empty) {
        patches.splice(++x, 0, patch);
      }
    }
  }
};


/**
 * Take a list of patches and return a textual representation.
 * @param {!Array.<!diff_match_patch.patch_obj>} patches Array of Patch objects.
 * @return {string} Text representation of patches.
 */
diff_match_patch.prototype.patch_toText = function(patches) {
  var text = [];
  for (var x = 0; x < patches.length; x++) {
    text[x] = patches[x];
  }
  return text.join('');
};


/**
 * Parse a textual representation of patches and return a list of Patch objects.
 * @param {string} textline Text representation of patches.
 * @return {!Array.<!diff_match_patch.patch_obj>} Array of Patch objects.
 * @throws {!Error} If invalid input.
 */
diff_match_patch.prototype.patch_fromText = function(textline) {
  var patches = [];
  if (!textline) {
    return patches;
  }
  var text = textline.split('\n');
  var textPointer = 0;
  var patchHeader = /^@@ -(\d+),?(\d*) \+(\d+),?(\d*) @@$/;
  while (textPointer < text.length) {
    var m = text[textPointer].match(patchHeader);
    if (!m) {
      throw new Error('Invalid patch string: ' + text[textPointer]);
    }
    var patch = new diff_match_patch.patch_obj();
    patches.push(patch);
    patch.start1 = parseInt(m[1], 10);
    if (m[2] === '') {
      patch.start1--;
      patch.length1 = 1;
    } else if (m[2] == '0') {
      patch.length1 = 0;
    } else {
      patch.start1--;
      patch.length1 = parseInt(m[2], 10);
    }

    patch.start2 = parseInt(m[3], 10);
    if (m[4] === '') {
      patch.start2--;
      patch.length2 = 1;
    } else if (m[4] == '0') {
      patch.length2 = 0;
    } else {
      patch.start2--;
      patch.length2 = parseInt(m[4], 10);
    }
    textPointer++;

    while (textPointer < text.length) {
      var sign = text[textPointer].charAt(0);
      try {
        var line = decodeURI(text[textPointer].substring(1));
      } catch (ex) {
        // Malformed URI sequence.
        throw new Error('Illegal escape in patch_fromText: ' + line);
      }
      if (sign == '-') {
        // Deletion.
        patch.diffs.push(new diff_match_patch.Diff(DIFF_DELETE, line));
      } else if (sign == '+') {
        // Insertion.
        patch.diffs.push(new diff_match_patch.Diff(DIFF_INSERT, line));
      } else if (sign == ' ') {
        // Minor equality.
        patch.diffs.push(new diff_match_patch.Diff(DIFF_EQUAL, line));
      } else if (sign == '@') {
        // Start of next patch.
        break;
      } else if (sign === '') {
        // Blank line?  Whatever.
      } else {
        // WTF?
        throw new Error('Invalid patch mode "' + sign + '" in: ' + line);
      }
      textPointer++;
    }
  }
  return patches;
};


/**
 * Class representing one patch operation.
 * @constructor
 */
diff_match_patch.patch_obj = function() {
  /** @type {!Array.<!diff_match_patch.Diff>} */
  this.diffs = [];
  /** @type {?number} */
  this.start1 = null;
  /** @type {?number} */
  this.start2 = null;
  /** @type {number} */
  this.length1 = 0;
  /** @type {number} */
  this.length2 = 0;
};


/**
 * Emulate GNU diff's format.
 * Header: @@ -382,8 +481,9 @@
 * Indices are printed as 1-based, not 0-based.
 * @return {string} The GNU diff string.
 */
diff_match_patch.patch_obj.prototype.toString = function() {
  var coords1, coords2;
  if (this.length1 === 0) {
    coords1 = this.start1 + ',0';
  } else if (this.length1 == 1) {
    coords1 = this.start1 + 1;
  } else {
    coords1 = (this.start1 + 1) + ',' + this.length1;
  }
  if (this.length2 === 0) {
    coords2 = this.start2 + ',0';
  } else if (this.length2 == 1) {
    coords2 = this.start2 + 1;
  } else {
    coords2 = (this.start2 + 1) + ',' + this.length2;
  }
  var text = ['@@ -' + coords1 + ' +' + coords2 + ' @@\n'];
  var op;
  // Escape the body of the patch with %xx notation.
  for (var x = 0; x < this.diffs.length; x++) {
    switch (this.diffs[x][0]) {
      case DIFF_INSERT:
        op = '+';
        break;
      case DIFF_DELETE:
        op = '-';
        break;
      case DIFF_EQUAL:
        op = ' ';
        break;
    }
    text[x + 1] = op + encodeURI(this.diffs[x][1]) + '\n';
  }
  return text.join('').replace(/%20/g, ' ');
};


// The following export code was added by @ForbesLindesay
module.exports = diff_match_patch;
module.exports['diff_match_patch'] = diff_match_patch;
module.exports['DIFF_DELETE'] = DIFF_DELETE;
module.exports['DIFF_INSERT'] = DIFF_INSERT;
module.exports['DIFF_EQUAL'] = DIFF_EQUAL;

/***/ })
/******/ ]);
"use strict";

var Dispatcher = require('../dispatcher/appDispatcher');
var ActionTypes = require('../constants/actionTypes');
var EventEmitter = require('events').EventEmitter;

// We need to extend our store to be an EventEmitter.
// object-assign glues 2 objects together (AuthorStore and EventEmitter prototype).
var assign = require('object-assign');

var _ = require('lodash');
var CHANGE_EVENT = 'change';
var _authors = []; // private; it's not exported (only AuthorStore is); '_' is just used to denote it is private

// Basically, we're making EventEmitter the base class.
var AuthorStore = assign({}, EventEmitter.prototype, {
  // I would like to know when this store changes.
  addChangeListener: function(callback) {
    this.on(CHANGE_EVENT, callback);
  },
  removeChangeListener: function(callback) {
    this.removeListener(CHANGE_EVENT, callback);
  },
  emitChange: function() {
    this.emit(CHANGE_EVENT);
  },
  getAllAuthors: function() {
    return _authors;
  },
  getAuthorById: function(id) {
    return _.find(_authors, {id: id});
  }
});

// This function is going to be called every time ANY action is dispatched!
// This makes Flex differ from traditional Pub-Sub Pattern.
// Every store that registers with the dispatcher is notified so we need to add a switch.
Dispatcher.register(function(action) {
  switch(action.actionType) {
    case ActionTypes.INITIALIZE:
      _authors = action.initialData.authors;
      AuthorStore.emitChange();
      break;
    case ActionTypes.CREATE_AUTHOR:
      _authors.push(action.author);
      AuthorStore.emitChange();
      break;
    case ActionTypes.UPDATE_AUTHOR:
      var existingAuthor = _.find(_authors, {id: action.author.id});
      var existingAuthorIndex = _.indexOf(_authors, existingAuthor);
      _authors.splice(existingAuthorIndex, 1, action.author);
      AuthorStore.emitChange();
      break;
    case ActionTypes.DELETE_AUTHOR:
      // debugger;
      _.remove(_authors, function(author) {
        return action.id === author.id;
      });
      AuthorStore.emitChange();
      break;
    default:
      // no op
  }
});

module.exports = AuthorStore;

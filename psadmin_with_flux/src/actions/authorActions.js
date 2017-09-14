"use strict";

var Dispatcher = require('../dispatcher/appDispatcher');
var AuthorApi = require('../api/authorApi');
var ActionTypes = require('../constants/actionTypes');

var AuthorActions = {
  createAuthor: function(author) {
    // Our mock API is synchronous, but typically you'll be making ajax calls in a real app.
    // So, you'd probably be handling some sort of a callback or using promises right here to handle response from web API.
    var newAuthor = AuthorApi.saveAuthor(author);

    // Hey dispatcher, go tell all the stores that an author was just created.
    Dispatcher.dispatch({
      actionType: ActionTypes.CREATE_AUTHOR,
      author: newAuthor
    });
  },
  updateAuthor: function(author) {
    var updatedAuthor = AuthorApi.saveAuthor(author);

    Dispatcher.dispatch({
      actionType: ActionTypes.UPDATE_AUTHOR,
      author: updatedAuthor
    });
  },
  // If you're wanting to make async calls to the server and show a preloader in your app, one easy way to do that is to have a separate author deleted action that fires as well.
  // So, for instance, if this were an aync call, you could immediatelyfire your DELETE_AUTHOR action and then once this async call completed you could fire off an author deleted action.
  // That way all of your UI would be aware that there were an async call currently in process and once it received the author deleted ActionType, it would know that it should hide any preloaders and show any final confirmations.
  deleteAuthor: function(id) {
    // debugger;
    AuthorApi.deleteAuthor(id);

    Dispatcher.dispatch({
      actionType: ActionTypes.DELETE_AUTHOR,
      id: id
    });
  }
};

module.exports = AuthorActions;

import { EventEmitter } from 'events';
import Dispatcher from '../dispatcher/dispatcher';
import ActionTypes from '../actions/ActionTypes';

/**
 * Store class listens for changes from
 * action dispatchers to update it's internal data.
 * @class Store
 * @extends {EventEmitter}
 */
class Store extends EventEmitter {
  constructor(props) {
    super(props);
    this.sources = null;
    this.articles = null;
    this.selected = 'ABC News (AU)';
    this.available = '';
    this.auth = false;
  }

  /**
   * when action is dispatchs a payload with action type
   * SOURCES, setSources method updates the existing
   * value with the payload and emits an event
   * to listeners to get the updataed value.
   * @param {Object} sources
   *
   * @memberof Store
   */
  setSources(sources) {
    this.sources = sources;
    this.emit('change');
  }

  /**
   * when action is dispatchs a payload with action type
   * ARTICLES, setArticles method updates the existing
   * value with the payload and emits an event
   * to listeners to get the updataed value.
   * @param {Object} articles
   *
   * @memberof Store
   */
  setArticles(articles) {
    this.articles = articles;
    this.emit('change');
  }

  /**
   * when action is dispatchs a payload with action type
   * SELECTED, setSelected method updates the existing
   * value with the payload and emits an event
   * to listeners to get the updataed value.
   * @param {String} name
   *
   * @memberof Store
   */
  setSelected(name) {
    this.selected = name;
    this.emit('change');
  }

  /**
   * when called, sets the updated value
   * to the dispatched payload and emits an event
   * to indicate there's been a change.
   * @param {Boolean} authValue
   *
   * @memberof Store
   */
  setAuth(authValue) {
    this.auth = authValue;
    this.emit('change');
  }

  /**
   * when called returns the current
   * value of the class variable this.sources
   * @returns {Boolean}
   *
   * @memberof Store
   */
  getSources() {
    return this.sources;
  }

  /**
   * when called returns the current
   * value of the class variable this.articles
   * @returns {Array}
   *
   * @memberof Store
   */
  getArticles() {
    return this.articles;
  }

  /**
   * when called returns the current
   * value of the class variable this.sources
   * @returns {Array}
   *
   * @memberof Store
   */
  getSelected() {
    return this.selected;
  }

  /**
   * when called returns the current
   * value of the class variable this.auth
   * @returns {Boolean}
   *
   * @memberof Store
   */
  getAuth() {
    return this.auth;
  }

  /**
   * callback function that is registered
   * to the dispatcher to update the store
   * value, when an action is created.
   * @param {Object} action
   *
   * @memberof Store
   */
  dispatchActions(action) {
    switch (action.actionType) {
    case ActionTypes.SOURCES:
      this.setSources(action.sources);
      break;
    case ActionTypes.ARTICLES:
      this.setArticles(action.articles);
      break;
    case ActionTypes.SELECTED:
      this.setSelected(action.sourceName);
      break;
    case ActionTypes.AUTH:
      this.setAuth(action.authValue);
      break;

    }
  }
}

/**
 * create an instance of the store
 */
const store = new Store();

/**
 * register the store instance method
 * to the dispatchActions which calls the set... methods
 * with the payload as the parameter
 */
Dispatcher.register(store.dispatchActions.bind(store));

export default store;

import { EventEmitter } from 'events';
import Dispatcher from '../dispatcher/dispatcher';
import ActionTypes from '../actions/ActionTypes';


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
   * set sources from action and emit event
   * @param {Object} sources
   *
   * @memberof Store
   */
  setSources(sources) {
    this.sources = sources;
    this.emit('change');
  }

  /**
   * set articles and emit event
   * @param {Object} articles
   *
   * @memberof Store
   */
  setArticles(articles) {
    this.articles = articles;
    this.emit('change');
  }

  /**
   * set selected sources and emit event
   * @param {String} name
   *
   * @memberof Store
   */
  setSelected(name) {
    this.selected = name;
    this.emit('change');
  }

  /**
   * set authentication value and emit event
   * @param {Boolean} authValue
   *
   * @memberof Store
   */
  setAuth(authValue) {
    this.auth = authValue;
    this.emit('change');
  }

  /**
   * get sources
   * @returns {Boolean}
   *
   * @memberof Store
   */
  getSources() {
    return this.sources;
  }

  /**
   * get articles
   * @returns {Array}
   *
   * @memberof Store
   */
  getArticles() {
    return this.articles;
  }

  /**
   * get selected articles
   * @returns {Array}
   *
   * @memberof Store
   */
  getSelected() {
    return this.selected;
  }

  /**
   * get authentication value
   * @returns {Boolean}
   *
   * @memberof Store
   */
  getAuth() {
    return this.auth;
  }

  /**
   * set payload based on action action type
   * from dispatcher
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
 * register store instance method to dispatcher
 */
Dispatcher.register(store.dispatchActions.bind(store));

export default store;

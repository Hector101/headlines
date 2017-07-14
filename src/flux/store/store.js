import { EventEmitter } from 'events';
import Dispatcher from '../dispatcher/dispatcher';
import ActionTypes from '../actions/ActionTypes';

/**
 * @description store class
 * @class Store
 * @extends {EventEmitter}
 */
class Store extends EventEmitter {

  /**
   * @description Creates an instance of Store.
   * @param {Object} props
   * @memberof Store
   * @constructs Store
   */
  constructor(props) {
    super(props);
    this.sources = null;
    this.articles = null;
    this.selected = '';
    this.available = '';
    this.auth = false;
  }

  /**
   * @description set sources from action and emit event
   * @param {Object} sources
   * @return {void}
   * @memberof Store
   * @method setSources
   */
  setSources(sources) {
    this.sources = sources;
    this.emit('change');
  }

  /**
   * @description set articles and emit event
   * @param {Object} articles
   * @return {void}
   * @memberof Store
   * @method setArticles
   */
  setArticles(articles) {
    this.articles = articles;
    this.emit('change');
  }

  /**
   * @description set selected sources and emit event
   * @param {String} name
   * @return {void}
   * @memberof Store
   * @method setSelected
   */
  setSelected(name) {
    this.selected = name;
    this.emit('change');
  }

  /**
   * @description set authentication value and emit event
   * @param {Boolean} authValue
   * @return {void}
   * @memberof Store
   * @method setAuth
   */
  setAuth(authValue) {
    this.auth = authValue;
    this.emit('change');
  }

  /**
   * @description get sources
   * @return {Boolean}
   * @memberof Store
   * @method getSources
   */
  getSources() {
    return this.sources;
  }

  /**
   * @description get articles
   * @returns {Array}
   * @memberof Store
   * @method getArticles
   */
  getArticles() {
    return this.articles;
  }

  /**
   * @description get selected articles
   * @returns {Array}
   * @memberof Store
   * @method getSelected
   */
  getSelected() {
    return this.selected;
  }

  /**
   * @description get authentication value
   * @returns {Boolean}
   * @memberof Store
   * @method getAuth
   */
  getAuth() {
    return this.auth;
  }

  /**
   * @description set payload based on action action type
   * from dispatcher
   * @param {Object} action
   * @memberof Store
   * @method dispatchActions
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
 * @description create an instance of the store
 */
const store = new Store();

/**
 * @description register store instance method to dispatcher
 */
Dispatcher.register(store.dispatchActions.bind(store));

export default store;

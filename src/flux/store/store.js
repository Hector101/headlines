import { EventEmitter } from 'events';
import Dispatcher from '../dispatcher/dispatcher';
import ActionTypes from '../actions/ActionTypes';

/**
 * Store class listens for changes from
 * action dispatchers to update it's internal data.
 * @extends EventEmitter
 */
class Store extends EventEmitter {
  constructor(props) {
    super(props);
    this.sources = null;
    this.articles = null;
    this.selected = 'ABC News (AU)';
    this.available = '';
  }
  setSources(sources) {
    this.sources = sources;
    this.emit('change');
  }
  setArticles(articles) {
    this.articles = articles;
    this.emit('change');
  }
  setSelected(name) {
    this.selected = name;
    this.emit('change');
  }
  getSources() {
    return this.sources;
  }
  getArticles() {
    return this.articles;
  }
  getSelected() {
    return this.selected;
  }
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

    }
  }
}

const store = new Store();

Dispatcher.register(store.dispatchActions.bind(store));

export default store;

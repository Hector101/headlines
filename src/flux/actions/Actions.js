import Dispatcher from '../dispatcher/dispatcher';
import ActionTypes from './ActionTypes';
import Api from '../../api/api';


/**
 * @description declare Action dispatcher class
 * @class Actions
 */
class Actions {

  /**
   * @description dispach news sources to store.
   * @memberof Actions
   * @return {void}
   * @method getSources
   */
  getSources() {
    Api.getSources('https://newsapi.org/v1/sources')
      .then(sources => Dispatcher.dispatch({
        actionType: ActionTypes.SOURCES,
        sources,
      }))
      .catch(error => Dispatcher.dispatch({
        actionType: ActionTypes.SOURCES_ERROR,
        error,
      }));
  }

  /**
   * @description get articles from a source and dispatch to store
   * @param {String} id - new source id
   * @param {string} sortBy - news sort by id
   * @return {void}
   * @method getArticles
   */
  getArticles(id, sortBy) {
    /**
     * @description check if both parameters are available
     */
    if (sortBy && id) {
      Api.getArticles(`https://newsapi.org/v1/articles?source=${id}&sortBy=${sortBy}&apiKey=${process.env.NEWS_API}`)
    .then(articles => Dispatcher.dispatch({
      actionType: ActionTypes.ARTICLES,
      articles,
    }))
    .catch(error => Dispatcher.dispatch({
      actionType: ActionTypes.ARTICLES_ERROR,
      error,
    }));
    } else if (!sortBy) {
      Api.getArticles(`https://newsapi.org/v1/articles?source=${id}&apiKey=${process.env.NEWS_API}`)
      .then(articles => Dispatcher.dispatch({
        actionType: ActionTypes.ARTICLES,
        articles,
      }))
    .catch(error => Dispatcher.dispatch({
      actionType: ActionTypes.ARTICLES_ERROR,
      error,
    }));
    }
  }

  /**
   * @description dispatch source name to store
   * @param {String} sourceName - news source name
   * @return {void}
   * @method selectedSource
   */
  selectedSource(sourceName) {
    Dispatcher.dispatch({
      actionType: ActionTypes.SELECTED,
      sourceName,
    });
  }
  /**
   * @description disptach authentication value to store
   * @param {String} authValue - authentication value
   * @memberof Actions
   * @return {void}
   * @method getAuth
   */
  getAuth(authValue) {
    Dispatcher.dispatch({
      actionType: ActionTypes.AUTH,
      authValue,
    });
  }
}

export default new Actions();

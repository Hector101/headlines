import Dispatcher from '../dispatcher/dispatcher';
import ActionTypes from './ActionTypes';
import Api from '../../api/api';


/**
 * declare Action dispatcher class
 * @class Actions
 */
class Actions {

  /**
   * call api and dispach retured object
   * containing news sources to the app store
   * @memberof Actions
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
   * get articles from a source and dispatch returned
   * object containing articles to the app store
   * @param {String}
   * @param {string} sortBy
   */
  getArticles(id, sortBy) {
    /**
     * check if both parameters are passed to the
     * method to call api with sort by attribute
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
   * dispatch source name passed to this
   * class method to registered callback in the app store
   * @param {String} sourceName
   */
  selectedSource(sourceName) {
    Dispatcher.dispatch({
      actionType: ActionTypes.SELECTED,
      sourceName,
    });
  }
  getAuth(authValue) {
    Dispatcher.dispatch({
      actionType: ActionTypes.AUTH,
      authValue,
    });
  }
}

export default new Actions();

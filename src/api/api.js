import axios from 'axios';

/**
 * @description api class
 * @class Api
 */
class Api {
  /**
   * get news sources using url parameter
   * @param {String} url - news sources api url
   * @return {Promise} - promise of news sources
   * @memberof Api
   * @method getSources
   */
  getSources(url) {
    return axios.get(url).then(source => source.data.sources);
  }

  /**
   * get news articles using url parameter
   * @param {String} url - news articles api url
   * @returns {Promise} - promise of news articles
   * @memberof Api
   * @member getArticles
   */
  getArticles(url) {
    return axios.get(url).then(article => article.data.articles);
  }
}

export default new Api();

import axios from 'axios';


class Api {
  /**
   * get news sources using url parameter
   * @param {String} url
   * @returns {Promise}
   * @memberof Api
   */
  getSources(url) {
    return axios.get(url).then(source => source.data.sources);
  }

  /**
   * get news articles using url parameter
   * @param {String} url
   * @returns {Promise}
   * @memberof Api
   */
  getArticles(url) {
    return axios.get(url).then(article => article.data.articles);
  }
}

export default new Api();

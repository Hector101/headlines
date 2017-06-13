import axios from 'axios';

/**
 * define class to hold method that calls
 * the api with passed in url parameters
 */
class Api {
  getSources(url) {
    return axios.get(url).then(source => source.data.sources);
  }
  getArticles(url) {
    return axios.get(url).then(article => article.data.articles);
  }
}

export default new Api();

import React from 'react';
import store from '../flux/store/store';
import Actions from '../flux/actions/Actions';


import Sidebar from './Sidebar';
import Mainbar from './Mainbar';
import Navbar from './Navbar';


/**
 * @description Dashboard component class
 * @class Dashboard
 * @extends {React.Component}
 */
class Dashboard extends React.Component {

  /**
   * @description Creates an instance of Dashboard.
   * @description set component initial state
   * @param {Object} props - props from parent component
   * @memberof Dashboard
   * @constructs Dashboard
   */
  constructor(props) {
    super(props);
    this.state = {
      sources: [{ init: true, id: 0, name: '' }],
      articles: null,
      newsType: '',
      selectedArticle: '',
    };

    /**
     * bind class methods to component
     */
    this.updateState = this.updateState.bind(this);
    this.updateArticle = this.updateArticle.bind(this);
    this.updateType = this.updateType.bind(this);
    this.getSingleSource = this.getSingleSource.bind(this);
  }

  /**
   * @description create an action to get news sources
   * and news articles if component mounts.
   * check if #getArticles is null to listen for change in store
   * @memberof Dashboard
   * @method componentDidMount
   * @return {void}
   */
  componentDidMount() {
    Actions.getSources();
    if (store.getArticles() === null) {
      store.on('change', this.updateState);
    }
  }

  /**
   * remove this.upDatestate from the store
   * event listener before component unmounts
   * @memberof Dashboard
   * @return {void}
   */
  componentWillUnmount() {
    store.removeListener('change', this.updateState);
  }

  /**
   * @description get news articles from news channel
   * @param {String} sourceName - news source id
   * @param {String} sourceTitle - news source title
   * @return {void}
   * @method getSingleSource
   */
  getSingleSource(sourceName, sourceTitle) {
    Actions.getArticles(sourceName);
    Actions.selectedSource(sourceTitle);
    store.on('change', this.updateArticle);
  }

  /**
   * @description get news source by available type
   * "top" or "latest"
   * @param {String} newsId - news source id
   * @param {String} newsType - selected sort type
   * @return {void}
   * @method changeSort
   */
  changeSort(newsId, newsType) {
    Actions.getArticles(newsId, newsType);
  }

  /**
   * @description get the available sortBy array and update
   * the state property newsType
   * @param {String} sortBy - selected sort type
   * @return {void}
   * @method updateType
   */
  updateType(sortBy) {
    this.setState({
      newsType: sortBy,
    });
  }

  /**
   * @description update state property "article"
   * when uptated in app store.
   * @memberof Dashboard
   * @return {void}
   * @method updateArticle
   */
  updateArticle() {
    this.setState({
      articles: store.getArticles(),
      selectedArticle: store.getSelected(),
    });
  }

  /**
   * get sources and articles
   * and set as component state properties
   * get random new sources id to dispatch #getSources action
   * @memberof Dashboard
   * @return {void}
   * @method updateState
   */
  updateState() {
    if (store.getSources() !== null && store.getArticles() === null) {
      const generateRandomNumber = Math.round(Math.random() * 70) - 1;
      this.setState({
        selectedArticle: store.getSources()[generateRandomNumber].name,
        newsType: store.getSources()[generateRandomNumber].sortBysAvailable[0],
      });
      Actions.getArticles(store.getSources()[generateRandomNumber].id);
    }
    if (store.getSources() !== null && store.getArticles() !== null) {
      this.setState({
        sources: store.getSources(),
        articles: store.getArticles(),
      });
    }
  }

  /**
   * @description render JSX to the DOM
   * @returns {JSX}
   * @memberof Dashboard
   */
  render() {
    return (
      <div>
        <Navbar />
        <div className="row dashboard">
          <Sidebar
            sources={this.state.sources}
            getSingleSource={this.getSingleSource}
            changeSort={this.changeSort}
            updateType={this.updateType}
          />
          <Mainbar
            articles={this.state.articles}
            newsType={this.state.newsType}
            selectedArticle={this.state.selectedArticle}
          />
        </div>
      </div>
    );
  }
}

export default Dashboard;

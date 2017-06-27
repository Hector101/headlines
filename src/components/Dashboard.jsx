import React from 'react';
import store from '../flux/store/store';
import Actions from '../flux/actions/Actions';


import Sidebar from './Sidebar';
import Mainbar from './Mainbar';
import SidebarCollapse from './SidebarCollapse';
import Navbar from './Navbar';


/**
 * Dashboard component, the parent component
 * of the Sidebar and Mainbar Component
 * @class Dashboard
 * @extends {React.Component}
 */
class Dashboard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      sources: [{ init: true, id: 0, name: '' }],
      articles: null,
      newsType: 'Top',
    };

    /**
     * bind class methods to this
     * particular component
     */
    this.updateState = this.updateState.bind(this);
    this.updateArticle = this.updateArticle.bind(this);
    this.updateType = this.updateType.bind(this);
    this.getSingleSource = this.getSingleSource.bind(this);
  }

  /**
   * Called when component mounts.
   * Creates an action to get the news sources from the web API to dispatch to the store
   * Creates an action to get articles from ABC news channel
   * Call class method this.Change to update the component state
   * @memberof Dashboard
   */
  componentDidMount() {
    Actions.getSources();
    Actions.getArticles('abc-news-au');
    this.onChange();
  }

  /**
   * remove this.upDatestate from the store
   * event listener before component unmounts
   * @memberof Dashboard
   */
  componentWillUnmount() {
    store.removeListener('change', this.updateState);
  }

  /**
   * call to check if there's a change of value
   * in the store
   * @memberof Dashboard
   */
  onChange() {
    store.on('change', this.updateState);
  }

  /**
   * Creates an action to get articles from @param sourceName news channel
   * * Creates an action to get source title from @param sourceTitle news channel
   * @param {String} sourceName
   * @param {String} sourceTitle
   */
  getSingleSource(sourceName, sourceTitle) {
    Actions.getArticles(sourceName);
    Actions.selectedSource(sourceTitle);
    store.on('change', this.updateArticle);
  }

  /**
   * get news source by available type
   * "top" or "latest"
   * @param {String} newsId
   * @param {String} newsType
   */
  changeSort(newsId, newsType) {
    Actions.getArticles(newsId, newsType);
  }

  /**
   * get the available sortBy array and update
   * the state with @param sortBy
   * @param {String} sortBy
   */
  updateType(sortBy) {
    this.setState({
      newsType: sortBy,
    });
  }

  /**
   * update state of article when uptated
   * in app store
   * @memberof Dashboard
   */
  updateArticle() {
    this.setState({
      articles: store.getArticles(),
    });
  }

  /**
   * on app inital load, get sources and article
   * from abc news and pass each as props to sidebar
   * and mainbar components
   * @memberof Dashboard
   */
  updateState() {
    if (store.getSources() !== null && store.getArticles() !== null) {
      this.setState({
        sources: store.getSources(),
        articles: store.getArticles(),
      });
    }
  }
  render() {
    return (
      <div>
        <Navbar />
        <div className="row dashboard">
          <SidebarCollapse
            sources={this.state.sources}
            getSingleSource={this.getSingleSource}
            changeSort={this.changeSort}
            updateType={this.updateType}
          />
          <Sidebar
            sources={this.state.sources}
            getSingleSource={this.getSingleSource}
            changeSort={this.changeSort}
            updateType={this.updateType}
          />
          <Mainbar
            articles={this.state.articles}
            newsType={this.state.newsType}
          />
        </div>
      </div>
    );
  }
}

export default Dashboard;

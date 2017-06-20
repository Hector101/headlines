import React from 'react';
// import action creators and store
import store from '../flux/store/store';
import Actions from '../flux/actions/Actions';

// import other componetns
import Sidebar from './Sidebar';
import Mainbar from './Mainbar';
import SidebarCollapse from './SidebarCollapse';
import Navbar from './Navbar';


/**
 * create dashboard component
 * @Component {Onject} props
 */
class Dashboard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      sources: [],
      articles: [],
      newsType: 'Top',
    };

    /**
     * bind class methods to this
     * particular component
     */
    this.updateState = this.updateState.bind(this);
    this.updateArticle = this.updateArticle.bind(this);
    this.updateType = this.updateType.bind(this);
    this.getSingleArticle = this.getSingleArticle.bind(this);
  }

  /**
   * Method called when component mounts
   */
  componentDidMount() {
    Actions.getSources();
    Actions.getArticles('abc-news-au');
    this.onChange();
  }

  /**
   * remove this.upDatestate from the store
   * event listener before component unmounts
   */
  componentWillUnmount() {
    store.removeListener('change', this.updateState);
  }

  /**
   * call to check if there's a change of value
   * in the store
   */
  onChange() {
    store.on('change', this.updateState);
  }

  /**
   * dispatch an action to get news from
   * a source and news souce name
   * @param {String} sourceName
   * @param {String} sourceTitle
   */
  getSingleArticle(sourceName, sourceTitle) {
    Actions.getArticles(sourceName);
    Actions.selectedSource(sourceTitle);
    store.on('change', this.updateArticle);
  }

  /**
   * get news source by available type
   * @param {String} newsId
   * @param {String} newsType
   */
  changeSort(newsId, newsType) {
    Actions.getArticles(newsId, newsType);
  }

  /**
   * set selected sort
   * @param {String} sortBy
   */
  updateType(sortBy) {
    this.setState({
      newsType: sortBy,
    });
  }

  /**
   * set state of article when uptated
   * in app store
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
            getSingleArticle={this.getSingleArticle}
            changeSort={this.changeSort}
            updateType={this.updateType}
          />
          <Sidebar
            sources={this.state.sources}
            getSingleArticle={this.getSingleArticle}
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

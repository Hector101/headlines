import React from 'react';
import store from '../flux/store/store';
import MainbarContent from './MainbarContent';

/**
 * React component that renders the news articles
 * @class Content
 * @extends {React.Component}
 */
class Content extends React.Component {

  /**
   * Creates an instance of Content.
   * @param {any} props
   * @memberof Content
   * @constructs Content
  */
  constructor(props) {
    super(props);
    this.state = {
      articles: [{ init: true, id: '1' }],
      newsType: 'Top',
    };
  }

  /**
   * update component state properties
   * "articles", "selectedArticle" and "newsType"
   * with the updated values
   * @param {Object} nextProps
   * @method componentWillReceiveProps
   */
  componentWillReceiveProps(nextProps) {
    this.setState({
      articles: nextProps.articles,
      newsType: nextProps.newsType,
    });
  }

  /**
   * Render news articles
   * @returns {JSX}
   * @memberof Content
   */
  render() {
    const loading = (<div
          className="collection-item center"
        >
      <div className="preloader-wrapper big active">
        <div className="spinner-layer spinner-blue-only">
          <div className="circle-clipper left">
            <div className="circle" />
          </div>
          <div className="gap-patch">
            <div className="circle" />
          </div>
          <div className="circle-clipper right">
            <div className="circle" />
          </div>
        </div>
      </div>
    </div>);
    /**
     * get articles and append
     * each value in array to the DOM.
     */
    const list = this.props.articles === null ? loading : this.props.articles.map((article, i) => {
      return (
        <div key={i.toString()} className="row">
          <div className="col s12">
            <div className="card small horizontal  #ffffff white z-depth-3">
              <div className="card-image">
                <img className="card-image-news" src={`${article.urlToImage}`} alt="" />
              </div>
              <div className="card-stacked">
                <div className="card-content">
                  <p className=" blue-grey-text text-darken-1 description">{article.description.length > 190 ? `${article.description.substr(0, 190)}...` : `${article.description}...`}<a href={`${article.url}`}>see more</a>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      );
    });
    return (
      <MainbarContent list={list} newsType={this.state.newsType} selectedArticle={this.state.selectedArticle} selectedArticle={this.props.selectedArticle} />
    );
  }

}

export default Content;


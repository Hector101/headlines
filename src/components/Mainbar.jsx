import React from 'react';
import store from '../flux/store/store';

/**
 * React component that renders the news articles
 * @class Content
 * @extends {React.Component}
 */
class Content extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      articles: [{ init: true, id: '1' }],
      selectedArticle: store.getSelected(),
      newsType: 'Top',
    };
  }

  /**
   * call when props from parent component updates
   * and will the set state in this component with
   * updated value
   * @param {Object} nextProps
   */
  componentWillReceiveProps(nextProps) {
    this.setState({
      articles: nextProps.articles,
      selectedArticle: store.getSelected(),
      newsType: nextProps.newsType,
    });
  }
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
     * loop data returned from api call and render each
     * value in to the DOM.
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
      <div className="col s12 m8 l9 content fixed">
        <div className="row">
          <div className="col s12">
            <div className="card #fff white">
              <div className="card-content white-text">
                <span
                  className="grey-text text-darken-2 center"
                >
                  <h4>
                    <span className="light-blue-text text-darken-1">{this.state.newsType.toUpperCase()} News from</span> {this.state.selectedArticle}</h4>
                </span>
              </div>
            </div>
          </div>
        </div>
        {list}
      </div>
    );
  }

}

export default Content;


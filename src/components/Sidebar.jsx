import React from 'react';
/**
 * create the Sidebar component
 * @Constructor
 */
class Sidebar extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      sources: [{ init: true, id: 0, name: '' }],
      searchInput: '',
    };
    this.onChange = this.onChange.bind(this); // bind coChange class method to this component
    this.sortBysAvailabale = ['Top']; // Initailize abc news available sort by value
    this.id = null; // initialize news source id to null
  }
  /**
   * call when props from parent component updates
   * and will the set state in this component with
   * updated value
   * @param {Object} nextProps
   */
  componentWillReceiveProps(nextProps) {
    this.setState({
      sources: nextProps.sources,
    });
  }

  /**
   * get value from text input to update value
   * in component state
   * @param {Object} e
   */
  onChange(e) {
    const value = e.target.value;
    this.setState({
      searchInput: value,
    });
  }

  /**
   * call to save value from api to
   * the class variable
   * @param {String} available
   * @param {String} newsId
   */
  setSortBysAvailabale(available, newsId) {
    this.sortBysAvailabale = available;
    this.id = newsId;
  }

  render() {
    const userDetail = JSON.parse(localStorage.getItem('userDetail')); // get user details from local storage

    /**
     * loop data returned from api call and render each
     * value in to the DOM.
     */
    const list = this.state.sources.filter(source =>
    (source.name.toLowerCase().indexOf(this.state.searchInput.toLowerCase()) >= 0))
    .map((eachSource, i) => {
      if (eachSource.init) {
        return (<div
          key={eachSource.id}
          className="collection-item center"
        >
          <div className="progress">
            <div className="indeterminate" />
          </div>
        </div>);
      }
      return (<div
        role="link"
        tabIndex={i}
        onClick={() => {
          this.props.getSingleArticle(eachSource.id, eachSource.name);
          this.setSortBysAvailabale(eachSource.sortBysAvailable, eachSource.id);
        }}
        key={eachSource.id}
        className="collection-item list blue-grey-text text-darken-1"
      >{eachSource.name}
      </div>);
    });

    /**
     * loop the array contaiining availaable sort by
     * value of a particlular new source.
     */
    const sortBy = this.sortBysAvailabale.map((value, index) => (

      <p key={index.toString()} className="col s6">
        <input
          className="with-gap"
          name="select"
          type="radio"
          id={value}
          onClick={() => {
            this.props.changeSort(this.id, value);
            this.props.updateType(value);
          }
        }
        />
        <label htmlFor={value}>{value.toUpperCase()}</label>
      </p>
    ));
    return (
      <div className="col s12 m4 l3 fixed sidebar hide-on-small-only #efebe9 brown lighten-5">
        <div className="sidebar-inner">
          <ul>
            <li>
              <div className="userView #efebe9 brown lighten-5 center">
                <div className="background" />
                <ul>
                  <li><h5 className=" blue-grey-text text-lighten-2">Welcome</h5></li>
                  <li>
                    <img
                      className="circle"
                      src={userDetail.imageUrl}
                      alt=""
                    />
                  </li>
                  <li><h6
                    className="white-text name center blue-grey-text text-darken-1"
                  >{userDetail.name}</h6></li>
                  <li><h6
                    className="white-text name center blue-grey-text text-darken-1"
                  >{userDetail.email}</h6></li>
                </ul>
                <form className="card search-wrapper">
                  <div className="input-field">
                    <input
                      id="search"
                      type="search"
                      onChange={this.onChange}
                      className="validate"
                      required
                    />
                    <label className="label-icon" htmlFor="search">
                      <i className="material-icons">search</i></label>
                    <i className="material-icons">close</i>
                  </div>
                </form>
              </div>
              <form className="row center">
                <h5 className="light-blue-text text-darken-1">Select Sort Type</h5>
                {sortBy}
              </form>
            </li>
          </ul>
          <div className="collection">
            <li className="collection-header center"><h4>News Channels</h4></li>
            {list}
          </div>
        </div>
      </div>
    );
  }
}

export default Sidebar;

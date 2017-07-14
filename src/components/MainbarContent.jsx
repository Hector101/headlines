import React from 'react';

/**
 * render news articles
 * @param {Object} props - props from parent component
 */
const MainbarContent = props => (
  <div className="col s12 m8 l9 content fixed">
    <div className="row">
      <div className="col s12">
        <div className="card #fff white">
          <div className="card-content white-text">
            <span
                className="grey-text text-darken-2 center"
            >
              <h4>
                <span className="light-blue-text text-darken-1">
                  {props.newsType.toUpperCase()} News from
                </span> {props.selectedArticle}</h4>
            </span>
          </div>
        </div>
      </div>
    </div>
    {props.list}
  </div>
);

export default MainbarContent;

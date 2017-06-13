import React from 'react';
import Navbar from './Navbar';

/**
 * Home compenent
 * Functional react component
 */
const Home = () => (
  <div>
    <Navbar />
    <div id="main">
      <div className="slider fullscreen">
        <ul className="slides">
          <li>
            <img className="responsive-img" src="../../public/img/news1.png" alt="CNN News" />
            <div className="caption left-align">
              <h3 className="cnn">CNN News</h3>
            </div>
          </li>
          <li>
            <img className="responsive-img" src="../../public/img/news2.png" alt="ABC News" />
            <div className="caption right-align">
              <h2>ABC News</h2>
            </div>
          </li>
          <li>
            <img className="responsive-img" src="../../public/img/news3.jpg" alt="BBC News" />
            <div className="caption left-align">
              <h2 className="bbc">BBC News</h2>
            </div>
          </li>
          <li>
            <img className="responsive-img" src="../../public/img/news4.jpg" alt="ESPN News" />
            <div className="caption center-align">
              <h3>ESPN News</h3>
            </div>
          </li>
          <li>
            <img className="responsive-img" src="../../public/img/news5.jpg" alt="Breaking News" />
          </li>
        </ul>
      </div>
    </div>
  </div>
);

export default Home;

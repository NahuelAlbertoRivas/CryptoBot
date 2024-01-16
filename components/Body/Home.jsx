import React from 'react'

// internal imports
import { Footer } from '../index';

const Home = () => {
  return (
    <div className= "techwave_fn_content">
      <div className= "techwave_fn_page">
        <div className= "techwave_fn_home">
          <div className= "section_home">
            <div className= "section_left">
              <div className= "techwave_fn_title_holder">
                <h1 className= "title">Automate your crypto trading</h1>
              
                <p className= "desc">Crypto trading financial bot for buy and sell cryptocurrencies</p>
              </div>
            
              <div className= "techwave_fn_interactive_list">
                <ul>
                  <li>
                    <div className= "item">
                      <a>
                        <span className= "icon">
                          <img src= "img/lighticon/light-19.png" className= "fn__svg" alt= "" />
                        </span>
                        <h2 className= "title">Buy any Token</h2>
                        <p className= "desc">
                          Lorem ipsum dolor sit amet consectetur adipisicing elit. Corporis, nam? Magni debitis sed non quidem ipsum, mollitia eos!
                        </p>
                        <span className= "arrow">
                          <img src= "img/lighticon/light-22.png" className= "fn__svg" alt= "" />
                        </span>
                      </a>
                    </div>
                  </li>
                  <li>
                    <div className= "item">
                      <a>
                        <span className= "icon">
                          <img src= "img/lighticon/light-16.png" className= "fn__svg" alt= "" />
                        </span>
                        <h2 className= "title">Sell any Token</h2>
                        <p className= "desc">
                          Lorem ipsum dolor sit amet consectetur adipisicing elit. Corporis, nam? Magni debitis sed non quidem ipsum, mollitia eos!
                        </p>
                        <span className= "arrow">
                          <img src= "img/lighticon/light-22.png" className= "fn__svg" alt= "" />
                        </span>
                      </a>
                    </div>
                  </li>
                </ul>
              </div>
            </div>
          
            <div className= "section_right">
              <div className= "company_info">
                <img src= "img/light-logo.png" alt= "" />
                <p className= "fn__animated_text">
                  Lorem ipsum dolor sit amet consectetur, adipisicing elit. Quibusdam reiciendis cum itaque. Quasi recusandae voluptates aliquid, eius quaerat voluptatum praesentium dolores labore distinctio molestiae repellat saepe quae ullam at possimus.
                </p>
                <hr />
                <div className= "fn__members">
                  <div className= "active item">
                    <span className= "circle"></span>
                    <span className= "text">1 050 021 Online</span>
                  </div>
                  <div className= "item">
                    <span className= "circle"></span>
                    <span className= "text">47 000 333 Members</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  )
}

export default Home

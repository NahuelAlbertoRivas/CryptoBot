import React, { useState, useEffect } from 'react'


const Header = ({ networkName, setactiveComponent }) => {
  
  const [userDetails, setUserDetails] = useState({}); // en la cabecera se setea la info. del user
  const [userMembership, setUserMembership] = useState();

  useEffect(() => { // se obtiene la info. del usuario desde el almacenamiento local
    const user = JSON.parse(localStorage.getItem("userProfile"));
    const userMembership = localStorage.getItem("USER_MEMBERSHIP");

    setUserMembership(userMembership);
    setUserDetails(user);
  }, []);

  return (
    <div className= "techwave_fn_header">
      <div className= "header__left">
        <div className= "fn__token_info">
          <span className= "token_summary">
            <span className= "count">AC</span>
            <span className= "text">{networkName}</span>
          </span>

          {
            userMembership !== "notmember" ? (
              <a onClick= {() => setactiveComponent("Trading")} 
                className= "token_upgrade techwave_fn_button">
                  <span>Start Trade</span>
                </a>
            ) : (
              <a onClick= {() => setactiveComponent("Pricing")} 
                className= "token_upgrade techwave_fn_button">
                  <span>Upgrade</span>
                </a>
            )
          }
        </div>
      </div>

      <div className= "header__right">
        <div className= "fn__nav_bar">
          <div className= "bar__item bar__item_search">
            <div className= "item_opener" title= "Search">
              <img src= "img/lighticon/light-5.png" alt= "" className= "fn__svg" />
            </div>
          
            <div className= "item_popup" data-position= "right">
                <input type= "text" placeholder= "search" />
            </div>
          </div>

          <div className= "bar__item bar__item_user">
              <a onClick= {() => setactiveComponent("Profile")} className= "user_opener fn__tooltip">
                <img src= {userDetails?.image || "img/crypto-user.png"} alt= ""/>
              </a>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Header


import React, { useState, useEffect } from 'react'

// internal import
import {  } from "../../utils/index"

const Profile = ({ setactiveComponent, notifySuccess, notifyError }) => {

  const [userDetails, setUserDetails] = useState({});
  
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("userProfile"));
    setUserDetails(user);
  }, []);

  return (
    <div className= 'techwave_fn_content'>
      <div className= 'techwave_fn_page'>
        <div className= 'techawave_fn_user_profile_page'>
          <div className= 'techwave_fn_pagetitle'>
            <h2 className= 'title'>User profile</h2>
          </div>

          <div className= 'container small'>
            <div className= 'techwave_fn_user_profile'>
              <div className= 'user__profile'>
                <div className= 'user_avatar'>
                  <img src= {userDetails?.image || "img/crypto-user.png"} alt="" />
                </div>

                <div className= 'user_details'>
                  <ul>
                    <li>
                      <div className= 'item'>
                        <h4 className= 'subtitle'>Name</h4>
                        <h3 className= 'title'>{ userDetails?.name || "Undefined" }</h3>
                      </div>
                    </li>
                    <li>
                      <div className= 'item'>
                        <h4 className= 'subtitle'>Username</h4>
                        <h3 className= 'title'>{ userDetails?.userName || "Undefined" }</h3>
                      </div>
                    </li>
                    <li>
                      <div className= 'item'>
                        <h4 className= 'subtitle'>Address</h4>
                        <h3 className= 'title'>{ userDetails?.walletAddress || "Undefined" }</h3>
                      </div>
                    </li>
                  </ul>
                </div>

                <a onClick= {() => setactiveComponent("Setting")}
                  className= 'user_edit fn__icon_button'>
                    <img src="img/lighticon/light-4.png" alt="" />
                </a>
              </div>

              <div className= 'user__plan'>
                <div className= 'plan_left'>
                  <h4 className= 'subtitle'> Your key</h4>
                  <p className= 'info'>
                    <span>Private key:</span>
                    {" "}
                    {userDetails?.privateKey || "Undefined"}
                  </p>
                </div>
              </div>

              <div className= 'user__interests'>
                <h4 className= 'title'>Your biography</h4>
                <p>{userDetails?.biography || "Update"}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Profile

import React, { useState, useEffect } from 'react'
import { FaRegCopy } from 'react-icons/fa6'

// internal import
import { Footer } from "../index"

const Networks = ({ networkName, setnetworkName, notifySuccess, notifyError }) => {

  const [networks, setNetworks] = useState([]);
  const [userDetails, setUserDetails] = useState({});
  const [activeNetwork, setActiveNetwork] = useState({}); // este objeto refiere a la info. que se recupera sobre la network seleccionada, mientras que el sig. ' active ' es simplemente para el estilo que adquiere un item al ser seleccionado
  const [active, setActive] = useState(false);

  // calling hook
  useEffect(() => {
    const networkList = JSON.parse(localStorage.getItem("setNetwork"));
    setNetworks(networkList);

    const user = JSON.parse(localStorage.getItem("userProfile"));
    setUserDetails(user);
  }, []); // se dispara cuando sea que el usuario abre el componente

  const selectNetwork = () => { // cuando el usuario selecciona una network, se setea en ' activeNetwork ' la info. correspondiente a aquella
    localStorage.setItem("activeNetwork", JSON.stringify(activeNetwork));
  }

  return (
    <div className= "techwave_fn_content">
      <div className= "techwave_fn_page">
        <div className= "techwave_fn_models_page">
          <div className= "container">
            <div className= "models__content">
              <div className= "models__results">
                <div className= "fn__tabs_content">
                  <div className= "tab__item active" id= "tab1">
                    <ul className= "fn__model_items">
                      {
                        networks?.map((network, index) => (
                          <li onClick= {() => (
                            setActiveNetwork(network), selectNetwork(), setnetworkName(network?.networkName),
                            notifySuccess(network?.networkName)
                            )} key= {index + 1} className= {`fn__model_item`}>
                            <div className= "item" onClick= {() => setActive(index + 1)}>
                              <div className= "img">
                                <img src= {network.image || "img/crypto.png"} />
                              </div>
                              <div className= "item__info">
                                <h3 className= "title">{network?.networkName}</h3>
                                <p className= "desc">
                                  Your wallet details is private to you, address and{" "}
                                  <span onClick= {() => navigator.clipboard.writeText(network?.privateKey)}>
                                    privateKey <FaRegCopy />
                                  </span>
                                </p>
                              </div>

                              <div className= 'item__author'>
                                <img src= {userDetails?.image || "img/crypto-user.png"} alt="" />

                                <h3 className= 'author_name' 
                                  onClick= {() => navigator.clipboard.writeText(network?.walletAddress)}>
                                  {userDetails?.name || "Username"} <FaRegCopy />
                                </h3>
                              </div>
                            </div>
                          </li>
                        ))
                      }
                    </ul>
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

export default Networks

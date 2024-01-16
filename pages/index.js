import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { ethers } from "ethers";
import toast from "react-hot-toast";

// internal import
import{
    Header, 
    Footer, 
    Search, 
    MovingSubmenu, 
    Preloader, 
    SideBar, 
    Signup, 
    useTimeout, 
    AddNetwork, 
    AddTokenPair, 
    Home, 
    Networks, 
    Price, 
    Profile, 
    Setting, 
    TopExchangeTokens, 
    TradeTokens, 
    Trading,
    Login
} from '../components/index'
import { CONTEXT } from '../context/context'
import Head from "next/head";

const index = () => {
  const { TRADING_BOT } = useContext(CONTEXT); // se puede acceder a cualquier instancia definida en el modelo de ' context.js '
  
  // state variable
  const [activeComponent, setactiveComponent] = useState("Home"); // por defecto se abre la pág. de inicio
  const [membershipType, setmembershipType] = useState("Premium");
  const [authBackEndID, setauthBackEndID] = useState("");
  const [networks, setNetworks] = useState({});
  const [networkName, setnetworkName] = useState();

  // notificaciones
  const notifyError = (msg) => toast.error(msg, {duration: 2000});
  const notifySuccess = (msg) => toast.success(msg, {duration: 2000});

  return (
    <div>
      <MovingSubmenu />
      <Preloader />
      {
        activeComponent == "Signup" ? (
          <Signup axios={axios} setactiveComponent= {setactiveComponent} 
            notifyError= {notifyError} notifySuccess= {notifySuccess} /> // ' setactiveComponent ' es por si el usuario ya tiene cuenta, entonces se le permite el login
        ) : (
          <div className= "techwave_fn_wrapper">
            <div className= "techwave_fn_wrap">
              <Search />
              <Header networkName= {networkName} setactiveComponent= {setactiveComponent}/>
              <SideBar setactiveComponent= {setactiveComponent} />
              {
                activeComponent == "Home" ? (
                  <Home />
                ) : activeComponent == "Trade Tokens" ? (
                  <TradeTokens />
                ) : activeComponent == "Top Exchange Tokens" ? (
                  <TopExchangeTokens />
                ) : activeComponent == "Networks" ? (
                  <Networks networkName= {networkName} setnetworkName= {setnetworkName}/>
                ) : activeComponent == "Trading" ? (
                  <Trading axios= {axios} />
                ) : activeComponent == "Pricing" ? (
                  <Price />
                ) : activeComponent == "Profile" ? (
                  <Profile setactiveComponent= {setactiveComponent} />
                ) : activeComponent == "Setting" ? (
                  <Setting />
                ) : activeComponent == "Add Token Pair" ? (
                  <AddTokenPair />
                ) : (
                  ""
                )
              }
            </div>
          </div>
        )
      }

      { // bloque dinámico
        activeComponent == "Login" ? (
          <Login axios={axios} setactiveComponent= {setactiveComponent} notifyError= {notifyError} notifySuccess= {notifySuccess} />
        ) : (
          ""
        )
      }
    </div>);
};

export default index;

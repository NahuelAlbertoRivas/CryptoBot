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
    Trading 
} from '../components/index'
import { CONTEXT } from '../context/context'

const index = () => {
  const { TRADING_BOT } = useContext(CONTEXT); // se puede acceder a cualquier instancia definida en el modelo de ' context.js '
  
  // state variable
  const [activeComponent, setactiveComponent] = useState("Home"); // por defecto se abre la pág. de inicio
  const [membershipType, setmembershipType] = useState("Premium");
  const [authBackEndID, setauthBackEndID] = useState("");
  return (
    <div>
      <MovingSubmenu />
      <Preloader />
    </div>);
};

export default index;

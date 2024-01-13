import React, { useState, useEffect } from "react";
import { ethers } from "ethers";
import axios from "axios";

// internal import (a usar en ' _app.js ')
export const CONTEXT = React.createContext() // ' Context Management '

export const PROVIDER = ({ children }) => {
    const TRADING_BOT = "Trading Bot";

    const LOAD_INITIAL_DATA = async() => {
        try {
            f
        } catch (error) {
            console.log(error);
        }
    };

    // compra
    const buyTokens = async() => {
        try {
            
        } catch (error) {
            console.log(error);
        }
    };

    // venta
    const sellTokens = async() => {
        try {
            
        } catch (error) {
            console.log(error);
        }
    };

    const trading = async() => {
        try {
            
        } catch (error) {
            console.log(error);
        }
    };

    return(
        <CONTEXT.Provider value= {{ // toda variable que se pase en este campo está disponible en el ' Context Management '
            TRADING_BOT, 
            trading,
        }}>{ children }</CONTEXT.Provider>
    )
}

import React, { useState, useEffect } from "react";
import { ethers } from "ethers";
import axios from "axios";

// internal import (a usar en ' _app.js ')
export const CONTEXT = React.createContext() // ' Context Management '

export const PROVIDER = ({ children }) => {
    const TRADING_BOT = "Trading Bot";
    const [topTokens, setTopTokens] = useState([]);
    const [tradingCount, setTradingCount] = useState(0); // permite contar cuantas operaciones se hicieron
    const [loader, setLoader] = useState(false);

    let lenght;

    const LOAD_INITIAL_DATA = async() => {
        try {
            const URL = "https://api.thegraph.com/subgraphs/name/uniswap/uniswap-v3";
            const query = ` 
                {
                    tokens(orderBy: volumeUSD, orderDirection: desc, first: 20){
                        id
                        name
                        symbol
                        decimals
                        volume
                        volumeUSD
                        totalSupply
                        feesUSD
                        txCount
                        poolCount
                        totalValueLockedUSD
                        totalValueLocked
                        derivedETH
                    }
                }`; // en esta query se define la data pretendida a recuperar acerca de la info. brindada por Uniswap acerca del token
            const axiosData = await axios.post(URL, {query: query});
            setTopTokens(axiosData.data.data.tokens);
        } catch (error) {
            console.log(error);
        }
    }; // esta fn. permite mostrar los primeros 20 tokens provistos por el protocolo de Uniswap

    useEffect(() => {
        LOAD_INITIAL_DATA();
    }, []);

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

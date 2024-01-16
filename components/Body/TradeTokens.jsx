import React, { useState, useEffect } from 'react'

// internal import
import { Footer } from '../index';

const TradeTokens = () => {

  const [search, setSearch] = useState("");
  const [searchItem, setSearchItem] = useState(search); // se provee la funcionalidad para buscar
  const [tokens, setTokens] = useState([]);
  const [copyTokens, setCopyTokens] = useState([]);
  const [tradeToken, setTradeToken] = useState({});
  const [active, setActive] = useState();

  useEffect(() => {
    const tokenLists = JSON.parse(localStorage.getItem("setTokens")); // se obtiene la info. de los tokens que el usuario almacena
    const tokenPair = JSON.parse(localStorage.getItem("tokenPair"));
    
    setTradeToken(tokenPair);
    setTokens(tokenLists);
    setCopyTokens(tokenLists);

    console.log(tokenLists);
  });

  const onHandleSearch = (value) => { // esta fn. se dispara cuando el usurio escribe en el input, luego se filtra la búsqueda
    const filterTokens = tokens?.filter(
        ({network}) => network.toLowerCase().includes(value.toLowerCase())
      );
      if(filterTokens?.length === 0){
        setTokens(copyTokens); // si el usurio no ingresó ningún nombre, se muestran todos los tokens
      } else{
        setTokens(filterTokens);
      }
  };

  const onClearSearch = () => { // cuando el usuario borra lo que escribió en el input
    if(tokens?.lenght && copyTokens?.length){
      setTokens(copyTokens);
    }
  };

  useEffect(() => { // mientras el usuario está escribiendo
    const timer = setTimeout(() => setSearch(searchItem), 1000);
    return () => clearTimeout(timer);
  }, [searchItem]); // la fn. se llama cada vez que hay cambios en ' searchItem '

  useEffect(() => { // callback para determinar qué acción se debe tomar -> búsqueda dinámica o mostrar todo
    if(search){
      onHandleSearch(search);
    } else{
      onClearSearch();
    }
  }, [search]);

  const selectTokenPair = () => { // una vez se renderizen todos los tokens, habilitamos al usuario a seleccionar el que quiere operar (es decir, es una fn. para seleccionar el token)
    localStorage.setItem("tokenPair", JSON.stringify(tradeToken));
  };

  return (
    <div className= "techwave_fn_content">
      <div className= "techwave_fn_page"></div>
    </div>
  )
}

export default TradeTokens

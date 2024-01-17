import React, { useState, useEffect } from 'react'
import { FaRegCopy } from 'react-icons/fa6';

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
  }, []);

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
      <div className= "techwave_fn_page">
        <div className= "techwave_fn_community_page">
          <div className= "fn__title_holder">
            <div className= "container">
              <h1 className= "title">Tokens</h1>
            </div>
          </div>

          <div className= "techwave_fn_feed">
            <div className= "container">
              <div className= "feed__filter">
                <div className= "filter__search">
                  <input type= "text" placeholder= "Search Token" 
                    onChange= {(e) => setSearchItem(e.target.value)}
                    value= {searchItem} />
                  <a className= "techwave_fn_button">
                    <span>Search</span>
                  </a>
                </div>
              </div>
            </div>

            <div className= "techwave_fn_pricing">
              <div className= "container">
                <div className= "pricing__tabs">
                  <div className= "pricing__tab active">
                    {/*dispositivos móviles*/}
                    <div className= "fn__mobile_pricing">
                      <div className= "pricing__item">
                        <div className= "pricing__item_holder">
                          <div className= "pricing__item__heading">
                            <h2 className= "title">Tokens pair lists</h2>
                          </div>
                          <div className= "pricing__item_list">
                            {
                              tokens?.map((token, index) => (
                                <div className= "pricing__item_list_item" key= {index}
                                  onCLick= {(() =>  setTradeToken (token), selectTokenPair())}>
                                  <h4 className= "title">{token.network}</h4> {/*cuando el usuario hace click se copia la dir. del token al portapapeles (' navigator.clipboard.writeText(token.id) ')*/}
                                  <p className= "desc">{token.fee}</p>
                                </div>
                              ))
                            }
                          </div>
                        </div>
                      </div>
                    </div>
                    {/*ordenadores*/}
                    <div className= "pricing__content">
                      <div className= "pricing__heading">
                        <div className= "item">
                          <span className= "title">Tokens pair lists</span>
                        </div>
                        <div className= "item wide"></div>
                      </div>

                      <div className= "pricing__fields">
                        {
                          tokens?.map((token, index) => (
                            <div key= { index } onClick= {() =>  (setTradeToken (token), selectTokenPair(), 
                              setActive(index + 1))} className= {`item_row ${active == index + 1?
                              "pricing__heading" : ""}`}>
                              <div className= "item_col">
                                <span className= "heading_text">
                                  {token.network}
                                </span> {/*' token.name.slice(0, 12) ' se muestra entre 0 y 12 caracts.; ' &nbsp; ' -> HTML space tag*/}
                              </div>

                              <div className= "item_col">
                                <span className= "option_text">
                                  {token.token1}
                                </span>
                              </div>
                              <div className= "item_col">
                                <span className= "option_text">
                                  {token.token2}
                                </span>
                              </div>
                              <div className= "item_col">
                                <span className= "option_text">
                                  {token.fee}
                                </span>
                              </div>
                            </div>
                          ))
                        }
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default TradeTokens

import React, { useState } from 'react'
import toast from "react-hot-toast"

const AddTokenPair = () => {

  // notificaciones
  const notifyError = (msg) => toast.error(msg, {duration: 2000});
  const notifySuccess = (msg) => toast.success(msg, {duration: 2000});

  const [token, setToken] = useState({
    token1: "",
    token2: "",
    tokenAdress1: "",
    tokenAdress2: "",
    network: "",
    fee: "",
    buyAmount: "",
    targetPrice: "",
    message: "",
  }); // almacenará la info. del usuario acerca del par de tokens que quiera operar

  const handleFormFieldChange = (fieldName, e) => {// fn. que permitirá actualizar la info. de ' token '
    setToken({ ...token, [fieldName]: e.target.value }) ; // se ' deconstruye ' el objeto
  };

  const storeToken = () => {
    const { 
      token1, 
      token2, 
      tokenAdress1, 
      tokenAdress2, 
      network, 
      fee, 
      message } = token;

      if(!token1 || !token2 || !tokenAdress1 || !tokenAdress2 || !network || !fee || !message)
        return notifyError("Please, provide all data");
      
      let tokenArray = []; // almacena info. acerca de algún par de tokens a operar
      const tokenList = localStorage.getItem("setTokens"); // se recupera info. del almacenamiento local en caso de que haya
      if(tokenList){
        tokenArray = JSON.parse(localStorage.getItem("setTokens"));
        tokenArray.push(token);
        localStorage.setItem("setTokens", JSON.stringify(tokenArray));
        notifySuccess("Tokens added successfully!");
      } else{ // si no guardó info. previamente, simplemente guardamos la data
        tokenArray.push(token);
        localStorage.setItem("setTokens", JSON.stringify(tokenArray));
        notifySuccess("Tokens added successfully!");
      }
  };

  return (
    <div className= "techwave_fn_content">
      <div className= "techwave_fn_page">
        <div className= "techwave_fn_contact_page">
          <div className= "techwave_fn_pagetitle">
            <h2 className= "title">Add trading Token</h2>
          </div>

          <div className= "contactpage">
            <div className= "container small">
              <div className= "fn_contact_form">
                <form className= "contact_form">
                  <div className= "input_list">
                    <ul>
                      <li>
                        <input type= "text" placeholder= "Native Token name 1" 
                          onChange= {(e) => handleFormFieldChange("token1", e)} />
                      </li>
                      <li>
                        <input type= "text" placeholder= "Native Token adress" 
                          onChange= {(e) => handleFormFieldChange("tokenAdress1", e)} />
                      </li>
                      <li>
                        <input type= "text" placeholder= "Native Token name 2" 
                          onChange= {(e) => handleFormFieldChange("token2", e)} />
                      </li>
                      <li>
                        <input type= "text" placeholder= "Native Token adress" 
                          onChange= {(e) => handleFormFieldChange("tokenAdress2", e)} />
                      </li>
                      <li>
                        <input type= "text" placeholder= "Fee (%)" 
                          onChange= {(e) => handleFormFieldChange("fee", e)} />
                      </li>
                      <li>
                        <input type= "text" placeholder= "Nerwork name" 
                          onChange= {(e) => handleFormFieldChange("network", e)} />
                      </li>
                      <li>
                        <input type= "text" placeholder= "Buy amount" 
                          onChange= {(e) => handleFormFieldChange("buyAmount", e)} />
                      </li>
                      <li>
                        <input type= "text" placeholder= "Target price" 
                          onChange= {(e) => handleFormFieldChange("targetPrice", e)} />
                      </li>
                      <li>
                        <textarea type= "text" placeholder= "Message" 
                          onChange= {(e) => handleFormFieldChange("message", e)} />
                      </li>
                      <li>
                        <div>
                          <a onClick= {() => storeToken()} className= "techwave_fn_button">
                            <span>Save Token</span>
                          </a>
                        </div>
                      </li>
                    </ul>
                  </div>

                  <div className= "returnmessage"
                    data-success= "Thanks for submitting the form"></div>
                </form>
              </div>

              <div className= "fn__space__30"></div>
              <hr data-h= "2" />
              <div className= "fn__space__10"></div>
              <p>
                Kindly add your Token, which you want to use for automating trading
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AddTokenPair

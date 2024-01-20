import React from 'react'

const Price = () => {

  return (
    <div className= 'techwave_fn_content'>
      <div className= 'techwave_fn_page'>
        <div className= 'techwave_fn_pricing_page'>
          <div className= 'techwave_fn_pricing'>
            <div className= 'container'>
              <div className= 'pricing__tabs'>
                <div className= 'pricing__tab active'>
                  {/*Dispositivos móviles*/}
                  <div className= 'fn__mobile_pricing'>

                    <div className= 'pricing__item'>
                      <div className= 'pricing__item_holder'>
                        <div className= 'pricing__item__header'>
                          <h2 className= 'title'>Personal</h2>
                          <h3 className= 'price'>
                            <span>$10</span>/month
                          </h3>
                          <p className= 'desc'>
                            billed yearly
                            <br/>
                            <span>$15</span> billed monthly
                          </p>
                          <p className= 'purchase'>
                            <a onClick= {() => {}} className= 'techwave_fn_button'>Buy Personal</a>
                          </p>
                        </div>

                        <div className= 'pricing__item__heading'>
                          <h2 className= 'title'>Main features</h2>
                        </div>
                        <div className= 'pricing__item_list'>
                          {["Crypto", "Dh Tokens", "Running bot", "Matic trading", 
                            "Any exchange trade", "Unlimited data"].map((item, index) => (
                              <div className= 'pricing__item_list_item'>
                                <h4 className= 'title'>{item}</h4>
                                <p className= 'desc'>20, {index + 1}00 </p>
                              </div>
                            ))}
                        </div>
                      </div>
                    </div>
                    
                    <div className= 'pricing__item'>
                      <div className= 'pricing__item_holder'>
                        <div className= 'popular'>
                          <span>Most popular</span>
                        </div>
                        <div className= 'pricing__item__header'>
                          <h2 className= 'title'>Premium</h2>
                          <h3 className= 'price'>
                            <span>$15</span>/month
                          </h3>
                          <p className= 'desc'>
                            billed yearly
                            <br/>
                            <span>$20</span> billed monthly
                          </p>
                          <p className= 'purchase'>
                            <a onClick= {() => {}} className= 'techwave_fn_button'>Buy Premium</a>
                          </p>
                        </div>

                        <div className= 'pricing__item__heading'>
                          <h2 className= 'title'>Main features</h2>
                        </div>
                        <div className= 'pricing__item_list'>
                          {["Crypto", "Dh Tokens", "Running bot", "Matic trading", 
                            "Any exchange trade", "Unlimited data"].map((item, index) => (
                              <div className= 'pricing__item_list_item'>
                                <h4 className= 'title'>{item}</h4>
                                <p className= 'desc'>20, {index + 1}00 </p>
                              </div>
                            ))}
                        </div>
                      </div>
                    </div>

                    <div className= 'pricing__item'>
                      <div className= 'pricing__item_holder'>
                        <div className= 'pricing__item__header'>
                          <h2 className= 'title'>Enterprice</h2>
                          <h3 className= 'price'>
                            <span>$35</span>/month
                          </h3>
                          <p className= 'desc'>
                            billed yearly
                            <br/>
                            <span>$40</span> billed monthly
                          </p>
                          <p className= 'purchase'>
                            <a onClick= {() => {}} className= 'techwave_fn_button'>Buy Enterprice</a>
                          </p>
                        </div>

                        <div className= 'pricing__item__heading'>
                          <h2 className= 'title'>Main features</h2>
                        </div>
                        <div className= 'pricing__item_list'>
                          {["Crypto", "Dh Tokens", "Running bot", "Matic trading", 
                            "Any exchange trade", "Unlimited data"].map((item, index) => (
                              <div className= 'pricing__item_list_item'>
                                <h4 className= 'title'>{item}</h4>
                                <p className= 'desc'>20, {index + 1}00 </p>
                              </div>
                            ))}
                        </div>
                      </div>
                    </div>
                  </div>

                  {/*Ordenadores*/}

                  <div className= 'pricing__content'>
                    <div className= 'pricing__header'>
                      <div className= 'item_row'>
                        <div className= 'item_col'></div>

                        <div className= 'item_col'>
                          <h2 className= 'title'>Personal</h2>
                          <h3 className= 'price'>
                            <span>5 Matic</span>/month
                          </h3>
                          <p className= 'desc'>Limited trading
                          <br />
                          <span>25</span> trading monthly</p>
                          <p className= 'purchase'>
                            <a onClick= {() => {}} className= 'techwave_fn_button'>Buy Personal</a>
                          </p>
                        </div>

                        <div className= 'item_col'>
                          <div className= 'popular'>
                            <span>Most popular</span>
                          </div>
                          <h2 className= 'title'>Premium</h2>
                          <h3 className= 'price'>
                            <span>5 Matic</span>/month
                          </h3>
                          <p className= 'desc'>Limited trading
                          <br />
                          <span>35</span> trading monthly</p>
                          <p className= 'purchase'>
                            <a onClick= {() => {}} className= 'techwave_fn_button'>Buy Premium</a>
                          </p>
                        </div>

                        <div className= 'item_col'>
                          <h2 className= 'title'>Enterprice</h2>
                          <h3 className= 'price'>
                            <span>5 Matic</span>/month
                          </h3>
                          <p className= 'desc'>Limited trading
                          <br />
                          <span>40</span> trading monthly</p>
                          <p className= 'purchase'>
                            <a onClick= {() => {}} className= 'techwave_fn_button'>Buy Enterprice</a>
                          </p>
                        </div>

                      </div>
                    </div>

                    <div className= 'pricing__heading'>
                      <div className= 'item'>
                        <span className= 'title'>Main features</span>
                      </div>
                      <div className= 'item wide'>

                      </div>
                    </div>
                    <div className= 'pricing__fields'>
                          {["Crypto", "Dh Tokens", "Running bot", "Matic trading", 
                            "Any exchange trade", "Unlimited data"].map((item, index) => (
                              <div className= 'item_row'>
                                <div className= 'item_col'>
                                  <span className= 'heading_text'>{item}</span>
                                </div>
                                <div className= 'item_col'>
                                  <span className= 'heading_text'>5, {index + 1}00</span>
                                </div>
                                <div className= 'item_col'>
                                  <span className= 'heading_text'>5, {index + 4}00</span>
                                </div>
                                <div className= 'item_col'>
                                  <span className= 'heading_text'>5, {index + 6}00</span>
                                </div>
                              </div>
                            ))}
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

export default Price

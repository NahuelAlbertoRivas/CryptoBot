import React, { useState, useEffect } from 'react'

const Signup = ({ axios, setactiveComponent, notifyError, notifySuccess }) => { // se setean las props. que pretendemos pasar desde ' index.js ' en el ' activeComponent ' (' axios ' y ' setActiveComponent ')
  
  const [user, setUser] = useState({ // se construye el objeto modelo del usuario
    name: "",
    email: "",
    password: "",
    passwordConfirm: "",
  });

  const handleFormFieldChange = (fieldName, e) => {// fn. que permitirá actualizar la info. de ' user '
    setUser({ ...user, [fieldName]: e.target.value }) ; // se ' deconstruye ' el objeto
  };

  // lógica para la autenticación
  const createAccount = async(e) => {
    e.preventDefault()
    if(user.name == "" || user.email == "" || user.password == "" || user.passwordConfirm == ""){
      return notifyError("Please, provide all the details"); // en lugar de usar un console.log, implementamos el componente ' notifyError ', desarrollado mediante ' toast '
    }

    notifySuccess("Creating account...");

    try {
      // API call
      const response = await axios({
        method: "POST",
        url: `/api/v1/user/signup`,
        withCredentials: true, // se define ' true ' en esta credencial ya que en la respuesta necesitamos almacenar la cookie
        data:{
          name: user.name,
          email: user.email,
          password: user.password,
          passwordConfirm: user.passwordConfirm,
        },
      });

      if(response.data.status == "success"){
        notifySuccess("Account created successfully");
        localStorage.setItem(// se guarda la info. localmente para luego reutilizarla en los componentes
          "USER_MEMBERSHIP", response.data.data.user.membershipType // tipo de suscripción (al registrarse obviamente no es miembro de ninguna)
        );
        localStorage.setItem("CryptoBot_BackEnd", response.data.data.user._id);
        localStorage.setItem("CryptoAUTH_TOKEN", response.data.token);

        window.location.reload();
      } else{
        notifyError("Something went wrong, try again later");
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className= "techwave_fn_sign">
      <div className= "sign__content">
        <h1 className= "logo">Designed by NAR</h1>
        <form className= "login">
          <div className= "form__content">
            <div className= "form__title">Sign up</div>
            <div className= "form__username">
              <label htmlFor= "usr_login">Name</label>
              <input type="text" className= "input" onChange={(e) => handleFormFieldChange("name", e)} /> 
            </div>
            <div className= "form__username">
              <label htmlFor= "usr_login">Email</label>
              <input type="text" className= "input" onChange={(e) => handleFormFieldChange("email", e)} /> 
            </div>
            <div className= "form__username">
              <label htmlFor= "usr_login">Password</label>
              <input type="text" className= "input" onChange={(e) => handleFormFieldChange("password", e)} /> 
            </div>
            <div className= "form__username">
              <label htmlFor= "usr_login">Password confirm</label>
              <input type="text" className= "input" onChange={(e) => handleFormFieldChange("passwordConfirm", e)} /> 
            </div>

            <div className= "form__alternative">
              <a onClick={(e) => createAccount(e)} className="techwave_fn_button">
                <span>Create account</span>
              </a>
            </div>
          </div>
        </form>
        <div className= "sign__desc">
          <p>Already have an account?
            <a onClick={() => setactiveComponent("Login")}> Login</a>
          </p>
        </div>
      </div>
    </div>
  )
}

export default Signup

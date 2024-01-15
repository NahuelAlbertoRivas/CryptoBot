import React, { useState, useEffect } from 'react'

const Login = ({ setactiveComponent, axios, notifySuccess, notifyError }) => {

  const [user, setUser] = useState({ // se construye el objeto modelo del usuario
    password: "",
  });

  const handleFormFieldChange = (fieldName, e) => {// fn. que permitirá actualizar la info. de ' user '
    setUser({ ...user, [fieldName]: e.target.value }) ; // se ' deconstruye ' el objeto
  };

  // lógica para la autenticación
  const apiLogin = async(e) => {
    e.preventDefault()
    if(user.email == "" || user.password == ""){
      return notifyError("Please, provide check the email and password"); // en lugar de usar un console.log, implementamos el componente ' notifyError ', desarrollado mediante ' toast '
    }

    notifySuccess("Login...");

    try {
      // API call
      const response = await axios({
        method: "POST",
        url: `/api/v1/user/login`,
        withCredentials: true, // se define ' true ' en esta credencial ya que en la respuesta necesitamos almacenar la cookie
        data:{
          email: user.email,
          password: user.password,
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
      } else if(response.data.status == "fail"){
        notifyError(response.data.message);
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
            <div className= "form__title">Sign in</div>
            <div className= "form__username">
              <label htmlFor= "usr_login">Email</label>
              <input type="text" className= "input" onChange={(e) => handleFormFieldChange("email", e)} /> 
            </div>
            <div className= "form__username">
              <label htmlFor= "usr_login">Password</label>
              <input type="password" className= "input" onChange={(e) => handleFormFieldChange("password", e)} /> 
            </div>

            <div className= "form__alternative">
              <a onClick={(e) => apiLogin(e)} className="techwave_fn_button">
                <span>Sign in</span>
              </a>
            </div>
          </div>
        </form>
        <div className= "sign__desc">
          <p>Not a member?
            <a onClick={() => setactiveComponent("Signup")}> Sign up</a>
          </p>
        </div>
      </div>
    </div>
  )
}

export default Login

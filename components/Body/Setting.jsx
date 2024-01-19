import React, { useState, useEffect, useCallback } from 'react'
import { useDropzone } from 'react-dropzone'

const Setting = ({ axios, notifySuccess, notifyError }) => {

  const [displayImg, setDisplayImg] = useState("");
  const [userDetails, setUserDetails] = useState({});
  
  useEffect(() => { 
    const user = JSON.parse(localStorage.getItem("userProfile"));
    setUserDetails(user);
    if(user !== null && user.displayImg !== "") setDisplayImg(user?.image);
  }, []);

  const [user, setUser] = useState({ // esta configuración da la libertad al usuario de que use distintas direcciones de su wallet con cualquier network existente
    name: "",
    userName: "",
    walletAddress: "",
    privateKey: "",
    image: displayImg,
    biography: ""
  });

  const handleFormFieldChange = (fieldName, e) => { // fn. que permitirá actualizar la info. de ' network '
    setUser({ ...user, [fieldName]: e.target.value }) ; // se ' deconstruye ' el objeto
  };

  const storeProfile = () => {
    const { 
      name, 
      userName,
      walletAddress, 
      privateKey, 
      image,
      biography} = user;

      if(userDetails !== null){
        console.log(userDetails.name);
        console.log(userDetails.userName);
        console.log(userDetails.walletAddress);
      }

      if((userDetails === null) && (!name || !userName || !walletAddress || !privateKey || !image))
        return notifyError("Please, provide all data");
      else{
        Object.keys(user).forEach((key) => {
          if(user[key] === "") user[key] = userDetails[key];
        });
      }
      
      localStorage.setItem("userProfile", JSON.stringify(user));
      notifySuccess("Profile updated successfully!");
  };

  const uploadToInfura = async (file) => { // ver documentación (img. to ipfs) -' Pinata ' / ' Infura '-; esta fn. subirá la imagen
    notifySuccess("Uploading file...");
    if(file){
      try {
        const formData = new FormData();
        formData.append("file", file);

        const response = await axios({
          method: "post",
          url: "https://api.pinata.cloud/pinning/pinFileToIPFS",
          data: formData,
          maxBodyLength: "Infinity",
          headers: {
            pinata_api_key: "6463788ff1c4e60f2ebc",
            pinata_secret_api_key: "37969aecab78c704c921884928eb275030635f995b876152032ad34ab8e3deb5",
            "Content-Type": "multipart/form-data",
          },
        });

        const ImgHash = `https://gateway.pinata.cloud/ipfs/${response.data.IpfsHash}`; // enpoint global para imagenes ' pinata '
        setUser({ ...user, image: ImgHash });
        setDisplayImg(ImgHash);
        notifySuccess("File uploaded successfully");
      } catch (error) {
        notifyError("Unable to upload image to pinata");
        console.log(error);
      }
    }
  };

  const onDrop = useCallback(async (acceptedFile) => {
    await uploadToInfura(acceptedFile[0]);
  });
  
  const handleImageChange = async (file) => {
    //const file = e?.target.files[0];
    if (file) {
        await uploadToInfura(file);
    }
  };

  const { 
    getInputProps, 
    getRootProps, 
    isDragAccept, 
    isDragReject,
    isDragActive, } = useDropzone({ onDrop, maxSize: 500000000000 });

  return (
    <div className= "techwave_fn_content">
      <div className= "techwave_fn_page">
        <div className= "techwave_fn_user_settings_page">
          <div className= "techwave_fn_pagetitle">
            <h2 className= "title">Profile settings</h2>
          </div>
          
          <div className= "container small">
            <div className= "techwave_fn_user_settings">
              <form >
                <div className= "user__settings">
                  <div className= "settings_left">
                    <label htmlFor= "input" className= "fn__upload">
                      {
                        displayImg === ""?(
                          <span className= "upload_content" { ...getRootProps() }>
                            <span className= "title">Drag and drop an image</span>
                            <span className= "fn__lined_text">
                              <span className= "line"></span>
                              <span className= "text">Ok</span>
                              <span className= "line"></span>
                            </span>

                            <span className= "title">Browse</span>
                            <span className= "desc">Support JPG, JPGE and PNG</span>
                            <input type= "file" accept= "image/*" { ...getInputProps() } />
                          </span>
                        ) : (
                          <span className= 'upload_content' { ...getRootProps() }>
                            <img src= { displayImg } className= "preview_img" alt= ""
                              style= {{flex: 1}} />
                            <input type="file" accept= 'image/*' { ...getInputProps() } />
                          </span>
                        )
                      }
                    </label>
                  </div>

                  <div className= "settings_right">
                    <div className= "item">
                      <label htmlFor= "name" className= "input_label">Name</label>

                      <div className= "input_item">
                        <input type= "text" className= "input" placeholder= {userDetails?.name || "John Andersen"}
                          onChange={(e) => handleFormFieldChange("name", e)}
                          defaultValue={userDetails?.name} />
                      </div>
                    </div>
                    <div className= "item">
                      <label htmlFor= "name" className= "input_label">Username</label>

                      <div className= "input_item">
                        <input type= "text" className= "input" placeholder= {userDetails?.userName || "@johnanderseb" }
                          onChange={(e) => handleFormFieldChange("userName", e)}
                          defaultValue={userDetails?.userName} />
                      </div>
                    </div>
                    <div className= "item">
                      <label htmlFor= "name" className= "input_label">Wallet address</label>

                      <div className= "input_item">
                        <input type= "text" className= "input" placeholder= {userDetails?.walletAddress || "Address"} 
                          onChange={(e) => handleFormFieldChange("walletAddress", e)}
                          defaultValue={userDetails?.walletAddress} />
                      </div>
                    </div>
                    <div className= "item">
                      <label htmlFor= "name" className= "input_label">Private key</label>

                      <div className= "input_item">
                        <input type= "text" className= "input" placeholder= "Private key" 
                          onChange={(e) => handleFormFieldChange("privateKey", e)}
                          defaultValue={userDetails?.privateKey} />
                      </div>
                    </div>
                    <div className= "item">
                      <label htmlFor= "name" className= "input_label">Biography</label>

                      <div className= "input_item">
                        <textarea className= "input" placeholder= {userDetails?.biography || "About you"}
                          onChange={(e) => handleFormFieldChange("biography", e)}
                          defaultValue={userDetails?.biography} />
                      </div>
                    </div>

                    <div className= "item">
                      <div>
                        <a onClick={() => storeProfile()} className= "techwave_fn_button">Save profile</a>
                      </div>
                    </div>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>    
    </div>
  )
}

export default Setting

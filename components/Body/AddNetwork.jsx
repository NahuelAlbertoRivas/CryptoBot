import React, { useState, useEffect, useCallback } from 'react'
import { useDropzone } from 'react-dropzone'

const AddNetwork = ({ axios, notifySuccess, notifyError }) => {

  const [displayImg, setDisplayImg] = useState("");
  const [network, setNetwork] = useState({ // esta configuración da la libertad al usuario de que use distintas direcciones de su wallet con cualquier network existente
    networkName: "",
    rpcUrl: "",
    apiKey: "",
    walletAddress: "",
    privateKey: "",
    image: displayImg,
  });

  const handleFormFieldChange = (fieldName, e) => {// fn. que permitirá actualizar la info. de ' network '
    setNetwork({ ...network, [fieldName]: e.target.value }) ; // se ' deconstruye ' el objeto
  };

  const storeNetwork = () => {
    const { 
      networkName, 
      rpcUrl, 
      apiKey, 
      walletAddress, 
      privateKey, 
      image} = network;

      if(!networkName || !rpcUrl || !apiKey || !walletAddress || !privateKey || !image)
        return notifyError("Please, provide all data");
      
      let networkArray = []; 
      const networkList = localStorage.getItem("setNetwork"); // se recupera info. del almacenamiento local en caso de que haya
      if(networkList){
        networkArray = JSON.parse(localStorage.getItem("setNetwork"));
        networkArray.push(network);
        localStorage.setItem("setNetwork", JSON.stringify(networkArray));
        notifySuccess("Network added successfully!");
      } else{ // si no guardó info. previamente, simplemente guardamos la data
        networkArray.push(network);
        localStorage.setItem("setNetwork", JSON.stringify(networkArray));
        notifySuccess("Network added successfully!");
      }
  };

  const uploadToInfura = async(file) => { // ver documentación (img. to ipfs) -' Pinata ' / ' Infura '-; esta fn. subirá la imagen
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
        setNetwork({ ...network, image: ImgHash });
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

  const { 
    getInputProps, 
    getRootProps, 
    isDragAccept, 
    isDragReject,
    isDragActive } = useDropzone({ onDrop, maxSize: 500000000000 });

  return (
    <div className= "techwave_fn_content">
      <div className= "techwave_fn_page">
        <div className= "techwave_fn_user_settings_page">
          <div className= "techwave_fn_pagetitle">
            <h2 className= "title">Add new Network</h2>
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
                          <img src= { displayImg } className= "preview_img" alt= "" />
                        )
                      }
                    </label>
                  </div>

                  <div className= "settings_right">
                    <div className= "item">
                      <label htmlFor= "name" className= "input_label">Network name</label>

                      <div className= "input_item">
                        <input type= "text" className= "input" placeholder= "Network" 
                          onChange={(e) => handleFormFieldChange("networkName", e)} />
                      </div>
                    </div>
                    <div className= "item">
                      <label htmlFor= "name" className= "input_label">Alchemy provider</label>

                      <div className= "input_item">
                        <input type= "text" className= "input" placeholder= "RPC URL" 
                          onChange={(e) => handleFormFieldChange("rpcUrl", e)} />
                      </div>
                    </div>
                    <div className= "item">
                      <label htmlFor= "name" className= "input_label">Alchemy API key</label>

                      <div className= "input_item">
                        <input type= "text" className= "input" placeholder= "API key" 
                          onChange={(e) => handleFormFieldChange("apiKey", e)} />
                      </div>
                    </div>
                    <div className= "item">
                      <label htmlFor= "name" className= "input_label">Wallet address</label>

                      <div className= "input_item">
                        <input type= "text" className= "input" placeholder= "Address" 
                          onChange={(e) => handleFormFieldChange("walletAddress", e)} />
                      </div>
                    </div>
                    <div className= "item">
                      <label htmlFor= "name" className= "input_label">Private key</label>

                      <div className= "input_item">
                        <input type= "password" className= "input" placeholder= "Private key" 
                          onChange={(e) => handleFormFieldChange("privateKey", e)} />
                      </div>
                    </div>

                    <div className= "item">
                      <div>
                        <a onClick={() => storeNetwork()} className= "techwave_fn_button">Save Network</a>
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

export default AddNetwork

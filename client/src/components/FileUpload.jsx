import React, { useState } from 'react';
import { API_Key, API_Secret } from '../utils/constants';
import axios from "axios";

const FileUpload = ({ contract, account, provider }) => {
    const [file, setFile] = useState(null)
    const [fileName, setFileName] = useState('No File Selected')
    const handleSubmit = async (e) => {
        e.preventDefault();

        if (file) {
            try {
                const formData = new FormData();
                formData.append("file", file);


                const resFile = await axios({
                    method: "post",
                    url: "https://api.pinata.cloud/pinning/pinFileToIPFS",
                    data: formData,
                    headers: {
                        pinata_api_key: API_Key,
                        pinata_secret_api_key: API_Secret,
                        "Content-Type": "multipart/form-data",
                    },
                });
                const ImgHash = `https://gateway.pinata.cloud/ipfs/${resFile.data.IpfsHash}`;
                contract.add(account, ImgHash);
                alert("Successfully Image Uploaded");
                setFileName("No image selected");
                setFile(null);

            } catch(e) {
                console.log(e)
                console.log("unable to upload image ")
            }
        }

    }
    const retrieveFile =   (e) => {
        const data= e.target.files[0];
        console.log(data);
        const reader = new window.FileReader();
        reader.readAsArrayBuffer(data)
        reader.onloadend=()=>{
            setFile(e.target.files[0])
            
        }
        setFileName(e.target.files[0].name)
        e.preventDefault();

    }
    return (
        <>
            <form className='form' onSubmit={handleSubmit}>

                <label> Select File</label>
                <input disabled={!account} type='file' name='data' onChange={retrieveFile} id='file-upload' />
                <span className='textTitle'> Image: {fileName}</span>
                <button type='submit'>submit</button>

            </form>
        </>
    );
}

export default FileUpload;

import { useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import "./App.css";
import { ethers } from "ethers";
import { contractAbi, contractAddress } from './utils/constants';
import FileUpload from './components/FileUpload'; 
import Modal from './components/Modal';
import Display from './components/Display';
import Navigation from './components/Navigation';
 

function App() {
  const [account , setAccount] = useState('');
  const [contract , setContract] = useState('');
  const [provider , setProvider] = useState(''); 
  const [modalOpen, setModalOpen] = useState(false);

  useEffect(()=>{
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const loadProvider= async()=>{
      if(provider){
        window.ethereum.on('chainChanged', ()=>{
          window.location.reload();
        })

        window.ethereum.on('accountsChanged', ()=>{
          window.location.reload();
        })



        await provider.send("eth_requestAccounts",[])
        const signer = provider.getSigner();
        const address = await signer.getAddress();
        setAccount(address);
        console.log('contractAddress ', contractAddress)
        console.log('abi ', contractAbi)

        const contract = new ethers.Contract(
          contractAddress,contractAbi,signer
        )
        setContract(contract);
        setProvider(provider)
      }
      else{
        console.log("MetaMask is not installed")

      }
    }


    provider && loadProvider();

  },
  []

  )


  return (
    <>
    <Navigation/>
       

       {!modalOpen && (
        <button className="share" onClick={() => setModalOpen(true)}>
          Share
        </button>
      )}
      {modalOpen && (
        <Modal setModalOpen={setModalOpen} contract={contract}></Modal>
      )}

      <div className="App">
        <h1 style={{ color: "white" }}>Drive (Ethereup,IPFS ) </h1>
        <div className="bg"></div>
        <div className="bg bg2"></div>
        <div className="bg bg3"></div>

        <p style={{ color: "white" }}>
          Account : {account ? account : "Not connected"}
        </p>
        <FileUpload
          account={account}
          provider={provider}
          contract={contract}
        ></FileUpload>
        <Display contract={contract} account={account}></Display>
      </div>

    </>
  )
}

export default App

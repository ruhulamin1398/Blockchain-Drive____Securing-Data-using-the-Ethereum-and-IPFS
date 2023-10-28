import { useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import "./App.css";
import { ethers } from "ethers";
import { contractAbi, contractAddress } from './utils/constants';
import FileUpload from './components/FileUpload'; 
// import Modal from './components/Modal';
import Display from './components/Display';
import Navigation from './components/Navigation';
import Files from './components/Files';
 

function App() {
  const [account , setAccount] = useState('');
  const [contract , setContract] = useState('');
  const [provider , setProvider] = useState(''); 
  // const [modalOpen, setModalOpen] = useState(false);

  useEffect(()=>{
    if(window.ethereum){
       
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
  }

  else{
    alert('Please Install Metamusk')
  }

  },
  []

  )


  return (
    <> 
       
 

      <div className="App">
        <p className='text-5xl text-white font-black mt-2 md:mt-[150px]'  >Blockchain Drive (Ethereum,IPFS ) </p>
     

        <p style={{ color: "white" }}>
          Account : {account ? account : "Not connected"}
        </p>
        <FileUpload
          account={account}
          provider={provider}
          contract={contract}
        ></FileUpload>
        
      </div>
 


      <div id='files' className=" bg-black  bg-opacity-75  mx-auto max-w-7xl  sm:px-6   lg:px-8  py-5 md:py-10">
      <Files contract={contract} account={account} title="My Files" />
        </div>


        
      <div className=" bg-black  bg-opacity-75  mx-auto max-w-7xl  sm:px-6   lg:px-8  py-5 md:py-10">
      <Files contract={contract} account={account}  title="Shared With Me" shared='1' />
        </div>

        
      

      

    </>
  )
}

export default App

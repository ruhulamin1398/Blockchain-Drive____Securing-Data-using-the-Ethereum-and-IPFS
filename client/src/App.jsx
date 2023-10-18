import { useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { ethers } from "ethers";
import { contractAbi, contractAddress } from './utils/constants';

function App() {
  const [account , setAccount] = useState('');
  const [contract , setContract] = useState('');
  const [provider , setProvider] = useState(''); 

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
       
       

    <h1 className="text-3xl font-bold underline">
      Hello world! {account}
    </h1>


    </>
  )
}

export default App

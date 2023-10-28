import { ethers } from 'ethers';
import React, { useEffect, useState } from 'react';
import { contractAbi, contractAddress } from '../utils/constants';
import { TrashIcon } from '@heroicons/react/24/outline'


const Share = () => {



    contractAddress

    const [account, setAccount] = useState('');
    const [contract, setContract] = useState('');
    const [provider, setProvider] = useState('');
    const [sharedAddress, setSharedAddress] = useState([]);



    useEffect(() => {

        if (window.ethereum) {

            const provider = new ethers.providers.Web3Provider(window.ethereum);
            const loadProvider = async () => {
                if (provider) {
                    window.ethereum.on('chainChanged', () => {
                        window.location.reload();
                    })

                    window.ethereum.on('accountsChanged', () => {
                        window.location.reload();
                    })

                    await provider.send("eth_requestAccounts", [])
                    const signer = provider.getSigner();
                    const address = await signer.getAddress();
                    setAccount(address);
                    console.log('contractAddress ', contractAddress)
                    console.log('abi ', contractAbi)

                    const contract = new ethers.Contract(
                        contractAddress, contractAbi, signer
                    )
                    setContract(contract);
                    setProvider(provider)
                }
                else {
                    console.log("MetaMask is not installed")

                }
            }
            provider && loadProvider();
        }
        else {
            alert('Please Install Metamusk')
        }

    },
        []
    )


    useEffect(() => {
        if (window.ethereum) {

            const accessList = async () => {
                if (provider) {
                    const addressList = await contract.shareAccess();
                    console.log(addressList)
                    setSharedAddress(addressList);
                }
            };
            contract && accessList();
        }

    }, [contract]);







    const sharing = async () => {
        const address = document.querySelector(".address").value;
        await contract.allow(address);
        window.location.reload()
    };

    const removAccess = async (address) => { 
        await contract.disallow(address);
        window.location.reload()
    };


    return (

        <>

    



            <div id='files' className=" bg-black  bg-opacity-75  mx-auto max-w-7xl  sm:px-6   lg:px-8  py-5 md:py-10 my-5">

                <div className="text-3xl font-bold  shadow-sm text-slate-50   border-bottom-1"> Shared Files With Accounts</div>

                <p style={{ color: "white" }}>
                    {account ? '' : "Please connect your metamusk account to view"}
                </p>

            
                <div className="grid grid-cols-5   w-full   gap-2 left mb-10"> 
                <input
                    type="text"
                    placeholder="Enter Others Address "
                    className="address w-full p-5 col-span-2  rounded-xl  "
                />
                
                <button className=" button   w-full col-span-1 "  onClick={() => sharing()}>
                    Share
                </button> 
            </div>


                <ol className="    grid grid-cols-1 md:grid-cols-1  gap-1  ">
                    {sharedAddress.map((address, id) => (
                        (address[1])? (

                            <li key={id} className="flex justify-between gap-x-1 bg-black   bg-opacity-20  py-0 px-2     ">
                            <div className="flex min-w-0 gap-x-1    ">
                            <div className="text-sm font-semibold leading-6 text-white whitespace-normal break-words mb-1  ">
                            <span className='font-bold'>Account {id + 1}:</span>  {address[0]} </div>
                            <span className=' border-red-950 text-red-700 border  p-1 cursor-pointer '
                            
                            onClick={()=>removAccess(address[0])}
                            >
                            Remove Access
                            {/* <TrashIcon className="h-4 w-4 text-red-900  " />   */}
                            </span>
                            </div>
                            
                            </li>
                        ): ""
                    ))}
                </ol>


 

            </div>

            



        </>
    );
}

export default Share;

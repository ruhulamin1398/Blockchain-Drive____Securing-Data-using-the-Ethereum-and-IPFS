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

    },
        []
    )


    useEffect(() => {
        const accessList = async () => {
            const addressList = await contract.shareAccess();
            setSharedAddress(addressList);


            let select = document.querySelector("#selectNumber");
            const options = addressList;
            console.log('addressList', addressList)
            console.log('options', options)

            for (let i = 0; i < options.length; i++) {
                let opt = options[i];
                let e1 = document.createElement("option");
                e1.textContent = opt;
                e1.value = opt;
                select.appendChild(e1);
            }
        };
        contract && accessList();
    }, [contract]);







    const sharing = async () => {
        const address = document.querySelector(".address").value;
        await contract.allow(address);
        window.location.reload()
    };


    return (

        <>

            <input
                type="text"
                className="address"
                placeholder="Enter Address"
            ></input>

            <form id="myForm">
                <select id="selectNumber">
                    <option className="address">People With Access</option>
                </select>
            </form>


            <div id='files' className=" bg-black  bg-opacity-75  mx-auto max-w-7xl  sm:px-6   lg:px-8  py-5 md:py-10 my-5">
 
                <div className="text-3xl font-bold  shadow-sm text-slate-50   border-bottom-1"> Shared With Files</div> 

                <ol className="divide-y divide-black  grid grid-cols-1 md:grid-cols-1  gap-0  ">
                    {sharedAddress.map((address, id) => (
                        <li key={id} className="flex justify-between gap-x-1  py-1 px-4 ">
                            <div className="flex min-w-0 gap-x-1">
                                <div className="text-sm font-semibold leading-6 text-white whitespace-normal break-words mb-1 ">
                                    <span className='font-bold'>Account {id + 1}:</span>  {address[0]} </div>
                                <TrashIcon className="h-6 w-6 text-red-900" /> {/* Delete icon */}
                            </div>

                        </li>
                    ))}
                </ol>
            </div>

            <button onClick={() => sharing()}>Share</button>



        </>
    );
}

export default Share;

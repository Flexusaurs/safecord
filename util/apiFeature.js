import { ethers } from "ethers";
import Web3Modal from 'web3modal';
import { ChatAppAddress, ChatAppABI } from "../Context/Constants";


export const checkIfWalletConnected = async() => {
    try{
        if(!window.ethereum) return console.log("INSTALL METAMASK")
        const accounts = await window.ethereum.request({
            method: "eth_accounts",
        })
    const firstAccount = accounts[0];
    return firstAccount;
    } catch (error){
        console.log(error)
    }
}

export connectWallet = async () => {
    try{
        if(!window.ethereum) return console.log("INSTALL METAMASK")
        const accounts = await window.ethereum.request({
            method: "eth_requestAccounts",
        })
    const firstAccount = accounts[0];
    return firstAccount;
    } catch (error){
        console.log(error)
    }
}

const fetchContract =  (signerOrProvider)=> 
    new ethers.Contract(ChatAppABI, ChatAppAddress, signerOrProvider);

export const connectingWithContract = async() => {
    
}
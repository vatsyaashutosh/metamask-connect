import { useWeb3React } from "@web3-react/core";
import { useEffect, useState } from "react";
import { injected } from "./wallet/connector";
import Web3 from "web3";
import React from "react";

export default function Home() {
  const { active, account, activate, deactivate } = useWeb3React();
  const web3 = new Web3(window.ethereum);
  const [balance, setBalance] = useState(undefined);

  async function connect() {
    try {
      await activate(injected);
      localStorage.setItem("isWalletConnected", true);
    } catch (ex) {
      console.log(ex);
    }
  }
  const getBalance = () => {
    web3.eth.getBalance(account, function(error, result) {
      if (error) {
        console.log(error);
      } else {
        setBalance(web3.fromWei(Number(result.c[0] + String(result.c[1]))));
      }
    });
  };
  async function disconnect() {
    try {
      deactivate();
      localStorage.setItem("isWalletConnected", false);
    } catch (ex) {
      console.log(ex);
    }
  }

  useEffect(() => {
    const connectWalletOnPageLoad = async () => {
      if (localStorage.getItem("isWalletConnected") === "true") {
        try {
          await activate(injected);
          localStorage.setItem("isWalletConnected", true);
        } catch (ex) {
          console.log(ex);
        }
      }
    };
    connectWalletOnPageLoad();
  }, []);

  return (
    <div className="">
      <button onClick={connect} className="">
        Connect to MetaMask
      </button>
      {active ? (
        <span>
          Connected with <b>{account}</b>
          <button onClick={getBalance}>Get Balance</button>
          {balance ? <span>Your balance is {balance} eth</span> : ""}
        </span>
      ) : (
        <span>Not connected</span>
      )}
      <button onClick={disconnect} className="">
        Disconnect
      </button>
    </div>
  );
}

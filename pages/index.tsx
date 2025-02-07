
import { useState, useEffect } from "react";
import { useAccount, useWriteContract, useConnect, useDisconnect } from "wagmi";
import { parseEther } from "viem";
import { ConnectButton, darkTheme } from "@rainbow-me/rainbowkit";

import type { NextPage } from "next";
import type { JSX } from "react";
import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.css";

const wethAbi = [
	{
		"inputs": [],
		"name": "deposit",
		"outputs": [],
		"stateMutability": "payable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "wad",
				"type": "uint256"
			}
		],
		"outputs": [],
		"name": "withdraw",
		"stateMutability": "nonpayable",
		"type": "function"
	}
];

const Home: NextPage = () => {
  const [amount, setAmount] = useState("");
  const [withdrawAmount, setWithdrawAmount] = useState("");
  const [message, setMessage] = useState("");
  const [isEnabled, setIsEnabled] = useState(true);

  const account = useAccount();
  const { connectors, connect, status, error: walletConnectError } = useConnect();
  const { disconnect } = useDisconnect();

  const {
    writeContract,
    data,
    error: writeError,
    isPending,
    reset,
  } = useWriteContract();

  useEffect(() => {
    if (!isPending && writeError != null) setIsEnabled(true);
  }, [isPending, writeError]);

  useEffect(() => {
    if (writeError) setMessage(`${writeError}`);
  }, [writeError]);

  const handleWrap = async () => {
    if (!amount || isNaN(Number(amount))) {
      setMessage("Enter a valid amount");
      return;
    }
    setIsEnabled(false);
    writeContract({
      address: "0x1fB719f10b56d7a85DCD32f27f897375fB21cfdd",
      abi: wethAbi,
      functionName: "deposit",
      value: parseEther(amount),
      args: []
    });
  };

  const handleWithdraw = async () => {
    if (!withdrawAmount || isNaN(Number(withdrawAmount))) {
      setMessage("Enter a valid amount");
      return;
    }
    setIsEnabled(false);
    writeContract({
      address: "0x1fB719f10b56d7a85DCD32f27f897375fB21cfdd",
      abi: wethAbi,
      functionName: "withdraw",
      args: [parseEther(withdrawAmount)]
    });
  };

  return (
    <div className={styles.container}>
      <Head>
        <title>ETH Wrapper</title>
        <meta
          content="ETH wrapper for Superposition Mainnet"
          name="description"
        />
        <link href="/favicon.ico" rel="icon" />
      </Head>
      <div>
        <main className="main">
          <section className="section">
            <div className="navbar">
              <p className="navbar-text">Wrap ETH</p>
              <a
                className="navbar-link"
                href="https://superposition.so"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Image
                  src="/superposition.svg"
                  alt="Superposition Logo"
                  width={150}
                  height={20}
                  className="invert"
                  priority
                />
              </a>
            </div>
            <div className="card">
              <h1 className="card-title">Wrap ETH to WETH</h1>
              <input
                type="number"
                placeholder="Amount of ETH"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                className="input"
              />
              {message}
              <button
                onClick={handleWrap}
                className="button"
                disabled={!isEnabled}
              >
                Wrap ETH
              </button>
              <div style={{ padding: "10px" }}><ConnectButton /></div>
            </div>
            <div className="card">
              <h1 className="card-title">Withdraw WETH</h1>
              <input
                type="number"
                placeholder="Amount of WETH"
                value={withdrawAmount}
                onChange={(e) => setWithdrawAmount(e.target.value)}
                className="input"
              />
              {message}
              <button
                onClick={handleWithdraw}
                className="button"
                disabled={!isEnabled}
              >
                Withdraw WETH
              </button>
            </div>
          </section>
        </main>
      </div>
    </div>
  );
};

export default Home;

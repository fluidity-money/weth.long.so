
import { useState, useEffect } from "react";
import { useAccount, useWriteContract, useConnect, useDisconnect } from "wagmi";
import { parseEther } from "viem";
import { ConnectButton, darkTheme } from "@rainbow-me/rainbowkit";

import type { NextPage } from "next";
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
	}
];

const Home: NextPage = () => {
  const [amount, setAmount] = useState("");
  const [amount2, setAmount2] = useState("");
  const [message, setMessage] = useState("");
  const [message2, setMessage2] = useState("");
  const [isEnabled, setIsEnabled] = useState(true);
  const [isEnabled2, setIsEnabled2] = useState(true);

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
    if (!isPending && writeError != null) {
      setIsEnabled(true);
      setIsEnabled2(true);
    }
  }, [isPending]);

  useEffect(() => {
    if (writeError) {
      setMessage(`${writeError}`);
      setMessage2(`${writeError}`);
    }
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

  const handleWrap2 = async () => {
    if (!amount2 || isNaN(Number(amount2))) {
      setMessage2("Enter a valid amount");
      return;
    }
    setIsEnabled2(false);
    writeContract({
      address: "0x1fB719f10b56d7a85DCD32f27f897375fB21cfdd",
      abi: wethAbi,
      functionName: "deposit",
      value: parseEther(amount2),
      args: []
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
            <div className="card" style={{ marginTop: "20px" }}>
              <h1 className="card-title">Wrap ETH to WETH (Second)</h1>
              <input
                type="number"
                placeholder="Amount of ETH"
                value={amount2}
                onChange={(e) => setAmount2(e.target.value)}
                className="input"
              />
              {message2}
              <button
                onClick={handleWrap2}
                className="button"
                disabled={!isEnabled2}
              >
                Wrap ETH
              </button>
            </div>
          </section>
        </main>
      </div>
    </div>
  );
};

export default Home;

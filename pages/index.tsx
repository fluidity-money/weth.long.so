
import { useState } from 'react';
import { useAccount, useWriteContract, useConnect, useDisconnect } from 'wagmi';
import { parseEther } from 'viem';
import { ConnectButton, darkTheme } from '@rainbow-me/rainbowkit';

import type { NextPage } from 'next';
import Head from 'next/head';
import Image from 'next/image';
import styles from '../styles/Home.module.css';

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
  const [amount, setAmount] = useState('');
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

  const handleWrap = async () => {
    if (!amount || isNaN(Number(amount))) {
      alert('Please enter a valid amount');
      return;
    }
    writeContract({
      address: "0x22b9fa698b68bba071b513959794e9a47d19214c",
      abi: wethAbi,
      functionName: "deposit",
      value: BigInt(amount) * BigInt(1e18),
      args: []
    });
  };

  console.log("write error", writeError);

  return (
    <div className={styles.container}>
      <Head>
        <title>SPN Wrapper</title>
        <meta
          content="SPN wrapper for Superposition Testnet"
          name="description"
        />
        <link href="/favicon.ico" rel="icon" />
      </Head>
      <div>
        <main className="main">
          <section className="section">
            <div className="navbar">
              <p className="navbar-text">Wrap SPN</p>
              <a
                className="navbar-link"
                href="https://superposition.so"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Image
                  src="/superposition.svg"
                  alt="Superposition Logo"
                  width={175}
                  height={240}
                  className="invert"
                  priority
                />
              </a>
            </div>
            <div className="card">
              <h1 className="card-title">Wrap SPN to WSPN</h1>
              <input
                type="number"
                placeholder="Amount of SPN"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                className="input"
              />
              <button
                onClick={handleWrap}
                className="button"
              >
                Wrap SPN
              </button>
              <div style={{ padding: "10px" }}><ConnectButton /></div>
            </div>
          </section>
        </main>
      </div>
    </div>
  );
};

export default Home;

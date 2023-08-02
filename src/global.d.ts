declare global {
  interface Window {
    ethereum: import('ethers').BrowserProvider;
  }
}

export {};

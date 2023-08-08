import { formatEther } from 'ethers';

export function truncateWalletAddress(address: string) {
  return `${address.slice(0, 6)}...${address.slice(-4)}`;
}

export function toEtherString(amount: bigint, digits = 4) {
  return parseFloat(formatEther(amount)).toFixed(digits).toString();
}

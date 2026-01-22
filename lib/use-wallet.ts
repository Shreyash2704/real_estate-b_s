'use client'

import { useEffect, useMemo, useState } from 'react'

type EthereumProvider = {
  isMetaMask?: boolean
  request: (args: { method: string; params?: unknown[] }) => Promise<unknown>
  on: (event: string, listener: (...args: unknown[]) => void) => void
  removeListener: (event: string, listener: (...args: unknown[]) => void) => void
}

type ChainParam = {
  chainId: string
  chainName: string
  nativeCurrency: { name: string; symbol: string; decimals: number }
  rpcUrls: string[]
  blockExplorerUrls: string[]
}

const CHAIN_PARAMS: Record<string, ChainParam> = {
  '0x1': {
    chainId: '0x1',
    chainName: 'Ethereum Mainnet',
    nativeCurrency: { name: 'Ether', symbol: 'ETH', decimals: 18 },
    rpcUrls: ['https://rpc.ankr.com/eth'],
    blockExplorerUrls: ['https://etherscan.io'],
  },
  '0x4268': {
    chainId: '0x4268',
    chainName: 'Holesky',
    nativeCurrency: { name: 'Holesky ETH', symbol: 'ETH', decimals: 18 },
    rpcUrls: ['https://rpc.holesky.ethpandaops.io'],
    blockExplorerUrls: ['https://holesky.etherscan.io'],
  },
  '0xaa36a7': {
    chainId: '0xaa36a7',
    chainName: 'Sepolia',
    nativeCurrency: { name: 'Sepolia ETH', symbol: 'ETH', decimals: 18 },
    rpcUrls: ['https://rpc.sepolia.org'],
    blockExplorerUrls: ['https://sepolia.etherscan.io'],
  },
  '0x14a34': {
    chainId: '0x14a34',
    chainName: 'Base Sepolia',
    nativeCurrency: { name: 'Sepolia ETH', symbol: 'ETH', decimals: 18 },
    rpcUrls: ['https://sepolia.base.org'],
    blockExplorerUrls: ['https://sepolia.basescan.org'],
  },
  '0xaa37dc': {
    chainId: '0xaa37dc',
    chainName: 'Optimism Sepolia',
    nativeCurrency: { name: 'Sepolia ETH', symbol: 'ETH', decimals: 18 },
    rpcUrls: ['https://sepolia.optimism.io'],
    blockExplorerUrls: ['https://sepolia-optimism.etherscan.io'],
  },
  '0x66eee': {
    chainId: '0x66eee',
    chainName: 'Arbitrum Sepolia',
    nativeCurrency: { name: 'Sepolia ETH', symbol: 'ETH', decimals: 18 },
    rpcUrls: ['https://sepolia-rollup.arbitrum.io/rpc'],
    blockExplorerUrls: ['https://sepolia.arbiscan.io'],
  },
}

const CHAINS = Object.values(CHAIN_PARAMS).map(({ chainId, chainName }) => ({
  id: chainId,
  label: chainName,
}))

const getEthereum = () =>
  (typeof window !== 'undefined'
    ? (window as Window & { ethereum?: EthereumProvider }).ethereum
    : undefined)

export function useWallet() {
  const [hasMetaMask, setHasMetaMask] = useState(false)
  const [walletAddress, setWalletAddress] = useState<string | null>(null)
  const [chainId, setChainId] = useState<string | null>(null)
  const [isConnecting, setIsConnecting] = useState(false)

  useEffect(() => {
    const ethereum = getEthereum()
    const isAvailable = Boolean(ethereum && ethereum.isMetaMask)
    setHasMetaMask(isAvailable)

    if (!ethereum) return

    const handleAccountsChanged = (accounts: unknown) => {
      const nextAccounts = accounts as string[]
      setWalletAddress(nextAccounts?.[0] ?? null)
    }

    const handleChainChanged = (nextChainId: unknown) => {
      setChainId(String(nextChainId))
    }

    ethereum.request({ method: 'eth_accounts' }).then((accounts) => {
      const nextAccounts = accounts as string[]
      setWalletAddress(nextAccounts?.[0] ?? null)
    }).catch(() => {
      setWalletAddress(null)
    })

    ethereum.request({ method: 'eth_chainId' }).then((currentChainId) => {
      setChainId(String(currentChainId))
    }).catch(() => {
      setChainId(null)
    })

    ethereum.on('accountsChanged', handleAccountsChanged)
    ethereum.on('chainChanged', handleChainChanged)

    return () => {
      ethereum.removeListener('accountsChanged', handleAccountsChanged)
      ethereum.removeListener('chainChanged', handleChainChanged)
    }
  }, [])

  const connectWallet = async () => {
    const ethereum = getEthereum()
    if (!ethereum) {
      window.open('https://metamask.io/download/', '_blank', 'noopener,noreferrer')
      return
    }
    try {
      setIsConnecting(true)
      const accounts = await ethereum.request({ method: 'eth_requestAccounts' })
      const nextAccounts = accounts as string[]
      setWalletAddress(nextAccounts?.[0] ?? null)
      const nextChainId = await ethereum.request({ method: 'eth_chainId' })
      setChainId(String(nextChainId))
    } finally {
      setIsConnecting(false)
    }
  }

  const selectAccount = async () => {
    const ethereum = getEthereum()
    if (!ethereum) return
    try {
      await ethereum.request({
        method: 'wallet_requestPermissions',
        params: [{ eth_accounts: {} }],
      })
    } catch (error) {
      console.error('Failed to request account permissions', error)
    }
    try {
      const accounts = await ethereum.request({ method: 'eth_requestAccounts' })
      const nextAccounts = accounts as string[]
      setWalletAddress(nextAccounts?.[0] ?? null)
    } catch (error) {
      console.error('Failed to select account', error)
    }
  }

  const disconnectWallet = () => {
    setWalletAddress(null)
    setChainId(null)
  }

  const switchChain = async (targetChainId: string) => {
    const ethereum = getEthereum()
    if (!ethereum) return
    try {
      await ethereum.request({
        method: 'wallet_switchEthereumChain',
        params: [{ chainId: targetChainId }],
      })
      setChainId(targetChainId)
    } catch (error: unknown) {
      const errorCode = (error as { code?: number }).code
      if (errorCode === 4902) {
        const params = CHAIN_PARAMS[targetChainId]
        if (params) {
          try {
            await ethereum.request({
              method: 'wallet_addEthereumChain',
              params: [params],
            })
            setChainId(targetChainId)
            return
          } catch (addError) {
            console.error('Failed to add chain', addError)
          }
        }
      }
      console.error('Failed to switch chain', error)
    }
  }

  const shortAddress = (address: string) => `${address.slice(0, 6)}...${address.slice(-4)}`

  const chainLabel = useMemo(() => {
    if (!chainId) return 'Unknown'
    return CHAIN_PARAMS[chainId]?.chainName ?? `Chain ${chainId}`
  }, [chainId])

  return {
    hasMetaMask,
    walletAddress,
    chainId,
    chainLabel,
    chains: CHAINS,
    isConnecting,
    connectWallet,
    selectAccount,
    disconnectWallet,
    switchChain,
    shortAddress,
  }
}


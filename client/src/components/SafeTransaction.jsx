import { ethers } from 'ethers'
import { EthersAdapter } from '@safe-global/protocol-kit'

// Wrap EIP-1193 provider with ethers
const provider = new ethers.BrowserProvider(safeAuthPack.getProvider())
const signer = provider.getSigner()

// Create the Safe EthersAdapter
const ethAdapter = new EthersAdapter({
  ethers,
  signerOrProvider: signer || provider,
})

// Instantiate the protocolKit
const protocolKit = await Safe.create({
  ethAdapter,
  safeAddress,
})

// Create a Safe transaction with the provided parameters
const SafeTransactionData = {
  to: `${ethAddress}`,
  data: '0x',
  value: ethers.parseUnits('0.0001', 'ether').toString(),
}

const safeTransaction = await protocolKit.createTransaction({
  transactions: [safeTransactionData],
})

// Sign the transaction if the Safe have several owners
// safeTransaction = await protocolKit1.signTransaction(safeTransaction)
// safeTransaction = await protocolKit2.signTransaction(safeTransaction)

// Execute the transaction
await protocolKit.executeTransaction(safeTransaction)
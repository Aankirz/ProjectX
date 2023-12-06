import React from 'react'

import {
    SafeAuthPack,
    SafeAuthConfig,
    SafeAuthInitOptions,
  } from '@safe-global/auth-kit'
  
  const safeAuthInitOptions = {
    enableLogging: true,
    showWidgetButton: false,
    chainConfig: {
      chainId: '0x1',
      rpcTarget: `${rpcUrl}`
    },
  }
  
 
  const safeAuthPack = new SafeAuthPack(safeAuthConfig)
  await safeAuthPack.init(safeAuthInitOptions)

  const authKitSignData = await safeAuthPack.signIn()

  const signIn = async()=>{
    const authKitSignData = await safeAuthPack.signIn()
    authKitSignData
  }

  const signOut=async()=>{
    await safeAuthPack.signOut()
  }
export default function SafeAuth() {
  return (
    <div>SafeAuth</div>
  )
}

'use client'

import { initAbstractGlobalWallet } from '@abstract-foundation/agw-web'
import { PrivyProvider, type PrivyProviderProps } from '@privy-io/react-auth'
import React from 'react'
import { abstract } from 'viem/chains'

type Props = {
  children: React.ReactNode
}

export default function PrivyProviderWrapper({ children }: Props) {
  const appId = process.env.NEXT_PUBLIC_PRIVY_APP_ID || ''

  const config: PrivyProviderProps['config'] = {
    loginMethods: ['twitter'],
  }
  initAbstractGlobalWallet({
    chain: abstract,
  })

  return (
    <PrivyProvider appId={appId} config={config}>
      {children}
    </PrivyProvider>
  )
}



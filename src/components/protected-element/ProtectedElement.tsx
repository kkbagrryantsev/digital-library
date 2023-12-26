import React from 'react'
import useBoundStore from '~/store/useBoundStore.ts'

interface ProtectedElementProps {
  policy: 'authenticatedOnly' | 'unauthenticatedOnly'
  children?: React.ReactNode
}

export const ProtectedElement: React.FC<ProtectedElementProps> = ({ policy, children }) => {
  const isAuthenticated = useBoundStore(state => state.isAuthenticated)

  switch (policy) {
    case 'authenticatedOnly':
      if (isAuthenticated.data === false) {
        return null
      }
      break
    case 'unauthenticatedOnly':
      if (isAuthenticated.data === true) {
        return null
      }
      break
    default:
      throw TypeError('Given value does not exist in policy prop options')
  }

  return <>{children}</>
}

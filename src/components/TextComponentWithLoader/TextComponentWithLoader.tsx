import React from 'react'
import LoadingState from '~/enums/LoadingState.ts'

interface TextComponentWithLoaderProps {
  loadingState: LoadingState
  onLoading: React.ReactNode
  onErrorLoading: React.ReactNode
  children: React.ReactNode
}

const TextComponentWithLoader: React.FC<TextComponentWithLoaderProps> = (props: TextComponentWithLoaderProps) => {
  const { loadingState, onLoading, onErrorLoading, children } = props
  switch (loadingState) {
    case LoadingState.LOADING:
      return onLoading
    case LoadingState.LOADED:
      return children
    case LoadingState.ERROR:
      return onErrorLoading
    default: { /* Empty */ }
  }
}

export default React.memo(TextComponentWithLoader)

import React from 'react'
import LoadingState from '~/enums/LoadingState.ts'

interface ComponentWithLoaderProps {
  loadingState: LoadingState
  onLoading: React.ReactNode
  onErrorLoading: React.ReactNode
  children: React.ReactNode
}

export const withLoader = (wrappedComponent: React.FC, loadingComponent: React.FC, errorComponent: React.FC) => {
  return ({ loading }: { loading: LoadingState }) => {
    switch (loading) {
      case LoadingState.LOADING:
        return loadingComponent
      case LoadingState.LOADED:
        return wrappedComponent
      case LoadingState.ERROR:
        return errorComponent
      default: {
        return errorComponent
      }
    }
  }
}

const ComponentWithLoader: React.FC<ComponentWithLoaderProps> = (
  props: ComponentWithLoaderProps
) => {
  const { loadingState, onLoading, onErrorLoading, children } = props
  switch (loadingState) {
    case LoadingState.LOADING:
      return onLoading
    case LoadingState.LOADED:
      return children
    case LoadingState.ERROR:
      return onErrorLoading
    default: {
      /* Empty */
    }
  }
}

export default React.memo(ComponentWithLoader)

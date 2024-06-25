import React from 'react'
import { useRandomSymbolAnimation } from '~/hooks/useRandomSymbolAnimation.tsx'
import classNames from 'classnames'

interface LoaderProps extends React.BaseHTMLAttributes<HTMLDivElement> {}

export const Loader: React.FC<LoaderProps> = ({ className, ...otherProps }) => {
  const loadingText = useRandomSymbolAnimation('К', { textCase: 'upper' })
  return (
    <div className={classNames('animate-spin', className)} {...otherProps}>
      {loadingText}
    </div>
  )
}

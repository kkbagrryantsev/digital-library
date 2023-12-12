import React, { createContext, useState } from 'react'
import './PseudoElementShiftAnimationContainer.scss'
import classnames from 'classnames'

interface PseudoElementShiftAnimationContainerProps {
  children: React.ReactNode
}

interface PseudoElementShiftAnimationContainerContext {
  isFocused: boolean
  setIsFocused: React.Dispatch<React.SetStateAction<boolean>>
}

const defaultState: PseudoElementShiftAnimationContainerContext = {
  isFocused: false,
  setIsFocused: () => {}
}

export const PseudoElementShiftAnimationContext =
  createContext<PseudoElementShiftAnimationContainerContext>(defaultState)

const PseudoElementShiftAnimationContainer: React.FC<
PseudoElementShiftAnimationContainerProps
> = ({ children }: PseudoElementShiftAnimationContainerProps) => {
  const [isFocused, setIsFocused] = useState(false)

  return (
    <PseudoElementShiftAnimationContext.Provider value={{ isFocused, setIsFocused }}>
      <div
        className={classnames('bloodyRed', isFocused ? 'focused' : '')}>
        {children}
      </div>
    </PseudoElementShiftAnimationContext.Provider>
  )
}

export default React.memo(PseudoElementShiftAnimationContainer)

import React, { createContext } from 'react'
import './PseudoElementShiftAnimationContainer.scss'
import { nanoid } from 'nanoid'

interface PseudoElementShiftAnimationContainerProps {
  children: React.ReactNode
}

interface PseudoElementShiftAnimationContainerContext {
  id: string | undefined
}

const defaultState: PseudoElementShiftAnimationContainerContext = {
  id: undefined
}

export const PseudoElementShiftAnimationContext =
  createContext<PseudoElementShiftAnimationContainerContext>(defaultState)

// TODO Mind another logic
const PseudoElementShiftAnimationContainer: React.FC<
PseudoElementShiftAnimationContainerProps
> = ({ children }: PseudoElementShiftAnimationContainerProps) => {
  const id = nanoid()

  return (
    <PseudoElementShiftAnimationContext.Provider value={{ id }}>
      <div
        id={`pseudo-element-shift-animation-container-${id}`}
        className={'root'}>
        {children}
      </div>
    </PseudoElementShiftAnimationContext.Provider>
  )
}

export default React.memo(PseudoElementShiftAnimationContainer)

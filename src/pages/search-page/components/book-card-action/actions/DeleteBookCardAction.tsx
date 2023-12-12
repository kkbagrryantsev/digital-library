import React, { useContext } from 'react'
import {
  PseudoElementShiftAnimationContext
} from '~/components/pseudo-element-shift-animation-container/PseudoElementShiftAnimationContainer.tsx'
import BookCardAction from '~/pages/search-page/components/book-card-action/BookCardAction.tsx'

export const DeleteBookCardAction: React.FC = () => {
  const { setIsFocused } = useContext(PseudoElementShiftAnimationContext)

  const handleMouseEnter = (): void => {
    setIsFocused(true)
  }

  const handleMouseLeave = (): void => {
    setIsFocused(false)
  }

  const onClick = (): void => {
    // TODO Add deletion action
  }

  return (
    <BookCardAction
      onClick={onClick}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      sequencenumber={2}
      actiontitlename={'Удалить'}
      actionextrainformation={'эту книгу'}
      className={'bookCardAction_modDanger'}
    />
  )
}

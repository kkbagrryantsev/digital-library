import React, { useContext } from 'react'
import {
  PseudoElementShiftAnimationContext
} from '~/components/pseudo-element-shift-animation-container/PseudoElementShiftAnimationContainer.tsx'
import BookCardAction from '~/pages/search-page/components/book-card-action/BookCardAction.tsx'

const DeleteBookCardAction: React.FC = () => {
  const { id } = useContext(PseudoElementShiftAnimationContext)

  const handleMouseEnter = (): void => {
    const container = document.getElementById(
      `pseudo-element-shift-animation-container-${id}`
    )
    console.log(id)
    if (container !== null) {
      container.classList.add('intendedToDelete')
    }
  }

  const handleMouseLeave = (): void => {
    const container = document.getElementById(
      `pseudo-element-shift-animation-container-${id}`
    )
    if (container !== null) {
      console.log(id)
      container.classList.remove('intendedToDelete')
    }
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

export default React.memo(DeleteBookCardAction)

import React, { useContext } from 'react'
import {
  PseudoElementShiftAnimationContext
} from '~/components/pseudo-element-shift-animation-container/PseudoElementShiftAnimationContainer.tsx'
import BookCardAction from '~/pages/search-page/components/book-card-action/BookCardAction.tsx'
import { apiDeleteBook } from '~/api/ApiCalls.ts'
import axios from 'axios'

export const DeleteBookCardAction: React.FC<{ id: string }> = (props) => {
  const { id } = props

  const { setIsFocused } = useContext(PseudoElementShiftAnimationContext)

  // TODO Implement this in SearchPageSlice for positive rendering
  const deleteBook = async (id: any): Promise<void> => {
    try {
      const response = await apiDeleteBook(id)

      const statusCode = response.status

      if (statusCode === 200) {
        // TODO Add some logic
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        if (error.response !== undefined) {
          const response = error.response
          // TODO Add error handling
          const statusCode = response.status
          console.log(statusCode)
        }
      }
    }
  }

  const handleMouseEnter = (): void => {
    setIsFocused(true)
  }

  const handleMouseLeave = (): void => {
    setIsFocused(false)
  }

  const onClick = (): void => {
    void deleteBook(id)
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

import { type StateCreator } from 'zustand'
import { type Book } from '~/models/Book.ts'
import { getStateWithLoader, type StateWithLoader } from '~/utils/StoreUtils.ts'

export interface BookPageSlice {
  id: string
  book: StateWithLoader<Book>

  updateBook: (book: any) => void
}

export const createBookPageSlice: StateCreator<BookPageSlice> = set => ({
  id: '',
  book: getStateWithLoader(undefined),

  updateBook: (book: any) => {
    set(() => {
      return ({ book })
    })
  }
})

export default createBookPageSlice

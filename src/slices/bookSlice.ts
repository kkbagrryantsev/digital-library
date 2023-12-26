import { type StateCreator } from 'zustand'
import { type Book } from '~/models/Book.ts'
import { apiGetBook } from '~/api/ApiCalls.ts'
import { type WithLoader } from '~/utils/StoreUtils.ts'
import { LoadingState } from '~/enums/LoadingState.ts'
import axios from 'axios'

export interface BookSlice {
  book: WithLoader<Book>

  fetchBook: (id: string) => Promise<void>
}

export const createBookSlice: StateCreator<BookSlice> = set => ({
  book: { loading: LoadingState.LOADING },

  fetchBook: async (id: string) => {
    try {
      set(_state => ({ book: { loading: LoadingState.LOADING } }))

      const response = await apiGetBook(id)

      const data = response.data
      const statusCode = response.status

      set(_state => ({ book: { data, loading: LoadingState.LOADED, statusCode } }))
    } catch (error) {
      if (axios.isAxiosError(error)) {
        if (error.response !== undefined) {
          const statusCode = error.response.status
          set(_state => ({ book: { loading: LoadingState.ERROR, statusCode } }))
        }
      }
    }
  }
})

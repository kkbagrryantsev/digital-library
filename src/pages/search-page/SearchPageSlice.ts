import { type StateCreator } from 'zustand'
import { type WithLoader } from '~/utils/StoreUtils.ts'
import { type Book } from '~/models/Book.ts'
import { LoadingState } from '~/enums/LoadingState.ts'
import { apiSearchBooks } from '~/api/ApiCalls.ts'
import axios from 'axios'

export interface SearchPageSlice {
  searchResults: WithLoader<Book[]>

  searchBooks: (searchQuery: string) => Promise<void>
}

export const createSearchPageSlice: StateCreator<SearchPageSlice> = set => ({
  searchResults: { loading: LoadingState.NOT_STARTED },

  searchBooks: async (searchQuery: string) => {
    try {
      set(_state => ({ searchResults: { loading: LoadingState.LOADING } }))

      const response = await apiSearchBooks(searchQuery)

      const data = response.data
      const statusCode = response.status

      set(_state => ({ searchResults: { data, loading: LoadingState.LOADED, statusCode } }))
    } catch (error) {
      if (axios.isAxiosError(error)) {
        if (error.response !== undefined) {
          const statusCode = error.response.status
          set(_state => ({ searchResults: { loading: LoadingState.ERROR, statusCode } }))
        }
      }
    }
  }
})

export default createSearchPageSlice

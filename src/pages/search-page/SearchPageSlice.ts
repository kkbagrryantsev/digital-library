import { type StateCreator } from 'zustand'
import { type WithLoader } from '~/utils/StoreUtils.ts'
import { type Book } from '~/models/Book.ts'
import { LoadingState } from '~/enums/LoadingState.ts'
import { apiSearchBooks } from '~/api/ApiCalls.ts'
import axios from 'axios'
import { Facet } from '~/enums/Facet.ts'

export interface SearchPageSlice {
  facetSearchText: Map<Facet, string>

  addFacetSearchText: (facet: Facet, searchText: string) => void

  removeFacetSearchText: (facet: Facet) => void

  searchResults: WithLoader<Book[]>

  searchBooks: (
    facets: Array<{ strategy: Facet, searchText: string }>
  ) => Promise<void>
}

export const createSearchPageSlice: StateCreator<SearchPageSlice> = set => ({
  facetSearchText: new Map([[Facet.DATA, '']]),

  addFacetSearchText: (facet, searchText) => {
    set(state => ({
      facetSearchText: new Map(state.facetSearchText.set(facet, searchText))
    }))
  },

  removeFacetSearchText: facet => {
    set(state => {
      const newFacetSearchText = new Map(state.facetSearchText)
      newFacetSearchText.delete(facet)
      return { facetSearchText: newFacetSearchText }
    })
  },

  searchResults: { loading: LoadingState.NOT_STARTED },

  searchBooks: async (facets: Array<{ strategy: Facet, searchText: string }>) => {
    try {
      set(_state => ({ searchResults: { loading: LoadingState.LOADING } }))

      const response = await apiSearchBooks(facets)

      const data = response.data
      const statusCode = response.status

      set(_state => ({
        searchResults: { data, loading: LoadingState.LOADED, statusCode }
      }))
    } catch (error) {
      if (axios.isAxiosError(error)) {
        if (error.response !== undefined) {
          const statusCode = error.response.status
          set(_state => ({
            searchResults: { loading: LoadingState.ERROR, statusCode }
          }))
        } else {
          set(_state => ({
            searchResults: { loading: LoadingState.ERROR }
          }))
        }
      }
    }
  }
})

export default createSearchPageSlice

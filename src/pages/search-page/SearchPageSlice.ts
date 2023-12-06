import { type StateCreator } from 'zustand'

export interface SearchPageSlice {
  searchResults: any[]

  updateSearchResults: (newSearchResults: []) => void
}

export const createSearchPageSlice: StateCreator<SearchPageSlice> = set => ({
  searchResults: [],

  updateSearchResults: newSearchResults => {
    set(() => ({ searchResults: newSearchResults }))
  }
})

export default createSearchPageSlice

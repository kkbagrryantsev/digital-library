import { create } from 'zustand'
import {
  createSearchPageSlice,
  type SearchPageSlice
} from '~/pages/search-page/SearchPageSlice.ts'
import { type BookPageSlice, createBookPageSlice } from '~/pages/book-page/BookPageSlice.ts'

const useBoundStore = create<SearchPageSlice & BookPageSlice>()((...a) => ({
  ...createSearchPageSlice(...a),
  ...createBookPageSlice(...a)
}))

export default useBoundStore

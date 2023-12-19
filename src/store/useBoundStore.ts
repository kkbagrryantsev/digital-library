import { create } from 'zustand'
import {
  createSearchPageSlice,
  type SearchPageSlice
} from '~/pages/search-page/SearchPageSlice.ts'
import { type BookSlice, createBookSlice } from '~/slices/bookSlice.ts'

const useBoundStore = create<SearchPageSlice & BookSlice>()((...a) => ({
  ...createSearchPageSlice(...a),
  ...createBookSlice(...a)
}))

export default useBoundStore

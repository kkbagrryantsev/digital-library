import { create } from 'zustand'
import {
  createSearchPageSlice,
  type SearchPageSlice
} from '~/pages/search-page/SearchPageSlice.ts'
import { type BookSlice, createBookSlice } from '~/slices/bookSlice.ts'
import { type AuthSlice, createAuthSlice } from '~/slices/authSlice.ts'

const useBoundStore = create<SearchPageSlice & BookSlice & AuthSlice>()((...a) => ({
  ...createSearchPageSlice(...a),
  ...createBookSlice(...a),
  ...createAuthSlice(...a)
}))

export default useBoundStore

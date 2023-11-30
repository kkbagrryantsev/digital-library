import { create } from 'zustand'
import {
  createSearchPageSlice,
  type SearchPageSlice
} from '~/pages/search-page/SearchPageSlice.ts'

const useBoundStore = create<SearchPageSlice>()((...a) => ({
  ...createSearchPageSlice(...a)
}))

export default useBoundStore

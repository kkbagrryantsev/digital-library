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
        // TODO Remove debug
        set(_state => ({
          book: {
            data: {
              title: 'Игрок',
              genre: 'Всемирная классика',
              id,
              author: 'Федор Достоевский',
              description:
                '"Достоевским я зачитывался, даже в очень плохих переводах. Позднее я прочитал его по-французски, на французский его переводили русские, их переводы были гораздо лучше испанских. Я думаю, что для любого писателя в мире русские романисты — основа основ..." (Габриэль Гарсиа Маркес) ',
              files: [],
              isbn: '0-31231-321321-313'
            },
            loading: LoadingState.LOADED,
            statusCode: 200
          }
        }))

        if (error.response !== undefined) {
          const statusCode = error.response.status
          set(_state => ({ book: { loading: LoadingState.ERROR, statusCode } }))
        }
      }
    }
  }
})

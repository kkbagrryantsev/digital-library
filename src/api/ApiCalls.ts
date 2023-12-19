import axios, { type AxiosPromise } from 'axios'
import { type Book } from '~/models/Book.ts'

export const apiGetBook = async (id: string): AxiosPromise => {
  return await axios.get(`/book/${id}`, {
    headers: { 'Content-Type': 'application/json' }
  })
}

export const apiSaveBookChanges = async (
  id: string,
  data: Book | Partial<Book>
): AxiosPromise => {
  return await axios.patch(
    `/book/${id}`,
    { data },
    {
      headers: { 'Content-Type': 'application/json' }
    }
  )
}

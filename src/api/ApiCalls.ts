import axios, { type AxiosPromise } from 'axios'
import { type Book } from '~/models/Book.ts'

export const apiGetBook = async (id: string): AxiosPromise => {
  return await axios.get(`/api/book?id=${id}`, {
    headers: { 'Content-Type': 'application/json' }
  })
}

export const apiSaveBookChanges = async (
  id: string,
  data: Book | Partial<Book>
): AxiosPromise => {
  // TODO Fix book name
  return await axios.patch(
    `/api/book?id=${id}`,
    { data },
    {
      headers: { 'Content-Type': 'application/json' }
    }
  )
}

export const apiCheckAuthentication = async (): AxiosPromise => {
  return await axios.get('/api/auth/check', {
    headers: { 'Content-Type': 'application/json' }
  })
}

export const apiSignOut = async (): AxiosPromise => {
  return await axios.post('/api/auth/sign_out', {}, {
    headers: { 'Content-Type': 'application/json' }
  })
}

export const apiSignIn = async (credentials: any): AxiosPromise => {
  return await axios.post('/api/auth/sign_in', { credentials }, {
    headers: { 'Content-Type': 'application/json' }
  })
}

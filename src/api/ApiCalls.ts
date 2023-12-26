import axios, { type AxiosPromise } from 'axios'
import { type Book } from '~/models/Book.ts'

export const apiGetBook = async (id: string): AxiosPromise => {
  return await axios.get(`/api/book?id=${id}`, {
    headers: { 'Content-Type': 'application/json' }
  })
}

export const apiEditBook = async (data: Book): AxiosPromise => {
  return await axios.put(
    '/admin/api/book',
    data,
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
  return await axios.post(
    '/api/auth/sign_out',
    {},
    {
      headers: { 'Content-Type': 'application/json' }
    }
  )
}

export const apiSignIn = async (credentials: any): AxiosPromise => {
  return await axios.post(
    '/login',
    { credentials },
    {
      headers: { 'Content-Type': 'application/json' }
    }
  )
}

export const apiSearchBooks = async (searchQuery: string): AxiosPromise => {
  return await axios.put('/api/book/search', searchQuery, {
    headers: { 'Content-Type': 'application/json' }
  })
}

export const apiDownloadBook = async (id: string): AxiosPromise => {
  return await axios.get(`/api/book/${id}/download`, {
    headers: { 'Content-Type': 'application/json' }
  })
}

export const apiUploadBookFile = async (
  id: string,
  bookFile: any
): AxiosPromise => {
  return await axios.put(
    `/admin/api/book/${id}/upload`,
    bookFile,
    {
      headers: { 'Content-Type': 'multipart/form-data' }
    }
  )
}

export const apiDeleteBookFile = async (id: string): AxiosPromise => {
  return await axios.delete(`/admin/api/book/${id}/file`, {
    headers: { 'Content-Type': 'application/json' }
  })
}

export const apiDeleteBook = async (id: string): AxiosPromise => {
  return await axios.delete(`/admin/api/book/${id}`, {
    headers: { 'Content-Type': 'application/json' }
  })
}

export const apiAddBook = async (data: any): AxiosPromise => {
  return await axios.post('/admin/api/book', data, {
    headers: { 'Content-Type': 'application/json' }
  })
}

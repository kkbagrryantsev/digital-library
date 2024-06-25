import axios, { type AxiosPromise } from 'axios'
import { type Book } from '~/models/Book.ts'
import { type Facet } from '~/enums/Facet.ts'

export const apiGetBook = async (id: string): AxiosPromise => {
  return await axios.get(`/api/book?id=${id}`, {
    headers: { 'Content-Type': 'application/json' }
  })
}

export const apiEditBook = async (data: Book): AxiosPromise => {
  return await axios.put('/admin/api/book', data, {
    headers: { 'Content-Type': 'application/json' },
    withCredentials: true
  })
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
      headers: { 'Content-Type': 'application/json' },
      withCredentials: true
    }
  )
}

export const apiSignIn = async (credentials: any): AxiosPromise => {
  return await axios.post('/api/user/login', credentials, {
    headers: { 'Content-Type': 'application/json' }
  })
}

export const apiSearchBooks = async (
  facets: Array<{ strategy: Facet, searchText: string }>
): AxiosPromise => {
  return await axios.put('/api/book/search', facets, {
    headers: { 'Content-Type': 'application/json' }
  })
}

export const apiDownloadBook = async (id: string): AxiosPromise => {
  return await axios.get(`/api/book/${id}/download`, {
    headers: { 'Content-Type': 'application/octet-stream' },
    responseType: 'blob'
  })
}

export const apiUploadBookFile = async (
  id: string,
  bookFile: any
): AxiosPromise => {
  return await axios.put(`/admin/api/book/${id}/upload`, bookFile, {
    headers: { 'Content-Type': 'multipart/form-data' },
    withCredentials: true
  })
}

export const apiAddBookByFile = async (
  file: any
): AxiosPromise => {
  return await axios.post('/admin/api/book/add', file, {
    headers: { 'Content-Type': 'multipart/form-data' },
    withCredentials: true
  })
}

export const apiDeleteBookFile = async (id: string): AxiosPromise => {
  return await axios.delete(`/admin/api/book/${id}/file`, {
    headers: { 'Content-Type': 'application/json' },
    withCredentials: true
  })
}

export const apiDeleteBook = async (id: string): AxiosPromise => {
  return await axios.delete(`/admin/api/book/${id}`, {
    headers: { 'Content-Type': 'application/json' },
    withCredentials: true
  })
}

export const apiAddBook = async (data: any): AxiosPromise => {
  return await axios.post('/admin/api/book', data, {
    headers: { 'Content-Type': 'application/json' },
    withCredentials: true
  })
}

export const apiRateBook = async (id: string, score: number): AxiosPromise => {
  return await axios.put(
    `/api/book/rate?id=${id}&score=${score}`,
    {},
    {
      headers: { 'Content-Type': 'application/json' },
      withCredentials: true
    }
  )
}

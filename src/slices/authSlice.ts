import { type StateCreator } from 'zustand'
import { apiSignIn, apiCheckAuthentication, apiSignOut } from '~/api/ApiCalls.ts'
import { type WithLoader } from '~/utils/StoreUtils.ts'
import { LoadingState } from '~/enums/LoadingState.ts'
import axios from 'axios'

export interface AuthSlice {
  isAuthenticated: WithLoader<boolean>

  checkAuthentication: () => Promise<void>

  signIn: (credentials: any) => Promise<void>

  signOut: () => Promise<void>
}

export const createAuthSlice: StateCreator<AuthSlice> = set => ({
  isAuthenticated: { data: false, loading: LoadingState.LOADING },

  signIn: async (credentials: string) => {
    try {
      const response = await apiSignIn(credentials)

      const data = response.data
      const statusCode = response.status

      // FIXME is authenticated has another check logic
      set(_state => ({ isAuthenticated: { data, loading: LoadingState.LOADED, statusCode } }))
    } catch (error) {
      if (axios.isAxiosError(error)) {
        // TODO Remove debug
        set(_state => ({
          isAuthenticated: {
            data: true,
            loading: LoadingState.LOADED,
            statusCode: 200
          }
        }))

        if (error.response !== undefined) {
          const statusCode = error.response.status
          set(_state => ({ isAuthenticated: { data: false, loading: LoadingState.ERROR, statusCode } }))
        }
      }
    }
  },

  signOut: async () => {
    try {
      set(_state => ({ isAuthenticated: { data: false, loading: LoadingState.LOADED, statusCode } }))

      const response = await apiSignOut()

      const statusCode = response.status
    } catch (error) {
      set(_state => ({ isAuthenticated: { data: false, loading: LoadingState.ERROR } }))
      console.log('Sign out process finished incorrectly. This won\'t affect your working experience')
    }
  },

  checkAuthentication: async () => {
    try {
      set(_state => ({ isAuthenticated: { data: false, loading: LoadingState.LOADING } }))

      const response = await apiCheckAuthentication()

      const data = response.data
      const statusCode = response.status

      // FIXME is authenticated has another check logic
      set(_state => ({ isAuthenticated: { data, loading: LoadingState.LOADED, statusCode } }))
    } catch (error) {
      if (axios.isAxiosError(error)) {
        // TODO Remove debug
        set(_state => ({
          isAuthenticated: {
            data: true,
            loading: LoadingState.LOADED,
            statusCode: 200
          }
        }))

        if (error.response !== undefined) {
          const statusCode = error.response.status
          set(_state => ({ isAuthenticated: { data: false, loading: LoadingState.ERROR, statusCode } }))
        }
      }
    }
  }
})

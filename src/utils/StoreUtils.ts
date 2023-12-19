import type { LoadingState } from '~/enums/LoadingState'
import { type HttpStatusCode } from 'axios'

export interface WithLoader<T> {
  data?: T | undefined | null
  loading: LoadingState
  statusCode?: HttpStatusCode | number
}

//
// const C = ({ a, b, c }) => {
//   const { m1, m2 } = B({ a })
//
//   return Object.freeze({
//     m1: () => {
//       m1(a, b, c)
//     }
//   })
// }
//
// Object.freeze({})

// interface WithLoader {
//   dsf: asf
//   sdf: sdf
// }

// interface S extends WithLoader {
//
// }

// export const getStateWithLoader = (state: any): StateWithLoader<any> => {
//   // return { state, asd }
//   return new StateWithLoader(state, LoadingState.LOADING)
// }
//
// export const getStateWithError = (): StateWithLoader<any> => {
//   return new StateWithLoader(undefined, LoadingState.ERROR)
// }

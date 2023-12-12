import LoadingState from '~/enums/LoadingState'

export class StateWithLoader<T> {
  readonly value: T
  readonly loading: LoadingState

  constructor (val: T, loading: LoadingState) {
    this.value = val
    this.loading = loading
  }
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

export const getStateWithLoader = (state: any): StateWithLoader<any> => {
  // return { state, asd }
  return new StateWithLoader(state, LoadingState.LOADING)
}

import LoadingState from '~/enums/LoadingState'

export class StateWithLoader<T> {
  readonly value: T
  readonly loading: LoadingState
  constructor (val: T, loading: LoadingState) {
    this.value = val
    this.loading = loading
  }
}

export const getStateWithLoader = (state: any): StateWithLoader<any> => {
  return new StateWithLoader(state, LoadingState.LOADING)
}

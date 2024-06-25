import React, { useContext } from 'react'
import classNames from 'classnames'
// eslint-disable-next-line import/no-extraneous-dependencies
import { nanoid } from 'nanoid'

import { AutoCompleteContext } from '~/components/auto-complete/AutoComplete'
import { LoadingState } from '~/enums/LoadingState.ts'

interface AutoCompleteMenuProps {
  loader: React.ReactNode
  renderItem: (item: any) => React.ReactNode
  errorMessage?: string
  noResultMessage?: string
}

export const AutoCompleteMenu: React.FC<AutoCompleteMenuProps> = ({
  loader,
  renderItem,
  errorMessage,
  noResultMessage
}: AutoCompleteMenuProps) => {
  const {
    setInput,
    setIsActive,
    getItemValue,
    selectItem,
    isActive,
    results: { data, loading }
  } = useContext(AutoCompleteContext)

  let content: React.ReactNode = null

  const onSelect = (item: any): void => {
    console.log(getItemValue(item))
    setInput(getItemValue(item))
    setIsActive(false)
    selectItem(item)
  }

  switch (loading) {
    case LoadingState.LOADING:
      if (data === undefined) {
        return null
      }
      content = loader
      break
    case LoadingState.LOADED:
      if (data?.length === 0) {
        content = (
          <p className={'roboto-regular text-center text-md text-gray-400'}>
            {noResultMessage ?? 'No Result'}
          </p>
        )
      } else {
        content = data?.map(item => (
          <li
            onClick={() => {
              onSelect(item)
            }}
            key={nanoid()}>
            {renderItem(item)}
          </li>
        ))
      }
      break
    case LoadingState.ERROR:
      content = (
        <h5 className={'text-md'} style={{ textAlign: 'center', color: '#BABABA' }}>
          {errorMessage ?? 'Error'}
        </h5>
      )
      break
    default:
      return null
  }

  return (
    <div className={classNames('autocomBox', isActive ? 'active' : '')}>
      {content}
    </div>
  )
}

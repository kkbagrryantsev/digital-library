import React, { useContext, useRef } from 'react'
import debounce from 'lodash.debounce'

import { AutoCompleteContext } from '~/components/auto-complete/AutoComplete'
import { LoadingState } from '~/enums/LoadingState'

interface AutoCompleteInputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  fetchItems: (query: string) => Promise<any[]>
  delay?: number
}

export const AutoCompleteInput: React.FC<AutoCompleteInputProps> = ({
  placeholder,
  fetchItems,
  delay,
  className,
  value: _ignore,
  ...otherProps
}: AutoCompleteInputProps) => {
  const {
    getItemValue,
    selectItem,
    input,
    setInput,
    setIsActive,
    results,
    setResults
  } = useContext(AutoCompleteContext)
  const debouncedSearchRef = useRef(null)

  const searchDebounced = useRef(
    debounce(async (query: string) => {
      await fetchItems(query)
        .then(items => {
          setResults({ data: items, loading: LoadingState.LOADED })
        })
        .catch(() => {
          setResults({ data: [], loading: LoadingState.ERROR })
        })
    }, delay)
  ).current

  const onInput = async (event: React.BaseSyntheticEvent): Promise<void> => {
    const newInput = event.target.value

    setInput(newInput)

    // eslint-disable-next-line @typescript-eslint/strict-boolean-expressions
    if (newInput) {
      setResults({ data: [], loading: LoadingState.LOADING })
      await searchDebounced(newInput)
      setIsActive(true)
    } else {
      setResults({ data: [], loading: LoadingState.LOADED })
    }
  }

  const onFocus = (): void => {
    setIsActive(true)
  }

  const onSubmit: React.FormEventHandler = (event: React.FormEvent) => {
    event.preventDefault()
    if (results.data == null) {
      return
    }
    if (results.data?.length === 0) {
      return
    }
    const [head] = results.data

    if (!getItemValue(head).includes(input)) {
      setResults({ data: [], loading: LoadingState.ERROR })
      return
    }

    setIsActive(false)
    setInput(getItemValue(head))
    selectItem(head)
  }

  return (
    <div ref={debouncedSearchRef} className={'searchInput'}>
      <input
        className={className}
        value={input}
        onInput={onInput}
        onFocus={onFocus}
        onSubmit={onSubmit}
        placeholder={placeholder}
        {...otherProps}
      />
    </div>
  )
}

AutoCompleteInput.defaultProps = {
  placeholder: '',
  delay: 300
}

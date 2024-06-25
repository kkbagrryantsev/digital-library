import React, { createContext, useRef, useState } from 'react'
import { useClickAway } from 'react-use'

import './styles/AutoComplete.scss'
import { type WithLoader } from '~/utils/StoreUtils.ts'
import { LoadingState } from '~/enums/LoadingState.ts'

interface IAutoCompleteContext {
  getItemValue: (item: any) => string
  selectItem: (item: any) => void
  isActive: boolean
  setIsActive: React.Dispatch<React.SetStateAction<boolean>>
  results: WithLoader<any[]>
  setResults: React.Dispatch<React.SetStateAction<WithLoader<any[]>>>
  input: string
  setInput: React.Dispatch<React.SetStateAction<string>>
}

const defaultState: IAutoCompleteContext = {
  getItemValue: () => '',
  selectItem: () => null,
  isActive: false,
  setIsActive: () => null,
  results: { data: [], loading: LoadingState.LOADING },
  setResults: () => null,
  input: '',
  setInput: () => null
}

export const AutoCompleteContext =
  createContext<IAutoCompleteContext>(defaultState)

interface AutoCompleteProps {
  defaultValue?: string | null
  // TODO Fix onSelect with custom EventHandler
  onSelect?: (item: any) => void
  children: React.ReactNode
  getItemValue: (item: any) => string
}

export const AutoComplete: React.FC<AutoCompleteProps> = ({
  children,
  defaultValue,
  onSelect,
  getItemValue
}: AutoCompleteProps) => {
  const ref = useRef(null)

  useClickAway(ref, () => {
    setIsActive(false)
  })
  const [isActive, setIsActive] = useState(false)
  const [input, setInput] = useState(defaultValue ?? '')
  const [results, setResults] = useState<WithLoader<any>>({
    data: undefined,
    loading: LoadingState.LOADING
  })

  const selectItem = (item: any): void => {
    onSelect?.(item)
  }

  // TODO Check styling
  return (
    <AutoCompleteContext.Provider
      value={{
        getItemValue,
        selectItem,
        isActive,
        setIsActive,
        results,
        setResults,
        input,
        setInput
      }}>
      <div ref={ref} className={'wrapper'}>
        <>{children}</>
      </div>
    </AutoCompleteContext.Provider>
  )
}

AutoComplete.defaultProps = {
  defaultValue: '',
  onSelect: () => null
}

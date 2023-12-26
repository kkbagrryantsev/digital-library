import React, {
  type BaseSyntheticEvent,
  type KeyboardEvent,
  useState
} from 'react'
import { AutoResizableTextArea } from '~/components/auto-resizable-textarea/AutoResizableTextArea.tsx'
import useBoundStore from '~/store/useBoundStore.ts'

export const SearchBar: React.FC = () => {
  const [searchText, setSearchText] = useState<string>('')
  const searchBooks = useBoundStore(state => state.searchBooks)

  const onInput = (event: BaseSyntheticEvent): void => {
    setSearchText(event.target.value)
  }

  const handleSubmit = (searchQuery: string): void => {
    void searchBooks(searchQuery)
  }

  const onKeyDown = (event: KeyboardEvent): void => {
    if (event.key === 'Enter' && !event.shiftKey) {
      event.preventDefault()

      handleSubmit(searchText)
    }
  }

  return (
    <div className={'searchBar'}>
      <h3>Хочу книгу...</h3>
      <AutoResizableTextArea
        onInput={onInput}
        onKeyDown={onKeyDown}
        value={searchText}
        className={'searchBar__textarea'}
        placeholder={
          'про русскую душу, тоску и отчаяние'
        }></AutoResizableTextArea>
    </div>
  )
}

import React from 'react'
import { AutoResizableTextArea } from '~/components/auto-resizable-textarea/AutoResizableTextArea.tsx'

const SearchBar: React.FC = () => {
  return (
    <div className={'searchBar'}>
      <h3>Хочу книгу...</h3>
      <AutoResizableTextArea
        className={'searchBar__textarea'}
        placeholder={'про русскую душу, тоску и отчаяние'}
      ></AutoResizableTextArea>
    </div>
  )
}

export default React.memo(SearchBar)

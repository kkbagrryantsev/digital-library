import React from 'react'

const SearchBar: React.FC = () => {
  const onTextAreaInput = (): void => {
    const textarea = document.getElementById('searchBar__textarea')
    if (textarea !== null) {
      textarea.style.height = 'auto'
      textarea.style.height = `${textarea.scrollHeight}px`
    }
  }

  return (
    <div className={'searchBar'}>
      <h3>Хочу книгу...</h3>
      <textarea
        onInput={onTextAreaInput}
        id={'searchBar__textarea'}
        placeholder={'про русскую душу, тоску и отчаяние'}
        className={'searchBar__textarea'}></textarea>
    </div>
  )
}

export default React.memo(SearchBar)

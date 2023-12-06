import React from 'react'
import './styles/SearchPageContent.scss'
import './components/search-bar/SearchBar.scss'
import SearchBar from '~/pages/search-page/components/search-bar/SearchBar.tsx'
import BookCard from '~/pages/search-page/components/book-card/BookCard.tsx'

const SearchPageContent: React.FC = () => {
  return (
    <main className={'searchPageContent'}>
      <SearchBar />
       <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
        <BookCard
          title={'Игрок'}
          author={'Федор Достоевский'}
          genre={'Классическая проза'}
          description={
            '"Достоевским я зачитывался, даже в очень плохих переводах. Позднее я прочитал его по-французски, на французский его переводили русские, их переводы были гораздо лучше испанских. Я думаю, что для любого писателя в мире русские романисты — основа основ..." (Габриэль Гарсиа Маркес)'
          }
          sequenceNumber={1}
        /><BookCard
        title={'Игрок'}
        author={'Федор Достоевский'}
        genre={'Классическая проза'}
        description={
          '"Достоевским я зачитывался, даже в очень плохих переводах. Позднее я прочитал его по-французски, на французский его переводили русские, их переводы были гораздо лучше испанских. Я думаю, что для любого писателя в мире русские романисты — основа основ..." (Габриэль Гарсиа Маркес)'
        }
        sequenceNumber={2}
       />
       </div>

    </main>
  )
}

export default React.memo(SearchPageContent)

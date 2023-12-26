import React from 'react'
import './styles/SearchPageContent.scss'
import './components/search-bar/SearchBar.scss'
import { SearchBar } from '~/pages/search-page/components/search-bar/SearchBar.tsx'
import { BookCard } from '~/pages/search-page/components/book-card/BookCard.tsx'
import { ProtectedElement } from '~/components/protected-element/ProtectedElement.tsx'
import useBoundStore from '~/store/useBoundStore.ts'
import { type Book } from '~/models/Book.ts'
import { nanoid } from '@reduxjs/toolkit'
import { ComponentWithLoader } from '~/components/component-with-loader/ComponentWithLoader.tsx'

const SearchPageContent: React.FC = () => {
  const { data, loading } = useBoundStore(state => state.searchResults)

  // TODO Add independent loader to not mess with BookCard
  return (
    <main className={'searchPageContent'}>
      <SearchBar />
      <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
        <ProtectedElement policy={'authenticatedOnly'}>
          <a href={'/book/new'} className={'addBookButton'}>
            + Добавить книгу
          </a>
        </ProtectedElement>
        <ComponentWithLoader
          loading={loading}
          onLoading={
            <BookCard
              id={'loading'}
              title={'Загружаются 👍'}
              author={'Михаил Красников'}
              genre={'Загрузочная литература'}
              description={
                'Я нахожусь здесь, чтобы ясно дать понять пользователю, что сейчас идёт загрузка и надо просто подождать. Иногда пару минут ждать приходится. Вот такие дела'
              }
              sequenceNumber={1}
              hideActions={true}
            />
          }
          onError={
            <BookCard
              id={'error'}
              title={'А не загрузились 🥀🥺'}
              author={'Михаил Красников'}
              genre={'Ошибковая литература'}
              description={
                'Я нахожусь здесь, чтобы ясно дать понять пользователю, что наступил крах поиска книг. Ждать бессмысленно, попробуйте ещё раз. Вот так вот вышло'
              }
              sequenceNumber={404}
              hideActions={true}
            />
          }>
          {data?.map((bookData: Book, index: number) => (
            <BookCard
              id={bookData.id}
              title={bookData.title}
              author={bookData.author}
              genre={bookData.genre}
              description={bookData.description}
              sequenceNumber={index + 1}
              key={nanoid()}
            />
          ))}
        </ComponentWithLoader>

        {/* <BookCard */}
        {/*  id={1} */}
        {/*  title={'Игрок'} */}
        {/*  author={'Федор Достоевский'} */}
        {/*  genre={'Классическая проза'} */}
        {/*  description={ */}
        {/*    '"Достоевским я зачитывался, даже в очень плохих переводах. Позднее я прочитал его по-французски, на французский его переводили русские, их переводы были гораздо лучше испанских. Я думаю, что для любого писателя в мире русские романисты — основа основ..." (Габриэль Гарсиа Маркес)' */}
        {/*  } */}
        {/*  sequenceNumber={1} */}
        {/* /> */}
        {/* <BookCard */}
        {/*  id={2} */}
        {/*  title={'Игрок'} */}
        {/*  author={'Федор Достоевский'} */}
        {/*  genre={'Классическая проза'} */}
        {/*  description={ */}
        {/*    '"Достоевским я зачитывался, даже в очень плохих переводах. Позднее я прочитал его по-французски, на французский его переводили русские, их переводы были гораздо лучше испанских. Я думаю, что для любого писателя в мире русские романисты — основа основ..." (Габриэль Гарсиа Маркес)' */}
        {/*  } */}
        {/*  sequenceNumber={2} */}
        {/* /> */}
      </div>
    </main>
  )
}

export default React.memo(SearchPageContent)

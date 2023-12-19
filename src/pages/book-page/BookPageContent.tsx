import React from 'react'
import './styles/BookPageContent.scss'
import useBoundStore from '~/store/useBoundStore.ts'
import { ComponentWithLoader } from '~/components/component-with-loader/ComponentWithLoader.tsx'
import classnames from 'classnames'
import { useRandomSymbolAnimation } from '~/components/text-loading-animation/TextLoadingAnimation.tsx'

const BookTitle: React.FC = () => {
  const { data, loading, statusCode } = useBoundStore(state => state.book)
  //
  const title = data?.title
  return (
    <ComponentWithLoader
      loading={loading}
      onLoading={<h1 className={'title'}>ЗАГРУЗКА</h1>}
      onError={
        <h1 className={classnames('text_modDanger', 'title')}>
          ОШИБКА {statusCode}
        </h1>
      }>
      <h1 className={'title'}>{title?.toUpperCase()}</h1>
    </ComponentWithLoader>
  )
}

const BookGenre: React.FC = () => {
  const { loading, data } = useBoundStore(state => state.book)

  const genre = data?.genre
  return (
    <ComponentWithLoader
      loading={loading}
      onLoading={
        <h4 className={'genre'}>
          {useRandomSymbolAnimation('Всемирная литература', { num: false })}
        </h4>
      }
      onError={
        <h4 className={classnames('text_modDanger', 'genre')}>
          {useRandomSymbolAnimation('Не удалось загрузить', { num: false })}
        </h4>
      }>
      <h4 className={'genre'}>{genre}</h4>
    </ComponentWithLoader>
  )
}

const BookAuthor: React.FC = () => {
  const { loading, data } = useBoundStore(state => state.book)

  const author = data?.author
  return (
    <ComponentWithLoader
      loading={loading}
      onLoading={
        <h4 className={'author'}>
          {useRandomSymbolAnimation('ИВАН ИВАНОВ', {
            num: false,
            textCase: 'upper'
          })}
        </h4>
      }
      onError={
        <h4 className={classnames('text_modDanger', 'author')}>
          {useRandomSymbolAnimation('ОШИБКА ЗАГРУЗКИ', {
            num: false,
            textCase: 'upper'
          })}
        </h4>
      }>
      <h4 className={'author'}>{author?.toUpperCase()}</h4>
    </ComponentWithLoader>
  )
}

const BookDescription: React.FC = () => {
  const { loading, data } = useBoundStore(state => state.book)

  const description = data?.description
  return (
    <ComponentWithLoader
      loading={loading}
      onLoading={
        <h4 className={'description'}>
          {useRandomSymbolAnimation(
            'С хорошей книгой время течет медленнее, словно заключенное в заколдованный мир приключений и глубоких размышлений. Это путешествие сквозь страницы, где каждая буква словно магия, призывающая вас в удивительный мир слов и историй. Давайте вместе откроем дверь в неизведанные миры и насладимся волшебством слов.',
            { num: false }
          )}
        </h4>
      }
      onError={
        <h4 className={classnames('text_modDanger', 'description')}>
          {useRandomSymbolAnimation(
            'Не удалось загрузить страницу. Попробуйте перезагрузить её',
            { num: false }
          )}
        </h4>
      }>
      <h4 className={'description'}>{description}</h4>
    </ComponentWithLoader>
  )
}

const BookISBN: React.FC = () => {
  const { loading, data } = useBoundStore(state => state.book)

  const isbn = data?.isbn
  return (
    <ComponentWithLoader
      loading={loading}
      onLoading={
        <h4 className={'isbn'}>
          ISBN{' '}
          {useRandomSymbolAnimation('978-5-669-43490-0', {
            alpha: false,
            special: false
          })}
        </h4>
      }
      onError={
        <h4 className={classnames('text_modDanger', 'isbn')}>
          ISBN{' '}
          {useRandomSymbolAnimation('000-0-000-00000-0', {
            alpha: false,
            special: false
          })}
        </h4>
      }>
      <h4 className={'isbn'}>{isbn?.toUpperCase()}</h4>
    </ComponentWithLoader>
  )
}

export const BookPageContent: React.FC = () => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  // const { loading } = useBoundStore(state => state.book)
  // noinspection SpellCheckingInspection
  // const { title, description, author, genre, isbn } = {
  //   title: 'Игрок',
  //   author: 'Федор Достоевский',
  //   genre: 'Классическая проза',
  //   description:
  //     '"Достоевским я зачитывался, даже в очень плохих переводах. Позднее я прочитал его по-французски, на французский его переводили русские, их переводы были гораздо лучше испанских. Я думаю, что для любого писателя в мире русские романисты — основа основ..." (Габриэль Гарсиа Маркес)',
  //   isbn: '978-5-699-43490-9 '
  // }

  return (
    <main className={'bookPageContent'}>
      <div className={'book'}>
        <div style={{ display: 'flex', flexDirection: 'row', gap: '40px' }}>
          <BookAuthor />
          <BookGenre />
        </div>
        <BookTitle />
        <BookDescription />
        <div className={'actions'}></div>
        <BookISBN />
      </div>
    </main>
  )
}

import React from 'react'
import './styles/BookPageContent.scss'
import TextLoadingAnimation from '~/components/text-loading-animation/TextLoadingAnimation.tsx'
import useBoundStore from '~/store/useBoundStore.ts'
import TextComponentWithLoader from '~/components/TextComponentWithLoader/TextComponentWithLoader.tsx'
import classnames from 'classnames'

const BookPageContent: React.FC = () => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { loading } = useBoundStore(state => state.book)
  // noinspection SpellCheckingInspection
  const { title, description, author, genre, isbn } = {
    title: 'Игрок',
    author: 'Федор Достоевский',
    genre: 'Классическая проза',
    description:
      '"Достоевским я зачитывался, даже в очень плохих переводах. Позднее я прочитал его по-французски, на французский его переводили русские, их переводы были гораздо лучше испанских. Я думаю, что для любого писателя в мире русские романисты — основа основ..." (Габриэль Гарсиа Маркес)',
    isbn: '978-5-699-43490-9 '
  }

  const authorWithLoader = (): React.ReactNode => (
    <TextComponentWithLoader
      loadingState={loading}
      onLoading={
        <TextLoadingAnimation
          num={false}
          textcase={'upper'}
          className={'author'}
          placeholdertext={'ИВАН ИВАНОВ'}
        />
      }
      onErrorLoading={
        <TextLoadingAnimation
          num={false}
          textcase={'upper'}
          className={classnames('author', 'text_modDanger')}
          placeholdertext={'ОШИБКА ЗАГРУЗКИ'}
        />
      }>
      <h4 className={'author'}>{author.toUpperCase()}</h4>
    </TextComponentWithLoader>
  )

  const genreWithLoader = (): React.ReactNode => (
    <TextComponentWithLoader
      loadingState={loading}
      onLoading={
        <TextLoadingAnimation
          num={false}
          className={'genre'}
          placeholdertext={'Всемирная литература'}
        />
      }
      onErrorLoading={
        <TextLoadingAnimation
          num={false}
          className={classnames('genre', 'text_modDanger')}
          placeholdertext={'Не удалось загрузить'}
        />
      }>
      <h4 className={'genre'}>{genre}</h4>
    </TextComponentWithLoader>
  )

  const titleWithLoader = (): React.ReactNode => (
    <TextComponentWithLoader
      loadingState={loading}
      onLoading={
        <TextLoadingAnimation
          num={false}
          textcase={'upper'}
          className={'title'}
          placeholdertext={'ЗАГРУЗКА'}
        />
      }
      onErrorLoading={
        <TextLoadingAnimation
          num={false}
          textcase={'upper'}
          className={classnames('title', 'text_modDanger')}
          placeholdertext={'ОШИБКА'}
        />
      }>
      <h1 className={'title'}>{title.toUpperCase()}</h1>
    </TextComponentWithLoader>
  )

  const descriptionWithLoader = (): React.ReactNode => (
    <TextComponentWithLoader
      loadingState={loading}
      onLoading={
        <TextLoadingAnimation
          num={false}
          className={'description'}
          placeholdertext={
            'С хорошей книгой время течет медленнее, словно заключенное в заколдованный мир волнующих приключений и глубоких размышлений. Это путешествие сквозь страницы, где каждая буква словно магия, призывающая вас в удивительный мир слов и историй. Давайте вместе откроем дверь в неизведанные миры и насладимся волшебством слов.'
          }
        />
      }
      onErrorLoading={
        <TextLoadingAnimation
          num={false}
          className={classnames('description', 'text_modDanger')}
          placeholdertext={
            'Не удалось загрузить страницу. Попробуйте перезагрузить её'
          }
        />
      }>
      <h4 className={'description'}>{description}</h4>
    </TextComponentWithLoader>
  )

  const isbnWithLoader = (): React.ReactNode => (
    <TextComponentWithLoader
      loadingState={loading}
      onLoading={
        <TextLoadingAnimation
          alpha={false}
          className={'isbn'}
          placeholdertext={'ISBN 978-5-669-43490-0'}
        />
      }
      onErrorLoading={
        <TextLoadingAnimation
          alpha={false}
          className={classnames('isbn', 'text_modDanger')}
          placeholdertext={'000-0-000-00000-0'}
        />
      }>
      <h4 className={'isbn'}>ISBN {isbn}</h4>
    </TextComponentWithLoader>
  )

  return (
    <main className={'bookPageContent'}>
      <div className={'book'}>
        <div style={{ display: 'flex', flexDirection: 'row', gap: '40px' }}>
          {authorWithLoader()}
          {genreWithLoader()}
        </div>
        {titleWithLoader()}
        {descriptionWithLoader()}
        <div className={'actions'}></div>
        {isbnWithLoader()}
      </div>
    </main>
  )
}

export default React.memo(BookPageContent)

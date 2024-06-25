import React from 'react'
import './styles/BookPageContent.scss'
import useBoundStore from '~/store/useBoundStore.ts'
import { ComponentWithLoader } from '~/components/component-with-loader/ComponentWithLoader.tsx'
import classnames from 'classnames'
import { useRandomSymbolAnimation } from '~/hooks/useRandomSymbolAnimation.tsx'
import { BookAction } from '~/shared/book-action/BookAction.tsx'
import { ProtectedElement } from '~/components/protected-element/ProtectedElement.tsx'
import { useLocation } from 'wouter'
import { apiDeleteBook, apiDownloadBook, apiRateBook } from '~/api/ApiCalls.ts'
import axios from 'axios'
import { downloadFile } from '~/utils/BrowserUtils.ts'
import { LoadingState } from '~/enums/LoadingState.ts'
import { ScoreRangeBar } from '~/pages/book-page/components/ScoreRangeBar.tsx'

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
      <h4 className={'isbn'}>ISBN {isbn?.toUpperCase() ?? 'XXX-X-XXXXX-XXX-X'}</h4>
    </ComponentWithLoader>
  )
}

const BookScore: React.FC = () => {
  const { loading, data } = useBoundStore(state => state.book)

  const onScoreChange = (newScore: number): void => {
    if (data?.id !== undefined) {
      apiRateBook(data?.id, newScore).then(
        _onfulfilled => {},
        _onrejected => {}
      )
    }
  }

  const score = data?.score
  return (
    <ComponentWithLoader
      loading={loading}
      onLoading={
        <h4 className={'score'}>
          Оценка{' '}
          {useRandomSymbolAnimation('4.8', {
            alpha: false,
            special: false
          })}
        </h4>
      }
      onError={
        <h4 className={classnames('text_modDanger', 'score')}>
          Оценка{' '}
          {useRandomSymbolAnimation('4.8', {
            alpha: false,
            special: false
          })}
        </h4>
      }>
      <div className={'flex flex-row items-center gap-1'}>
        <h4 className={'score'}>Оценка:</h4>
        <ScoreRangeBar defaultScore={score ?? 0} maxScore={5} onScoreChange={onScoreChange} />
        <h4 className={'score'}>{score?.toPrecision(2)}</h4>
      </div>
    </ComponentWithLoader>
  )
}

const DownloadBookActionButton: React.FC = () => {
  const { data } = useBoundStore(state => state.book)

  const id = data?.id
  const filename = data?.title
  // const files = data?.files

  const downloadBook = async (id: any, filename: any): Promise<void> => {
    try {
      const response = await apiDownloadBook(id)

      const statusCode = response.status

      const data = response.data

      if (statusCode === 200) {
        downloadFile(data, `${filename}.fb2`)
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        if (error.response !== undefined) {
          const response = error.response
          // TODO Add error handling
          const statusCode = response.status
          console.log(statusCode)
        }
      }
    }
  }

  const onClick = (): void => {
    void downloadBook(id, filename)
  }

  return (
    <BookAction onClick={onClick} title={'Скачать'} info={'FB2'}></BookAction>
  )
}

const EditBookActionButton: React.FC = () => {
  const [location, navigate] = useLocation()

  const onClick = (): void => {
    navigate(location + '/edit')
  }

  return (
    <BookAction
      onClick={onClick}
      title={'Редактировать'}
      info={'внести изменения'}></BookAction>
  )
}

const DeleteBookActionButton: React.FC = () => {
  const { data } = useBoundStore(state => state.book)

  const [location, navigate] = useLocation()

  const id = data?.id

  const deleteBook = async (id: any): Promise<void> => {
    try {
      const response = await apiDeleteBook(id)

      const statusCode = response.status

      if (statusCode === 200) {
        navigate(location.replace('/book', '/search'))
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        if (error.response !== undefined) {
          const response = error.response
          // TODO Add error handling
          const statusCode = response.status
          console.log(statusCode)
        }
      }
    }
  }

  const onClick = (): void => {
    void deleteBook(id)
  }

  return (
    <BookAction
      onClick={onClick}
      title={'Удалить'}
      titleClassName={'text_modDanger'}
      dotsClassName={'text_modDanger'}
      info={'действие необратимо'}
      infoClassName={'text_modDanger'}
    />
  )
}

const BookActions: React.FC = () => {
  const { loading } = useBoundStore(state => state.book)

  if (loading !== LoadingState.LOADED) {
    return null
  }

  return (
    <div className={'actions'}>
      <DownloadBookActionButton />
      <ProtectedElement policy={'authenticatedOnly'}>
        <EditBookActionButton />
      </ProtectedElement>
      <ProtectedElement policy={'authenticatedOnly'}>
        <DeleteBookActionButton />
      </ProtectedElement>
    </div>
  )
}

export const BookPageContent: React.FC = () => {
  return (
    <main className={'bookPageContent'}>
      <div className={'book'}>
        <div style={{ display: 'flex', flexDirection: 'row', gap: '40px' }}>
          <BookAuthor />
          <BookGenre />
        </div>
        <BookTitle />
        <BookDescription />
        <BookActions />
        <div className={'flex flex-row gap-4 items-center text-gray-400'}>
          <BookISBN />
          •
          <BookScore />
        </div>
      </div>
      {/* <CoverCanvas */}
      {/*  words={['пэнис', 'пэнис']} */}
      {/* /> */}
    </main>
  )
}

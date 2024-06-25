import React, { type ChangeEvent, type MouseEvent, useEffect, useRef } from 'react'
import './styles/SearchPageContent.scss'
import './components/search-bar/SearchBar.scss'
import { BookCard } from '~/pages/search-page/components/book-card/BookCard.tsx'
import { ProtectedElement } from '~/components/protected-element/ProtectedElement.tsx'
import useBoundStore from '~/store/useBoundStore.ts'
import { type Book } from '~/models/Book.ts'
import { nanoid } from '@reduxjs/toolkit'
import { ComponentWithLoader } from '~/components/component-with-loader/ComponentWithLoader.tsx'
import { Loader } from '~/components/loader/Loader.tsx'
import { BookSearchForm } from '~/pages/search-page/components/book-search/BookSearchForm.tsx'
import { LoadingState } from '~/enums/LoadingState.ts'
import { MdAdd } from 'react-icons/md'
import { FiFile } from 'react-icons/fi'
import { apiAddBookByFile } from '~/api/ApiCalls.ts'
import axios from 'axios'
import { useLocation } from 'wouter'

const UploadBookFileActionButton: React.FC = () => {
  const inputRef = useRef<HTMLInputElement>(null)

  const [location, navigate] = useLocation()

  const uploadBookFile = async (file: any): Promise<void> => {
    try {
      const convertedBookFile = new FormData()
      convertedBookFile.append('file', file)

      const response = await apiAddBookByFile(convertedBookFile)

      const statusCode = response.status

      const data = response.data

      if (statusCode === 200) {
        navigate(location.replace('/search', `/book/${data?.id}`))
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

  const onClick = (event: MouseEvent): void => {
    event.preventDefault()

    if (inputRef.current !== null) {
      inputRef.current.click()
    }
  }

  const onChange = (event: ChangeEvent<HTMLInputElement>): void => {
    if (event.target.files != null) {
      const file = event.target.files[0]
      void uploadBookFile(file)
    }
  }

  return (
    <>
      <input
        onChange={onChange}
        type={'file'}
        style={{ display: 'none' }}
        ref={inputRef}
      />
      <ProtectedElement policy={'authenticatedOnly'}>
        <button
          onClick={onClick}
          className={
            'addBookButton z-50 fixed right-5 bottom-28 p-5 aspect-square w-20 text-4xl text-center'
          }>
          <FiFile />
        </button>
      </ProtectedElement>
    </>
  )
}

const SearchPageContent: React.FC = () => {
  const { data, loading } = useBoundStore(state => state.searchResults)

  const scrollRef = useRef(null)

  const handleScroll = (ref: any): void => {
    ref.current.scrollIntoView({ behavior: 'smooth' })
  }

  useEffect(() => {
    if (loading !== LoadingState.NOT_STARTED) {
      handleScroll(scrollRef)
    }
  }, [loading])

  // TODO Add independent loader to not mess with BookCard
  return (
    <main className={'searchPageContent'}>
      <UploadBookFileActionButton/>
      <ProtectedElement policy={'authenticatedOnly'}>
        <a
          href={'/book/new'}
          className={
            'addBookButton fixed z-50 right-5 bottom-5 p-5 aspect-square w-20 text-4xl text-center'
          }>
          <MdAdd />
        </a>
      </ProtectedElement>
      <BookSearchForm />
      {/* <SearchBar /> */}
      <div
        ref={scrollRef}
        className={`flex flex-col gap-2 pt-10 items-center ${
          loading !== LoadingState.NOT_STARTED && 'mb-10'
        } ${loading === LoadingState.LOADED && 'min-h-[100vh]'}`}>
        <ComponentWithLoader
          loading={loading}
          onLoading={
            <Loader />
            // <div className={'w-min animate-spin text-6xl text-red-500'}>K</div>
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
          {data?.length === 0 && (
            <h3 className={'roboto-regular text-gray-500'}>
              Ничего не найдено
            </h3>
          )}
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
        {/* id={1} */}
        {/* title={'Игрок'} */}
        {/* author={'Федор Достоевский'} */}
        {/* genre={'Классическая проза'} */}
        {/* description={ */}
        {/*   '"Достоевским я зачитывался, даже в очень плохих переводах. Позднее я прочитал его по-французски, на французский его переводили русские, их переводы были гораздо лучше испанских. Я думаю, что для любого писателя в мире русские романисты — основа основ..." (Габриэль Гарсиа Маркес)' */}
        {/* } */}
        {/* sequenceNumber={1} */}
        {/* /> */}
        {/* <BookCard */}
        {/* id={2} */}
        {/* title={'Игрок'} */}
        {/* author={'Федор Достоевский'} */}
        {/* genre={'Классическая проза'} */}
        {/* description={ */}
        {/*   '"Достоевским я зачитывался, даже в очень плохих переводах. Позднее я прочитал его по-французски, на французский его переводили русские, их переводы были гораздо лучше испанских. Я думаю, что для любого писателя в мире русские романисты — основа основ..." (Габриэль Гарсиа Маркес)' */}
        {/* } */}
        {/* sequenceNumber={2} */}
        {/* /> */}
      </div>
    </main>
  )
}

export default React.memo(SearchPageContent)

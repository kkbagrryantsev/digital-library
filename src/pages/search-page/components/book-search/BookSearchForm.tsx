import React from 'react'
import { FormProvider, type SubmitHandler, useForm } from 'react-hook-form'
import bookShape from '~/assets/svg/plain_book.svg'
import barcode from '~/assets/svg/barcode.svg'
import { AutoComplete } from '~/components/auto-complete/AutoComplete.tsx'
import { AutoCompleteInput } from '~/components/auto-complete/AutoCompleteInput.tsx'
import { AutoCompleteMenu } from '~/components/auto-complete/AutoCompleteMenu.tsx'
import { Genres } from '~/enums/Genre.ts'
import { Loader } from '~/components/loader/Loader.tsx'
import useBoundStore from '~/store/useBoundStore.ts'
import { Facet } from '~/enums/Facet.ts'
import { AutoResizableTextAreaFormInput } from '~/components/auto-resizable-textarea/AutoResizableTextAreaFormInput.tsx'

interface Facets {
  title: string
  author: string
  genre: string
  data: string
  score: number
  isbn: string
  description: string
}

export const BookSearchForm: React.FC = () => {
  const methods = useForm<Facets>()

  const searchBooks = useBoundStore(state => state.searchBooks)

  async function findMatchingGenres (query: string): Promise<string[]> {
    return await new Promise((resolve, reject) => {
      try {
        const results = Genres.filter(value =>
          value.toLowerCase().includes(query.toLowerCase())
        )
        resolve(results)
      } catch (error) {
        reject(error)
      }
    })
  }

  const onSubmit: SubmitHandler<Facets> = (data): void => {
    const facets: Array<{ strategy: Facet, searchText: string }> = []

    function mapFacetNameToFacetEnum (facetName: string): Facet {
      switch (facetName) {
        case 'data':
          return Facet.DATA
        case 'score':
          return Facet.SCORE
        case 'title':
          return Facet.TITLE
        case 'author':
          return Facet.AUTHOR
        case 'genre':
          return Facet.GENRE
        case 'description':
          return Facet.DESCRIPTION
        case 'isbn':
          return Facet.ISBN
        default:
          throw Error('Facet type doesn\'t exist')
      }
    }

    for (const [facet, value] of Object.entries(data)) {
      if (value !== undefined && value !== null && value !== '') {
        facets.push({ strategy: mapFacetNameToFacetEnum(facet), searchText: value })
      }
    }
    console.log(facets)
    void searchBooks(facets)
  }

  return (
    <FormProvider {...methods}>
      <form
        onSubmit={methods.handleSubmit(onSubmit)}
        className={'flex flex-col items-center gap-4'}>
        <div className={'flex justify-center relative w-[800px] min-w-[800px]'}>
          {/* eslint-disable-next-line react/no-unknown-property */}
          <img
            src={bookShape}
            draggable={false}
            className={'pointer-events-none w-[800px]'}
            alt={'Shape of a book'}
          />
          <AutoResizableTextAreaFormInput
            name={'data'}
            className={'absolute w-80 left-6 top-60 roboto-bold text-md'}
            maxLength={180}
            placeholder={'Содержание...'}
          />
          {/* <AutoResizableTextArea */}
          {/*  className={'absolute w-80 left-6 top-60 roboto-bold text-md'} */}
          {/*  maxLength={180} */}
          {/*  placeholder={'Содержание...'} */}
          {/*  onInput={(event: BaseSyntheticEvent) => { */}
          {/*    addFacetSearchText(Facet.DATA, event.target.value) */}
          {/*  }} */}
          {/*  {...register('data')} */}
          {/* /> */}
          <AutoResizableTextAreaFormInput
            name={'description'}
            className={'absolute w-80 left-6 top-8 roboto-bold text-md'}
            maxLength={140}
            placeholder={'Описание...'}
          />
          <img
            className={'absolute left-[7.5rem] bottom-14 bg-white p-1'}
            src={barcode}
            alt={'ISBN template barcode'}
          />
          {/* <div className={'absolute left-28 bottom-28'}> */}
          {/*  <Barcode width={0.75} format={'MSI'} height={30} displayValue={false} value={isbn} /> */}
          {/* </div> */}
          <input
            maxLength={17}
            className={
              'absolute w-40 max-w-40 left-24 bottom-8 text-center roboto-bold text-md focus:outline-none'
            }
            inputMode={'numeric'}
            placeholder={'ISBN'}
            {...methods.register('isbn')}
          />
          {/* Genre dropdown */}
          <div className={'absolute right-4 top-8'}>
            <AutoComplete
              getItemValue={item => {
                return item
              }}
              onSelect={item => {
                methods.setValue('genre', item)
              }}>
              <AutoCompleteInput
                className={'roboto-bold text-md w-80'}
                placeholder={'Жанр'}
                fetchItems={findMatchingGenres}
              />
              <AutoCompleteMenu
                loader={
                  <div className={'w-full h-10 flex justify-center'}>
                    <Loader />
                  </div>
                }
                renderItem={item => item}
                errorMessage={'Ошибка'}
                noResultMessage={'Жанр отсутствует'}
              />
            </AutoComplete>
          </div>
          <AutoResizableTextAreaFormInput
            name={'author'}
            className={
              'absolute w-64 max-w-72 right-14 bottom-8 text-center roboto-bold text-md'
            }
            maxLength={45}
            placeholder={'Автор'}
          />
          <AutoResizableTextAreaFormInput
            name={'title'}
            className={
              'absolute max-w-80 right-6 bottom-28 text-center roboto-black text-4xl'
            }
            maxLength={70}
            placeholder={'Название'}
          />
        </div>
        <button
          type={'submit'}
          className={'w-48 pt-2 pb-2 -bottom-16 addBookButton'}>
          <h4 className={'w-full text-gray-700'}>Найти</h4>
        </button>
      </form>
    </FormProvider>
  )
}

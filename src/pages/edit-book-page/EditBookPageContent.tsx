import React, { useEffect, useState } from 'react'
import './styles/EditBookPageContent.scss'
import {
  type FieldValues,
  FormProvider, type SubmitHandler,
  useForm,
  useFormContext
} from 'react-hook-form'
import useBoundStore from '~/store/useBoundStore.ts'
import { ComponentWithLoader } from '~/components/component-with-loader/ComponentWithLoader.tsx'
import classnames from 'classnames'
import { useRandomSymbolAnimation } from '~/components/text-loading-animation/TextLoadingAnimation.tsx'
import AutoResizableTextArea from '~/components/auto-resizable-textarea/AutoResizableTextArea.tsx'
import { LoadingState } from '~/enums/LoadingState.ts'

interface BookDataInputFieldProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  name: string
}

const BookDataInputField: React.FC<BookDataInputFieldProps> = props => {
  const {
    name,
    required,
    defaultValue,
    placeholder,
    ...otherProps
  } = props
  const { setValue, watch, register } = useFormContext()
  const [text, setText] = useState<any>(defaultValue ?? '')

  const onInput = (event: React.FormEvent): void => {
    const target = event.target as HTMLTextAreaElement

    setValue(name, target.value)
    setText(target.value)
  }

  let customPlaceholder = placeholder
  if (required !== undefined) {
    customPlaceholder += '*'
  }

  // // TODO Check how to separate contexts
  // useEffect(() => {
  //   // Register the textarea with react-hook-form
  //   register(name)
  // }, [register, name])

  const watchedValue = watch(name)

  return (
    <AutoResizableTextArea
      {...register(name)}
      value={watchedValue ?? text}
      onInput={onInput}
      placeholder={customPlaceholder}
      {...otherProps}
    />
  )
}

const BookTitle: React.FC = () => {
  const { data, loading, statusCode } = useBoundStore(state => state.book)

  const title = data?.title

  return (
    <ComponentWithLoader
      loading={loading}
      onLoading={<h1 className={'title'}>Загрузка</h1>}
      onError={
        <h1 className={classnames('text_modDanger', 'title')}>
          Ошибка {statusCode}
        </h1>
      }>
      <BookDataInputField
        name={'title'}
        defaultValue={title ?? ''}
        className={'title'}
        placeholder={'Название'}
        required={true}
      />
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
      <BookDataInputField
        name={'genre'}
        defaultValue={genre ?? ''}
        className={'genre'}
        placeholder={'Жанр'}
        required
      />
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
          {useRandomSymbolAnimation('Иван Иванов', {
            num: false
          })}
        </h4>
      }
      onError={
        <h4 className={classnames('text_modDanger', 'author')}>
          {useRandomSymbolAnimation('Ошибка загрузки', {
            num: false
          })}
        </h4>
      }>
      <BookDataInputField
        name={'author'}
        defaultValue={author ?? ''}
        className={'author'}
        placeholder={'Автор'}
        required
      />
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
      <BookDataInputField
        name={'description'}
        defaultValue={description ?? ''}
        className={'description'}
        placeholder={'Описание (максимум N символов)'}
      />
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
      <BookDataInputField
        name={'isbn'}
        defaultValue={isbn ?? ''}
        className={'isbn'}
        placeholder={'ISBN'}
        required
      />
    </ComponentWithLoader>
  )
}

export const EditBookPageContent: React.FC = () => {
  const { loading, data } = useBoundStore(state => state.book)

  const methods = useForm()

  useEffect(() => {
    if (loading === LoadingState.LOADED) {
      methods.setValue('title', data?.title ?? '')
      methods.setValue('description', data?.description ?? '')
      methods.setValue('genre', data?.genre ?? '')
      methods.setValue('author', data?.author ?? '')
      methods.setValue('isbn', data?.isbn ?? '')
    }
  }, [loading, data, methods.setValue])

  const onSubmit: SubmitHandler<FieldValues> = (data: FieldValues): void => {
    console.log(data)
  }

  return (
    // TODO Fix code duplication (BookPage)
    <main className={'editBookPageContent'}>
      <FormProvider {...methods}>
        {/* eslint-disable-next-line @typescript-eslint/no-misused-promises */}
        <form className={'book'} onSubmit={methods.handleSubmit(onSubmit)}>
          <div style={{ display: 'flex', flexDirection: 'row', gap: '40px' }}>
            <BookAuthor />
            <BookGenre />
          </div>
          <BookTitle />
          <BookDescription />
          <div className={'actions'}></div>
          <BookISBN />
          <button type={'submit'}>Save</button>
        </form>
      </FormProvider>
      {/* eslint-disable-next-line @typescript-eslint/no-misused-promises */}
    </main>
  )
}

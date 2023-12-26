import React, {
  type ChangeEvent,
  type MouseEvent,
  useEffect,
  useRef,
  useState
} from 'react'
import './styles/EditBookPageContent.scss'
import {
  type FieldValues,
  FormProvider,
  type SubmitHandler,
  useForm,
  useFormContext
} from 'react-hook-form'
import useBoundStore from '~/store/useBoundStore.ts'
import { ComponentWithLoader } from '~/components/component-with-loader/ComponentWithLoader.tsx'
import classnames from 'classnames'
import { useRandomSymbolAnimation } from '~/components/text-loading-animation/TextLoadingAnimation.tsx'
import AutoResizableTextArea from '~/components/auto-resizable-textarea/AutoResizableTextArea.tsx'
import { LoadingState } from '~/enums/LoadingState.ts'
import { BookAction } from '~/shared/book-action/BookAction.tsx'
import {
  apiDeleteBook,
  apiDeleteBookFile,
  apiDownloadBook,
  apiEditBook,
  apiUploadBookFile
} from '~/api/ApiCalls.ts'
import axios from 'axios'
import { downloadFile } from '~/utils/BrowserUtils.ts'
// TODO Remove redux
import { nanoid } from '@reduxjs/toolkit'
import { useLocation } from 'wouter'

interface BookDataInputFieldProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  name: string
}

const BookDataInputField: React.FC<BookDataInputFieldProps> = props => {
  const { name, required, defaultValue, placeholder, ...otherProps } = props
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

const AddBookFileActionButton: React.FC = () => {
  const { data } = useBoundStore(state => state.book)
  const fetchBook = useBoundStore(state => state.fetchBook)

  const id = data?.id

  const inputRef = useRef<HTMLInputElement>(null)

  const uploadBookFile = async (id: any, file: any): Promise<void> => {
    try {
      if (id == null) {
        return
      }

      const convertedBookFile = new FormData()
      convertedBookFile.append('file', file)

      const response = await apiUploadBookFile(id, convertedBookFile)

      const statusCode = response.status

      if (statusCode === 200) {
        console.log(data)
        void fetchBook(id)
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
      void uploadBookFile(id, file)
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
      <BookAction
        onClick={onClick}
        title={'Загрузить новый файл'}
        info={'прикрепить'}
      />
    </>
  )
}

const ExistingFileBookButton: React.FC<{ filename: string }> = (props: {
  filename: string
}) => {
  const { filename } = props

  const { data } = useBoundStore(state => state.book)

  const id = data?.id

  const downloadBook = async (id: any, filename: any): Promise<void> => {
    try {
      const response = await apiDownloadBook(id)

      const statusCode = response.status

      const data = response.data

      if (statusCode === 200) {
        downloadFile(data, `${filename}`)
        // navigate(location.replace('/book', '/search'))
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

  const deleteBookFile = async (id: any): Promise<void> => {
    try {
      const response = await apiDeleteBookFile(id)

      const statusCode = response.status

      if (statusCode === 200) {
        // TODO Implement this action in store to add positive rendering
        window.location.reload()
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

  const onTitleClick = (): void => {
    void downloadBook(id, filename)
  }

  const onInfoClick = (): void => {
    void deleteBookFile(id)
  }

  return (
    <BookAction
      title={filename}
      onTitleClick={onTitleClick}
      info={'удалить'}
      infoClassName={'text_modDanger'}
      onInfoClick={onInfoClick}
    />
  )
}

const ExistingBookFiles: React.FC = () => {
  const { data } = useBoundStore(state => state.book)

  const files = data?.files

  return (
    <>
      {files?.map(filename => (
        <ExistingFileBookButton filename={filename} key={nanoid()} />
      ))}
    </>
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
      type={'button'}
      onClick={onClick}
      title={'Удалить'}
      titleClassName={'text_modDanger'}
      dotsClassName={'text_modDanger'}
      info={'действие необратимо'}
      infoClassName={'text_modDanger'}
    />
  )
}

const SaveChangesActionButton: React.FC<{ handleSubmit: any }> = props => {
  const { handleSubmit } = props
  const [saveState, setSaveState] = useState<string>('')
  const { loading } = useBoundStore(state => state.book)

  const editBook = async (data: any): Promise<void> => {
    try {
      setSaveState('сохраняется, подождите')

      const response = await apiEditBook(data)

      const statusCode = response.status

      if (statusCode === 200) {
        setSaveState('сохранено')
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        if (error.response !== undefined) {
          const response = error.response
          const statusCode = response.status
          setSaveState(`не удалось сохранить (${statusCode})`)
        }
      }
    }
  }

  const onSubmit: SubmitHandler<FieldValues> = (data: FieldValues): void => {
    void editBook(data)
  }

  if (loading !== LoadingState.LOADED) {
    return null
  }

  return (
    <BookAction
      type={'button'}
      onClick={handleSubmit(onSubmit)}
      title={'Сохранить изменения'}
      info={saveState}
      infoClassName={'text_modDisabled'}
    />
  )
}

const EditBookActions: React.FC = () => {
  const { loading } = useBoundStore(state => state.book)

  if (loading !== LoadingState.LOADED) {
    return null
  }

  return (
    <div className={'actions'}>
      <AddBookFileActionButton />
      <ExistingBookFiles />
      <DeleteBookActionButton />
    </div>
  )
}

export const EditBookPageContent: React.FC = () => {
  const { loading, data } = useBoundStore(state => state.book)

  const methods = useForm()

  useEffect(() => {
    if (loading === LoadingState.LOADED) {
      methods.setValue('id', data?.id ?? '')
      methods.setValue('title', data?.title ?? '')
      methods.setValue('author', data?.author ?? '')
      methods.setValue('genre', data?.genre ?? '')
      methods.setValue('description', data?.description ?? '')
      methods.setValue('isbn', data?.isbn ?? '')
    }
  }, [loading, data, methods.setValue])

  // const onSubmit: SubmitHandler<FieldValues> = (data: FieldValues): void => {
  //   console.log(data)
  // }

  return (
    // TODO Fix code duplication (BookPage)
    <main className={'editBookPageContent'}>
      <FormProvider {...methods}>
        {/* eslint-disable-next-line @typescript-eslint/no-misused-promises */}
        <form className={'book'}>
          <div style={{ display: 'flex', flexDirection: 'row', gap: '40px' }}>
            <BookAuthor />
            <BookGenre />
          </div>
          <BookTitle />
          <BookDescription />
          <EditBookActions/>
          <BookISBN />
          <SaveChangesActionButton handleSubmit={methods.handleSubmit} />
        </form>
      </FormProvider>
      {/* eslint-disable-next-line @typescript-eslint/no-misused-promises */}
    </main>
  )
}

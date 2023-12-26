import React, { useState } from 'react'
import './styles/NewBookPageContent.scss'
import {
  type FieldValues,
  FormProvider,
  type SubmitHandler,
  useForm,
  useFormContext
} from 'react-hook-form'
import AutoResizableTextArea from '~/components/auto-resizable-textarea/AutoResizableTextArea.tsx'

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
  return (
    <BookDataInputField
      name={'title'}
      defaultValue={''}
      className={'title'}
      placeholder={'Название'}
      required={true}
    />
  )
}

const BookGenre: React.FC = () => {
  return (
    <BookDataInputField
      name={'genre'}
      defaultValue={''}
      className={'genre'}
      placeholder={'Жанр'}
      required
    />
  )
}

const BookAuthor: React.FC = () => {
  return (
    <BookDataInputField
      name={'author'}
      defaultValue={''}
      className={'author'}
      placeholder={'Автор'}
      required
    />
  )
}

const BookDescription: React.FC = () => {
  return (
    <BookDataInputField
      name={'description'}
      defaultValue={''}
      className={'description'}
      placeholder={'Описание (максимум N символов)'}
    />
  )
}

const BookISBN: React.FC = () => {
  return (
      <BookDataInputField
        name={'isbn'}
        defaultValue={''}
        className={'isbn'}
        placeholder={'ISBN'}
        required
      />
  )
}

export const NewBookPageContent: React.FC = () => {
  const methods = useForm()

  const onSubmit: SubmitHandler<FieldValues> = (data: FieldValues): void => {
    console.log(data)
  }

  return (
    // TODO Fix code duplication (BookPage)
    <main className={'newBookPageContent'}>
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

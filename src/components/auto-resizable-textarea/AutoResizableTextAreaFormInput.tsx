import React, { useState } from 'react'
import { useFormContext } from 'react-hook-form'
import { AutoResizableTextArea } from '~/components/auto-resizable-textarea/AutoResizableTextArea.tsx'

interface AutoResizableTextAreaFormInputProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  name: string
}

export const AutoResizableTextAreaFormInput: React.FC<
AutoResizableTextAreaFormInputProps
> = props => {
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

import React, { forwardRef, useEffect, useRef } from 'react'
import classnames from 'classnames'

import './AutoResizableTextArea.scss'

export const AutoResizableTextArea: React.ForwardRefRenderFunction<
HTMLTextAreaElement,
React.TextareaHTMLAttributes<HTMLTextAreaElement>
// eslint-disable-next-line react/prop-types
> = ({ onInput, className, rows = 1, ...otherProps }, _forwardedRef) => {
  const ref = useRef<HTMLTextAreaElement>(null)

  useEffect(() => {
    if (ref.current != null) {
      ref.current.style.height = 'auto'
      ref.current.style.height = `${ref.current.scrollHeight}px`
    }
  }, [ref])

  const handleInput = (event: React.FormEvent<HTMLTextAreaElement>): void => {
    const target = event.target as HTMLTextAreaElement
    target.style.height = 'auto'
    target.style.height = `${target.scrollHeight}px`

    onInput?.(event)
  }

  return (
    <textarea
      className={classnames('autoResizableTextArea', className)}
      ref={ref}
      rows={rows}
      onInput={handleInput}
      {...otherProps}
    />
  )
}

export default forwardRef(AutoResizableTextArea)

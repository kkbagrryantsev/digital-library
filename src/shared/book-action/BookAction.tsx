// noinspection SpellCheckingInspection

import React, { type MouseEvent, type MouseEventHandler, useEffect, useRef, useState } from 'react'
import './styles/BookAction.scss'
import classnames from 'classnames'

interface BookActionProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  title: string
  info?: string
  titleClassName?: string
  onTitleClick?: MouseEventHandler
  infoClassName?: string
  onInfoClick?: MouseEventHandler
  dotsClassName?: string
}

export const BookAction: React.FC<BookActionProps> = props => {
  const { title, onTitleClick, titleClassName, infoClassName, info, onInfoClick, dotsClassName, ...otherProps } = props

  const titleRef = useRef<HTMLHeadingElement>(null)
  const dotsRef = useRef<HTMLSpanElement>(null)
  const infoRef = useRef<HTMLHeadingElement>(null)
  const buttonRef = useRef<HTMLButtonElement>(null)
  const hiddenDotRef = useRef<HTMLSpanElement>(null)

  const [dotWidth, setDotWidth] = useState<number>(0)

  useEffect(() => {
    if (hiddenDotRef.current !== null) {
      setDotWidth(hiddenDotRef.current.clientWidth)
    }
    if (
      buttonRef.current !== null &&
      titleRef.current !== null &&
      infoRef.current !== null &&
      dotsRef.current !== null &&
      dotWidth > 0
    ) {
      const buttonElement = buttonRef.current
      const titleElement = titleRef.current
      const infoElement = infoRef.current
      const dotsElement = dotsRef.current

      const updateDots = (): void => {
        const availableSpace =
          buttonElement.clientWidth -
          titleElement.clientWidth -
          infoElement.clientWidth

        const numDots = Math.floor(availableSpace / dotWidth) // Adjust the number based on your font size
        dotsElement.textContent = '.'.repeat(numDots)
      }

      // Update dots on window resize
      window.addEventListener('resize', updateDots)

      // Initial update
      updateDots()

      // Cleanup the event listener on component unmount
      return () => {
        window.removeEventListener('resize', updateDots)
      }
    }
  }, [titleRef, dotsRef, infoRef, buttonRef, dotWidth, title, info])

  const onTitleClickHandler = (event: MouseEvent): void => {
    if (onTitleClick != null) {
      event.stopPropagation()
      onTitleClick(event)
    }
  }

  const onInfoClickHandler = (event: MouseEvent): void => {
    if (onInfoClick != null) {
      event.stopPropagation()
      onInfoClick(event)
    }
  }

  return (
    <button className={'bookAction'} ref={buttonRef} {...otherProps}>
      <h4
        onClick={onTitleClickHandler}
        ref={titleRef}
        className={classnames('bookAction__title', titleClassName)}>
        {title}
      </h4>
      <span
        ref={dotsRef}
        className={classnames('bookAction__dots', dotsClassName)}
      />
      <h4
        onClick={onInfoClickHandler}
        ref={infoRef}
        className={classnames('bookAction__info', infoClassName)}>
        {info}
      </h4>
      <span className="hiddenDot" ref={hiddenDotRef}>
        .
      </span>
    </button>
  )
}

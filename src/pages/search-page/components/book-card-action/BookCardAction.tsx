import React from 'react'
import classnames from 'classnames'
import './BookCardAction.scss'

// noinspection SpellCheckingInspection
interface BookCardActionProps
  extends React.DetailedHTMLProps<
  React.HTMLAttributes<HTMLHeadingElement>,
  HTMLHeadingElement
  > {
  sequencenumber: number
  actiontitlename: string | React.ReactNode
  actionextrainformation: string | React.ReactNode
}

const BookCardAction: React.FC<BookCardActionProps> = (
  props: BookCardActionProps
) => {
  // noinspection SpellCheckingInspection
  const { onClick, sequencenumber, actiontitlename, actionextrainformation, className: customClassName, ...otherProps } =
    props

  const onClickHandler = (event: React.MouseEvent<HTMLHeadingElement, MouseEvent>): void => {
    event.stopPropagation()
    onClick?.(event)
  }

  return (
    <h5 onClick={onClickHandler} className={classnames('bookCardAction', customClassName)} {...otherProps} >
      <sup>{sequencenumber}</sup> <b>{actiontitlename}</b>{' '}
      {actionextrainformation}
    </h5>
  )
}

export default React.memo(BookCardAction)

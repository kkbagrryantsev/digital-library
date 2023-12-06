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
  const { sequencenumber, actiontitlename, actionextrainformation, className: customClassName } =
    props

  return (
    <h5 className={classnames('bookCardAction', customClassName)} {...props} >
      <sup>{sequencenumber}</sup> <b>{actiontitlename}</b>{' '}
      {actionextrainformation}
    </h5>
  )
}

export default React.memo(BookCardAction)

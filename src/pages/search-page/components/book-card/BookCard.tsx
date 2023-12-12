import React from 'react'
import './styles/BookCard.scss'
import classnames from 'classnames'
import PseudoElementShiftAnimationContainer from '~/components/pseudo-element-shift-animation-container/PseudoElementShiftAnimationContainer.tsx'
import { DeleteBookCardAction } from '~/pages/search-page/components/book-card-action/actions/DeleteBookCardAction.tsx'
import DownloadBookCard from '~/pages/search-page/components/book-card-action/actions/DownloadBookCard.tsx'

interface BookCardProps {
  author: string
  title: string
  description: string
  genre: string
  sequenceNumber: number
}

const BookCard: React.FC<BookCardProps> = ({
  author,
  title,
  description,
  genre,
  sequenceNumber
}: BookCardProps) => {
  const openBookPage = (): void => {
    // TODO Redirect to book page
  }

  return (
    <PseudoElementShiftAnimationContainer>
      <div className={'bookCard'}>
        <header className={'bookCardHeader'}>
          <div className={'bookCardHeader__credentials'}>
            <h4>{author}</h4>
            <h3 onClick={openBookPage} className={'clickable'}>
              {title}
            </h3>
          </div>
          <h5>{genre}</h5>
        </header>
        <div className={'bookCardContent'}>
          <h5>{description}</h5>
          <div
            className={classnames(
              'bookCardContent__divider',
              'bookCardContent__divider_modShort'
            )}
          />
          <div className={'bookCard__actions'}>
            {/* TODO Fix actions */}
            <DownloadBookCard />
            <DeleteBookCardAction />
          </div>
          <h4>{sequenceNumber}</h4>
          <div
            className={classnames(
              'bookCardContent__divider',
              'bookCardContent__divider_modThick'
            )}></div>
        </div>
      </div>
    </PseudoElementShiftAnimationContainer>
  )
}

export default React.memo(BookCard)

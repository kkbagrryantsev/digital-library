import React from 'react'
import './styles/BookCard.scss'
import classnames from 'classnames'
import PseudoElementShiftAnimationContainer from '~/components/pseudo-element-shift-animation-container/PseudoElementShiftAnimationContainer.tsx'
import { DeleteBookCardAction } from '~/pages/search-page/components/book-card-action/actions/DeleteBookCardAction.tsx'
import DownloadBookCard from '~/pages/search-page/components/book-card-action/actions/DownloadBookCard.tsx'
import { useLocation } from 'wouter'

interface BookCardProps {
  id: string
  author: string
  title: string
  description: string
  genre: string
  sequenceNumber: number
  hideActions?: boolean
}

export const BookCard: React.FC<BookCardProps> = ({
  id,
  author,
  title,
  description,
  genre,
  sequenceNumber,
  hideActions
}: BookCardProps) => {
  const [location, setLocation] = useLocation()

  const openBookPage = (): void => {
    const otherRoute = location.replace('/search', `/book/${id}`)
    setLocation(otherRoute)
  }

  return (
    <PseudoElementShiftAnimationContainer>
      <div className={'bookCard'} onClick={openBookPage}>
        <header className={'bookCardHeader'}>
          <div className={'bookCardHeader__credentials'}>
            <h4>{author}</h4>
            <h3>{title}</h3>
          </div>
          <h5>{genre}</h5>
        </header>
        <div className={'bookCardContent'}>
          <h5>{description}</h5>
          { hideActions === true
            ? null
            : <div
              className={classnames(
                'bookCardContent__divider',
                'bookCardContent__divider_modShort'
              )}
            />
          }
          {hideActions === true
            ? null
            : (
            <div className={'bookCard__actions'}>
              {/* TODO Fix actions */}
              <DownloadBookCard id={id} title={title} />
              <DeleteBookCardAction id={id} />
            </div>
              )}
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

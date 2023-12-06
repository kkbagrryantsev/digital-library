import React from 'react'
import BookCardAction from '~/pages/search-page/components/book-card-action/BookCardAction.tsx'

const DownloadBookCardAction: React.FC = () => {
  const onClick = (): void => {
    // TODO Add download action
  }

  return (
    <BookCardAction
      onClick={onClick}
      sequencenumber={1}
      actiontitlename={'Скачать'}
      actionextrainformation={
        <>
          в формате <i>fb2</i>
        </>
      }
    />
  )
}

export default React.memo(DownloadBookCardAction)

import React from 'react'
import BookCardAction from '~/pages/search-page/components/book-card-action/BookCardAction.tsx'
import { apiDownloadBook } from '~/api/ApiCalls.ts'
import { downloadFile } from '~/utils/BrowserUtils.ts'
import axios from 'axios'

const DownloadBookCardAction: React.FC<{ id: string, title: string }> = (props) => {
  const { id, title } = props

  const downloadBook = async (id: any, filename: any): Promise<void> => {
    try {
      const response = await apiDownloadBook(id)

      const statusCode = response.status

      const data = response.data

      if (statusCode === 200) {
        downloadFile(data, `${filename}.fb2`)
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
    void downloadBook(id, title)
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

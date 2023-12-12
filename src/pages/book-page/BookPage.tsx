import React from 'react'
import PageHeader from '~/pages/template/PageHeader.tsx'
import PageContent from '~/pages/template/PageContent.tsx'
import Page from '~/pages/template/Page.tsx'
import AuthForm from '~/pages/template/components/AuthForm.tsx'
import BookPageContent from '~/pages/book-page/BookPageContent.tsx'

interface BookPageProps {
  id: string
}

// noinspection JSUnusedLocalSymbols
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-expect-error
// noinspection JSUnusedLocalSymbols
const BookPage: React.FC<BookPageProps> = ({ id }: BookPageProps) => {
  // const updateBook = useBoundStore(state => state.updateBook)

  // updateBook()

  return <Page>
    <PageHeader>
      {/* //TODO Add return button */}
      <AuthForm />
    </PageHeader>
    <PageContent>
      <BookPageContent/>
    </PageContent>
  </Page>
}

export default React.memo(BookPage)

import React, { useEffect } from 'react'
import PageHeader from '~/pages/template/PageHeader.tsx'
import PageContent from '~/pages/template/PageContent.tsx'
import Page from '~/pages/template/Page.tsx'
import AuthForm from '~/pages/template/components/AuthForm.tsx'
import { BookPageContent } from '~/pages/book-page/BookPageContent.tsx'
import useBoundStore from '~/store/useBoundStore.ts'

interface BookPageProps {
  id: string
}

export const BookPage: React.FC<BookPageProps> = ({ id }: BookPageProps) => {
  const fetchBook = useBoundStore(state => state.fetchBook)

  useEffect(() => {
    void fetchBook(id)
  }, [fetchBook])

  return (
    <Page>
      <PageHeader>
        {/* //TODO Add return button */}
        <AuthForm />
      </PageHeader>
      <PageContent>
        <BookPageContent />
      </PageContent>
    </Page>
  )
}

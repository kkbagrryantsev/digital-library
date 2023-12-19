import React, { useEffect } from 'react'
import Page from '~/pages/template/Page.tsx'
import PageHeader from '~/pages/template/PageHeader.tsx'
import PageContent from '~/pages/template/PageContent.tsx'
import { EditBookPageContent } from '~/pages/edit-book-page/EditBookPageContent.tsx'
import AuthForm from '~/pages/template/components/AuthForm.tsx'
import useBoundStore from '~/store/useBoundStore.ts'

interface EditBookPageProps {
  id: string
}

export const EditBookPage: React.FC<EditBookPageProps> = ({
  id
}: EditBookPageProps) => {
  const fetchBook = useBoundStore(state => state.fetchBook)

  useEffect(() => {
    void fetchBook(id)
  }, [fetchBook])

  return (
    <Page>
      <PageHeader>
        <AuthForm />
      </PageHeader>
      <PageContent>
        <EditBookPageContent />
      </PageContent>
    </Page>
  )
}

import React, { useEffect } from 'react'
import Page from '~/pages/template/Page.tsx'
import PageHeader from '~/pages/template/PageHeader.tsx'
import PageContent from '~/pages/template/PageContent.tsx'
import { EditBookPageContent } from '~/pages/edit-book-page/EditBookPageContent.tsx'
import AuthForm from '~/pages/template/components/auth-form/AuthForm.tsx'
import useBoundStore from '~/store/useBoundStore.ts'
import { GoBack } from '~/components/back-button/GoBack.tsx'

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
        <GoBack to={`/book/${id}`}></GoBack>
        <AuthForm />
      </PageHeader>
      <PageContent>
        <EditBookPageContent />
      </PageContent>
    </Page>
  )
}

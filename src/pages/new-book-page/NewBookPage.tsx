import React from 'react'
import Page from '~/pages/template/Page.tsx'
import PageHeader from '~/pages/template/PageHeader.tsx'
import PageContent from '~/pages/template/PageContent.tsx'
import AuthForm from '~/pages/template/components/auth-form/AuthForm.tsx'
import { GoBack } from '~/components/back-button/GoBack.tsx'
import { NewBookPageContent } from '~/pages/new-book-page/NewBookPageContent.tsx'

export const NewBookPage: React.FC = () => {
  return (
    <Page>
      <PageHeader>
        <GoBack to={'/search'}></GoBack>
        <AuthForm />
      </PageHeader>
      <PageContent>
        <NewBookPageContent />
      </PageContent>
    </Page>
  )
}

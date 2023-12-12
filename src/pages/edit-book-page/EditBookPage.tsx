import React from 'react'
import Page from '~/pages/template/Page.tsx'
import PageHeader from '~/pages/template/PageHeader.tsx'
import PageContent from '~/pages/template/PageContent.tsx'
import { EditBookPageContent } from '~/pages/edit-book-page/EditBookPageContent.tsx'
import AuthForm from '~/pages/template/components/AuthForm.tsx'

const EditBookPage: React.FC = () => {
  return <Page>
    <PageHeader>
      <AuthForm/>
    </PageHeader>
    <PageContent>
      <EditBookPageContent/>
    </PageContent>
  </Page>
}

export const EditBookPage

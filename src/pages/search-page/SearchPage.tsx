import React from 'react'
import Page from '~/pages/template/Page.tsx'
import PageHeader from '~/pages/template/PageHeader.tsx'
import PageContent from '~/pages/template/PageContent.tsx'
import AuthForm from '~/pages/template/components/AuthForm.tsx'

import './styles/SearchPage.scss'

const SearchPage: React.FC = () => {
  return (
    <Page>
      <PageHeader>
        <AuthForm />
      </PageHeader>
      <PageContent>
        <div className={'root'}></div>
      </PageContent>
    </Page>
  )
}

export default React.memo(SearchPage)

import React from 'react'
import Page from '~/pages/template/Page.tsx'
import PageHeader from '~/pages/template/PageHeader.tsx'
import PageContent from '~/pages/template/PageContent.tsx'
import AuthForm from '~/pages/template/components/AuthForm.tsx'

import './styles/SearchPage.scss'
import SearchPageContent from '~/pages/search-page/SearchPageContent.tsx'

const SearchPage: React.FC = () => {
  return (
    <Page>
      <PageHeader>
        <AuthForm />
      </PageHeader>
      <PageContent>
        <SearchPageContent/>
      </PageContent>
    </Page>
  )
}

export default React.memo(SearchPage)

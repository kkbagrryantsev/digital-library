import React from 'react'
import { Route, Router, Switch } from 'wouter'
import SearchPage from '~/pages/search-page/SearchPage.tsx'
import FallbackPage from '~/pages/fallback-page/FallbackPage.tsx'
import { BookPage } from '~/pages/book-page/BookPage.tsx'
import { EditBookPage } from '~/pages/edit-book-page/EditBookPage.tsx'

const BookRoutes: React.FC = () => {
  return (
    <Router base={'/book'}>
      <Route path={'/new'}></Route>
      <Route path={'/:id/edit'}>
        {params => <EditBookPage id={params.id} />}
      </Route>
      <Route path={'/:id'}>{params => <BookPage id={params.id} />}</Route>
    </Router>
  )
}

const Routes: React.FC = () => {
  return (
    <Switch>
      <Route path={'/search'}>
        <SearchPage />
      </Route>
      <BookRoutes />
      <Route>
        <FallbackPage/>
      </Route>
    </Switch>
  )
}

export default React.memo(Routes)

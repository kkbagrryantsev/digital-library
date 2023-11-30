import React from 'react'
import { Route, Router, Switch } from 'wouter'
import SearchPage from '~/pages/search-page/SearchPage.tsx'
import FallbackPage from '~/pages/fallback-page/FallbackPage.tsx'

const BookRoutes: React.FC = () => {
  return (
    <Router base={'/book'}>
      <Route path={'/new'}></Route>
      <Route path={'/:id/edit'}></Route>
      <Route path={'/:id'}></Route>
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
        <FallbackPage></FallbackPage>
      </Route>
    </Switch>
  )
}

export default React.memo(Routes)

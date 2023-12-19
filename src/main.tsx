import ReactDOM from 'react-dom/client'

import './index.css'
import Routes from '~/Routes'
// @ts-expect-error React must be in scope
import React from 'react'
import initAxios from '~/api/BackendSettings.ts'

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement)

function renderApp (): any {
  initAxios()
  root.render(<Routes />)
}

renderApp()

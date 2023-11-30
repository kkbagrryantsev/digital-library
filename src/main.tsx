import ReactDOM from 'react-dom/client'

import './index.css'
import Routes from '~/Routes'
// @ts-expect-error React must be in scope
import React from 'react'

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement)

function renderApp (): any {
  root.render(<Routes />)
}

renderApp()

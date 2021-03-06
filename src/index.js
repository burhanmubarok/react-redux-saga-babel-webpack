import React from 'react'
import { render } from 'react-dom'
import { Index as RootComponent } from 'Components'
import { Provider } from 'react-redux'
import { store } from './stores'
import './index.less'

const RootApp = () => (
  <Provider store={store}>
    <RootComponent />
  </Provider>
)
const rootElement = document.querySelector('#root')
const createRootElement = document.createElement('div')

render(
  <RootApp />,
  rootElement || createRootElement
)

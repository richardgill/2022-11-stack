import { jsx as _jsx, jsxs as _jsxs } from 'react/jsx-runtime'
import { useState } from 'react'
import styles from './styles/app.module.scss'
const App = () => {
  const [count, setCount] = useState(0)
  return _jsx('div', {
    className: styles.app,
    children: _jsxs('header', {
      className: styles.appHeader,
      children: [
        _jsxs('div', {
          className: styles.logos,
          children: [
            _jsx('div', {
              className: styles.imgBox,
              children: _jsx('img', {
                src: './electron.png',
                style: { height: '24vw' },
                className: styles.appLogo,
                alt: 'electron',
              }),
            }),
            _jsx('div', {
              className: styles.imgBox,
              children: _jsx('img', {
                src: './vite.svg',
                style: { height: '19vw' },
                alt: 'vite',
              }),
            }),
            _jsx('div', {
              className: styles.imgBox,
              children: _jsx('img', {
                src: './react.svg',
                style: { maxWidth: '100%' },
                className: styles.appLogo,
                alt: 'logo',
              }),
            }),
          ],
        }),
        _jsx('p', { children: 'Hello Electron + Vite + React!' }),
        _jsx('p', {
          children: _jsxs('button', {
            onClick: () => setCount((count) => count + 1),
            children: ['count is: ', count],
          }),
        }),
        _jsxs('p', {
          children: [
            'Edit ',
            _jsx('code', { children: 'App.tsx' }),
            ' and save to test HMR updates.',
          ],
        }),
        _jsxs('div', {
          children: [
            _jsx('a', {
              className: styles.appLink,
              href: 'https://reactjs.org',
              target: '_blank',
              rel: 'noopener noreferrer',
              children: 'Learn React',
            }),
            ' | ',
            _jsx('a', {
              className: styles.appLink,
              href: 'https://vitejs.dev/guide/features.html',
              target: '_blank',
              rel: 'noopener noreferrer',
              children: 'Vite Docs',
            }),
            _jsxs('div', {
              className: styles.staticPublic,
              children: [
                'Place static files into the ',
                _jsx('code', { children: '/public' }),
                ' folder',
                _jsx('img', { style: { width: 77 }, src: './node.png' }),
              ],
            }),
          ],
        }),
      ],
    }),
  })
}
export default App

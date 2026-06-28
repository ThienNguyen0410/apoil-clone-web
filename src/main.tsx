import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { Provider } from 'react-redux'
import { ConfigProvider } from 'antd'
import viVN from 'antd/locale/vi_VN'
import enUS from 'antd/locale/en_US'
import { store } from './presenters/store'
import { useAppSelector } from './presenters/hooks'
import App from './App.tsx'
import './locale/i18n.ts'

function AntProvider({ children }: { children: React.ReactNode }) {
  const language = useAppSelector((state) => state.locale.language)
  return (
    <ConfigProvider locale={language === 'VIE' ? viVN : enUS}>
      {children}
    </ConfigProvider>
  )
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Provider store={store}>
      <AntProvider>
        <App />
      </AntProvider>
    </Provider>
  </StrictMode>,
)

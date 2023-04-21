import './App.css'
import { MantineProvider } from '@mantine/core'
import HomePage from './components/HomePage'
import { CustomFonts } from './fonts/CustomFont'

function App() {

  return (
    <MantineProvider withGlobalStyles withNormalizeCSS
      theme={
        {
          fontFamily: 'Rubik, sans-serif',
          colors: {
            sitePrimary: ['#5457b6', '#ed6468', '#c3c4ef', '#ffb8bb'],
            siteNeutral: ['#324152', '#67727e', '#eaecf1', '#f5f6fa', '#ffffff']
          }
        }
      }
    >
      <HomePage />
      <CustomFonts />
    </MantineProvider >
  )
}

export default App

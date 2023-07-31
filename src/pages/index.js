import { Inter } from 'next/font/google'
import Welcome from '../component/Welcome'

const inter = Inter({ subsets: ['latin'] })

export default function Home({isDarkMode, setIsDarkMode, toogleDarkMode}) {
  return (
  <Welcome isDarkMode={isDarkMode} setIsDarkMode={setIsDarkMode} toogleDarkMode={toogleDarkMode}/>
  )
}

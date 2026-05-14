import { Routes, Route } from 'react-router-dom'
import { Suspense, lazy } from 'react'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import Loader from './components/Loader'
import ScrollToTop from './components/ScrollToTop'

const Home = lazy(() => import('./pages/Home'))
const Team = lazy(() => import('./pages/Team'))
const Cars = lazy(() => import('./pages/Cars'))
const Calendar = lazy(() => import('./pages/Calendar'))
const Results = lazy(() => import('./pages/Results'))
const News = lazy(() => import('./pages/News'))
const Store = lazy(() => import('./pages/Store'))
const About = lazy(() => import('./pages/About'))
const NewsDetail = lazy(() => import('./pages/NewsDetail'))

function App() {
  return (
    <>
      <ScrollToTop />
      <Navbar />
      <main>
        <Suspense fallback={<Loader />}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/team" element={<Team />} />
            <Route path="/cars" element={<Cars />} />
            <Route path="/calendar" element={<Calendar />} />
            <Route path="/results" element={<Results />} />
            <Route path="/news" element={<News />} />
            <Route path="/news/:id" element={<NewsDetail />} />
            <Route path="/store" element={<Store />} />
            <Route path="/about" element={<About />} />
          </Routes>
        </Suspense>
      </main>
      <Footer />
    </>
  )
}

export default App

import About from '../components/About'
import AiAssistant from '../components/AiAssistant'
import Contact from '../components/Contact'
import Experience from '../components/Experience'
import Footer from '../components/Footer'
import Hero from '../components/Hero'
import Navbar from '../components/Navbar'
import Projects from '../components/Projects'
import Skills from '../components/Skills'
import { useApi } from '../hooks/useApi'
import { api } from '../services/api'

export default function Home() {
  const { data: profile, loading, error, retry } = useApi(api.getProfile)

  return (
    <>
      <Navbar />
      <main>
        <Hero profile={profile} loading={loading} error={error} onRetry={retry} />
        <About profile={profile} />
        <Skills />
        <Experience />
        <Projects />
        <AiAssistant />
        <Contact profile={profile} />
      </main>
      <Footer profile={profile} />
    </>
  )
}

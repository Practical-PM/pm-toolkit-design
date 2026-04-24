import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import DesignLanding from './pages/DesignLanding'
import NavigationPatterns from './pages/navigation-patterns/NavigationPatterns'
import './App.css'

function App() {
  return (
    <Router basename="/design">
      <AppContent />
    </Router>
  )
}

function AppContent() {
  return (
    <div className="app practice-mode">
      <main className="main-content">
        <Routes>
          <Route path="/" element={<DesignLanding />} />
          <Route path="/navigation-patterns" element={<NavigationPatterns />} />
        </Routes>
      </main>

      <footer className="app-footer animate-slide-bottom stagger-4">
        <p className="ds-type">
          Part of <strong>The PM Toolkit</strong> — PM Design lenses for UX trade-offs with your trio.
        </p>
        <p className="footer-links ds-type">
          <a href="https://practicalpm.tools/" className="ds-type">
            &larr; Back to Toolkit
          </a>
          {' • '}
          <a href="https://github.com/Practical-PM" target="_blank" rel="noopener noreferrer" className="ds-type">
            Open source on GitHub
          </a>
        </p>
      </footer>
    </div>
  )
}

export default App

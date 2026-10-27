import { StrictMode } from 'react'
import { createRoot, hydrateRoot } from 'react-dom/client'
import './index.css'
import { AppRouter } from './app/Router'

const container = document.getElementById('root')!
const app = (
  <StrictMode>
    <AppRouter />
  </StrictMode>
)

// Blog routes are prerendered at build time; the home page ships an empty root.
if (container.hasChildNodes()) {
  hydrateRoot(container, app)
} else {
  createRoot(container).render(app)
}

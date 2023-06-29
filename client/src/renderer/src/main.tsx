import { createRoot } from 'react-dom/client'
import { createHashRouter, RouterProvider } from 'react-router-dom'
import './assets/index.css'
import Main from './pages/Main'
import { QueryClientProvider, QueryClient } from 'react-query'

const router = createHashRouter([
  {
    path: '/',
    element: <Main />
  }
])

const client = new QueryClient()

createRoot(document.getElementById('root')!).render(
  <QueryClientProvider client={client}>
    <RouterProvider router={router} />
  </QueryClientProvider>
)

import { createRoot } from 'react-dom/client'
import { createHashRouter, RouterProvider } from 'react-router-dom'
import './assets/index.css'
import Root from './pages/Root/Root'
import { QueryClientProvider, QueryClient } from 'react-query'

const router = createHashRouter([
  {
    path: '/',
    element: <Root />
  }
])

const client = new QueryClient()

createRoot(document.getElementById('root')!).render(
  <QueryClientProvider client={client}>
    <RouterProvider router={router} />
  </QueryClientProvider>
)

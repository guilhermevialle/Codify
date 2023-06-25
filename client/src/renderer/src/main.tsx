import { createRoot } from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import App from './App'
import './assets/index.css'
import Main from './pages/Main'
import { QueryClientProvider, QueryClient } from 'react-query'

const router = createBrowserRouter([
  // {
  //   path: '/',
  //   element: <App />
  // },
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

import { Route, Routes } from 'react-router'
import Layout from './layouts/Layout'
import Dashboard from './pages/Dashboard'
import ApplicationPage from './pages/ApplicationPage'


const AppRoutes = () => (
  <Routes>
    <Route path="/" element={<Layout />}>
      <Route index element={<Dashboard />} />
      <Route path="settings" element={<div>Settings Page</div>} />
      <Route path="profile" element={<div>Profile Page</div>} />

      {/* per application id routes here */}
      <Route path="applications/:id" element={<ApplicationPage />} />
    </Route>

  </Routes>
)

export default AppRoutes
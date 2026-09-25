import { Navigate, Route, Routes } from 'react-router-dom'

import AppLayout from '@/components/layout/AppLayout.jsx'
import Contests from '@/pages/Contests.jsx'
import Home from '@/pages/Home.jsx'
import NotFound from '@/pages/NotFound.jsx'
import Potd from '@/pages/Potd.jsx'
import Tasks from '@/pages/Tasks.jsx'
import Workspace from '@/pages/Workspace.jsx'
import { ROUTES } from '@/lib/constants.js'

/**
 * Route table.
 *
 * Stage 1 ships: Home (landing + hero + reference sections) only.
 * Tasks / POTD / Contests / Workspace resolve to clearly-marked placeholder
 * shells so navigation never dead-ends — their real UI lands in later stages.
 */
export default function App() {
  return (
    <Routes>
      <Route element={<AppLayout />}>
        <Route path={ROUTES.home} element={<Home />} />
        <Route path={ROUTES.tasks} element={<Tasks />} />
        <Route path={ROUTES.potd} element={<Potd />} />
        <Route path={ROUTES.contests} element={<Contests />} />
        <Route path={ROUTES.workspace} element={<Workspace />} />
        <Route path="/home" element={<Navigate to={ROUTES.home} replace />} />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  )
}

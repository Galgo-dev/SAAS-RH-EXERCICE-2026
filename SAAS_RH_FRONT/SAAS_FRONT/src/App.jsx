import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import Layout from './components/Layout.jsx'
import AssistantPage from './pages/AssistantPage.jsx'
import ChatPage from './pages/ChatPage.jsx'
import ParsingPage from './pages/ParsingPage.jsx'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route index element={<Navigate to="/parsing" replace />} />
          <Route path="/parsing" element={<ParsingPage />} />
          <Route path="/assistant" element={<AssistantPage />} />
          <Route path="/chat" element={<ChatPage />} />
          <Route path="*" element={<Navigate to="/parsing" replace />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App

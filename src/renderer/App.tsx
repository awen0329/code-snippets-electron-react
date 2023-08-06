import { MemoryRouter as Router, Routes, Route } from 'react-router-dom';
import { CodeSnippetProvider } from '@contexts/CodeSnippetContext';
import './App.css';
import Dashboard from './dashboard/Dashboard';

export default function App() {
  return (
    <CodeSnippetProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Dashboard />} />
        </Routes>
      </Router>
    </CodeSnippetProvider>
  );
}

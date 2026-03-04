import React, { lazy, Suspense } from 'react';
import { HashRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AppLayout } from './components/layout/AppLayout';
import { SkeletonPage } from './components/ui/SkeletonScreen';

const Home = lazy(() => import('./pages/Home'));
const Llms = lazy(() => import('./pages/Llms'));
const Pathologies = lazy(() => import('./pages/Pathologies'));
const Control = lazy(() => import('./pages/Control'));
const ChatGptGuide = lazy(() => import('./pages/ChatGptGuide'));
const Tools = lazy(() => import('./pages/Tools'));
const Recursos = lazy(() => import('./pages/Recursos'));

function App() {
  return (
    <HashRouter>
      <Routes>
        <Route path="/" element={<AppLayout />}>
          <Route index element={
            <Suspense fallback={<SkeletonPage />}>
              <Home />
            </Suspense>
          } />
          <Route path="llms" element={
            <Suspense fallback={<SkeletonPage />}>
              <Llms />
            </Suspense>
          } />
          <Route path="pathologies" element={
            <Suspense fallback={<SkeletonPage />}>
              <Pathologies />
            </Suspense>
          } />
          <Route path="control" element={
            <Suspense fallback={<SkeletonPage />}>
              <Control />
            </Suspense>
          } />
          <Route path="chatgpt-guide" element={
            <Suspense fallback={<SkeletonPage />}>
              <ChatGptGuide />
            </Suspense>
          } />
          <Route path="tools" element={
            <Suspense fallback={<SkeletonPage />}>
              <Tools />
            </Suspense>
          } />
          <Route path="recursos" element={
            <Suspense fallback={<SkeletonPage />}>
              <Recursos />
            </Suspense>
          } />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Route>
      </Routes>
    </HashRouter>
  );
}

export default App;

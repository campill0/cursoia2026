import React, { lazy, Suspense } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AppLayout } from './components/layout/AppLayout';
import { SkeletonPage } from './components/ui/SkeletonScreen';

const Home = lazy(() => import('./pages/Home'));
const Llms = lazy(() => import('./pages/Llms'));
const Pathologies = lazy(() => import('./pages/Pathologies'));
const Control = lazy(() => import('./pages/Control'));
const Tools = lazy(() => import('./pages/Tools'));

function App() {
  return (
    <BrowserRouter>
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
          <Route path="tools" element={
            <Suspense fallback={<SkeletonPage />}>
              <Tools />
            </Suspense>
          } />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;

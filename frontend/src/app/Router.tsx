import { BrowserRouter, Route, Routes } from 'react-router-dom';
import App from '../App';
import { BlogIndex } from '../blog/pages/BlogIndex';
import { BlogNotFound } from '../blog/pages/BlogNotFound';
import { BlogPostPage } from '../blog/pages/BlogPostPage';

export const AppRoutes = () => (
  <Routes>
    <Route path="/" element={<App />} />
    <Route path="/blog" element={<BlogIndex />} />
    <Route path="/blog/:slug" element={<BlogPostPage />} />
    <Route path="*" element={<BlogNotFound />} />
  </Routes>
);

export const AppRouter = () => (
  <BrowserRouter>
    <AppRoutes />
  </BrowserRouter>
);

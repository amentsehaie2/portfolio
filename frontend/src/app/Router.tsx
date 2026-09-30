import { BrowserRouter, Route, Routes } from 'react-router-dom';
import App from '../App';
import { BlogIndex } from '../blog/pages/BlogIndex';
import { BlogRoutePlaceholder } from '../blog/pages/BlogRoutePlaceholder';

export const AppRouter = () => (
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<App />} />
      <Route path="/blog" element={<BlogIndex />} />
      <Route path="/blog/:slug" element={<BlogRoutePlaceholder type="article" />} />
      <Route path="/blog/category/:category" element={<BlogRoutePlaceholder type="category" />} />
      <Route path="*" element={<BlogRoutePlaceholder type="not-found" />} />
    </Routes>
  </BrowserRouter>
);
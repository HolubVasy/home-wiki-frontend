// src/App.tsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Layout from './components/Layout/Layout';
import MainPage from './pages/Main/MainPage';
import Articles from './pages/Articles';
import ArticleDetails from './pages/ArticleDetails';
import EditArticle from './pages/EditArticle';
import CreateArticle from './pages/CreateArticle';
import Categories from './pages/Categories';
import Tags from './pages/Tags';
import Error404 from './pages/Error404';
import Error400 from './pages/Error400';
import Error500 from './pages/Error500';
import ContactInfo from './pages/ContactInfo';
import TermsOfUse from './pages/TermsOfUse';
import CategoryArticles from './components/Category/CategoryArticles';
import TagArticles from './components/Tag/TagArticles';
import Search from './pages/Search';

export default function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="/articles" element={<Articles />} />
          <Route path="/articles/:id" element={<ArticleDetails />} />
          <Route path="/articles/:id/edit" element={<EditArticle />} />
          <Route path="/articles/create" element={<CreateArticle />} />
          <Route path="/categories" element={<Categories />} />
          <Route path="/tags" element={<Tags />} />
          <Route path="/search" element={<Search />} />
          <Route path="/400" element={<Error400 />} />
          <Route path="/500" element={<Error500 />} />
          <Route path="/404" element={<Error404 />} />
          <Route path="*" element={<Navigate to="/404" replace />} />
          <Route path="/contact" element={<ContactInfo />} />
          <Route path="/terms" element={<TermsOfUse />} />
          <Route path="/categories/:id" element={<CategoryArticles />} />
          <Route path="/tags/:id" element={<TagArticles />} />
        </Routes>
      </Layout>
    </Router>
  );
}

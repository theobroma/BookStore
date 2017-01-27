import React from 'react';
import { Route, IndexRoute } from 'react-router';
import Layout from './Layout';
import App from './App';
import BookPage from './BookPage';
import GenrePage from './GenrePage';
import GenreList from './GenreList';
import AuthorPage from './AuthorPage';
import AuthorList from './AuthorList';
import SignupPage from './SignupPage';
import LoginPage from './LoginPage';
import UserProfilePage from './UserProfilePage';
import UserProfilePage2 from './UserProfilePage2';
import ShoppingCartPage from './ShoppingCartPage';
import NotFound from './NotFound';

import requireAuth from './utils/requireAuth';

export const routes = (
  <div>
    <Route path="/" component={Layout}>
      <Route path="/books" component={App} />
      <Route path="/books/:book" component={BookPage} />
      <Route path="/genres" component={GenreList} />
      <Route path="/genres/:genre" component={GenrePage} />
      <Route path="/authors" component={AuthorList} />
      <Route path="/authors/:author" component={AuthorPage} />
      <Route path="/cart" component={requireAuth(ShoppingCartPage)} />
      <Route path="/signup" component={SignupPage} />
      <Route path="/login" component={LoginPage} />
      <Route path="/profile" component={requireAuth(UserProfilePage)} />
      <Route path="/profile2" component={requireAuth(UserProfilePage2)} />
    </Route>
    {/* для всех остальных роутов: показывай NotFound */}
    <Route path="*" component={NotFound} />
  </div>
);

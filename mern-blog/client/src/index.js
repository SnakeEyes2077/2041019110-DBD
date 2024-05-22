import React from 'react';
import ReactDOM from 'react-dom/client';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import './index.css'
import ErrorPage from './pages/Error/ErrorPage';
import Home from './pages/Home';
import Login from './pages/Authentication/Login';
import Register from './pages/Authentication/Register';
import Logout from './pages/Authentication/Logout';
import Layout from './components/Layout';
import UserProfile from './pages/User/UserProfile';
import Dashboard from './pages/User/Dashboard';
import AuthorPosts from './pages/Posts/AuthorPosts';
import Authors from './pages/Authors/Authors';
import CategoryPosts from './pages/Posts/CategoryPosts';
import CreatePosts from './pages/CRUD/CreatePosts';
import PostDetail from './pages/CRUD/PostDetail';
import EditPost from './pages/CRUD/EditPost';
import DeletePost from './pages/CRUD/DeletePost';
import UserProvider from './context/userContext';

import Loader from './components/loader';

const routes = createBrowserRouter([
  {
    path: "/",
    element:   <UserProvider><Layout /></UserProvider>  ,
    errorElement: <ErrorPage />,
    children: [
      { index: true, element: <Home /> },
      { path: "posts/:id", element: <PostDetail /> },
      { path: "register", element: <Register /> },
      { path: "login", element: <Login /> },
      { path: "profile/:id", element: <UserProfile /> },
      { path: "authors", element: <Authors /> },
      { path: "create", element: <CreatePosts /> },
      { path: "posts/categories/:category", element: <CategoryPosts /> },
      { path: "posts/users/:id", element: <AuthorPosts /> },
      { path: "myposts/:id", element: <Dashboard /> },
      { path: "posts/:id/edit", element: <EditPost /> },
      { path: "posts/:id/delete", element: <DeletePost /> },
      { path: "logout", element: <Logout /> },
      { path: "loader", element: <Loader /> }
    ]
  }
])
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <RouterProvider router={routes} />
  </React.StrictMode>
);



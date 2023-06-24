import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { Layout } from './components/Layout';
import { action as actionNuevoCliente, NuevoCliente } from './pages/NuevoCliente';
import { Index, loader as loaderClientes } from './pages/Index';
import { ErrorPage } from './components/ErrorPage';
import { EditarCliente, loader as loaderEditarCliente, action as actionEditarCliente } from './pages/EditarCliente';
import { action as actionEliminar } from './components/Cliente';


const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout/>,
    children: [
      {
        index: true,
        element: <Index/>,
        loader: loaderClientes,
        errorElement: <ErrorPage />
      },
      {
        path: '/clientes/nuevo',
        element: <NuevoCliente/>,
        action: actionNuevoCliente,
        errorElement: <ErrorPage/>
      },
      {
        path: '/clientes/:clienteId/editar',
        element: <EditarCliente/>,
        loader: loaderEditarCliente,
        action: actionEditarCliente,
        errorElement: <ErrorPage />
      },
      {
        path: '/clientes/:clienteId/eliminar',
        action: actionEliminar
      }
    ]
  },

])
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)

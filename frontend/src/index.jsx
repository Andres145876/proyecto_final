import React from 'react';
import { AuthProvider } from './Contexto/Authentication'; // Asegúrate de que el path sea correcto
import App from './App'; // Tu componente principal
import ReactDOM from 'react-dom/client';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
<AuthProvider>
    <App />
</AuthProvider>
);

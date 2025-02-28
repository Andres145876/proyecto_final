import React from "react";
import ReactDOM from "react-dom/client";
import Home from "./pages/Home";

const rootElement = document.getElementById("root");
if (rootElement) {
    const root = ReactDOM.createRoot(rootElement);
    root.render(
        <React.StrictMode>
          <Home/>
        </React.StrictMode>
    );
} else {
    console.error("No se encontró el elemento root en el HTML.");
}
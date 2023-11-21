import React from "react"
import ReactDOM from "react-dom/client"
// import App from "./App.tsx"
import "./index.css"
import { Provider } from "react-redux"
import store from "./Store/store"
import { RouterProvider } from "react-router-dom"
import router from "./routers/router.tsx"
// import DataContext from "./Context/DataContext.tsx"
ReactDOM.createRoot(document.getElementById("root")!).render(
     <React.StrictMode>
          <Provider store={store}>
               {/* <DataContext> */}

               <RouterProvider router={router} />

               {/* </DataContext> */}
          </Provider>
     </React.StrictMode>
)

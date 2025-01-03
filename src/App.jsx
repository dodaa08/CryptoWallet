import { BrowserRouter, Routes, Route } from "react-router-dom";
import Landing from "./app/Landing";
import Layout from "./Layout";
import NewWallet from "./app/NewWallet";
import ImportWallet from "./app/ImportWallet";
import Swap from "./app/Swap";
import MemeCoin from "./app/MemeCoin";


function App() {
  const routes = [
    {
      path: "/",
      element: <Landing />,
    },
    {
      path : "/new",
      element : <NewWallet />
    },
    {
      path : "/import",
      element : <ImportWallet />
    },
    {
      path : "/swap",
      element : <Swap />
    },
    {
      path : "/launch",
      element : <MemeCoin />
    }
  ];

  return (
    <>
      <BrowserRouter>
        <Routes>
          {/* Define Layout route */}
          <Route path="/" element={<Layout />}>
            {/* Map through routes and define nested routes */}
            {routes.map((route, index) => {
              return (
                <Route
                  key={index}
                  path={route.path}
                  element={route.element}
                />
              );
            })}
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;

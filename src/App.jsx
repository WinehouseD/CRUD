import React, { lazy, Suspense } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { CircularProgress } from "@mui/material";
import { useKindeAuth } from "@kinde-oss/kinde-auth-react";
import AddItem from "./components/AddItem";
import Header from "./components/Header";
import LogoutButton from "./components/LogoutButton";
import NotFound from "./pages/NotFound";

const SignIn = lazy(() => import("./pages/SignIn"));
const ItemsList = lazy(() => import("./components/ItemsList"));
const EditItem = lazy(() => import("./components/EditItem"));

const ProtectedRoute = ({ element, isAuthenticated }) => {
  return isAuthenticated ? element : <Navigate to="/" replace />;
};

const App = () => {
  const { isAuthenticated } = useKindeAuth();

  return (
    <Router>
      <Header />
      {isAuthenticated && <LogoutButton />}
      <Suspense fallback={<CircularProgress size={40} />}>
        <Routes>
          <Route
            path="/list"
            element={
              <ProtectedRoute
                element={<ItemsList />}
                isAuthenticated={isAuthenticated}
              />
            }
          />
          <Route
            path="/add"
            element={
              <ProtectedRoute
                element={<AddItem />}
                isAuthenticated={isAuthenticated}
              />
            }
          />
          <Route
            path="/edit/:id"
            element={
              <ProtectedRoute
                element={<EditItem />}
                isAuthenticated={isAuthenticated}
              />
            }
          />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Suspense>
    </Router>
  );
};

export default App;

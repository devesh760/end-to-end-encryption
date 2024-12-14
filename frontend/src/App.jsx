import React, { use } from "react";
import styles from "./App.module.css";
import AuthModal from "./components/auth/authModal";
import useAuth from "./hooks/useAuth";

const AuthenticatedApp = React.lazy(() => import("./authenticatedApp"));

const SuspenseFallback = () => {
  return <div>Loading...</div>;
};

const App = () => {
  const { handleAuthSubmit, isAuthenticated, isLoading } = useAuth();

  if (isLoading) {
    return <SuspenseFallback />;
  }

  return (
    <div className={styles.app}>
      {!isAuthenticated && <AuthModal show onSubmit={handleAuthSubmit} />}
      <React.Suspense fallback={<SuspenseFallback />}>
        {isAuthenticated && <AuthenticatedApp />}
      </React.Suspense>
    </div>
  );
};

export default App;

import { AuthProvider } from "./context/AuthConext";
import RouterPage from "./components/Route/Route";

export default function App() {
  return (
    <AuthProvider>
      <RouterPage />
    </AuthProvider>
  );
}

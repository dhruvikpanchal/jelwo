import { useContext } from "react";
import { RouterContext, normalizePath } from "../context/routerCore";

export { normalizePath, RouterContext };

// Hook to access router anywhere
export function useRouter() {
  const context = useContext(RouterContext);
  if (!context) {
    throw new Error("useRouter must be used within a RouterProvider");
  }
  return context;
}

export function useNavigate() {
  const { navigate } = useRouter();
  return navigate;
}

export function useLocation() {
  const { currentPath } = useRouter();
  return { pathname: currentPath };
}

export default useRouter;

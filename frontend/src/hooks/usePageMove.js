import { useCallback } from "react";
import {
  createSearchParams,
  useLocation,
  useNavigate,
  useSearchParams,
} from "react-router-dom";

const getNum = (param, defaultValue) => {
  if (!param) return defaultValue;
  const parsed = parseInt(param);
  return isNaN(parsed) ? defaultValue : parsed;
};

const getQueryParams = (location) => {
  return new URLSearchParams(location.search);
};

const usePageMove = (defaultSize = 10) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [currentSearchParams] = useSearchParams();

  const page = getNum(currentSearchParams.get("page"), 1);
  const size = getNum(currentSearchParams.get("size"), defaultSize);

  const basePath = location.pathname;

  const moveToList = useCallback(
    (params = {}, path = basePath) => {
      const currentParams = Object.fromEntries(currentSearchParams.entries());

      const finalParams = {
        ...currentParams,
        ...params,
      };

      finalParams.page = getNum(finalParams.page, 1);
      finalParams.size = getNum(finalParams.size, size);

      const queryStr = createSearchParams(finalParams).toString();

      navigate({ pathname: path, search: queryStr });
    },
    [basePath, currentSearchParams, navigate, size]
  );

  return {
    moveToList,
    page,
    size,
    getQueryParams: () => getQueryParams(location),
  };
};

export default usePageMove;

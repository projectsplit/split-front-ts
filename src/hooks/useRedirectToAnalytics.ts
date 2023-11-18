import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export const useRedirectToAnalytics = () => {
  const navigate = useNavigate();

  useEffect(() => {
    navigate(`/analytics`);
  }, []);

  return null;
};

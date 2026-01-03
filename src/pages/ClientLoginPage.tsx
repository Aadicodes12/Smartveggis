"use client";

import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const ClientLoginPage = () => {
  const navigate = useNavigate();

  useEffect(() => {
    navigate("/auth"); // Redirect to the central AuthPage
  }, [navigate]);

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 dark:bg-gray-900">
      <p className="text-lg text-gray-600 dark:text-gray-400">Redirecting to login...</p>
    </div>
  );
};

export default ClientLoginPage;
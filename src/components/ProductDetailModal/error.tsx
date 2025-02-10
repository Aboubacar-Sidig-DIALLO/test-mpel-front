"use client";

import { AlertCircle, RefreshCw } from "lucide-react";
import { useEffect } from "react";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error(error);
  }, [error]);

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100 text-center p-4">
      {/* Icône d'erreur (Lucide) */}
      <div className="text-red-500 mb-4">
        <AlertCircle className="h-16 w-16" />
      </div>

      {/* Message d'erreur */}
      <h2 className="text-2xl font-bold text-gray-800 mb-2">
        Oups ! Quelque chose s&apos;est mal passé.
      </h2>
      <p className="text-gray-600 mb-6">
        L&apos;URL de l&apos;image est invalide ou ne pointe sur rien.
      </p>

      {/* Bouton pour réessayer */}
      <button
        onClick={() => reset()} // Fonction pour réessayer
        className="flex items-center px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
      >
        <RefreshCw className="h-5 w-5 mr-2" />
        Réessayer
      </button>
    </div>
  );
}
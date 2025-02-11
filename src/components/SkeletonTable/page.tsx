import { Package, PlusCircle, Shield, User } from "lucide-react";
import { Button } from "../ui/button";
import { Skeleton } from "../ui/skeleton";

export default function Page() {
  return (
     <div className="min-h-screen flex flex-col bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm py-6">
        <div className="container mx-auto px-6 flex justify-between items-center">
          <div className="flex items-center space-x-3">
            <Package className="text-elyamaje-150 w-8 h-8" />
            <h1 className="text-3xl font-bold text-gray-800">Gestion des Produits</h1>
          </div>

          {/* Bouton de toggle pour le mode Admin/User */}
          <div className="flex items-center space-x-3">
            <div className="flex items-center space-x-2">
              <User className={'w-5 h-5 text-elyamaje-100'} />
              <Shield className={'w-5 h-5 text-gray-400'} />
            </div>
            <span className="text-sm font-medium text-gray-700">
              {'User'}
            </span>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 container mx-auto px-6 py-8">
        <div className="bg-white rounded-lg shadow-sm p-6">
          {/* Titre du tableau et bouton d'ajout */}
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-semibold text-gray-700">Liste des Produits</h2>
            <Button
              className="bg-elyamaje-50 hover:bg-elyamaje-150 text-elyamaje-100 flex items-center space-x-2"
            >
              <PlusCircle className="w-5 h-5" /> {/* Icône pour le bouton */}
              <span>Ajouter un produit</span>
            </Button>
          </div>

          {/* Tableau */}
           <table className="min-w-full bg-white border border-gray-200">
            <thead>
              <tr>
                <th className="px-4 py-2 border-b text-center">Nom</th>
                <th className="px-4 py-2 border-b text-center">Description</th>
                <th className="px-4 py-2 border-b text-center">Prix</th>
                <th className="px-4 py-2 border-b text-center">Stock</th>
                <th className="px-4 py-2 border-b text-center">Actions</th>
              </tr>
            </thead>
            <tbody>
              {Array.from({ length: 3 }).map((_, index) => (
                <tr key={index} className="space-y-2">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <td key={i} className="py-4 text-center">
                      <div className="flex justify-center items-center">
                        <Skeleton className="h-4 w-[200px]" />
                      </div>
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-white shadow-sm py-4 mt-8">
        <div className="container mx-auto px-6 text-center text-gray-600">
          <p>&copy; 2023 Gestion des Produits. Tous droits réservés.</p>
        </div>
      </footer>
    </div>
  );
}
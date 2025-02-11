import { PlusCircle } from "lucide-react";
import { Button } from "../ui/button";
import { Skeleton } from "../ui/skeleton";

export default function Page() {
  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <div className="flex-1 container mx-auto px-6 py-8 ">
        <div className="bg-white rounded-lg shadow-sm p-6">
          {/* Titre du tableau et bouton d'ajout */}
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-semibold text-gray-700">Liste des Produits</h2>
            <Button
              className="bg-blue-600 hover:bg-blue-700 text-white flex items-center space-x-2"
            >
              <PlusCircle className="w-5 h-5" /> {/* Icône pour le bouton */}
              <span>Ajouter un produit</span>
            </Button>
          </div>

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
      </div>
    </div>    
  );
}
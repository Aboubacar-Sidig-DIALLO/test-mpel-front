import { Button } from "../ui/button";
import { Skeleton } from "../ui/skeleton";

export default function Page() {
  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Produits</h1>
        <Button>Ajouter un produit</Button>
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
  );
}
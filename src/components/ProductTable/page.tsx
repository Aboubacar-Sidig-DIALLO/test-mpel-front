import { useMemo } from "react";
import { Edit, Trash, Eye, PackageOpen, ChevronLeft, ChevronRight } from "lucide-react";
import { Product } from "@/types/Product";

export default function ProductTable({ products, totalPages, currentPage, setCurrentPage }: ProductTableProps) {

  const paginationControls = useMemo(() => {
    if (totalPages <= 1) return null;

    return (
      <div className="flex justify-between items-center mt-4">
        <button
          onClick={() => setCurrentPage(currentPage - 1)}
          disabled={currentPage === 1}
          className="flex items-center px-4 py-2 bg-gray-200 text-gray-700 rounded disabled:opacity-50"
        >
          <ChevronLeft size={20} />
          <span className="ml-1">Précédent</span>
        </button>

        <span className="text-sm text-center flex-1 font-medium">
          Page {currentPage} sur {totalPages}
        </span>

        <button
          onClick={() => setCurrentPage(currentPage + 1)}
          disabled={currentPage === totalPages}
          className="flex items-center px-4 py-2 bg-gray-200 text-gray-700 rounded disabled:opacity-50"
        >
          <span className="mr-1">Suivant</span>
          <ChevronRight size={20} />
        </button>
      </div>
    );
  }, [currentPage, totalPages, setCurrentPage]);

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full bg-white border border-gray-200">
        <thead>
          <tr>
            <th className="px-4 py-2 border-b">Nom</th>
            <th className="px-4 py-2 border-b">Description</th>
            <th className="px-4 py-2 border-b">Prix</th>
            <th className="px-4 py-2 border-b">Stock</th>
            <th className="px-4 py-2 border-b">Actions</th>
          </tr>
        </thead>
        <tbody>
          {products.length > 0 ? (
            products.map((product) => (
              <tr key={product.id}>
                <td className="text-center py-2 border-b">{product.name}</td>
                <td className="text-center py-2 border-b">{product.description}</td>
                <td className="text-center py-2 border-b">{product.price}</td>
                <td className="text-center py-2 border-b">{product.stock}</td>
                <td className="text-center py-2 border-b">
                  <button className="mr-2 text-blue-500" title="Modifier">
                    <Edit size={16} />
                  </button>
                  <button className="mr-2 text-gray-600" title="Voir détail">
                    <Eye size={16} />
                  </button>
                  <button className="text-red-500" title="Supprimer">
                    <Trash size={16} />
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={5} className="py-6 text-center text-gray-500">
                <div className="flex flex-col items-center justify-center">
                  <PackageOpen size={32} className="mb-2 text-gray-400" />
                  <span>Aucun produit trouvé</span>
                </div>
              </td>
            </tr>
          )}
        </tbody>
      </table>

      {paginationControls}
    </div>
  );
}

interface ProductTableProps {
  products: Product[];
  totalPages: number;
  currentPage: number;
  setCurrentPage: (page: number) => void;
}
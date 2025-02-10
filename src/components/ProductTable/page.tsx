import { useMemo } from "react";
import { Edit, Trash, Eye, PackageOpen, ChevronLeft, ChevronRight } from "lucide-react";
// import { useMutation, useQueryClient } from "@tanstack/react-query";
// import { toast } from "@/hooks/use-toast";
import { Product } from "@/types/Product";

export default function ProductTable({ products, totalPages, currentPage, setCurrentPage }: ProductTableProps) {
  // const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  // const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);
  // const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false);
  // const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  // const queryClient = useQueryClient();

  // const deleteMutation = useMutation({
  //   mutationFn: async (productId: string) => {
  //     const response = await fetch(`http://localhost:3001/product/${productId}`, {
  //       method: "DELETE",
  //     });
  //     if (!response.ok) throw new Error("Erreur lors de la suppression du produit");
  //     return response.json();
  //   },
  //   onSuccess: () => {
  //     queryClient.invalidateQueries({ queryKey: ["products"] });
  //     setIsConfirmModalOpen(false);
  //     toast({
  //       title: "Succès",
  //       description: "Produit supprimé avec succès.",
  //     });
  //   },
  //   onError: () => {
  //     toast({
  //       title: "Erreur",
  //       description: "Échec de la suppression du produit.",
  //       variant: "destructive",
  //     });
  //   },
  // });

  // const openEditModal = useCallback((product: Product) => {
  //   setSelectedProduct(product);
  //   setIsEditModalOpen(true);
  // }, []);

  // const openConfirmModal = useCallback((product: Product) => {
  //   setSelectedProduct(product);
  //   setIsConfirmModalOpen(true);
  // }, []);

  // const openDetailModal = useCallback((product: Product) => {
  //   setSelectedProduct(product);
  //   setIsDetailModalOpen(true);
  // }, []);

  // const handleDelete = useCallback(() => {
  //   if (selectedProduct) {
  //     deleteMutation.mutate(selectedProduct.id);
  //   }
  // }, [selectedProduct, deleteMutation]);

  const paginationControls = useMemo(() => {
  // Si totalPages est inférieur ou égal à 1, on affiche uniquement le compteur de page
  if (totalPages <= 1) {
    return (
      <div className="flex justify-center mt-4">
        <span className="text-sm text-center font-medium">
          Page {currentPage} sur {totalPages}
        </span>
      </div>
    );
  }

  // Si totalPages est supérieur à 1, on affiche les boutons de pagination
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

      {/* <ProductFormModal
        isOpen={isEditModalOpen}
        initialData={selectedProduct}
        onClose={() => setIsEditModalOpen(false)}
      />
      <ProductDetailModal
        isOpen={isDetailModalOpen}
        product={selectedProduct}
        onClose={() => setIsDetailModalOpen(false)}
      />
      <ConfirmationModal
        isOpen={isConfirmModalOpen}
        title="Confirmer la suppression"
        message={`Voulez-vous vraiment supprimer le produit "${selectedProduct?.name}" ?`}
        onCancel={() => setIsConfirmModalOpen(false)}
        onConfirm={handleDelete}
        confirmLabel="Supprimer"
        cancelLabel="Annuler"
      /> */}
    </div>
  );
}

interface ProductTableProps {
  products: Product[];
  totalPages: number;
  currentPage: number;
  setCurrentPage: (page: number) => void;
}
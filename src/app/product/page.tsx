				'use client';

import { useState, useCallback } from 'react';
import { useQuery } from '@tanstack/react-query';
import { Button } from '@/components/ui/button';
import ProductTable from '@/components/ProductTable/page';
import ProductFormModal from '@/components/ProductFormModal/page';
import SkeletonTable from '@/components/SkeletonTable/page';
import { Product } from '@/types/Product';
import { PlusCircle, Package, User, Shield } from 'lucide-react'; // Import des icônes
import { Switch } from '@/components/ui/switch'; // Utilisation d'un composant Switch moderne

interface ProductsData {
  products: Product[];
  totalPages: number;
}

export default function ProductsPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [isAdminMode, setIsAdminMode] = useState(false); // État pour le mode Admin/User
  const take = 5; // Nombre de produits à afficher par page.

  const fetchProducts = useCallback(async (page: number, take: number): Promise<ProductsData> => {
    const response = await fetch(`http://localhost:3001/product?page=${page}&take=${take}`);
    if (!response.ok) throw new Error('Erreur lors de la récupération des produits');
    return response.json();
  }, []);

  const { data: productsData, isLoading } = useQuery<ProductsData>({
    queryKey: ['products', currentPage],
    queryFn: () => fetchProducts(currentPage, take),
  });

  const handleAddProduct = useCallback(() => {
    setIsModalOpen(true);
  }, []);

  const handleCloseModal = useCallback(() => {
    setIsModalOpen(false);
  }, []);

  const toggleAdminMode = useCallback(() => {
    setIsAdminMode((prev) => !prev);
  }, []);

  if (isLoading) {
    return <SkeletonTable />;
  }

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
              <User className={`w-5 h-5 ${!isAdminMode ? 'text-elyamaje-100' : 'text-gray-400'}`} />
              <Switch
                checked={isAdminMode}
                onCheckedChange={toggleAdminMode}
                className="data-[state=checked]:bg-elyamaje-100 data-[state=unchecked]:bg-gray-300"
              />
              <Shield className={`w-5 h-5 ${isAdminMode ? 'text-elyamaje-100' : 'text-gray-400'}`} />
            </div>
            <span className="text-sm font-medium text-gray-700">
              {isAdminMode ? 'Admin' : 'User'}
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
              onClick={handleAddProduct}
              className="bg-elyamaje-50 hover:bg-elyamaje-150 text-elyamaje-100 flex items-center space-x-2"
            >
              <PlusCircle className="w-5 h-5" /> {/* Icône pour le bouton */}
              <span>Ajouter un produit</span>
            </Button>
          </div>

          {/* Tableau */}
          <ProductTable
            products={productsData?.products || []}
            totalPages={productsData?.totalPages || 1}
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
            isAdminMode={isAdminMode}
          />
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-white shadow-sm py-4 mt-8">
        <div className="container mx-auto px-6 text-center text-gray-600">
          <p>&copy; 2023 Gestion des Produits. Tous droits réservés.</p>
        </div>
      </footer>

      {/* Modal */}
      <ProductFormModal isOpen={isModalOpen} onClose={handleCloseModal} isAdminMode={isAdminMode} />
    </div>
  );
}
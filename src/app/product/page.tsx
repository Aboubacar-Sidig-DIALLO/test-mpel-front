'use client';

import { useState, useCallback } from 'react';
import { useQuery } from '@tanstack/react-query';
import { Button } from '@/components/ui/button';
import ProductTable from '@/components/ProductTable/page';
import ProductFormModal from '@/components/ProductFormModal/page';
import SkeletonTable from '@/components/SkeletonTable/page';
import { Product } from '@/types/Product';

interface ProductsData {
  products: Product[]; // Remplacez `any` par le type approprié, par exemple `ProductDto[]`
  totalPages: number;
}

export default function ProductsPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const take = 5; // Le nombre de produits à afficher par page.

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

  if (isLoading) {
    return <SkeletonTable />;
  }

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Produits</h1>
        <Button onClick={handleAddProduct}>Ajouter un produit</Button>
      </div>
      <ProductTable
        products={productsData?.products || []}
        totalPages={productsData?.totalPages || 1}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
      />
      <ProductFormModal isOpen={isModalOpen} onClose={handleCloseModal} />
    </div>
  );
}
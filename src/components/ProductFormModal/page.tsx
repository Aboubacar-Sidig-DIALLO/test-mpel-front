'use client';

import { useEffect, useState } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { Input } from '../ui/input';
import { Button } from '../ui/button';
import { Label } from '@radix-ui/react-label';
import { Textarea } from '../ui/textarea';
import { ProductDto } from '@/types/ProductDto';
import { toast } from 'sonner';

interface ProductFormModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialData?: ProductDto;
  isAdminMode: boolean
}
const apiBaseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;

export default function ProductFormModal({ isOpen, onClose, initialData, isAdminMode }: ProductFormModalProps) {
  const queryClient = useQueryClient();
  const initialFormState = {
    id: 0,
    name: '',
    description: '',
    price: '',
    stock: '',
    imageUrl: '',
  };

  const [formData, setFormData] = useState(initialFormState);

  useEffect(() => {
    if (initialData) {
      setFormData({
        id: initialData.id || 0,
        name: initialData.name || '',
        description: initialData.description || '',
        price: initialData.price?.toString() || '',
        stock: initialData.stock?.toString() || '',
        imageUrl: initialData.imageUrl || '',
      });
    } else {
      resetForm();
    }
  }, [initialData]);

  const resetForm = () => {
    setFormData({
      id: 0,
      name: '',
      description: '',
      price: '',
      stock: '',
      imageUrl: '',
    });
  };

  const mutation = useMutation({
    mutationFn: async (newProduct: ProductDto) => {
      const productData = { ...newProduct };
      if (!productData.imageUrl) delete productData.imageUrl;
      const url = productData?.id
        ? `${apiBaseUrl}/${productData.id}`
        : `${apiBaseUrl}/new`;
      const method = productData?.id ? 'PATCH' : 'POST';
      delete productData.id;

      const response = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json', 'isAdmin': isAdminMode.toString() },
        body: JSON.stringify(productData),
      });

      if (!response.ok) throw new Error(`Erreur lors de la ${method === 'POST' ? 'création' : 'modification'} du produit`);
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['products'] });
      resetForm();
      toast("Succès", {
        description: "Création ou modification du produit réussie.",
        className: "bg-green-500 text-white", // Utilisation de classes Tailwind CSS
        duration: 5000, // Durée d'affichage du toast
      });
      onClose();
    },
    onError: () => {
      toast("Erreur", {
        description: "Échec de la création ou la modif du produit.",
        className: "bg-red-500 text-white", // Utilisation de classes Tailwind CSS
        duration: 5000, // Durée d'affichage du toast
      });
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    mutation.mutate({
      ...formData,
      price: parseFloat(formData.price),
      stock: parseInt(formData.stock, 10),
    });
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg p-6 w-full max-w-md">
        <h2 className="text-xl font-bold mb-4">
          {initialData ? 'Modifier le produit' : 'Ajouter un produit'}
        </h2>
        <form onSubmit={handleSubmit}>
          <div className="space-y-4">
            <div>
              <Label htmlFor="name">Nom</Label>
              <Input
                id="name"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                required
              />
            </div>
            <div>
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              />
            </div>
            <div>
              <Label htmlFor="price">Prix</Label>
              <Input
                id="price"
                type="number"
                step="0.01"
                value={formData.price}
                onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                required
                min="0"
              />
            </div>
            <div>
              <Label htmlFor="stock">Stock</Label>
              <Input
                id="stock"
                type="number"
                value={formData.stock}
                onChange={(e) => setFormData({ ...formData, stock: e.target.value })}
                required
                min="0"
              />
            </div>
            <div>
              <Label htmlFor="imageUrl">URL de l&apos;image</Label>
              <Input
                id="imageUrl"
                type="url"
                value={formData.imageUrl}
                onChange={(e) => setFormData({ ...formData, imageUrl: e.target.value })}
              />
            </div>
          </div>
          <div className="mt-6 flex justify-end space-x-4">
            <Button type="button" variant="outline" onClick={onClose}>
              Annuler
            </Button>
            <Button type="submit" disabled={mutation.isPending}>
              {mutation.isPending ? 'Enregistrement...' : 'Enregistrer'}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}

import Image from "next/image";
import { Button } from "../ui/button";
import { Product } from "@/types/Product";

interface ProductDetailModalProps {
  isOpen: boolean;
  onClose: () => void;
  product?: Product
}

export default function ProductDetailModal({ isOpen, onClose, product }: ProductDetailModalProps) {
  if (!isOpen || !product) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg p-6 w-full max-w-md">
        <h2 className="text-xl text-center font-bold mb-4">{product.name}</h2>
        {product.imageUrl && (
          <div className="flex justify-center mb-4">
            <Image
              src={product.imageUrl}
              alt={product.name}
              width={150}
              height={150}
            />
          </div>
        )}
        <p className="text-center"><strong>Description:</strong> {product.description}</p>
        <p className="text-center"><strong>Prix:</strong> {product.price} €</p>
        <p className="text-center"><strong>Stock:</strong> {product.stock} unité{product.stock > 1 ? 's' : ''}</p>
        <div className="mt-4 flex justify-end">
          <Button onClick={onClose}>Fermer</Button>
        </div>
      </div>
    </div>
  );
}

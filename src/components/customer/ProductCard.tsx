'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ShoppingCart, Star } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { formatPrice } from '@/lib/utils/format';
import { useCartStore } from '@/store/cart-store';
import type { Product } from '@/types';
import { cn } from '@/lib/utils/cn';

interface ProductCardProps {
  product: Product;
  className?: string;
}

export function ProductCard({ product, className }: ProductCardProps) {
  const addItem = useCartStore((s) => s.addItem);
  const [activeImage, setActiveImage] = useState(0);

  const images =
    product.images?.length > 0
      ? product.images
      : ['/placeholder-product.jpg'];

  return (
    <div
      className={cn(
        'group flex flex-col overflow-hidden rounded-xl border border-gray-200 bg-white transition-all duration-300 hover:border-[#f97316]/50 hover:shadow-md',
        className
      )}
    >
      <Link href={`/products/${product.slug}`} className="block">
        {/* IMAGE (SHORTER HEIGHT) */}
        <div
          className="relative aspect-[3/2] bg-gray-50"
          onMouseLeave={() => setActiveImage(0)}
        >
          <Image
            src={images[activeImage]}
            alt={product.name}
            fill
            className="object-contain p-2 transition-transform duration-300 group-hover:scale-105"
          />

          {/* Discount – DIFFERENT COLOR */}
          {product.discount && (
            <span className="absolute left-2 top-2 rounded-md bg-indigo-500 px-2 py-0.5 text-[11px] font-semibold text-white shadow-sm">
              {product.discount}% OFF
            </span>
          )}

          {!product.inStock && (
            <div className="absolute inset-0 flex items-center justify-center bg-black/50 text-xs font-semibold text-white">
              Out of Stock
            </div>
          )}

          {/* Indicators */}
          {images.length > 1 && (
            <div className="absolute bottom-1 left-1/2 flex -translate-x-1/2 gap-1">
              {images.map((_, i) => (
                <span
                  key={i}
                  onMouseEnter={(e) => {
                    e.preventDefault();
                    setActiveImage(i);
                  }}
                  className={cn(
                    'h-1 w-1.5 rounded-full transition-all',
                    activeImage === i
                      ? 'w-3 bg-[#f97316]'
                      : 'bg-gray-300'
                  )}
                />
              ))}
            </div>
          )}
        </div>

        {/* CONTENT – SINGLE FLOW */}
        <div className="flex flex-col gap-1.5 px-3 py-2">
          {/* Category */}
          <span className="text-[11px] font-medium text-[#f97316]">
            {product.categoryName}
          </span>

          {/* Title + Rating (SAME ROW) */}
          <div className="flex items-start justify-between gap-2">
            <h3 className="line-clamp-2 text-sm font-semibold leading-tight text-gray-900 group-hover:text-[#f97316]">
              {product.name}
            </h3>

            <div className="flex shrink-0 items-center gap-0.5 text-xs">
              <Star className="h-3.5 w-3.5 fill-amber-400 text-amber-400" />
              <span className="font-medium">{product.rating}</span>
            </div>
          </div>

          {/* Price + B2B (SAME ROW) */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-1.5">
              <span className="text-base font-bold text-gray-900">
                {formatPrice(product.b2cPrice)}
              </span>

              {product.originalPrice && (
                <span className="text-xs text-gray-400 line-through">
                  {formatPrice(product.originalPrice)}
                </span>
              )}
            </div>

            {product.b2bPrice && (
              <span className="text-[11px] text-gray-500">
                B2B {formatPrice(product.b2bPrice)}
              </span>
            )}
          </div>
        </div>
      </Link>

      {/* ACTION */}
      <div className="px-3 pb-3">
        <Button
          size="sm"
          fullWidth
          disabled={!product.inStock}
          onClick={(e) => {
            e.preventDefault();
            if (product.inStock) addItem(product);
          }}
          className="h-9 gap-2 bg-[#f97316] text-white hover:bg-[#ea580c]"
        >
          <ShoppingCart className="h-4 w-4" />
          Add to Cart
        </Button>
      </div>
    </div>
  );
}

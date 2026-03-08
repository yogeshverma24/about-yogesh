'use client';

import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { Product, CartItem } from '@/types';

interface CartState {
  items: CartItem[];
  addItem: (product: Product, quantity?: number, vendorId?: string) => void;
  removeItem: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
  getItemCount: () => number;
  getTotalAmount: () => number;
}

export const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      items: [],
      addItem: (product, quantity = 1, vendorId) => {
        set((state) => {
          const existing = state.items.find((i) => i.product.id === product.id);
          const newItems = existing
            ? state.items.map((i) =>
                i.product.id === product.id ? { ...i, quantity: i.quantity + quantity } : i
              )
            : [
                ...state.items,
                {
                  product,
                  quantity,
                  vendorId: vendorId || product.vendor.id,
                },
              ];
          return { items: newItems };
        });
      },
      removeItem: (productId) => {
        set((state) => ({ items: state.items.filter((i) => i.product.id !== productId) }));
      },
      updateQuantity: (productId, quantity) => {
        if (quantity <= 0) {
          get().removeItem(productId);
          return;
        }
        set((state) => ({
          items: state.items.map((i) =>
            i.product.id === productId ? { ...i, quantity } : i
          ),
        }));
      },
      clearCart: () => set({ items: [] }),
      getItemCount: () => get().items.reduce((sum, i) => sum + i.quantity, 0),
      getTotalAmount: () =>
        get().items.reduce((sum, i) => sum + i.product.b2cPrice * i.quantity, 0),
    }),
    { name: 'marketplace-cart', partialize: (state) => ({ items: state.items }) }
  )
);

import React, { createContext, useContext, useReducer, ReactNode } from 'react';

export type CartItem = {
  id: string;
  name: string;
  price: number;
  image: string;
  quantity: number;
};

type CartState = { items: CartItem[]; total: number };

type Action =
  | { type: 'ADD_ITEM'; payload: Omit<CartItem, 'quantity'> }
  | { type: 'REMOVE_ITEM'; payload: { id: string } }
  | { type: 'UPDATE_QUANTITY'; payload: { id: string; quantity: number } };

function calcTotal(items: CartItem[]) {
  return items.reduce((sum, i) => sum + i.price * i.quantity, 0);
}

function cartReducer(state: CartState, action: Action): CartState {
  switch (action.type) {
    case 'ADD_ITEM': {
      const exists = state.items.find(i => i.id === action.payload.id);
      const items = exists
        ? state.items.map(i => i.id === action.payload.id ? { ...i, quantity: i.quantity + 1 } : i)
        : [...state.items, { ...action.payload, quantity: 1 }];
      return { items, total: calcTotal(items) };
    }
    case 'REMOVE_ITEM': {
      const items = state.items.filter(i => i.id !== action.payload.id);
      return { items, total: calcTotal(items) };
    }
    case 'UPDATE_QUANTITY': {
      const items = action.payload.quantity <= 0
        ? state.items.filter(i => i.id !== action.payload.id)
        : state.items.map(i => i.id === action.payload.id ? { ...i, quantity: action.payload.quantity } : i);
      return { items, total: calcTotal(items) };
    }
    default: return state;
  }
}

const CartContext = createContext<{ state: CartState; dispatch: React.Dispatch<Action> } | undefined>(undefined);

export function CartProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(cartReducer, { items: [], total: 0 });
  return <CartContext.Provider value={{ state, dispatch }}>{children}</CartContext.Provider>;
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error('useCart must be used within CartProvider');
  return ctx;
}
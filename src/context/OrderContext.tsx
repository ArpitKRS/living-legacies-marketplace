import React, { createContext, useContext, useState, useEffect } from 'react';
import { DeliveryTracking, Product, DeliveryStatus } from '@/types/product';

interface Order {
  id: string;
  products: Product[];
  totalAmount: number;
  placedAt: string;
  tracking: DeliveryTracking;
}

interface OrderContextType {
  orders: Order[];
  addOrder: (products: Product[], totalAmount: number) => Order;
  getOrderById: (orderId: string) => Order | undefined;
  updateOrderStatus: (orderId: string, status: DeliveryStatus, progress: number, message: string) => void;
}

const OrderContext = createContext<OrderContextType | undefined>(undefined);

export const OrderProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [orders, setOrders] = useState<Order[]>(() => {
    const saved = localStorage.getItem('afterlife-orders');
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem('afterlife-orders', JSON.stringify(orders));
  }, [orders]);

  const addOrder = (products: Product[], totalAmount: number): Order => {
    const now = new Date();
    const estimatedArrival = new Date(now.getTime() + 7 * 24 * 60 * 60 * 1000);
    const orderId = `ORD-${Date.now()}`;
    
    const tracking: DeliveryTracking = {
      orderId,
      product: products[0],
      status: 'farewell',
      statusHistory: [
        {
          status: 'farewell',
          date: now.toISOString(),
          message: `${products[0].name} is being carefully prepared for its journey to you`
        }
      ],
      estimatedArrival: estimatedArrival.toISOString(),
      currentLocation: products[0].currentLocation,
      journeyProgress: 15
    };

    const newOrder: Order = {
      id: orderId,
      products,
      totalAmount,
      placedAt: now.toISOString(),
      tracking
    };

    setOrders(prev => [newOrder, ...prev]);
    return newOrder;
  };

  const getOrderById = (orderId: string): Order | undefined => {
    return orders.find(order => order.id === orderId);
  };

  const updateOrderStatus = (orderId: string, status: DeliveryStatus, progress: number, message: string) => {
    setOrders(prev => prev.map(order => {
      if (order.id === orderId) {
        return {
          ...order,
          tracking: {
            ...order.tracking,
            status,
            journeyProgress: progress,
            statusHistory: [
              ...order.tracking.statusHistory,
              {
                status,
                date: new Date().toISOString(),
                message
              }
            ]
          }
        };
      }
      return order;
    }));
  };

  return (
    <OrderContext.Provider value={{ orders, addOrder, getOrderById, updateOrderStatus }}>
      {children}
    </OrderContext.Provider>
  );
};

export const useOrders = () => {
  const context = useContext(OrderContext);
  if (!context) {
    throw new Error('useOrders must be used within an OrderProvider');
  }
  return context;
};

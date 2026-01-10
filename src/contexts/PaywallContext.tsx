import { createContext, useContext, useState, ReactNode } from 'react';

interface PaywallContextType {
  paywallDismissed: boolean;
  showPaywall: boolean;
  dismissPaywall: () => void;
  triggerPaywall: () => void;
  closePaywall: () => void;
}

const PaywallContext = createContext<PaywallContextType | undefined>(undefined);

export function PaywallProvider({ children }: { children: ReactNode }) {
  const [paywallDismissed, setPaywallDismissed] = useState(false);
  const [showPaywall, setShowPaywall] = useState(false);

  const dismissPaywall = () => {
    setPaywallDismissed(true);
    setShowPaywall(false);
  };

  const triggerPaywall = () => {
    setShowPaywall(true);
  };

  const closePaywall = () => {
    setShowPaywall(false);
  };

  return (
    <PaywallContext.Provider value={{ 
      paywallDismissed, 
      showPaywall, 
      dismissPaywall, 
      triggerPaywall,
      closePaywall 
    }}>
      {children}
    </PaywallContext.Provider>
  );
}

export function usePaywall() {
  const context = useContext(PaywallContext);
  if (context === undefined) {
    throw new Error('usePaywall must be used within a PaywallProvider');
  }
  return context;
}

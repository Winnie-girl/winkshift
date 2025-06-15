
import { useCallback, useContext, useState, createContext } from "react";

type ModalState = {
  isOpen: boolean;
  serviceType: string;
  source: string;
  initialEmail?: string;
};

const ConsultationModalContext = createContext<{
  open: (serviceType: string, source: string, initialEmail?: string) => void;
  close: () => void;
  state: ModalState;
}>({
  open: () => {},
  close: () => {},
  state: { isOpen: false, serviceType: "", source: "" },
});

export function ConsultationModalProvider({ children }: { children: React.ReactNode }) {
  const [state, setState] = useState<ModalState>({ isOpen: false, serviceType: "", source: "" });

  const open = useCallback((serviceType: string, source: string, initialEmail?: string) => {
    setState({ isOpen: true, serviceType, source, initialEmail });
  }, []);

  const close = useCallback(() => {
    setState((s) => ({ ...s, isOpen: false }));
  }, []);

  return (
    <ConsultationModalContext.Provider value={{ open, close, state }}>
      {children}
    </ConsultationModalContext.Provider>
  );
}

export function useConsultationModal() {
  return useContext(ConsultationModalContext);
}


import { useCallback, useContext, useState, createContext } from "react";

type ModalState = {
  isOpen: boolean;
  serviceType: string;
  source: string;
  initialEmail?: string;
};

type ConsultationModalContextType = {
  open: (serviceType: string, source: string, initialEmail?: string) => void;
  close: () => void;
  state: ModalState;
};

const ConsultationModalContext = createContext<ConsultationModalContextType>({
  open: () => {},
  close: () => {},
  state: { isOpen: false, serviceType: "", source: "" },
});

export function ConsultationModalProvider({ children }: { children: React.ReactNode }) {
  const [state, setState] = useState<ModalState>({
    isOpen: false,
    serviceType: "",
    source: "",
    initialEmail: undefined,
  });

  const open = useCallback(
    (serviceType: string, source: string, initialEmail?: string) => {
      setState({
        isOpen: true,
        serviceType,
        source,
        initialEmail,
      });
    },
    []
  );

  const close = useCallback(() => {
    setState((prev) => ({
      ...prev,
      isOpen: false,
    }));
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

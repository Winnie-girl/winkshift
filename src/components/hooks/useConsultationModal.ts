
import { createContext, useContext, useState, useCallback, ReactNode } from "react";

type ModalType = "quick_contact" | "detailed_consultation" | "newsletter" | "general" | "automation" | "consulting";

type ModalState = {
  isOpen: boolean;
  modalType: ModalType;
  source: string;
  initialEmail?: string;
};

type ConsultationModalContextType = {
  open: (modalType: ModalType, source: string, initialEmail?: string) => void;
  close: () => void;
  state: ModalState;
};

const ConsultationModalContext = createContext<ConsultationModalContextType>({
  open: () => {},
  close: () => {},
  state: { isOpen: false, modalType: "general", source: "" },
});

type ConsultationModalProviderProps = {
  children: ReactNode;
};

export function ConsultationModalProvider({ children }: ConsultationModalProviderProps) {
  const [state, setState] = useState<ModalState>({
    isOpen: false,
    modalType: "general",
    source: "",
    initialEmail: undefined,
  });

  const open = useCallback(
    (modalType: ModalType, source: string, initialEmail?: string) => {
      setState({
        isOpen: true,
        modalType,
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

  const value = {
    open,
    close,
    state,
  };

  return (
    <ConsultationModalContext.Provider value={value}>
      {children}
    </ConsultationModalContext.Provider>
  );
}

export function useConsultationModal() {
  const context = useContext(ConsultationModalContext);
  if (!context) {
    throw new Error("useConsultationModal must be used within a ConsultationModalProvider");
  }
  return context;
}

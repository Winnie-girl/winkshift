
import { useCallback, useContext, useState, createContext } from "react";

type ModalType = "quick_contact" | "detailed_consultation" | "newsletter" | "general";

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

export function ConsultationModalProvider({
  children,
}: {
  children: React.ReactNode;
}) {
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

  return (
    <ConsultationModalContext.Provider value={{ open, close, state }}>
      {children}
    </ConsultationModalContext.Provider>
  );
}

export function useConsultationModal() {
  return useContext(ConsultationModalContext);
}

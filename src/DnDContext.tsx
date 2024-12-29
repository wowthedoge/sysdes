import { createContext, useContext, useState, ReactNode, Dispatch, SetStateAction } from "react";

type DnDContextType = [string | null, Dispatch<SetStateAction<string | null>>];

const DnDContext = createContext<DnDContextType>([null, () => {}]);

interface DnDProviderProps {
    children: ReactNode;
}

export const DnDProvider = ({ children }: DnDProviderProps) => {
    const [type, setType] = useState<string | null>(null);

    return (
        <DnDContext.Provider value={[type, setType]}>
            {children}
        </DnDContext.Provider>
    );
};

export default DnDContext;

export const useDnD = (): DnDContextType => {
    return useContext(DnDContext);
};

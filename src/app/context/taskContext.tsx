"use client"

import { createContext, useContext, useState } from "react";

type reloadContext = {
    reload: boolean;
    reloadTable: () => void
}

export const ReloadContext = createContext<reloadContext>({} as reloadContext);

export function useReloadContext() {
    return useContext(ReloadContext);
}

export function ReloadProvider({ children }: {children: React.ReactNode}){
    const [reload, setReload] = useState(false);

    const reloadTable = () => {
        setReload(!reload);
    }

    return(
        <ReloadContext.Provider value={{reload, reloadTable}}>
            {children}
        </ReloadContext.Provider>
    )
}
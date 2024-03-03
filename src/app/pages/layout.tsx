import MainProvider from "@/provider/mainProvider";

export default function PagesLayout({ children }: { children: React.ReactNode }){
    return <MainProvider>
        {children}
    </MainProvider>
}
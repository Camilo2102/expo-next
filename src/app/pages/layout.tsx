import MainProvider from "@/app/provider/mainProvider";

export default function PagesLayout({ children }: { children: React.ReactNode }){
    return (
        <MainProvider>
            {children}
        </MainProvider>
    )
}
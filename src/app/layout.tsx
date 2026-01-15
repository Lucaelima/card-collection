import { GlobalStyles } from "@/components/GlobalStyles";
import { NavBar } from "@/components/NavBar";
import { Nunito } from "next/font/google";
import StyledComponentsRegistry from "./registry";

export const metadata = {
    title: "Card",
    description: "",
};

const nunito = Nunito({
    weight: ["400", "500", "700"],
    subsets: ["latin"],
    display: "swap",
});

export default function RootLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <html lang="pt-br" className={nunito.className}>
            <body>
                <StyledComponentsRegistry>
                    <GlobalStyles />
                    <NavBar />
                    {children}
                </StyledComponentsRegistry>
            </body>
        </html>
    )
}
import React from "react";
import Navbar from "../Navbar/Navbar";
import Footer from "../Footer/Footer";
import ChatMenu from "@/Components/ChatMenu";
import Brands from "../brands/Brands";


export default function AppLayout({ children }) {

    return (
        <>
            <Navbar />
            <main className="pt-29">{children}</main>
            <Brands />
            <Footer />
            <ChatMenu />
        </>
    )
}

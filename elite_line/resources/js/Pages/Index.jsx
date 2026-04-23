import React from "react";
import Home from "./Home/Home"
import AppLayout from "./Layout/AppLayout";

export default function Index() {

return <Home />;

}

Index.layout = page => <AppLayout>{page}</AppLayout>

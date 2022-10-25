import { Outlet } from "react-router-dom";

export default function Layout() {
    return (
        <main className="flex-shrink-0">
            <Outlet />
        </main>
    )
}
import React from "react";
import Link from "next/link";

export default function Header() {
    return (
        <header className="bg-blue-900">
            <div className="container h-16  flex justify-between items-center">
                <div className="logo text-white">
                    <h2 className="text-white font-semibold">Inventory<span className="text-color-secondary">-S3Corp</span></h2>
                </div>
                <nav>
                    <ul>
                        <li>
                            <Link href="/" className="text-white">Home</Link>
                        </li>
                        <li>
                            <Link href="/register" className="text-white">Sign-Up</Link>
                        </li>
                        <li>
                            <Link href="/login" className="text-white">Login</Link>
                        </li>
                    </ul>
                </nav>
            </div>
        </header>
    );
}

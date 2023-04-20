import Link from "next/link"
function Header() {
    return (
        <header className="flex justify-center align-middle py-4">
            <ul className="flex justify-center gap-4">
                <li>
                    <Link href="/">
                        Home
                    </Link>
                </li>
                <li>
                    <Link href="/about">
                        About
                    </Link>
                </li>

            </ul>

        </header>
    )
}

export default Header
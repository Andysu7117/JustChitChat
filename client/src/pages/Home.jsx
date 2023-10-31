import logo from "../assets/images/cat_logo.png"

export default function Home() {
    return (
    <main>
        <div className="mx-auto max-w-7xl py-6 sm:px-6 lg:px-8 min-h-screen justify-center">
            <img
              className="mx-auto h-10 w-auto mt-10"
              src={logo}
              alt="Your Company"
            />
            <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-darkestpink">
              Welcome to JustChitChat the place to just Chit Chat
            </h2>
        </div>
    </main>
    )
}
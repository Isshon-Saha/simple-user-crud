import Link from "next/link";

const MainPage = () => {
	return (
		<main className="flex min-h-screen flex-col items-center justify-between p-24">
			<p className="text-3xl font-medium">
				Head over 
				<Link className="text-blue-500 cursor-pointer" href="/api/users"> here </Link>
				to get started
			</p>
		</main>
	)
}

export default MainPage;
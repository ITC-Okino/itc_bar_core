import Link from "next/link";

export default function AdminLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<div className="min-h-screen bg-gray-100 dark:bg-zinc-900 text-gray-900 dark:text-gray-100">
			<nav className="bg-white dark:bg-zinc-800 border-b border-gray-200 dark:border-zinc-700 px-6 py-4">
				<div className="max-w-7xl mx-auto flex items-center justify-between">
					<div className="flex items-center gap-8">
						<Link href="/admin" className="text-xl font-bold">
							管理ダッシュボード
						</Link>
						<div className="flex gap-4 text-sm font-medium">
							<Link
								href="/admin"
								className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
							>
								ボトル一覧
							</Link>
							<Link
								href="/"
								className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
								target="_blank"
							>
								サイトを見る ↗
							</Link>
						</div>
					</div>
				</div>
			</nav>
			<main className="max-w-7xl mx-auto px-6 py-8">{children}</main>
		</div>
	);
}

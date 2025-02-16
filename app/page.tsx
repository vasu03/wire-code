"use client";
import Image from "next/image";
import Link from "next/link";
import Authentication from "./_components/Authentication";
import { Button } from "@/components/ui/button";
import { auth } from "@/configs/firebaseConfig";
import ProfileAvatar from "./_components/ProfileAvatar";
import { useAuthContext } from "./provider";

export default function Home() {
	// const user = auth?.currentUser;
	// console.log(user)
	const user = useAuthContext();
	console.log(user?.user);
	return (
		<div>
			<header className="flex flex-wrap sm:justify-start sm:flex-nowrap py-2 px-2 z-50 w-full bg-white text-sm dark:bg-neutral-800 dark:border-neutral-700">
				<nav
					className="relative max-w-[95rem] w-full mx-auto sm:flex sm:items-center sm:justify-between"
					aria-label="Global"
				>
					<div className="flex items-center justify-between">
						<div>
							<Image src={"/logo.svg"} alt="logo" width={200} height={200} />
						</div>
					</div>
					<div
						id="navbar-collapse-with-animation"
						className="hs-collapse hidden overflow-hidden transition-all duration-300 basis-full grow sm:block"
					>
						<div className="flex flex-col sm:flex-row sm:items-center sm:justify-end sm:ps-7">
							{!user?.user?.email ? (
								<Authentication>
									<Button variant={"ghost"} className="font-medium text-base cursor-pointer text-gray-500 hover:text-blue-600 dark:text-neutral-400 dark:hover:text-blue-500">
										Sign In
									</Button>
								</Authentication>
							) : (
								<ProfileAvatar />
							)}
						</div>
					</div>
				</nav>
			</header>

			<div className="h-[65vh] relative overflow-hidden before:absolute before:top-0 before:h-[90vh] before:start-1/2 before:bg-[url('/hero-polygon-bg-light.svg')] dark:before:bg-[url('/hero-polygon-bg-dark.svg')] before:bg-no-repeat before:bg-top before:bg-cover before:size-full before:-z-[1] before:transform before:-translate-x-1/2">
				<div className="flex flex-col items-center justify-center h-full max-w-[90rem] mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-10">
					<div className="mt-5 max-w-6xl text-center mx-auto">
						<h1 className="font-bold text-gray-800 text-3xl md:text-4xl lg:text-6xl dark:text-neutral-200">
							Design{" "}
							<span className="bg-clip-text bg-gradient-to-bl from-blue-600 to-violet-600 text-transparent">
								Faster
							</span>
							. Code{" "}
							<span className="bg-clip-text bg-gradient-to-bl from-blue-600 to-violet-600 text-transparent">
								Smarter
							</span>
							.
						</h1>
					</div>

					<div className="mt-5 max-w-3xl text-center mx-auto">
						<p className="text-lg text-gray-600 dark:text-neutral-400">
							WireCode instantly converts your wireframes into clean,
							production-ready code. Powered by AI, it streamlines development,
							eliminates manual coding, and accelerates your workflow—so you can
							build faster and smarter.
						</p>
					</div>

					<div className="my-4 flex gap-4">
						{user?.user ? (
							<Link href={"/playground"}>
								<Button size={"default"}>Go To Playground</Button>
							</Link>
						) : (
							<Authentication>
								<Button size={"default"}>Get Started</Button>
							</Authentication>
						)}
					</div>
				</div>
			</div>

			<div className="max-w-[90rem] px-4 py-8 sm:px-6 lg:px-8 lg:py-0 mx-auto">
				<div className="grid sm:grid-cols-2 lg:grid-cols-4 items-center gap-2">
					<a
						className="group flex flex-col justify-center hover:bg-gray-50 rounded-xl p-4 md:p-7 dark:hover:bg-neutral-800"
						href="#"
					>
						<div className="flex justify-center items-center size-12 bg-blue-600 rounded-xl">
							<svg
								className="flex-shrink-0 size-6 text-white"
								xmlns="http://www.w3.org/2000/svg"
								width="24"
								height="24"
								viewBox="0 0 24 24"
								fill="none"
								stroke="currentColor"
								strokeWidth="2"
								strokeLinecap="round"
								strokeLinejoin="round"
							>
								<rect width="10" height="14" x="3" y="8" rx="2" />
								<path d="M5 4a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v16a2 2 0 0 1-2 2h-2.4" />
								<path d="M8 18h.01" />
							</svg>
						</div>
						<div className="mt-5">
							<h3 className="group-hover:text-gray-600 text-lg font-semibold text-gray-800 dark:text-white dark:group-hover:text-gray-400">
								25+ templates
							</h3>
							<p className="mt-1 text-gray-600 dark:text-neutral-400">
								Responsive, and mobile-first project on the web
							</p>
							<span className="mt-2 inline-flex items-center gap-x-1.5 text-sm text-blue-600 decoration-2 group-hover:underline font-medium">
								Learn more
								<svg
									className="flex-shrink-0 size-4"
									xmlns="http://www.w3.org/2000/svg"
									width="24"
									height="24"
									viewBox="0 0 24 24"
									fill="none"
									stroke="currentColor"
									strokeWidth="2"
									strokeLinecap="round"
									strokeLinejoin="round"
								>
									<path d="m9 18 6-6-6-6" />
								</svg>
							</span>
						</div>
					</a>

					<a
						className="group flex flex-col justify-center hover:bg-gray-50 rounded-xl p-4 md:p-7 dark:hover:bg-neutral-800"
						href="#"
					>
						<div className="flex justify-center items-center size-12 bg-blue-600 rounded-xl">
							<svg
								className="flex-shrink-0 size-6 text-white"
								xmlns="http://www.w3.org/2000/svg"
								width="24"
								height="24"
								viewBox="0 0 24 24"
								fill="none"
								stroke="currentColor"
								strokeWidth="2"
								strokeLinecap="round"
								strokeLinejoin="round"
							>
								<path d="M20 7h-9" />
								<path d="M14 17H5" />
								<circle cx="17" cy="17" r="3" />
								<circle cx="7" cy="7" r="3" />
							</svg>
						</div>
						<div className="mt-5">
							<h3 className="group-hover:text-gray-600 text-lg font-semibold text-gray-800 dark:text-white dark:group-hover:text-gray-400">
								Customizable
							</h3>
							<p className="mt-1 text-gray-600 dark:text-neutral-400">
								Components are easily customized and extendable
							</p>
							<span className="mt-2 inline-flex items-center gap-x-1.5 text-sm text-blue-600 decoration-2 group-hover:underline font-medium">
								Learn more
								<svg
									className="flex-shrink-0 size-4"
									xmlns="http://www.w3.org/2000/svg"
									width="24"
									height="24"
									viewBox="0 0 24 24"
									fill="none"
									stroke="currentColor"
									strokeWidth="2"
									strokeLinecap="round"
									strokeLinejoin="round"
								>
									<path d="m9 18 6-6-6-6" />
								</svg>
							</span>
						</div>
					</a>

					<a
						className="group flex flex-col justify-center hover:bg-gray-50 rounded-xl p-4 md:p-7 dark:hover:bg-neutral-800"
						href="#"
					>
						<div className="flex justify-center items-center size-12 bg-blue-600 rounded-xl">
							<svg
								className="flex-shrink-0 size-6 text-white"
								xmlns="http://www.w3.org/2000/svg"
								width="24"
								height="24"
								viewBox="0 0 24 24"
								fill="none"
								stroke="currentColor"
								strokeWidth="2"
								strokeLinecap="round"
								strokeLinejoin="round"
							>
								<path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z" />
								<path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z" />
							</svg>
						</div>
						<div className="mt-5">
							<h3 className="group-hover:text-gray-600 text-lg font-semibold text-gray-800 dark:text-white dark:group-hover:text-gray-400">
								Free to Use
							</h3>
							<p className="mt-1 text-gray-600 dark:text-neutral-400">
								Every component and plugin is well documented
							</p>
							<span className="mt-2 inline-flex items-center gap-x-1.5 text-sm text-blue-600 decoration-2 group-hover:underline font-medium">
								Learn more
								<svg
									className="flex-shrink-0 size-4"
									xmlns="http://www.w3.org/2000/svg"
									width="24"
									height="24"
									viewBox="0 0 24 24"
									fill="none"
									stroke="currentColor"
									strokeWidth="2"
									strokeLinecap="round"
									strokeLinejoin="round"
								>
									<path d="m9 18 6-6-6-6" />
								</svg>
							</span>
						</div>
					</a>

					<a
						className="group flex flex-col justify-center hover:bg-gray-50 rounded-xl p-4 md:p-7 dark:hover:bg-neutral-800"
						href="#"
					>
						<div className="flex justify-center items-center size-12 bg-blue-600 rounded-xl">
							<svg
								className="flex-shrink-0 size-6 text-white"
								xmlns="http://www.w3.org/2000/svg"
								width="24"
								height="24"
								viewBox="0 0 24 24"
								fill="none"
								stroke="currentColor"
								strokeWidth="2"
								strokeLinecap="round"
								strokeLinejoin="round"
							>
								<path d="M14 9a2 2 0 0 1-2 2H6l-4 4V4c0-1.1.9-2 2-2h8a2 2 0 0 1 2 2v5Z" />
								<path d="M18 9h2a2 2 0 0 1 2 2v11l-4-4h-6a2 2 0 0 1-2-2v-1" />
							</svg>
						</div>
						<div className="mt-5">
							<h3 className="group-hover:text-gray-600 text-lg font-semibold text-gray-800 dark:text-white dark:group-hover:text-gray-400">
								24/7 Support
							</h3>
							<p className="mt-1 text-gray-600 dark:text-neutral-400">
								Contact us 24 hours a day, 7 days a week
							</p>
							<span className="mt-2 inline-flex items-center gap-x-1.5 text-sm text-blue-600 decoration-2 group-hover:underline font-medium">
								Learn more
								<svg
									className="flex-shrink-0 size-4"
									xmlns="http://www.w3.org/2000/svg"
									width="24"
									height="24"
									viewBox="0 0 24 24"
									fill="none"
									stroke="currentColor"
									strokeWidth="2"
									strokeLinecap="round"
									strokeLinejoin="round"
								>
									<path d="m9 18 6-6-6-6" />
								</svg>
							</span>
						</div>
					</a>
				</div>
			</div>
		</div>
	);
}

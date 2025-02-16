// Importing required modules
import React from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";

// Importing UI components
import {
	Sidebar,
	SidebarContent,
	SidebarFooter,
	SidebarGroup,
	SidebarGroupContent,
	SidebarHeader,
	SidebarMenu,
	SidebarMenuButton,
	SidebarMenuItem,
} from "@/components/ui/sidebar";

// Importing Icons
import { SquareDashedMousePointer, CoinsIcon, LayoutPanelTopIcon } from "lucide-react";

// List of Sidebar navigation links
const items = [
	{
		title: "Playground",
		url: "/playground",
		icon: SquareDashedMousePointer,
	},
	{
		title: "Designs",
		url: "/designs",
		icon: LayoutPanelTopIcon,
	},
	{
		title: "Credits",
		url: "/credits",
		icon: CoinsIcon,
	},
];

// Creating a global App Sidebar component
const AppSidebar = () => {
	// hook to extract the browser location
	const currPath = usePathname();

	// TSX to render the component
	return (
		<Sidebar>
			<SidebarHeader>
				<div className="p-4">
					<Image
						src={"./logo.svg"}
						alt="logo"
						width={100}
						height={100}
						className="w-[80%] h-full mx-auto"
					/>
				</div>
			</SidebarHeader>
			<SidebarContent>
				<SidebarGroup>
					<SidebarGroupContent>
						<SidebarMenu className="mt-5">
							{items.map((item, index) => (
								<SidebarMenuItem key={item.title} className="my-[2px] rounded-md">
									<SidebarMenuButton asChild className="h-12 rounded-md">
										<Link href={item.url} key={index} className={`px-2 w-full h-fullflex gap-2 items-center text-gray-700 font-medium hover:!text-blue-600 hover:bg-gray-100 rounded-md ${currPath === item.url && "!text-blue-600"}`} >
											<item.icon className="!h-5 !w-5" />
											<span className="text-base">{item.title}</span>
										</Link>
									</SidebarMenuButton>
								</SidebarMenuItem>
							))}
						</SidebarMenu>
					</SidebarGroupContent>
				</SidebarGroup>
			</SidebarContent>
			<SidebarFooter>
				<h2 className="p-2 text-gray-400 text-sm mx-auto">&copy; {new Date(Date.now()).getFullYear()} WireCode Inc.</h2>
			</SidebarFooter>
		</Sidebar>
	);
};

// Exporting the component
export default AppSidebar;
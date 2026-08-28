import {
    Sidebar,
    SidebarContent,
    SidebarGroup,
    SidebarGroupContent,
    SidebarGroupLabel,
    SidebarMenu,
    SidebarRail,
} from "../ui/sidebar";

import { useLocation } from "react-router-dom";
import { LinkSidebar } from "../nav/Link";
import { menuItems } from "@/lib/menus";
import { usePermission } from "@/hooks/usePermission";

export default function AppSidebar() {
    const { pathname } = useLocation();
    const { can } = usePermission();

    const visibleMenuItems = menuItems.filter(
        (item) =>
            !item.permission ||
            can(item.permission)
    );

    return (
        <Sidebar collapsible="icon">
            <SidebarContent>
                <SidebarGroup>
                    <SidebarGroupLabel className="text-xl h-12 flex gap-2 text-primary dark:text-primary font-bold justify-center">
                        ELITE ACADEMY
                    </SidebarGroupLabel>

                    <SidebarGroupContent>
                        <SidebarMenu>
                            {visibleMenuItems.map((item) => (
                                <LinkSidebar
                                    key={item.url}
                                    to={item.url}
                                    icon={item.icon}
                                    title={item.title}
                                    isActive={
                                        pathname === item.url ||
                                        pathname.startsWith(`${item.url}/`)
                                    }
                                />
                            ))}
                        </SidebarMenu>
                    </SidebarGroupContent>
                </SidebarGroup>
            </SidebarContent>

            <SidebarRail />
        </Sidebar>
    );
}

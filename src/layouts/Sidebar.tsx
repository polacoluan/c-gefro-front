import {
  Building2,
  Car,
  CarFront,
  CarIcon,
  Castle,
  ChartNetwork,
  Fuel,
  Home,
  KeySquare,
  PaintRoller,
  Settings,
  Type,
  Warehouse,
} from "lucide-react";

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import Link from "next/link";

const items = [
  {
    title: "Inicio",
    url: "/",
    icon: Home,
  },
  {
    title: "Veículos",
    url: "/vehicles",
    icon: CarIcon,
  },
  {
    title: "Tipos",
    url: "/type",
    icon: Type,
  },
  {
    title: "Marcas",
    url: "/mark",
    icon: CarFront,
  },
  {
    title: "Modelos",
    url: "/model",
    icon: Car,
  },
  {
    title: "Cores",
    url: "/color",
    icon: PaintRoller,
  },
  {
    title: "Orgãos",
    url: "/company",
    icon: Building2,
  },
  {
    title: "Frotas",
    url: "/fleet",
    icon: KeySquare,
  },
  {
    title: "Combustíveis",
    url: "/fuel",
    icon: Fuel,
  },
  {
    title: "Origens",
    url: "/origin",
    icon: Warehouse,
  },
  {
    title: "Sub Unidades",
    url: "/sub-unity",
    icon: Castle,
  },
  {
    title: "Status",
    url: "/status",
    icon: ChartNetwork,
  },
  {
    title: "Manutenções",
    url: "/maintenance",
    icon: Settings,
  },
];

export function AppSidebar() {
  return (
    <Sidebar>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Aplicação</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <Link href={item.url}>
                      <item.icon />
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}

"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  HomeIcon,
  UsersIcon,
  CurrencyDollarIcon,
  SparklesIcon,
  BuildingOfficeIcon,
  ChatBubbleLeftRightIcon,
  QuestionMarkCircleIcon,
  DocumentTextIcon,
  Cog6ToothIcon,
  PhotoIcon,
  EnvelopeIcon,
  ClipboardDocumentListIcon,
  BriefcaseIcon,
  ChartBarIcon,
  ArrowLeftOnRectangleIcon,
  Bars3Icon,
  XMarkIcon,
  ChevronDownIcon,
  ChevronRightIcon
} from "@heroicons/react/24/outline";

interface MenuItem {
  name: string;
  href?: string;
  icon: any;
  badge?: string;
  children?: MenuItem[];
}

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [user, setUser] = useState<any>(null);
  const [expandedMenus, setExpandedMenus] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(
    () => {
      // Check authentication
      const token = localStorage.getItem("accessToken");
      if (!token) {
        router.push("/login");
        return;
      }

      // Get user profile
      const fetchProfile = async () => {
        try {
          const response = await fetch("/api/proxy?endpoint=/api/v1/auth/me", {
            headers: {
              Authorization: `Bearer ${token}`
            }
          });

          if (response.ok) {
            const data = await response.json();
            if (data.success) {
              setUser(data.data);
              setIsLoading(false);
            } else {
              localStorage.removeItem("accessToken");
              localStorage.removeItem("refreshToken");
              router.push("/login");
            }
          } else {
            localStorage.removeItem("accessToken");
            localStorage.removeItem("refreshToken");
            router.push("/login");
          }
        } catch (error) {
          console.error("Error fetching profile:", error);
          localStorage.removeItem("accessToken");
          localStorage.removeItem("refreshToken");
          router.push("/login");
        }
      };

      fetchProfile();
    },
    [router]
  );

  const handleLogout = () => {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
    router.push("/login");
  };

  const toggleMenu = (menuName: string) => {
    setExpandedMenus(prev => (prev.includes(menuName) ? prev.filter(name => name !== menuName) : [...prev, menuName]));
  };

  const menuItems: MenuItem[] = [
    {
      name: "Dashboard",
      href: "/admin",
      icon: HomeIcon
    },
    {
      name: "User Management",
      href: "/admin/users",
      icon: UsersIcon
    },
    {
      name: "Pricing Plans",
      href: "/admin/pricing-plans",
      icon: CurrencyDollarIcon
    },
    {
      name: "Content Management",
      icon: DocumentTextIcon,
      children: [
        { name: "Features", href: "/admin/features", icon: SparklesIcon },
        { name: "Partners", href: "/admin/partners", icon: BuildingOfficeIcon },
        { name: "Testimonials", href: "/admin/testimonials", icon: ChatBubbleLeftRightIcon },
        { name: "FAQs", href: "/admin/faqs", icon: QuestionMarkCircleIcon },
        { name: "FAQ Categories", href: "/admin/faq-categories", icon: QuestionMarkCircleIcon }
      ]
    },
    {
      name: "Homepage Sections",
      icon: HomeIcon,
      children: [
        { name: "Benefit Stats", href: "/admin/benefit-stats", icon: ChartBarIcon },
        { name: "Process Steps", href: "/admin/process-steps", icon: ClipboardDocumentListIcon },
        { name: "ERP Benefits", href: "/admin/erp-benefits", icon: SparklesIcon },
        { name: "About Cards", href: "/admin/about-cards", icon: DocumentTextIcon },
        { name: "Advanced Features", href: "/admin/advanced-features", icon: SparklesIcon },
        { name: "KelolaAja Features", href: "/admin/kelolaaja-features", icon: SparklesIcon }
      ]
    },
    {
      name: "Industries",
      href: "/admin/industries",
      icon: BriefcaseIcon
    },
    {
      name: "Feature Pages",
      href: "/admin/feature-pages",
      icon: DocumentTextIcon
    },
    {
      name: "Media Files",
      href: "/admin/media-files",
      icon: PhotoIcon
    },
    {
      name: "Contact Submissions",
      href: "/admin/contact-submissions",
      icon: EnvelopeIcon
    },
    {
      name: "Audit Logs",
      href: "/admin/audit-logs",
      icon: ClipboardDocumentListIcon
    },
    {
      name: "Analytics",
      href: "/admin/analytics",
      icon: ChartBarIcon
    },
    {
      name: "Site Configuration",
      href: "/admin/site-config",
      icon: Cog6ToothIcon
    }
  ];

  const isActive = (href?: string) => {
    if (!href) return false;
    // Exact match for dashboard to prevent it being active on all admin pages
    if (href === "/admin") {
      return pathname === "/admin";
    }
    // For other pages, check exact match or if it starts with the href
    return pathname === href || pathname.startsWith(href + "/");
  };

  // Show loading state
  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-[#039edb]" />
          <p className="mt-4 text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Mobile sidebar */}
      <div className={`fixed inset-0 z-40 lg:hidden ${sidebarOpen ? "block" : "hidden"}`}>
        <div className="fixed inset-0 bg-gray-600 bg-opacity-75" onClick={() => setSidebarOpen(false)} />
        <div className="fixed inset-y-0 left-0 flex w-64 flex-col bg-white">
          <div className="flex h-16 items-center justify-between px-4 border-b">
            <span className="text-xl font-bold bg-gradient-to-r from-[#039edb] to-[#71bf44] bg-clip-text text-transparent">
              KelolaAja Admin
            </span>
            <button onClick={() => setSidebarOpen(false)} className="text-gray-500 hover:text-gray-700">
              <XMarkIcon className="h-6 w-6" />
            </button>
          </div>
          <div className="flex-1 overflow-y-auto">
            <SidebarMenu menuItems={menuItems} isActive={isActive} expandedMenus={expandedMenus} toggleMenu={toggleMenu} />
          </div>
        </div>
      </div>

      {/* Desktop sidebar */}
      <div className="hidden lg:fixed lg:inset-y-0 lg:flex lg:w-64 lg:flex-col">
        <div className="flex flex-col flex-1 min-h-0 bg-white border-r">
          <div className="flex items-center h-16 px-4 border-b">
            <Link
              href="/admin"
              className="text-xl font-bold bg-gradient-to-r from-[#039edb] to-[#71bf44] bg-clip-text text-transparent"
            >
              KelolaAja Admin
            </Link>
          </div>
          <div className="flex-1 overflow-y-auto">
            <SidebarMenu menuItems={menuItems} isActive={isActive} expandedMenus={expandedMenus} toggleMenu={toggleMenu} />
          </div>
          {user && (
            <div className="flex-shrink-0 p-4 border-t">
              <div className="flex items-center">
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-gray-900 truncate">{user.fullName}</p>
                  <p className="text-xs text-gray-500 truncate">{user.email}</p>
                  <p className="text-xs bg-gradient-to-r from-[#039edb] to-[#71bf44] bg-clip-text text-transparent font-semibold">
                    {user.role}
                  </p>
                </div>
              </div>
              <button
                onClick={handleLogout}
                className="mt-3 w-full flex items-center justify-center px-4 py-2 text-sm font-medium text-white bg-gradient-to-r from-red-500 to-red-600 rounded-md hover:opacity-90 transition"
              >
                <ArrowLeftOnRectangleIcon className="h-5 w-5 mr-2" />
                Logout
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Main content */}
      <div className="lg:pl-64 flex flex-col flex-1">
        <div className="sticky top-0 z-10 flex h-16 bg-white border-b lg:hidden">
          <button onClick={() => setSidebarOpen(true)} className="px-4 text-gray-500 focus:outline-none lg:hidden">
            <Bars3Icon className="h-6 w-6" />
          </button>
          <div className="flex items-center flex-1 px-4">
            <span className="text-xl font-bold bg-gradient-to-r from-[#039edb] to-[#71bf44] bg-clip-text text-transparent">
              KelolaAja Admin
            </span>
          </div>
        </div>

        <main className="flex-1 p-6">{children}</main>
      </div>
    </div>
  );
}

function SidebarMenu({
  menuItems,
  isActive,
  expandedMenus,
  toggleMenu
}: {
  menuItems: MenuItem[];
  isActive: (href?: string) => boolean;
  expandedMenus: string[];
  toggleMenu: (name: string) => void;
}) {
  return (
    <nav className="px-2 py-4 space-y-1">
      {menuItems.map(item => (
        <div key={item.name}>
          {item.children ? (
            <>
              <button
                onClick={() => toggleMenu(item.name)}
                className="w-full flex items-center justify-between px-3 py-2 text-sm font-medium text-gray-700 rounded-md hover:bg-gray-100"
              >
                <div className="flex items-center">
                  <item.icon className="h-5 w-5 mr-3 text-gray-500" />
                  {item.name}
                </div>
                {expandedMenus.includes(item.name) ? (
                  <ChevronDownIcon className="h-4 w-4" />
                ) : (
                  <ChevronRightIcon className="h-4 w-4" />
                )}
              </button>
              {expandedMenus.includes(item.name) && (
                <div className="ml-8 mt-1 space-y-1">
                  {item.children.map(child => (
                    <Link
                      key={child.name}
                      href={child.href || "#"}
                      className={`flex items-center px-3 py-2 text-sm font-medium rounded-md ${
                        isActive(child.href)
                          ? "bg-gradient-to-r from-[#039edb]/10 to-[#71bf44]/10 text-[#039edb] border-l-4 border-[#039edb]"
                          : "text-gray-700 hover:bg-gray-50"
                      }`}
                    >
                      {child.name}
                    </Link>
                  ))}
                </div>
              )}
            </>
          ) : (
            <Link
              href={item.href || "#"}
              className={`flex items-center px-3 py-2 text-sm font-medium rounded-md ${
                isActive(item.href)
                  ? "bg-gradient-to-r from-[#039edb]/10 to-[#71bf44]/10 text-[#039edb] border-l-4 border-[#039edb]"
                  : "text-gray-700 hover:bg-gray-50"
              }`}
            >
              <item.icon className="h-5 w-5 mr-3 text-gray-500" />
              {item.name}
              {item.badge && (
                <span className="ml-auto inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-red-100 text-red-800">
                  {item.badge}
                </span>
              )}
            </Link>
          )}
        </div>
      ))}
    </nav>
  );
}

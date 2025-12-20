"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
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
  ChevronRightIcon,
  BellIcon,
  MagnifyingGlassIcon
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

  useEffect(() => {
    const token = localStorage.getItem("accessToken");
    if (!token) {
      router.push("/login");
      return;
    }

    const fetchProfile = async () => {
      try {
        const response = await fetch("/api/proxy?endpoint=/api/v1/auth/me", {
          headers: { Authorization: `Bearer ${token}` }
        });

        if (response.ok) {
          const data = await response.json();
          if (data.success) {
            setUser(data.data);
            setIsLoading(false);
          } else {
            handleLogout();
          }
        } else {
          handleLogout();
        }
      } catch (error) {
        console.error("Error fetching profile:", error);
        handleLogout();
      }
    };

    fetchProfile();
  }, [router]);

  const handleLogout = () => {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
    router.push("/login");
  };

  const toggleMenu = (menuName: string) => {
    setExpandedMenus(prev => (prev.includes(menuName) ? prev.filter(name => name !== menuName) : [...prev, menuName]));
  };

  const menuItems: MenuItem[] = [
    { name: "Dashboard", href: "/admin", icon: HomeIcon },
    { name: "User Management", href: "/admin/users", icon: UsersIcon },
    { name: "Pricing Plans", href: "/admin/pricing-plans", icon: CurrencyDollarIcon },
    {
      name: "Content Management",
      icon: DocumentTextIcon,
      children: [
        { name: "Features", href: "/admin/features", icon: SparklesIcon },
        { name: "Partners", href: "/admin/partners", icon: BuildingOfficeIcon },
        { name: "Testimonials", href: "/admin/testimonials", icon: ChatBubbleLeftRightIcon },
        { name: "FAQs", href: "/admin/faqs", icon: QuestionMarkCircleIcon },
        { name: "FAQ Categories", href: "/admin/faq-categories", icon: QuestionMarkCircleIcon },
        { name: "Company Profile", href: "/admin/company-profile", icon: BuildingOfficeIcon }
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
    { name: "Industries", href: "/admin/industries", icon: BriefcaseIcon },
    { name: "Feature Pages", href: "/admin/feature-pages", icon: DocumentTextIcon },
    { name: "Media Files", href: "/admin/media-files", icon: PhotoIcon },
    { name: "Contact Submissions", href: "/admin/contact-submissions", icon: EnvelopeIcon },
    {
      name: "Recruitment",
      icon: BriefcaseIcon,
      children: [
        { name: "Job Postings", href: "/admin/job-postings", icon: BriefcaseIcon },
        { name: "Job Applications", href: "/admin/job-applications", icon: DocumentTextIcon }
      ]
    },
    { name: "Audit Logs", href: "/admin/audit-logs", icon: ClipboardDocumentListIcon },
    { name: "Analytics", href: "/admin/analytics", icon: ChartBarIcon },
    { name: "Site Configuration", href: "/admin/site-config", icon: Cog6ToothIcon }
  ];

  const isActive = (href?: string) => {
    if (!href) return false;
    if (href === "/admin") return pathname === "/admin";
    return pathname === href || pathname.startsWith(href + "/");
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50">
        <div className="relative">
          <div className="w-12 h-12 rounded-full border-4 border-slate-200" />
          <div className="absolute top-0 left-0 w-12 h-12 rounded-full border-4 border-[#039edb] border-t-transparent animate-spin" />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 flex font-sans text-slate-800">
      {/* Mobile Sidebar Overlay */}
      <div
        className={`fixed inset-0 z-40 bg-slate-900/50 backdrop-blur-sm transition-opacity lg:hidden ${sidebarOpen ? "opacity-100" : "opacity-0 pointer-events-none"}`}
        onClick={() => setSidebarOpen(false)}
      />

      {/* Sidebar */}
      <aside
        className={`fixed lg:static inset-y-0 left-0 z-40 w-64 bg-white border-r border-slate-200 shadow-xl lg:shadow-none transform transition-transform duration-300 lg:transform-none ${sidebarOpen ? "translate-x-0" : "-translate-x-full"}`}
      >
        <div className="flex flex-col h-full">
          {/* Sidebar Header */}
          <div className="h-16 flex items-center px-6 border-b border-slate-100 bg-white">
            <Link href="/admin" className="flex items-center gap-2 group">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#039edb] to-[#71bf44] p-1.5 shadow-md group-hover:shadow-lg transition-all">
                <Image src="/images/common/logo.png" alt="Logo" width={32} height={32} className="w-full h-full brightness-0 invert object-contain" />
              </div>
              <span className="font-bold text-lg tracking-tight text-slate-800">KelolaAja</span>
            </Link>
          </div>

          {/* Navigation */}
          <div className="flex-1 overflow-y-auto py-4 px-3 scrollbar-thin scrollbar-thumb-slate-200">
            <div className="space-y-1">
              <SidebarMenu menuItems={menuItems} isActive={isActive} expandedMenus={expandedMenus} toggleMenu={toggleMenu} />
            </div>
          </div>

          {/* User Profile */}
          {user && (
            <div className="p-3 border-t border-slate-100 bg-slate-50/50">
              <div className="flex items-center gap-3 p-2 rounded-xl border border-slate-200/60 bg-white shadow-sm hover:shadow-md transition-all group">
                <div className="w-9 h-9 rounded-full bg-gradient-to-br from-[#039edb] to-[#71bf44] flex items-center justify-center text-white font-bold text-xs shadow-inner">
                  {user.fullName.charAt(0)}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-xs font-bold text-slate-800 truncate">{user.fullName}</p>
                  <p className="text-[10px] text-slate-500 truncate">{user.email}</p>
                </div>
                <button
                  onClick={handleLogout}
                  className="p-1.5 text-slate-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                  title="Logout"
                >
                  <ArrowLeftOnRectangleIcon className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        {/* Top Header */}
        <header className="h-16 bg-white border-b border-slate-200 flex items-center justify-between px-4 lg:px-8 shadow-sm z-10 sticky top-0">
          <div className="flex items-center gap-3">
            <button onClick={() => setSidebarOpen(true)} className="lg:hidden p-2 text-slate-500 hover:bg-slate-100 rounded-lg">
              <Bars3Icon className="w-6 h-6" />
            </button>
            <h1 className="text-sm font-medium text-slate-500 hidden lg:block">Dashboard Overview</h1>
          </div>

          <div className="flex items-center gap-3">
            <div className="relative hidden sm:block">
              <MagnifyingGlassIcon className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                type="text"
                placeholder="Quick search..."
                className="w-64 pl-9 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-lg text-xs focus:outline-none focus:ring-2 focus:ring-[#039edb]/20 focus:border-[#039edb] transition-all"
              />
            </div>
            <button className="relative p-2 text-slate-400 hover:text-[#039edb] hover:bg-sky-50 rounded-lg transition-all">
              <BellIcon className="w-5 h-5" />
              <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full ring-2 ring-white"></span>
            </button>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 overflow-y-auto p-4 lg:p-8 scroll-smooth">
          <div className="max-w-7xl mx-auto space-y-6">
            {children}
          </div>
        </main>
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
    <>
      {menuItems.map(item => {
        const active = isActive(item.href);
        const expanded = expandedMenus.includes(item.name);
        const hasChildren = item.children && item.children.length > 0;

        // Check if any child is active
        const childActive = hasChildren && item.children?.some(child => isActive(child.href));

        return (
          <div key={item.name} className="group">
            {hasChildren ? (
              <>
                <button
                  onClick={() => toggleMenu(item.name)}
                  className={`w-full flex items-center justify-between px-3 py-2.5 text-xs font-medium rounded-lg transition-all duration-200 group-hover:bg-slate-50 ${expanded || childActive
                      ? "text-[#039edb] bg-sky-50/50"
                      : "text-slate-600 hover:text-slate-900"
                    }`}
                >
                  <div className="flex items-center gap-3">
                    <item.icon className={`h-4 w-4 flex-shrink-0 transition-colors ${expanded || childActive ? "text-[#039edb]" : "text-slate-400 group-hover:text-slate-600"}`} />
                    <span className="truncate">{item.name}</span>
                  </div>
                  <ChevronRightIcon className={`h-3 w-3 text-slate-400 transition-transform duration-200 ${expanded ? "rotate-90" : ""}`} />
                </button>

                <div className={`overflow-hidden transition-all duration-200 ease-in-out ${expanded ? "max-h-96 opacity-100 mt-1" : "max-h-0 opacity-0"}`}>
                  <div className="pl-9 pr-1 space-y-0.5 relative">
                    {/* Tree Line */}
                    <div className="absolute left-[21px] top-0 bottom-2 w-px bg-slate-200"></div>

                    {item.children?.map(child => {
                      const isChildActive = isActive(child.href);
                      return (
                        <Link
                          key={child.name}
                          href={child.href || "#"}
                          className={`relative flex items-center px-3 py-2 text-[11px] font-medium rounded-lg transition-all ${isChildActive
                              ? "text-[#039edb] bg-sky-50"
                              : "text-slate-500 hover:text-slate-900 hover:bg-slate-50"
                            }`}
                        >
                          {/* Active Dot */}
                          {isChildActive && (
                            <span className="absolute -left-[18px] top-1/2 -translate-y-1/2 w-1.5 h-1.5 rounded-full bg-[#039edb] shadow-[0_0_8px_rgba(3,158,219,0.5)]"></span>
                          )}
                          {child.name}
                        </Link>
                      );
                    })}
                  </div>
                </div>
              </>
            ) : (
              <Link
                href={item.href || "#"}
                className={`relative flex items-center gap-3 px-3 py-2.5 text-xs font-medium rounded-lg transition-all duration-200 group-hover:bg-slate-50 ${active
                    ? "text-white bg-gradient-to-r from-[#039edb] to-[#0280af] shadow-md shadow-sky-500/20"
                    : "text-slate-600 hover:text-slate-900"
                  }`}
              >
                <item.icon className={`h-4 w-4 flex-shrink-0 transition-colors ${active ? "text-white" : "text-slate-400 group-hover:text-slate-600"}`} />
                <span className="truncate flex-1">{item.name}</span>
                {item.badge && (
                  <span className="px-1.5 py-0.5 rounded text-[10px] bg-red-100 text-red-600 border border-red-200 font-bold">
                    {item.badge}
                  </span>
                )}
              </Link>
            )}
          </div>
        );
      })}
    </>
  );
}

'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { 
  LayoutDashboard, 
  CreditCard, 
  Users, 
  FileText, 
  Settings, 
  HelpCircle,
  ChevronDown
} from 'lucide-react'
import { cn } from '@/lib/utils'
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from '@/components/ui/collapsible'

const sidebarItems = [
  {
    title: 'Dashboard',
    icon: LayoutDashboard,
    href: '/dashboard',
  },
  {
    title: 'Payments',
    icon: CreditCard,
    href: '/payments',
    submenu: [
      { title: 'All Payments', href: '/payments' },
      { title: 'Create Payment', href: '/payments/create' },
      { title: 'Pending', href: '/payments?status=pending' },
    ],
  },
  {
    title: 'Users',
    icon: Users,
    href: '/users',
  },
  {
    title: 'Documents',
    icon: FileText,
    href: '/documents',
  },
]

export default function Sidebar() {
  const pathname = usePathname()

  return (
    <aside className="hidden border-r bg-background lg:fixed lg:inset-y-0 lg:flex lg:w-72 lg:flex-col">
      <div className="flex flex-col gap-2 p-6">
        {sidebarItems.map((item) => (
          item.submenu ? (
            <Collapsible key={item.title} className="w-full">
              <CollapsibleTrigger className="flex w-full items-center justify-between rounded-lg px-4 py-2 text-sm font-medium hover:bg-muted">
                <div className="flex items-center gap-3">
                  <item.icon className="h-5 w-5" />
                  {item.title}
                </div>
                <ChevronDown className="h-4 w-4" />
              </CollapsibleTrigger>
              <CollapsibleContent className="ml-9 mt-1 space-y-1">
                {item.submenu.map((subitem) => (
                  <Link
                    key={subitem.href}
                    href={subitem.href}
                    className={cn(
                      "block rounded-lg px-4 py-2 text-sm font-medium hover:bg-muted",
                      pathname === subitem.href ? "bg-muted" : "text-muted-foreground"
                    )}
                  >
                    {subitem.title}
                  </Link>
                ))}
              </CollapsibleContent>
            </Collapsible>
          ) : (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex items-center gap-3 rounded-lg px-4 py-2 text-sm font-medium hover:bg-muted",
                pathname === item.href ? "bg-muted" : "text-muted-foreground"
              )}
            >
              <item.icon className="h-5 w-5" />
              {item.title}
            </Link>
          )
        ))}
      </div>

      <div className="mt-auto p-6 border-t">
        <div className="flex flex-col gap-2">
          <Link
            href="/settings"
            className="flex items-center gap-3 rounded-lg px-4 py-2 text-sm font-medium text-muted-foreground hover:bg-muted"
          >
            <Settings className="h-5 w-5" />
            Settings
          </Link>
          <Link
            href="/help"
            className="flex items-center gap-3 rounded-lg px-4 py-2 text-sm font-medium text-muted-foreground hover:bg-muted"
          >
            <HelpCircle className="h-5 w-5" />
            Help & Support
          </Link>
        </div>
      </div>
    </aside>
  )
}
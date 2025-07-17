import { ChevronRight, Home } from "lucide-react";
import { Link, useLocation } from "react-router-dom";

interface BreadcrumbItem {
  label: string;
  href?: string;
}

interface BreadcrumbProps {
  items?: BreadcrumbItem[];
  className?: string;
}

export default function Breadcrumb({ items, className = "" }: BreadcrumbProps) {
  const location = useLocation();

  // Auto-generate breadcrumbs from URL if not provided
  const generateBreadcrumbs = (): BreadcrumbItem[] => {
    const pathnames = location.pathname.split("/").filter((x) => x);
    const breadcrumbs: BreadcrumbItem[] = [{ label: "Home", href: "/" }];

    let currentPath = "";
    pathnames.forEach((pathname, index) => {
      currentPath += `/${pathname}`;
      const isLast = index === pathnames.length - 1;

      // Convert pathname to readable label
      const label = pathname
        .split("-")
        .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
        .join(" ");

      breadcrumbs.push({
        label,
        href: isLast ? undefined : currentPath,
      });
    });

    return breadcrumbs;
  };

  const breadcrumbItems = items || generateBreadcrumbs();

  if (breadcrumbItems.length <= 1) return null;

  return (
    <nav
      className={`flex items-center space-x-2 text-sm text-gray-600 ${className}`}
      aria-label="Breadcrumb"
    >
      {breadcrumbItems.map((item, index) => (
        <div key={index} className="flex items-center space-x-2">
          {index === 0 && <Home className="w-4 h-4" />}

          {item.href ? (
            <Link
              to={item.href}
              className="hover:text-red-600 transition-colors duration-200 font-medium"
            >
              {item.label}
            </Link>
          ) : (
            <span className="text-gray-900 font-medium">{item.label}</span>
          )}

          {index < breadcrumbItems.length - 1 && (
            <ChevronRight className="w-4 h-4 text-gray-400" />
          )}
        </div>
      ))}
    </nav>
  );
}

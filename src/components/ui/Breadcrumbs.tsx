import { ChevronRight, Home } from 'lucide-react';
import { Link } from 'react-router-dom';

interface BreadcrumbItem {
  name: string;
  url: string;
}

interface BreadcrumbsProps {
  items: BreadcrumbItem[];
}

export function Breadcrumbs({ items }: BreadcrumbsProps) {
  return (
    <nav aria-label="Breadcrumb" className="mb-6 flex">
      <ol className="flex items-center space-x-2 text-sm text-neutral-500">
        <li>
          <Link to="/" className="flex items-center hover:text-primary-600 transition-colors" aria-label="Home">
            <Home size={16} />
          </Link>
        </li>
        {items.map((item, index) => {
          const isLast = index === items.length - 1;
          return (
            <li key={item.url} className="flex items-center space-x-2">
              <ChevronRight size={14} className="text-neutral-400 shrink-0" />
              {isLast ? (
                <span className="text-neutral-900 font-medium" aria-current="page">{item.name}</span>
              ) : (
                <Link to={item.url} className="hover:text-primary-600 transition-colors">
                  {item.name}
                </Link>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}

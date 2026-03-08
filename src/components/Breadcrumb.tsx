import Link from 'next/link'

interface BreadcrumbProps {
  title: string
  items?: { label: string; href: string }[]
}

export default function Breadcrumb({ title, items = [{ label: 'Home', href: '/' }] }: BreadcrumbProps) {
  return (
    <div className="bg-secondary-main text-white py-16 mt-20">
      <div className="container-custom">
        <h1 className="text-4xl font-bold mb-4">{title}</h1>
        <nav className="flex items-center space-x-2 text-sm">
          {items.map((item, index) => (
            <div key={item.href} className="flex items-center space-x-2">
              {index > 0 && <span className="text-gray-400">/</span>}
              <Link
                href={item.href}
                className={`transition-colors ${
                  index === items.length - 1
                    ? 'text-primary-main font-medium'
                    : 'text-gray-300 hover:text-white'
                }`}
              >
                {item.label}
              </Link>
            </div>
          ))}
        </nav>
      </div>
    </div>
  )
}

import { Zap } from 'lucide-react'

export default function Footer() {
  return (
    <footer className="bg-[#080F17] border-t border-white/5 py-16">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-10 mb-12">
          <div className="col-span-2 md:col-span-1">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-6 h-6 rounded-md bg-amber-400 flex items-center justify-center">
                <Zap size={13} className="text-[#04080F]" fill="currentColor" />
              </div>
              <span className="font-display font-600 text-base text-white">lumiq</span>
            </div>
            <p className="text-sm font-body text-white/30 leading-relaxed max-w-xs">
              Smart lighting designed for the way you live and work.
            </p>
          </div>

          {[
            { title: 'Products', links: ['Desk Pro', 'Ambient', 'Arc', 'Accessories'] },
            { title: 'Company', links: ['About', 'Blog', 'Careers', 'Press'] },
            { title: 'Support', links: ['FAQ', 'Warranty', 'Contact', 'Returns'] },
          ].map((col) => (
            <div key={col.title}>
              <p className="text-xs font-display font-500 text-white/60 uppercase tracking-wider mb-4">
                {col.title}
              </p>
              <ul className="space-y-2.5">
                {col.links.map((link) => (
                  <li key={link}>
                    <a href="#" className="text-sm font-body text-white/30 hover:text-white/70 transition-colors">
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="border-t border-white/5 pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-xs font-body text-white/20">
            © 2025 Lumiq. All rights reserved.
          </p>
          <p className="text-xs font-body text-white/20">
            Privacy · Terms · Cookies
          </p>
        </div>
      </div>
    </footer>
  )
}

import Link from 'next/link'

export default function Footer() {
  return (
    <footer className="bg-dark-green text-white">
      {/* Main Footer */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid md:grid-cols-4 gap-8 mb-8">
          {/* Brand */}
          <div>
            <h3 className="text-2xl font-serif font-bold mb-4">
              Zestora<span className="text-gold">.</span>
            </h3>
            <p className="text-gray-300 text-sm">
              Premium gourmet food products sourced and delivered with care.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-semibold mb-4">Shop</h4>
            <ul className="space-y-2 text-sm text-gray-300">
              <li><Link href="#products" className="hover:text-gold transition">Products</Link></li>
              <li><Link href="/account/orders" className="hover:text-gold transition">My Orders</Link></li>
              <li><Link href="/cart" className="hover:text-gold transition">Cart</Link></li>
            </ul>
          </div>

          {/* Customer Service */}
          <div>
            <h4 className="font-semibold mb-4">Support</h4>
            <ul className="space-y-2 text-sm text-gray-300">
              <li><a href="mailto:support@zestora.in" className="hover:text-gold transition">Contact Us</a></li>
              <li><a href="#" className="hover:text-gold transition">FAQs</a></li>
              <li><a href="#" className="hover:text-gold transition">Shipping</a></li>
              <li><a href="#" className="hover:text-gold transition">Returns</a></li>
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h4 className="font-semibold mb-4">Connect</h4>
            <p className="text-gray-300 text-sm mb-4">Follow us for exclusive updates</p>
            <div className="flex space-x-4">
              <a href="#" className="hover:text-gold transition text-lg">📘</a>
              <a href="#" className="hover:text-gold transition text-lg">📷</a>
              <a href="#" className="hover:text-gold transition text-lg">🐦</a>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-emerald-700 pt-8">
          {/* Bottom Footer */}
          <div className="flex flex-col md:flex-row justify-between items-center text-sm text-gray-400">
            <p>&copy; 2025 Zestora Foods. All rights reserved.</p>
            <div className="flex gap-6 mt-4 md:mt-0">
              <a href="#" className="hover:text-gold transition">Privacy Policy</a>
              <a href="#" className="hover:text-gold transition">Terms & Conditions</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}

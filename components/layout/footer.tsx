import Image from 'next/image'
import Link from 'next/link'
import { MapPin, Phone, Mail, Facebook, Youtube, Instagram } from 'lucide-react'

const footerLinks = {
  programs: [
    { label: 'Mầm non', labelEn: 'Kindergarten', href: '/programs?level=kindergarten' },
    { label: 'Tiểu học', labelEn: 'Elementary', href: '/programs?level=elementary' },
    { label: 'THCS', labelEn: 'Middle School', href: '/programs?level=middle' },
    { label: 'THPT', labelEn: 'High School', href: '/programs?level=high' },
  ],
  about: [
    { label: 'Về chúng tôi', labelEn: 'About Us', href: '/about' },
    { label: 'Tầm nhìn', labelEn: 'Vision', href: '/about#vision' },
    { label: 'Sứ mệnh', labelEn: 'Mission', href: '/about#mission' },
    { label: 'Giá trị cốt lõi', labelEn: 'Core Values', href: '/about#values' },
  ],
  admissions: [
    { label: 'Học phí', labelEn: 'Tuition', href: '/admissions#tuition' },
    { label: 'FAQ', href: '/admissions#faq' },
    { label: 'Liên hệ tư vấn', labelEn: 'Contact', href: '/admissions#contact' },
  ],
}

const partners = [
  'Edmentum International',
  'Cambridge Assessment',
  'Cognia & WASC',
  'FabLab EIU',
]

export function Footer() {
  return (
    <footer className="bg-[#3A53A3] text-white">
      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
import Image from 'next/image'

          {/* Company Info */}
          <div>
            <Image
              src="/epath_logo.png"
              alt="EPath Education"
              width={160}
              height={50}
              className="h-12 w-auto mb-4 brightness-0 invert"
            />
            <p className="text-white/80 text-sm mb-6 leading-relaxed">
              Lộ trình học thuật quốc tế xuyên suốt từ Tiểu học đến THPT.
              Blended Learning - Edmentum International - Cá nhân hóa lộ trình.
            </p>
            <div className="flex gap-3">
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer"
                className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center hover:bg-[#8BC53F] hover:text-white transition-all duration-150">
                <Facebook className="w-5 h-5" />
              </a>
              <a href="https://youtube.com" target="_blank" rel="noopener noreferrer"
                className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center hover:bg-[#8BC53F] hover:text-white transition-all duration-150">
                <Youtube className="w-5 h-5" />
              </a>
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer"
                className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center hover:bg-[#8BC53F] hover:text-white transition-all duration-150">
                <Instagram className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Programs */}
          <div>
            <h3 className="font-semibold text-lg mb-6">Chương trình / Programs</h3>
            <ul className="space-y-3">
              {footerLinks.programs.map((link) => (
                <li key={link.label}>
                  <Link href={link.href} className="text-white/70 hover:text-[#8BC53F] transition-colors duration-150 text-sm">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-semibold text-lg mb-6">EPath</h3>
            <ul className="space-y-3">
              {footerLinks.about.map((link) => (
                <li key={link.label}>
                  <Link href={link.href} className="text-white/70 hover:text-[#8BC53F] transition-colors duration-150 text-sm">
                    {link.label}
                  </Link>
                </li>
              ))}
              <li>
                <Link href="/partners" className="text-white/70 hover:text-[#8BC53F] transition-colors duration-150 text-sm">
                  Đối tác quốc tế / Partners
                </Link>
              </li>
              <li>
                <Link href="/events" className="text-white/70 hover:text-[#8BC53F] transition-colors duration-150 text-sm">
                  Sự kiện / Events
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="font-semibold text-lg mb-6">Liên hệ / Contact</h3>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-[#8BC53F] shrink-0 mt-0.5" />
                <span className="text-white/70 text-sm">
                  38 Trần Phú, Thủ Dầu Một, TP.HCM
                </span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="w-5 h-5 text-[#8BC53F] shrink-0" />
                <a href="tel:0912345678" className="text-white/70 hover:text-white transition-colors duration-150 text-sm">
                  0912 345 678
                </a>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="w-5 h-5 text-[#8BC53F] shrink-0" />
                <a href="mailto:info@epatheducation.edu.vn" className="text-white/70 hover:text-white transition-colors duration-150 text-sm">
                  info@epatheducation.edu.vn
                </a>
              </li>
            </ul>

            <div className="mt-8">
              <h4 className="font-medium text-sm mb-3 text-white/70">Đối tác / Partners</h4>
              <ul className="space-y-2">
                {partners.map((partner) => (
                  <li key={partner} className="text-white/60 text-xs">
                    {partner}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-white/10">
        <div className="container mx-auto px-4 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-white/60 text-sm">
              &copy; {new Date().getFullYear()} EPath Education. All rights reserved.
            </p>
            <div className="flex gap-6">
              <Link href="/privacy" className="text-white/60 hover:text-white transition-colors duration-150 text-sm">
                Chính sách bảo mật
              </Link>
              <Link href="/terms" className="text-white/60 hover:text-white transition-colors duration-150 text-sm">
                Điều khoản sử dụng
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}

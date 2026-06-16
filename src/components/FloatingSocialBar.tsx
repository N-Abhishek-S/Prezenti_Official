import { MessageCircle } from 'lucide-react';
import { YoutubeIcon as Youtube, InstagramIcon as Instagram, FacebookIcon as Facebook, TwitterIcon as Twitter } from './ui/SocialIcons';
import { SEO_CONSTANTS } from '../seo/constants';

export function FloatingSocialBar() {
  return (
    <>
      {/* Desktop Floating Sidebar */}
      <div className="fixed left-0 top-1/2 -translate-y-1/2 z-50 hidden lg:flex flex-col gap-2 p-2 bg-white/90 backdrop-blur-sm shadow-lg rounded-r-xl border border-gray-100">
        <a
          href={SEO_CONSTANTS.SOCIAL_LINKS.YOUTUBE}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Follow us on YouTube"
          className="p-3 text-gray-600 hover:text-[#FF0000] hover:bg-gray-50 rounded-lg transition-colors"
        >
          <Youtube className="w-5 h-5" />
        </a>
        <a
          href={SEO_CONSTANTS.SOCIAL_LINKS.INSTAGRAM}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Follow us on Instagram"
          className="p-3 text-gray-600 hover:text-[#E1306C] hover:bg-gray-50 rounded-lg transition-colors"
        >
          <Instagram className="w-5 h-5" />
        </a>
        <a
          href={SEO_CONSTANTS.SOCIAL_LINKS.FACEBOOK}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Follow us on Facebook"
          className="p-3 text-gray-600 hover:text-[#1877F2] hover:bg-gray-50 rounded-lg transition-colors"
        >
          <Facebook className="w-5 h-5" />
        </a>
        <a
          href={SEO_CONSTANTS.SOCIAL_LINKS.X}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Follow us on X (Twitter)"
          className="p-3 text-gray-600 hover:text-black hover:bg-gray-50 rounded-lg transition-colors"
        >
          <Twitter className="w-5 h-5" />
        </a>
        <div className="w-full h-px bg-gray-200 my-1" />
        <a
          href={SEO_CONSTANTS.WHATSAPP}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Chat with us on WhatsApp"
          className="p-3 text-[#25D366] hover:bg-[#25D366]/10 rounded-lg transition-colors"
        >
          <MessageCircle className="w-6 h-6" />
        </a>
      </div>

      {/* Mobile Floating Bottom Bar */}
      <div className="fixed bottom-0 left-0 right-0 z-50 lg:hidden bg-white border-t border-gray-200 p-2 shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.1)] flex justify-around items-center pb-safe">
        <a href={SEO_CONSTANTS.SOCIAL_LINKS.YOUTUBE} target="_blank" rel="noopener noreferrer" aria-label="YouTube" className="p-2 text-gray-600 hover:text-[#FF0000]"><Youtube className="w-5 h-5" /></a>
        <a href={SEO_CONSTANTS.SOCIAL_LINKS.INSTAGRAM} target="_blank" rel="noopener noreferrer" aria-label="Instagram" className="p-2 text-gray-600 hover:text-[#E1306C]"><Instagram className="w-5 h-5" /></a>
        <a href={SEO_CONSTANTS.SOCIAL_LINKS.FACEBOOK} target="_blank" rel="noopener noreferrer" aria-label="Facebook" className="p-2 text-gray-600 hover:text-[#1877F2]"><Facebook className="w-5 h-5" /></a>
        <a href={SEO_CONSTANTS.WHATSAPP} target="_blank" rel="noopener noreferrer" aria-label="WhatsApp" className="p-2 bg-[#25D366] text-white rounded-full ml-2 shadow-sm"><MessageCircle className="w-5 h-5" /></a>
      </div>
    </>
  );
}

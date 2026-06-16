import { YoutubeIcon as Youtube, InstagramIcon as Instagram, FacebookIcon as Facebook, TwitterIcon as Twitter } from '../ui/SocialIcons';
import { SEO_CONSTANTS } from '../../seo/constants';

const socialLinks = [
  {
    name: 'YouTube',
    url: SEO_CONSTANTS.SOCIAL_LINKS.YOUTUBE,
    icon: Youtube,
    color: 'hover:bg-[#FF0000] hover:border-[#FF0000]',
    textColor: 'text-[#FF0000]'
  },
  {
    name: 'Instagram',
    url: SEO_CONSTANTS.SOCIAL_LINKS.INSTAGRAM,
    icon: Instagram,
    color: 'hover:bg-[#E1306C] hover:border-[#E1306C]',
    textColor: 'text-[#E1306C]'
  },
  {
    name: 'Facebook',
    url: SEO_CONSTANTS.SOCIAL_LINKS.FACEBOOK,
    icon: Facebook,
    color: 'hover:bg-[#1877F2] hover:border-[#1877F2]',
    textColor: 'text-[#1877F2]'
  },
  {
    name: 'X (Twitter)',
    url: SEO_CONSTANTS.SOCIAL_LINKS.X,
    icon: Twitter,
    color: 'hover:bg-black hover:border-black',
    textColor: 'text-black'
  }
];

export function FollowPrezenti() {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-[#1F2937] mb-4">
            Follow Prezenti
          </h2>
          <p className="text-lg text-gray-600">
            Stay updated with our latest news, services, and facility management tips.
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto">
          {socialLinks.map((social) => {
            const Icon = social.icon;
            return (
              <a
                key={social.name}
                href={social.url}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`Follow us on ${social.name}`}
                className={`group flex flex-col items-center justify-center p-8 rounded-2xl border-2 border-gray-100 bg-white transition-all duration-300 ${social.color}`}
              >
                <Icon className={`w-10 h-10 mb-4 transition-colors group-hover:text-white ${social.textColor}`} />
                <span className="font-medium text-gray-600 group-hover:text-white transition-colors">
                  {social.name}
                </span>
              </a>
            );
          })}
        </div>
      </div>
    </section>
  );
}

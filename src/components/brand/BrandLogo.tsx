import { cn } from '../../lib/cn';
import { publicAsset } from '../../lib/publicAsset';

type BrandLogoVariant = 'horizontal' | 'stacked' | 'mark';
type BrandLogoSize = 'xs' | 'sm' | 'md' | 'lg' | 'nav';
type BrandLogoTone = 'default' | 'onDark';

interface BrandLogoProps {
  variant?: BrandLogoVariant;
  size?: BrandLogoSize;
  tone?: BrandLogoTone;
  alt?: string;
  className?: string;
  imageClassName?: string;
}

const logoSources: Record<BrandLogoVariant, string> = {
  horizontal: publicAsset('/brand/prezenti-logo.png'),
  stacked: publicAsset('/brand/prezenti-logo.png'),
  mark: publicAsset('/brand/prezenti-logo.png'),
};

const sizeClasses: Record<BrandLogoVariant, Record<BrandLogoSize, string>> = {
  horizontal: {
    xs: 'h-7',
    sm: 'h-8',
    md: 'h-10',
    lg: 'h-12',
    nav: 'h-10 sm:h-12',
  },
  stacked: {
    xs: 'h-10',
    sm: 'h-12',
    md: 'h-16',
    lg: 'h-20',
    nav: 'h-12 sm:h-14',
  },
  mark: {
    xs: 'h-7',
    sm: 'h-8',
    md: 'h-10',
    lg: 'h-12',
    nav: 'h-10',
  },
};

const toneClasses: Record<BrandLogoTone, string> = {
  default: '',
  onDark: 'rounded-lg bg-white px-2 py-1 ring-1 ring-white/10',
};

export function BrandLogo({
  variant = 'horizontal',
  size = 'md',
  tone = 'default',
  alt = 'Prezenti',
  className,
  imageClassName,
}: BrandLogoProps) {
  return (
    <span className={cn('inline-flex shrink-0 items-center', toneClasses[tone], className)}>
      <img
        src={logoSources[variant]}
        alt={alt}
        title={alt}
        className={cn('block w-auto object-contain', sizeClasses[variant][size], imageClassName)}
        loading="eager"
        decoding="async"
        width={320}
        height={160}
      />
    </span>
  );
}

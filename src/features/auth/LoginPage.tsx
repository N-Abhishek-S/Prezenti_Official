import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { BrandLogo } from '../../components/brand/BrandLogo';
import { Button } from '../../components/ui/Button';
import { useAppDispatch } from '../../app/hooks';
import { loginAsRole, loginWithToken } from './authSlice';
import type { Role } from '../../types';
import { Shield, BarChart3, Users, CheckCircle, Zap } from 'lucide-react';
import { apiSend } from '../../lib/api';

export function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [selectedRole, setSelectedRole] = useState<Role>('client');
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!email || !password) {
      dispatch(loginAsRole(selectedRole));
      navigate(selectedRole === 'admin' ? '/admin/pricing' : '/dashboard');
      return;
    }

    setIsSubmitting(true);
    try {
      const response = await apiSend<{
        accessToken: string;
        user: { id: string; email: string; fullName: string; roles: string[]; permissions: string[] };
      }>('/auth/login', 'POST', { email, password });
      const primaryRole = response.data.user.roles.includes('ADMIN') || response.data.user.roles.includes('SUPER_ADMIN') ? 'admin' : 'client';
      dispatch(loginWithToken({
        accessToken: response.data.accessToken,
        user: {
          id: response.data.user.id,
          name: response.data.user.fullName,
          email: response.data.user.email,
          role: primaryRole,
          permissions: response.data.user.permissions,
          organization: 'Presenti',
        },
      }));
      navigate(primaryRole === 'admin' ? '/admin/pricing' : '/dashboard');
    } catch {
      setError('Unable to sign in with those credentials.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const features = [
    { icon: Shield, text: 'Enterprise-grade security with SOC 2 compliance' },
    { icon: BarChart3, text: 'Real-time SLA monitoring across all locations' },
    { icon: Users, text: 'GPS-verified workforce attendance tracking' },
    { icon: CheckCircle, text: 'Automated compliance management and alerts' },
    { icon: Zap, text: 'AI-powered operational intelligence' },
  ];

  return (
    <div className="grid min-h-screen lg:grid-cols-2">
      {/* Left Panel - Brand */}
      <motion.div
        className="relative hidden flex-col justify-center overflow-hidden p-16 lg:flex"
        style={{ background: 'linear-gradient(135deg, #0A2A22, #164A3D)' }}
        initial={{ opacity: 0, x: -40 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6 }}
      >
        <div className="absolute top-[20%] -right-[100px] w-[300px] h-[300px] rounded-full bg-teal-500/15" />
        <div className="absolute bottom-[10%] -left-[50px] w-[200px] h-[200px] rounded-full bg-primary-400/10" />

        <div className="relative z-10">
          <div className="mb-8 flex items-center">
            <BrandLogo size="lg" tone="onDark" />
          </div>

          <h2 className="text-4xl font-bold text-white mb-4 leading-tight">
            Your Facility Operations<br />Command Center
          </h2>
          <p className="text-lg text-white/80 leading-relaxed mb-10">
            Manage workforce, track SLAs, ensure compliance, and drive operational excellence - all from one platform.
          </p>

          <div className="flex flex-col gap-4">
            {features.map(f => (
              <div key={f.text} className="flex items-center gap-3 text-sm text-white/90">
                <f.icon size={18} className="text-teal-400 shrink-0" />
                <span>{f.text}</span>
              </div>
            ))}
          </div>
        </div>
      </motion.div>

      {/* Right Panel - Form */}
      <motion.div
        className="flex items-center justify-center p-6 sm:p-8 lg:p-12"
        initial={{ opacity: 0, x: 40 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6, delay: 0.1 }}
      >
        <div className="w-full max-w-[420px]">
          {/* Mobile logo */}
          <div className="mb-8 flex items-center lg:hidden">
            <BrandLogo size="md" />
          </div>

          <h1 className="text-3xl font-semibold mb-2">Welcome back</h1>
          <p className="text-neutral-500 mb-8">Sign in to your facility management portal</p>

          {/* Role Selector (Demo) */}
          <div className="mb-6 p-3 bg-neutral-50 rounded-lg border border-neutral-200">
            <div className="text-xs font-semibold text-neutral-500 uppercase tracking-wider mb-2">Demo: Select Role</div>
            <div className="flex gap-1.5 flex-wrap">
              {(['client', 'admin', 'executive', 'supervisor'] as Role[]).map(role => (
                <button
                  key={role}
                  onClick={() => setSelectedRole(role)}
                  className={`px-3 py-1.5 text-xs font-medium rounded-md transition-all capitalize cursor-pointer border-none ${
                    selectedRole === role
                      ? 'bg-primary-800 text-white'
                      : 'bg-white text-neutral-600 hover:bg-neutral-100'
                  }`}
                >
                  {role}
                </button>
              ))}
            </div>
          </div>

          {/* SSO Buttons */}
          <div className="flex flex-col gap-3 mb-6">
            <button className="flex items-center justify-center gap-3 px-4 py-3 border border-neutral-200 rounded-lg bg-white text-sm font-medium hover:bg-neutral-50 hover:border-neutral-300 transition-all cursor-pointer">
              <span className="text-xs font-semibold text-primary-800">SSO</span> Sign in with SSO
            </button>
            <button className="flex items-center justify-center gap-3 px-4 py-3 border border-neutral-200 rounded-lg bg-white text-sm font-medium hover:bg-neutral-50 hover:border-neutral-300 transition-all cursor-pointer">
              <span className="text-xs font-semibold text-primary-800">MS</span> Sign in with Microsoft
            </button>
          </div>

          {/* Divider */}
          <div className="flex items-center gap-4 my-6 text-neutral-400 text-sm">
            <div className="flex-1 h-px bg-neutral-200" />
            <span>or continue with email</span>
            <div className="flex-1 h-px bg-neutral-200" />
          </div>

          {/* Form */}
          <form onSubmit={handleLogin}>
            <div className="mb-5">
              <label className="block text-sm font-medium text-neutral-900 mb-1.5">
                Email address
              </label>
              <input
                type="email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                placeholder="you@company.com"
                className="w-full px-3 py-2.5 text-sm border border-neutral-200 rounded-lg bg-white transition-all outline-none hover:border-neutral-300 focus:border-primary-600 focus:ring-2 focus:ring-primary-600/15"
              />
            </div>
            <div className="mb-6">
              <label className="block text-sm font-medium text-neutral-900 mb-1.5">
                Password
              </label>
              <input
                type="password"
                value={password}
                onChange={e => setPassword(e.target.value)}
                placeholder="Enter your password"
                className="w-full px-3 py-2.5 text-sm border border-neutral-200 rounded-lg bg-white transition-all outline-none hover:border-neutral-300 focus:border-primary-600 focus:ring-2 focus:ring-primary-600/15"
              />
            </div>
            {error && <p className="text-sm text-critical-500 mb-4">{error}</p>}
            <Button type="submit" variant="primary" size="lg" className="w-full">
              {isSubmitting ? 'Signing in...' : `Sign In as ${selectedRole.charAt(0).toUpperCase() + selectedRole.slice(1)}`}
            </Button>
          </form>

          <p className="text-center text-sm text-neutral-500 mt-6">
            Don't have an account?{' '}
            <Link to="/talk-to-us" className="text-primary-600 font-medium hover:text-primary-800">
              Request access
            </Link>
          </p>
        </div>
      </motion.div>
    </div>
  );
}

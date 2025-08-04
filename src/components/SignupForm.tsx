import { useState, useEffect } from 'react';

interface SignupFormData {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}

export function SignupForm() {
  const [formData, setFormData] = useState<SignupFormData>({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isDesktop, setIsDesktop] = useState(false);

  useEffect(() => {
    const checkScreenSize = () => {
      const isDesktopView = window.innerWidth >= 768;
      console.log('Screen width:', window.innerWidth, 'isDesktop:', isDesktopView);
      setIsDesktop(isDesktopView);
    };
    
    checkScreenSize();
    window.addEventListener('resize', checkScreenSize);
    
    return () => window.removeEventListener('resize', checkScreenSize);
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    setError(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    try {
      // TODO: Implement actual signup logic
      const response = await fetch('/api/auth/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error('Signup failed');
      }

      // Redirect to success page or login
      window.location.href = '/login';
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred during signup');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full md:max-w-[400px] mx-auto px-6 md:px-0">
      <div className="mb-8">
        <h1 className="text-2xl font-medium mb-2">Sign up</h1>
        <p className="text-sm text-gray-600 mb-6">
          Already have an account?{' '}
          <a href="/login" className="text-black font-medium hover:underline">
            Login
          </a>
        </p>
        <p className="text-gray-600 text-sm leading-relaxed">
          Create your account to unlock your creative potential<br />
          with our photography community
        </p>
      </div>

      <form onSubmit={handleSubmit}>
        {/* First and Last Name - 2 columns on desktop, 1 column on mobile */}
        <div className="w-full mb-5">
          <div 
            className="name-fields-grid"
            style={{
              display: 'flex',
              flexDirection: isDesktop ? 'row' : 'column',
              gap: isDesktop ? '0.75rem' : '1rem'
            }}
          >
            <div style={{ flex: '1 1 0%', minWidth: 0 }}>
              <label htmlFor="firstName" className="block text-sm font-medium mb-2">
                First name
              </label>
              <input
                type="text"
                id="firstName"
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
                className="w-full h-12 px-4 border border-gray-300 rounded-lg text-sm focus:outline-none focus:border-black focus:ring-1 focus:ring-black"
                placeholder="Your name"
                required
              />
            </div>
            <div style={{ flex: '1 1 0%', minWidth: 0 }}>
              <label htmlFor="lastName" className="block text-sm font-medium mb-2">
                Last name
              </label>
              <input
                type="text"
                id="lastName"
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
                className="w-full h-12 px-4 border border-gray-300 rounded-lg text-sm focus:outline-none focus:border-black focus:ring-1 focus:ring-black"
                placeholder="Your last name"
                required
              />
            </div>
          </div>
        </div>

        <div className="mb-5">
          <label htmlFor="email" className="block text-sm font-medium mb-2">
            Email
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="w-full h-12 px-4 border border-gray-300 rounded-lg text-sm focus:outline-none focus:border-black focus:ring-1 focus:ring-black"
            placeholder="Your email address"
            required
          />
        </div>

        <div className="mb-5">
          <label htmlFor="password" className="block text-sm font-medium mb-2">
            Create password
          </label>
          <input
            type="password"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            className="w-full h-12 px-4 border border-gray-300 rounded-lg text-sm focus:outline-none focus:border-black focus:ring-1 focus:ring-black"
            placeholder="Enter password"
            required
          />
        </div>

        {error && (
          <div className="text-red-600 text-sm mb-5">{error}</div>
        )}

        <button
          type="submit"
          className="w-full h-12 bg-black text-white rounded-lg text-sm font-medium hover:bg-gray-800 transition-colors"
          disabled={isLoading}
        >
          {isLoading ? 'Creating account...' : "Let's go!"}
        </button>
      </form>
    </div>
  );
}
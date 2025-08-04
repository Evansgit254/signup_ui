import { useState } from 'react';

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
    <div className="w-full max-w-none" style={{ height: '240px' }}>
             <div className="mb-8">
         <h1 className="text-2xl font-medium mb-2">Sign up</h1>
         <div className="flex items-center gap-2 mb-4">
           <span className="text-gray-400">•</span>
           <span className="text-sm text-gray-600">
             Already have an account?{' '}
             <a href="/login" className="text-black font-medium hover:underline">
               Login
             </a>
           </span>
         </div>
         <p className="text-gray-600 text-sm leading-relaxed mb-6">
           Create your account to unlock your creative potential<br className="hidden md:block" />
           <span className="md:hidden"> </span>with our photography community
         </p>
       </div>

             <form onSubmit={handleSubmit} className="w-full">
         <div className="form-grid grid grid-cols-1 md:grid-cols-2 gap-4 mb-6" style={{ 
           display: 'grid', 
           gap: '1rem'
         }}>
           <div>
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
           <div>
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
           <div>
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
           <div>
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
         </div>

        {error && (
          <div className="text-red-600 text-sm">{error}</div>
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
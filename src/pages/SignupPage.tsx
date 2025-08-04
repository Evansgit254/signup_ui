import { useState, useEffect } from 'react';
import { SignupForm } from '../components/SignupForm';

// Image slideshow data
const slideImages = [
  {
    src: '/images/SignupSlider1.png',
    alt: 'Signup slider image 1',
    credit: 'Work by Kanmi Osho'
  },
  {
    src: '/images/SignupSlider2.png',
    alt: 'Signup slider image 2',
    credit: 'Work by David Adewole 🇳🇬'
  },
  {
    src: '/images/SignupSlider3.png',
    alt: 'Signup slider image 3',
    credit: 'Work by Kondwani Jere 🇿🇲'
  },
  {
    src: '/images/SignupSlider4.png',
    alt: 'Signup slider image 4',
    credit: 'Work by Helder 🇿🇦'
  }
];

export function SignupPage() {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  // Auto-advance slideshow
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prev) => (prev + 1) % slideImages.length);
    }, 5000); // Change image every 5 seconds

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen flex flex-col bg-white">
      {/* Header */}
      <header className="flex items-center justify-between px-8 py-6 bg-white border-b border-gray-200">
        <div className="text-2xl font-bold">STUCRUUM</div>
        <nav className="hidden lg:flex items-center space-x-8">
          <a href="#" className="text-gray-700 hover:text-black transition-colors">The Stock Project</a>
          <a href="#" className="text-gray-700 hover:text-black transition-colors">Company</a>
          <a href="#" className="text-gray-700 hover:text-black transition-colors">Community</a>
        </nav>
        <button className="bg-black text-white px-6 py-2 rounded-lg hover:bg-gray-800 transition-colors">
          Join us
        </button>
      </header>

      {/* Main Content */}
      <main className="flex-1 flex">
        {/* Mobile View - Stacked layout */}
        <div className="lg:hidden w-full flex flex-col">
          {/* Image Slideshow */}
          <div className="relative h-[300px] w-full">
            {slideImages.map((image, index) => (
              <img
                key={index}
                src={image.src}
                alt={image.alt}
                className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 ${
                  index === currentImageIndex ? 'opacity-100' : 'opacity-0'
                }`}
              />
            ))}
            <div className="absolute bottom-4 left-4 text-white text-sm">
              {slideImages[currentImageIndex].credit}
            </div>
            {/* Slideshow indicators */}
            <div className="absolute bottom-4 right-4 flex gap-2">
              {slideImages.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentImageIndex(index)}
                  className={`w-2 h-2 rounded-full transition-colors ${
                    index === currentImageIndex ? 'bg-white' : 'bg-white/50'
                  }`}
                />
              ))}
            </div>
          </div>
          {/* Form */}
          <div className="flex-1 flex items-center justify-center p-6">
            <SignupForm />
          </div>
        </div>

        {/* Desktop View - Side by side layout */}
        <div className="hidden lg:flex w-full">
          {/* Left Side - Image Slideshow (60%) */}
          <div className="w-[60%] relative">
            {slideImages.map((image, index) => (
              <img
                key={index}
                src={image.src}
                alt={image.alt}
                className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 ${
                  index === currentImageIndex ? 'opacity-100' : 'opacity-0'
                }`}
              />
            ))}
            <div className="absolute bottom-6 left-6 text-white text-sm">
              {slideImages[currentImageIndex].credit}
            </div>
            {/* Slideshow indicators */}
            <div className="absolute bottom-6 right-6 flex gap-2">
              {slideImages.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentImageIndex(index)}
                  className={`w-3 h-3 rounded-full transition-colors ${
                    index === currentImageIndex ? 'bg-white' : 'bg-white/50'
                  }`}
                />
              ))}
            </div>
          </div>

          {/* Right Side - Form (40%) */}
          <div className="w-[40%] flex items-center justify-center px-8">
            <SignupForm />
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="text-center py-6 text-gray-600 text-sm bg-white border-t border-gray-200">
        2024 PHOTORUUM FACILITY
      </footer>
    </div>
  );
}
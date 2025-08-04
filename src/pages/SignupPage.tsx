import { useState, useEffect } from 'react';
import { SignupForm } from '../components/SignupForm';

// Image slideshow data
const slideImages = [
  {
    src: '/images/SignupSlider1.png',
    alt: 'Signup slider image 1',
    credit: 'Work by Karim Ouakkaha 🇲🇦'
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
    <div className="w-full pt-12">
      {/* Mobile View - Image at top, form below */}
      <div className="md:hidden flex flex-col items-center p-0">
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
        {/* Centered Form */}
        <div className="w-full flex justify-center">
          <SignupForm />
        </div>
      </div>

      {/* Desktop View - Side by side with proper spacing */}
      <main className="hidden md:flex min-h-[calc(100vh-200px)] pt-12 pb-12">
        {/* Left Side - Image Slideshow (stretches to left edge) */}
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

        {/* Right Side - Form (takes remaining space) */}
        <div className="w-[40%] flex items-center justify-center px-8">
          <SignupForm />
        </div>
      </main>
    </div>
  );
}
'use client';

import { useState, useEffect, useRef } from 'react';
import { FaPlay, FaTimes, FaQuoteLeft, FaStar } from 'react-icons/fa';

const testimonials = [
  {
    id: 1,
    name: 'Rajesh Kumar',
    company: 'Tech Solutions Pvt Ltd',
    role: 'CEO',
    videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
    thumbnail: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=500&h=300&fit=crop',
    quote: 'I Next ETS transformed our digital presence completely. Their expertise in web development is unmatched!',
    rating: 5,
  },
  {
    id: 2,
    name: 'Priya Sharma',
    company: 'Fashion Hub India',
    role: 'Founder',
    videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
    thumbnail: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=500&h=300&fit=crop',
    quote: 'Outstanding service! They delivered our e-commerce platform ahead of schedule with amazing features.',
    rating: 5,
  },
  {
    id: 3,
    name: 'Amit Patel',
    company: 'Digital Marketing Pro',
    role: 'Marketing Director',
    videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
    thumbnail: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=500&h=300&fit=crop',
    quote: 'Their SEO and digital marketing strategies increased our traffic by 300%. Highly recommended!',
    rating: 5,
  },
  {
    id: 4,
    name: 'Sneha Reddy',
    company: 'Wellness Center',
    role: 'Owner',
    videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
    thumbnail: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=500&h=300&fit=crop',
    quote: 'Professional team with excellent communication. They understood our vision perfectly!',
    rating: 5,
  },
];

const VideoTestimonials = () => {
  const [selectedVideo, setSelectedVideo] = useState(null);
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef(null);

  useEffect(() => {
    const currentRef = sectionRef.current;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.15 }
    );

    if (currentRef) {
      observer.observe(currentRef);
    }

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
    };
  }, []);

  const openVideo = (testimonial) => {
    setSelectedVideo(testimonial);
    document.body.style.overflow = 'hidden';
  };

  const closeVideo = () => {
    setSelectedVideo(null);
    document.body.style.overflow = 'unset';
  };

  return (
    <section ref={sectionRef} className="py-20 bg-slate-950 relative overflow-hidden">
      {/* Dark Ambient Glowing Decors */}
      <div className="absolute top-0 left-0 w-80 h-80 bg-blue-500/10 rounded-full filter blur-3xl"></div>
      <div className="absolute bottom-0 right-0 w-80 h-80 bg-purple-500/10 rounded-full filter blur-3xl"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header with Scroll Animation */}
        <div 
          className={`text-center mb-16 transition-all duration-1000 transform ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-6'
          }`}
        >
          <div className="inline-block mb-3">
            <span className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-5 py-1.5 rounded-full text-xs font-extrabold uppercase tracking-widest shadow-md">
              Client Success Stories
            </span>
          </div>
          <h2 className="text-2xl md:text-4xl font-extrabold text-white mb-3 tracking-tight">
            What Our Clients Say
          </h2>
          <p className="text-slate-400 text-sm md:text-base max-w-xl mx-auto font-medium">
            Hear directly from our satisfied clients about their experience working with us
          </p>
        </div>

        {/* Video Grid with Scroll Stagger Animation */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {testimonials.map((testimonial, index) => (
            <div
              key={testimonial.id}
              style={{ transitionDelay: `${index * 150}ms` }}
              className={`group relative bg-slate-900/40 backdrop-blur-md rounded-3xl border border-white/5 hover:border-white/10 hover:bg-slate-900/60 shadow-2xl transition-all duration-500 transform hover:-translate-y-2 flex flex-col overflow-hidden h-full ${
                isVisible ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 translate-y-10 scale-95'
              }`}
            >
              {/* Video Thumbnail */}
              <div 
                className="relative h-48 overflow-hidden cursor-pointer" 
                onClick={() => openVideo(testimonial)}
              >
                <img
                  src={testimonial.thumbnail}
                  alt={testimonial.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
                
                {/* Play Button Overlay */}
                <div className="absolute inset-0 bg-black/40 group-hover:bg-black/50 transition-all duration-300 flex items-center justify-center">
                  <div className="w-14 h-14 bg-gradient-to-br from-blue-500 to-indigo-600 text-white rounded-full flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300 border border-white/10">
                    <FaPlay className="text-white text-base ml-1" />
                  </div>
                </div>

                {/* Rating Badge */}
                <div className="absolute top-4 right-4 bg-slate-950/60 backdrop-blur-md border border-white/10 px-2.5 py-1 rounded-full flex items-center space-x-1 shadow-lg">
                  <FaStar className="text-yellow-400 text-xs" />
                  <span className="text-xs font-bold text-white">{testimonial.rating}.0</span>
                </div>
              </div>

              {/* Content Body */}
              <div className="p-6 flex flex-col flex-grow justify-between gap-5">
                {/* Quote Text */}
                <div>
                  <FaQuoteLeft className="text-blue-500/30 text-xl mb-2.5" />
                  <p className="text-slate-300 text-sm leading-relaxed italic min-h-[72px] line-clamp-3">
                    "{testimonial.quote}"
                  </p>
                </div>

                {/* Client Info footer */}
                <div className="border-t border-white/5 pt-4 flex items-center gap-3.5 mt-auto">
                  {/* Small Avatar */}
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-600 to-indigo-600 flex items-center justify-center text-white font-bold text-base shadow-inner flex-shrink-0">
                    {testimonial.name.charAt(0)}
                  </div>
                  
                  <div className="min-w-0">
                    <h4 className="font-extrabold text-white text-sm truncate leading-tight">
                      {testimonial.name}
                    </h4>
                    <p className="text-xs text-blue-400 font-bold leading-none mt-1">
                      {testimonial.role}
                    </p>
                    <p className="text-[10px] text-slate-500 font-medium leading-none mt-1.5 truncate">
                      {testimonial.company}
                    </p>
                  </div>
                </div>

                {/* Watch Button */}
                <button
                  suppressHydrationWarning
                  onClick={() => openVideo(testimonial)}
                  className="w-full py-2.5 bg-white/5 hover:bg-white/10 border border-white/10 text-white rounded-xl font-bold text-xs tracking-wider uppercase transition-all duration-300 hover:shadow-lg"
                >
                  Watch Review
                </button>
              </div>
            </div>
          ))}
        </div>

      </div>

      {/* Video Modal */}
      {selectedVideo && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/95 backdrop-blur-sm animate-fadeIn">
          <div className="relative w-full max-w-4xl">
            {/* Close Button */}
            <button
              suppressHydrationWarning
              onClick={closeVideo}
              className="absolute -top-12 right-0 w-9 h-9 bg-white/10 hover:bg-white/20 border border-white/10 text-white rounded-full flex items-center justify-center transition-all duration-200 shadow-lg"
            >
              <FaTimes className="text-white text-lg" />
            </button>

            {/* Video Container */}
            <div className="relative bg-black rounded-2xl overflow-hidden shadow-2xl border border-white/5" style={{ paddingBottom: '56.25%' }}>
              <iframe
                className="absolute top-0 left-0 w-full h-full"
                src={selectedVideo.videoUrl}
                title={selectedVideo.name}
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
            </div>

            {/* Video Info Panel - Dark Theme */}
            <div className="mt-5 bg-slate-900 border border-white/10 rounded-2xl p-5 shadow-2xl text-white">
              <div className="flex items-start justify-between">
                <div>
                  <h3 className="text-xl font-extrabold text-white mb-1">{selectedVideo.name}</h3>
                  <p className="text-xs text-blue-400 font-bold">{selectedVideo.role}</p>
                  <p className="text-xs text-slate-500 mt-1">{selectedVideo.company}</p>
                </div>
                <div className="flex items-center space-x-1 bg-slate-950/60 border border-white/10 px-3.5 py-1.5 rounded-full shadow-lg">
                  <FaStar className="text-yellow-400 text-sm" />
                  <span className="font-extrabold text-white text-xs">{selectedVideo.rating}.0</span>
                </div>
              </div>
              <p className="mt-4 text-slate-300 text-sm leading-relaxed italic border-t border-white/5 pt-4">"{selectedVideo.quote}"</p>
            </div>
          </div>
        </div>
      )}

      <style jsx>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }
        .animate-fadeIn {
          animation: fadeIn 0.3s ease-out;
        }
      `}</style>
    </section>
  );
};

export default VideoTestimonials;

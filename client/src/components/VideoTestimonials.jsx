'use client';

import { useState } from 'react';
import { FaPlay, FaTimes, FaQuoteLeft, FaStar } from 'react-icons/fa';

const VideoTestimonials = () => {
  const [selectedVideo, setSelectedVideo] = useState(null);

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

  const openVideo = (testimonial) => {
    setSelectedVideo(testimonial);
    document.body.style.overflow = 'hidden';
  };

  const closeVideo = () => {
    setSelectedVideo(null);
    document.body.style.overflow = 'unset';
  };

  return (
    <section className="py-20 bg-gradient-to-br from-gray-50 via-blue-50 to-purple-50 relative overflow-hidden">
      {/* Background Decorations */}
      <div className="absolute top-0 left-0 w-72 h-72 bg-blue-200 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob"></div>
      <div className="absolute top-0 right-0 w-72 h-72 bg-purple-200 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-2000"></div>
      <div className="absolute bottom-0 left-1/2 w-72 h-72 bg-pink-200 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-4000"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="inline-block mb-4">
            <span className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-2 rounded-full text-sm font-semibold shadow-lg">
              Client Success Stories
            </span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            What Our Clients Say
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Hear directly from our satisfied clients about their experience working with us
          </p>
        </div>

        {/* Video Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {testimonials.map((testimonial, index) => (
            <div
              key={testimonial.id}
              className="group relative bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden transform hover:-translate-y-2"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              {/* Video Thumbnail */}
              <div className="relative h-48 overflow-hidden cursor-pointer" onClick={() => openVideo(testimonial)}>
                <img
                  src={testimonial.thumbnail}
                  alt={testimonial.name}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                {/* Play Button Overlay */}
                <div className="absolute inset-0 bg-black/40 group-hover:bg-black/50 transition-all duration-300 flex items-center justify-center">
                  <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center shadow-xl group-hover:scale-110 transition-transform duration-300">
                    <FaPlay className="text-blue-600 text-xl ml-1" />
                  </div>
                </div>
                {/* Rating Badge */}
                <div className="absolute top-4 right-4 bg-white/95 backdrop-blur-sm px-3 py-1 rounded-full flex items-center space-x-1 shadow-lg">
                  <FaStar className="text-yellow-400 text-sm" />
                  <span className="text-sm font-bold text-gray-900">{testimonial.rating}.0</span>
                </div>
              </div>

              {/* Content */}
              <div className="p-6">
                {/* Quote */}
                <div className="mb-4">
                  <FaQuoteLeft className="text-blue-600 text-2xl mb-2 opacity-50" />
                  <p className="text-gray-700 text-sm leading-relaxed line-clamp-3">
                    {testimonial.quote}
                  </p>
                </div>

                {/* Client Info */}
                <div className="border-t border-gray-100 pt-4">
                  <h4 className="font-bold text-gray-900 text-lg">{testimonial.name}</h4>
                  <p className="text-sm text-blue-600 font-medium">{testimonial.role}</p>
                  <p className="text-xs text-gray-500 mt-1">{testimonial.company}</p>
                </div>

                {/* Watch Button */}
                <button
                  onClick={() => openVideo(testimonial)}
                  className="mt-4 w-full py-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg font-semibold hover:from-blue-700 hover:to-purple-700 transition-all duration-200 shadow-md hover:shadow-lg"
                >
                  Watch Video
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* CTA Section */}
        <div className="mt-16 text-center">
          <div className="bg-white rounded-2xl shadow-xl p-8 md:p-12 max-w-4xl mx-auto">
            <h3 className="text-3xl font-bold text-gray-900 mb-4">
              Ready to Join Our Success Stories?
            </h3>
            <p className="text-gray-600 mb-8 text-lg">
              Let's create something amazing together. Get in touch with us today!
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="/contact"
                className="px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl font-semibold hover:from-blue-700 hover:to-purple-700 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:scale-105"
              >
                Start Your Project
              </a>
              <a
                href="/portfolio"
                className="px-8 py-4 bg-white border-2 border-gray-300 text-gray-700 rounded-xl font-semibold hover:border-blue-600 hover:text-blue-600 transition-all duration-200"
              >
                View Our Work
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Video Modal */}
      {selectedVideo && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-sm animate-fadeIn">
          <div className="relative w-full max-w-5xl">
            {/* Close Button */}
            <button
              onClick={closeVideo}
              className="absolute -top-12 right-0 w-10 h-10 bg-white rounded-full flex items-center justify-center hover:bg-gray-100 transition-colors duration-200 shadow-lg"
            >
              <FaTimes className="text-gray-900 text-xl" />
            </button>

            {/* Video Container */}
            <div className="relative bg-black rounded-2xl overflow-hidden shadow-2xl" style={{ paddingBottom: '56.25%' }}>
              <iframe
                className="absolute top-0 left-0 w-full h-full"
                src={selectedVideo.videoUrl}
                title={selectedVideo.name}
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
            </div>

            {/* Video Info */}
            <div className="mt-6 bg-white rounded-xl p-6 shadow-xl">
              <div className="flex items-start justify-between">
                <div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">{selectedVideo.name}</h3>
                  <p className="text-blue-600 font-medium">{selectedVideo.role}</p>
                  <p className="text-gray-600">{selectedVideo.company}</p>
                </div>
                <div className="flex items-center space-x-1 bg-yellow-50 px-4 py-2 rounded-full">
                  <FaStar className="text-yellow-400" />
                  <span className="font-bold text-gray-900">{selectedVideo.rating}.0</span>
                </div>
              </div>
              <p className="mt-4 text-gray-700 leading-relaxed">{selectedVideo.quote}</p>
            </div>
          </div>
        </div>
      )}

      <style jsx>{`
        @keyframes blob {
          0% {
            transform: translate(0px, 0px) scale(1);
          }
          33% {
            transform: translate(30px, -50px) scale(1.1);
          }
          66% {
            transform: translate(-20px, 20px) scale(0.9);
          }
          100% {
            transform: translate(0px, 0px) scale(1);
          }
        }
        .animate-blob {
          animation: blob 7s infinite;
        }
        .animation-delay-2000 {
          animation-delay: 2s;
        }
        .animation-delay-4000 {
          animation-delay: 4s;
        }
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

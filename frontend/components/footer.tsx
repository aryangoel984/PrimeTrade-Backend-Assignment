import Link from 'next/link';
import { Github, Linkedin, Mail, Phone, Heart } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-black text-white border-t border-gray-800 mt-auto">
      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="flex flex-col md:flex-row justify-between items-center gap-8">
          
          {/* Brand & Name */}
          <div className="text-center md:text-left">
            <h2 className="text-2xl font-bold tracking-tight">Aryan Goel</h2>
            <p className="text-sm text-gray-400 mt-2">
              Full Stack Developer & Designer
            </p>
          </div>

          {/* Contact Details */}
          <div className="flex flex-col gap-3 text-sm text-gray-300">
            <a href="tel:9654830484" className="flex items-center gap-3 hover:text-blue-400 transition duration-300">
              <Phone size={18} />
              +91 9654830484
            </a>
            <a href="mailto:aryan.goel985@gmail.com" className="flex items-center gap-3 hover:text-blue-400 transition duration-300">
              <Mail size={18} />
              aryan.goel985@gmail.com
            </a>
          </div>

          {/* Social Links */}
          <div className="flex gap-4">
            <a 
              href="https://www.linkedin.com/in/aryan-goel-946a04264/" 
              target="_blank" 
              rel="noopener noreferrer"
              className="p-3 bg-gray-900 rounded-full text-gray-400 hover:bg-blue-600 hover:text-white transition duration-300 border border-gray-800"
              aria-label="LinkedIn"
            >
              <Linkedin size={20} />
            </a>
            <a 
              href="https://github.com/aryangoel984" 
              target="_blank" 
              rel="noopener noreferrer"
              className="p-3 bg-gray-900 rounded-full text-gray-400 hover:bg-white hover:text-black transition duration-300 border border-gray-800"
              aria-label="GitHub"
            >
              <Github size={20} />
            </a>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-800 mt-10 pt-8 text-center">
          <p className="text-sm text-gray-500 flex items-center justify-center gap-1">
            © {new Date().getFullYear()} Aryan Goel. Made with <Heart size={14} className="text-red-500 fill-red-500 mx-1" /> in Next.js
          </p>
        </div>
      </div>
    </footer>
  );
}
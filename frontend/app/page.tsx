import Link from "next/link";
import { ArrowRight, CheckCircle2 } from "lucide-react";

export default function Home() {
  return (
    <main className="min-h-screen bg-white">
      {/* Navbar */}
      <nav className="flex items-center justify-between px-8 py-6 max-w-7xl mx-auto">
        <div className="text-2xl font-bold text-gray-900">
          Personal<span className="text-blue-600">Manager</span>
        </div>
        <div className="flex gap-4">
          <Link href="/login" className="text-gray-600 hover:text-gray-900 font-medium px-4 py-2">
            Log in
          </Link>
          <Link 
            href="/signup" 
            className="bg-blue-600 text-white px-5 py-2 rounded-full font-medium hover:bg-blue-700 transition"
          >
            Sign up free
          </Link>
        </div>
      </nav>

      {/* Hero Section */}
      <div className="flex flex-col items-center justify-center text-center px-4 mt-20 mb-20">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 text-blue-700 text-sm font-medium mb-6">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500"></span>
          </span>
          New: Auto-fetch bookmark titles
        </div>
        
        <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight text-gray-900 mb-6 max-w-4xl">
          Organize your <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">digital life</span> in one place.
        </h1>
        
        <p className="text-xl text-gray-600 mb-10 max-w-2xl leading-relaxed">
          The all-in-one workspace for your notes and bookmarks. Capture ideas, save links, and keep everything tagged and searchable.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 w-full justify-center">
          <Link 
            href="/signup" 
            className="inline-flex items-center justify-center gap-2 bg-blue-600 text-white px-8 py-4 rounded-xl text-lg font-semibold hover:bg-blue-700 transition shadow-lg hover:shadow-xl hover:-translate-y-0.5 duration-200"
          >
            Get Started for Free <ArrowRight size={20} />
          </Link>
          <Link 
            href="/login" 
            className="inline-flex items-center justify-center gap-2 bg-gray-100 text-gray-700 px-8 py-4 rounded-xl text-lg font-semibold hover:bg-gray-200 transition"
          >
            View Demo
          </Link>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-24 max-w-6xl text-left px-6">
          {[
            { title: "Smart Bookmarks", desc: "Save URLs and we'll automatically fetch the titles for you." },
            { title: "Tagging System", desc: "Organize everything with a flexible tagging system." },
            { title: "Instant Search", desc: "Find any note or bookmark instantly with powerful search." }
          ].map((feature, i) => (
            <div key={i} className="p-6 rounded-2xl bg-gray-50 border border-gray-100">
              <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center text-blue-600 mb-4">
                <CheckCircle2 size={20} />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">{feature.title}</h3>
              <p className="text-gray-600">{feature.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}

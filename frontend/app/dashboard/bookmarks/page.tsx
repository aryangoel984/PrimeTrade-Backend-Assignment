"use client";
import { useState, useEffect } from 'react';
import api from '@/lib/api';
import toast from 'react-hot-toast';
import { Plus, Search, Tag, Trash2, ExternalLink, Globe, X, Heart } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';

export default function BookmarksPage() {
  const { user } = useAuth();
  const [bookmarks, setBookmarks] = useState([]);
  const [search, setSearch] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [loading, setLoading] = useState(false);

  // New Bookmark State
  const [newUrl, setNewUrl] = useState('');
  const [newTitle, setNewTitle] = useState('');
  const [newDesc, setNewDesc] = useState('');
  const [newTags, setNewTags] = useState('');

  const fetchBookmarks = async () => {
    try {
      const query = search ? `?q=${search}` : '';
      const { data } = await api.get(`/bookmarks${query}`);
      setBookmarks(data);
    } catch (error) {
      toast.error('Failed to load bookmarks');
    }
  };

  useEffect(() => {
    fetchBookmarks();
  }, [search]);

  const handleCreate = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const tagsArray = newTags.split(',').map(t => t.trim()).filter(Boolean);
      
      await api.post('/bookmarks', {
        url: newUrl,
        title: newTitle, 
        description: newDesc,
        tags: tagsArray
      });
      
      toast.success('Bookmark saved!');
      setShowModal(false);
      setNewUrl('');
      setNewTitle('');
      setNewDesc('');
      setNewTags('');
      fetchBookmarks();
    } catch (error) {
      toast.error(error.response?.data?.error || 'Failed to save bookmark');
    } finally {
      setLoading(false);
    }
  };

  const toggleFavorite = async (bookmark) => {
    try {
      const updatedBookmark = { ...bookmark, isFavorite: !bookmark.isFavorite };
      
      // Optimistic UI Update
      // @ts-ignore
      setBookmarks(bookmarks.map(b => b.id === bookmark.id ? updatedBookmark : b));

      // API Call
      await api.put(`/bookmarks/${bookmark.id}`, {
        isFavorite: updatedBookmark.isFavorite
      });
    } catch (error) {
      toast.error('Failed to update favorite');
      fetchBookmarks(); 
    }
  };

  const handleDelete = async (id) => {
    if (!confirm('Delete this bookmark?')) return;
    try {
      await api.delete(`/bookmarks/${id}`);
      toast.success('Bookmark deleted');
      setBookmarks(bookmarks.filter(b => b.id !== id));
    } catch (error) {
      toast.error('Failed to delete');
    }
  };

  return (
    <div className="max-w-6xl mx-auto p-4">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">My Bookmarks</h1>
          <p className="text-gray-700 mt-1">Save and organize your favorite links.</p>
        </div>
        <button 
          onClick={() => setShowModal(true)}
          className="flex items-center gap-2 bg-indigo-600 text-white px-5 py-2.5 rounded-lg hover:bg-indigo-700 transition font-medium shadow-sm"
        >
          <Plus size={20} /> Add Bookmark
        </button>
      </div>

      {/* Search Bar */}
      <div className="relative mb-8">
        <Search className="absolute left-4 top-3.5 text-gray-500" size={20} />
        <input 
          type="text" 
          placeholder="Search bookmarks by title, URL, or tags..." 
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition text-gray-900 placeholder-gray-500 shadow-sm"
        />
      </div>

      {/* List Layout */}
      <div className="grid grid-cols-1 gap-4">
        {bookmarks.map(bookmark => (
          <div key={bookmark.id} className="bg-white p-5 rounded-xl shadow-sm border border-gray-200 hover:shadow-md transition group flex flex-col md:flex-row gap-4 items-start md:items-center relative">
            
            {/* Icon */}
            <div className="w-12 h-12 rounded-lg bg-indigo-50 text-indigo-600 flex items-center justify-center flex-shrink-0">
              <Globe size={24} />
            </div>

            {/* Content */}
            <div className="flex-1 min-w-0 pr-12"> {/* Added padding-right to prevent overlap with buttons */}
              <div className="flex items-center gap-2 mb-1">
                <a 
                  href={bookmark.url} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-lg font-bold text-gray-900 hover:text-indigo-600 transition truncate block"
                >
                  {bookmark.title || bookmark.url}
                </a>
                <ExternalLink size={14} className="text-gray-400" />
                {bookmark.isFavorite && <Heart size={14} className="text-red-500 fill-red-500" />}
              </div>
              
              <p className="text-gray-600 text-sm mb-2 truncate">
                {bookmark.url}
              </p>
              
              {bookmark.description && (
                 <p className="text-gray-700 text-sm mb-3 line-clamp-1">
                   {bookmark.description}
                 </p>
              )}

              <div className="flex flex-wrap gap-2">
                {bookmark.tags.map(tag => (
                  <span key={tag} className="inline-flex items-center px-2.5 py-0.5 rounded-full bg-indigo-50 text-xs font-semibold text-indigo-700 border border-indigo-100">
                    <Tag size={10} className="mr-1.5" /> {tag}
                  </span>
                ))}
              </div>
            </div>

            {/* Actions (Absolute positioned on mobile, flex on desktop) */}
            <div className="flex items-center gap-1 md:gap-2 absolute top-4 right-4 md:static md:ml-auto">
               <button 
                onClick={() => toggleFavorite(bookmark)}
                className={`p-2 rounded-lg transition ${
                  bookmark.isFavorite ? 'text-red-500 bg-red-50' : 'text-gray-400 hover:text-red-500 hover:bg-red-50'
                }`}
                title="Toggle Favorite"
              >
                <Heart size={20} fill={bookmark.isFavorite ? "currentColor" : "none"} />
              </button>

               {/* Delete Button - ONLY VISIBLE TO ADMIN */}
{user?.role === 'ADMIN' && (
  <button 
    onClick={() => handleDelete(bookmark.id)}
    className="text-gray-400 hover:text-red-600 transition p-2 rounded-lg hover:bg-red-50"
    title="Delete Bookmark"
  >
    <Trash2 size={20} />
  </button>
)}
            </div>
          </div>
        ))}

        {bookmarks.length === 0 && (
          <div className="text-center py-20 border-2 border-dashed border-gray-200 rounded-xl bg-gray-50">
            <h3 className="text-lg font-medium text-gray-900">No bookmarks yet</h3>
            <p className="text-gray-600">Save your first link to get started!</p>
          </div>
        )}
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl w-full max-w-lg shadow-2xl animate-in fade-in zoom-in duration-200">
            <div className="flex justify-between items-center p-6 border-b border-gray-100">
              <h2 className="text-xl font-bold text-gray-900">Add New Bookmark</h2>
              <button onClick={() => setShowModal(false)} className="text-gray-400 hover:text-gray-600">
                <X size={24} />
              </button>
            </div>
            
            <form onSubmit={handleCreate} className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">URL (Required)</label>
                <input
                  type="url"
                  placeholder="https://example.com"
                  value={newUrl}
                  onChange={e => setNewUrl(e.target.value)}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none text-gray-900"
                  required
                />
              </div>
              
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">
                  Title <span className="text-gray-400 font-normal">(Optional - Auto-fetched if empty)</span>
                </label>
                <input
                  type="text"
                  placeholder="My Awesome Link"
                  value={newTitle}
                  onChange={e => setNewTitle(e.target.value)}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none text-gray-900"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">Description</label>
                <input
                  type="text"
                  placeholder="Short description..."
                  value={newDesc}
                  onChange={e => setNewDesc(e.target.value)}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none text-gray-900"
                />
              </div>
              
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">Tags</label>
                <input
                  type="text"
                  placeholder="tech, news, reading"
                  value={newTags}
                  onChange={e => setNewTags(e.target.value)}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none text-gray-900"
                />
              </div>

              <div className="flex justify-end gap-3 pt-4">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="px-5 py-2.5 text-gray-700 font-medium hover:bg-gray-100 rounded-lg transition"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={loading}
                  className="px-5 py-2.5 bg-indigo-600 text-white font-medium rounded-lg hover:bg-indigo-700 transition shadow-sm disabled:opacity-70 flex items-center gap-2"
                >
                  {loading && <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />}
                  {loading ? 'Fetching Title...' : 'Save Bookmark'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
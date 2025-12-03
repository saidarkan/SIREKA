import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import articles from '../Data/artikel.json';

const ArtikelDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  
  const article = articles.find(article => article.id === parseInt(id));
  
  if (!article) {
    return (
      <div className="p-6">
        <div className="bg-white rounded-xl shadow-md p-6 text-center">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">Artikel tidak ditemukan</h2>
          <button 
            onClick={() => navigate('/artikel')}
            className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition"
          >
            Kembali ke Daftar Artikel
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <div className="bg-white rounded-xl shadow-md overflow-hidden">
        <div className="p-6">
          <div className="flex justify-between items-start mb-6">
            <div>
              <span className="inline-block bg-green-600 text-white px-3 py-1 rounded-full text-xs font-medium mb-3">
                {article.category}
              </span>
              <h1 className="text-3xl font-bold text-gray-800">{article.title}</h1>
              <div className="flex items-center mt-2 text-gray-500">
                <span>Ditulis oleh {article.author}</span>
                <span className="mx-2">•</span>
                <span>{new Date(article.date).toLocaleDateString('id-ID', {
                  weekday: 'long',
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric'
                })}</span>
              </div>
            </div>
            <button 
              onClick={() => navigate('/artikel')}
              className="flex items-center gap-1 px-4 py-2 bg-gray-100 text-gray-700 rounded-md hover:bg-gray-200 transition"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z" clipRule="evenodd" />
              </svg>
              Kembali
            </button>
          </div>
          
          <div className="prose max-w-none mt-6 text-gray-700">
            {article.content.split('\n').map((paragraph, index) => (
              <p key={index} className="mb-4">{paragraph}</p>
            ))}
          </div>
          
          <div className="mt-8 pt-6 border-t border-gray-200 flex justify-between items-center">
            <div>
              <span className="text-sm text-gray-500">ID Artikel:</span>
              <span className="ml-2 font-medium">R{article.id.toString().padStart(3, '0')}</span>
            </div>
            <span className={`px-3 py-1 rounded-full text-xs font-medium ${
              article.status === 'Published' 
                ? 'bg-green-100 text-green-700' 
                : 'bg-yellow-100 text-yellow-700'
            }`}>
              {article.status === 'Published' ? 'Artikel Publik' : 'Artikel Draft'}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ArtikelDetail;
import { useState } from 'react';
import { useStore } from '../../hooks/useStore';
import HeroCarousel from '../../components/common/HeroCarousel';
const RequestDemoPage = () => {
  const [formData, setFormData] = useState({ name: '', email: '', company: '', phone: '', message: '' });
  const [submitted, setSubmitted] = useState(false);
  const { setPage } = useStore();

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div>
      <HeroCarousel />
    
    <div className="min-h-screen bg-gray-50 py-12 px-4">
      <div className="max-w-2xl mx-auto bg-white rounded-lg shadow-xl p-8">
        <h2 className="text-3xl font-bold text-center mb-6 text-[#191970]">Request a Demo</h2>
        
        {!submitted ? (
          <form onSubmit={handleSubmit}>
            <p className="text-gray-600 mb-6 text-center">
              Fill out the form below and our team will contact you to schedule a personalized demo.
            </p>
            
            <div className="grid md:grid-cols-2 gap-4 mb-4">
              <div>
                <label className="block text-gray-700 mb-2">Name</label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                  className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>
              
              <div>
                <label className="block text-gray-700 mb-2">Email</label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({...formData, email: e.target.value})}
                  className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-4 mb-4">
              <div>
                <label className="block text-gray-700 mb-2">Company</label>
                <input
                  type="text"
                  value={formData.company}
                  onChange={(e) => setFormData({...formData, company: e.target.value})}
                  className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>
              
              <div>
                <label className="block text-gray-700 mb-2">Phone</label>
                <input
                  type="tel"
                  value={formData.phone}
                  onChange={(e) => setFormData({...formData, phone: e.target.value})}
                  className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>
            </div>

            <div className="mb-6">
              <label className="block text-gray-700 mb-2">Message (Optional)</label>
              <textarea
                value={formData.message}
                onChange={(e) => setFormData({...formData, message: e.target.value})}
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 h-32"
              />
            </div>

            <button
              type="submit"
              className="w-full bg-linear-to-br from-slate-950 via-blue-950 to-blue-900
 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition"
            >
              Submit Request
            </button>
          </form>
        ) : (
          <div className="text-center">
            <div className="bg-orange-100 text-blue-800 p-6 rounded-lg mb-6">
              <h3 className="text-xl font-bold mb-2">Thank You!</h3>
              <p>Your demo request has been submitted. Our team will contact you within 24 hours.</p>
            </div>
            <button 
              onClick={() => setPage('home')}
              className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition"
              
            >
              Back to Home
            </button>
          </div>
        )}
      </div>
    </div>
   </div> 
  );
};
export default RequestDemoPage;
import { Mail, Phone, MapPin, Send, Clock, Sparkles } from "lucide-react";
import HeroCarousel from "../../components/common/HeroCarousel";
import { useState } from "react";

const ContactPage = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    // Add your form submission logic here
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const contactInfo = [
    {
      icon: Mail,
      title: 'Email',
      details: 'contact@smarterpatent.com',
      subtext: 'We\'ll respond within 24 hours',
      gradient: 'from-[#C9A94D] to-[#E6C968]'
    },
    {
      icon: Phone,
      title: 'Phone',
      details: '+1 (555) 123-4567',
      subtext: 'Mon-Fri, 9AM-6PM EST',
      gradient: 'from-[#191970] to-[#4a5fa8]'
    },
    {
      icon: MapPin,
      title: 'Address',
      details: '123 Innovation Drive',
      subtext: 'Tech Valley, CA 94000',
      gradient: 'from-[#C9A94D] to-[#B2923E]'
    },
    {
      icon: Clock,
      title: 'Business Hours',
      details: 'Monday - Friday',
      subtext: '9:00 AM - 6:00 PM EST',
      gradient: 'from-[#191970] to-[#2e3a8c]'
    }
  ];

  return (
    <div className="bg-[#EDEADC] min-h-screen">
      <HeroCarousel />
    
      <div className="py-20 px-4">
        <div className="max-w-7xl mx-auto">
          {/* Header Section */}
          <div className="text-center mb-16">
            <h1 className="text-5xl font-bold text-[#191970] mb-4">
              Let's Start a Conversation
            </h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Have questions? We'd love to hear from you. Send us a message and we'll respond as soon as possible.
            </p>
          </div>
          
          {/* Main Content Grid */}
          <div className="grid lg:grid-cols-3 gap-8 mb-12">
            {/* Contact Information Cards - Left Column */}
            <div className="lg:col-span-1 space-y-4">
              {contactInfo.map((info, index) => {
                const Icon = info.icon;
                return (
                  <div 
                    key={index}
                    className="group bg-white/40 border-[1.5px] border-[#dcdab4]/45 rounded-[15px] p-6 shadow-[0_8px_24px_0_rgba(25,25,112,0.09),0_1.5px_6px_0_rgba(25,25,112,0.12),inset_0_0.5px_0.5px_0_rgba(255,255,255,0.40)] backdrop-blur-sm backdrop-saturate-120 transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_12px_30px_rgba(0,0,0,0.15)]"
                  >
                    <div className="flex items-start gap-4">
                      {/* Icon with Gradient Background */}
                      <div className="relative">
                        <div className={`absolute inset-0 bg-linear-to-br ${info.gradient} rounded-lg blur-md opacity-30 group-hover:opacity-50 transition-opacity duration-300`}></div>
                        <div className={`relative bg-linear-to-br ${info.gradient} w-12 h-12 rounded-lg flex items-center justify-center shadow-md group-hover:scale-110 transition-transform duration-300`}>
                          <Icon className="h-6 w-6 text-white" strokeWidth={1.5} />
                        </div>
                      </div>
                      
                      {/* Contact Details */}
                      <div className="flex-1">
                        <h3 className="font-bold text-[#0A1F14] mb-1">{info.title}</h3>
                        <p className="text-[#191970] font-semibold text-sm mb-1">{info.details}</p>
                        <p className="text-[#555] text-xs">{info.subtext}</p>
                      </div>
                    </div>
                  </div>
                );
              })}

              {/* Quick Info Box */}
              <div className="bg-linear-to-br from-[#191970] via-[#2e3a8c] to-[#4a5fa8] rounded-[15px] p-6 text-white shadow-lg">
                <div className="flex items-center gap-2 mb-3">
                  <Sparkles className="h-5 w-5 text-[#C9A94D]" />
                  <h3 className="font-bold">Quick Response</h3>
                </div>
                <p className="text-white/90 text-sm leading-relaxed">
                  Our dedicated team typically responds to inquiries within 24 hours during business days.
                </p>
              </div>
            </div>

            {/* Contact Form - Right Column */}
            <div className="lg:col-span-2">
              <div className="bg-white/60 border-[1.5px] border-[#dcdab4]/45 rounded-[20px] p-8 md:p-10 shadow-[0_12px_40px_rgba(25,25,112,0.12),0_4px_12px_rgba(25,25,112,0.08),inset_0_1px_1px_0_rgba(255,255,255,0.40)] backdrop-blur-md backdrop-saturate-120">
                <div className="mb-8">
                  <h2 className="text-3xl font-bold text-[#191970] mb-2">Send Us a Message</h2>
                  <p className="text-gray-600">Fill out the form below and we'll get back to you shortly</p>
                </div>
                
                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* Name Input */}
                  <div className="group">
                    <label className="block text-sm font-semibold text-[#0A1F14] mb-2">
                      Your Name *
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="John Doe"
                      required
                      className="w-full px-4 py-3 bg-white/80 border-2 border-[#dcdab4]/60 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#191970] focus:border-transparent transition-all duration-300 placeholder:text-gray-400"
                    />
                  </div>

                  {/* Email Input */}
                  <div className="group">
                    <label className="block text-sm font-semibold text-[#0A1F14] mb-2">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="john@example.com"
                      required
                      className="w-full px-4 py-3 bg-white/80 border-2 border-[#dcdab4]/60 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#191970] focus:border-transparent transition-all duration-300 placeholder:text-gray-400"
                    />
                  </div>

                  {/* Message Textarea */}
                  <div className="group">
                    <label className="block text-sm font-semibold text-[#0A1F14] mb-2">
                      Your Message *
                    </label>
                    <textarea
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      placeholder="Tell us about your patent protection needs..."
                      rows="5"
                      required
                      className="w-full px-4 py-3 bg-white/80 border-2 border-[#dcdab4]/60 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#191970] focus:border-transparent transition-all duration-300 resize-none placeholder:text-gray-400"
                    />
                  </div>

                  {/* Submit Button */}
                  <button
                    type="submit"
                    className="group w-full relative bg-[#C9A94D] text-[#0A1F14] px-8 py-4 rounded-xl font-bold uppercase tracking-wide text-sm shadow-[0_4px_18px_2px_rgba(201,169,77,0.3),0_2px_12px_2px_rgba(201,169,77,0.2),inset_0_0.5px_0.5px_0_rgba(255,255,220,0.19)] transition-all duration-300 hover:scale-[1.02] hover:shadow-[0_8px_32px_4px_rgba(201,169,77,0.4),0_4px_20px_4px_rgba(201,169,77,0.3)] active:scale-95 overflow-hidden"
                    style={{
                      backgroundImage: 'linear-gradient(180deg, #FFF8E2 0%, #C9A94D 38%, #B2923E 100%)'
                    }}
                  >
                    <span className="relative z-10 flex items-center justify-center gap-2">
                      Send Message
                      <Send className="h-5 w-5 group-hover:translate-x-1 transition-transform duration-300" />
                    </span>
                    
                    {/* Button Shine Effect */}
                    <div className="absolute inset-0 bg-linear-to-r from-transparent via-white/30 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700"></div>
                  </button>

                  <p className="text-xs text-gray-500 text-center mt-4">
                    By submitting this form, you agree to our privacy policy and terms of service.
                  </p>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactPage;
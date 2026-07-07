import { useState, FormEvent } from 'react';
import { Mail, MessageSquare, Send, CheckCircle2, User, AlertCircle, Heart } from 'lucide-react';

export default function Contact() {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [errors, setErrors] = useState<Partial<typeof formData>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleInputChange = (field: keyof typeof formData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors((prev) => {
        const copy = { ...prev };
        delete copy[field];
        return copy;
      });
    }
  };

  const validate = (): boolean => {
    const newErrors: typeof errors = {};
    if (!formData.name.trim()) newErrors.name = 'Name is required';
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }
    if (!formData.message.trim()) newErrors.message = 'Message is required';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setIsSubmitting(true);

    // Simulate server request
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSuccess(true);
      setFormData({ name: '', email: '', message: '' });
    }, 1200);
  };

  return (
    <section
      id="contact"
      className="relative bg-slate-50 dark:bg-slate-950/40 pt-16 sm:pt-24 pb-8 border-t border-slate-100 dark:border-slate-800/60 transition-colors duration-300"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Heading */}
        <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
          <h2 className="text-3xl sm:text-4xl font-sans font-bold text-slate-900 dark:text-white tracking-tight">
            Get In Touch
          </h2>
          <div className="w-16 h-1.5 bg-green-500 rounded-full mx-auto mt-4 mb-4" />
          <p className="text-base sm:text-lg text-slate-600 dark:text-slate-400">
            Have questions or feedback about our BMI tracker? We would love to hear from you. Drop us a message below.
          </p>
        </div>

        {/* Form Card */}
        <div className="max-w-2xl mx-auto bg-white dark:bg-slate-900 rounded-3xl shadow-xl shadow-slate-200/20 dark:shadow-none border border-slate-100 dark:border-slate-800/80 p-6 sm:p-10 transition-all duration-300">
          {isSuccess ? (
            <div className="text-center py-8 space-y-4 animate-fadeIn">
              <div className="inline-flex p-4 bg-green-50 dark:bg-green-950/30 text-green-500 rounded-full mb-2">
                <CheckCircle2 className="w-12 h-12" />
              </div>
              <h3 className="text-2xl font-sans font-bold text-slate-900 dark:text-white">
                Message Sent Successfully!
              </h3>
              <p className="text-slate-600 dark:text-slate-400 max-w-sm mx-auto">
                Thank you for contacting Health Tracker. Our health specialist team will get back to you shortly.
              </p>
              <button
                onClick={() => setIsSuccess(false)}
                className="mt-4 px-6 py-2.5 bg-green-500 hover:bg-green-600 text-white font-semibold rounded-xl active:scale-95 transition-all duration-150"
              >
                Send Another Message
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6" noValidate>
              {/* Name */}
              <div>
                <label htmlFor="contact-name" className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2">
                  Full Name <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center text-slate-400">
                    <User className="w-5 h-5" />
                  </span>
                  <input
                    id="contact-name"
                    type="text"
                    placeholder="John Doe"
                    value={formData.name}
                    onChange={(e) => handleInputChange('name', e.target.value)}
                    className={`w-full pl-11 pr-4 py-3 bg-slate-50 dark:bg-slate-950 text-slate-800 dark:text-white border ${
                      errors.name ? 'border-red-500' : 'border-slate-200 dark:border-slate-800 focus:border-green-500'
                    } rounded-2xl transition-all duration-200 outline-none focus:ring-4 focus:ring-green-500/10 font-medium`}
                    required
                  />
                </div>
                {errors.name && (
                  <p className="mt-1.5 text-xs text-red-500 flex items-center gap-1">
                    <AlertCircle className="w-3.5 h-3.5" /> {errors.name}
                  </p>
                )}
              </div>

              {/* Email */}
              <div>
                <label htmlFor="contact-email" className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2">
                  Email Address <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center text-slate-400">
                    <Mail className="w-5 h-5" />
                  </span>
                  <input
                    id="contact-email"
                    type="email"
                    placeholder="johndoe@example.com"
                    value={formData.email}
                    onChange={(e) => handleInputChange('email', e.target.value)}
                    className={`w-full pl-11 pr-4 py-3 bg-slate-50 dark:bg-slate-950 text-slate-800 dark:text-white border ${
                      errors.email ? 'border-red-500' : 'border-slate-200 dark:border-slate-800 focus:border-green-500'
                    } rounded-2xl transition-all duration-200 outline-none focus:ring-4 focus:ring-green-500/10 font-medium`}
                    required
                  />
                </div>
                {errors.email && (
                  <p className="mt-1.5 text-xs text-red-500 flex items-center gap-1">
                    <AlertCircle className="w-3.5 h-3.5" /> {errors.email}
                  </p>
                )}
              </div>

              {/* Message */}
              <div>
                <label htmlFor="contact-message" className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2">
                  Message <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <span className="absolute top-3.5 left-0 pl-3.5 flex text-slate-400">
                    <MessageSquare className="w-5 h-5" />
                  </span>
                  <textarea
                    id="contact-message"
                    rows={4}
                    placeholder="How can we help you?"
                    value={formData.message}
                    onChange={(e) => handleInputChange('message', e.target.value)}
                    className={`w-full pl-11 pr-4 py-3.5 bg-slate-50 dark:bg-slate-950 text-slate-800 dark:text-white border ${
                      errors.message ? 'border-red-500' : 'border-slate-200 dark:border-slate-800 focus:border-green-500'
                    } rounded-2xl transition-all duration-200 outline-none focus:ring-4 focus:ring-green-500/10 font-medium resize-none`}
                    required
                  />
                </div>
                {errors.message && (
                  <p className="mt-1.5 text-xs text-red-500 flex items-center gap-1">
                    <AlertCircle className="w-3.5 h-3.5" /> {errors.message}
                  </p>
                )}
              </div>

              {/* Submit button */}
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-4 bg-green-500 hover:bg-green-600 disabled:bg-green-400 text-white font-bold rounded-2xl shadow-lg shadow-green-500/10 hover:shadow-green-500/20 active:scale-98 transition-all duration-150 flex items-center justify-center gap-2 focus:outline-none focus:ring-4 focus:ring-green-500/20"
              >
                {isSubmitting ? (
                  <>
                    <svg className="animate-spin h-5 w-5 text-white" fill="none" viewBox="0 0 24 24" aria-hidden="true">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                    </svg>
                    Sending message...
                  </>
                ) : (
                  <>
                    <Send className="w-4 h-4" /> Send Message
                  </>
                )}
              </button>
            </form>
          )}
        </div>

        {/* Footer Area */}
        <footer className="mt-16 sm:mt-24 pt-8 border-t border-slate-200/50 dark:border-slate-800/60 text-center space-y-2">
          <p className="text-sm font-semibold text-slate-500 dark:text-slate-400">
            Health Tracker &copy; 2026
          </p>
          <p className="text-xs text-slate-400 dark:text-slate-500 flex items-center justify-center gap-1.5">
            Designed to promote active, mindful lifestyles with <Heart className="w-3.5 h-3.5 text-red-500 fill-red-500" />
          </p>
        </footer>
      </div>
    </section>
  );
}

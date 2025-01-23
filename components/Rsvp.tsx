import { useState } from "react";

export default function Rsvp() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    attending: "yes",
    guests: "0",
    dietaryRestrictions: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // Form submission logic here
  };

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <section
      id="rsvp-section"
      className="relative min-h-[80vh] flex items-center justify-center bg-black text-white"
    >
      <div className="relative z-10 w-full max-w-2xl mx-auto px-4">
        <div className="text-center mb-16">
          <h3 className="text-sm uppercase tracking-[0.2em] mb-4">
            WE INVITE YOU TO
          </h3>
          <h2 className="font-serif text-5xl md:text-6xl mb-6">
            CELEBRATE WITH US
          </h2>
          <p className="text-gray-300 max-w-2xl mx-auto">
            We would be honored to have you join us in celebrating our wedding.
            Please let us know if you'll be able to attend by filling out the
            form below.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="name" className="block text-sm font-medium mb-2">
              Full Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 bg-white/10 border border-white/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-white/40"
              placeholder="Enter your full name"
            />
          </div>

          <div>
            <label htmlFor="email" className="block text-sm font-medium mb-2">
              Email Address
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 bg-white/10 border border-white/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-white/40"
              placeholder="Enter your email"
            />
          </div>

          <div>
            <label
              htmlFor="attending"
              className="block text-sm font-medium mb-2"
            >
              Will you be attending?
            </label>
            <select
              id="attending"
              name="attending"
              value={formData.attending}
              onChange={handleChange}
              className="w-full px-4 py-2 bg-white/10 border border-white/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-white/40 [&>option]:bg-black [&>option]:text-white"
            >
              <option value="yes">Yes, I will attend</option>
              <option value="no">No, I cannot attend</option>
            </select>
          </div>

          <div>
            <label htmlFor="guests" className="block text-sm font-medium mb-2">
              Number of Additional Guests
            </label>
            <select
              id="guests"
              name="guests"
              value={formData.guests}
              onChange={handleChange}
              className="w-full px-4 py-2 bg-white/10 border border-white/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-white/40 [&>option]:bg-black [&>option]:text-white"
            >
              <option value="0">0</option>
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>
            </select>
          </div>

          <div>
            <label
              htmlFor="dietaryRestrictions"
              className="block text-sm font-medium mb-2"
            >
              Dietary Restrictions
            </label>
            <textarea
              id="dietaryRestrictions"
              name="dietaryRestrictions"
              value={formData.dietaryRestrictions}
              onChange={handleChange}
              className="w-full px-4 py-2 bg-white/10 border border-white/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-white/40 h-24"
              placeholder="Please let us know of any dietary restrictions"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-white text-black py-3 px-6 rounded-lg font-medium hover:bg-white/90 transition-colors"
          >
            Send RSVP
          </button>
        </form>
      </div>
    </section>
  );
}

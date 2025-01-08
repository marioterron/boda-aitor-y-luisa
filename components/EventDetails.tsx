import { CalendarIcon, MapPinIcon, ClockIcon } from 'lucide-react'

export default function EventDetails() {
  return (
    <section className="mb-16 animate-fade-in-up">
      <h2 className="text-3xl font-serif mb-8 text-center">Event Details</h2>
      <div className="space-y-6">
        <div className="flex items-center">
          <CalendarIcon className="mr-4" />
          <p>Saturday, September 15, 2024</p>
        </div>
        <div className="flex items-center">
          <ClockIcon className="mr-4" />
          <p>Ceremony: 3:00 PM | Reception: 6:00 PM</p>
        </div>
        <div className="flex items-center">
          <MapPinIcon className="mr-4" />
          <p>The Grand Ballroom, 123 Elegant Street, Cityville</p>
        </div>
      </div>
      <div className="mt-8">
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3022.1841902907894!2d-73.98823492404!3d40.74844097138946!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c259a9b3117469%3A0xd134e199a405a163!2sEmpire%20State%20Building!5e0!3m2!1sen!2sus!4v1704752008375!5m2!1sen!2sus"
          width="100%"
          height="300"
          style={{ border: 0 }}
          allowFullScreen
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        ></iframe>
      </div>
    </section>
  )
}


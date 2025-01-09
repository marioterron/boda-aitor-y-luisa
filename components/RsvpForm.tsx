"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

export default function RsvpForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [attending, setAttending] = useState("yes");
  const [guests, setGuests] = useState(1);
  const [dietaryRestrictions, setDietaryRestrictions] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Here you would typically send this data to your backend
    console.log({ name, email, attending, guests, dietaryRestrictions });
    // Reset form or show confirmation message
  };

  return (
    <section className="mb-16 animate-fade-in-up">
      <h2 className="text-3xl font-serif mb-8 text-center">RSVP</h2>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <Label htmlFor="name">Name</Label>
          <Input
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        <div>
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div>
          <Label>Will you be attending?</Label>
          <div className="flex space-x-4">
            <label className="flex items-center">
              <input
                type="radio"
                value="yes"
                checked={attending === "yes"}
                onChange={() => setAttending("yes")}
                className="mr-2"
              />
              Yes
            </label>
            <label className="flex items-center">
              <input
                type="radio"
                value="no"
                checked={attending === "no"}
                onChange={() => setAttending("no")}
                className="mr-2"
              />
              No
            </label>
          </div>
        </div>
        {attending === "yes" && (
          <>
            <div>
              <Label htmlFor="guests">
                Number of guests (including yourself)
              </Label>
              <Input
                id="guests"
                type="number"
                min="1"
                value={guests}
                onChange={(e) => setGuests(parseInt(e.target.value))}
                required
              />
            </div>
            <div>
              <Label htmlFor="dietary">Dietary Restrictions</Label>
              <Textarea
                id="dietary"
                value={dietaryRestrictions}
                onChange={(e) => setDietaryRestrictions(e.target.value)}
                placeholder="Please list any allergies or dietary restrictions"
              />
            </div>
          </>
        )}
        <Button
          type="submit"
          className="w-full bg-black text-white px-8 py-3 uppercase text-xs tracking-widest hover:bg-gray-900 transition-colors"
        >
          Submit RSVP
        </Button>
      </form>
    </section>
  );
}

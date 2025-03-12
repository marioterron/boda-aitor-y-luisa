"use client";

import { Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Toaster } from "@/components/ui/toaster";
import { RsvpFormFields } from "./formFields";
import { useRsvpForm } from "@/hooks/use-rsvp-form";

export default function Rsvp() {
  const {
    formData,
    setFormData,
    errors,
    isSubmitting,
    isChecking,
    existingRsvp,
    handleSubmit,
    handleEmailBlur,
  } = useRsvpForm();

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === "guests" ? Number(value) : value,
    }));
  };

  const handleAttendanceChange = (value: string) => {
    setFormData((prev) => ({
      ...prev,
      attendance: value as "attending" | "not-attending",
    }));
  };

  return (
    <section
      id="rsvp-section"
      className="relative min-h-[80vh] flex items-center justify-center bg-black text-white py-32"
    >
      <Toaster />
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

        <form onSubmit={handleSubmit} className="space-y-8">
          <RsvpFormFields
            formData={formData}
            handleInputChange={handleInputChange}
            handleEmailBlur={handleEmailBlur}
            handleAttendanceChange={handleAttendanceChange}
            errors={errors}
            isChecking={isChecking}
            existingRsvp={existingRsvp}
          />

          <Button
            type="submit"
            className="w-full bg-black text-white border-2 border-white px-8 py-3 uppercase text-xs tracking-widest hover:bg-gray-900 transition-colors disabled:opacity-50"
            disabled={isSubmitting}
          >
            {isSubmitting ? (
              <div className="flex items-center justify-center gap-2">
                <Loader2 className="h-4 w-4 animate-spin" />
                <span>
                  {existingRsvp ? "Updating RSVP..." : "Submitting..."}
                </span>
              </div>
            ) : existingRsvp ? (
              "Update RSVP"
            ) : (
              "Submit RSVP"
            )}
          </Button>
        </form>
      </div>
    </section>
  );
}

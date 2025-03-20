"use client";

import { useTranslations } from "next-intl";
import { Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Toaster } from "@/components/ui/toaster";
import { RsvpFormFields } from "./formFields";
import { useRsvpForm } from "@/hooks/use-rsvp-form";

export default function Rsvp() {
  const t = useTranslations("rsvp");
  const {
    formData,
    setFormData,
    errors,
    isSubmitting,
    isChecking,
    emailExists,
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
            {t("title.preHeading")}
          </h3>
          <h2 className="font-serif text-5xl md:text-6xl mb-6 uppercase">
            {t("title.heading")}
          </h2>
          <p className="text-gray-300 max-w-2xl mx-auto">{t("description")}</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-8">
          <RsvpFormFields
            formData={formData}
            handleInputChange={handleInputChange}
            handleEmailBlur={handleEmailBlur}
            handleAttendanceChange={handleAttendanceChange}
            errors={errors}
            isChecking={isChecking}
            emailExists={emailExists}
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
                  {emailExists
                    ? t("form.submit.updating")
                    : t("form.submit.submitting")}
                </span>
              </div>
            ) : emailExists ? (
              t("form.submit.update")
            ) : (
              t("form.submit.new")
            )}
          </Button>
        </form>
      </div>
    </section>
  );
}

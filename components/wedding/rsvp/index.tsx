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
      className="relative flex min-h-[80vh] items-center justify-center bg-black py-32 text-white"
    >
      <Toaster />
      <div className="relative z-10 mx-auto w-full max-w-2xl px-4">
        <div className="mb-16 text-center">
          <h3 className="mb-4 text-sm uppercase tracking-[0.2em]">
            {t("title.preHeading")}
          </h3>
          <h2 className="mb-6 font-serif text-5xl uppercase md:text-6xl">
            {t("title.heading")}
          </h2>
          <p className="mx-auto max-w-2xl text-gray-300">{t("description")}</p>
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
            className="w-full border-2 border-white bg-black px-8 py-3 text-xs uppercase tracking-widest text-white transition-colors hover:bg-gray-900 disabled:opacity-50"
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

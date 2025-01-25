"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Loader2 } from "lucide-react";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Textarea } from "@/components/ui/textarea";
import { Toaster } from "@/components/ui/toaster";
import { useToast } from "@/hooks/use-toast";

// Form validation schema
const rsvpSchema = z.object({
  fullName: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email address"),
  attendance: z.enum(["attending", "not-attending"], {
    required_error: "Please select your attendance status",
  }),
  guests: z.number().min(0).max(4, "Maximum 4 additional guests allowed"),
  dietaryRequirements: z.string().optional(),
  message: z.string().optional(),
});

type RsvpFormValues = z.infer<typeof rsvpSchema>;

export default function Rsvp() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const defaultValues = {
    fullName: "",
    email: "",
    attendance: "attending" as const,
    guests: 0,
    dietaryRequirements: "",
    message: "",
  };

  const form = useForm<RsvpFormValues>({
    resolver: zodResolver(rsvpSchema),
    defaultValues,
  });

  // Get current attendance value to conditionally render fields
  const isAttending = form.watch("attendance") === "attending";

  async function onSubmit(data: RsvpFormValues) {
    setIsSubmitting(true);
    try {
      // TODO: Implement API call
      await new Promise((resolve) => setTimeout(resolve, 2000)); // Simulated API call

      toast({
        title: "RSVP Submitted Successfully",
        description: isAttending
          ? "Thank you for accepting our invitation! We look forward to celebrating with you."
          : "Thank you for letting us know. We'll miss you!",
        variant: "default",
        className: "bg-white text-black",
      });

      form.reset(defaultValues);
    } catch (error) {
      toast({
        title: "Submission Failed",
        description:
          "There was a problem submitting your RSVP. Please try again.",
        variant: "destructive",
        className: "bg-red-500 text-white",
      });
    } finally {
      setIsSubmitting(false);
    }
  }

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

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <FormField
              control={form.control}
              name="fullName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-white">Full Name</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Enter your full name"
                      className="bg-white text-gray-900 border-gray-200 focus:border-gray-400"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage className="text-red-500" />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-white">Email</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Enter your email"
                      className="bg-white text-gray-900 border-gray-200 focus:border-gray-400"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage className="text-red-500" />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="attendance"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-white">
                    Will you be attending?
                  </FormLabel>
                  <FormControl>
                    <RadioGroup
                      onValueChange={field.onChange}
                      value={field.value}
                      className="flex flex-col space-y-1"
                    >
                      <FormItem className="flex items-center space-x-3 space-y-0">
                        <FormControl>
                          <RadioGroupItem value="attending" />
                        </FormControl>
                        <FormLabel className="font-normal text-white">
                          Joyfully Accepts
                        </FormLabel>
                      </FormItem>
                      <FormItem className="flex items-center space-x-3 space-y-0">
                        <FormControl>
                          <RadioGroupItem value="not-attending" />
                        </FormControl>
                        <FormLabel className="font-normal text-white">
                          Regretfully Declines
                        </FormLabel>
                      </FormItem>
                    </RadioGroup>
                  </FormControl>
                  <FormMessage className="text-red-500" />
                </FormItem>
              )}
            />

            {/* Conditional rendering of guests and dietary requirements */}
            {isAttending && (
              <>
                <FormField
                  control={form.control}
                  name="guests"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-white">
                        Number of Additional Guests
                      </FormLabel>
                      <FormControl>
                        <Input
                          type="number"
                          min={0}
                          max={4}
                          className="bg-white text-gray-900 border-gray-200 focus:border-gray-400 placeholder:text-gray-400"
                          {...field}
                          onChange={(e) =>
                            field.onChange(Number(e.target.value))
                          }
                        />
                      </FormControl>
                      <FormMessage className="text-red-500" />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="dietaryRequirements"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-white">
                        Dietary Requirements
                      </FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="Please let us know of any dietary requirements"
                          className="bg-white text-gray-900 border-gray-200 focus:border-gray-400 min-h-[100px] placeholder:text-gray-400"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage className="text-red-500" />
                    </FormItem>
                  )}
                />
              </>
            )}

            {/* Message field always visible */}
            <FormField
              control={form.control}
              name="message"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-white">
                    {isAttending
                      ? "Message (Optional)"
                      : "Would you like to send a message?"}
                  </FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder={
                        isAttending
                          ? "Leave a message for the couple"
                          : "We'll miss you! Feel free to leave a message for the couple"
                      }
                      className="bg-white text-gray-900 border-gray-200 focus:border-gray-400 min-h-[100px] placeholder:text-gray-400"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage className="text-red-500" />
                </FormItem>
              )}
            />

            <Button
              type="submit"
              className="w-full bg-black text-white border-2 border-white px-8 py-3 uppercase text-xs tracking-widest hover:bg-gray-900 transition-colors disabled:opacity-50"
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <div className="flex items-center justify-center gap-2">
                  <Loader2 className="h-4 w-4 animate-spin" />
                  <span>Submitting...</span>
                </div>
              ) : (
                "Submit RSVP"
              )}
            </Button>
          </form>
        </Form>
      </div>
    </section>
  );
}

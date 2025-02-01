import { Button } from "@/components/ui/button";

export default function FAQs() {
  return (
    <div className="relative flex flex-col items-center">
      <h2 className="font-serif text-[2.5rem] absolute w-full text-center z-20 -top-8">
        FAQs
      </h2>
      <div className="w-[80%]">
        <img
          src="/placeholder.svg?height=600&width=500"
          alt="FAQs"
          className="w-full aspect-[3/4] object-cover grayscale"
        />
      </div>
      <p className="text-center text-sm mt-8 max-w-[80%]">
        Got questions? We've got answers! Check out our FAQs for everything you
        need to know about our special day.
      </p>
      <div className="mt-8">
        <Button variant="default" className="uppercase text-xs tracking-widest">
          FAQs
        </Button>
      </div>
    </div>
  );
}

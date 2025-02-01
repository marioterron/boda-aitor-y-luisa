import { Button } from "@/components/ui/button";

export default function DressCode() {
  return (
    <div className="relative flex flex-col items-center">
      <h2 className="font-serif text-[2.5rem] absolute w-full text-center z-20 -top-8">
        DRESS CODE
      </h2>
      <div className="w-[80%]">
        <img
          src="https://images.squarespace-cdn.com/content/v1/66cb369992e60664dc8a4f5e/1724593821127-0C4A5MTCNUBY65NP5M1I/karolina-grabowska-yH50AWO8ZRo-unsplash.jpg?format=500w"
          alt="Formal attire inspiration"
          className="w-full aspect-[3/4] object-cover grayscale"
        />
      </div>
      <p className="text-center text-sm mt-8 max-w-[80%]">
        For this grand celebration of love, we kindly request that you embrace
        the elegance of the occasion by wearing formal attire.
      </p>
      <div className="mt-8">
        <Button variant="default" className="uppercase text-xs tracking-widest">
          Details
        </Button>
      </div>
    </div>
  );
}

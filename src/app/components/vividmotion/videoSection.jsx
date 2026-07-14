export default function VideoSection() {
  return (
  <section className="relative w-[98vw] h-[60vh] md:h-screen mx-auto overflow-hidden rounded-4xl pt-40 mt-40">
  <iframe
    src="https://player.vimeo.com/video/1203834352?h=60e4e9c456&background=1&badge=0&autopause=0&player_id=0&app_id=58479&dnt=1"
    title="Vivid Motion Showreel"
    className="
      absolute
      top-1/2
      left-1/2
      -translate-x-1/2
      -translate-y-1/2
      w-[177.78vh]
      h-[56.25vw]
      min-w-full
      min-h-full
      border-0
      pointer-events-none
    "
    allow="autoplay; picture-in-picture"
    loading="lazy"
  />

  <div className="relative z-10 flex h-full items-center justify-center">
    <h1 className="text-6xl font-bold text-white">
      Vivid Motion
    </h1>
  </div>
</section>
  );
}

export function AnimationVideo({ url }: { url: string }) {
  return (
    <video
      autoPlay
      muted
      loop
      playsInline
      className="h-auto rounded-lg object-cover w-screen max-w-[100rem] h-auto"
    >
      <source src={url} type="video/mp4" />
      <source src={url} type="video/webm" />
      Your browser does not support the video tag.
    </video>
  );
}

import Reveal from "./Reveal";

export default function SectionHeading({
  eyebrow,
  title,
}: {
  eyebrow?: string;
  title: string;
}) {
  return (
    <Reveal className="mb-12 text-center">
      {eyebrow && (
        <p className="mb-2 text-xs font-semibold uppercase tracking-[0.25em] text-brand">
          {eyebrow}
        </p>
      )}
      <h2 className="font-display text-3xl font-bold sm:text-4xl">{title}</h2>
      <div className="mx-auto mt-4 h-1 w-12 rounded-full bg-brand" />
    </Reveal>
  );
}

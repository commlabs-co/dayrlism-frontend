/** Structured data, rendered as a plain script tag.
 *
 *  Server-rendered so crawlers see it in the initial HTML — a client component
 *  would inject it after hydration, which most parsers never wait for. */
export function JsonLd({ data }: { data: Record<string, unknown> }) {
  return (
    <script
      type="application/ld+json"
      // The payload is our own content, not user input.
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}

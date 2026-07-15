export function BrandMark({ className = "h-9 w-9" }: { className?: string }) {
  return (
    <svg viewBox="0 0 64 64" className={className} aria-hidden="true">
      <rect width="64" height="64" rx="12" fill="currentColor" />
      <path
        d="M20 14h16a10 10 0 0 1 6.5 17.6A11 11 0 0 1 37 50H20V14zm7 7v9h9a4.5 4.5 0 0 0 0-9h-9zm0 16v9h10a4.5 4.5 0 0 0 0-9H27z"
        fill="var(--color-background)"
      />
    </svg>
  );
}

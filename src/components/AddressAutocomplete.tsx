import { useEffect, useRef, useState } from "react";
import { Loader2, MapPin } from "lucide-react";

export type AddressParts = {
  line1: string;
  city: string;
  state: string;
  postalCode: string;
  country: string;
};

type Suggestion = { label: string; parts: AddressParts };

type NominatimResult = {
  display_name: string;
  address: Record<string, string>;
};

/**
 * Address autocomplete backed by the free OpenStreetMap (Nominatim) search API.
 * No API key required.
 */
export function AddressAutocomplete({
  value,
  onChange,
  onSelect,
  label = "Address line 1",
  placeholder = "Start typing your address…",
}: {
  value: string;
  onChange: (v: string) => void;
  onSelect: (parts: AddressParts) => void;
  label?: string;
  placeholder?: string;
}) {
  const [suggestions, setSuggestions] = useState<Suggestion[]>([]);
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const skipRef = useRef(false);
  const boxRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function onDocClick(e: MouseEvent) {
      if (boxRef.current && !boxRef.current.contains(e.target as Node)) setOpen(false);
    }
    document.addEventListener("mousedown", onDocClick);
    return () => document.removeEventListener("mousedown", onDocClick);
  }, []);

  useEffect(() => {
    if (skipRef.current) {
      skipRef.current = false;
      return;
    }
    const q = value.trim();
    if (q.length < 4) {
      setSuggestions([]);
      return;
    }
    const controller = new AbortController();
    const timer = setTimeout(async () => {
      setLoading(true);
      try {
        const url =
          "https://nominatim.openstreetmap.org/search?format=jsonv2&addressdetails=1&limit=6&q=" +
          encodeURIComponent(q);
        const res = await fetch(url, { signal: controller.signal, headers: { Accept: "application/json" } });
        if (!res.ok) throw new Error("lookup failed");
        const rows = (await res.json()) as NominatimResult[];
        setSuggestions(
          rows.map((r) => {
            const a = r.address ?? {};
            const houseNumber = a["house_number"] ?? "";
            const road = a["road"] ?? a["pedestrian"] ?? a["neighbourhood"] ?? "";
            const line1 = [houseNumber, road].filter(Boolean).join(" ").trim() || r.display_name.split(",")[0];
            return {
              label: r.display_name,
              parts: {
                line1,
                city: a["city"] ?? a["town"] ?? a["village"] ?? a["hamlet"] ?? a["suburb"] ?? "",
                state: a["state"] ?? a["province"] ?? a["region"] ?? "",
                postalCode: a["postcode"] ?? "",
                country: a["country"] ?? "",
              },
            };
          }),
        );
        setOpen(true);
      } catch {
        /* network/abort — silently fall back to manual entry */
      } finally {
        setLoading(false);
      }
    }, 400);

    return () => {
      controller.abort();
      clearTimeout(timer);
    };
  }, [value]);

  return (
    <div ref={boxRef} className="relative">
      <label className="block">
        <span className="text-[11px] uppercase tracking-wider text-muted-foreground">{label}</span>
        <div className="relative">
          <input
            value={value}
            onChange={(e) => onChange(e.target.value)}
            onFocus={() => suggestions.length > 0 && setOpen(true)}
            placeholder={placeholder}
            autoComplete="address-line1"
            className="mt-1 w-full rounded-md border border-input bg-background px-3 py-2 pr-9 text-sm focus:outline-none focus:ring-2 focus:ring-ring"
          />
          <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground">
            {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : <MapPin className="h-4 w-4" />}
          </span>
        </div>
      </label>

      {open && suggestions.length > 0 && (
        <ul className="absolute z-30 mt-1 max-h-64 w-full overflow-auto rounded-md border border-border bg-card shadow-lg">
          {suggestions.map((s, i) => (
            <li key={`${s.label}-${i}`}>
              <button
                type="button"
                onClick={() => {
                  skipRef.current = true;
                  onChange(s.parts.line1);
                  onSelect(s.parts);
                  setOpen(false);
                  setSuggestions([]);
                }}
                className="block w-full px-3 py-2 text-left text-xs hover:bg-muted"
              >
                {s.label}
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

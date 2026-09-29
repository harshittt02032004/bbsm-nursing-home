/** Tinted image slot with a caption naming what the client should supply. */
export default function Placeholder({
  label,
  note = "Client to supply",
  dark = false,
  className = "",
  children,
}: {
  label: string;
  note?: string;
  dark?: boolean;
  className?: string;
  children?: React.ReactNode;
}) {
  return (
    <div className={`relative flex items-end p-6 ${dark ? "ph-dark" : "ph"} ${className}`} role="img" aria-label={label}>
      {children}
      <div className={`meta relative leading-[1.7] ${dark ? "text-white/60" : "text-blue"}`} style={{ fontSize: 11 }}>
        <span className="block text-red">■</span>
        {label}
        <br />
        {note}
      </div>
    </div>
  );
}

import { FolderGlyphIcon } from "./icons";

export default function EmptyState({ Icon = FolderGlyphIcon, title, subtitle }) {
  return (
    <div className="flex flex-col items-center justify-center gap-3 px-6 py-20 text-center text-muted">
      <Icon size={28} />
      <p className="text-xs font-medium text-fg">{title}</p>
      {subtitle && <p className="text-[11px] text-muted">{subtitle}</p>}
    </div>
  );
}

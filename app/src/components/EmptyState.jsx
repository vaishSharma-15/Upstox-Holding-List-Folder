import { FolderGlyphIcon } from "./icons";

export default function EmptyState({ Icon = FolderGlyphIcon, title, subtitle }) {
  return (
    <div className="flex flex-col items-center justify-center gap-3 px-6 py-20 text-center text-muted">
      <Icon size={32} />
      <p className="text-sm font-medium text-fg">{title}</p>
      {subtitle && <p className="text-xs text-muted">{subtitle}</p>}
    </div>
  );
}

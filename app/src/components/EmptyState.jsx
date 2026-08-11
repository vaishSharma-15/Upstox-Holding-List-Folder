import { FolderGlyphIcon } from "./icons";

export default function EmptyState({ Icon = FolderGlyphIcon, title, subtitle }) {
  return (
    <div className="flex flex-col items-center justify-center gap-3 px-6 py-20 text-center text-muted">
      <Icon size={36} />
      <p className="text-base font-medium text-fg">{title}</p>
      {subtitle && <p className="text-sm text-muted">{subtitle}</p>}
    </div>
  );
}

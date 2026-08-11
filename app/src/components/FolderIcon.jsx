import {
  FolderGlyphIcon,
  BriefcaseIcon,
  BarChartIcon,
  BankIcon,
  PillIcon,
  CarIcon,
  StarIcon,
  FlameIcon,
} from "./icons";

export const FOLDER_ICON_IDS = ["folder", "briefcase", "chart", "bank", "pill", "car", "star", "flame"];

const ICONS = {
  folder: FolderGlyphIcon,
  briefcase: BriefcaseIcon,
  chart: BarChartIcon,
  bank: BankIcon,
  pill: PillIcon,
  car: CarIcon,
  star: StarIcon,
  flame: FlameIcon,
};

export default function FolderIcon({ id, size = 18 }) {
  const Icon = ICONS[id] ?? FolderGlyphIcon;
  return <Icon size={size} />;
}

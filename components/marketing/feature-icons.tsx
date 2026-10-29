import {
  Activity,
  Archive,
  Bot,
  CheckCircle2,
  Clock,
  Eye,
  FileText,
  FolderTree,
  GitBranch,
  KeyRound,
  LayoutDashboard,
  Lock,
  MapPin,
  ScanLine,
  Search,
  Share2,
  ShieldCheck,
  Sparkles,
  UploadCloud,
  Workflow,
  type LucideIcon,
} from 'lucide-react';
import type { IconName } from '@/lib/catalog';

const icons: Record<IconName, LucideIcon> = {
  archive: Archive,
  scan: ScanLine,
  'git-branch': GitBranch,
  'folder-tree': FolderTree,
  upload: UploadCloud,
  lock: Lock,
  activity: Activity,
  clock: Clock,
  workflow: Workflow,
  sparkles: Sparkles,
  shield: ShieldCheck,
  check: CheckCircle2,
  bot: Bot,
  search: Search,
  eye: Eye,
  key: KeyRound,
  'map-pin': MapPin,
  layout: LayoutDashboard,
  share: Share2,
  'file-text': FileText,
};

export function FeatureIcon({ name, size = 20 }: { name: IconName; size?: number }) {
  const Icon = icons[name];
  return <Icon size={size} aria-hidden="true" />;
}

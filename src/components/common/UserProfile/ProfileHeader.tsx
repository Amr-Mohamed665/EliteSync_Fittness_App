import { CalendarCheck, Clock, Package, Camera } from "lucide-react";

interface ProfileHeaderProps {
  name: string;
  member: number;
  sessionComplete: number;
  activePackage: string;
  nextSession: string;
  avatarUrl: string;
  onAvatarClick?: () => void;
  onEditProfile?: () => void;
}

const stats = (
  sessionComplete: number,
  activePackage: string,
  nextSession: string,
) => [
  {
    icon: CalendarCheck,
    label: "Sessions Done",
    value: String(sessionComplete),
  },
  { icon: Package, label: "Active Package", value: activePackage },
  { icon: Clock, label: "Next Session", value: nextSession },
];

export default function ProfileHeader({
  name,
  member,
  sessionComplete,
  activePackage,
  nextSession,
  avatarUrl,
  onAvatarClick,
  onEditProfile,
}: ProfileHeaderProps) {
  return (
    <div className="relative overflow-hidden rounded-2xl border border-border bg-card shadow-sm">
      {/* Banner */}
      <div className="h-24 bg-gradient-to-r from-primary/80 via-primary to-primary/60 relative">
        <div
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage:
              "radial-gradient(circle at 20% 50%, white 1px, transparent 1px), radial-gradient(circle at 80% 20%, white 1px, transparent 1px)",
            backgroundSize: "30px 30px",
          }}
        />
      </div>

      <div className="px-6 pb-6">
        <div className="flex items-end justify-between -mt-11 mb-5 relative z-10">
          <div className="flex items-end gap-4">
            <div
              className="relative group cursor-pointer"
              onClick={onAvatarClick}>
              <img
                src={avatarUrl}
                alt={name}
                className="w-20 h-20 rounded-2xl object-cover ring-4 ring-card shadow-xl transition-opacity duration-200 group-hover:opacity-70"
              />
              <div className="absolute inset-0 rounded-2xl flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                <Camera className="w-6 h-6 text-white drop-shadow-md" />
              </div>
              <span className="absolute bottom-1 right-1 w-3 h-3 bg-green-400 rounded-full border-2 border-card" />
            </div>

            <div className="mb-1">
              <h2 className="text-xl font-bold text-foreground leading-tight">
                {name}
              </h2>
              <p className="text-sm text-muted-foreground">
                Member since {member}
              </p>
            </div>
            {onEditProfile && (
              <button
                onClick={onEditProfile}
                className="mb-1 px-3 py-1 text-sm bg-primary/10 hover:bg-primary/20 text-primary rounded-lg transition-colors duration-200"
              >
                Edit Profile
              </button>
            )}
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          {stats(sessionComplete, activePackage, nextSession).map(
            ({ icon: Icon, label, value }) => (
              <div
                key={label}
                className="flex flex-col gap-1 rounded-xl bg-muted/50 border border-border/60 px-4 py-3">
                <div className="flex items-center gap-1.5 text-muted-foreground">
                  <Icon className="w-4 h-4" />
                  <span className="text-sm sm:text-lg font-medium">{label}</span>
                </div>
                <span className="text-sm sm:text-md font-bold text-foreground truncate">
                  {value}
                </span>
              </div>
            ),
          )}
        </div>
      </div>
    </div>
  );
}

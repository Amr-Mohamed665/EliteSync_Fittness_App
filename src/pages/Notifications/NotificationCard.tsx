import { Check, X } from "lucide-react"

type Props = {
  title: string
  desc: string
  time: string
  icon: any
  active?: boolean
  onMarkAsRead?: () => void
  onDelete?: () => void
}

export default function NotificationCard({
  title,
  desc,
  time,
  icon: Icon,
  active,
  onMarkAsRead,
  onDelete,
}: Props) {
  return (
    <div
      className={`rounded-xl p-4 flex justify-between border 
      ${active ? "border-red-500" : "border-[#A7A7A7]"}`}
    >
      <div className="flex gap-3 flex-1">
        <Icon size={16} strokeWidth={0.9} className="w-6 h-6 mt-1" />

        <div className="flex-1">
          <h3 className="flex items-center gap-2">
            {title}
            {active && <span className="w-1 h-1 bg-red-500 rounded-full" />}
          </h3>

          <p className="text-sm text-[#FFFFFF] font-extralight">{desc}</p>
        </div>
      </div>

      <div className="flex items-center gap-2">
        {active && onMarkAsRead && (
          <button
            onClick={onMarkAsRead}
            className="p-1 hover:bg-white/10 rounded transition-colors"
            title="Mark as read"
          >
            <Check className="w-3 h-3" />
          </button>
        )}
        {onDelete && (
          <button
            onClick={onDelete}
            className="p-1 hover:bg-red-500/20 rounded transition-colors"
            title="Delete notification"
          >
            <X className="w-3 h-3" />
          </button>
        )}
        <span className="text-xs font-extralight">{time}</span>
      </div>
    </div>
  )
}
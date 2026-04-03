import { BadgeCheck, Building2, Cpu, FlaskConical, HardHat, ShieldCheck, Truck, Users, type LucideIcon } from "lucide-react"

export function getDepartmentVisual(code: string): { icon: LucideIcon; iconClassName: string; badgeClassName: string; nameClassName: string } {
    const normalizedCode = code.toUpperCase()

    const config: Record<string, { icon: LucideIcon; iconClassName: string; badgeClassName: string; nameClassName: string }> = {
        TECH: {
            icon: Cpu,
            iconClassName: "bg-blue-50 text-blue-600 dark:border dark:border-blue-400/35 dark:bg-blue-500/20 dark:text-blue-100 dark:shadow-[0_0_0_1px_rgba(96,165,250,0.12)]",
            badgeClassName: "border-blue-200 bg-blue-50 text-blue-700 dark:border-blue-400/40 dark:bg-blue-500/18 dark:text-blue-100 dark:shadow-[inset_0_1px_0_rgba(255,255,255,0.04)]",
            nameClassName: "border-cyan-200 bg-cyan-50 text-cyan-700 dark:border-cyan-400/40 dark:bg-cyan-500/18 dark:text-cyan-100 dark:shadow-[inset_0_1px_0_rgba(255,255,255,0.04)]",
        },
        PROD: {
            icon: HardHat,
            iconClassName: "bg-amber-50 text-amber-600 dark:border dark:border-amber-400/35 dark:bg-amber-500/22 dark:text-amber-100 dark:shadow-[0_0_0_1px_rgba(251,191,36,0.12)]",
            badgeClassName: "border-amber-200 bg-amber-50 text-amber-700 dark:border-amber-400/40 dark:bg-amber-500/18 dark:text-amber-100 dark:shadow-[inset_0_1px_0_rgba(255,255,255,0.04)]",
            nameClassName: "border-orange-200 bg-orange-50 text-orange-700 dark:border-orange-400/40 dark:bg-orange-500/18 dark:text-orange-100 dark:shadow-[inset_0_1px_0_rgba(255,255,255,0.04)]",
        },
        RND: {
            icon: FlaskConical,
            iconClassName: "bg-fuchsia-50 text-fuchsia-600 dark:border dark:border-fuchsia-400/35 dark:bg-fuchsia-500/20 dark:text-fuchsia-100 dark:shadow-[0_0_0_1px_rgba(232,121,249,0.12)]",
            badgeClassName:
                "border-fuchsia-200 bg-fuchsia-50 text-fuchsia-700 dark:border-fuchsia-400/40 dark:bg-fuchsia-500/18 dark:text-fuchsia-100 dark:shadow-[inset_0_1px_0_rgba(255,255,255,0.04)]",
            nameClassName: "border-violet-200 bg-violet-50 text-violet-700 dark:border-violet-400/40 dark:bg-violet-500/18 dark:text-violet-100 dark:shadow-[inset_0_1px_0_rgba(255,255,255,0.04)]",
        },
        HR: {
            icon: Users,
            iconClassName: "bg-rose-50 text-rose-600 dark:border dark:border-rose-400/35 dark:bg-rose-500/20 dark:text-rose-100 dark:shadow-[0_0_0_1px_rgba(251,113,133,0.12)]",
            badgeClassName: "border-rose-200 bg-rose-50 text-rose-700 dark:border-rose-400/40 dark:bg-rose-500/18 dark:text-rose-100 dark:shadow-[inset_0_1px_0_rgba(255,255,255,0.04)]",
            nameClassName: "border-pink-200 bg-pink-50 text-pink-700 dark:border-pink-400/40 dark:bg-pink-500/18 dark:text-pink-100 dark:shadow-[inset_0_1px_0_rgba(255,255,255,0.04)]",
        },
        LOG: {
            icon: Truck,
            iconClassName: "bg-emerald-50 text-emerald-600 dark:border dark:border-emerald-400/35 dark:bg-emerald-500/20 dark:text-emerald-100 dark:shadow-[0_0_0_1px_rgba(52,211,153,0.12)]",
            badgeClassName:
                "border-emerald-200 bg-emerald-50 text-emerald-700 dark:border-emerald-400/40 dark:bg-emerald-500/18 dark:text-emerald-100 dark:shadow-[inset_0_1px_0_rgba(255,255,255,0.04)]",
            nameClassName: "border-lime-200 bg-lime-50 text-lime-700 dark:border-lime-400/40 dark:bg-lime-500/18 dark:text-lime-100 dark:shadow-[inset_0_1px_0_rgba(255,255,255,0.04)]",
        },
        QA: {
            icon: BadgeCheck,
            iconClassName: "bg-teal-50 text-teal-600 dark:border dark:border-teal-400/35 dark:bg-teal-500/20 dark:text-teal-100 dark:shadow-[0_0_0_1px_rgba(45,212,191,0.12)]",
            badgeClassName: "border-teal-200 bg-teal-50 text-teal-700 dark:border-teal-400/40 dark:bg-teal-500/18 dark:text-teal-100 dark:shadow-[inset_0_1px_0_rgba(255,255,255,0.04)]",
            nameClassName: "border-sky-200 bg-sky-50 text-sky-700 dark:border-sky-400/40 dark:bg-sky-500/18 dark:text-sky-100 dark:shadow-[inset_0_1px_0_rgba(255,255,255,0.04)]",
        },
        SYS: {
            icon: ShieldCheck,
            iconClassName: "bg-slate-100 text-slate-700 dark:border dark:border-slate-300/30 dark:bg-slate-500/18 dark:text-slate-100 dark:shadow-[0_0_0_1px_rgba(148,163,184,0.12)]",
            badgeClassName: "border-slate-200 bg-slate-100 text-slate-700 dark:border-slate-300/35 dark:bg-slate-500/16 dark:text-slate-100 dark:shadow-[inset_0_1px_0_rgba(255,255,255,0.04)]",
            nameClassName: "border-zinc-200 bg-zinc-100 text-zinc-700 dark:border-zinc-300/35 dark:bg-zinc-500/16 dark:text-zinc-100 dark:shadow-[inset_0_1px_0_rgba(255,255,255,0.04)]",
        },
    }

    return (
        config[normalizedCode] ?? {
            icon: Building2,
            iconClassName: "bg-neutral-100 text-neutral-700 dark:border dark:border-neutral-300/25 dark:bg-neutral-500/16 dark:text-neutral-100",
            badgeClassName: "border-neutral-200 bg-neutral-100 text-neutral-700 dark:border-neutral-300/30 dark:bg-neutral-500/14 dark:text-neutral-100",
            nameClassName: "border-stone-200 bg-stone-100 text-stone-700 dark:border-stone-300/30 dark:bg-stone-500/14 dark:text-stone-100",
        }
    )
}

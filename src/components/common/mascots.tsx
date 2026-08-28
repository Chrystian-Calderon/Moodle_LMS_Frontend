import React, { CSSProperties, ReactNode } from "react";

function PreviewTheme() {
    return (
        <style>{`
            @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@500;600;700&family=Sora:wght@600;700&display=swap');

            :root {
                --background: #FBFAFF;
                --foreground: #221F36;
                --primary: 91,91,235;
                --muted: #ECEAF9;
                --border: #DAD7F0;
                --destructive: 226,66,71;
                --amber: 235,158,52;
                --shadow: 178,175,214;
            }

            .fill-background { fill: var(--background); }
            .fill-foreground { fill: var(--foreground); }
            .stroke-foreground { stroke: var(--foreground); }
            .fill-muted { fill: var(--muted); }
            .stroke-border { stroke: var(--border); }
            .fill-border { fill: var(--border); }

            .fill-primary { fill: rgb(var(--primary)); }
            .stroke-primary { stroke: rgb(var(--primary)); }
            .fill-primary\\/40 { fill: rgba(var(--primary),0.4); }
            .fill-primary\\/25 { fill: rgba(var(--primary),0.25); }
            .fill-primary\\/15 { fill: rgba(var(--primary),0.15); }
            .fill-primary\\/10 { fill: rgba(var(--primary),0.10); }
            .stroke-primary\\/25 { stroke: rgba(var(--primary),0.25); }

            .fill-destructive { fill: rgb(var(--destructive)); }
            .stroke-destructive { stroke: rgb(var(--destructive)); }
            .fill-destructive\\/15 { fill: rgba(var(--destructive),0.15); }
            .fill-destructive\\/10 { fill: rgba(var(--destructive),0.10); }
            .stroke-destructive\\/25 { stroke: rgba(var(--destructive),0.25); }

            .fill-amber { fill: var(--amber); }
            .fill-shadow\\/50 { fill: rgba(var(--shadow),0.5); }

            .mascot-card {
                background: var(--background);
                border: 1px solid var(--border);
            }
            .mascot-label { font-family: 'Sora', sans-serif; color: var(--foreground); }
            .mascot-sub { font-family: 'Plus Jakarta Sans', sans-serif; color: rgba(34,31,54,0.55); }
        `}</style>
    );
}

export interface MascotProps {
    className?: string;
    style?: CSSProperties;
}

interface SparkleProps {
    cx: number;
    cy: number;
    r: number;
    className?: string;
}

interface BackdropProps {
    tint?: string;
    ring?: string;
}

interface RobotBaseProps {
    shadowId: string;
    antenna: ReactNode;
    eyes: ReactNode;
    mouth: ReactNode;
    armLeft: ReactNode;
    armRight: ReactNode;
    chestColor?: string;
}

interface ShadowFilterProps {
    id: string;
}


function Sparkle({ cx, cy, r, className }: SparkleProps) {
    return (
        <path
            d={`M ${cx},${cy - r} Q ${cx + r * 0.35},${cy - r * 0.35} ${cx + r},${cy} Q ${cx + r * 0.35},${cy + r * 0.35} ${cx},${cy + r} Q ${cx - r * 0.35},${cy + r * 0.35} ${cx - r},${cy} Q ${cx - r * 0.35},${cy - r * 0.35} ${cx},${cy - r} Z`}
            className={className}
        />
    );
}

function Backdrop({ tint = "fill-primary/10", ring = "stroke-primary/25" }: BackdropProps) {
    return (
        <>
            <ellipse cx={120} cy={177} rx={48} ry={7} className="fill-shadow/50" />
            <circle cx={120} cy={96} r={74} className={tint} />
            <circle cx={120} cy={96} r={74} className={`fill-none ${ring}`} strokeWidth={1.5} strokeDasharray="1 7" strokeLinecap="round" />
        </>
    );
}

function RobotBase({ shadowId, antenna, eyes, mouth, armLeft, armRight, chestColor = "fill-primary" }: RobotBaseProps) {
    return (
        <g filter={`url(#${shadowId})`}>
            {armLeft}
            {armRight}

            <rect x={97} y={148} width={16} height={10} rx={5} className="fill-foreground" />
            <rect x={127} y={148} width={16} height={10} rx={5} className="fill-foreground" />

            <rect x={80} y={94} width={80} height={56} rx={24} className="fill-foreground" />
            <circle cx={120} cy={119} r={9} className="fill-background" />
            <circle cx={120} cy={119} r={4} className={chestColor} />

            {antenna}

            <rect x={88} y={36} width={64} height={58} rx={22} className="fill-foreground" />
            <rect x={97} y={46} width={46} height={38} rx={13} className="fill-background stroke-border" strokeWidth={1} />

            {eyes}
            {mouth}
        </g>
    );
}

function ShadowFilter({ id }: ShadowFilterProps) {
    return (
        <defs>
            <filter id={id} x="-30%" y="-30%" width="160%" height="160%">
                <feDropShadow dx="0" dy="4" stdDeviation="4" floodColor="#221F36" floodOpacity="0.14" />
            </filter>
        </defs>
    );
}

export function MascotSinPermiso({ className, style }: MascotProps) {
    return (
        <svg viewBox="0 0 240 200" className={className} style={style} fill="none" xmlns="http://www.w3.org/2000/svg">
            <ShadowFilter id="shadow-403" />
            <Backdrop />

            <RobotBase
                shadowId="shadow-403"
                antenna={
                    <>
                        <line x1={120} y1={36} x2={120} y2={22} className="stroke-foreground" strokeWidth={4} strokeLinecap="round" />
                        <circle cx={120} cy={19} r={5} className="fill-primary" />
                    </>
                }
                eyes={
                    <>
                        <rect x={103} y={61} width={11} height={4} rx={2} className="fill-foreground" />
                        <rect x={126} y={61} width={11} height={4} rx={2} className="fill-foreground" />
                    </>
                }
                mouth={<rect x={112} y={74} width={16} height={3} rx={1.5} className="fill-border" />}
                armLeft={
                    <rect x={48} y={99} width={34} height={14} rx={7} className="fill-foreground" />
                }
                armRight={
                    <rect x={158} y={99} width={34} height={14} rx={7} className="fill-foreground" />
                }
            />

            <g transform="translate(174 52)">
                <circle r={19} className="fill-primary" />
                <g className="fill-background">
                    <path d="M-5,-3 a5,5 0 0 1 10,0 v4 h-3.4 v-4 a1.6,1.6 0 0 0 -3.2,0 v4 h-3.4 Z" />
                    <rect x={-7.5} y={1} width={15} height={11} rx={2.6} />
                </g>
                <circle cx={0} cy={6.6} r={1.5} className="fill-primary" />
            </g>

            <Sparkle cx={40} cy={54} r={5} className="fill-primary/40" />
            <Sparkle cx={196} cy={110} r={4} className="fill-primary/25" />
            <Sparkle cx={64} cy={158} r={3.5} className="fill-primary/25" />
        </svg>
    );
}

export function MascotNoEncontrado({ className, style }: MascotProps) {
    return (
        <svg viewBox="0 0 240 200" className={className} style={style} fill="none" xmlns="http://www.w3.org/2000/svg">
            <ShadowFilter id="shadow-404" />
            <Backdrop />

            <RobotBase
                shadowId="shadow-404"
                antenna={
                    <>
                        <line x1={120} y1={36} x2={120} y2={22} className="stroke-foreground" strokeWidth={4} strokeLinecap="round" />
                        <circle cx={120} cy={19} r={5} className="fill-primary" />
                    </>
                }
                eyes={
                    <>
                        <circle cx={109} cy={64} r={4} className="fill-foreground" />
                        <circle cx={131} cy={64} r={4} className="fill-foreground" />
                        <path d="M124,55 q7,-5 13,0" className="stroke-foreground" strokeWidth={2.4} fill="none" strokeLinecap="round" />
                    </>
                }
                mouth={<path d="M111,76 q4,4 8,0 q4,-4 8,0" className="stroke-foreground" strokeWidth={2} fill="none" strokeLinecap="round" />}
                armLeft={
                    <rect x={64} y={100} width={15} height={30} rx={7.5} className="fill-foreground" transform="rotate(-6 71 100)" />
                }
                armRight={
                    <rect x={158} y={56} width={15} height={46} rx={7.5} className="fill-foreground" transform="rotate(38 165 102)" />
                }
            />

            <g transform="translate(196 56)">
                <circle r={15} className="fill-background stroke-primary" strokeWidth={4.5} />
                <circle r={6} className="fill-none stroke-border" strokeWidth={1.5} strokeDasharray="2 3" />
                <line x1={10.5} y1={10.5} x2={21} y2={21} className="stroke-primary" strokeWidth={5.5} strokeLinecap="round" />
            </g>

            <circle cx={54} cy={152} r={4} className="fill-primary/25" />
            <circle cx={68} cy={144} r={3.2} className="fill-primary/25" />
            <circle cx={83} cy={139} r={2.4} className="fill-primary/25" />
            <circle cx={99} cy={136} r={1.6} className="fill-primary/25" />

            <Sparkle cx={44} cy={60} r={5} className="fill-primary/40" />
            <Sparkle cx={190} cy={130} r={4} className="fill-primary/25" />
        </svg>
    );
}

export function MascotError({ className, style }: MascotProps) {
    return (
        <svg viewBox="0 0 240 200" className={className} style={style} fill="none" xmlns="http://www.w3.org/2000/svg">
            <ShadowFilter id="shadow-500" />
            <Backdrop tint="fill-destructive/10" ring="stroke-destructive/25" />

            <RobotBase
                shadowId="shadow-500"
                chestColor="fill-destructive"
                antenna={
                    <>
                        <path d="M120,36 Q131,27 121,16" className="stroke-foreground" strokeWidth={4} fill="none" strokeLinecap="round" />
                        <circle cx={121} cy={16} r={5} className="fill-destructive" />
                        <path d="M132,10 l-5,9 l4,-1 l-3,8 l8,-11 l-4,1 Z" className="fill-amber" />
                    </>
                }
                eyes={
                    <g className="stroke-destructive" strokeWidth={2.4} strokeLinecap="round">
                        <line x1={104} y1={60} x2={112} y2={68} />
                        <line x1={112} y1={60} x2={104} y2={68} />
                        <line x1={126} y1={60} x2={134} y2={68} />
                        <line x1={134} y1={60} x2={126} y2={68} />
                    </g>
                }
                mouth={
                    <path d="M110,76 l4,-3 l4,3 l4,-3 l4,3" className="stroke-foreground" strokeWidth={2} fill="none" strokeLinecap="round" strokeLinejoin="round" />
                }
                armLeft={
                    <rect x={64} y={102} width={15} height={30} rx={7.5} className="fill-foreground" transform="rotate(-14 71 102)" />
                }
                armRight={
                    <rect x={161} y={102} width={15} height={30} rx={7.5} className="fill-foreground" transform="rotate(14 168 102)" />
                }
            />

            <path d="M96,101 l9,9 l-6,9 l13,9 l-7,8" className="stroke-destructive" strokeWidth={2} fill="none" strokeLinecap="round" strokeLinejoin="round" />

            <g transform="translate(174 52)">
                <circle r={19} className="fill-destructive" />
                <path d="M0,-10 L9,8 L-9,8 Z" className="fill-background" strokeLinejoin="round" />
                <rect x={-1.4} y={-4} width={2.8} height={7.5} rx={1.4} className="fill-destructive" />
                <circle cx={0} cy={6} r={1.4} className="fill-destructive" />
            </g>

            <Sparkle cx={40} cy={110} r={4.5} className="fill-destructive/10" />
            <Sparkle cx={196} cy={128} r={4} className="fill-primary/25" />
        </svg>
    );
}
interface ShowcaseItem {
    Mascot: (props: MascotProps) => React.JSX.Element;
    code: string;
    label: string;
    sub: string;
}

export default function MascotShowcase() {
    const items: ShowcaseItem[] = [
        { Mascot: MascotSinPermiso, code: "403", label: "Sin permiso", sub: "No tenés acceso a este recurso" },
        { Mascot: MascotNoEncontrado, code: "404", label: "No encontrado", sub: "No pudimos encontrar esa página" },
        { Mascot: MascotError, code: "500", label: "Algo salió mal", sub: "Hubo un error en el servidor" },
    ];

    return (
        <div style={{ minHeight: "100vh", background: "#F4F3FA", padding: "48px 24px" }}>
            <PreviewTheme />
            <div style={{ maxWidth: 960, margin: "0 auto" }}>
                <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: 20 }}>
                    {items.map(({ Mascot, code, label, sub }) => (
                        <div
                            key={code}
                            className="mascot-card"
                            style={{ borderRadius: 20, padding: "28px 20px 24px", textAlign: "center" }}
                        >
                            <Mascot className="w-full" style={{ maxWidth: 220, margin: "0 auto" }} />
                            <div className="mascot-sub" style={{ fontSize: 12, fontWeight: 600, letterSpacing: "0.06em", textTransform: "uppercase", marginTop: 4 }}>
                                Error {code}
                            </div>
                            <div className="mascot-label" style={{ fontSize: 19, fontWeight: 700, marginTop: 4 }}>
                                {label}
                            </div>
                            <div className="mascot-sub" style={{ fontSize: 13.5, marginTop: 6, lineHeight: 1.4 }}>
                                {sub}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
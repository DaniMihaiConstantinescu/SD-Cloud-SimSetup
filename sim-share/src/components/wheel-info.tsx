import TyreInfo from "./tyre-info";

interface WheelInfoProps {
    label: string;
    fl?: number;
    fr?: number;
    rl?: number;
    rr?: number;
}

export default function WheelInfo({ label, fl, fr, rl, rr }: WheelInfoProps) {
    return (
        <div className="w-full flex flex-col gap-2 text-2xl items-center">
            <h3 className="text-lg font-bold text-black">{label}</h3>
            <div className="grid grid-cols-2 w-full p-6 gap-x-16 gap-y-8 rounded-lg border border-neutral-500">
                <TyreInfo label="FL" value={fl} />
                <TyreInfo label="FR" value={fr} />
                <TyreInfo label="RL" value={rl} />
                <TyreInfo label="RR" value={rr} />
            </div>
        </div>
    )
}

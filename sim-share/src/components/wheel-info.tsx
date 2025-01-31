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
            <h3 className="text-lg font-bold text-neutral-800">{label}</h3>
            <div className="grid grid-cols-2 w-full p-4 gap-x-12 gap-y-6 rounded-lg border border-neutral-600 shadow-md bg-white">
                <TyreInfo label="FL" value={fl} />
                <TyreInfo label="FR" value={fr} />
                <TyreInfo label="RL" value={rl} />
                <TyreInfo label="RR" value={rr} />
            </div>
        </div>
    )
}

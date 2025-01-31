import { Setup } from "@/common/types";

interface MoreInfoContainerProps {
    setup?: Setup;
}

export default function MoreInfoContainer({ setup }: MoreInfoContainerProps) {
    return (
        <div className="flex flex-col gap-4">
            <div className="flex flex-col gap-2 text-2xl">
                <h3 className="text-lg font-bold text-neutral-800">Aerodynamics</h3>
                <div className="flex flex-col p-4 gap-6 rounded-lg border border-neutral-600 shadow-md text-center bg-white">
                    <p>Front Wing: {setup?.aero?.frontWing}</p>
                    <p>Rear Wing: {setup?.aero?.rearWing}</p>
                </div>
            </div>

            <div className="flex flex-col gap-2 text-xl text-center">
                <h3 className="font-bold text-neutral-800">Brake Bias: {setup?.brakeBias}</h3>
                <h3 className="font-bold text-neutral-800">Diff Power: {setup?.diffPower}</h3>
                <h3 className="font-bold text-neutral-800">Diff Coast: {setup?.diffCoast}</h3>
            </div>
        </div>
    )
}

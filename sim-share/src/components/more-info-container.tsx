import { Setup } from "@/common/types";

interface MoreInfoContainerProps {
    setup?: Setup;
}

export default function MoreInfoContainer({ setup }: MoreInfoContainerProps) {
    return (
        <div className="flex flex-col gap-6">
            <div className="flex flex-col gap-2 text-2xl">
                <h3 className="text-lg font-bold text-black">Aerodynamics</h3>
                <div className="flex flex-col p-6 gap-8 rounded-lg border border-neutral-500 text-center">
                    <p>Front Wing: {setup?.aero?.frontWing}</p>
                    <p>Rear Wing: {setup?.aero?.rearWing}</p>
                </div>
            </div>

            <div className="flex flex-col gap-2 text-2xl text-center">
                <h3 className="text-lg font-bold text-black">Brake Bias: {setup?.brakeBias}</h3>
                <h3 className="text-lg font-bold text-black">Diff Power: {setup?.diffPower}</h3>
                <h3 className="text-lg font-bold text-black">Diff Coast: {setup?.diffCoast}</h3>
            </div>
        </div>
    )
}

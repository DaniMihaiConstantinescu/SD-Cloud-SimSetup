import { Setup } from "@/common/types"
import {
    DialogContent,
    DialogTitle
} from "@/components/ui/dialog"
import WheelInfo from "./wheel-info";
import MoreInfoContainer from "./more-info-container";

interface SetupDialogProps {
    setup?: Setup;
}

export default function SetupDialog({ setup }: SetupDialogProps) {
    return (
        <DialogContent className="md:w-fit w-full md:max-w-none max-h-screen overflow-y-scroll no-scrollbar">
            <DialogTitle className="text-2xl">{`${setup?.carCode?.name} / ${setup?.setupType}`}</DialogTitle>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-20 gap-y-10 w-full">
                <WheelInfo label="Tyre Pressure" fl={setup?.tirePressures?.fl} fr={setup?.tirePressures?.fr} rl={setup?.tirePressures?.rl} rr={setup?.tirePressures?.rr} />

                <MoreInfoContainer setup={setup} />

                <WheelInfo label="Camber" fl={setup?.camber?.fl} fr={setup?.camber?.fr} rl={setup?.camber?.rl} rr={setup?.camber?.rr} />
                <WheelInfo label="Toe" fl={setup?.toe?.fl} fr={setup?.toe?.fr} rl={setup?.toe?.rl} rr={setup?.toe?.rr} />
            </div>
        </DialogContent>
    )
}

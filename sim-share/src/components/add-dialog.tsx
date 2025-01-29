import { SelectOption } from "@/common/types";
import SetupForm from "./setup-form";
import { DialogContent, DialogTitle } from "./ui/dialog";
import AddFormSkeleton from "./skeletons/add-skeleton";

interface AddDialogProps {
    carOptions: SelectOption[] | undefined
    trackOptions: SelectOption[] | undefined
}

export default function AddDialog({ carOptions, trackOptions }: AddDialogProps) {

    const setupOptions = [{
        value: "race",
        label: "Race",
    }, {
        value: "qualy",
        label: "Qualy",
    }]

    return (
        <DialogContent>
            <DialogTitle>Share your Setup</DialogTitle>
            {
                carOptions && trackOptions
                    ? <SetupForm
                        carOptions={carOptions}
                        trackOptions={trackOptions}
                        setupTypeOptions={setupOptions}
                        onSubmit={(setup) => { console.log(setup) }}
                    />
                    : <AddFormSkeleton />
            }

        </DialogContent>
    )
}

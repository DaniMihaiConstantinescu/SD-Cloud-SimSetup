import { SelectOption, Setup } from "@/common/types";
import SetupForm from "./setup-form";
import { DialogContent, DialogTitle } from "./ui/dialog";
import AddFormSkeleton from "./skeletons/add-skeleton";
import { useToast } from "@/hooks/use-toast";
import { useState } from "react";

interface AddDialogProps {
    carOptions: SelectOption[] | undefined
    trackOptions: SelectOption[] | undefined
}

export default function AddDialog({ carOptions, trackOptions }: AddDialogProps) {

    const { toast } = useToast()
    const setupOptions = [{
        value: "race",
        label: "Race",
    }, {
        value: "qualy",
        label: "Qualy",
    }]

    const [isLoading, setIsLoading] = useState<boolean>(false);


    const hadleSetupSubmit = (setup: Setup) => {

        if (!setup.carCode || !setup.trackCode || !setup.setupType) {
            toast({
                variant: "destructive",
                title: "Please select car, track and setup type"
            });
        } else {
            console.log(setup);
        }

    }

    return (
        <DialogContent>
            <DialogTitle>Share your Setup</DialogTitle>
            {
                carOptions && trackOptions
                    ? <SetupForm
                        carOptions={carOptions}
                        trackOptions={trackOptions}
                        setupTypeOptions={setupOptions}
                        onSubmit={hadleSetupSubmit}
                    />
                    : <AddFormSkeleton />
            }

        </DialogContent>
    )
}

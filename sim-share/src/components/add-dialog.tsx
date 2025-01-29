import { SelectOption, Setup } from "@/common/types";
import SetupForm from "./setup-form";
import { DialogContent, DialogTitle } from "./ui/dialog";
import AddFormSkeleton from "./skeletons/add-skeleton";
import { useToast } from "@/hooks/use-toast";
import { useRef, useState } from "react";
import { useCommonHook } from "@/hooks/useCommonHook";
import { useRouter } from "next/navigation";

interface AddDialogProps {
    carOptions: SelectOption[] | undefined
    trackOptions: SelectOption[] | undefined
}

export default function AddDialog({ carOptions, trackOptions }: AddDialogProps) {

    const router = useRouter();
    const { toast } = useToast()
    const { addSetup } = useCommonHook();
    const setupOptions = [{
        value: "race",
        label: "Race",
    }, {
        value: "qualy",
        label: "Qualy",
    }]

    const [isLoading, setIsLoading] = useState<boolean>(false);


    const hadleSetupSubmit = async (setup: Setup) => {

        if (!setup.carCode || !setup.trackCode || !setup.setupType) {
            toast({
                variant: "destructive",
                description: "Please select car, track and setup type"
            });
        } else {
            setIsLoading(true);
            const result = await addSetup(setup);
            if (result) {
                toast({
                    description: "Your setup was added successfully"
                });
                router.refresh();
            } else {
                toast({
                    variant: "destructive",
                    description: "An error occurred while adding the setup"
                });
            }
            setIsLoading(false);
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
                        isLoading={isLoading}
                        onSubmit={hadleSetupSubmit}
                    />
                    : <AddFormSkeleton />
            }

        </DialogContent>
    )
}

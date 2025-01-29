import { Setup } from "@/common/types"
import {
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle
} from "@/components/ui/dialog"

interface SetupDialogProps {
    setup?: Setup;
}

export default function SetupDialog({ setup }: SetupDialogProps) {
    return (
        <DialogContent>
            <DialogHeader>
                <DialogTitle>Are you absolutely sure?</DialogTitle>
                <DialogDescription>
                    This action cannot be undone. This will permanently delete your account
                    and remove your data from our servers.
                </DialogDescription>
            </DialogHeader>
        </DialogContent>
    )
}

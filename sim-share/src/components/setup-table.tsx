import { Setup } from "@/common/types";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import { Card } from "./ui/card";
import { Button } from "./ui/button";
import { Info } from "lucide-react";
import TableLoader from "./skeletons/table-loader";
import { useState } from "react";
import { Dialog, DialogTrigger, } from "@/components/ui/dialog"
import SetupDialog from "./setup-dialog";

interface SetupTableProps {
    isLoading: boolean;
    setups: Setup[];
}

export default function SetupTable({ isLoading, setups }: SetupTableProps) {
    const [selectedSetup, setSelectedSetup] = useState<Setup>();

    return (
        <div className="w-full md:px-24">
            <Dialog >
                <Card className="w-full px-8 py-2 rounded-sm">
                    <Table>
                        <TableHeader>
                            <TableRow className="text-lg">
                                <TableHead>Car</TableHead>
                                <TableHead>Setup Type</TableHead>
                                <TableHead className="text-right">More Info</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>

                            {isLoading && (
                                <TableRow>
                                    <TableCell colSpan={3} className="text-center p-4 py-2 ">
                                        <div className="flex justify-center items-center w-full">
                                            <TableLoader />
                                        </div>
                                    </TableCell>
                                </TableRow>
                            )}

                            {!isLoading && setups.length === 0 && (
                                <TableRow className="w-full">
                                    <TableCell colSpan={3} className="text-center">
                                        <h2 className="text-xl font-bold">No setups found</h2>
                                    </TableCell>
                                </TableRow>
                            )}

                            {setups.map((setup) => (
                                <TableRow key={setup._id}>
                                    <TableCell>{setup?.carCode?.name}</TableCell>
                                    <TableCell>{setup?.setupType && setup?.setupType?.charAt(0).toUpperCase() + setup?.setupType?.slice(1)}</TableCell>
                                    <TableCell className="text-right">
                                        <DialogTrigger asChild>
                                            <Button
                                                onClick={() => setSelectedSetup(setup)}
                                                variant={"ghost"}
                                                size={"lg"}
                                                className="hover:bg-transparent">
                                                <Info />
                                            </Button>
                                        </DialogTrigger>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </Card>
                <SetupDialog setup={selectedSetup} />
            </Dialog>
        </div>
    )
}

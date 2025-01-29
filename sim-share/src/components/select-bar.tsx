"use client";
import { Button } from "./ui/button"
import SelectWithLoading from "./select-with-loading"
import { useEffect, useState } from "react";
import { useCommonHook } from "@/hooks/useCommonHook";
import { SelectOption, Setup } from "@/common/types";
import { Dialog, DialogTrigger } from "./ui/dialog";
import { Plus } from "lucide-react";
import AddDialog from "./add-dialog";

interface SelectBarProps {
    setIsLoading: (isLoading: boolean) => void;
    setSetups: (setups: Setup[]) => void;
}
export default function SelectBar({ setIsLoading, setSetups }: SelectBarProps) {

    const { getTrackList, getCarList, getSetups } = useCommonHook();
    const [trackOptions, setTrackOptions] = useState<SelectOption[] | undefined>();
    const [carOptions, setCarOptions] = useState<SelectOption[] | undefined>();

    const [selectedTrack, setSelectedTrack] = useState<string>();
    const [selectedCar, setSelectedCar] = useState<string>();

    const handleFind = async () => {
        setIsLoading(true);
        const setups = await getSetups(selectedTrack, selectedCar);
        setSetups(setups);
        setIsLoading(false);
    }

    useEffect(() => {
        const fetchTrackList = async () => {
            const tracks = await getTrackList();
            setTrackOptions(tracks);
        };

        const fetchCarList = async () => {
            const cars = await getCarList();
            setCarOptions(cars);
        };

        fetchTrackList();
        fetchCarList();
    }, []);

    return (
        <div className="w-full flex flex-col lg:flex-row items-center gap-8 md:px-24 font-kaisei">

            <SelectWithLoading
                placeholder="Select track"
                options={trackOptions}
                isLoading={!trackOptions}
                onChange={setSelectedTrack}
            />
            <SelectWithLoading
                placeholder={selectedTrack ? "Select car" : "Please select a track first"}
                options={carOptions}
                isLoading={!carOptions}
                isDiabled={!selectedTrack}
                onChange={setSelectedCar}
            />

            <Button
                onClick={handleFind}
                disabled={!selectedTrack}
                className="w-full lg:w-fit bg-sd-secondary hover:bg-sd-secondaryHover font-bold text-black text-2xl px-8 py-6 rounded-sm">
                Find Setup
            </Button>
            <Dialog>
                <DialogTrigger asChild>
                    <Button
                        className="w-full lg:w-fit bg-sd-secondary hover:bg-sd-secondaryHover font-bold text-black text-2xl px-8 py-6 rounded-sm">
                        <Plus size={48} />
                        Add Setup
                    </Button>
                </DialogTrigger>
                <AddDialog carOptions={carOptions} trackOptions={trackOptions} />
            </Dialog>

        </div>
    )
}

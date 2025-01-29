import { Setup } from "@/common/types";

export const useCommonHook = () => {

    const getTrackList = async () => {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/tracks`)
        const data = await response.json();
        return data.map((item: any) => {
            return {
                value: item._id,
                label: item.name
            }
        })
    }

    const getCarList = async () => {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/cars`)
        const data = await response.json();
        return data.map((item: any) => {
            return {
                value: item._id,
                label: item.name
            }
        })
    }

    const getSetups = async (trackId?: string, carId?: string) => {

        if (!trackId) {
            return [];
        }
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/tracks/${trackId}/setups${carId ? `?car=${carId}` : ""}`);
        const data = await response.json();
        
        return data;
    }

    const addSetup = async (setup: Setup) => {
        try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/setups/add`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(setup),
            });
    
            if (!response.ok) {
                return false;
            }
    
            return true;
        } catch (error) {
            console.error("Error adding setup:", error);
            return false;
        }
    };
    

    return {
        getTrackList,
        getCarList,
        getSetups,
        addSetup
    }
}
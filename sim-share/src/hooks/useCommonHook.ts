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
        console.log(data);
        
        return data;
    }

    return {
        getTrackList,
        getCarList,
        getSetups
    }
}
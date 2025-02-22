import axios from 'axios';
export interface VehicleStatsResponse {
    count_id: number;
    timestamp: string;
    location: string;
    car_count: number;
    motorbike_count: number;
    truck_count: number;
    bus_count: number;
}


const getAllVehicleStats = async (): Promise<VehicleStatsResponse[]> => {
    try {
        const response = await axios.get(`${process.env.BACK_END_URL}/api/vehicle-stats`);
        return response.data.data;
    } catch (error) {
        console.error(error);
        return [];
    }
};

export default getAllVehicleStats;

interface VehicleStats {
    car: number,
    motorbike: number,
    truck: number,
    bus: number,
}

export default async function updateCount(vehicleStats: VehicleStats, location: string) {

    const { car, motorbike, truck, bus } = vehicleStats;

    await fetch('/api/updateCount', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            location: location,
            car_count: car,
            motorbike_count: motorbike,
            truck_count: truck,
            bus_count: bus
        }),
    });
};
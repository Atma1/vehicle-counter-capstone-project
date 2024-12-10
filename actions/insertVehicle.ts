export default async function insertVehicle(vehicleClass: string, detectionTime: Date, location: string) {
    await fetch('/api/insertVehicle', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ class: vehicleClass, detection_time: detectionTime, location }),
    });
};
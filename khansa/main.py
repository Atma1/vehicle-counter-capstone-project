import cv2
import numpy as np
from tracker.byte_tracker import BYTETracker  # Assuming ByteTrack is implemented here
from ultralytics import YOLO
from util.util_functions import draw_counter, draw_label, update_counter, trigger_line


# Constants
CONFIDENCE_THRESHOLD = 0.8
GREEN = (0, 255, 0)
RED = (0, 0, 255)

# Video input and YOLO model
video = cv2.VideoCapture("vide_test2.mp4")
model = YOLO("/Users/khansafca/Documents/bangkit/vehicle-counter-capstone-project/yolov8s-300epoch.pt")
model.fuse()  # Fuse model layers for faster inference

# Initialize vehicle counter and tracker
counter = {"car": 0, "truck": 0, "motorbike": 0, "bus": 0}
tracker = BYTETracker()  # Initialize ByteTrack

# Line coordinates for counting
line_point1 = (125, 480)
line_point2 = (738, 705)
offset = 12  # Offset for line proximity check

# Main processing loop
while video.isOpened():
    ret, frame = video.read()
    if not ret:
        break

    # YOLO inference
    results = model(frame)[0]
    detections = []
    for detection in results.boxes:
        # Extract bounding box coordinates as a numpy array
        xyxy = detection.xyxy.cpu().numpy().flatten()  # Convert to a flat array
        confidence = float(detection.conf)  # Confidence score
        label_id = int(detection.cls)  # Class ID

        if confidence < CONFIDENCE_THRESHOLD:
            continue

        # Unpack the bounding box coordinates
        x1, y1, x2, y2 = map(int, xyxy)
        label_name = model.names[label_id]  # Get label name using class ID

        if label_name in counter.keys():
            detections.append((x1, y1, x2, y2, confidence, label_name))



    # Track objects using ByteTrack
    tracked_objects = tracker.update(np.array(detections), frame.shape[:2])

    # Draw detection and track results
    for obj in tracked_objects:
        x1, y1, x2, y2, obj_id, label_id = obj.tlbr[0], obj.tlbr[1], obj.tlbr[2], obj.tlbr[3], obj.track_id, obj.class_id
        label_name = model.names[label_id]
        box_color = GREEN if label_name in counter else RED

        # Draw bounding box and label
        cv2.rectangle(frame, (int(x1), int(y1)), (int(x2), int(y2)), box_color, 2)
        draw_label(frame, f"{label_name} ID:{obj_id}", int(x1), int(y1) - 10)

        # Check if object crossed the counting line
        obj_center = ((int(x1) + int(x2)) // 2, (int(y1) + int(y2)) // 2)
        if trigger_line(obj_center, line_point1, line_point2, offset):
            counter = update_counter(counter, label_name)

    # Draw the counting line and counter
    cv2.line(frame, line_point1, line_point2, RED, 2)
    draw_counter(frame, counter)

    # Display the processed frame
    cv2.imshow("Vehicle Counter", frame)
    if cv2.waitKey(1) & 0xFF == ord('q'):
        break

# Release resources
video.release()
cv2.destroyAllWindows()

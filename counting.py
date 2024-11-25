import tensorflow as tf
from bytetrack import ByteTrack
import cv2
import numpy as np

# Load the TFLite model
interpreter = tf.lite.Interpreter(model_path="yolov8s-300epoch_float32.tflite")
interpreter.allocate_tensors()

# Define vehicle classes
vehicle_classes = ['bus', 'car', 'motorbike', 'truck']

# Initialize ByteTrack
bytetrack = ByteTrack(mot_tracker=None, frame_rate=30, track_thresh=0.5, track_buffer=30)

# Function to detect objects and filter vehicle classes
def detect_vehicles(frame):
    input_details = interpreter.get_input_details()
    output_details = interpreter.get_output_details()

    # Preprocess the image
    input_tensor = np.expand_dims(cv2.resize(frame, (640, 640)), 0)

    # Set the input tensor
    interpreter.set_tensor(input_details[0]['index'], input_tensor)

    # Invoke the interpreter
    interpreter.invoke()

    # Get the output tensor
    output_data = interpreter.get_tensor(output_details[0]['index'])

    # Postprocess the output
    boxes, scores, classes, num_detections = postprocess(output_data)

    # Filter vehicle classes
    vehicle_indices = [i for i, cls in enumerate(classes[0]) if cls in vehicle_classes]
    vehicle_boxes = boxes[0][vehicle_indices]
    vehicle_scores = scores[0][vehicle_indices]
    vehicle_classes = classes[0][vehicle_indices]

    return vehicle_boxes, vehicle_scores, vehicle_classes

# Video capture
cap = cv2.VideoCapture('video_input.mp4')

while True:
    ret, frame = cap.read()
    if not ret:
        break

    # Detect vehicles
    boxes, scores, classes = detect_vehicles(frame)

    # Track vehicles
    tracks = bytetrack.update(boxes, scores, classes)

    # Visualize results
    for track in tracks:
        bbox = track[:4]
        track_id = track[4]
        class_id = track[5]
        class_name = vehicle_classes[int(class_id)]
        cv2.rectangle(frame, (int(bbox[0]), int(bbox[1])), (int(bbox[2]), int(bbox[3]))), (0, 255, 0), 2
        cv2.putText(frame, f"{class_name} {track_id}", (int(bbox[0]), int(bbox[1]) - 10)), cv2.FONT_HERSHEY_SIMPLEX, 0.5, (0, 255, 0), 2

    cv2.imshow('Frame', frame)
    if cv2.waitKey(1) & 0xFF == ord('q'):
        break

cap.release()
cv2.destroyAllWindows()

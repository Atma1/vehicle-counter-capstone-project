import cv2
from ultralytics import YOLO
from util import (
        draw_counter,
        draw_label,
        # update_counter
    )
CONFIDENCE_THRESHOLD = 0.65
GREEN = (0, 255, 0)

video = cv2.VideoCapture("Untitled.mp4")

model = YOLO("./models/yolov8s-300epoch.pt")

counter = {"car": 0, "truck": 0, "motorbike": 0, "bus": 0}

model.fuse()
# {0: 'bus', 1: 'car', 2: 'motorbike', 3: 'truck'}
classes_dict = model.model.names  # type: ignore

while video.isOpened():
    ret, frame = video.read()
    if type(frame) is None:
        break
    results = model.predict(frame, conf=CONFIDENCE_THRESHOLD, verbose=False)
    if ret and results[0].boxes is not None:

        bounding_box = results[0].boxes.xyxy
        classes_idx = results[0].boxes.cls.tolist()
        confidence_score = results[0].boxes.conf

        draw_counter(frame, counter)

        for bbox, cls, conf in zip(bounding_box, classes_idx, confidence_score):

            x1, y1, x2, y2 = [int(tensor.item()) for tensor in bbox]

            cv2.rectangle(frame, (x1, y1), (x2, y2), color=GREEN, thickness=1)

            draw_label(frame, classes_dict, cls, x1, y1)

            # update_counter(cls, counter) TO DO: ADD TRACKER TO PREVENT DUPLICATE DETECTION

        cv2.imshow("Image", frame)

    if cv2.waitKey(1) & 0xFF == ord("q"):
        break

cv2.destroyAllWindows()
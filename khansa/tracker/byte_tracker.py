# tracker/byte_tracker.py

import numpy as np

class BYTETracker:
    def __init__(self):
        self.tracked_objects = {}  # Store tracked objects by ID
        self.next_id = 1  # ID for new objects

    def update(self, detections, frame_shape):
        """
        Update tracker with new detections.
        :param detections: List of detections, each as [x1, y1, x2, y2, score, class_id]
        :param frame_shape: Tuple of (height, width) of the video frame
        :return: List of tracked objects as (x1, y1, x2, y2, track_id, class_id)
        """
        updated_objects = []
        
        for det in detections:
            x1, y1, x2, y2, score, class_id = det
            # Assign a new ID (you can add object matching here)
            obj_id = self.next_id
            self.tracked_objects[obj_id] = (x1, y1, x2, y2, class_id)
            self.next_id += 1

            # Append to updated objects
            updated_objects.append((x1, y1, x2, y2, obj_id, class_id))

        return updated_objects
# util/util_functions.py

import cv2

def draw_counter(frame, counter):
    """
    Draw the counter on the frame.
    :param frame: The video frame
    :param counter: Dictionary with counts of different vehicle types
    """
    y_offset = 20
    for label, count in counter.items():
        cv2.putText(
            frame,
            f"{label.capitalize()}: {count}",
            (10, y_offset),
            cv2.FONT_HERSHEY_SIMPLEX,
            0.6,
            (255, 255, 255),
            2
        )
        y_offset += 20

def draw_label(frame, label, x, y):
    """
    Draw a label above a bounding box.
    :param frame: The video frame
    :param label: The text to display
    :param x: X-coordinate for the label
    :param y: Y-coordinate for the label
    """
    cv2.putText(
        frame,
        label,
        (x, y),
        cv2.FONT_HERSHEY_SIMPLEX,
        0.5,
        (255, 255, 255),
        2
    )

def update_counter(counter, label_name):
    """
    Update the vehicle counter based on the label name.
    :param counter: Dictionary with counts of different vehicle types
    :param label_name: Detected vehicle type (e.g., 'car', 'truck')
    :return: Updated counter
    """
    if label_name in counter:
        counter[label_name] += 1
    return counter

def trigger_line(obj_center, line_point1, line_point2, offset=12):
    """
    Check if an object's center has crossed a given line.
    :param obj_center: The center point of the object (x, y)
    :param line_point1: Start point of the line (x1, y1)
    :param line_point2: End point of the line (x2, y2)
    :param offset: Distance threshold for proximity to the line
    :return: Boolean indicating if the line was crossed
    """
    # Line equation (Ax + By + C = 0) coefficients
    A = line_point2[1] - line_point1[1]
    B = line_point1[0] - line_point2[0]
    C = A * line_point1[0] + B * line_point1[1]

    # Distance from point to line
    distance = abs(A * obj_center[0] + B * obj_center[1] - C) / (A ** 2 + B ** 2) ** 0.5

    return distance < offset

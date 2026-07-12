import cv2
import os

os.makedirs('public/media/frames_mobile', exist_ok=True)
cap = cv2.VideoCapture('public/media/pajo-hero.mp4')

if not cap.isOpened():
    print("Error opening video file")
    exit()

count = 0
saved_count = 0

while True:
    ret, frame = cap.read()
    if not ret:
        break
    
    # Save every 3rd frame to reduce frame count to ~10-12 fps
    if count % 3 == 0:
        # Resize to 640x360 (very low RAM usage)
        frame_resized = cv2.resize(frame, (640, 360))
        # Compress JPEG to 60% quality
        cv2.imwrite(f'public/media/frames_mobile/frame_{saved_count:03d}.jpg', frame_resized, [cv2.IMWRITE_JPEG_QUALITY, 60])
        saved_count += 1
        
    count += 1

cap.release()
print(f"Extracted {saved_count} mobile frames successfully.")

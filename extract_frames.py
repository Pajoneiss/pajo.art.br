import cv2
import os

video_path = "public/media/pajo-hero.mp4"
output_dir = "public/media/frames"

if not os.path.exists(output_dir):
    os.makedirs(output_dir)

cap = cv2.VideoCapture(video_path)
count = 0

print("Extracting frames...")
while True:
    ret, frame = cap.read()
    if not ret:
        break
    
    # Resize to 720p for performance and memory (Canvas scrubbing needs to be lightweight)
    frame = cv2.resize(frame, (1280, 720))
    
    # Format number with leading zeros (e.g., 001)
    file_name = f"frame_{count:03d}.jpg"
    file_path = os.path.join(output_dir, file_name)
    
    # Save as JPEG with 80% quality to reduce payload size
    cv2.imwrite(file_path, frame, [int(cv2.IMWRITE_JPEG_QUALITY), 80])
    count += 1

cap.release()
print(f"Extraction complete! Total frames: {count}")

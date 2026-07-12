import cv2
import os

def extract_frames(video_path, output_dir, target_count, target_width=None):
    if not os.path.exists(output_dir):
        os.makedirs(output_dir)
    else:
        for f in os.listdir(output_dir):
            if f.endswith(".jpg") or f.endswith(".webp"):
                os.remove(os.path.join(output_dir, f))
                
    cap = cv2.VideoCapture(video_path)
    total_frames = int(cap.get(cv2.CAP_PROP_FRAME_COUNT))
    print(f"Video {video_path} has {total_frames} frames. Target: {target_count}")
    
    if total_frames <= 0:
        print("Failed to open video")
        return

    step = total_frames / target_count
    
    saved = 0
    for i in range(target_count):
        frame_idx = min(int(i * step), total_frames - 1)
        cap.set(cv2.CAP_PROP_POS_FRAMES, frame_idx)
        ret, frame = cap.read()
        if not ret:
            # If fail, try previous frame
            cap.set(cv2.CAP_PROP_POS_FRAMES, frame_idx - 1)
            ret, frame = cap.read()
            if not ret:
                print(f"Failed to read frame {frame_idx}")
                continue
            
        if target_width:
            h, w = frame.shape[:2]
            target_height = int(h * (target_width / w))
            frame = cv2.resize(frame, (target_width, target_height))
            
        out_path = os.path.join(output_dir, f"frame_{str(saved).zfill(3)}.webp")
        cv2.imwrite(out_path, frame, [int(cv2.IMWRITE_WEBP_QUALITY), 70])
        saved += 1
        
    cap.release()
    print(f"Saved {saved} frames to {output_dir}")

if __name__ == "__main__":
    base_dir = r"G:\pajo site\public\media"
    desktop_vid = os.path.join(base_dir, "pajo-hero.mp4")
    mobile_vid = os.path.join(base_dir, "Stop-time-mobile.mp4")

    frames_dir = os.path.join(base_dir, "frames")
    frames_mobile_dir = os.path.join(base_dir, "frames_mobile")

    extract_frames(desktop_vid, frames_dir, 361)
    extract_frames(mobile_vid, frames_mobile_dir, 121, target_width=720)

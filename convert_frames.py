import os
import subprocess
import json

def get_video_info(video_path):
    cmd = [
        'ffprobe', '-v', 'error', 
        '-select_streams', 'v:0', 
        '-show_entries', 'stream=duration,nb_frames,r_frame_rate', 
        '-of', 'json', video_path
    ]
    result = subprocess.run(cmd, stdout=subprocess.PIPE, stderr=subprocess.PIPE, text=True)
    return json.loads(result.stdout)

def main():
    base_dir = r"G:\pajo site\public\media"
    
    desktop_vid = os.path.join(base_dir, "pajo-hero.mp4")
    mobile_vid = os.path.join(base_dir, "Stop-time-mobile.mp4")
    
    frames_dir = os.path.join(base_dir, "frames")
    frames_mobile_dir = os.path.join(base_dir, "frames_mobile")
    
    # 1. Clean existing JPGs
    for d in [frames_dir, frames_mobile_dir]:
        if not os.path.exists(d):
            os.makedirs(d)
        else:
            for f in os.listdir(d):
                if f.endswith(".jpg") or f.endswith(".webp"):
                    os.remove(os.path.join(d, f))
    
    # 2. Extract desktop frames (361 frames)
    # Desktop video is about 12 seconds. 
    print("Extracting desktop frames to WEBP...")
    cmd_desktop = [
        "ffmpeg", "-y", "-i", desktop_vid, 
        "-vf", "scale=-1:1080", 
        "-vframes", "361", 
        "-c:v", "libwebp", "-q:v", "70", 
        "-preset", "default",
        os.path.join(frames_dir, "frame_%03d.webp")
    ]
    subprocess.run(cmd_desktop)
    
    # 3. Extract mobile frames (121 frames)
    # Check mobile video duration to get the right fps to span the whole video or just 121 frames.
    info = get_video_info(mobile_vid)
    print("Mobile video info:", info)
    
    duration = float(info['streams'][0].get('duration', 4.0)) # default 4s if missing
    # We want 121 frames over `duration` seconds
    fps = 121 / duration
    
    print(f"Extracting mobile frames to WEBP at {fps} fps...")
    cmd_mobile = [
        "ffmpeg", "-y", "-i", mobile_vid, 
        "-vf", f"fps={fps},scale=720:-1", 
        "-vframes", "121", 
        "-c:v", "libwebp", "-q:v", "70", 
        "-preset", "default",
        os.path.join(frames_mobile_dir, "frame_%03d.webp")
    ]
    subprocess.run(cmd_mobile)
    
    # Let's count them
    d_count = len([f for f in os.listdir(frames_dir) if f.endswith('.webp')])
    m_count = len([f for f in os.listdir(frames_mobile_dir) if f.endswith('.webp')])
    
    print(f"Done! Desktop frames: {d_count}. Mobile frames: {m_count}.")
    
    # Rename frame_001 to frame_000, etc. because ffmpeg starts at 001
    for d in [frames_dir, frames_mobile_dir]:
        files = sorted([f for f in os.listdir(d) if f.endswith('.webp')])
        for i, f in enumerate(files):
            new_name = f"frame_{str(i).zfill(3)}.webp"
            os.rename(os.path.join(d, f), os.path.join(d, new_name))
            
    print("Renaming complete.")

if __name__ == "__main__":
    main()

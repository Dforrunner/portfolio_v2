import React from "react";

interface VideoPlayerProps {
  src: string;
  title: string;
}

const VideoPlayer: React.FC<VideoPlayerProps> = ({ src, title }) => {
  return (
    <div className="my-6 rounded-lg overflow-hidden border border-zinc-200 dark:border-zinc-800">
      <div className="relative aspect-video bg-black">
        {/* Use <video> for local files or <iframe> for external embeds */}
        {src.startsWith("http") ? (
          <iframe
            src={src}
            title={title}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            className="w-full h-full"
          />
        ) : (
          <video
            controls
            className="w-full h-full object-cover"
            title={title}
          >
            <source src={src} type={`video/${src.split(".").pop()}`} />
            Your browser does not support the video tag.
          </video>
        )}
      </div>
    </div>
  );
};

export default VideoPlayer;
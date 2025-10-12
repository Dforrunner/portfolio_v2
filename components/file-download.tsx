import React from "react";

interface FileDownloadProps {
  src: string;
  title: string;
}

const FileDownload: React.FC<FileDownloadProps> = ({ src, title }) => {
  return (
    <div className="my-6 p-4 border border-zinc-200 dark:border-zinc-800 rounded-lg bg-zinc-50 dark:bg-zinc-900/30">
      <div className="flex items-center gap-3">
        {/* File icon */}
        <svg
          className="w-6 h-6 text-blue-500"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
          />
        </svg>

        {/* File details */}
        <div>
          <p className="font-medium text-gray-900 dark:text-gray-100">
            {title || "Download File"}
          </p>
          <a
            href={src}
            download
            className="text-sm text-blue-600 dark:text-blue-400 hover:underline"
            aria-label="Download File"
          >
            Download
          </a>
        </div>
      </div>
    </div>
  );
};

export default FileDownload;
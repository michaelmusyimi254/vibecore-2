import React, { useRef } from 'react';

interface MediaStepProps {
  role: string;
  onNext: () => void;
  onBack: () => void;
}

const MediaStep: React.FC<MediaStepProps> = ({ role, onNext, onBack }) => {
  // Placeholder state for gallery and video
  const fileInputRef = useRef<HTMLInputElement>(null);
  // TODO: Use react-hook-form for real implementation

  return (
    <div>
      <h2 className="text-xl font-bold mb-4">Media Uploads</h2>
      <div className="mb-6">
        <label className="block font-medium mb-1">Gallery (up to 10 images/videos)</label>
        <input
          type="file"
          accept="image/*,video/*"
          multiple
          ref={fileInputRef}
          className="block w-full border rounded p-2"
        />
        <p className="text-xs text-gray-500 mt-1">You can upload up to 10 images or videos.</p>
      </div>
      <div className="mb-6">
        <label className="block font-medium mb-1">Intro Video (optional)</label>
        <input
          type="file"
          accept="video/*"
          className="block w-full border rounded p-2"
        />
        <p className="text-xs text-gray-500 mt-1">Upload a short intro video (optional).</p>
      </div>
      <div className="flex justify-between mt-8">
        <button className="btn btn-outline" onClick={onBack}>Back</button>
        <button className="btn btn-primary" onClick={onNext}>Next</button>
      </div>
    </div>
  );
};

export default MediaStep;

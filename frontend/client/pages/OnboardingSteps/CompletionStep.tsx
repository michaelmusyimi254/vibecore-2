import React from 'react';

interface CompletionStepProps {
  role: string;
}

const CompletionStep: React.FC<CompletionStepProps> = ({ role }) => {
  // TODO: Fetch trial countdown and profile progress from API
  return (
    <div className="text-center">
      <h2 className="text-2xl font-bold mb-4">Onboarding Complete!</h2>
      <p className="mb-6">Your profile is ready. Enjoy your VibeCore experience!</p>
      <div className="mb-4">[Trial countdown: e.g. 7 days left]</div>
      <div className="mb-4">[Profile progress checklist]</div>
      <a href="/dashboard">
        <button className="btn btn-primary">Go to Dashboard</button>
      </a>
    </div>
  );
};

export default CompletionStep;

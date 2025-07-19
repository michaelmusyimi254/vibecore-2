import React, { useState } from 'react';
import PersonalInfoStep from './OnboardingSteps/PersonalInfoStep';
import RoleSpecificStep from './OnboardingSteps/RoleSpecificStep';
import MediaStep from './OnboardingSteps/MediaStep';
import PaymentStep from './OnboardingSteps/PaymentStep';
import CompletionStep from './OnboardingSteps/CompletionStep';
import NavBar from '@/components/ui/NavBar';
import Footer from '@/components/ui/Footer';

// You can fetch the user's role from context, props, or API
const getUserRole = () => {
  // Placeholder: replace with actual logic
  return localStorage.getItem('userRole') || 'member';
};

const Onboarding: React.FC = () => {
  const [step, setStep] = useState(1);
  const role = getUserRole();

  // Step navigation
  const nextStep = () => setStep((s) => s + 1);
  const prevStep = () => setStep((s) => (s > 1 ? s - 1 : 1));

  // Render the current step
  const renderStep = () => {
    switch (step) {
      case 1:
        return <PersonalInfoStep role={role} onNext={nextStep} />;
      case 2:
        return <RoleSpecificStep role={role} onNext={nextStep} onBack={prevStep} />;
      case 3:
        return <MediaStep role={role} onNext={nextStep} onBack={prevStep} />;
      case 4:
        return <PaymentStep role={role} onNext={nextStep} onBack={prevStep} />;
      case 5:
        return <CompletionStep role={role} />;
      default:
        return <PersonalInfoStep role={role} onNext={nextStep} />;
    }
  };

  // Progress bar/stepper (optional)
  const steps = ['Personal', 'Role', 'Media', 'Payment', 'Complete'];

  return (
    <>
      <NavBar />
      <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8 flex flex-col lg:flex-row">
        {/* Left: Hero/Image Section */}
        <div className="relative w-full lg:w-1/2 min-h-[300px] md:min-h-[400px] lg:min-h-screen flex items-center justify-center bg-gradient-to-br from-red-50 via-orange-50 to-yellow-50 overflow-hidden">
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <div className="absolute -top-20 -right-20 w-40 h-40 md:w-60 md:h-60 bg-red-200 rounded-full opacity-20 animate-float"></div>
            <div className="absolute -bottom-20 -left-20 w-48 h-48 md:w-72 md:h-72 bg-orange-200 rounded-full opacity-20 animate-float" style={{ animationDelay: '2s' }}></div>
          </div>
          <div className="vc-card vc-card-3d p-6 md:p-8 max-w-sm bg-gradient-to-br from-white to-red-50 m-4 md:m-8 text-center relative z-10">
            <div className="text-4xl mb-4">🚀</div>
            <h2 className="text-xl md:text-2xl font-bold mb-3 text-gray-900">
              {(() => {
                // Try to get the user's name from localStorage or fallback
                const name = localStorage.getItem('userFirstName') || 'there';
                const roleMap: Record<string, string> = {
                  member: 'a member',
                  coach: 'a coach',
                  ground: 'a facility owner',
                  vendor: 'a vendor',
                  event_organizer: 'an event organizer',
                };
                return `Hi ${name}, welcome on board! I see you are ${roleMap[role] || role}.`;
              })()}
            </h2>
            <p className="text-gray-600 mb-6 leading-relaxed">
              Complete your profile to unlock the full VibeCore experience for your role.
            </p>
          </div>
        </div>
        {/* Right: Onboarding Steps */}
        <div className="w-full lg:w-1/2 flex items-center justify-center bg-white relative">
          <div className="w-full max-w-xl p-4 md:p-6">
under             {/* Welcome message before stepper */}
            <div className="mb-6 p-4 bg-orange-50 border-l-4 border-red-400 rounded">
              <p className="italic text-gray-700">
                Thank you for coming on board to your fitness management journey.<br />
                On behalf of the entire VibeCore team, I want to personally welcome you.<br />
                We’re excited to support your growth, wellness, and success.<br />
                <span className="font-semibold">— The VibeCore Team</span>
              </p>
            </div>
            <div className="flex justify-between items-center mb-8">
              {steps.map((label, idx) => (
                <div key={label} className={`flex-1 text-center ${step === idx + 1 ? 'text-red-600 font-bold' : 'text-gray-400'}`}>
                  <div className={`w-8 h-8 mx-auto rounded-full flex items-center justify-center ${step === idx + 1 ? 'bg-red-100' : 'bg-gray-100'}`}>{idx + 1}</div>
                  <div className="text-xs mt-1">{label}</div>
                </div>
              ))}
            </div>
            {renderStep()}
            {/* Navigation Buttons */}
            <div className="flex justify-between mt-8">
              {step > 1 && (
                <button className="btn btn-outline" onClick={prevStep}>
                  Back
                </button>
              )}
              {step < steps.length && (
                <button className="btn btn-primary" onClick={nextStep}>
                  Continue
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Onboarding;

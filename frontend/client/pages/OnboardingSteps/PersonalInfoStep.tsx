import React from 'react';

interface PersonalInfoStepProps {
  role: string;
  onNext: () => void;
}

const PersonalInfoStep: React.FC<PersonalInfoStepProps> = ({ role, onNext }) => {
  // TODO: Implement form fields for name, phone, city, country, profile image/logo upload
  // Use react-hook-form and autosave to /api/profiles/update
  return (
    <div>
      <h2 className="text-xl font-bold mb-4">Personal/Business Info</h2>
      <form className="space-y-4" onSubmit={e => { e.preventDefault(); onNext(); }}>
        <div>
          <label className="block font-medium mb-1">Full Name</label>
          <input className="w-full border rounded p-2" placeholder="Full Name" name="name" autoComplete="name" />
        </div>
        <div>
          <label className="block font-medium mb-1">Phone</label>
          <input className="w-full border rounded p-2" placeholder="Phone Number" name="phone" autoComplete="tel" />
        </div>
        <div>
          <label className="block font-medium mb-1">City</label>
          <input className="w-full border rounded p-2" placeholder="City" name="city" autoComplete="address-level2" />
        </div>
        <div>
          <label className="block font-medium mb-1">Country</label>
          <select className="w-full border rounded p-2" name="country" autoComplete="country">
            <option value="">Select country</option>
            <option value="US">United States</option>
            <option value="CA">Canada</option>
            <option value="UK">United Kingdom</option>
            <option value="AU">Australia</option>
            <option value="KE">Kenya</option>
            <option value="NG">Nigeria</option>
            <option value="ZA">South Africa</option>
            <option value="IN">India</option>
            <option value="other">Other</option>
          </select>
        </div>
        <div>
          <label className="block font-medium mb-1">Profile Image / Logo</label>
          <input type="file" accept="image/*" className="w-full border rounded p-2" name="profileImage" />
        </div>
        <button type="submit" className="mt-6 btn btn-primary">Next</button>
      </form>
    </div>
  );
};

export default PersonalInfoStep;

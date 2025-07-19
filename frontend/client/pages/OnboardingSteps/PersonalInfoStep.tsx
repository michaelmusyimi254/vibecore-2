import React, { useState } from 'react';
import { useForm } from 'react-hook-form';

interface PersonalInfoStepProps {
  role: string;
  onNext: () => void;
}

interface PersonalInfoForm {
  name: string;
  phone: string;
  city: string;
  country: string;
  profileImage?: FileList;
}

const COUNTRIES = [
  { value: '', label: 'Select country' },
  { value: 'US', label: 'United States' },
  { value: 'CA', label: 'Canada' },
  { value: 'UK', label: 'United Kingdom' },
  { value: 'AU', label: 'Australia' },
  { value: 'KE', label: 'Kenya' },
  { value: 'NG', label: 'Nigeria' },
  { value: 'ZA', label: 'South Africa' },
  { value: 'IN', label: 'India' },
  { value: 'other', label: 'Other' },
];

const PersonalInfoStep: React.FC<PersonalInfoStepProps> = ({ role, onNext }) => {
  const [saving, setSaving] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm<PersonalInfoForm>({
    defaultValues: {
      name: localStorage.getItem('userFirstName') || '',
      phone: '',
      city: '',
      country: '',
    },
  });

  // Autosave on change
  const autosave = async (data: PersonalInfoForm) => {
    setSaving(true);
    try {
      // Simulate API call
      await fetch('/api/profiles/update', {
        method: 'POST',
        body: JSON.stringify(data),
        headers: { 'Content-Type': 'application/json' },
      });
    } catch (e) {
      // Handle error (show toast, etc.)
    } finally {
      setSaving(false);
    }
  };

  // On submit (next)
  const onSubmit = async (data: PersonalInfoForm) => {
    await autosave(data);
    onNext();
  };

  // Watch for changes and autosave
  React.useEffect(() => {
    const subscription = watch((data) => {
      autosave(data as PersonalInfoForm);
    });
    return () => subscription.unsubscribe();
  }, [watch]);

  return (
    <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
      <div>
        <label className="block font-medium mb-1">Full Name</label>
        <input
          className="w-full border rounded p-2"
          placeholder="Full Name"
          {...register('name', { required: 'Name is required' })}
        />
        {errors.name && <p className="text-xs text-red-600 mt-1">{errors.name.message}</p>}
      </div>
      <div>
        <label className="block font-medium mb-1">Phone</label>
        <input
          className="w-full border rounded p-2"
          placeholder="Phone Number"
          {...register('phone', { required: 'Phone is required' })}
        />
        {errors.phone && <p className="text-xs text-red-600 mt-1">{errors.phone.message}</p>}
      </div>
      <div>
        <label className="block font-medium mb-1">City</label>
        <input
          className="w-full border rounded p-2"
          placeholder="City"
          {...register('city', { required: 'City is required' })}
        />
        {errors.city && <p className="text-xs text-red-600 mt-1">{errors.city.message}</p>}
      </div>
      <div>
        <label className="block font-medium mb-1">Country</label>
        <select className="w-full border rounded p-2" {...register('country', { required: 'Country is required' })}>
          {COUNTRIES.map(c => (
            <option key={c.value} value={c.value}>{c.label}</option>
          ))}
        </select>
        {errors.country && <p className="text-xs text-red-600 mt-1">{errors.country.message}</p>}
      </div>
      <div>
        <label className="block font-medium mb-1">Profile Image / Logo</label>
        <input type="file" accept="image/*" className="w-full border rounded p-2" {...register('profileImage')} />
      </div>
      {saving && <p className="text-xs text-gray-500">Saving...</p>}
      <button type="submit" className="mt-6 btn btn-primary">Next</button>
    </form>
  );
};

export default PersonalInfoStep;

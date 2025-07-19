import React, { useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from '@/components/ui/select';

interface RoleSpecificStepProps {
  role: string;
  onNext: () => void;
  onBack: () => void;
}

const FITNESS_GOALS = [
  'Weight Loss',
  'Muscle Gain',
  'Strength Training',
  'Cardio Fitness',
  'Flexibility',
  'General Fitness',
  'Sports Performance',
  'Rehabilitation',
];
const EXPERIENCE_LEVELS = [
  'Beginner',
  'Intermediate',
  'Advanced',
  'Professional',
];
const COACH_SPECIALTIES = [
  'Personal Training',
  'Yoga',
  'Pilates',
  'CrossFit',
  'HIIT',
  'Strength Training',
  'Weight Loss',
  'Bodybuilding',
  'Sports Specific',
  'Senior Fitness',
  'Pre/Post Natal',
  'Rehabilitation',
];
const FACILITY_AMENITIES = [
  'Free Weights',
  'Cardio Machines',
  'Weight Machines',
  'Group Classes',
  'Personal Trainers',
  'Locker Rooms',
  'Showers',
  'Sauna',
  'Pool',
  'Parking',
  'Towel Service',
  'WiFi',
];
const PRODUCT_CATEGORIES = [
  'Fitness Equipment',
  'Supplements',
  'Activewear',
  'Footwear',
  'Accessories',
  'Recovery',
  'Nutrition',
  'Technology',
];
const EVENT_TYPES = [
  'Fitness Classes',
  'Bootcamps',
  'Workshops',
  'Seminars',
  'Competitions',
  'Charity Events',
  'Retreats',
  'Corporate Wellness',
];

const RoleSpecificStep: React.FC<RoleSpecificStepProps> = ({ role, onNext, onBack }) => {
  const [saving, setSaving] = useState(false);
  const { register, handleSubmit, control, watch, formState: { errors } } = useForm();

  // Autosave on change
  const autosave = async (data: any) => {
    setSaving(true);
    try {
      await fetch('/api/profiles/update', {
        method: 'POST',
        body: JSON.stringify(data),
        headers: { 'Content-Type': 'application/json' },
      });
    } catch (e) {
      // Handle error
    } finally {
      setSaving(false);
    }
  };

  // On submit (next)
  const onSubmit = async (data: any) => {
    await autosave(data);
    onNext();
  };

  // Watch for changes and autosave
  React.useEffect(() => {
    const subscription = watch((data) => {
      autosave(data);
    });
    return () => subscription.unsubscribe();
  }, [watch]);

  let content = null;
  switch (role) {
    case 'member':
      content = (
        <form onSubmit={handleSubmit(onSubmit)}>
          <h3 className="text-lg font-bold mb-2">Fitness Goals & Preferences</h3>
          <div className="mb-4">
            <label className="block font-medium mb-1">Fitness Goals</label>
            <Controller
              name="fitnessGoals"
              control={control}
              render={({ field }) => (
                <Select
                  multiple
                  value={field.value || []}
                  onValueChange={field.onChange}
                >
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select fitness goals" />
                  </SelectTrigger>
                  <SelectContent>
                    {FITNESS_GOALS.map(goal => (
                      <SelectItem key={goal} value={goal}>{goal}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              )}
            />
          </div>
          <div className="mb-4">
            <label className="block font-medium mb-1">Experience Level</label>
            <select {...register('experienceLevel', { required: 'Experience level is required' })} className="w-full border rounded p-2">
              <option value="">Select your experience level</option>
              {EXPERIENCE_LEVELS.map(level => (
                <option key={level} value={level}>{level}</option>
              ))}
            </select>
            {errors.experienceLevel && <p className="text-xs text-red-600 mt-1">{errors.experienceLevel.message}</p>}
          </div>
          <div className="mb-4">
            <label className="block font-medium mb-1">Emergency Contact</label>
            <input className="w-full border rounded p-2 mb-2" placeholder="Full Name" {...register('emergencyContactName', { required: 'Full name is required' })} />
            <input className="w-full border rounded p-2 mb-2" placeholder="Phone Number" {...register('emergencyContactPhone', { required: 'Phone number is required' })} />
            <input className="w-full border rounded p-2" placeholder="Relationship" {...register('emergencyContactRelation', { required: 'Relationship is required' })} />
            {(errors.emergencyContactName || errors.emergencyContactPhone || errors.emergencyContactRelation) && (
              <p className="text-xs text-red-600 mt-1">All emergency contact fields are required.</p>
            )}
          </div>
          <div className="mb-4">
            <label className="block font-medium mb-1">Medical Info</label>
            <textarea className="w-full border rounded p-2" placeholder="Describe any medical conditions..." {...register('medicalInfo')} />
          </div>
          {saving && <p className="text-xs text-gray-500">Saving...</p>}
          <div className="flex justify-between mt-8">
            <button type="button" className="btn btn-outline" onClick={onBack}>Back</button>
            <button type="submit" className="btn btn-primary">Next</button>
          </div>
        </form>
      );
      break;
    case 'coach':
      content = (
        <form onSubmit={handleSubmit(onSubmit)}>
          <h3 className="text-lg font-bold mb-2">Coach Profile</h3>
          <div className="mb-4">
            <label className="block font-medium mb-1">Bio</label>
            <textarea className="w-full border rounded p-2" placeholder="Tell us about your coaching experience..." {...register('bio', { required: 'Bio is required' })} />
            {errors.bio && <p className="text-xs text-red-600 mt-1">{errors.bio.message}</p>}
          </div>
          <div className="mb-4">
            <label className="block font-medium mb-1">Specialties</label>
            {COACH_SPECIALTIES.map(spec => (
              <label key={spec} className="block text-sm">
                <input type="checkbox" value={spec} {...register('specialties', { required: true })} /> {spec}
              </label>
            ))}
            {errors.specialties && <p className="text-xs text-red-600 mt-1">At least one specialty is required.</p>}
          </div>
          <div className="mb-4">
            <label className="block font-medium mb-1">Certifications</label>
            <textarea className="w-full border rounded p-2" placeholder="List your certifications..." {...register('certifications', { required: 'Certifications are required' })} />
            {errors.certifications && <p className="text-xs text-red-600 mt-1">{errors.certifications.message}</p>}
          </div>
          <div className="mb-4">
            <label className="block font-medium mb-1">Years of Experience</label>
            <input type="number" className="w-full border rounded p-2" placeholder="Years" {...register('yearsOfExperience', { required: 'Years of experience is required' })} />
            {errors.yearsOfExperience && <p className="text-xs text-red-600 mt-1">{errors.yearsOfExperience.message}</p>}
          </div>
          <div className="mb-4">
            <label className="block font-medium mb-1">Hourly Rate (USD)</label>
            <input type="number" className="w-full border rounded p-2" placeholder="Hourly Rate" {...register('hourlyRate', { required: 'Hourly rate is required' })} />
            {errors.hourlyRate && <p className="text-xs text-red-600 mt-1">{errors.hourlyRate.message}</p>}
          </div>
          <div className="mb-4">
            <label className="block font-medium mb-1">Social Links</label>
            <input className="w-full border rounded p-2 mb-2" placeholder="Website" {...register('website')} />
            <input className="w-full border rounded p-2 mb-2" placeholder="Instagram" {...register('instagram')} />
            <input className="w-full border rounded p-2 mb-2" placeholder="Facebook" {...register('facebook')} />
            <input className="w-full border rounded p-2" placeholder="Twitter/X" {...register('twitter')} />
          </div>
          {saving && <p className="text-xs text-gray-500">Saving...</p>}
          <div className="flex justify-between mt-8">
            <button type="button" className="btn btn-outline" onClick={onBack}>Back</button>
            <button type="submit" className="btn btn-primary">Next</button>
          </div>
        </form>
      );
      break;
    case 'ground':
      content = (
        <form onSubmit={handleSubmit(onSubmit)}>
          <h3 className="text-lg font-bold mb-2">Facility Details</h3>
          <div className="mb-4">
            <label className="block font-medium mb-1">Facility Name</label>
            <input className="w-full border rounded p-2" placeholder="Facility Name" {...register('facilityName', { required: 'Facility name is required' })} />
            {errors.facilityName && <p className="text-xs text-red-600 mt-1">{errors.facilityName.message}</p>}
          </div>
          <div className="mb-4">
            <label className="block font-medium mb-1">Facility Type</label>
            <select {...register('facilityType', { required: 'Facility type is required' })} className="w-full border rounded p-2">
              <option value="">Select facility type</option>
              <option value="gym">Gym/Fitness Center</option>
              <option value="yoga_studio">Yoga/Pilates Studio</option>
              <option value="crossfit_box">CrossFit Box</option>
              <option value="martial_arts">Martial Arts Studio</option>
              <option value="dance_studio">Dance Studio</option>
              <option value="sports_complex">Sports Complex</option>
              <option value="community_center">Community Center</option>
              <option value="other">Other</option>
            </select>
            {errors.facilityType && <p className="text-xs text-red-600 mt-1">{errors.facilityType.message}</p>}
          </div>
          <div className="mb-4">
            <label className="block font-medium mb-1">Description</label>
            <textarea className="w-full border rounded p-2" placeholder="Describe your facility..." {...register('description', { required: 'Description is required' })} />
            {errors.description && <p className="text-xs text-red-600 mt-1">{errors.description.message}</p>}
          </div>
          <div className="mb-4">
            <label className="block font-medium mb-1">Amenities</label>
            {FACILITY_AMENITIES.map(amenity => (
              <label key={amenity} className="block text-sm">
                <input type="checkbox" value={amenity} {...register('amenities', { required: true })} /> {amenity}
              </label>
            ))}
            {errors.amenities && <p className="text-xs text-red-600 mt-1">At least one amenity is required.</p>}
          </div>
          <div className="mb-4">
            <label className="block font-medium mb-1">Business Hours</label>
            <input className="w-full border rounded p-2" placeholder="e.g. Mon-Fri 6am-10pm, Sat-Sun 8am-8pm" {...register('businessHours', { required: 'Business hours are required' })} />
            {errors.businessHours && <p className="text-xs text-red-600 mt-1">{errors.businessHours.message}</p>}
          </div>
          <div className="mb-4">
            <label className="block font-medium mb-1">Capacity</label>
            <input type="number" className="w-full border rounded p-2" placeholder="Maximum Capacity" {...register('capacity', { required: 'Capacity is required' })} />
            {errors.capacity && <p className="text-xs text-red-600 mt-1">{errors.capacity.message}</p>}
          </div>
          <div className="mb-4">
            <label className="block font-medium mb-1">Location</label>
            <input className="w-full border rounded p-2 mb-2" placeholder="Address" {...register('address', { required: 'Address is required' })} />
            <input className="w-full border rounded p-2 mb-2" placeholder="City" {...register('city', { required: 'City is required' })} />
            <input className="w-full border rounded p-2 mb-2" placeholder="State/Province" {...register('state', { required: 'State/Province is required' })} />
            <input className="w-full border rounded p-2 mb-2" placeholder="ZIP/Postal Code" {...register('zipCode', { required: 'ZIP/Postal Code is required' })} />
            <input className="w-full border rounded p-2" placeholder="Country" {...register('country', { required: 'Country is required' })} />
            {(errors.address || errors.city || errors.state || errors.zipCode || errors.country) && (
              <p className="text-xs text-red-600 mt-1">All location fields are required.</p>
            )}
          </div>
          <div className="mb-4">
            <label className="block font-medium mb-1">Website</label>
            <input className="w-full border rounded p-2" placeholder="Website (optional)" {...register('website')} />
          </div>
          <div className="mb-4">
            <label className="block font-medium mb-1">Social Links</label>
            <input className="w-full border rounded p-2 mb-2" placeholder="Instagram" {...register('instagram')} />
            <input className="w-full border rounded p-2 mb-2" placeholder="Facebook" {...register('facebook')} />
            <input className="w-full border rounded p-2" placeholder="Twitter/X" {...register('twitter')} />
          </div>
          {saving && <p className="text-xs text-gray-500">Saving...</p>}
          <div className="flex justify-between mt-8">
            <button type="button" className="btn btn-outline" onClick={onBack}>Back</button>
            <button type="submit" className="btn btn-primary">Next</button>
          </div>
        </form>
      );
      break;
    case 'vendor':
      content = (
        <form onSubmit={handleSubmit(onSubmit)}>
          <h3 className="text-lg font-bold mb-2">Brand/Vendor Details</h3>
          <div className="mb-4">
            <label className="block font-medium mb-1">Business Name</label>
            <input className="w-full border rounded p-2" placeholder="Business Name" {...register('businessName', { required: 'Business name is required' })} />
            {errors.businessName && <p className="text-xs text-red-600 mt-1">{errors.businessName.message}</p>}
          </div>
          <div className="mb-4">
            <label className="block font-medium mb-1">Business Type</label>
            <select {...register('businessType', { required: 'Business type is required' })} className="w-full border rounded p-2">
              <option value="">Select business type</option>
              <option value="supplements">Supplements & Nutrition</option>
              <option value="apparel">Fitness Apparel</option>
              <option value="equipment">Fitness Equipment</option>
              <option value="accessories">Accessories</option>
              <option value="tech">Fitness Tech</option>
              <option value="other">Other</option>
            </select>
            {errors.businessType && <p className="text-xs text-red-600 mt-1">{errors.businessType.message}</p>}
          </div>
          <div className="mb-4">
            <label className="block font-medium mb-1">Description</label>
            <textarea className="w-full border rounded p-2" placeholder="Describe your brand..." {...register('businessDescription', { required: 'Description is required' })} />
            {errors.businessDescription && <p className="text-xs text-red-600 mt-1">{errors.businessDescription.message}</p>}
          </div>
          <div className="mb-4">
            <label className="block font-medium mb-1">Product Categories</label>
            {PRODUCT_CATEGORIES.map(cat => (
              <label key={cat} className="block text-sm">
                <input type="checkbox" value={cat} {...register('productCategories', { required: true })} /> {cat}
              </label>
            ))}
            {errors.productCategories && <p className="text-xs text-red-600 mt-1">At least one product category is required.</p>}
          </div>
          <div className="mb-4">
            <label className="block font-medium mb-1">Tax ID / VAT Number</label>
            <input className="w-full border rounded p-2" placeholder="Tax ID / VAT Number" {...register('taxId', { required: 'Tax ID is required' })} />
            {errors.taxId && <p className="text-xs text-red-600 mt-1">{errors.taxId.message}</p>}
          </div>
          <div className="mb-4">
            <label className="block font-medium mb-1">Business Address</label>
            <input className="w-full border rounded p-2 mb-2" placeholder="Street Address" {...register('address', { required: 'Address is required' })} />
            <input className="w-full border rounded p-2 mb-2" placeholder="City" {...register('city', { required: 'City is required' })} />
            <input className="w-full border rounded p-2 mb-2" placeholder="State/Province" {...register('state', { required: 'State/Province is required' })} />
            <input className="w-full border rounded p-2 mb-2" placeholder="ZIP/Postal Code" {...register('zipCode', { required: 'ZIP/Postal Code is required' })} />
            <input className="w-full border rounded p-2" placeholder="Country" {...register('country', { required: 'Country is required' })} />
            {(errors.address || errors.city || errors.state || errors.zipCode || errors.country) && (
              <p className="text-xs text-red-600 mt-1">All business address fields are required.</p>
            )}
          </div>
          <div className="mb-4">
            <label className="block font-medium mb-1">Social Links</label>
            <input className="w-full border rounded p-2 mb-2" placeholder="Instagram" {...register('instagram')} />
            <input className="w-full border rounded p-2 mb-2" placeholder="Facebook" {...register('facebook')} />
            <input className="w-full border rounded p-2 mb-2" placeholder="Twitter/X" {...register('twitter')} />
            <input className="w-full border rounded p-2" placeholder="TikTok" {...register('tiktok')} />
          </div>
          <div className="mb-4">
            <label className="block font-medium mb-1">Business Policies</label>
            <textarea className="w-full border rounded p-2 mb-2" placeholder="Return Policy" {...register('returnPolicy')} />
            <textarea className="w-full border rounded p-2 mb-2" placeholder="Shipping Policy" {...register('shippingPolicy')} />
            <textarea className="w-full border rounded p-2" placeholder="Privacy Policy" {...register('privacyPolicy')} />
          </div>
          {saving && <p className="text-xs text-gray-500">Saving...</p>}
          <div className="flex justify-between mt-8">
            <button type="button" className="btn btn-outline" onClick={onBack}>Back</button>
            <button type="submit" className="btn btn-primary">Next</button>
          </div>
        </form>
      );
      break;
    case 'event_organizer':
      content = (
        <form onSubmit={handleSubmit(onSubmit)}>
          <h3 className="text-lg font-bold mb-2">Event Organizer Details</h3>
          <div className="mb-4">
            <label className="block font-medium mb-1">Organization Name</label>
            <input className="w-full border rounded p-2" placeholder="Organization Name" {...register('organizationName', { required: 'Organization name is required' })} />
            {errors.organizationName && <p className="text-xs text-red-600 mt-1">{errors.organizationName.message}</p>}
          </div>
          <div className="mb-4">
            <label className="block font-medium mb-1">Organization Type</label>
            <input className="w-full border rounded p-2" placeholder="Organization Type" {...register('organizationType', { required: 'Organization type is required' })} />
            {errors.organizationType && <p className="text-xs text-red-600 mt-1">{errors.organizationType.message}</p>}
          </div>
          <div className="mb-4">
            <label className="block font-medium mb-1">Description</label>
            <textarea className="w-full border rounded p-2" placeholder="Describe your organization..." {...register('description', { required: 'Description is required' })} />
            {errors.description && <p className="text-xs text-red-600 mt-1">{errors.description.message}</p>}
          </div>
          <div className="mb-4">
            <label className="block font-medium mb-1">Event Types</label>
            {EVENT_TYPES.map(type => (
              <label key={type} className="block text-sm">
                <input type="checkbox" value={type} {...register('eventTypes', { required: true })} /> {type}
              </label>
            ))}
            {errors.eventTypes && <p className="text-xs text-red-600 mt-1">At least one event type is required.</p>}
          </div>
          <div className="mb-4">
            <label className="block font-medium mb-1">Years of Experience</label>
            <input type="number" className="w-full border rounded p-2" placeholder="Years" {...register('yearsOfExperience', { required: 'Years of experience is required' })} />
            {errors.yearsOfExperience && <p className="text-xs text-red-600 mt-1">{errors.yearsOfExperience.message}</p>}
          </div>
          <div className="mb-4">
            <label className="block font-medium mb-1">Portfolio (optional)</label>
            <input className="w-full border rounded p-2" placeholder="Portfolio/Work Samples" {...register('portfolio')} />
          </div>
          <div className="mb-4">
            <label className="block font-medium mb-1">Social Links</label>
            <input className="w-full border rounded p-2 mb-2" placeholder="Instagram" {...register('instagram')} />
            <input className="w-full border rounded p-2 mb-2" placeholder="Facebook" {...register('facebook')} />
            <input className="w-full border rounded p-2" placeholder="Twitter/X" {...register('twitter')} />
          </div>
          {saving && <p className="text-xs text-gray-500">Saving...</p>}
          <div className="flex justify-between mt-8">
            <button type="button" className="btn btn-outline" onClick={onBack}>Back</button>
            <button type="submit" className="btn btn-primary">Next</button>
          </div>
        </form>
      );
      break;
    default:
      content = <div>Unknown role</div>;
  }

  return (
    <div>
      {content}
    </div>
  );
};

export default RoleSpecificStep;

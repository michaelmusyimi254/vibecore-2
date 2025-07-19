import React, { useState, useEffect, useCallback } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Calendar } from '@/components/ui/calendar';
import { ScrollArea } from '@/components/ui/scroll-area';
import { 
  User, 
  Dumbbell, 
  Building2, 
  ShoppingBag, 
  Calendar as CalendarIcon,
  Check,
  ArrowRight,
  ArrowLeft,
  Mail,
  Lock,
  Eye,
  EyeOff,
  Phone,
  MapPin,
  Briefcase,
  CreditCard,
  Globe,
  UserCheck,
  Clock,
  Users,
  DollarSign,
  Image as ImageIcon,
  X,
  ChevronDown,
  Plus,
  Minus,
  AlertCircle,
  Info,
  CheckCircle2,
  CalendarDays,
  Clock as ClockIcon,
  MapPin as MapPinIcon,
  Building,
  Store,
  CalendarCheck,
  Tag,
  Percent,
  CreditCard as CreditCardIcon,
  Smartphone,
  Mail as MailIcon,
  FileText,
  FileCheck,
  FileDigit,
  FileSearch,
  FileClock,
  FileBarChart2,
  FileSpreadsheet,
  FileKey,
  FileLock,
  FileWarning,
  FileX,
  FileUp,
  FileDown,
  FileInput,
  FileOutput,
  FileHeart,
  FileImage,
  FileVideo,
  FileAudio,
  FileArchive,
  FileCode,
  FileJson,
  FileText as FileTextIcon,
  File as FileIcon,
  FileSpreadsheet as FileSpreadsheetIcon,
  FileDigit as FileDigitIcon,
  FileSearch as FileSearchIcon,
  FileClock as FileClockIcon,
  FileBarChart2 as FileBarChart2Icon,
  FileSpreadsheet as FileSpreadsheetIcon2,
  FileKey as FileKeyIcon,
  FileLock as FileLockIcon,
  FileWarning as FileWarningIcon,
  FileX as FileXIcon,
  FileUp as FileUpIcon,
  FileDown as FileDownIcon,
  FileInput as FileInputIcon,
  FileOutput as FileOutputIcon,
  FileHeart as FileHeartIcon,
  FileImage as FileImageIcon,
  FileVideo as FileVideoIcon,
  FileAudio as FileAudioIcon,
  FileArchive as FileArchiveIcon,
  FileCode as FileCodeIcon,
  FileJson as FileJsonIcon
} from 'lucide-react';
import { format } from 'date-fns';
import { cn } from '@/lib/utils';
import RoleSelection from './RoleSelection';

// Types
type Role = 'member' | 'coach' | 'ground' | 'vendor' | 'event_organizer';

export interface RoleDetails {
  id: Role;
  title: string;
  description: string;
  icon: React.ComponentType<{ className?: string }>;
  features: string[];
  monthlyPrice: number;
  trialDays: number;
}

// Role configuration
const ROLES: RoleDetails[] = [
  {
    id: 'member',
    title: 'Member',
    description: 'Join as a fitness enthusiast looking for coaches and facilities',
    icon: User,
    features: [
      'Access to all coaches and facilities',
      'Book sessions and classes',
      'Track your fitness journey',
      'Join community events'
    ],
    monthlyPrice: 5,
    trialDays: 7
  },
  {
    id: 'coach',
    title: 'Coach',
    description: 'Join as a fitness professional to offer training services',
    icon: Dumbbell,
    features: [
      'Create your coach profile',
      'Manage clients and bookings',
      'Set your own schedule',
      'Get paid directly'
    ],
    monthlyPrice: 40,
    trialDays: 7
  },
  {
    id: 'ground',
    title: 'Ground/Facility',
    description: 'List your fitness facility or studio',
    icon: Building2,
    features: [
      'Showcase your facility',
      'Manage bookings and members',
      'Promote special offers',
      'Increase visibility'
    ],
    monthlyPrice: 60,
    trialDays: 7
  },
  {
    id: 'vendor',
    title: 'Brand Seller',
    description: 'Sell fitness equipment and supplements',
    icon: ShoppingBag,
    features: [
      'List your products',
      'Reach fitness enthusiasts',
      'Manage inventory',
      'Run promotions'
    ],
    monthlyPrice: 50,
    trialDays: 7
  },
  {
    id: 'event_organizer',
    title: 'Event Organizer',
    description: 'Organize fitness events and bootcamps',
    icon: CalendarIcon,
    features: [
      'Create and promote events',
      'Manage registrations',
      'Sell tickets',
      'Connect with attendees'
    ],
    monthlyPrice: 70,
    trialDays: 7
  }
];

// Form schemas
// Common options for forms
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

const BUSINESS_TYPES = [
  'Sole Proprietorship',
  'Partnership',
  'LLC',
  'Corporation',
  'Non-Profit',
  'Other',
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

// Base user schema type
type BaseUser = {
  email: string;
  password: string;
  confirmPassword: string;
  firstName: string;
  lastName: string;
  phone: string;
  dateOfBirth: Date;
  acceptTerms: boolean;
  role: string;
};

// Extend the base schema with additional fields
const createExtendedSchema = <T extends z.ZodRawShape>(shape: T) => {
  return z.object({
    email: z.string().email('Please enter a valid email'),
    password: z.string()
      .min(8, 'Password must be at least 8 characters')
      .regex(/[A-Z]/, 'Password must contain at least one uppercase letter')
      .regex(/[a-z]/, 'Password must contain at least one lowercase letter')
      .regex(/[0-9]/, 'Password must contain at least one number'),
    confirmPassword: z.string(),
    firstName: z.string().min(1, 'First name is required'),
    lastName: z.string().min(1, 'Last name is required'),
    phone: z.string().min(10, 'Please enter a valid phone number'),
    dateOfBirth: z.date({
      required_error: 'Please select a date',
      invalid_type_error: "That's not a date!",
    }),
    acceptTerms: z.boolean().refine((val) => val === true, {
      message: 'You must accept the terms and conditions',
    }),
    role: z.string().min(1, 'Please select a role'),
    ...shape,
  }).refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ['confirmPassword'],
  });
};

type BrandSeller = BaseUser & {
  brandName: string;
  website: string;
  productCategories: string[];
  description: string;
  businessAddress: string;
  taxId: string;
};

type SpaceOwner = BaseUser & {
  spaceName: string;
  spaceType: string;
  description: string;
  address: string;
  capacity: number;
};

const baseUserSchema = createExtendedSchema({});

// Member specific schema
type Member = BaseUser & {
  interests: string[];
  fitnessLevel: string;
  emergencyContact: {
    name: string;
    phone: string;
    relationship: string;
  };
  hasMedicalCondition: boolean;
  medicalConditions?: string;
  fitnessGoals: string[];
  preferredActivities: string[];
  preferredWorkoutTime: string;
  preferredWorkoutDays: string[];
  preferredWorkoutLocation: string;
  preferredWorkoutDuration: string;
  preferredWorkoutIntensity: string;
  preferredWorkoutType: string;
  preferredWorkoutEquipment: string[];
  preferredWorkoutPartner: string;
  preferredWorkoutMusic: string;
  preferredWorkoutTemperature: string;
  preferredWorkoutHumidity: string;
  preferredWorkoutLighting: string;
  preferredWorkoutNoise: string;
  preferredWorkoutCrowd: string;
  preferredWorkoutCleanliness: string;
  preferredWorkoutStaff: string;
  preferredWorkoutAmenities: string[];
  preferredWorkoutPrice: string;
  preferredWorkoutDistance: string;
  preferredWorkoutTimeOfDay: string;
  preferredWorkoutDayOfWeek: string;
  preferredWorkoutFrequency: string;
};

const memberSchema = z.object({
  ...baseUserSchema.shape,
  interests: z.array(z.string()).min(1, 'Please select at least one interest'),
  fitnessLevel: z.string().min(1, 'Please select your fitness level'),
  emergencyContact: z.object({
    name: z.string().min(1, 'Emergency contact name is required'),
    phone: z.string().min(10, 'Please enter a valid phone number'),
    relationship: z.string().min(1, 'Please specify your relationship'),
  }),
  hasMedicalCondition: z.boolean().default(false),
  medicalConditions: z.string().optional(),
  fitnessGoals: z.array(z.string()).min(1, 'Please select at least one fitness goal'),
  preferredActivities: z.array(z.string()).min(1, 'Please select at least one preferred activity'),
  preferredWorkoutTime: z.string().min(1, 'Please select your preferred workout time'),
  preferredWorkoutDays: z.array(z.string()).min(1, 'Please select at least one preferred workout day'),
  preferredWorkoutLocation: z.string().min(1, 'Please select your preferred workout location'),
  preferredWorkoutDuration: z.string().min(1, 'Please select your preferred workout duration'),
  preferredWorkoutIntensity: z.string().min(1, 'Please select your preferred workout intensity'),
  preferredWorkoutType: z.string().min(1, 'Please select your preferred workout type'),
  preferredWorkoutEquipment: z.array(z.string()).min(1, 'Please select at least one preferred workout equipment'),
  preferredWorkoutPartner: z.string().min(1, 'Please select your preferred workout partner'),
  preferredWorkoutMusic: z.string().min(1, 'Please select your preferred workout music'),
  preferredWorkoutTemperature: z.string().min(1, 'Please select your preferred workout temperature'),
  preferredWorkoutHumidity: z.string().min(1, 'Please select your preferred workout humidity'),
  preferredWorkoutLighting: z.string().min(1, 'Please select your preferred workout lighting'),
  preferredWorkoutNoise: z.string().min(1, 'Please select your preferred workout noise level'),
  preferredWorkoutCrowd: z.string().min(1, 'Please select your preferred workout crowd level'),
  preferredWorkoutCleanliness: z.string().min(1, 'Please select your preferred workout cleanliness level'),
  preferredWorkoutStaff: z.string().min(1, 'Please select your preferred workout staff level'),
  preferredWorkoutAmenities: z.array(z.string()).min(1, 'Please select at least one preferred workout amenity'),
  preferredWorkoutPrice: z.string().min(1, 'Please select your preferred workout price range'),
  preferredWorkoutDistance: z.string().min(1, 'Please select your preferred workout distance'),
  preferredWorkoutTimeOfDay: z.string().min(1, 'Please select your preferred workout time of day'),
  preferredWorkoutDayOfWeek: z.string().min(1, 'Please select your preferred workout day of week'),
  preferredWorkoutFrequency: z.string().min(1, 'Please select your preferred workout frequency'),
}) as z.ZodType<Member>;

// Coach schema
type Coach = BaseUser & {
  bio: string;
  specialties: string[];
  certifications: string;
  yearsOfExperience: number;
  hourlyRate: number;
  website: string;
  instagram: string;
  facebook: string;
  twitter: string;
};

const coachSchema = z.object({
  ...baseUserSchema.shape,
  bio: z.string().min(50, 'Bio must be at least 50 characters'),
  specialties: z.array(z.string()).min(1, 'Please select at least one specialty'),
  certifications: z.string().min(1, 'Please list your certifications'),
  yearsOfExperience: z.number().min(0, 'Please enter a valid number'),
  hourlyRate: z.number().min(0, 'Please enter a valid rate'),
  website: z.string().url('Please enter a valid URL').or(z.literal('')),
  instagram: z.string().optional(),
  facebook: z.string().optional(),
  twitter: z.string().optional(),
}) as z.ZodType<Coach>;

// Facility schema
type Facility = BaseUser & {
  facilityName: string;
  facilityType: string;
  description: string;
  address: string;
  city: string;
  state: string;
  zipCode: string;
  country: string;
  amenities: string[];
  businessHours: {
    monday: {
      open: string;
      close: string;
    };
    tuesday: {
      open: string;
      close: string;
    };
    wednesday: {
      open: string;
      close: string;
    };
    thursday: {
      open: string;
      close: string;
    };
    friday: {
      open: string;
      close: string;
    };
    saturday: {
      open: string;
      close: string;
    };
    sunday: {
      open: string;
      close: string;
    };
  };
  capacity: number;
  website: string;
};

const facilitySchema = z.object({
  ...baseUserSchema.shape,
  facilityName: z.string().min(2, 'Facility name is required'),
  facilityType: z.string().min(1, 'Please select a facility type'),
  description: z.string().min(50, 'Description must be at least 50 characters'),
  address: z.string().min(1, 'Address is required'),
  city: z.string().min(1, 'City is required'),
  state: z.string().min(1, 'State is required'),
  zipCode: z.string().min(1, 'ZIP code is required'),
  country: z.string().min(1, 'Country is required'),
  amenities: z.array(z.string()).min(1, 'Please select at least one amenity'),
  businessHours: z.object({
    monday: z.object({ open: z.string(), close: z.string() }),
    tuesday: z.object({ open: z.string(), close: z.string() }),
    wednesday: z.object({ open: z.string(), close: z.string() }),
    thursday: z.object({ open: z.string(), close: z.string() }),
    friday: z.object({ open: z.string(), close: z.string() }),
    saturday: z.object({ open: z.string(), close: z.string() }),
    sunday: z.object({ open: z.string(), close: z.string() }),
  }),
  capacity: z.number().min(1, 'Capacity must be at least 1'),
  website: z.string().url('Please enter a valid URL').or(z.literal('')),
}) as z.ZodType<Facility>;

// Event Organizer schema
type EventOrganizer = BaseUser & {
  organizationName: string;
  organizationType: string;
  description: string;
  eventTypes: string[];
  website: string;
  instagram: string;
  facebook: string;
  twitter: string;
  taxId: string;
  businessAddress: string;
  businessCity: string;
  businessState: string;
  businessZipCode: string;
  businessCountry: string;
  yearsOfExperience: number;
  portfolio: string;
};

const eventOrganizerSchema = createExtendedSchema({
  organizationName: z.string().min(2, 'Organization name is required'),
  organizationType: z.string().min(1, 'Please select an organization type'),
  description: z.string().min(50, 'Description must be at least 50 characters'),
  eventTypes: z.array(z.string()).min(1, 'Please select at least one event type'),
  website: z.string().url('Please enter a valid URL').or(z.literal('')),
  instagram: z.string().optional(),
  facebook: z.string().optional(),
  twitter: z.string().optional(),
  taxId: z.string().min(1, 'Tax ID is required'),
  businessAddress: z.string().min(1, 'Business address is required'),
  businessCity: z.string().min(1, 'City is required'),
  businessState: z.string().min(1, 'State is required'),
  businessZipCode: z.string().min(1, 'ZIP code is required'),
  businessCountry: z.string().min(1, 'Country is required'),
  yearsOfExperience: z.number().min(0, 'Please enter a valid number'),
  portfolio: z.string().url('Please enter a valid URL').or(z.literal('')),
});

// Event Curator schema
type EventCurator = BaseUser & {
  companyName: string;
  website: string;
  pastEvents: Array<{
    name: string;
    date: string;
    attendees: number;
  }>;
};

const eventCuratorSchema = z.object({
  ...baseUserSchema.shape,
  companyName: z.string().min(1, 'Company name is required'),
  website: z.string().url('Invalid URL').or(z.literal('')),
  pastEvents: z.array(z.object({
    name: z.string().min(1, 'Event name is required'),
    date: z.string().min(1, 'Event date is required'),
    attendees: z.number().min(0, 'Attendees must be 0 or more'),
  })).optional(),
});

// Union of all schemas
type FormData = BaseUser & 
  Partial<Member> & 
  Partial<Coach> & 
  Partial<Facility> & 
  Partial<BrandSeller> & 
  Partial<EventOrganizer> & 
  Partial<EventCurator>;

const Signup: React.FC = () => {
  const navigate = useNavigate();
  
  // Form state
  const [currentStep, setCurrentStep] = useState(0);
  const [selectedRole, setSelectedRole] = useState<Role | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [pastEvents, setPastEvents] = useState<Array<{ name: string; date: string; attendees: number }>>([]);

  // State for role-specific selections
  const [selectedGoals, setSelectedGoals] = useState<string[]>([]);
  const [selectedSpecialties, setSelectedSpecialties] = useState<string[]>([]);
  const [selectedAmenities, setSelectedAmenities] = useState<string[]>([]);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [hasMedicalCondition, setHasMedicalCondition] = useState(false);
  
  // Handle past events
  const handleAddPastEvent = useCallback(() => {
    setPastEvents(prev => [...prev, { name: '', date: '', attendees: 0 }]);
  }, []);

  const handlePastEventChange = useCallback((index: number, field: string, value: string | number) => {
    setPastEvents(prev => {
      const updated = [...prev];
      updated[index] = { ...updated[index], [field]: value };
      return updated;
    });
  }, []);

  const handleRemovePastEvent = useCallback((index: number) => {
    setPastEvents(prev => prev.filter((_, i) => i !== index));
  }, []);
  // Initialize form with react-hook-form
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    trigger,
    watch,
    control,
  } = useForm<FormData>({
    resolver: zodResolver(z.object({
      email: z.string().email('Please enter a valid email'),
      password: z.string().min(8, 'Password must be at least 8 characters'),
      confirmPassword: z.string(),
      firstName: z.string().min(1, 'First name is required'),
      lastName: z.string().min(1, 'Last name is required'),
      role: z.string().min(1, 'Please select a role'),
      acceptTerms: z.boolean().refine((val) => val === true, {
        message: 'You must accept the terms and conditions',
      }),
    }).refine((data) => data.password === data.confirmPassword, {
      message: "Passwords don't match",
      path: ['confirmPassword'],
    })),
    defaultValues: {
      email: '',
      password: '',
      confirmPassword: '',
      firstName: '',
      lastName: '',
      role: '',
      acceptTerms: false,
    },
  });
  
  // Date of birth state for calendar
  const [date, setDate] = useState<Date | undefined>(undefined);
  // Sync with react-hook-form
  useEffect(() => {
    if (date) setValue('dateOfBirth', date);
  }, [date, setValue]);
  
  // Watch form values
  const watchMedicalCondition = watch('hasMedicalCondition', false);
  const watchFitnessGoals = watch('fitnessGoals', []);
  const watchSpecialties = watch('specialties', []);
  const watchAmenities = watch('amenities', []);
  const watchProductCategories = watch('productCategories', []);
  const watchEventTypes = watch('eventTypes', []);
  
  // Handle role selection
  const handleRoleSelect = (role: Role) => {
    setSelectedRole(role);
    setValue('role', role, { shouldValidate: true });
    setCurrentStep(2); // Immediately advance to account info step
  };

  // Handle form submission
  const onSubmit = async (formData: FormData) => {
    try {
      setIsLoading(true);
      
      // Prepare the data to be submitted
      const submissionData = {
        ...formData,
        // Add any additional processing here
      };
      
      // If the role is eventCurator, include pastEvents
      if (formData.role === 'eventCurator') {
        (submissionData as any).pastEvents = pastEvents;
      }
      
      console.log('Form submitted:', formData);
      // Add your form submission logic here
      
      // Navigate to onboarding after signup
      navigate('/onboarding');
    } catch (error) {
      console.error('Error submitting form:', error);
    } finally {
      setIsLoading(false);
    }
  };

  // Handle go back
  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    } else {
      navigate(-1);
    }
  };

  // Render success step
  const renderSuccessStep = () => (
    <div className="max-w-3xl mx-auto bg-white rounded-xl shadow-md overflow-hidden">
      <div className="p-8 text-center">
        <div className="mx-auto flex items-center justify-center h-24 w-24 rounded-full bg-green-100">
          <CheckCircle2 className="h-12 w-12 text-green-600" />
        </div>
        <h2 className="mt-6 text-2xl font-bold text-gray-900">Account Created Successfully!</h2>
        <p className="mt-2 text-gray-600">
          Your {selectedRole} account has been created. Welcome to VibeCore!
        </p>
        <div className="mt-8">
          <Button 
            onClick={() => navigate('/dashboard')} 
            className="px-8 py-3 text-lg"
          >
            Go to Dashboard
          </Button>
        </div>
      </div>
    </div>
  );
  
  // Render current step based on currentStep state
  const renderCurrentStep = () => {
    switch (currentStep) {
      case 1:
        return renderRoleSelection();
      case 2:
        return renderAccountForm();
      case 3:
        return renderPaymentStep();
      case 4:
        return renderSuccessStep();
      default:
        return renderRoleSelection();
    }
  };
  
  // Render payment step
  const renderPaymentStep = () => {
    if (!selectedRole) return null;
    
    const roleDetails = ROLES.find(r => r.id === selectedRole);
    
    return (
      <div className="max-w-3xl mx-auto bg-white rounded-xl shadow-md overflow-hidden">
        <div className="p-8">
          <div className="flex items-center mb-8">
            <Button 
              variant="ghost" 
              size="icon" 
              onClick={handleBack}
              className="mr-4"
            >
              <ArrowLeft className="h-5 w-5" />
            </Button>
            <div>
              <h2 className="text-2xl font-bold text-gray-900">Choose Your Plan</h2>
              <p className="text-gray-500">Select a plan that works best for you</p>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Monthly Plan */}
            <div className="border rounded-lg p-6 hover:border-red-500 transition-colors">
              <h3 className="text-lg font-semibold mb-2">Monthly</h3>
              <p className="text-3xl font-bold mb-4">${roleDetails?.monthlyPrice}<span className="text-sm font-normal text-gray-500">/month</span></p>
              <ul className="space-y-2 mb-6">
                {roleDetails?.features.map((feature, i) => (
                  <li key={i} className="flex items-center">
                    <Check className="h-4 w-4 text-green-500 mr-2" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
              <Button 
                className="w-full" 
                variant="outline"
                onClick={() => setValue('plan', 'monthly')}
              >
                Select Monthly
              </Button>
            </div>
            
            {/* 6-Month Plan */}
            <div className="border-2 border-red-500 rounded-lg p-6 relative">
              <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-red-500 text-white text-xs font-semibold px-3 py-1 rounded-full">
                POPULAR
              </div>
              <h3 className="text-lg font-semibold mb-2">6 Months</h3>
              <p className="text-3xl font-bold mb-1">${Math.round(roleDetails?.monthlyPrice * 5 * 0.83)}<span className="text-sm font-normal text-gray-500">/month</span></p>
              <p className="text-sm text-gray-500 mb-4">Billed as ${Math.round(roleDetails?.monthlyPrice * 5)} every 6 months</p>
              <p className="text-sm text-green-600 font-medium mb-4">1 month free!</p>
              <ul className="space-y-2 mb-6">
                {roleDetails?.features.map((feature, i) => (
                  <li key={i} className="flex items-center">
                    <Check className="h-4 w-4 text-green-500 mr-2" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
              <Button 
                className="w-full bg-red-600 hover:bg-red-700"
                onClick={() => setValue('plan', '6months')}
              >
                Select 6-Month Plan
              </Button>
            </div>
            
            {/* 12-Month Plan */}
            <div className="border rounded-lg p-6 hover:border-red-500 transition-colors">
              <h3 className="text-lg font-semibold mb-2">12 Months</h3>
              <p className="text-3xl font-bold mb-1">${Math.round(roleDetails?.monthlyPrice * 10 * 0.83)}<span className="text-sm font-normal text-gray-500">/month</span></p>
              <p className="text-sm text-gray-500 mb-4">Billed as ${Math.round(roleDetails?.monthlyPrice * 10)} every 12 months</p>
              <p className="text-sm text-green-600 font-medium mb-4">2 months free!</p>
              <ul className="space-y-2 mb-6">
                {roleDetails?.features.map((feature, i) => (
                  <li key={i} className="flex items-center">
                    <Check className="h-4 w-4 text-green-500 mr-2" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
              <Button 
                className="w-full"
                variant="outline"
                onClick={() => setValue('plan', '12months')}
              >
                Select Annual Plan
              </Button>
            </div>
          </div>
          
          {/* Trial Option */}
          <div className="mt-8 pt-6 border-t">
            <div className="flex items-start">
              <div className="flex items-center h-5">
                <Checkbox 
                  id="startTrial" 
                  onCheckedChange={(checked) => setValue('startTrial', !!checked)}
                  className="h-4 w-4 rounded"
                />
              </div>
              <div className="ml-3 text-sm">
                <label htmlFor="startTrial" className="font-medium text-gray-700">
                  Start with a {roleDetails?.trialDays}-day free trial
                </label>
                <p className="text-gray-500 mt-1">
                  No credit card required. You can upgrade to a paid plan anytime during the trial.
                </p>
              </div>
            </div>
          </div>
          
          {/* Payment Method */}
          <div className="mt-8 pt-6 border-t">
            <h3 className="text-lg font-medium mb-4">Payment Method</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Button 
                type="button" 
                variant="outline"
                className="h-24 flex flex-col items-center justify-center"
                onClick={() => setValue('paymentMethod', 'mpesa')}
              >
                <img src="/mpesa-logo.png" alt="M-Pesa" className="h-6 w-6 mb-2" />
                M-Pesa
              </Button>
              <Button 
                type="button" 
                variant="outline"
                className="h-24 flex flex-col items-center justify-center"
                onClick={() => setValue('paymentMethod', 'paypal')}
              >
                <svg className="h-6 w-6 mb-2" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M7.5 2h9c.3 0 .5.2.5.5v.6c0 .3-.2.5-.5.5h-9c-.3 0-.5-.2-.5-.5v-.6c0-.3.2-.5.5-.5zM7.5 4h9c.3 0 .5.2.5.5v.6c0 .3-.2.5-.5.5h-9c-.3 0-.5-.2-.5-.5v-.6c0-.3.2-.5.5-.5zM7.5 6h9c.3 0 .5.2.5.5v.6c0 .3-.2.5-.5.5h-9c-.3 0-.5-.2-.5-.5v-.6c0-.3.2-.5.5-.5z"/>
                </svg>
                PayPal
              </Button>
              <Button 
                type="button" 
                variant="outline"
                className="h-24 flex flex-col items-center justify-center"
                onClick={() => setValue('paymentMethod', 'stripe')}
              >
                <img src="/stripe-logo.png" alt="Stripe" className="h-6 w-6 mb-2" />
                Stripe
              </Button>
            </div>
            
            {/* Card and billing address fields are deferred to onboarding/payment setup. */}
            
            {/* Terms and Conditions */}
            <div className="mt-8 pt-6 border-t">
              <div className="flex items-start">
                <div className="flex items-center h-5">
                  <Checkbox
                    id="acceptTermsPayment"
                    className={cn('h-4 w-4 rounded', errors.acceptTerms && 'border-red-500')}
                    {...register('acceptTerms')}
                    onCheckedChange={async (checked) => {
                      setValue('acceptTerms', !!checked, { shouldValidate: true });
                      const valid = await trigger();
                      if (checked && valid) {
                        setCurrentStep(currentStep + 1);
                      }
                    }}
                  />
                </div>
                <div className="ml-3 text-sm">
                  <label htmlFor="acceptTermsPayment" className="font-medium text-gray-700">
                    I agree to the{' '}
                    <a href="/terms" className="text-red-600 hover:text-red-500">
                      Terms of Service
                    </a>{' '}
                    and{' '}
                    <a href="/privacy" className="text-red-600 hover:text-red-500">
                      Privacy Policy
                    </a>
                  </label>
                  {errors.acceptTerms && (
                    <p className="mt-1 text-sm text-red-600">{errors.acceptTerms.message}</p>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };
      
      // Duplicate/stray onSubmit function removed

  // Render role selection step
  const renderRoleSelection = () => (
    <RoleSelection ROLES={ROLES} selectedRole={selectedRole} handleRoleSelect={handleRoleSelect} />
  );

  // Render date of birth field
  const renderDateOfBirth = () => (
    <div>
      <Label htmlFor="dateOfBirth">Date of Birth</Label>
      <Popover>
        <PopoverTrigger asChild>
          <Button
            id="dateOfBirth"
            variant="outline"
            className={cn(
              'w-full justify-start text-left font-normal mt-1',
              !date && 'text-muted-foreground',
              errors.dateOfBirth && 'border-red-500'
            )}
          >
            <CalendarIcon className="mr-2 h-4 w-4" />
            {date ? format(date, 'PPP') : <span>Pick a date</span>}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0" align="start">
          <Calendar
            mode="single"
            selected={date}
            onSelect={(newDate) => {
              setDate(newDate);
              setValue('dateOfBirth', newDate as Date);
            }}
            disabled={(date) =>
              date > new Date() || date < new Date('1900-01-01')
            }
            initialFocus
          />
        </PopoverContent>
      </Popover>
      {errors.dateOfBirth && (
        <p className="mt-1 text-sm text-red-600">{errors.dateOfBirth.message}</p>
      )}
    </div>
  );

  // Render fitness goals selection
  const renderFitnessGoals = () => (
    <div className="space-y-2">
      <Label>Fitness Goals</Label>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
        {FITNESS_GOALS.map((goal) => (
          <div key={goal} className="flex items-center space-x-2">
            <Checkbox
              id={`goal-${goal}`}
              checked={selectedGoals.includes(goal)}
              onCheckedChange={(checked) => {
                const newGoals = checked
                  ? [...selectedGoals, goal]
                  : selectedGoals.filter((g) => g !== goal);
                setSelectedGoals(newGoals);
                setValue('fitnessGoals', newGoals as [string, ...string[]]);
              }}
            />
            <Label htmlFor={`goal-${goal}`} className="font-normal">
              {goal}
            </Label>
          </div>
        ))}
      </div>
      {errors.fitnessGoals && (
        <p className="mt-1 text-sm text-red-600">{errors.fitnessGoals.message}</p>
      )}
    </div>
  );

  // Render experience level selection
  const renderExperienceLevel = () => (
    <div className="space-y-2">
      <Label>Experience Level</Label>
      <Select
        onValueChange={(value) => setValue('experienceLevel', value)}
        defaultValue={watch('experienceLevel')}
      >
        <SelectTrigger className={cn('w-full', errors.experienceLevel && 'border-red-500')}>
          <SelectValue placeholder="Select your experience level" />
        </SelectTrigger>
        <SelectContent>
          {EXPERIENCE_LEVELS.map((level) => (
            <SelectItem key={level} value={level}>
              {level}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      {errors.experienceLevel && (
        <p className="mt-1 text-sm text-red-600">{errors.experienceLevel.message}</p>
      )}
    </div>
  );

  // Render medical information section
  const renderMedicalInfo = () => (
    <div className="space-y-4">
      <div className="flex items-center space-x-2">
        <Checkbox
          id="hasMedicalCondition"
          checked={hasMedicalCondition}
          onCheckedChange={(checked) => {
            setHasMedicalCondition(!!checked);
            setValue('hasMedicalCondition', !!checked);
          }}
        />
        <Label htmlFor="hasMedicalCondition" className="font-medium">
          I have a medical condition or injury that may affect my ability to exercise
        </Label>
      </div>
      
      {hasMedicalCondition && (
        <div className="pl-6 space-y-2">
          <Label htmlFor="medicalCondition">Please provide details about your condition</Label>
          <Textarea
            id="medicalCondition"
            placeholder="Describe your medical condition or injury..."
            className={cn('mt-1', errors.medicalCondition && 'border-red-500')}
            {...register('medicalCondition')}
          />
          {errors.medicalCondition && (
            <p className="mt-1 text-sm text-red-600">{errors.medicalCondition.message}</p>
          )}
        </div>
      )}
    </div>
  );

  // Render emergency contact information
  const renderEmergencyContact = () => (
    <div className="space-y-4 border-t border-gray-200 pt-6">
      <h3 className="text-lg font-medium text-gray-900">Emergency Contact</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <Label htmlFor="emergencyContactName">Full Name</Label>
          <Input
            id="emergencyContactName"
            placeholder="Emergency contact full name"
            className={cn('mt-1', errors.emergencyContactName && 'border-red-500')}
            {...register('emergencyContactName')}
          />
          {errors.emergencyContactName && (
            <p className="mt-1 text-sm text-red-600">{errors.emergencyContactName.message}</p>
          )}
        </div>
        <div>
          <Label htmlFor="emergencyContactPhone">Phone Number</Label>
          <div className="relative mt-1">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Phone className="h-5 w-5 text-gray-400" />
            </div>
            <Input
              id="emergencyContactPhone"
              type="tel"
              placeholder="+1 (555) 000-0000"
              className={cn('pl-10', errors.emergencyContactPhone && 'border-red-500')}
              {...register('emergencyContactPhone')}
            />
          </div>
          {errors.emergencyContactPhone && (
            <p className="mt-1 text-sm text-red-600">{errors.emergencyContactPhone.message}</p>
          )}
        </div>
        <div>
          <Label htmlFor="emergencyContactRelation">Relationship</Label>
          <Input
            id="emergencyContactRelation"
            placeholder="e.g., Spouse, Parent, Sibling, Friend"
            className={cn('mt-1', errors.emergencyContactRelation && 'border-red-500')}
            {...register('emergencyContactRelation')}
          />
          {errors.emergencyContactRelation && (
            <p className="mt-1 text-sm text-red-600">{errors.emergencyContactRelation.message}</p>
          )}
        </div>
      </div>
    </div>
  );

  // Render account information form
  const renderAccountForm = () => {
    if (!selectedRole) return null;
    
    return (
      <div className="max-w-3xl mx-auto bg-white rounded-xl shadow-md overflow-hidden">
        <div className="p-8">
          <div className="flex items-center mb-8">
            <Button 
              variant="ghost" 
              size="icon" 
              onClick={handleBack}
              className="mr-4"
            >
              <ArrowLeft className="h-5 w-5" />
            </Button>
            <div>
              <h2 className="text-2xl font-bold text-gray-900">Create Your Account</h2>
              <p className="text-gray-600">Fill in your details to get started as a {ROLES.find(r => r.id === selectedRole)?.title}</p>
            </div>
          </div>
          
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            {/* Basic Information Section */}
            <div className="border-b border-gray-200 pb-6">
              <h3 className="text-lg font-medium text-gray-900 mb-4">Basic Information</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <Label htmlFor="firstName">First Name</Label>
                  <Input
                    id="firstName"
                    placeholder="John"
                    className={cn('mt-1', errors.firstName && 'border-red-500')}
                    {...register('firstName')}
                  />
                  {errors.firstName && (
                    <p className="mt-1 text-sm text-red-600">{errors.firstName.message}</p>
                  )}
                </div>
                <div>
                  <Label htmlFor="lastName">Last Name</Label>
                  <Input
                    id="lastName"
                    placeholder="Doe"
                    className={cn('mt-1', errors.lastName && 'border-red-500')}
                    {...register('lastName')}
                  />
                  {errors.lastName && (
                    <p className="mt-1 text-sm text-red-600">{errors.lastName.message}</p>
                  )}
                </div>
                <div>
                  <Label htmlFor="email">Email</Label>
                  <div className="relative mt-1">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Mail className="h-5 w-5 text-gray-400" />
                    </div>
                    <Input
                      id="email"
                      type="email"
                      placeholder="you@example.com"
                      className={cn('pl-10', errors.email && 'border-red-500')}
                      {...register('email')}
                    />
                  </div>
                  {errors.email && (
                    <p className="mt-1 text-sm text-red-600">{errors.email.message}</p>
                  )}
                </div>
                <div>
                  <Label htmlFor="phone">Phone Number</Label>
                  <div className="relative mt-1">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Phone className="h-5 w-5 text-gray-400" />
                    </div>
                    <Input
                      id="phone"
                      type="tel"
                      placeholder="+1 (555) 000-0000"
                      className={cn('pl-10', errors.phone && 'border-red-500')}
                      {...register('phone')}
                    />
                  </div>
                  {errors.phone && (
                    <p className="mt-1 text-sm text-red-600">{errors.phone.message}</p>
                  )}
                </div>
                {currentStep > 1 && renderDateOfBirth()}
                <div>
                  <Label htmlFor="password">Password</Label>
                  <div className="relative mt-1">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Lock className="h-5 w-5 text-gray-400" />
                    </div>
                    <Input
                      id="password"
                      type={showPassword ? 'text' : 'password'}
                      placeholder="••••••••"
                      className={cn('pl-10 pr-10', errors.password && 'border-red-500')}
                      {...register('password')}
                    />
                    <button
                      type="button"
                      className="absolute inset-y-0 right-0 pr-3 flex items-center"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? (
                        <EyeOff className="h-5 w-5 text-gray-400 hover:text-gray-500" />
                      ) : (
                        <Eye className="h-5 w-5 text-gray-400 hover:text-gray-500" />
                      )}
                    </button>
                  </div>
                  {errors.password && (
                    <p className="mt-1 text-sm text-red-600">{errors.password.message}</p>
                  )}
                </div>
                <div>
                  <Label htmlFor="confirmPassword">Confirm Password</Label>
                  <div className="relative mt-1">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Lock className="h-5 w-5 text-gray-400" />
                    </div>
                    <Input
                      id="confirmPassword"
                      type={showConfirmPassword ? 'text' : 'password'}
                      placeholder="••••••••"
                      className={cn('pl-10 pr-10', errors.confirmPassword && 'border-red-500')}
                      {...register('confirmPassword')}
                    />
                    <button
                      type="button"
                      className="absolute inset-y-0 right-0 pr-3 flex items-center"
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    >
                      {showConfirmPassword ? (
                        <EyeOff className="h-5 w-5 text-gray-400 hover:text-gray-500" />
                      ) : (
                        <Eye className="h-5 w-5 text-gray-400 hover:text-gray-500" />
                      )}
                    </button>
                  </div>
                  {errors.confirmPassword && (
                    <p className="mt-1 text-sm text-red-600">{errors.confirmPassword.message}</p>
                  )}
                </div>
              </div>
            </div>

            {/* Role-Specific Fields */}
            {/* Role-Specific Fields: All member fitness and emergency contact info is now deferred to onboarding. */}

            {/* Role-Specific Fields: All coach info is now deferred to onboarding. */}

            {/* Role-Specific Fields: All facility/business details are now deferred to onboarding. */}

            {/* Role-Specific Fields: All vendor/brand info is now deferred to onboarding. */}

            {/* Role-Specific Fields: All event organizer info is now deferred to onboarding. */}

            {/* Terms and Conditions */}
            <div className="pt-2">
              <div className="flex items-start">
                <div className="flex items-center h-5">
                  <Checkbox
                    id="acceptTerms"
                    className={cn('h-4 w-4', errors.acceptTerms && 'border-red-500')}
                    {...register('acceptTerms')}
                  />
                </div>
                <div className="ml-3 text-sm">
                  <label htmlFor="acceptTerms" className="font-medium text-gray-700">
                    I agree to the{' '}
                    <a href="/terms" className="text-red-600 hover:text-red-500">
                      Terms of Service
                    </a>{' '}
                    and{' '}
                    <a href="/privacy" className="text-red-600 hover:text-red-500">
                      Privacy Policy
                    </a>
                  </label>
                  {errors.acceptTerms && (
                    <p className="mt-1 text-sm text-red-600">{errors.acceptTerms.message}</p>
                  )}
                </div>
              </div>
            </div>

            <div className="pt-4">
              <Button 
                type="submit" 
                size="lg" 
                className="w-full py-6 text-lg"
                disabled={isLoading}
              >
                {isLoading ? (
                  <>
                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Creating Account...
                  </>
                ) : (
                  'Create Account'
                )}
              </Button>
            </div>
          </form>
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Progress Indicator */}
        {currentStep < 4 && (
          <div className="max-w-3xl mx-auto mb-12">
            <div className="flex justify-between items-center mb-2">
              {[1, 2, 3].map((step) => (
                <div 
                  key={step} 
                  className={`flex flex-col items-center ${currentStep >= step ? 'text-red-600' : 'text-gray-400'}`}
                >
                  <div className={`flex items-center justify-center w-10 h-10 rounded-full ${currentStep >= step ? 'bg-red-100' : 'bg-gray-100'}`}>
                    {currentStep > step ? (
                      <Check className="h-5 w-5" />
                    ) : (
                      <span className="font-medium">{step}</span>
                    )}
                  </div>
                  <span className="mt-2 text-xs font-medium">
                    {step === 1 ? 'Role' : step === 2 ? 'Account' : 'Payment'}
                  </span>
                </div>
              ))}
              <div className="absolute top-1/2 left-0 right-0 h-0.5 bg-gray-200 -z-10">
                <div 
                  className="h-full bg-red-500 transition-all duration-300"
                  style={{
                    width: `${((currentStep - 1) / 2) * 100}%`,
                  }}
                />
              </div>
            </div>
          </div>
        )}
        
        {/* Current Step Content */}
        {renderCurrentStep()}
        
        {/* Navigation Buttons */}
        {currentStep < 4 && currentStep > 1 && (
          <div className="mt-12 flex justify-between max-w-3xl mx-auto">
            <Button
              type="button"
              variant="outline"
              onClick={handleBack}
              disabled={isLoading}
              className="px-8 py-6"
            >
              <ArrowLeft className="mr-2 h-5 w-5" />
              Back
            </Button>
          </div>
        )}
        
        {/* Already have an account link */}
        {currentStep === 1 && (
          <p className="mt-6 text-center text-sm text-gray-600">
            Already have an account?{' '}
            <a href="/login" className="font-medium text-red-600 hover:text-red-500">
              Sign in
            </a>
          </p>
        )}
      </div>
    </div>
  );
};

export default Signup;
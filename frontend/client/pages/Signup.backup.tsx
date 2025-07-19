import React, { useState, useCallback, ChangeEvent } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useToast } from "@/components/ui/use-toast";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { 
  User, 
  Dumbbell, 
  Store, 
  ShoppingBag, 
  Calendar, 
  ArrowRight, 
  ArrowLeft, 
  CheckCircle2,
  Check,
  Loader2,
  Heart,
  Building2
} from "lucide-react";

// Types
type BillingCycle = "monthly" | "semiannual" | "annual";
type PaymentMethod = "card" | "mpesa";

interface FormData {
  email: string;
  password: string;
  confirmPassword: string;
  fullName: string;
}

interface FormErrors {
  email?: string;
  password?: string;
  confirmPassword?: string;
  fullName?: string;
  terms?: string;
}

interface Role {
  id: string;
  title: string;
  description: string;
  icon: React.ComponentType<{ className?: string }>;
  features: string[];
}

const Signup = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  
  // Icons
  const HeartIcon = () => <Heart className="h-6 w-6" />;
  const UserIcon = () => <User className="h-6 w-6" />;
  const BuildingIcon = () => <Building2 className="h-6 w-6" />;
  const ShoppingBagIcon = () => <ShoppingBag className="h-6 w-6" />;
  const CalendarIcon = () => <Calendar className="h-6 w-6" />;

  // Define roles array with proper typing
  const roles: Role[] = [
    {
      id: "member",
      title: "Join as a Member",
      description: "Start your wellness journey, find coaches, and achieve your goals",
      icon: HeartIcon,
      features: [
        "Find and book qualified coaches",
        "Access studios and classes",
        "Track your wellness progress",
        "Join community events",
      ],
    },
    {
      id: "coach",
      title: "Join as a Coach",
      description: "Share your expertise, connect with clients, and grow your wellness business",
      icon: UserIcon,
      features: [
        "Create detailed coach profile",
        "Manage client bookings",
        "Track client progress",
        "Earn money doing what you love"
      ],
    },
    {
      id: "studio",
      title: "Join as Grounds",
      description: "List your Grounds, gym, or wellness center to attract new members",
      icon: BuildingIcon,
      features: [
        "Showcase your Grounds",
        "Manage bookings and memberships",
        "Promote classes and events",
        "Analytics and insights",
      ],
    },
    {
      id: "brand-seller",
      title: "Join as a Brand Seller",
      description: "Sell wellness gear, supplements, and accessories to our community",
      icon: ShoppingBagIcon,
      features: [
        "List your products",
        "Reach wellness enthusiasts",
        "Manage inventory and orders",
        "Promotional opportunities",
      ],
    },
    {
      id: "event-curator",
      title: "Join as an Event Curator",
      description: "Create and manage wellness events, workshops, and experiences",
      icon: CalendarIcon,
      features: [
        "Create event listings",
        "Manage bookings and attendees",
        "Promote wellness experiences",
        "Track event success",
      ]
    }
  ];

  // Form state
  const [formData, setFormData] = useState<FormData>({
    email: "",
    password: "",
    confirmPassword: "",
    fullName: "",
  });
  
  const [errors, setErrors] = useState<FormErrors>({});
  const [touched, setTouched] = useState<Record<string, boolean>>({});

  // Subscription plans configuration
  const subscriptionPlans = {
    monthly: {
      label: 'Monthly',
      priceSuffix: '/month',
      discount: 0,
      badge: ''
    },
    semiannual: {
      label: '6 Months',
      priceSuffix: '/6mo',
      discount: 1,
      badge: '1 Month Free'
    },
    annual: {
      label: 'Annual',
      priceSuffix: '/year',
      discount: 2,
      badge: 'Best Value'
    }
  };

  // Role-based pricing
  const rolePricing = {
    member: { monthly: 19.99, semiannual: 99.99, annual: 179.99 },
    coach: { monthly: 49.99, semiannual: 249.99, annual: 449.99 },
    studio: { monthly: 99.99, semiannual: 499.99, annual: 899.99 },
    'brand-seller': { monthly: 39.99, semiannual: 199.99, annual: 359.99 },
    'event-curator': { monthly: 29.99, semiannual: 149.99, annual: 269.99 }
  };

  // Signup flow state
  const [currentStep, setCurrentStep] = useState(1);
  const [selectedRole, setSelectedRole] = useState<string>("");
  const [selectedPlan, setSelectedPlan] = useState<string>("");
  const [billingCycle, setBillingCycle] = useState<BillingCycle>("monthly");
  const [useTrial, setUseTrial] = useState(false);
  const [acceptedTerms, setAcceptedTerms] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod | null>(null);
  
  // Format currency
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(amount);
  };
  
  // Handle plan selection
  const handlePlanSelect = (plan: string) => {
    setSelectedPlan(plan);
    setUseTrial(false);
  };
  
  // Handle trial selection
  const handleTrialSelect = () => {
    setUseTrial(true);
    setSelectedPlan('');
  };

  // Handle payment method selection
  const handlePaymentMethod = (method: PaymentMethod) => {
    setPaymentMethod(method);
  };

  // Navigation functions
  const nextStep = () => {
    console.log('Next step called. Current step:', currentStep, 'Can proceed:', canProceed());
    if (canProceed()) {
      setCurrentStep(prev => Math.min(prev + 1, 5));
    }
  };
  
  const prevStep = () => setCurrentStep(prev => Math.max(prev - 1, 1));

  // Check if user can proceed to next step
  const canProceed = useCallback(() => {
    console.log('canProceed called with step:', currentStep, 'selectedRole:', selectedRole);
    
    // Validate all fields when trying to proceed
    if (currentStep === 2) {
      const newErrors: FormErrors = {};
      
      // Validate all fields
      Object.keys(formData).forEach(key => {
        const error = validateField(key, formData[key as keyof FormData]);
        if (error) {
          newErrors[key as keyof FormErrors] = error;
        }
      });
      
      // Validate terms
      if (!acceptedTerms) {
        newErrors.terms = 'You must accept the terms and conditions';
      }
      
      setErrors(newErrors);
      
      // Mark all fields as touched to show errors
      const allTouched = Object.keys(formData).reduce((acc, key) => ({
        ...acc,
        [key]: true
      }), {});
      
      setTouched(prev => ({
        ...prev,
        ...allTouched
      }));
      
      return Object.keys(newErrors).length === 0;
    }
    
    switch (currentStep) {
      case 1: // Role selection
        return !!selectedRole;
      case 3: // Plan selection
        return useTrial || !!selectedPlan;
      default:
        return true;
    }
  }, [currentStep, selectedRole, formData, acceptedTerms, useTrial, selectedPlan]);

  // Validate form fields
  const validateField = (name: string, value: string) => {
    let error = '';
    
    switch (name) {
      case 'fullName':
        if (!value.trim()) error = 'Full name is required';
        else if (value.trim().length < 2) error = 'Name is too short';
        break;
        
      case 'email':
        if (!value) error = 'Email is required';
        else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
          error = 'Please enter a valid email address';
        }
        break;
        
      case 'password':
        if (!value) error = 'Password is required';
        else if (value.length < 8) error = 'Password must be at least 8 characters';
        else if (!/(?=.*[A-Z])/.test(value)) error = 'Include at least one uppercase letter';
        else if (!/(?=.*[0-9])/.test(value)) error = 'Include at least one number';
        break;
        
      case 'confirmPassword':
        if (!value) error = 'Please confirm your password';
        else if (value !== formData.password) error = 'Passwords do not match';
        break;
    }
    
    return error;
  };
  
  // Handle input changes with validation
  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Only validate if the field has been touched
    if (touched[name]) {
      const error = validateField(name, value);
      setErrors(prev => ({
        ...prev,
        [name]: error || undefined
      }));
    }
  };
  
  // Handle blur events to mark fields as touched
  const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    
    if (!touched[name]) {
      setTouched(prev => ({
        ...prev,
        [name]: true
      }));
      
      // Validate on blur
      const error = validateField(name, value);
      setErrors(prev => ({
        ...prev,
        [name]: error || undefined
      }));
    }
  };

  // Handle form submission for account info step
  const handleAccountInfoSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (canProceed()) {
      nextStep();
    } else {
      toast({
        title: "Validation Error",
        description: "Please fill in all required fields correctly.",
        variant: "destructive",
      });
    }
  };

  // Handle payment submission
  const handlePaymentSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!useTrial && !paymentMethod) {
      toast({
        title: "Payment Method Required",
        description: "Please select a payment method to continue.",
        variant: "destructive",
      });
      return;
    }
    
    if (!useTrial && !acceptedTerms) {
      toast({
        title: "Terms and Conditions",
        description: "You must accept the terms and conditions to continue.",
        variant: "destructive",
      });
      return;
    }
    
    setIsLoading(true);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      if (useTrial) {
        toast({
          title: "Trial Started",
          description: "Your 7-day free trial has started!",
        });
      } else {
        toast({
          title: "Payment Successful",
          description: `Payment processed via ${paymentMethod}.`,
        });
      }
      
      nextStep();
    } catch (error) {
      console.error('Payment error:', error);
      toast({
        title: "Payment Failed",
        description: "There was an error processing your payment. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  // Handle complete registration
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    try {
      // Basic validation
      if (!formData.email || !formData.password || !formData.fullName) {
        throw new Error('Please fill in all required fields');
      }
      
      // Save to localStorage for demo purposes
      const userData = {
        ...formData,
        role: selectedRole,
        plan: selectedPlan || 'trial',
        subscription: useTrial ? 'trial' : 'paid',
        trialEndDate: useTrial ? new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString() : null
      };
      
      localStorage.setItem('user', JSON.stringify(userData));
      
      // Show success message
      toast({
        title: "Success!",
        description: "Your account has been created successfully.",
      });
      
      // Redirect to dashboard
      navigate('/dashboard');
      
    } catch (error) {
      console.error('Error during registration:', error);
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : 'An error occurred during registration',
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  // Handle role selection
  const handleRoleSelect = (roleId: string) => {
    console.log('Role selected:', roleId);
    setSelectedRole(roleId);
    
    // If this is the first step, auto-advance to next step after selection
    if (currentStep === 1) {
      nextStep();
    }
  };

  // Render step content based on current step
  const renderStep = (): JSX.Element => {
    switch (currentStep) {
      case 4: // Payment Step
        return (
          <div className="space-y-8">
            <div className="text-center">
              <h1 className="text-2xl font-bold text-gray-900">Payment Information</h1>
              <p className="text-gray-600">Secure payment powered by Stripe</p>
            </div>

            {/* Payment Method Selection */}
            <div className="space-y-4">
              <h3 className="font-medium text-gray-900">Select Payment Method</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <button
                  type="button"
                  onClick={() => handlePaymentMethod('card')}
                  className={`p-4 border-2 rounded-lg text-left transition-all ${
                    paymentMethod === 'card'
                      ? 'border-red-500 bg-red-50'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <div className="flex items-center">
                    <div className="w-6 h-6 rounded-full border-2 border-gray-300 flex items-center justify-center mr-3 flex-shrink-0">
                      {paymentMethod === 'card' && (
                        <div className="w-3 h-3 rounded-full bg-red-600"></div>
                      )}
                    </div>
                    <div>
                      <h4 className="font-medium">Credit/Debit Card</h4>
                      <p className="text-sm text-gray-500">Pay with Visa, Mastercard, or Amex</p>
                    </div>
                    <div className="ml-auto flex space-x-2">
                      <div className="w-8 h-5 bg-gray-200 rounded-sm"></div>
                      <div className="w-8 h-5 bg-gray-200 rounded-sm"></div>
                      <div className="w-8 h-5 bg-gray-200 rounded-sm"></div>
                    </div>
                  </div>
                </button>

                <button
                  type="button"
                  onClick={() => handlePaymentMethod('mpesa')}
                  className={`p-4 border-2 rounded-lg text-left transition-all ${
                    paymentMethod === 'mpesa'
                      ? 'border-red-500 bg-red-50'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <div className="flex items-center">
                    <div className="w-6 h-6 rounded-full border-2 border-gray-300 flex items-center justify-center mr-3 flex-shrink-0">
                      {paymentMethod === 'mpesa' && (
                        <div className="w-3 h-3 rounded-full bg-red-600"></div>
                      )}
                    </div>
                    <div>
                      <h4 className="font-medium">M-Pesa</h4>
                      <p className="text-sm text-gray-500">Pay via M-Pesa mobile money</p>
                    </div>
                    <div className="ml-auto text-2xl font-bold text-green-600">M</div>
                  </div>
                </button>
              </div>

              {/* Payment Form */}
              {paymentMethod === 'card' && (
                <div className="mt-6 space-y-4">
                  <div>
                    <Label htmlFor="cardNumber">Card Number</Label>
                    <Input
                      id="cardNumber"
                      type="text"
                      placeholder="1234 5678 9012 3456"
                      className="mt-1"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="expiry">Expiry Date</Label>
                      <Input
                        id="expiry"
                        type="text"
                        placeholder="MM/YY"
                        className="mt-1"
                      />
                    </div>
                    <div>
                      <Label htmlFor="cvc">CVC</Label>
                      <Input
                        id="cvc"
                        type="text"
                        placeholder="123"
                        className="mt-1"
                      />
                    </div>
                  </div>
                  <div>
                    <Label htmlFor="name">Name on Card</Label>
                    <Input
                      id="name"
                      type="text"
                      placeholder="John Doe"
                      className="mt-1"
                    />
                  </div>
                </div>
              )}

              {paymentMethod === 'mpesa' && (
                <div className="mt-6 p-4 bg-yellow-50 rounded-lg border border-yellow-200">
                  <p className="text-sm text-yellow-700">
                    You'll be redirected to M-Pesa to complete your payment. Please have your phone ready to enter your M-Pesa PIN.
                  </p>
                </div>
              )}

              {/* Billing Summary */}
              <div className="mt-8 border-t border-gray-200 pt-6">
                <h3 className="font-medium text-gray-900 mb-4">Order Summary</h3>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Plan</span>
                    <span className="font-medium">
                      {useTrial 
                        ? '7-Day Free Trial' 
                        : `${selectedPlan === 'premium' ? 'Premium' : 'Business'} Plan (${billingCycle})`
                      }
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Billing Cycle</span>
                    <span className="font-medium">
                      {billingCycle === 'monthly' ? 'Monthly' : 
                       billingCycle === 'semiannual' ? 'Every 6 Months' : 'Annual'}
                    </span>
                  </div>
                  <div className="flex justify-between border-t border-gray-100 pt-3">
                    <span className="font-medium">Total</span>
                    <span className="font-bold">
                      {useTrial 
                        ? '$0.00' 
                        : `${formatCurrency(selectedPlan === 'business' 
                            ? rolePricing[selectedRole as keyof typeof rolePricing][billingCycle] * 1.5
                            : rolePricing[selectedRole as keyof typeof rolePricing][billingCycle]
                          )} ${billingCycle === 'monthly' ? '/month' : 
                                billingCycle === 'semiannual' ? 'every 6 months' : '/year'}`
                      }
                    </span>
                  </div>
                </div>
              </div>

              {/* Terms Acceptance */}
              <div className="mt-6 flex items-start">
                <div className="flex items-center h-5">
                  <Checkbox
                    id="payment-terms"
                    checked={acceptedTerms}
                    onCheckedChange={(checked) => setAcceptedTerms(checked as boolean)}
                    className="h-4 w-4 rounded border-gray-300 text-red-600 focus:ring-red-500"
                  />
                </div>
                <div className="ml-3 text-sm">
                  <label htmlFor="payment-terms" className="font-medium text-gray-700">
                    I agree to the{' '}
                    <a href="#" className="text-red-600 hover:text-red-700 hover:underline">
                      Terms of Service
                    </a>{' '}
                    and{' '}
                    <a href="#" className="text-red-600 hover:text-red-700 hover:underline">
                      Privacy Policy
                    </a>
                  </label>
                </div>
              </div>
            </div>
          </div>
        );

      case 5: // Completion Step
        return (
          <div className="text-center py-12">
            <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <CheckCircle2 className="w-10 h-10 text-green-600" />
            </div>
            <h1 className="text-3xl font-bold text-gray-900 mb-4">Welcome to VibeCore!</h1>
            <p className="text-gray-600 mb-8 max-w-md mx-auto">
              Your account has been successfully created. We're excited to have you on board!
            </p>
            
            <div className="bg-gray-50 p-6 rounded-lg max-w-md mx-auto text-left space-y-4">
              <div className="flex items-start">
                <div className="flex-shrink-0 h-6 w-6 text-green-600">
                  <CheckCircle2 className="h-6 w-6" />
                </div>
                <div className="ml-3">
                  <h3 className="text-sm font-medium text-gray-900">Account Created</h3>
                  <p className="text-sm text-gray-500">
                    You can now log in with your email and password.
                  </p>
                </div>
              </div>
              
              {useTrial ? (
                <div className="flex items-start">
                  <div className="flex-shrink-0 h-6 w-6 text-green-600">
                    <CheckCircle2 className="h-6 w-6" />
                  </div>
                  <div className="ml-3">
                    <h3 className="text-sm font-medium text-gray-900">7-Day Free Trial Started</h3>
                    <p className="text-sm text-gray-500">
                      Your trial ends on {new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toLocaleDateString()}. No credit card required.
                    </p>
                  </div>
                </div>
              ) : (
                <div className="flex items-start">
                  <div className="flex-shrink-0 h-6 w-6 text-green-600">
                    <CheckCircle2 className="h-6 w-6" />
                  </div>
                  <div className="ml-3">
                    <h3 className="text-sm font-medium text-gray-900">Payment Successful</h3>
                    <p className="text-sm text-gray-500">
                      Your {billingCycle} subscription is now active. Receipt sent to {formData.email}.
                    </p>
                  </div>
                </div>
              )}
              
              <div className="flex items-start">
                <div className="flex-shrink-0 h-6 w-6 text-blue-600">
                  <User className="h-5 w-5 mt-0.5" />
                </div>
                <div className="ml-3">
                  <h3 className="text-sm font-medium text-gray-900">Next Steps</h3>
                  <p className="text-sm text-gray-500">
                    Complete your profile to get the most out of VibeCore.
                  </p>
                </div>
              </div>
            </div>
            
            <div className="mt-10">
              <Link to="/dashboard">
                <Button className="bg-red-600 hover:bg-red-700 px-8">
                  Go to Dashboard
                </Button>
              </Link>
              <p className="mt-4 text-sm text-gray-500">
                Need help?{' '}
                <a href="#" className="text-red-600 hover:text-red-700 font-medium">
                  Contact Support
                </a>
              </p>
            </div>
          </div>
        );
        
      case 1:
        return (
          <div className="space-y-6">
            <div className="text-center">
              <h1 className="text-3xl font-bold text-gray-900 mb-2">Join VibeCore</h1>
              <p className="text-gray-600">Create your account to get started</p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {roles.map((role) => {
                const Icon = role.icon;
                const isSelected = selectedRole === role.id;
                
                return (
                  <Card 
                    key={role.id}
                    className={`cursor-pointer transition-all ${
                      isSelected 
                        ? 'border-2 border-red-500 ring-2 ring-red-100' 
                        : 'hover:border-red-200 hover:shadow-md'
                    }`}
                    onClick={() => handleRoleSelect(role.id)}
                  >
                    <CardHeader>
                      <div className="w-12 h-12 rounded-lg bg-red-100 flex items-center justify-center mb-4">
                        <Icon className="w-6 h-6 text-red-600" />
                      </div>
                      <CardTitle className="text-lg">{role.title}</CardTitle>
                      <p className="text-sm text-gray-600">{role.description}</p>
                    </CardHeader>
                    <CardContent>
                      <ul className="space-y-2 text-sm">
                        {role.features.slice(0, 3).map((feature, i) => (
                          <li key={i} className="flex items-start">
                            <Check className="w-4 h-4 text-green-500 mt-0.5 mr-2 flex-shrink-0" />
                            <span>{feature}</span>
                          </li>
                        ))}
                      </ul>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </div>
        );
        
      case 2:
        return (
          <div className="max-w-md mx-auto space-y-6">
            <div className="text-center">
              <h1 className="text-2xl font-bold text-gray-900">Account Information</h1>
              <p className="text-gray-600">Tell us about yourself</p>
            </div>
            
            <form onSubmit={handleAccountInfoSubmit} className="space-y-4">
              <div>
                <div className="flex justify-between items-center">
                  <Label htmlFor="fullName">Full Name</Label>
                  {touched.fullName && errors.fullName && (
                    <span className="text-sm text-red-600">{errors.fullName}</span>
                  )}
                </div>
                <Input
                  id="fullName"
                  name="fullName"
                  type="text"
                  value={formData.fullName}
                  onChange={handleInputChange}
                  onBlur={handleBlur}
                  className={touched.fullName && errors.fullName ? 'border-red-500' : ''}
                />
              </div>
              
              <div>
                <div className="flex justify-between items-center">
                  <Label htmlFor="email">Email</Label>
                  {touched.email && errors.email && (
                    <span className="text-sm text-red-600">{errors.email}</span>
                  )}
                </div>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  onBlur={handleBlur}
                  className={touched.email && errors.email ? 'border-red-500' : ''}
                />
              </div>
              
              <div>
                <div className="flex justify-between items-center">
                  <Label htmlFor="password">Password</Label>
                  {touched.password && errors.password ? (
                    <span className="text-sm text-red-600">{errors.password}</span>
                  ) : (
                    <span className="text-xs text-gray-500">At least 8 characters</span>
                  )}
                </div>
                <Input
                  id="password"
                  name="password"
                  type="password"
                  value={formData.password}
                  onChange={handleInputChange}
                  onBlur={handleBlur}
                  className={touched.password && errors.password ? 'border-red-500' : ''}
                />
                {!errors.password && formData.password && (
                  <div className="mt-1">
                    <div className="h-1 w-full bg-gray-200 rounded-full overflow-hidden">
                      <div 
                        className={`h-full ${
                          formData.password.length < 4 ? 'bg-red-500' :
                          formData.password.length < 8 ? 'bg-yellow-500' : 'bg-green-500'
                        }`}
                        style={{ width: `${Math.min(100, (formData.password.length / 8) * 100)}%` }}
                      />
                    </div>
                    <p className="text-xs text-gray-500 mt-1">
                      {formData.password.length < 4 ? 'Weak' :
                       formData.password.length < 8 ? 'Good' : 'Strong'} password
                    </p>
                  </div>
                )}
              </div>
              
              <div>
                <div className="flex justify-between items-center">
                  <Label htmlFor="confirmPassword">Confirm Password</Label>
                  {touched.confirmPassword && errors.confirmPassword && (
                    <span className="text-sm text-red-600">{errors.confirmPassword}</span>
                  )}
                </div>
                <Input
                  id="confirmPassword"
                  name="confirmPassword"
                  type="password"
                  value={formData.confirmPassword}
                  onChange={handleInputChange}
                  onBlur={handleBlur}
                  className={touched.confirmPassword && errors.confirmPassword ? 'border-red-500' : ''}
                />
              </div>
              
              <div className="space-y-1">
                <div className="flex items-start space-x-2 pt-2">
                  <Checkbox
                    id="terms"
                    checked={acceptedTerms}
                    onCheckedChange={(checked) => setAcceptedTerms(!!checked)}
                    className={errors.terms ? 'border-red-500' : ''}
                  />
                  <label
                    htmlFor="terms"
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >
                    I agree to the <a href="#" className="text-red-600 hover:underline">terms and conditions</a>
                  </label>
                </div>
                {errors.terms && (
                  <p className="text-sm text-red-600 pl-6">{errors.terms}</p>
                )}
              </div>
              
              <Button type="submit" className="w-full" disabled={!canProceed()}>
                Continue
              </Button>
            </form>
          </div>
        );
        
      case 3:
        return (
          <div className="space-y-8">
            <div className="text-center">
              <h1 className="text-2xl font-bold text-gray-900">Choose Your Plan</h1>
              <p className="text-gray-600">Select the plan that works best for you</p>
              
              {/* Billing Cycle Toggle */}
              <div className="mt-6 inline-flex items-center bg-gray-100 rounded-full p-1">
                {Object.entries(subscriptionPlans).map(([key, plan]) => (
                  <button
                    key={key}
                    type="button"
                    onClick={() => setBillingCycle(key as BillingCycle)}
                    className={`px-4 py-2 text-sm font-medium rounded-full transition-colors ${
                      billingCycle === key
                        ? 'bg-white text-red-600 shadow-md font-semibold'
                        : 'text-gray-600 hover:bg-gray-50'
                    }`}
                  >
                    {plan.label}
                    {plan.badge && (
                      <span className="ml-1.5 px-2 py-0.5 bg-red-100 text-red-700 text-xs rounded-full">
                        {plan.badge}
                      </span>
                    )}
                  </button>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {/* Free Trial Card */}
              <div 
                className={`border-2 rounded-xl p-6 cursor-pointer transition-all ${
                  useTrial 
                    ? 'border-red-500 ring-2 ring-red-100 bg-white' 
                    : 'border-gray-200 hover:border-red-200 hover:shadow-md'
                }`}
                onClick={handleTrialSelect}
              >
                <div className="text-center">
                  <h3 className="text-lg font-bold text-gray-900 mb-1">7-Day Free Trial</h3>
                  <p className="text-gray-600 text-sm mb-4">Try before you commit</p>
                  
                  <div className="mb-6">
                    <span className="text-4xl font-bold text-gray-900">$0</span>
                    <span className="text-gray-500">/7 days</span>
                  </div>
                  
                  <ul className="space-y-3 text-sm text-gray-600 text-left mb-6">
                    <li className="flex items-start">
                      <Check className="w-5 h-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                      <span>Full access to all features</span>
                    </li>
                    <li className="flex items-start">
                      <Check className="w-5 h-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                      <span>No credit card required</span>
                    </li>
                    <li className="flex items-start">
                      <Check className="w-5 h-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                      <span>Cancel anytime</span>
                    </li>
                  </ul>
                  
                  <Button 
                    variant={useTrial ? 'default' : 'outline'}
                    className={`w-full ${useTrial ? 'bg-red-600 hover:bg-red-700' : ''}`}
                  >
                    {useTrial ? 'Selected' : 'Start Free Trial'}
                  </Button>
                </div>
              </div>

              {/* Premium Plan */}
              <div 
                className={`border-2 rounded-xl p-6 cursor-pointer transition-all ${
                  selectedPlan === 'premium' && !useTrial 
                    ? 'border-red-500 ring-2 ring-red-100 bg-white' 
                    : 'border-gray-200 hover:border-red-200 hover:shadow-md'
                }`}
                onClick={() => handlePlanSelect('premium')}
              >
                <div className="text-center">
                  <div className="flex items-center justify-center mb-1">
                    <h3 className="text-lg font-bold text-gray-900">Premium</h3>
                    <span className="ml-2 px-2 py-0.5 bg-yellow-100 text-yellow-800 text-xs rounded-full">
                      MOST POPULAR
                    </span>
                  </div>
                  <p className="text-gray-600 text-sm mb-4">For professionals & businesses</p>
                  
                  <div className="mb-2">
                    <span className="text-4xl font-bold text-gray-900">
                      {formatCurrency(rolePricing[selectedRole as keyof typeof rolePricing][billingCycle])}
                    </span>
                    <span className="text-gray-500">
                      {subscriptionPlans[billingCycle].priceSuffix}
                    </span>
                  </div>
                  
                  {billingCycle !== 'monthly' && (
                    <div className="text-green-600 text-sm font-medium mb-4">
                      Save {subscriptionPlans[billingCycle].discount} month{subscriptionPlans[billingCycle].discount > 1 ? 's' : ''} free
                    </div>
                  )}
                  
                  <ul className="space-y-3 text-sm text-gray-600 text-left mb-6">
                    <li className="flex items-start">
                      <Check className="w-5 h-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                      <span>Everything in Free, plus:</span>
                    </li>
                    <li className="flex items-start">
                      <Check className="w-5 h-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                      <span>Unlimited bookings & clients</span>
                    </li>
                    <li className="flex items-start">
                      <Check className="w-5 h-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                      <span>Advanced analytics</span>
                    </li>
                    <li className="flex items-start">
                      <Check className="w-5 h-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                      <span>Priority support</span>
                    </li>
                  </ul>
                  
                  <Button 
                    variant={selectedPlan === 'premium' ? 'default' : 'outline'}
                    className={`w-full ${selectedPlan === 'premium' ? 'bg-red-600 hover:bg-red-700' : ''}`}
                  >
                    {selectedPlan === 'premium' ? 'Selected' : 'Get Premium'}
                  </Button>
                </div>
              </div>

              {/* Business Plan (for studios/organizers) */}
              {(selectedRole === 'studio' || selectedRole === 'event-curator') && (
                <div 
                  className={`border-2 rounded-xl p-6 cursor-pointer transition-all ${
                    selectedPlan === 'business' && !useTrial 
                      ? 'border-red-500 ring-2 ring-red-100 bg-white' 
                      : 'border-gray-200 hover:border-red-200 hover:shadow-md'
                  }`}
                  onClick={() => handlePlanSelect('business')}
                >
                  <div className="text-center">
                    <h3 className="text-lg font-bold text-gray-900 mb-1">Business</h3>
                    <p className="text-gray-600 text-sm mb-4">For growing businesses</p>
                    
                    <div className="mb-2">
                      <span className="text-4xl font-bold text-gray-900">
                        {formatCurrency(rolePricing[selectedRole as keyof typeof rolePricing][billingCycle] * 1.5)}
                      </span>
                      <span className="text-gray-500">
                        {subscriptionPlans[billingCycle].priceSuffix}
                      </span>
                    </div>
                    
                    <ul className="space-y-3 text-sm text-gray-600 text-left mb-6">
                      <li className="flex items-start">
                        <Check className="w-5 h-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                        <span>Everything in Premium, plus:</span>
                      </li>
                      <li className="flex items-start">
                        <Check className="w-5 h-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                        <span>Team management</span>
                      </li>
                      <li className="flex items-start">
                        <Check className="w-5 h-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                        <span>Custom branding</span>
                      </li>
                      <li className="flex items-start">
                        <Check className="w-5 h-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                        <span>Dedicated account manager</span>
                      </li>
                    </ul>
                    
                    <Button 
                      variant={selectedPlan === 'business' ? 'default' : 'outline'}
                      className={`w-full ${selectedPlan === 'business' ? 'bg-red-600 hover:bg-red-700' : ''}`}
                    >
                      {selectedPlan === 'business' ? 'Selected' : 'Get Business'}
                    </Button>
                  </div>
                </div>
              )}
            </div>
            
            <div className="pt-4 text-center">
              <p className="text-sm text-gray-500">
                {useTrial ? (
                  'You can upgrade to a paid plan anytime during or after your trial.'
                ) : selectedPlan ? (
                  `You'll be charged ${formatCurrency(rolePricing[selectedRole as keyof typeof rolePricing][billingCycle])} ${billingCycle === 'monthly' ? 'per month' : billingCycle === 'semiannual' ? 'every 6 months' : 'per year'}.`
                ) : (
                  'Select a plan or start with a free trial.'
                )}
              </p>
            </div>
          </div>
        );
        
      case 4:
        return (
          <div className="space-y-6">
            <div className="text-center">
              <h1 className="text-2xl font-bold text-gray-900">Payment Method</h1>
              <p className="text-gray-600">Choose how you'd like to pay</p>
            </div>
            
            <div className="grid gap-4">
              <div 
                className={`border-2 rounded-xl p-4 cursor-pointer transition-all ${
                  paymentMethod === 'card' 
                    ? 'border-red-500 ring-2 ring-red-100' 
                    : 'border-gray-200 hover:border-red-200'
                }`}
                onClick={() => handlePaymentMethod('card')}
              >
                <div className="flex items-center">
                  <div className="p-2 rounded-full bg-red-50 mr-3">
                    <svg className="w-6 h-6 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-medium">Credit or Debit Card</h3>
                    <p className="text-sm text-gray-500">Pay with Visa, Mastercard, or other cards</p>
                  </div>
                  {paymentMethod === 'card' && (
                    <div className="ml-auto">
                      <CheckCircle2 className="w-6 h-6 text-green-500" />
                    </div>
                  )}
                </div>
              </div>
              
              <div 
                className={`border-2 rounded-xl p-4 cursor-pointer transition-all ${
                  paymentMethod === 'mpesa' 
                    ? 'border-red-500 ring-2 ring-red-100' 
                    : 'border-gray-200 hover:border-red-200'
                }`}
                onClick={() => handlePaymentMethod('mpesa')}
              >
                <div className="flex items-center">
                  <div className="p-2 rounded-full bg-green-50 mr-3">
                    <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-medium">M-Pesa</h3>
                    <p className="text-sm text-gray-500">Pay via M-Pesa mobile money</p>
                  </div>
                  {paymentMethod === 'mpesa' && (
                    <div className="ml-auto">
                      <CheckCircle2 className="w-6 h-6 text-green-500" />
                    </div>
                  )}
                </div>
              </div>
            </div>
            
            <div className="pt-4">
              <div className="flex items-start space-x-2">
                <Checkbox
                  id="terms-payment"
                  checked={acceptedTerms}
                  onCheckedChange={(checked) => setAcceptedTerms(!!checked)}
                  className={errors.terms ? 'border-red-500 mt-1' : 'mt-1'}
                />
                <label htmlFor="terms-payment" className="text-sm text-gray-600">
                  I agree to the <a href="#" className="text-red-600 hover:underline">Terms of Service</a> and <a href="#" className="text-red-600 hover:underline">Privacy Policy</a>
                </label>
              </div>
              {errors.terms && (
                <p className="text-sm text-red-600 mt-1">{errors.terms}</p>
              )}
            </div>
            
            <div className="bg-gray-50 p-4 rounded-lg">
              <div className="flex justify-between mb-2">
                <span className="text-gray-600">Plan</span>
                <span className="font-medium">
                  {selectedPlan === 'premium' ? 'Premium' : 'Business'} {subscriptionPlans[billingCycle].label}
                </span>
              </div>
              <div className="flex justify-between text-lg font-bold">
                <span>Total</span>
                <span>
                  {formatCurrency(rolePricing[selectedRole as keyof typeof rolePricing][billingCycle])}
                  <span className="text-sm font-normal text-gray-500">
                    {subscriptionPlans[billingCycle].priceSuffix}
                  </span>
                </span>
              </div>
            </div>
          </div>
        );
        
      case 5: // Completion Step
        return (
          <div className="text-center py-12">
            <div className="mx-auto flex items-center justify-center h-24 w-24 rounded-full bg-green-100 mb-6">
              <CheckCircle2 className="h-12 w-12 text-green-600" />
            </div>
            <h1 className="text-3xl font-bold text-gray-900 mb-4">Registration Complete!</h1>
            <p className="text-gray-600 mb-8 max-w-md mx-auto">
              Thank you for joining VibeCore! Your account has been created successfully.
              {useTrial ? ' Your 7-day free trial has started.' : ''}
            </p>
            <Button 
              onClick={() => {
                // Redirect to dashboard or home page
                navigate('/dashboard');
              }}
              className="bg-red-600 hover:bg-red-700"
            >
              Go to Dashboard
            </Button>
          </div>
        );
        
      default:
        return <div className="text-center py-12">Invalid step</div>;
    }
  };

  // Navigation buttons - Only show for steps 1-4
  const renderNavigationButtons = () => {
    const canProceed = () => {
      switch (currentStep) {
        case 1:
          return !!selectedRole;
        case 2:
          return (
            formData.email && 
            formData.password && 
            formData.confirmPassword && 
            formData.fullName && 
            formData.password === formData.confirmPassword
          );
        case 3:
          return useTrial || !!selectedPlan;
        case 4:
          return !!paymentMethod && acceptedTerms;
        default:
          return true;
      }
    };

    const nextStep = () => {
      if (currentStep < 5) {
        setCurrentStep(prev => prev + 1);
      }
    };

    const prevStep = () => {
      if (currentStep > 1) {
        setCurrentStep(prev => prev - 1);
      }
    };

    console.log('Rendering navigation buttons. Current step:', currentStep, 'Can proceed:', canProceed());
    return (
      <div className="mt-8 flex justify-between">
        {currentStep > 1 && (
          <Button
            type="button"
            variant="outline"
            onClick={prevStep}
            disabled={isLoading}
            className="flex items-center gap-2"
          >
            <ArrowLeft className="w-4 h-4" />
            Back
          </Button>
        )}
        
        <div className={`${currentStep > 1 ? 'ml-auto' : 'w-full'}`}>
          <Button
            type="button"
            onClick={currentStep === 5 ? handleSubmit : nextStep}
            disabled={!canProceed() || isLoading}
            className={`flex items-center gap-2 ${
              currentStep === 3 && !useTrial && selectedPlan === 'premium' 
                ? 'bg-gradient-to-r from-red-600 to-orange-500 hover:from-red-700 hover:to-orange-600' 
                : 'bg-red-600 hover:bg-red-700'
            }`}
          >
            {isLoading ? (
              <>
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                {currentStep === 5 ? 'Processing...' : 'Loading...'}
              </>
            ) : (
              <>
                {currentStep === 3 && !useTrial ? (
                  <>
                    {selectedPlan === 'premium' ? 'Go Premium' : 'Continue'}
                    {selectedPlan === 'premium' && <ArrowRight className="w-4 h-4 ml-1" />}
                  </>
                ) : currentStep < 5 ? (
                  'Continue'
                ) : (
                  'Complete Registration'
                )}
                {(currentStep !== 3 || (currentStep === 3 && selectedPlan !== 'premium')) && (
                  <ArrowRight className="w-4 h-4 ml-2" />
                )}
              </>
            )}
          </Button>
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="w-full max-w-4xl bg-white rounded-2xl shadow-lg p-6 md:p-8">
        {/* Progress Steps */}
        {currentStep < 5 && (
          <div className="mb-8">
            <div className="flex justify-between relative">
              {[1, 2, 3, 4].map((step) => (
                <div key={step} className="flex flex-col items-center z-10">
                  <div 
                    className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-medium ${
                      currentStep >= step 
                        ? 'bg-red-600 text-white' 
                        : 'bg-gray-100 text-gray-500'
                    }`}
                  >
                    {currentStep > step ? <Check className="w-5 h-5" /> : step}
                  </div>
                  <span className="text-xs mt-2 text-gray-500">
                    {["Role", "Account", "Plan", "Payment"][step - 1]}
                  </span>
                </div>
              ))}
              <div className="absolute top-1/2 left-0 right-0 h-0.5 bg-gray-200 -z-10">
                <div 
                  className="h-full bg-red-600 transition-all duration-300"
                  style={{
                    width: `${Math.min(100, ((currentStep - 1) / 3) * 100)}%`,
                  }}
                />
              </div>
            </div>
          </div>
        )}
        
        {/* Form Content */}
        <div className={currentStep === 5 ? '' : 'mt-8'}>
          {renderStep()}
        </div>
        
        {/* Navigation Buttons - Only show for steps 1-4 */}
        {currentStep < 5 && renderNavigationButtons()}
        
        {/* Login link on first step */}
        {currentStep === 1 && (
          <div className="mt-6 text-center text-sm text-gray-600">
            Already have an account?{' '}
            <Link to="/login" className="text-red-600 hover:underline font-medium">
              Sign in
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default Signup;
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Check } from 'lucide-react';
import { RoleDetails } from './Signup';

interface RoleSelectionProps {
  ROLES: RoleDetails[];
  selectedRole: string | null;
  handleRoleSelect: (role: string) => void;
}

const RoleSelection: React.FC<RoleSelectionProps> = ({ ROLES, selectedRole, handleRoleSelect }) => (
  <>
    <div className="text-center mb-12">
      <h1 className="text-4xl font-extrabold text-gray-900 sm:text-5xl sm:tracking-tight lg:text-6xl">
        Join VibeCore
      </h1>
      <p className="mt-5 max-w-xl mx-auto text-xl text-gray-500">
        Choose your role to get started
      </p>
    </div>
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
      {ROLES.map((role) => {
        const Icon = role.icon;
        const isSelected = selectedRole === role.id;
        return (
          <Card
            key={role.id}
            className={`cursor-pointer transition-all h-full flex flex-col ${
              isSelected 
                ? 'ring-2 ring-red-500 border-red-500 shadow-lg transform -translate-y-1' 
                : 'border-gray-200 hover:border-red-200 hover:shadow-md'
            }`}
            onClick={() => handleRoleSelect(role.id)}
          >
            <CardHeader className="pb-3">
              <div className="w-12 h-12 rounded-lg bg-red-50 flex items-center justify-center mb-4">
                <Icon className="w-6 h-6 text-red-600" />
              </div>
              <CardTitle className="text-xl">{role.title}</CardTitle>
              <p className="text-gray-600 text-sm">{role.description}</p>
            </CardHeader>
            <CardContent className="flex-grow">
              <ul className="space-y-2 text-sm">
                {role.features.map((feature, i) => (
                  <li key={i} className="flex items-start">
                    <Check className="w-4 h-4 text-green-500 mt-0.5 mr-2 flex-shrink-0" />
                    <span className="text-gray-700">{feature}</span>
                  </li>
                ))}
              </ul>
              <div className="mt-4 pt-4 border-t border-gray-100">
                <p className="text-sm text-gray-500">Starting at</p>
                <p className="text-xl font-bold">
                  ${role.monthlyPrice}
                  <span className="text-sm font-normal text-gray-500">/month</span>
                </p>
              </div>
            </CardContent>
            <div className="p-4 border-t border-gray-100">
              <Button 
                variant={isSelected ? 'default' : 'outline'}
                className={`w-full ${
                  isSelected ? 'bg-red-600 hover:bg-red-700' : ''
                }`}
              >
                {isSelected ? 'Selected' : 'Select'}
              </Button>
            </div>
          </Card>
        );
      })}
    </div>
  </>
);

export default RoleSelection;

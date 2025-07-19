import React from 'react';

interface PaymentStepProps {
  role: string;
  onNext: () => void;
  onBack: () => void;
}

const PaymentStep: React.FC<PaymentStepProps> = ({ role, onNext, onBack }) => {
  // TODO: Use react-hook-form for real implementation and autosave
  return (
    <div>
      <h2 className="text-xl font-bold mb-4">Payment Setup</h2>
      <div className="mb-6">
        <label className="block font-medium mb-1">Payment Method</label>
        <select className="w-full border rounded p-2">
          <option value="">Select payment method</option>
          <option value="mpesa">M-Pesa</option>
          <option value="paypal">PayPal</option>
          <option value="stripe">Stripe</option>
        </select>
      </div>
      <div className="mb-6">
        <label className="block font-medium mb-1">Payment Details</label>
        <input className="w-full border rounded p-2 mb-2" placeholder="Card/M-Pesa/PayPal details" />
      </div>
      <div className="mb-6 text-xs text-gray-500">
        A $1 (or equivalent) hold will be placed for verification. No charge until your trial ends.
      </div>
      <div className="flex justify-between mt-8">
        <button className="btn btn-outline" onClick={onBack}>Back</button>
        <button className="btn btn-primary" onClick={onNext}>Next</button>
      </div>
    </div>
  );
};

export default PaymentStep;

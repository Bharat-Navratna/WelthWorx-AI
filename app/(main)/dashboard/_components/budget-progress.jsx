"use client";

import { useEffect, useState } from 'react';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Check, Pencil, X } from 'lucide-react';
import useFetch from '@/hooks/use-fetch';
import { updateBudget } from '@/actions/budget';
import { toast } from 'sonner';
import { Progress } from "@/components/ui/progress";

const BudgetProgress = ({ initialBudget, currentExpenses }) => {
  // Log the props to check what values are passed in
  console.log("BudgetProgress props:", { initialBudget, currentExpenses });

  const [isEditing, setIsEditing] = useState(false);
  const [newBudget, setNewBudget] = useState(initialBudget?.amount?.toString() || "");

  // Calculate the percentage used and log the computed value
  const percentUsed = initialBudget ? (currentExpenses / initialBudget.amount) * 100 : 0;
  console.log("Calculated percentUsed:", percentUsed);

  const {
    loading: isLoading,
    fn: updateBudgetFn,
    data: updatedBudget,
    error,
  } = useFetch(updateBudget);

  const handleUpdateBudget = async () => {
    console.log("handleUpdateBudget: newBudget value:", newBudget);
    const amount = parseFloat(newBudget);
    if (isNaN(amount) || amount <= 0) {
      toast.error("Please enter a valid amount");
      return;
    }
    await updateBudgetFn(amount);
  };

  useEffect(() => {
    if (updatedBudget?.success) {
      console.log("Updated budget received:", updatedBudget);
      setIsEditing(false);
      toast.success("Budget updated successfully");
    }
  }, [updatedBudget]);

  useEffect(() => {
    if (error) {
      console.error("Error updating budget:", error);
      toast.error(error.message || "Failed to update budget");
    }
  }, [error]);

  const handleCancel = () => {
    setNewBudget(initialBudget?.amount?.toString() || "");
    setIsEditing(false);
  };

  return (
    <Card className="filter drop-shadow-[0_0_10px_rgba(185,144,240,0.5)]">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <div className='flex-1'>
          <CardTitle>Monthly Budget (Default Account)</CardTitle>
          <div className='flex items-center gap-2 mt-1'>
            { isEditing ? (
              <div className='flex items-center gap-2'>
                <Input
                  type="number"
                  value={newBudget}
                  onChange={(e) => {
                    console.log("Input change, newBudget:", e.target.value);
                    setNewBudget(e.target.value);
                  }}
                  className="w-34"
                  placeholder="Enter Amount"
                  autoFocus
                  disabled={isLoading}
                />
                <Button variant="ghost" size="icon" onClick={handleUpdateBudget} disabled={isLoading}>
                  <Check className='h-4 w-4 text-green-500' />
                </Button>
                <Button variant="ghost" size="icon" onClick={handleCancel} disabled={isLoading}>
                  <X className='h-4 w-4 text-red-500' />
                </Button>
              </div>
            ) : (
              <>
                <CardDescription>
                  {initialBudget
                    ? `$${currentExpenses.toFixed(2)} of $${initialBudget.amount.toFixed(2)} spent`
                    : "No budget set"
                  }
                </CardDescription>
                <Button variant="ghost" size="icon" onClick={() => setIsEditing(true)} className="h-6 w-6">
                  <Pencil className='h-3 w-3' />
                </Button>
              </>
            )}
          </div>
        </div>
      </CardHeader>
      <CardContent>
        {initialBudget && (
          <div className='space-y-2'>
            <Progress 
              value={percentUsed}
              extraStyles={percentUsed >= 90
                ? "bg-red-500"
                : percentUsed >= 75
                ? "bg-yellow-500"
                : "bg-green-500"}
            />
            <p className='text-xs text-muted-foreground text-right'>
              {percentUsed.toFixed(1)}% used
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default BudgetProgress;

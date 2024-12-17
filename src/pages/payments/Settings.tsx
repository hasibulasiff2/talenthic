import React from "react";
import { useNavigate } from "react-router-dom";
import Header from "@/components/Header";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { PaymentMethodsList } from "@/components/payments/PaymentMethodsList";
import { BillingHistory } from "@/components/payments/BillingHistory";
import { useAuth } from "@/components/auth/AuthProvider";

const PaymentSettingsPage = () => {
  const navigate = useNavigate();
  const { session } = useAuth();

  if (!session) {
    navigate("/login");
    return null;
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl font-bold mb-8">Payment Settings</h1>

          <Tabs defaultValue="payment-methods">
            <TabsList className="mb-8">
              <TabsTrigger value="payment-methods">Payment Methods</TabsTrigger>
              <TabsTrigger value="billing">Billing History</TabsTrigger>
            </TabsList>

            <TabsContent value="payment-methods">
              <Card>
                <CardHeader>
                  <CardTitle>Payment Methods</CardTitle>
                  <CardDescription>
                    Manage your payment methods and preferences
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <PaymentMethodsList />
                  <Button 
                    onClick={() => navigate("/payments/add-method")} 
                    className="mt-4"
                  >
                    Add Payment Method
                  </Button>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="billing">
              <Card>
                <CardHeader>
                  <CardTitle>Billing History</CardTitle>
                  <CardDescription>
                    View your past transactions and invoices
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <BillingHistory />
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </main>
    </div>
  );
};

export default PaymentSettingsPage;
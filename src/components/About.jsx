import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";


export default function About() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
      <Card className="w-full max-w-4xl bg-white shadow-lg">
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-center">About Us</CardTitle>
          <CardDescription className="text-center">
            Learn more about our services
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center p-6">
            <div>
              <p className="text-base text-gray-700">
                Whether you're looking to discover new fruits, understand their nutritional values, or find the perfect fruit for your diet, our AI-driven chatbot is here to assist. We provide personalized fruit recommendations tailored to your health needs, making it easier for you to integrate the best fruits into your daily routine.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

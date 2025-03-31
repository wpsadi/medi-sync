import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export default function Loading() {
    return     <div className="container mx-auto px-4 py-12 flex items-center justify-center min-h-screen">
    <Card className="w-full max-w-md">
      <CardHeader>
        <CardTitle className="text-center">Please wait!</CardTitle>
        <CardDescription className="text-center">Please wait while we process...</CardDescription>
      </CardHeader>
      <CardContent className="flex justify-center py-8">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </CardContent>
    </Card>
  </div>;
  }
  
  
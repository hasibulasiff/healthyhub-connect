import React, { Suspense } from 'react';
import { Outlet } from 'react-router-dom';
import { ErrorBoundary } from 'react-error-boundary';
import DashboardSidebar from '@/components/DashboardSidebar';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/components/ui/use-toast';

const ErrorFallback = ({ error, resetErrorBoundary }: { error: Error; resetErrorBoundary: () => void }) => {
  const { toast } = useToast();

  React.useEffect(() => {
    toast({
      title: 'Error',
      description: error.message,
      variant: 'destructive',
    });
  }, [error, toast]);

  return (
    <div className="flex h-screen flex-col items-center justify-center p-4">
      <h2 className="mb-4 text-2xl font-bold text-red-600">Something went wrong</h2>
      <p className="mb-4 text-gray-600">{error.message}</p>
      <button
        onClick={resetErrorBoundary}
        className="rounded bg-purple-600 px-4 py-2 text-white hover:bg-purple-700"
      >
        Try again
      </button>
    </div>
  );
};

const LoadingFallback = () => (
  <div className="flex h-screen items-center justify-center">
    <div className="h-32 w-32 animate-spin rounded-full border-b-2 border-t-2 border-purple-500"></div>
  </div>
);

const DashboardLayout = () => {
  const { role } = useAuth();

  return (
    <div className="flex min-h-screen">
      <DashboardSidebar />
      <main className="flex-1 overflow-x-hidden bg-gray-50 p-4">
        <ErrorBoundary
          FallbackComponent={ErrorFallback}
          onReset={() => {
            // Reset the state of your app here
            window.location.reload();
          }}
        >
          <Suspense fallback={<LoadingFallback />}>
            <div className="container mx-auto">
              <Outlet context={{ role }} />
            </div>
          </Suspense>
        </ErrorBoundary>
      </main>
    </div>
  );
};

export default DashboardLayout;
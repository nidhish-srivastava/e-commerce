// app/(auth)/layout.tsx
export default function AuthLayout({
    children,
  }) {
    return (
      <div className="h-full flex items-center justify-center mt-12">
        {children}
      </div>
    );
  }
// sign-in/[[...sign-in]]/layout.tsx
export default function AuthLayout({ children }: { children: React.ReactNode }) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
        <div className="w-full max-w-md bg-white rounded-xl shadow-lg p-8 space-y-6">
          {children}
          <div className="text-center text-sm text-gray-500 mt-6">
            <p>Login secured by <span className="text-teal-500">@clerk</span></p>
            <div className="text-xs text-gray-400 mt-1">Development mode</div>
          </div>
        </div>
      </div>
    );
  }

















// export default function AuthLayout({ children }: { children: React.ReactNode }) {
//     return (
//       <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
//         <div className="w-full max-w-md bg-white rounded-xl shadow-lg p-8 space-y-6">
//           {children}
//           <div className="text-center text-sm text-gray-500 mt-6">
//             <p>Secured by <span className="text-teal-500">@clerk</span></p>
//             <div className="text-xs text-gray-400 mt-1">Development mode</div>
//           </div>
//         </div>
//       </div>
//     );
//   }
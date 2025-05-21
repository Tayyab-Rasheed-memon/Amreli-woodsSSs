// app/signin/page.tsx
import LoginForm from "@/components/SignInComponent";

export default function SignInPage() {
  return <LoginForm />;
}










// // app/signin/page.tsx
// "use client";   

// import { SignIn } from "@clerk/nextjs";

// export default function SignInPage() {
//   return (
//     <div className="min-h-screen flex items-center justify-center bg-gray-100">
//       <div className="w-full max-w-md p-6 bg-white rounded-lg shadow-md">
//         <SignIn
//           path="/signin"
//           routing="path"
//           signUpUrl="/signup"
//           redirectUrl="/"
//           appearance={{
//             variables: {
//               colorPrimary: "#2563eb",
//             },
//           }}
//         />
//       </div>
//     </div>
//   );
// }
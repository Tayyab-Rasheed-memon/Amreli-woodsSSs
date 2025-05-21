// sign-in/[[...sign-in]]/page.tsx
import { SignIn } from "@clerk/nextjs";

export default function Page() {
  return (
    <SignIn
      path="/sign-in"
      routing="path"
      signUpUrl="/sign-up"
      afterSignInUrl="/dashboard"
      forceRedirectUrl="/dashboard"
      appearance={{
        variables: {
          colorPrimary: "#2563eb",
        },
        elements: {
          formFieldInput__identifier: "w-full p-2 border rounded",
          formFieldInput__password: "w-full p-2 border rounded mt-4",
          formButtonPrimary: "w-full bg-blue-600 text-white p-2 rounded hover:bg-blue-700",
          socialButtonsBlockButton: "hidden",
        },
      }}
    />
  );
}














// import { SignIn } from "@clerk/nextjs";

// export default function Page() {
//   return (
//     <SignIn
//       appearance={{
//         elements: {
//           formFieldIdentifier: 'hidden', // Hide username/email label
//           formFieldInput__password: 'mt-4', // Add spacing above password field
//           formFieldRow: 'flex flex-col gap-4',
//         }
//       }}
//       // Customizing sign-in behavior to show both username/email and password fields
//       path="/sign-in" // Make sure the path is correct
//       signUpUrl="/sign-up" // If you have a sign-up route, add it here
//       afterSignInUrl="/" // Redirect to homepage or after sign-in URL
//     />
//   );
// }

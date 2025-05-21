import { SignUp } from "@clerk/nextjs";

export default function Page() {
  return (
    <SignUp
      appearance={{
        elements: {
          formFieldFirstName: 'hidden',
          formFieldLastName: 'hidden',
          formFieldUsername: 'hidden',
          headerSubtitle: 'hidden',
          dividerLine: 'hidden',
          footer: 'hidden'
        }
      }}
    />
  );
}
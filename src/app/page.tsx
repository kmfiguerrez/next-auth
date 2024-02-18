import CardWrapper from "@/components/card-wrapper";
import RegisterForm from "@/components/forms/register-form";


export default function Home() {
  return (
    <main>
      <CardWrapper title="Register" className="mx-auto">
        <RegisterForm />
      </CardWrapper>
    </main>
  );
}

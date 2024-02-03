import LoginButton from "@/components/auth/login-button";
import { Button } from "@/components/ui/button"
import { gradientBackground } from "@/lib/styles";
import { poppins } from "@/lib/fonts";


export default function Home() {
  return (
    <main className={`
      flex h-full flex-col
      items-center justify-center
      ${gradientBackground}
      `}
    >
      <div className="space-y-6 text-center">
        <h1 className={`${poppins.className} text-6xl font-semibold text-white drop-shadow-md`}>
          Auth
        </h1>
        <p className="text-white text-lg">A simple authentication service</p>
      </div>

      <div>
        <LoginButton>
          <Button variant={"secondary"} size={"lg"}>
            Sign In
          </Button>
        </LoginButton>
      </div>

    </main>    
  );
}

import { Background } from "@/components/Background";
import { IconBrandGithub, IconBrandGoogle } from "@tabler/icons-react";
import {
  BottomGradient,
  LabelInputContainer,
} from "./auth/SignUpExtraComponenets";
import { Toaster } from "react-hot-toast";
import { Input } from "@/components/ui/input";
import { Label } from "@radix-ui/react-label";
import { useRef, useState } from "react";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from "@/components/ui/input-otp";

export default function ForgotPassword() {
  return (
    <Background>
      <ForgotPasswordForm />
    </Background>
  );
}

function ForgotPasswordForm() {
  const [page, setPage] = useState(1);
  const [email, setEmail] = useState("");
  const OTP = useRef(document.createElement("input"));
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = "";

  function sendOTP(){
    
  }

  return (
    <div className="max-w-md w-full mx-auto rounded-none md:rounded-2xl p-4 md:p-8 shadow-input border border-slate-300 bg-white dark:bg-black mt-32">
      <h2 className="font-bold text-xl text-neutral-800 dark:text-neutral-200 w-96">
        Did You Forgot Your Password ?
      </h2>
      <p className="text-neutral-600 text-sm max-w-sm mt-2 dark:text-neutral-300">
        Don't Worry <br />
        We are here to help !
      </p>

      <form className="my-8">
        {page === 1 && (
          <>
            <LabelInputContainer className="mb-4">
              <Label htmlFor="email">Email Address</Label>
              <Input
                id="loginDetails"
                placeholder="iit2023249@iiita.ac.in"
                type="text"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </LabelInputContainer>
            <button
              className="bg-gradient-to-br relative group/btn from-black dark:from-zinc-900 dark:to-zinc-900 to-neutral-600 block dark:bg-zinc-800 w-full text-white rounded-md h-10 font-medium shadow-[0px_1px_0px_0px_#ffffff40_inset,0px_-1px_0px_0px_#ffffff40_inset] dark:shadow-[0px_1px_0px_0px_var(--zinc-800)_inset,0px_-1px_0px_0px_var(--zinc-800)_inset] my-8"
              onClick={()=>{sendOTP}}
            >
              Send OTP &rarr;
              <BottomGradient />
            </button>
          </>
        )}
        {page===2 && <>
          <LabelInputContainer className="mb-8">
            <Label htmlFor="OTP">OTP</Label>
            <InputOTP maxLength={6} ref={OTP}>
              <InputOTPGroup>
                <InputOTPSlot index={0} />
                <InputOTPSlot index={1} />
              </InputOTPGroup>
              {window.innerWidth > 400 && <InputOTPSeparator />}
              <InputOTPGroup>
                <InputOTPSlot index={2} />
                <InputOTPSlot index={3} />
              </InputOTPGroup>
              {window.innerWidth > 400 && <InputOTPSeparator />}
              <InputOTPGroup>
                <InputOTPSlot index={4} />
                <InputOTPSlot index={5} />
              </InputOTPGroup>
            </InputOTP>
          </LabelInputContainer>
          <button
          className="mb-8 text-xs font-bold"
          type="button"
          onClick={() => {}}
        >
          Resend OTP
        </button>
        </>}

        

        <div className="bg-gradient-to-r from-transparent via-neutral-300 dark:via-neutral-700 to-transparent my-8 h-[1px] w-full" />

        <div className="flex flex-col space-y-4">
          <button
            className=" relative group/btn flex space-x-2 items-center justify-start px-4 w-full text-black rounded-md h-10 font-medium shadow-input bg-gray-50 dark:bg-zinc-900 dark:shadow-[0px_0px_1px_1px_var(--neutral-800)]"
            type="submit"
          >
            <IconBrandGithub className="h-4 w-4 text-neutral-800 dark:text-neutral-300" />
            <span className="text-neutral-700 dark:text-neutral-300 text-sm">
              GitHub
            </span>
            <BottomGradient />
          </button>
          <button
            className=" relative group/btn flex space-x-2 items-center justify-start px-4 w-full text-black rounded-md h-10 font-medium shadow-input bg-gray-50 dark:bg-zinc-900 dark:shadow-[0px_0px_1px_1px_var(--neutral-800)]"
            type="submit"
          >
            <IconBrandGoogle className="h-4 w-4 text-neutral-800 dark:text-neutral-300" />
            <span className="text-neutral-700 dark:text-neutral-300 text-sm">
              Google
            </span>
            <BottomGradient />
          </button>
        </div>
      </form>
      <Toaster />
    </div>
  );
}

import { signIn } from "next-auth/react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import Footer from "@/components/Footer";
import Head from "next/head";
import Image from "next/image";

const LoginPage = () => {
  const { status } = useSession();
  const [error, setError] = useState("");
  const router = useRouter();

  useEffect(() => {
    if (status === "authenticated") {
      router.push("/");
    }
  }, [status, router]);

  const handleSignIn = async (e) => {
    e.preventDefault();

    try {
      await signIn("google", {
        callbackUrl: "/",
      });
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <>
      <Head>
        <link rel="icon" href="/yvIcon_G.png" />
        <title>Yaadventures - Login</title>
      </Head>
      <div className="mt-20 flex items-center justify-center  sm:px-6 lg:px-8">
        <div className=" max-w-md w-full ">
          <div>
            <img
              className="mx-auto h-20 w-auto"
              src="/yvFull_G.png"
              alt="Logo"
            />
            <h2 className="mt-3 text-center text-4xl font-extrabold text-emerald-600">
              Sign in!
            </h2>
          </div>
          <form className="mt-8 space-y-6" onSubmit={handleSignIn}>
            <div className="rounded-md shadow-md -space-y-px">
              <div>
                <button
                  type="submit"
                  className="group relative w-full flex justify-center py-3 px-6 border border-emerald-600 text-sm font-medium rounded-md text-emerald-600 hover:bg-emerald-600 hover:text-white active:scale-90 transition ease-in-out"
                >
                  <span className="absolute left-0 inset-y-0 flex items-center pl-3">
                    {/* Google Icon */}
                    <Image
                      src={"/google_icon.png"}
                      alt={"google icon"}
                      width={20}
                      height={20}
                    />
                  </span>
                  Continue with Google
                </button>
              </div>
            </div>
            {error && (
              <p className="text-center text-red-500 text-xs">{error}</p>
            )}
          </form>
        </div>
      </div>
      <div className="fixed bottom-0 left-0 right-0">
        <Footer />
      </div>
    </>
  );
};

export default LoginPage;

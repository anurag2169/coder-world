import Link from "next/link";
import React, { useEffect, useState } from "react";
import { HiLockClosed } from "react-icons/hi";
import { useRouter } from "next/router";
export default function Forgot() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [cpassword, setCpassword] = useState("");

  const handleChange = async (e) => {
    if (e.target.name == "email") {
      setEmail(e.target.value);
    } else if (e.target.name == "password") {
      setPassword(e.target.value);
    } else if (e.target.name == "cpassword") {
      setCpassword(e.target.value);
    }
  };
  useEffect(() => {
    if (localStorage.getItem("token")) {
      router.push("/");
    }
  }, []);
  const sendResetEmail = async () => {
    let data = { email, sendMail: true };

    let a = await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/forgot`, {
      method: "POST", // or 'PUT'
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    let res = await a.json();
    if (res.success) {
      console.log("Password reset instruction has been send to your email");
    } else {
      console.log("error in sending a mail");
    }
  };

  const restpassword = async () => {
    if (password == cpassword) {
      let data = { password, sendMail: false };

      let a = await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/forgot`, {
        method: "POST", // or 'PUT'
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      let res = await a.json();
      if (res.success) {
        console.log("Password reset instruction has been send to your email");
      } else {
        console.log("error in sending a mail");
      }
    }
  };
  return (
    <>
      <div className="flex min-h-screen  justify-center px-4 py-28 sm:px-6 lg:px-8">
        <div className="w-full max-w-md space-y-8">
          <div>
            <img
              className="mx-auto h-12 w-auto"
              src="/logo.png"
              alt="codes wear "
            />
            <h2 className="mt-6 text-center text-3xl font-bold tracking-tight text-gray-900">
              Forgot Password
            </h2>
            <p className="mt-2  text-center text-sm text-gray-600">
              Or
              <Link href={"/login"} legacyBehavior passHref={true}>
                <a className="font-medium m-1 text-pink-600 hover:text-pink-500">
                  login
                </a>
              </Link>
            </p>
          </div>

          {router.query.token && (
            <form className="mt-8 space-y-6" action="#" method="POST">
              <div className="-space-y-px rounded-md shadow-sm">
                <div>
                  <label htmlFor="email-address" className="sr-only">
                    Password
                  </label>
                  <input
                    value={password}
                    onChange={handleChange}
                    id="password"
                    name="password"
                    type="password"
                    autoComplete="password"
                    required
                    className=" px-3 relative block w-full rounded-t-md border-0 py-1.5 text-gray-900 ring-1 ring-inset ring-pink-300 placeholder:text-gray-400 focus:z-10 focus:ring-2 focus:ring-inset focus:ring-pink-600 sm:text-sm sm:leading-6"
                    placeholder=" Enter your password"
                  />
                </div>
                <div>
                  <label htmlFor="email-address" className="sr-only">
                    Confirm Password
                  </label>
                  <input
                    value={cpassword}
                    onChange={handleChange}
                    id="cpassword"
                    name="cpassword"
                    type="cpassword"
                    autoComplete="cpassword"
                    required
                    className=" px-3 relative block w-full  border-0 py-1.5 text-gray-900 ring-1 ring-inset ring-pink-300 placeholder:text-gray-400 focus:z-10 focus:ring-2 focus:ring-inset focus:ring-pink-600 sm:text-sm sm:leading-6"
                    placeholder="Confirm Password"
                  />
                </div>
              </div>

              <div>
                <button
                  disabled={password !== cpassword}
                  onClick={restpassword}
                  type="submit"
                  className="disabled:bg-pink-300 group relative flex w-full justify-center rounded-md bg-pink-600 px-3 py-2 text-sm font-semibold text-white hover:bg-pink-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-pink-600"
                >
                  <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                    <HiLockClosed
                      className="h-5 w-5 text-pink-500 group-hover:text-pink-400"
                      aria-hidden="true"
                    />
                  </span>
                  Continue
                </button>
              </div>
              {password != cpassword && 
                // eslint-disable-next-line react/no-unescaped-entities
                <span className="text-red-600 font-semibold font-sans"> Passwords don't match</span>
              }
              {password && password === cpassword && 
                <span className="text-green-500 font-semibold font-sans"> Passwords match</span>
              }
            </form>
          )}

          {!router.query.token && (
            <form className="mt-8 space-y-6" action="#" method="POST">
              <div className="-space-y-px rounded-md shadow-sm">
                <div>
                  <label htmlFor="email-address" className="sr-only">
                    Email address
                  </label>
                  <input
                    value={email}
                    onChange={handleChange}
                    id="email-address"
                    name="email"
                    type="email"
                    autoComplete="email"
                    required
                    className=" px-3 relative block w-full rounded-t-md border-0 py-1.5 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:z-10 focus:ring-2 focus:ring-inset focus:ring-pink-600 sm:text-sm sm:leading-6"
                    placeholder="Email address"
                  />
                </div>
              </div>

              <div>
                <button
                  onClick={sendResetEmail}
                  type="submit"
                  className="group relative flex w-full justify-center rounded-md bg-pink-600 px-3 py-2 text-sm font-semibold text-white hover:bg-pink-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-pink-600"
                >
                  <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                    <HiLockClosed
                      className="h-5 w-5 text-pink-500 group-hover:text-pink-400"
                      aria-hidden="true"
                    />
                  </span>
                  Continue
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </>
  );
}

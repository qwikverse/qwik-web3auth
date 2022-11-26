import { component$, $, noSerialize, useContext } from "@builder.io/qwik";
import type { DocumentHead } from "@builder.io/qwik-city";
import * as web3authBase from "@web3auth/base";
import { Web3AuthStoreContext } from "~/context";
import { domain } from "~/shared/constant";
import { JWTLoginProvider, LoginProvider } from "~/types";

export default component$(() => {
  const state = useContext(Web3AuthStoreContext);

  const showPassword = $(() => {
    const passwordType = document.getElementById("myInput") as HTMLInputElement;
    const show = document.getElementById("show") as HTMLElement;
    const hide = document.getElementById("hide") as HTMLElement;
    if (passwordType?.type === "password") {
      passwordType.type = "text";
      hide.classList.remove("hidden");
      show.classList.add("hidden");
    } else {
      passwordType.type = "password";
      hide.classList.add("hidden");
      show.classList.remove("hidden");
    }
  });

  const login$ = $(async() => {
    if (!state.web3auth) {
      console.log("web3auth not initialized yet");
      return;
    }
    const web3authProvider = await state.web3auth.connect();
    web3authProvider && (state.provider = noSerialize(web3authProvider));
  });

  const customLogin$ = $(async (login: LoginProvider) => {
    if (state.adapter) {
      // const provider = await state.web3authCore?.connectTo(state.adapter.name, {loginProvider: login});
      const provider = await state.web3authCore?.connectTo(
        web3authBase.WALLET_ADAPTERS.OPENLOGIN,
        { loginProvider: login }
      );
      provider && (state.provider = noSerialize(provider));
    }
  });

  const jwtLogin$ = $(
    async (login: JWTLoginProvider, verifierIdField: string = "sub") => {
      if (state.adapter) {
        const web3authProvider = await state.web3authCore?.connectTo(
          state.adapter.name,
          {
            loginProvider: login,
            extraLoginOptions: {
              domain,
              verifierIdField,
            },
          }
        );
        web3authProvider && (state.provider = noSerialize(web3authProvider));
        return web3authProvider;
      }
    }
  );

  const googleLogin$ = $(async () => {
    customLogin$("google");
  });

  const discordLogin$ = $(async () => {
    customLogin$("discord");
  });

  const facebookLogin$ = $(async () => {
    customLogin$("facebook");
  });

  const twitchLogin$ = $(async () => {
    customLogin$("twitch");
  });

  const appleLogin$ = $(async () => {
    jwtLogin$("apple");
  });

  const twitterLogin$ = $(async () => {
    jwtLogin$("twitter");
  });

  return (
    <>
      <div class="bg-indigo-50 h-screen flex">
        <div class="xl:px-20 md:px-10 sm:px-6 px-4 md:py-12 py-9 2xl:mx-auto 2xl:container md:flex items-center justify-center">
          <div class="bg-white shadow-lg rounded xl:w-1/3 lg:w-5/12 md:w-1/2 w-full lg:px-10 sm:px-6 sm:py-10 px-2 py-6">
            <img src="/logo.png" alt="logo" class="mb-4" />
            <button
              onClick$={googleLogin$}
              aria-label="Continue with google"
              role="button"
              class="group focus:outline-none focus:ring-2 focus:ring-offset-1 focus:ring-gray-700 p-3 border rounded-lg border-gray-200 flex items-center w-full hover:bg-gray-100 justify-center"
            >
              <img src="login-google.svg" alt="google" />
              <p class="text-base font-medium ml-4 text-gray-700">
                Sign In with Google
              </p>
            </button>
            <div class="grid grid-cols-3 gap-4 mt-4">
              <div class="...">
                <button
                  onClick$={googleLogin$}
                  aria-label="Continue with google"
                  role="button"
                  class="group focus:outline-none focus:ring-2 focus:ring-offset-1 focus:ring-gray-700 p-3 border rounded-lg border-gray-200 flex items-center w-full hover:bg-gray-100 justify-center"
                >
                  <img
                    src="login-google.svg"
                    alt="google"
                    class="opacity-75 group-hover:opacity-100"
                  />
                </button>
              </div>
              <div class="...">
                <button
                  onClick$={facebookLogin$}
                  aria-label="Continue with facebook"
                  role="button"
                  class="group focus:outline-none focus:ring-2 focus:ring-offset-1 focus:ring-gray-700 p-3 border rounded-lg border-gray-200 flex items-center w-full hover:bg-gray-100 justify-center"
                >
                  <img
                    src="login-facebook.svg"
                    alt="facebook"
                    class="opacity-75 group-hover:opacity-100"
                  />
                </button>
              </div>
              <div class="...">
                <button
                  onClick$={twitterLogin$}
                  aria-label="Continue with twitter"
                  role="button"
                  class="group focus:outline-none focus:ring-2 focus:ring-offset-1 focus:ring-gray-700 p-3 border rounded-lg border-gray-200 flex items-center w-full hover:bg-gray-100 justify-center"
                >
                  <img
                    src="login-twitter.svg"
                    alt="twitter"
                    class="opacity-75 group-hover:opacity-100"
                  />
                </button>
              </div>
              <div class="...">
                <button
                  onClick$={discordLogin$}
                  aria-label="Continue with discord"
                  role="button"
                  class="group focus:outline-none focus:ring-2 focus:ring-offset-1 focus:ring-gray-700 p-3 border rounded-lg border-gray-200 flex items-center w-full hover:bg-gray-100 justify-center"
                >
                  <img
                    src="login-discord.svg"
                    alt="discord"
                    class="opacity-75 group-hover:opacity-100"
                  />
                </button>
              </div>
              <div class="...">
                <button
                  onClick$={appleLogin$}
                  aria-label="Continue with apple"
                  role="button"
                  class="group focus:outline-none focus:ring-2 focus:ring-offset-1 focus:ring-gray-700 p-3 border rounded-lg border-gray-200 flex items-center w-full hover:bg-gray-100 justify-center"
                >
                  <img
                    src="login-apple.svg"
                    alt="apple"
                    class="opacity-75 group-hover:opacity-100"
                  />
                </button>
              </div>
              <div class="...">
                <button
                  onClick$={twitchLogin$}
                  aria-label="Continue with twitch"
                  role="button"
                  class="group focus:outline-none focus:ring-2 focus:ring-offset-1 focus:ring-gray-700 p-3 border rounded-lg border-gray-200 flex items-center w-full hover:bg-gray-100 justify-center"
                >
                  <img
                    src="login-twitch.svg"
                    alt="twitch"
                    class="opacity-75 group-hover:opacity-100"
                  />
                </button>
              </div>
            </div>
            <div class="w-full flex items-center justify-between py-5">
              <hr class="w-full bg-gray-400" />
              <p class="text-base font-medium leading-4 px-2.5 text-gray-400">
                or
              </p>
              <hr class="w-full bg-gray-400" />
            </div>
            <div>
              <input
                id="email"
                aria-labelledby="email"
                type="email"
                class="bg-gray-200 border rounded text-xs font-medium leading-none placeholder-gray-400 text-gray-800 py-3 w-full pl-3 mt-2"
                placeholder="Enter your email"
              />
            </div>
            <div class="mt-6 w-full hidden">
              <label
                for="myInput"
                class="text-sm font-medium leading-none text-gray-800"
              >
                {" "}
                Password{" "}
              </label>
              <div class="relative flex items-center justify-center">
                <input
                  id="myInput"
                  type="password"
                  class="bg-gray-200 border rounded text-xs font-medium leading-none text-gray-800 py-3 w-full pl-3 mt-2"
                />
                <div
                  class="absolute right-0 mt-2 mr-3 cursor-pointer"
                  onClick$$={showPassword}
                >
                  <div id="show">
                    <img
                      src="https://tuk-cdn.s3.amazonaws.com/can-uploader/sign_in_2-svg5.svg"
                      alt="eye"
                    />
                  </div>
                  <div id="hide" class="hidden">
                    <img
                      src="https://tuk-cdn.s3.amazonaws.com/can-uploader/sign_in_2-svg6.svg"
                      alt="eye"
                    />
                  </div>
                </div>
              </div>
            </div>
            <div class="mt-8">
              <button
                onClick$={login$}
                role="button"
                class="focus:ring-2 focus:ring-offset-2 focus:ring-indigo-700 text-sm font-semibold leading-none text-white focus:outline-none bg-blue-700 border rounded hover:bg-indigo-600 py-4 w-full"
              >
                Enter
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
});

export const head: DocumentHead = {
  title: "Welcome to DLoyal",
  meta: [
    {
      name: "description",
      content: "The greatest loyalty program",
    },
  ],
};

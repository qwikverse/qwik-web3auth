import {
  component$,
  noSerialize,
  useClientEffect$,
  useContextProvider,
  useSignal,
  useStore,
  $,
} from "@builder.io/qwik";
import type { DocumentHead } from "@builder.io/qwik-city";
import { Web3AuthStoreContext } from "~/context";
import { Web3authStore } from "~/types";
import * as web3authModal from "@web3auth/modal";
import { clientId } from "~/shared/constant";
import * as web3authBase from "@web3auth/base";
import * as openLogin from "@web3auth/openlogin-adapter";
import Dashboard from "~/components/dashboard";
import Welcome from "~/components/welcome";
import Signin from "~/components/signin";
import Header from "~/components/header/header";

export default component$(() => {
  const loading = useSignal(true);
  const state = useStore<Web3authStore>({
    web3auth: noSerialize(undefined),
    web3authCore: noSerialize(undefined),
    adapter: noSerialize(undefined),
    provider: noSerialize(undefined),
    loading: true,
  });

  const login$ = $(async () => {
    if (!state.web3auth) {
      console.log("web3auth not initialized yet");
      return;
    }
    const web3authProvider = await state.web3auth.connect();
    web3authProvider && (state.provider = noSerialize(web3authProvider));
  });

  useContextProvider(Web3AuthStoreContext, state);

  useClientEffect$(async () => {
    try {
      const web3auth = new web3authModal.Web3Auth({
        clientId,
        chainConfig: {
          chainNamespace: web3authBase.CHAIN_NAMESPACES.EIP155,
          chainId: "0x1",
        },
        uiConfig: {
          theme: "light",
          appLogo: "qwikverse.png",
        },
      });

      const adapter = new openLogin.OpenloginAdapter({
        adapterSettings: {
          clientId,
          network: "testnet",
          uxMode: "popup",
          whiteLabel: {
            name: "Qwikverse",
            logoLight: "qwikverse.png",
            logoDark: "qwikverse.png",
            defaultLanguage: "en",
            dark: true, // whether to enable dark mode. defaultValue: false
          },
        },
      });

      await web3auth.initModal().finally(() => {
        state.loading = false;
      });
      state.adapter = noSerialize(adapter);
      state.web3auth = noSerialize(web3auth);
      state.web3auth?.configureAdapter(adapter);

      if (web3auth?.provider) {
        state.provider = noSerialize(web3auth?.provider);
      }
    } catch (error) {
      console.error(error);
    }
    login$();
  });

  return (
    <>
      {state.loading ? (
        <div>
          <Welcome />
        </div>
      ) : state.provider ? (
        <div>
          <Header />
          <Dashboard />
        </div>
      ) : (
        ""
      )}
    </>
  );
});

export const head: DocumentHead = {
  title: "Welcome to Qwik",
  meta: [
    {
      name: "description",
      content: "Qwik site description",
    },
  ],
};

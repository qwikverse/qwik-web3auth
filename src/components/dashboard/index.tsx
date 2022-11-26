import { component$, $, useContext, noSerialize } from "@builder.io/qwik";
import type { DocumentHead } from "@builder.io/qwik-city";
import { Web3AuthStoreContext } from "~/context";
import RPC from "../../models/web3RPC";

export default component$(() => {
  const state = useContext(Web3AuthStoreContext);

  const uiConsole$ = $((...args: any[]) => {
    const el = document.querySelector("#console>p");
    if (el) {
      el.innerHTML = JSON.stringify(args || {}, null, 2);
    }
  });

  const authenticateUser$ = $(async () => {
    if (!state.web3auth) {
      uiConsole$("web3auth not initialized yet");
      return;
    }
    const idToken = await state.web3auth?.authenticateUser();
    uiConsole$(idToken);
  });

  const getUserInfo$ = $(async () => {
    if (!state.web3auth) {
      uiConsole$("web3auth not initialized yet");
      return;
    }
    const user = await state.web3auth?.getUserInfo();
    uiConsole$(user);
  });

  const logout$ = $(async () => {
    if (!state.web3auth) {
      uiConsole$("web3auth not initialized yet");
      return;
    }
    await state.web3auth?.logout();
    state.provider = noSerialize(undefined);
  });

  const getChainId$ = $(async () => {
    if (!state.provider) {
      uiConsole$("provider not initialized yet");
      return;
    }
    const rpc = new RPC(state.provider);
    const chainId = await rpc.getChainId();
    uiConsole$(chainId);
  });

  const getAccounts$ = $(async () => {
    if (!state.provider) {
      uiConsole$("provider not initialized yet");
      return;
    }
    const rpc = new RPC(state.provider);
    const address = await rpc.getAccounts();
    uiConsole$(address);
  });

  const getBalance$ = $(async () => {
    if (!state.provider) {
      uiConsole$("state.provider not initialized yet");
      return;
    }
    const rpc = new RPC(state.provider);
    const balance = await rpc.getBalance();
    uiConsole$(balance);
  });

  const sendTransaction$ = $(async () => {
    if (!state.provider) {
      uiConsole$("provider not initialized yet");
      return;
    }
    const rpc = new RPC(state.provider);
    const receipt = await rpc.sendTransaction();
    uiConsole$(receipt);
  });

  const signMessage$ = $(async () => {
    if (!state.provider) {
      uiConsole$("provider not initialized yet");
      return;
    }
    const rpc = new RPC(state.provider);
    const signedMessage = await rpc.signMessage();
    uiConsole$(signedMessage);
  });

  const getPrivateKey$ = $(async () => {
    if (!state.provider) {
      uiConsole$("provider not initialized yet");
      return;
    }
    const rpc = new RPC(state.provider);
    const privateKey = await rpc.getPrivateKey();
    uiConsole$(privateKey);
  });

  return (
    <div class="container">
      <h1 class="title">Web3Auth + Qwik</h1>

      <div class="grid-container">
        <div class="flex-container">
          <div>
            <button
              onClick$={getUserInfo$}
              class="focus:ring-2 focus:ring-offset-2 focus:ring-indigo-700 text-sm font-semibold leading-none text-white focus:outline-none bg-indigo-700 border rounded hover:bg-indigo-600 py-4 w-full"
            >
              Get User Info
            </button>
          </div>
          <div>
            <button
              onClick$={authenticateUser$}
              class="focus:ring-2 focus:ring-offset-2 focus:ring-indigo-700 text-sm font-semibold leading-none text-white focus:outline-none bg-indigo-700 border rounded hover:bg-indigo-600 py-4 w-full"
            >
              Get ID Token
            </button>
          </div>
          <div>
            <button
              onClick$={getChainId$}
              class="focus:ring-2 focus:ring-offset-2 focus:ring-indigo-700 text-sm font-semibold leading-none text-white focus:outline-none bg-indigo-700 border rounded hover:bg-indigo-600 py-4 w-full"
            >
              Get Chain ID
            </button>
          </div>
          <div>
            <button
              onClick$={getAccounts$}
              class="focus:ring-2 focus:ring-offset-2 focus:ring-indigo-700 text-sm font-semibold leading-none text-white focus:outline-none bg-indigo-700 border rounded hover:bg-indigo-600 py-4 w-full"
            >
              Get Accounts
            </button>
          </div>
          <div>
            <button
              onClick$={getBalance$}
              class="focus:ring-2 focus:ring-offset-2 focus:ring-indigo-700 text-sm font-semibold leading-none text-white focus:outline-none bg-indigo-700 border rounded hover:bg-indigo-600 py-4 w-full"
            >
              Get Balance
            </button>
          </div>
          <div>
            <button
              onClick$={signMessage$}
              class="focus:ring-2 focus:ring-offset-2 focus:ring-indigo-700 text-sm font-semibold leading-none text-white focus:outline-none bg-indigo-700 border rounded hover:bg-indigo-600 py-4 w-full"
            >
              Sign Message
            </button>
          </div>
          <div>
            <button
              onClick$={sendTransaction$}
              class="focus:ring-2 focus:ring-offset-2 focus:ring-indigo-700 text-sm font-semibold leading-none text-white focus:outline-none bg-indigo-700 border rounded hover:bg-indigo-600 py-4 w-full"
            >
              Send Transaction
            </button>
          </div>
          <div>
            <button
              onClick$={getPrivateKey$}
              class="focus:ring-2 focus:ring-offset-2 focus:ring-indigo-700 text-sm font-semibold leading-none text-white focus:outline-none bg-indigo-700 border rounded hover:bg-indigo-600 py-4 w-full"
            >
              Get Private Key
            </button>
          </div>
          <div>
            <button
              onClick$={logout$}
              class="focus:ring-2 focus:ring-offset-2 focus:ring-indigo-700 text-sm font-semibold leading-none text-white focus:outline-none bg-indigo-700 border rounded hover:bg-indigo-600 py-4 w-full"
            >
              Log Out
            </button>
          </div>
        </div>
        <div id="console" style={{ whiteSpace: "pre-line" }}>
          <p style={{ whiteSpace: "pre-line" }}></p>
        </div>
      </div>
    </div>
  );
});

export const head: DocumentHead = {
  title: "Dashboard",
  meta: [
    {
      name: "description",
      content: "The greatest loyalty dashboard",
    },
  ],
};

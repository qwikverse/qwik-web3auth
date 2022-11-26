import { component$, useStore } from "@builder.io/qwik";
import { DocumentHead } from "@builder.io/qwik-city";
import { QwikLottie } from "qwik-lottie";

export default component$(() => {
  const store = useStore({
    options: {
      path: "https://assets10.lottiefiles.com/packages/lf20_Au6z826BEy.json",
    },
  });
  return (
    <div class="bg-black relative overflow-hidden h-screen flex justify-center">
      <div class="inset-0 bg-black opacity-25 absolute"></div>
      <div class="container mx-auto px-6 md:px-12 relative z-10 flex items-center py-32 xl:py-40">
        <div class="w-full flex flex-col items-center relative z-10">
          <QwikLottie options={store.options} />
          loading...
        </div>
      </div>
    </div>
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

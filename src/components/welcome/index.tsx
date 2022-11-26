import { component$, useStore, useStyles$ } from "@builder.io/qwik";
import { DocumentHead } from "@builder.io/qwik-city";
import { QwikLottie } from "qwik-lottie";
import styles from './style.css?inline'

export default component$(() => {
    useStyles$(styles);
    // const state = useContext(Web3AuthStoreContext);
    const astronaut = useStore({
        options: {
        path: "https://assets7.lottiefiles.com/packages/lf20_5gkEN24YTZ.json",
        },
    });
    const loading = useStore({
        options: {
        path: "https://assets4.lottiefiles.com/datafiles/aba45c7b75d547282b2dbdc97969412b/progress_bar.json",
        },
    });

  return (
    <div class="bg-black relative overflow-hidden h-screen flex justify-center">
      <div class="inset-0 bg-black opacity-25 absolute"></div>
      <div class="container mx-auto px-6 md:px-12 relative z-10 flex items-center py-32 xl:py-40">
        <div class="w-full flex flex-col items-center relative z-10">
          <QwikLottie options={astronaut.options} />
            <div style="margin-top: -240px">
                <QwikLottie options={loading.options} />
            </div>
            <p class="text-white" style="margin-top: -230px">Qwikverse loading...</p>
            
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

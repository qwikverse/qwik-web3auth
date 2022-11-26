import { component$, useClientEffect$ } from '@builder.io/qwik';
import { RequestHandler, useLocation } from '@builder.io/qwik-city';

export default component$(() => {
  useClientEffect$(() => {
    const loc = useLocation();
    console.log(loc);
  })

  return <></>
});

export const onGet: RequestHandler = ({ request, response, params }) => {
  console.log({ request, response, params });
  // throw response.redirect('/');
};

import {  HeadContent, Outlet, createRootRouteWithContext } from '@tanstack/react-router'
// import { TanStackRouterDevtoolsPanel } from '@tanstack/react-router-devtools'
// import { TanStackDevtools } from '@tanstack/react-devtools'
import { QueryClient } from '@tanstack/react-query';
import { HexagonBackground } from "@/components/ui/hexagon-background";

import Header from '@/components/ui/Header';
import NotFound from '@/components/ui/NotFound';



type RouterContext = {
  queryClient: QueryClient;
}

export const Route = createRootRouteWithContext<RouterContext>()({
  head: () => ({
    meta: [
      {
        name: 'description',
        content: 'یه مثال ساده از tanstack router',
      },
      {
        title: 'product seller',
      }
    ],
  }),
  component: RootLayout,
  notFoundComponent: NotFound,
});


function RootLayout() {
  return (
    <HexagonBackground className="absolute inset-0 "
    // flex items-center justify-center rounded-xl
    >
      <HeadContent />
      <Header />
      <main className='mx-auto p-5'>
        <Outlet />
      </main>
    </HexagonBackground>
  )
};



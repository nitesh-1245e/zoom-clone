import StreameVideoProvider from "@/providers/StreamClientProvider";
import { Metadata } from "next";
import React, { ReactNode } from "react";

export const metadata: Metadata = {
  title: "ZOOM",
  description: " Video calling app",
  icons: {
    icon: "/photos/Vector.svg",
  },
};

const RootLayout = ({ children }: { children: ReactNode }) => {
  return (
    <main>
      <StreameVideoProvider>{children}</StreameVideoProvider>
    </main>
  );
};

export default RootLayout;

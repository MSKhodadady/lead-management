import { MainLayout } from "@/components/layout/Main";
import { H1 } from "@/components/typography/H1";
import { Button } from "@/components/ui/button";

export default function Home() {
  return (
    <div className="w-full h-full">
      <MainLayout className="max-w-2xl mt-12 mx-auto  py-8 flex flex-col gap-14 items-center">
        <H1>Welcome!</H1>
        <Button>Enter your lead!</Button>
      </MainLayout>
    </div>
  );
}

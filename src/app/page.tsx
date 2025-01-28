import { MainLayout } from "@/components/layout/Main";
import { H1 } from "@/components/typography/H1";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function Home() {
  return (
    <MainLayout>
      <H1>Welcome!</H1>
      <Link href={"/create"}>
        <Button>Enter your lead!</Button>
      </Link>
    </MainLayout>
  );
}

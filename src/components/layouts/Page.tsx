import { Link } from "wouter";
import { Button } from "../ui/Button";

interface Pageprops {
  titlePage: string;
  titleButton?: string | null;
  urlButton?: string | null;
  children: React.ReactNode;
}

export default function Page({
  titlePage,
  titleButton,
  urlButton,
  children,
}: Pageprops) {
  return (
    <div className="Page w-full max-w-[1400px] grow py-6">
      <h3 className="py-10 text-center text-4xl">{titlePage}</h3>
      {titleButton && urlButton ? (
        <div className="tableButtons flex gap-x-3">
          <Link href="/dashboard">
            <Button variant="secondary">Regresar</Button>
          </Link>
          <Link href={urlButton}>
            <Button className="mb-6">{titleButton}</Button>
          </Link>
        </div>
      ) : null}
      <main>{children}</main>
    </div>
  );
}

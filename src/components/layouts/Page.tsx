interface Pageprops {
  titlePage: string;
  children: React.ReactNode;
}

export default function Page({ titlePage, children }: Pageprops) {
  return (
    <div className="Page w-full max-w-[1400px] grow py-6">
      <h3 className="py-10 text-center text-4xl">{titlePage}</h3>
      <main>{children}</main>
    </div>
  );
}

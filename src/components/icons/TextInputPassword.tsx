interface iconProps {
  classes: string;
}

export default function TextInputPassword({ classes }: iconProps) {
  return (
    // biome-ignore lint/a11y/noSvgWithoutTitle: <explanation>
<svg
      xmlns="http://www.w3.org/2000/svg"
      width="1em"
      height="1em"
      viewBox="0 0 24 24"
      className={classes}
    >
      <path
        fill="currentColor"
        d="M17 7h5v10h-5v2a1 1 0 0 0 1 1h2v2h-2.5c-.55 0-1.5-.45-1.5-1c0 .55-.95 1-1.5 1H12v-2h2a1 1 0 0 0 1-1V5a1 1 0 0 0-1-1h-2V2h2.5c.55 0 1.5.45 1.5 1c0-.55.95-1 1.5-1H20v2h-2a1 1 0 0 0-1 1zM2 7h11v2H4v6h9v2H2zm18 8V9h-3v6zM8.5 12A1.5 1.5 0 0 0 7 10.5A1.5 1.5 0 0 0 5.5 12A1.5 1.5 0 0 0 7 13.5A1.5 1.5 0 0 0 8.5 12m4.5-1.11c-.61-.56-1.56-.51-2.12.11c-.56.6-.51 1.55.12 2.11c.55.52 1.43.52 2 0z"
      />
    </svg>
  );
}

interface iconProps {
  classes: string;
}

export default function TrashIcon({ classes }: iconProps) {
  return (
    // biome-ignore lint/a11y/noSvgWithoutTitle: <explanation>
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="1em"
      height="1em"
      className={classes}
      viewBox="0 0 24 24"
    >
      <path
        fill="currentColor"
        d="M9 3v1H4v2h1v13a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V6h1V4h-5V3zm0 5h2v9H9zm4 0h2v9h-2z"
      />
    </svg>
  );
}

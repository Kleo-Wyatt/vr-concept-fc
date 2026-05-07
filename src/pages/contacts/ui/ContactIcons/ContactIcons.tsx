import type { SVGProps } from 'react';

type IconProps = SVGProps<SVGSVGElement>;

export function LocationIcon(props: IconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden="true"
      focusable="false"
      {...props}
    >
      <path
        fill="currentColor"
        d="M12 2.75A7.25 7.25 0 0 0 4.75 10c0 5.22 6.22 10.82 6.48 11.06a1.15 1.15 0 0 0 1.54 0c.26-.24 6.48-5.84 6.48-11.06A7.25 7.25 0 0 0 12 2.75Zm0 10.15A2.9 2.9 0 1 1 12 7.1a2.9 2.9 0 0 1 0 5.8Z"
      />
    </svg>
  );
}

export function PhoneIcon(props: IconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden="true"
      focusable="false"
      {...props}
    >
      <path
        fill="currentColor"
        d="M6.62 10.79a15.09 15.09 0 0 0 6.59 6.59l2.2-2.2a1.4 1.4 0 0 1 1.43-.34c1.57.52 3.28.8 5.03.8.62 0 1.13.5 1.13 1.12v3.49c0 .62-.5 1.13-1.13 1.13C10.36 21.38 2.62 13.64 2.62 2.13 2.62 1.5 3.12 1 3.75 1h3.49c.62 0 1.12.5 1.12 1.13 0 1.75.28 3.46.8 5.03.16.5.04 1.04-.34 1.43l-2.2 2.2Z"
      />
    </svg>
  );
}

export function MailIcon(props: IconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden="true"
      focusable="false"
      {...props}
    >
      <path
        fill="currentColor"
        d="M4.5 5h15A2.5 2.5 0 0 1 22 7.5v9A2.5 2.5 0 0 1 19.5 19h-15A2.5 2.5 0 0 1 2 16.5v-9A2.5 2.5 0 0 1 4.5 5Zm.3 2 6.47 5.03a1.18 1.18 0 0 0 1.46 0L19.2 7H4.8Zm15.2 2.15-5.92 4.6a3.35 3.35 0 0 1-4.16 0L4 9.15v7.35c0 .28.22.5.5.5h15a.5.5 0 0 0 .5-.5V9.15Z"
      />
    </svg>
  );
}

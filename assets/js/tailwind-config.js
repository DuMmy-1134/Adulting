/*
 * Shared Tailwind Play CDN theme config for all 3 pages.
 *
 * HARD CONSTRAINT: this file MUST be loaded via a plain `<script src>` tag
 * placed AFTER the `https://cdn.tailwindcss.com` script tag, with no `defer`
 * and no `async`. The Play CDN bundle overwrites `window.tailwind` with its
 * own Proxy object when it runs, so a config assigned before the CDN script
 * loads is silently discarded, and a deferred/async config would race the
 * CDN bootstrap. Loading this script synchronously, right after the CDN
 * tag, guarantees the Proxy's `set` trap sees this assignment and rebuilds
 * the utility CSS with these tokens included.
 */
tailwind.config = {
  theme: {
    extend: {
      fontFamily: {
        heading: ['Fraunces', 'Georgia', 'serif'],
        body: ['"Nunito Sans"', 'system-ui', 'sans-serif'],
      },
    },
  },
};

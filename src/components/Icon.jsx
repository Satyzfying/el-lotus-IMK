const paths = {
  arrowLeft: '<path d="M15 18 9 12l6-6"/><path d="M20 12H9"/>',
  bag: '<path d="M6 8h12l-1 12H7L6 8Z"/><path d="M9 8a3 3 0 0 1 6 0"/><path d="M9 13h6"/>',
  bell: '<path d="M18 8a6 6 0 0 0-12 0c0 7-3 7-3 9h18c0-2-3-2-3-9"/><path d="M13.7 21a2 2 0 0 1-3.4 0"/>',
  card: '<rect x="3" y="5" width="18" height="14" rx="2"/><path d="M3 10h18"/><path d="M7 15h3"/>',
  cart: '<path d="M4 5h2l2 12h10l2-8H8"/><circle cx="10" cy="20" r="1.5"/><circle cx="18" cy="20" r="1.5"/>',
  check: '<path d="m4 13 5 5L20 6"/>',
  clock: '<circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/>',
  cup: '<path d="M5 8h11l-1 13H7L5 8Z"/><path d="M8 3h6"/><path d="M9 3v5"/><path d="M15 11h2a3 3 0 0 1 0 6h-1"/>',
  download: '<path d="M12 3v12"/><path d="m7 10 5 5 5-5"/><path d="M5 21h14"/>',
  heart: '<path d="M20.8 4.6a5.5 5.5 0 0 0-7.8 0L12 5.7l-1-1.1a5.5 5.5 0 0 0-7.8 7.8l1 1L12 21l7.8-7.6 1-1a5.5 5.5 0 0 0 0-7.8Z"/>',
  help: '<circle cx="12" cy="12" r="9"/><path d="M9.5 9a3 3 0 1 1 4.5 2.6c-1.2.7-2 1.3-2 2.4"/><path d="M12 17h.01"/>',
  home: '<path d="m3 11 9-8 9 8"/><path d="M5 10v11h14V10"/><path d="M9 21v-7h6v7"/>',
  logout: '<path d="M10 17 15 12l-5-5"/><path d="M15 12H3"/><path d="M21 3v18"/>',
  mapPin: '<path d="M12 21s7-5.1 7-11a7 7 0 1 0-14 0c0 5.9 7 11 7 11Z"/><circle cx="12" cy="10" r="2.5"/>',
  percent: '<path d="M19 5 5 19"/><circle cx="7" cy="7" r="2"/><circle cx="17" cy="17" r="2"/>',
  qris: '<path d="M4 4h6v6H4z"/><path d="M14 4h6v6h-6z"/><path d="M4 14h6v6H4z"/><path d="M14 14h2v2h-2z"/><path d="M18 14h2v6h-4v-2h2z"/><path d="M12 7h1"/><path d="M7 12v1"/><path d="M12 19h1"/>',
  shield: '<path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10Z"/><path d="M9 12l2 2 4-5"/>',
  share: '<circle cx="18" cy="5" r="3"/><circle cx="6" cy="12" r="3"/><circle cx="18" cy="19" r="3"/><path d="m8.6 10.5 6.8-4"/><path d="m8.6 13.5 6.8 4"/>',
  ticket: '<path d="M3 9a3 3 0 0 0 0 6v3h18v-3a3 3 0 0 0 0-6V6H3v3Z"/><path d="M9 9h.01"/><path d="M15 15h.01"/><path d="M16 8 8 16"/>',
  truck: '<path d="M10 17h4V6H3v11h2"/><path d="M14 9h4l3 4v4h-2"/><circle cx="7" cy="17" r="2"/><circle cx="17" cy="17" r="2"/>',
  user: '<circle cx="12" cy="8" r="4"/><path d="M4 21a8 8 0 0 1 16 0"/>',
  wallet: '<path d="M3 7h18v12H3z"/><path d="M16 12h5"/><path d="M3 7l4-4h11v4"/>',
};

export function Icon({ name }) {
  return (
    <svg
      viewBox="0 0 24 24"
      aria-hidden="true"
      focusable="false"
      dangerouslySetInnerHTML={{ __html: paths[name] || "" }}
    />
  );
}

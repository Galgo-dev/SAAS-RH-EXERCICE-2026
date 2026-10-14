// Logo décoratif : le nom du produit est écrit à côté, il n'a donc pas besoin d'alternative textuelle.
function LogoFeuille({ taille = 36 }) {
  return (
    <svg
      width={taille}
      height={taille}
      viewBox="0 0 32 32"
      aria-hidden="true"
      focusable="false"
    >
      <path
        d="M27 4C13 4 5 11 5 20c0 1.8.5 3.4 1.4 4.8C8.4 17.5 14 12.5 22 11 15.5 14.2 11 19 9 26.6c1.5.9 3.2 1.4 5 1.4 10 0 14-9.5 13-24z"
        fill="currentColor"
      />
      <path
        d="M6.4 24.8C5.6 26.6 5 28 4.5 29.2"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
    </svg>
  )
}

export default LogoFeuille

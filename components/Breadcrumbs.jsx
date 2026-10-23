// items: [{ label, href? }] — last item is the current page (no href)
export default function Breadcrumbs({ items }) {
  if (!items || !items.length) return null;
  return (
    <nav className="breadcrumbs" aria-label="Breadcrumb">
      <ol>
        {items.map((it, i) => (
          <li key={i}>
            {it.href ? <a href={it.href}>{it.label}</a> : <span aria-current="page">{it.label}</span>}
            {i < items.length - 1 && (
              <span className="crumb-sep" aria-hidden="true">
                /
              </span>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}

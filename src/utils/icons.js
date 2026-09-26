// Minimal, dependency-free icon set (initials-in-circle style) for social links.
// Avoids shipping external icon libraries or brand logo assets.
const ICONS = {
  github: { label: "GH", color: "#24292f" },
  linkedin: { label: "in", color: "#0a66c2" },
  instagram: { label: "IG", color: "#d6249f" },
  orcid: { label: "iD", color: "#a6ce39" },
  mail: { label: "@", color: "#111827" },
  download: { label: "↓", color: "#111827" },
};

export function iconBadge(name) {
  const icon = ICONS[name] || { label: "•", color: "#6b7280" };
  return `<span class="icon-badge" style="background:${icon.color}">${icon.label}</span>`;
}

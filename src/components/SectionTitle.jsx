export default function SectionTitle({
  badge,
  title,
  description,
  center = false,
}) {
  return (
    <div
      className={`${
        center ? "text-center mx-auto" : ""
      } max-w-3xl`}
    >
      {/* Badge */}
      {badge && (
        <div className="inline-flex items-center px-4 py-1.5 rounded-full bg-indigo-50 border border-indigo-100 text-indigo-700 text-xs font-semibold uppercase tracking-wider mb-5 shadow-sm">
          {badge}
        </div>
      )}

      {/* Title */}
      <h2 className="section-title">
        {title}
      </h2>

      {/* Description */}
      <p className="section-subtitle">
        {description}
      </p>
    </div>
  );
}
function EmptyState({
  title,
  subtitle,
}) {
  return (
    <div className="text-center py-20">

      <h2 className="text-2xl font-semibold text-[#06153A]">
        {title}
      </h2>

      <p className="text-gray-500 mt-2">
        {subtitle}
      </p>

    </div>
  );
}

export default EmptyState;
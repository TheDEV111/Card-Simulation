export function DescriptionItem({ term, detail, className = "" }) {
  return (
    <div className={`py-3 sm:grid sm:grid-cols-3 sm:gap-4 ${className}`}>
      <dt className="text-sm font-medium text-gray-500 dark:text-gray-400">{term}</dt>
      <dd className="mt-1 text-sm text-gray-900 dark:text-white sm:col-span-2 sm:mt-0">{detail}</dd>
    </div>
  );
}

export default function DescriptionList({ items = [], className = "" }) {
  return (
    <dl className={`divide-y divide-gray-100 dark:divide-gray-800 ${className}`}>
      {items.map(({ term, detail }, i) => (
        <DescriptionItem key={i} term={term} detail={detail} />
      ))}
    </dl>
  );
}

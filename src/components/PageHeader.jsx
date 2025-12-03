export default function PageHeader({ pageTitle = "", breadcrumb = "Home", children }) {
  return (
    <div className="flex items-center justify-between p-4">
      <div className="flex flex-col">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-black">
          {pageTitle}
        </h1>
        <p className="text-sm text-gray-600 dark:text-gray-500 mt-1">
          {breadcrumb}
        </p>
      </div>
      <div className="flex items-center space-x-2">
        {children}
      </div>
    </div>
  );
}

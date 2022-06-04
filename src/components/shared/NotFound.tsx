const NotFound = ({ customText }: { customText?: string }) => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-white dark:bg-gray-900 py-48">
      <div className="flex flex-col">
        <div className="flex flex-col items-center">
          <div className="text-indigo-500 dark:text-indigo-200 dark:opacity-90 font-bold text-7xl">
            404
          </div>

          <div className="font-bold text-3xl dark:text-white xl:text-7xl lg:text-6xl md:text-5xl mt-10">
            This page does not exist.
          </div>

          <div className="text-slate-400 font-medium text-sm md:text-xl lg:text-2xl mt-8">
            The {customText ? customText : "page"} you are looking for could not
            be found.
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotFound;

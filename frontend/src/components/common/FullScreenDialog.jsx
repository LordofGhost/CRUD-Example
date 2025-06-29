function FullScreenDialog({ onClose, children, title }) {
  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center">
      <div
        className="bg-opacity-50 absolute inset-0 backdrop-blur-xs"
        onClick={onClose}
      ></div>

      {/* Dialog content */}
      <div className="z-10 mt-20 max-h-[90vh] w-full max-w-4xl rounded-lg shadow-2xl">
        {/* Header */}
        <div className="flex flex-row items-center justify-between rounded-t-lg border-b border-gray-200 bg-white px-6 py-4">
          <h1 className="text-2xl font-semibold text-gray-800">{title}</h1>
          <button
            className="flex h-10 w-10 cursor-pointer items-center justify-center rounded-md p-2 transition-all duration-300 hover:rotate-90 hover:bg-gray-100 focus:ring-2 focus:ring-gray-300 focus:outline-none"
            onClick={onClose}
            aria-label="Dialog schließen"
          >
            <img className="h-6 w-6" src="close.png" alt="Schließen" />
          </button>
        </div>

        {/* Body content */}
        <div className="max-h-[calc(90vh-80px)] overflow-auto rounded-b-lg bg-white p-6">
          {children}
        </div>
      </div>
    </div>
  );
}

export default FullScreenDialog;

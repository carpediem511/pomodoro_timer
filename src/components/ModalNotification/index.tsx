type ModalNotificationProps = {
  message: string;
  onClose: () => void;
  resetTimer: () => void;
};

const ModalNotification = ({
  message,
  onClose,
  resetTimer,
}: ModalNotificationProps) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-25 flex items-center justify-center">
      <div className="w-full max-w-md md:max-w-lg lg:max-w-xl xl:max-w-2xl bg-white rounded-md shadow-lg p-6 text-center">
        <h3 className="text-lg font-medium leading-6 text-gray-900">
          {message}
        </h3>
        <div className="mt-4">
          <button
            className="inline-flex justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
            onClick={() => {
              resetTimer();
              onClose();
            }}
          >
            Продолжить
          </button>
        </div>
      </div>
    </div>
  );
};

export default ModalNotification;

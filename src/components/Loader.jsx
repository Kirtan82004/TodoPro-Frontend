import { Loader2 } from "lucide-react";
import clsx from "clsx";

const Loader = ({
  fullScreen = false,
  size = 32,
  text,
  className,
}) => {
  return (
    <div
      className={clsx(
        "flex items-center justify-center",
        fullScreen && "min-h-screen",
        className
      )}
    >
      <div className="flex flex-col items-center gap-3">
        <Loader2
          size={size}
          className="animate-spin text-blue-600"
        />
        {text && (
          <p className="text-sm text-gray-500">
            {text}
          </p>
        )}
      </div>
    </div>
  );
};

export default Loader;

import type { ChangeEvent } from "react";

type Props = {
  fileName: string;
  onUpload: (event: ChangeEvent<HTMLInputElement>) => void;
};

function DropZone({ fileName, onUpload }: Props) {
  return (
    <div className="rounded-xl border-2 border-dashed border-cyan-500/30 bg-[#081221] p-8 text-center">
      <input
        id="log-upload"
        type="file"
        accept=".log,.txt,.csv,.json"
        className="hidden"
        onChange={onUpload}
      />

      <label htmlFor="log-upload" className="cursor-pointer">
        <div className="text-5xl">📂</div>

        <h3 className="mt-4 text-xl font-semibold text-cyan-400">
          Upload Security Logs
        </h3>

        <p className="mt-2 text-gray-400">
          Click here or drag a supported file
        </p>

        {fileName && (
          <p className="mt-4 text-green-400">
            ✅ {fileName}
          </p>
        )}
      </label>
    </div>
  );
}

export default DropZone;
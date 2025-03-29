import { Button } from "@/components/ui/button";
import { Upload } from "lucide-react";
import { FC } from "react";

interface FileUploadButtonProps {
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  label?: string;
  accept?: string;
  errorMessage?: string;
  className?: string;
}

const FileUploadButton: FC<FileUploadButtonProps> = ({
  onChange,
  label = "Upload File",
  accept = "image/*",
  errorMessage,
  className = "w-40",
}) => {
  return (
    <div>
      <Button variant="outline" className={className} asChild>
        <label>
          <Upload className="w-4 h-4 mr-2" />
          {label}
          <input type="file" accept={accept} className="hidden" onChange={onChange} />
        </label>
      </Button>
      {errorMessage && <p className="text-red-500 text-sm mt-3">{errorMessage}</p>}
    </div>
  );
};

export default FileUploadButton;
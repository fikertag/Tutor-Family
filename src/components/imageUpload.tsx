"use client";
import {
  ImageCrop,
  ImageCropApply,
  ImageCropContent,
} from "@/components/ui/kibo-ui/image-crop";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { XIcon } from "lucide-react";

import { type ChangeEvent, useState, useEffect, useRef } from "react";
const Example = ({
  onFileSelected,
}: {
  onFileSelected?: (file: File | null) => void;
}) => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [croppedImage, setCroppedImage] = useState<string | null>(null);
  // keep a ref to the latest callback so the effect doesn't re-run when the
  // parent passes a new function identity
  const onFileSelectedRef = useRef(onFileSelected);
  useEffect(() => {
    onFileSelectedRef.current = onFileSelected;
  }, [onFileSelected]);

  // when croppedImage is produced by the cropper, convert it to a File and pass to parent
  // croppedImage is expected to be a data URL. Use a cancel flag to avoid duplicate work.
  useEffect(() => {
    if (!croppedImage) return;
    let cancelled = false;
    (async () => {
      try {
        const res = await fetch(croppedImage);
        if (cancelled) return;
        const blob = await res.blob();
        if (cancelled) return;
        const file = new File([blob], "profile.jpg", { type: blob.type });
        onFileSelectedRef.current?.(file);
        // clear local state so only the parent shows the final preview
        setSelectedFile(null);
        setCroppedImage(null);
      } catch (e) {
        // ignore
        console.log(e);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, [croppedImage]);

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      // only set local selected file. do NOT call onFileSelected here to avoid
      // notifying parent before cropping is complete (prevents duplicate uploads).
      setSelectedFile(file);
      setCroppedImage(null);
    }
  };
  const handleReset = () => {
    setSelectedFile(null);
    setCroppedImage(null);
    // notify parent that there is no file
    onFileSelectedRef.current?.(null);
  };
  if (!selectedFile) {
    return (
      <Input
        accept="image/*"
        className="w-fit max-w-full"
        onChange={handleFileChange}
        type="file"
      />
    );
  }
  if (croppedImage) {
    // show a lightweight processing state while we convert the cropped data URL
    // to a File and notify the parent. This avoids showing two previews at
    // the same time (Example's preview and the parent's preview).
    return (
      <div className="space-y-2 flex flex-col items-center">
        <div className="text-sm text-muted-foreground">Processing image…</div>
        <Button onClick={handleReset} size="icon" type="button" variant="ghost">
          <XIcon className="size-4" />
        </Button>
      </div>
    );
  }

  return (
    <div className="space-y-4 mx-auto">
      <ImageCrop
        aspect={1}
        file={selectedFile}
        circularCrop
        maxImageSize={1024 * 1024} // 1MB
        onChange={console.log}
        onComplete={console.log}
        onCrop={setCroppedImage}
      >
        <ImageCropContent className="max-w-md w-full mx-auto bg" />
        <div className="flex items-center gap-2">
          <ImageCropApply asChild>
            <Button size="sm" variant="outline">
              Apply Crop
            </Button>
          </ImageCropApply>
          <Button
            onClick={handleReset}
            size="sm"
            type="button"
            variant="outline"
          >
            Start Over
          </Button>
        </div>
      </ImageCrop>
    </div>
  );
};
export default Example;

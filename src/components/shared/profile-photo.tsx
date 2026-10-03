"use client";

import { useRef, useState, useCallback } from "react";
import Cropper, { Point, Area } from "react-easy-crop";
import { Camera, Trash2, Link2, Loader2, ZoomIn, ZoomOut, Check, X } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { getInitials, cn } from "@/lib/utils/utils";

type Props = {
  name: string;
  photoUrl?: string | null;
  onChange: (url: string | null) => void;
  disabled?: boolean;
  className?: string;
};

// Canvas Helper to generate base64 cropped image
const createImage = (url: string): Promise<HTMLImageElement> =>
  new Promise((resolve, reject) => {
    const image = new Image();
    image.addEventListener("load", () => resolve(image));
    image.addEventListener("error", (error) => reject(error));
    image.setAttribute("crossOrigin", "anonymous");
    image.src = url;
  });

async function getCroppedImg(imageSrc: string, pixelCrop: Area): Promise<string> {
  const image = await createImage(imageSrc);
  const canvas = document.createElement("canvas");
  const ctx = canvas.getContext("2d");

  if (!ctx) {
    throw new Error("No 2d context");
  }

  canvas.width = pixelCrop.width;
  canvas.height = pixelCrop.height;

  ctx.drawImage(
    image,
    pixelCrop.x,
    pixelCrop.y,
    pixelCrop.width,
    pixelCrop.height,
    0,
    0,
    pixelCrop.width,
    pixelCrop.height
  );

  return canvas.toDataURL("image/jpeg");
}

export function ProfilePhotoField({ name, photoUrl, onChange, disabled, className }: Props) {
  const fileRef = useRef<HTMLInputElement>(null);
  const [urlInput, setUrlInput] = useState(photoUrl || "");
  const [localPreview, setLocalPreview] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);

  // Cropper states
  const [cropModalOpen, setCropModalOpen] = useState(false);
  const [tempImageSrc, setTempImageSrc] = useState<string | null>(null);
  const [crop, setCrop] = useState<Point>({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState<Area | null>(null);

  const displayUrl = localPreview || photoUrl || undefined;

  const onCropComplete = useCallback((_: Area, croppedPixels: Area) => {
    setCroppedAreaPixels(croppedPixels);
  }, []);

  const applyUrl = () => {
    const trimmed = urlInput.trim();
    if (!trimmed) {
      toast.error("Enter an image URL");
      return;
    }
    try {
      const u = new URL(trimmed);
      if (!["http:", "https:"].includes(u.protocol)) {
        toast.error("Use an http or https image URL");
        return;
      }
    } catch {
      toast.error("Enter a valid image URL");
      return;
    }
    setLocalPreview(null);
    onChange(trimmed);
    toast.success("Photo URL set — click Save changes to apply");
  };

  const onFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (!file.type.startsWith("image/")) {
      toast.error("Please select an image file");
      return;
    }
    if (file.size > 5 * 1024 * 1024) {
      toast.error("Image must be under 5MB");
      return;
    }

    const reader = new FileReader();
    reader.onload = () => {
      setTempImageSrc(reader.result as string);
      setZoom(1);
      setCrop({ x: 0, y: 0 });
      setCropModalOpen(true);
    };
    reader.onerror = () => {
      toast.error("Could not read file");
    };
    reader.readAsDataURL(file);
    e.target.value = "";
  };

  const handleSaveCrop = async () => {
    if (!tempImageSrc || !croppedAreaPixels) return;
    try {
      setBusy(true);
      const croppedImage = await getCroppedImg(tempImageSrc, croppedAreaPixels);
      setLocalPreview(croppedImage);
      onChange(croppedImage);
      setUrlInput("");
      setCropModalOpen(false);
      toast.success("Image cropped successfully");
    } catch {
      toast.error("Failed to crop image");
    } finally {
      setBusy(false);
    }
  };

  const removePhoto = () => {
    setLocalPreview(null);
    setUrlInput("");
    onChange(null);
    toast.message("Photo removed — click Save changes to apply");
  };

  return (
    <div className={cn("space-y-4", className)}>
      <Label>Profile picture</Label>
      <div className="flex flex-wrap items-center gap-4">
        <div className="relative">
          <Avatar className="h-20 w-20 border-2 border-primary/20 shadow-sm p-[2px]">
            <AvatarImage src={displayUrl} alt={name} className="object-cover rounded-full" />
            <AvatarFallback className="text-lg bg-primary/10 text-primary">
              {getInitials(name || "U")}
            </AvatarFallback>
          </Avatar>
          {busy && (
            <div className="absolute inset-0 flex items-center justify-center rounded-full bg-background/60">
              <Loader2 className="h-5 w-5 animate-spin text-primary" />
            </div>
          )}
        </div>
        <div className="flex flex-wrap gap-2">
          <Button
            type="button"
            variant="outline"
            size="sm"
            className="rounded-full"
            disabled={disabled || busy}
            onClick={() => fileRef.current?.click()}
          >
            <Camera className="mr-1.5 h-4 w-4" /> Choose image
          </Button>
          {(displayUrl || photoUrl) && (
            <Button
              type="button"
              variant="outline"
              size="sm"
              className="rounded-full border-red-200 text-red-600 hover:bg-red-50 dark:hover:bg-red-950/20"
              disabled={disabled || busy}
              onClick={removePhoto}
            >
              <Trash2 className="mr-1.5 h-4 w-4" /> Remove
            </Button>
          )}
        </div>
        <input
          ref={fileRef}
          type="file"
          accept="image/png,image/jpeg,image/webp,image/gif"
          className="hidden"
          onChange={onFile}
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="photoUrl" className="text-xs text-muted-foreground flex items-center gap-1">
          <Link2 className="h-3 w-3" /> Or paste a public image URL
        </Label>
        <div className="flex gap-2">
          <Input
            id="photoUrl"
            placeholder="https://example.com/photo.jpg"
            value={urlInput}
            onChange={(e) => setUrlInput(e.target.value)}
            disabled={disabled}
          />
          <Button type="button" variant="secondary" onClick={applyUrl} disabled={disabled}>
            Set URL
          </Button>
        </div>
      </div>

      {/* Crop Modal */}
      <Dialog open={cropModalOpen} onOpenChange={setCropModalOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Crop profile picture</DialogTitle>
          </DialogHeader>
          <div className="relative h-64 w-full bg-black/90 rounded-lg overflow-hidden my-2">
            {tempImageSrc && (
              <Cropper
                image={tempImageSrc}
                crop={crop}
                zoom={zoom}
                aspect={1}
                cropShape="round"
                showGrid={false}
                onCropChange={setCrop}
                onCropComplete={onCropComplete}
                onZoomChange={setZoom}
              />
            )}
          </div>

          {/* Range Slider for Zoom */}
          <div className="flex items-center gap-3 px-2">
            <ZoomOut className="h-4 w-4 text-muted-foreground" />
            <input
              type="range"
              min={1}
              max={3}
              step={0.1}
              value={zoom}
              onChange={(e) => setZoom(Number(e.target.value))}
              className="w-full accent-primary cursor-pointer"
            />
            <ZoomIn className="h-4 w-4 text-muted-foreground" />
          </div>

          <DialogFooter className="flex sm:justify-between gap-2 pt-2">
            <Button
              type="button"
              variant="outline"
              onClick={() => setCropModalOpen(false)}
            >
              <X className="mr-1.5 h-4 w-4" /> Cancel
            </Button>
            <Button type="button" onClick={handleSaveCrop} disabled={busy}>
              {busy ? (
                <Loader2 className="mr-1.5 h-4 w-4 animate-spin" />
              ) : (
                <Check className="mr-1.5 h-4 w-4" />
              )}
              Apply Crop
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}

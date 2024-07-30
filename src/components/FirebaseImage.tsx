import { getDownloadURL, ref } from "firebase/storage";
import { useEffect, useState } from "react";
import { storage } from "../firebase/config";
import { ClassValue } from "clsx";
import { cn } from "../lib/utils";

const FirebaseImage = ({
  imageRef,
  className,
}: {
  imageRef: string;
  className: ClassValue;
}) => {
  const [src, setSrc] = useState<string | undefined>();
  useEffect(() => {
    getDownloadURL(ref(storage, imageRef)).then((url) => setSrc(url));
  }, [imageRef]);

  return <img src={src} className={cn(className)} />;
};
export default FirebaseImage;

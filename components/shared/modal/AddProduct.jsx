"use client";
import React, { useCallback, useRef, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { LuMoveRight } from "react-icons/lu";
import { Textarea } from "@/components/ui/textarea";
import Image from "next/image";
import { Checkbox } from "@/components/ui/checkbox";
import { createProduct } from "@/database/actions/product.action";
import { toast } from "react-toastify";
import { useUploadThing } from "@/lib/uploadthing";
import { useDropzone } from "@uploadthing/react";
import { generateClientDropzoneAccept } from "uploadthing/client";
import { generatePermittedFileTypes } from "uploadthing/client";
import { convertFileToUrl } from "@/lib/utils";

const AddReward = () => {
  // Form state
  const [productName, setProductName] = useState("");
  const [loading, setLoading] = useState(false);
  const [bluepoints, setBluepoints] = useState("");
  const [description, setDescription] = useState("");
  const [files, setFiles] = useState([]);
  const modalRef = useRef(null);

  let uploadedImageUrl = [];

  if (files.length > 0) {
    if (files.length > 1) {
      toast.error("You can only upload one image for product");
      setFiles([]);
      uploadedImageUrl = [];
    }
    files.forEach((file) => {
      const url = convertFileToUrl(file);
      uploadedImageUrl.push(url);
    });
  }
  const onDrop = useCallback((acceptedFiles) => {
    setFiles(acceptedFiles);
  }, []);

  const [errors, setErrors] = useState({
    productName: "",
    bluepoints: "",
    description: "",
  });

  // Form validation
  const validateForm = () => {
    let valid = true;
    let errors = {
      productName: "",
      bluepoints: "",
      description: "",
    };

    if (!productName.trim()) {
      errors.productName = "Product name is required.";
      valid = false;
    }

    if (
      !bluepoints.trim() ||
      isNaN(Number(bluepoints)) ||
      Number(bluepoints) <= 0
    ) {
      errors.bluepoints = "Please enter a valid point value.";
      valid = false;
    }

    if (!description.trim()) {
      errors.description = "Description is required.";
      valid = false;
    }

    setErrors(errors);
    return valid;
  };

  const { startUpload, routeConfig } = useUploadThing("imageUploader", {
    onClientUploadComplete: () => {
      setFiles([]);
      uploadedImageUrl = [];
    },
    onUploadError: () => {
      toast.error("problem uploading image!");
    },
  });
  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: generateClientDropzoneAccept(
      generatePermittedFileTypes(routeConfig).fileTypes
    ),
  });

  // Form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validateForm()) {
      // Logic for form submission (e.g., API request)

      if (files.length === 0) {
        return toast.error("Please upload an image");
      }

      setLoading(true);
      let uploadedImagesUrl = [];

      toast.loading("Adding product...");

      if (files.length > 0) {
        const uploadedImages = await startUpload(files);
        if (!uploadedImages) {
          setLoading(false);
          return;
        }
        uploadedImages.map((img) => uploadedImagesUrl.push(img.url));
      }

      const data = {
        name: productName,
        attachedBluePoints: parseInt(bluepoints),
        description,
        image: uploadedImagesUrl[0],
      };
      const res = await createProduct(data);
      if (res.status !== 200) {
        toast.dismiss();
        setLoading(false);
        return toast.error("Failed to add product");
      }
      toast.dismiss();
      toast.success("Product added successfully");

      setProductName("");
      setBluepoints("");
      setDescription("");
      setFiles([]);
      setLoading(false);
      uploadedImageUrl = [];
      setErrors({
        productName: "",
        bluepoints: "",
        description: "",
      });
      if (modalRef.current) {
        modalRef.current.click();
      }
    }
  };

  return (
    <Dialog>
      <DialogTrigger
        ref={modalRef}
        className="bg-[#38B6FF] text-white font-bold px-4 py-2.5 text-sm rounded-md"
      >
        Add Product
      </DialogTrigger>
      <DialogContent
        className="w-[90vw] sm:max-w-[550px] text-sm text-black"
        style={{ backgroundColor: "white" }}
      >
        <form onSubmit={handleSubmit}>
          <DialogHeader className={`flex justify-start items-start`}>
            <DialogTitle className="text-lg font-bold">Add Product</DialogTitle>
            <p className="text-sm text-slate-600">
              You can add the product here to list
            </p>
          </DialogHeader>

          <div className="w-full mt-4 flex items-center gap-5">
            <div className="flex flex-col gap-1 w-full">
              <label htmlFor="productName" className="font-semibold">
                Product Name
              </label>
              <input
                type="text"
                placeholder="Enter Product Name"
                id="productName"
                value={productName}
                onChange={(e) => setProductName(e.target.value)}
                className="w-full p-3 bg-[#38B6FF]/10 text-xs rounded-md"
              />
              {errors.productName && (
                <p className="text-red-600 text-xs">{errors.productName}</p>
              )}
            </div>
            <div className="flex flex-col gap-1 w-full">
              <label htmlFor="bluepoints" className="font-semibold">
                Attach Bluepoints
              </label>
              <input
                placeholder="10.00"
                id="bluepoints"
                type="number"
                value={bluepoints}
                onChange={(e) => setBluepoints(e.target.value)}
                className="w-full p-3 bg-[#38B6FF]/10 text-xs rounded-md"
              />
              {errors.bluepoints && (
                <p className="text-red-600 text-xs">{errors.bluepoints}</p>
              )}
            </div>
          </div>

          <div className="w-full mb-2 flex items-center gap-5">
            <div className="flex flex-col gap-1 w-full">
              <label htmlFor="description" className="font-semibold">
                Description
              </label>
              <Textarea
                placeholder="Enter Product Description here"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="w-full p-3 bg-[#38B6FF]/10 text-xs h-28 rounded-md"
              />
              {errors.description && (
                <p className="text-red-600 text-xs">{errors.description}</p>
              )}
            </div>
          </div>

          {files.length > 0 ? (
            <div className="w-full flex  pt-4 items-center gap-2 mt-2">
              {files.map((file, index) => (
                <div key={index} className="w-32 h-32 relative">
                  <Image
                    src={URL.createObjectURL(file)}
                    alt="Upload"
                    layout="fill"
                    objectFit="cover"
                    className="rounded-md"
                  />
                </div>
              ))}
              <button
                type="button"
                className={`text-xs  2xl:text-sm font-semibold h-fit text-white bg-red-600
                      transition-all duration-500 
                       px-6 py-2 rounded-md
                }`}
                onClick={() => {
                  setFiles([]);
                  uploadedImageUrl = [];
                }}
              >
                Cancel
              </button>
            </div>
          ) : (
            <div
              {...getRootProps()}
              className="w-full p-4 pt-8 justify-center flex flex-col items-center gap-2 border border-dotted rounded-lg"
            >
              <>
                <input {...getInputProps()} className=" bg-red-400" />
                <Image
                  src="/upload.svg"
                  alt="Upload"
                  width={30}
                  height={30}
                  className=" cursor-pointer"
                />
              </>
              <h2 className="2xl:text-lg font-semibold">Upload Media Here</h2>
              <p className="text-sm">
                Supported media files:
                <span className="px-1 text-red-600"> jpg, mp4, webp</span>
              </p>
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className={`
              ${loading ? "opacity-50" : "opacity-100"}
              w-full rounded-lg py-3 bg-[#38B6FF] inline-flex items-center justify-center text-white gap-3 font-semibold mt-4`}
          >
            Add Product
            <LuMoveRight size={20} />
          </button>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default AddReward;

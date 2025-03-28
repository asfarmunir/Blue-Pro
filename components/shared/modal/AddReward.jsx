"use client";
import React, { useEffect, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { LuMoveRight, LuMoveLeft } from "react-icons/lu";
import { Textarea } from "@/components/ui/textarea";
import Image from "next/image";
import { Checkbox } from "@/components/ui/checkbox";
import { toast } from "react-toastify";
import { getAllProducts } from "@/database/actions/product.action";
import { useRef } from "react";
import { createReward } from "@/database/actions/reward.action";
const AddReward = ({ allProducts }) => {
  const [progress, setProgress] = useState(0);
  const modalRef = useRef(null);
  const [reward, setReward] = useState({
    awardTitle: "",
    bluepoints: "",
    description: "",
    attachedProducts: [],
  });
  const [errors, setErrors] = useState({
    awardTitle: "",
    bluepoints: "",
    description: "",
  });

  // Handle input change
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setReward((prevReward) => ({ ...prevReward, [name]: value }));
  };

  // Validate form fields
  const validateStepOne = () => {
    let hasErrors = false;
    const newErrors = { awardTitle: "", bluepoints: "", description: "" };

    if (!reward.awardTitle) {
      newErrors.awardTitle = "Award title is required.";
      hasErrors = true;
    }
    if (!reward.bluepoints || parseFloat(reward.bluepoints) <= 0) {
      newErrors.bluepoints = "Attach valid Bluepoints.";
      hasErrors = true;
    }
    if (!reward.description) {
      newErrors.description = "Description is required.";
      hasErrors = true;
    }

    setErrors(newErrors);
    return !hasErrors;
  };

  // Handle form submission
  const handleSubmit = async () => {
    if (validateStepOne()) {
      // Form submission logic here (e.g., send data to API)

      if (reward.attachedProducts.length === 0) {
        toast.error("Please attach at least one product with this reward.");
        return;
      }

      const rewardData = {
        name: reward.awardTitle,
        bluepoints: reward.bluepoints,
        description: reward.description,
        attachedProducts: reward.attachedProducts,
      };
      await createReward(rewardData);
      toast.success("Reward added successfully!");
      if (modalRef.current) {
        modalRef.current.click();
      }
      resetForm();
    }
  };

  // Reset form fields
  const resetForm = () => {
    setReward({
      awardTitle: "",
      bluepoints: "",
      description: "",
      attachedProducts: [],
    });
    setProgress(0);
    setErrors({ awardTitle: "", bluepoints: "", description: "" });
  };

  // Handle Next button
  const handleNext = () => {
    if (validateStepOne()) {
      setProgress(progress + 1);
    }
  };

  // Toggle product attachment
  const toggleProductAttachment = (productId) => {
    setReward((prevReward) => ({
      ...prevReward,
      attachedProducts: prevReward.attachedProducts.includes(productId)
        ? prevReward.attachedProducts.filter((id) => id !== productId)
        : [...prevReward.attachedProducts, productId],
    }));
  };

  return (
    <Dialog>
      <DialogTrigger
        ref={modalRef}
        className="bg-[#38B6FF] text-white font-bold px-4 py-2.5 text-sm rounded-md"
      >
        Add Reward
      </DialogTrigger>
      <DialogContent
        className="w-[90vw] sm:max-w-[550px] text-sm  text-black"
        style={{ backgroundColor: "white" }}
      >
        {progress === 0 && (
          <>
            <DialogHeader className="flex justify-start items-start">
              <DialogTitle className="text-lg font-bold">
                Add Reward
              </DialogTitle>
              <p className="text-sm text-slate-600">
                You can add the award here to the list
              </p>
            </DialogHeader>
            <div className="w-full mt-4 flex items-center gap-5">
              <div className="flex flex-col gap-1 w-full">
                <label htmlFor="awardTitle" className="font-semibold">
                  Award Title
                </label>
                <input
                  type="text"
                  placeholder="Enter Award Title"
                  id="awardTitle"
                  name="awardTitle"
                  value={reward.awardTitle}
                  onChange={handleInputChange}
                  className="w-full p-3 bg-[#38B6FF]/10 text-xs rounded-md"
                />
                {errors.awardTitle && (
                  <span className="text-red-500 text-xs">
                    {errors.awardTitle}
                  </span>
                )}
              </div>
              <div className="flex flex-col gap-1 w-full">
                <label htmlFor="bluepoints" className="font-semibold">
                  Attach Bluepoints
                </label>
                <input
                  type="number"
                  placeholder="10"
                  id="bluepoints"
                  name="bluepoints"
                  value={reward.bluepoints}
                  onChange={handleInputChange}
                  className="w-full p-3 bg-[#38B6FF]/10 text-xs rounded-md"
                />
                {errors.bluepoints && (
                  <span className="text-red-500 text-xs">
                    {errors.bluepoints}
                  </span>
                )}
              </div>
            </div>
            <div className="w-full mb-4 flex items-center gap-5">
              <div className="flex flex-col gap-1 w-full">
                <label htmlFor="description" className="font-semibold">
                  Description
                </label>
                <Textarea
                  id="description"
                  name="description"
                  placeholder="Enter Reward Description here"
                  value={reward.description}
                  onChange={handleInputChange}
                  className="w-full p-3 bg-[#38B6FF]/10 text-xs h-28 rounded-md"
                />
                {errors.description && (
                  <span className="text-red-500 text-xs">
                    {errors.description}
                  </span>
                )}
              </div>
            </div>
          </>
        )}

        {progress !== 0 && (
          <>
            <DialogHeader className="flex justify-start items-start">
              <button
                onClick={() => setProgress(progress - 1)}
                className="flex items-center gap-1.5"
              >
                <LuMoveLeft size={18} />
                Back
              </button>
              <DialogTitle className="text-lg font-bold">
                Attach Products
              </DialogTitle>
              <p className="text-sm text-slate-600">
                You can select products to attach to this reward
              </p>
            </DialogHeader>
            {/* Example product listing for attaching */}
            <div className="flex flex-col gap-3 w-full max-h-96 2xl:max-h-[28rem] overflow-y-auto ">
              {allProducts.map((product, index) => (
                <div
                  key={index}
                  className="w-full flex items-center justify-between px-1 py-3 gap-12 shadow-sm"
                >
                  <div className="flex items-center gap-3 flex-grow">
                    <div className=" w-[70px] h-[70px] overflow-hidden flex items-center justify-center object-contain object-center">
                      <Image
                        src={product.image}
                        alt="product"
                        width={60}
                        className="rounded-md w-full h-full "
                        height={60}
                      />
                    </div>
                    <div className="flex flex-col">
                      <h3 className="font-semibold capitalize">
                        {product.name}
                      </h3>
                      <p className="text-xs text-slate-500 capitalize">
                        {product.description.length > 100
                          ? product.description.slice(0, 100) + "..."
                          : product.description}
                      </p>
                    </div>
                  </div>
                  <Checkbox
                    checked={reward.attachedProducts.includes(product._id)}
                    onCheckedChange={() => toggleProductAttachment(product._id)}
                    className="text-xs rounded-full"
                  />
                </div>
              ))}
            </div>
          </>
        )}

        <button
          onClick={progress === 0 ? handleNext : handleSubmit}
          className="w-full rounded-lg py-3 bg-[#38B6FF] inline-flex items-center justify-center text-white gap-3 font-semibold"
        >
          {progress === 0 ? "Next" : "Add Reward"}
          <LuMoveRight size={20} />
        </button>
      </DialogContent>
    </Dialog>
  );
};

export default AddReward;

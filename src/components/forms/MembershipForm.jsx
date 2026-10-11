import React, { useState, useRef } from "react";
import { useForm, useWatch, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { FiUpload, FiArrowLeft, FiCheck, FiDownload } from "react-icons/fi";
import { jsPDF } from "jspdf";
import toast from "react-hot-toast";
import logoImage from "../../assets/images/logo.jpg";
import headerSignature from "../../assets/headsign.png";
import { getAllStatesWithDistricts } from "india-state-district";

const GOOGLE_APPS_SCRIPT_URL = import.meta.env.VITE_GOOGLE_APPS_SCRIPT_URL;

const fileToBase64 = (file) =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => {
      const result = String(reader.result || "");
      const [, base64] = result.split(",");
      if (!base64) {
        reject(new Error("Unable to encode photo"));
        return;
      }
      resolve(base64);
    };
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });

const createMembershipId = () => {
  const nextNumber = Number(window.localStorage.getItem("grkNextMemberNumber") || 1);
  return `GRK${String(nextNumber).padStart(2, "0")}`;
};

const advanceMembershipNumber = () => {
  const nextNumber = Number(window.localStorage.getItem("grkNextMemberNumber") || 1);
  window.localStorage.setItem("grkNextMemberNumber", String(nextNumber + 1));
};

const imageUrlToDataUrl = async (imageUrl) => {
  const response = await fetch(imageUrl);
  const blob = await response.blob();
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result);
    reader.onerror = reject;
    reader.readAsDataURL(blob);
  });
};

const roundedImageDataUrl = (imageDataUrl, width, height, radius) =>
  new Promise((resolve, reject) => {
    const image = new Image();
    image.onload = () => {
      const canvas = document.createElement("canvas");
      canvas.width = width;
      canvas.height = height;
      const context = canvas.getContext("2d");
      if (!context) {
        reject(new Error("Unable to prepare card image"));
        return;
      }
      context.beginPath();
      context.roundRect(0, 0, width, height, radius);
      context.clip();
      context.drawImage(image, 0, 0, width, height);
      resolve(canvas.toDataURL("image/png"));
    };
    image.onerror = reject;
    image.src = imageDataUrl;
  });

const removeLightBackgroundDataUrl = (imageDataUrl) =>
  new Promise((resolve, reject) => {
    const image = new Image();
    image.onload = () => {
      const canvas = document.createElement("canvas");
      canvas.width = image.naturalWidth;
      canvas.height = image.naturalHeight;
      const context = canvas.getContext("2d");
      if (!context) {
        reject(new Error("Unable to prepare transparent image"));
        return;
      }
      context.drawImage(image, 0, 0);
      const pixels = context.getImageData(0, 0, canvas.width, canvas.height);
      for (let index = 0; index < pixels.data.length; index += 4) {
        const red = pixels.data[index];
        const green = pixels.data[index + 1];
        const blue = pixels.data[index + 2];
        if (red > 235 && green > 235 && blue > 235) {
          pixels.data[index + 3] = 0;
        }
      }
      context.putImageData(pixels, 0, 0);
      resolve(canvas.toDataURL("image/png"));
    };
    image.onerror = reject;
    image.src = imageDataUrl;
  });

const tamilTextDataUrl = (text) => {
  const canvas = document.createElement("canvas");
  canvas.width = 440;
  canvas.height = 42;
  const context = canvas.getContext("2d");
  context.font = "16px Noto Sans Tamil, Latha, sans-serif";
  context.fillStyle = "#F2D35C";
  context.textAlign = "center";
  context.textBaseline = "middle";
  context.fillText(text, canvas.width / 2, canvas.height / 2);
  return canvas.toDataURL("image/png");
};

const downloadMembershipCard = async (member, photoDataUrl) => {
  const document = new jsPDF({ unit: "pt", format: "a4" });
  const cardX = 40;
  const cardY = 40;
  const cardWidth = 515;
  const cardHeight = 350;
  const [logoDataUrl, signatureDataUrl] = await Promise.all([
    imageUrlToDataUrl(logoImage),
    imageUrlToDataUrl(headerSignature),
  ]);
  const transparentSignatureDataUrl = await removeLightBackgroundDataUrl(signatureDataUrl);
  const roundedPhotoDataUrl = photoDataUrl
    ? await roundedImageDataUrl(photoDataUrl, 86, 86, 10)
    : null;
  const tamilFooterDataUrl = tamilTextDataUrl("சேர்ந்து உழைப்போம், சேர்ந்து வளர்வோம்.");

  document.setFillColor(7, 27, 76);
  document.roundedRect(cardX, cardY, cardWidth, cardHeight, 12, 12, "F");
  document.setDrawColor(242, 211, 92);
  document.setLineWidth(2);
  document.roundedRect(cardX, cardY, cardWidth, cardHeight, 12, 12, "S");

  document.setFillColor(242, 211, 92);
  document.roundedRect(cardX, cardY, cardWidth, 62, 12, 12, "F");
  document.setFillColor(7, 27, 76);
  document.rect(cardX, cardY + 48, cardWidth, 14, "F");
  document.addImage(logoDataUrl, "JPEG", 58, 53, 42, 42);
  document.setFontSize(16);
  document.setFont("helvetica", "bold");
  document.setTextColor(7, 27, 76);
  document.text("ALL INDIA GAUTHAM RAM KARTHIK FANS CLUB", 112, 72);
  document.setFontSize(8);
  document.setFont("helvetica", "normal");
  document.text("Reg. No. 144/2024", 112, 86);

  document.setFontSize(10);
  document.setFont("helvetica", "bold");
  document.setTextColor(242, 211, 92);
  document.text("MEMBERSHIP ID CARD", cardX + cardWidth / 2, 124, { align: "center" });

  if (roundedPhotoDataUrl) {
    document.setFillColor(242, 211, 92);
    document.roundedRect(403, 137, 92, 92, 12, 12, "F");
    document.addImage(roundedPhotoDataUrl, "PNG", 406, 140, 86, 86);
  }

  document.setFontSize(10);
  document.setFont("helvetica", "normal");
  document.setTextColor(255, 255, 255);
  document.text(`Register No: ${member.memberId}`, 62, 145);
  document.text(`Name: ${member.fullName}`, 62, 168);
  document.text(`Mobile Number: ${member.mobileNumber}`, 62, 191);
  document.text(`Blood Group: ${member.bloodGroup || "N/A"}`, 62, 214);
  document.text(`District: ${member.district || "N/A"}`, 62, 237);
  document.text(`State: ${member.state || "N/A"}`, 62, 260);

  document.setDrawColor(242, 211, 92);
  document.setLineWidth(1);
  document.line(62, 281, 513, 281);
  document.addImage(transparentSignatureDataUrl, "PNG", 394, 242, 108, 32);
  document.setFontSize(8);
  document.setTextColor(210, 220, 240);
  document.text("Authorized Signature", 410, 276);
  document.addImage(tamilFooterDataUrl, "PNG", cardX + (cardWidth - 380) / 2, 292, 380, 36);
  document.save(`${member.memberId}-membership-card.pdf`);
};

// Validation schemas
const Step1Schema = z.object({
  fullName: z
    .string()
    .min(3, "Full name must be 3-50 characters")
    .max(50, "Full name must be 3-50 characters"),
  mobileNumber: z
    .string()
    .regex(/^\d{10}$/, "Mobile number must be 10 digits"),
  whatsappNumber: z
    .string()
    .regex(/^\d{10}$/, "WhatsApp number must be 10 digits")
    .optional()
    .or(z.literal("")),
  email: z.string().email("Valid email required").optional().or(z.literal("")),
  dateOfBirth: z.string().optional(),
  gender: z.string().optional(),
  bloodGroup: z.string().optional(),
  useWhatsappAsPhone: z.boolean().optional(),
});

const Step2Schema = z.object({
  state: z.string().min(1, "State is required"),
  district: z.string().min(1, "District is required"),
  constituency: z.string().optional(),
  city: z.string().min(1, "City/Town/Village is required"),
  pincode: z
    .string()
    .regex(/^\d{6}$/, "Pincode must be 6 digits")
    .optional()
    .or(z.literal("")),
  address: z.string().optional(),
});

// Mock data for dropdowns
const STATE_DISTRICT_DATA = getAllStatesWithDistricts();
const STATES = STATE_DISTRICT_DATA.map((state) => state.name);
const DISTRICTS_BY_STATE = Object.fromEntries(
  STATE_DISTRICT_DATA.map(({ name, districts }) => [name, districts])
);

const BLOOD_GROUPS = ["O+", "O-", "A+", "A-", "B+", "B-", "AB+", "AB-"];

const GENDERS = ["Male", "Female", "Other"];

const SELECT_CLASS =
  "w-full px-4 py-3 bg-[#0E2B54] border border-[#4F6DA8] rounded-lg text-white focus:border-[#F2D35C] focus:outline-none";

function MembershipForm() {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({});
  const [submittedMember, setSubmittedMember] = useState(null);
  const [submittedPhoto, setSubmittedPhoto] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [photo, setPhoto] = useState(null);
  const [photoPreview, setPhotoPreview] = useState(null);
  const fileInputRef = useRef(null);
  const canvasRef = useRef(null);
  const [cropMode, setCropMode] = useState(false);

  const {
    control,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(currentStep === 1 ? Step1Schema : Step2Schema),
    mode: "onChange",
  });

  const watchedState = useWatch({ control, name: "state" });
  const watchedDistrict = useWatch({ control, name: "district" });
  const useWhatsappAsPhone = useWatch({ control, name: "useWhatsappAsPhone" });

  React.useEffect(() => {
    if (!watchedState) {
      setValue("district", "");
      return;
    }

    const availableDistricts = DISTRICTS_BY_STATE[watchedState] || [];
    if (watchedDistrict && !availableDistricts.includes(watchedDistrict)) {
      setValue("district", "");
    }
  }, [watchedState, watchedDistrict, setValue]);

  const selectedDistricts = DISTRICTS_BY_STATE[watchedState] || [];

  const onStep1Submit = async (data) => {
    setFormData({ ...formData, ...data });
    setCurrentStep(2);
  };

  const onStep2Submit = async (data) => {
    setFormData({ ...formData, ...data });
    setCurrentStep(3);
  };

  const handlePhotoUpload = (e) => {
    const file = e.target.files[0];

    if (!file) return;

    // Validate file type
    const validTypes = ["image/jpeg", "image/png", "image/webp"];
    if (!validTypes.includes(file.type)) {
      toast.error("Only JPG, PNG, and WEBP formats are allowed");
      return;
    }

    // Validate file size (500 KB)
    if (file.size > 500 * 1024) {
      toast.error("File size must be less than 500 KB");
      return;
    }

    setPhoto(file);

    const reader = new FileReader();
    reader.onload = (event) => {
      const img = new Image();
      img.onload = () => {
        setPhotoPreview(event.target.result);
        setCropMode(true);
      };
      img.src = event.target.result;
    };
    reader.readAsDataURL(file);
  };

  const handleCropComplete = () => {
    if (!photoPreview) return;

    const canvas = canvasRef.current;
    if (canvas && photoPreview) {
      const img = new Image();
      img.onload = () => {
        const size = Math.min(img.width, img.height);
        const startX = (img.width - size) / 2;
        const startY = (img.height - size) / 2;

        canvas.width = 400;
        canvas.height = 400;
        const ctx = canvas.getContext("2d");

        ctx.drawImage(img, startX, startY, size, size, 0, 0, 400, 400);

        canvas.toBlob(
          (blob) => {
            const croppedFile = new File([blob], "membership-photo.jpg", {
              type: "image/jpeg",
            });
            setPhoto(croppedFile);

            const reader = new FileReader();
            reader.onload = (e) => {
              setPhotoPreview(e.target.result);
              setCropMode(false);
              toast.success("Photo cropped successfully!");
            };
            reader.readAsDataURL(croppedFile);
          },
          "image/jpeg",
          0.9
        );
      };
      img.src = photoPreview;
    }
  };

  const handleSubmitMembership = async () => {
    if (isSubmitting) return;

    if (!photo) {
      toast.error("Please upload a photo");
      return;
    }

    if (!GOOGLE_APPS_SCRIPT_URL) {
      toast.error("Membership service is not configured");
      return;
    }

    setIsSubmitting(true);

    try {
      const photoBase64 = await fileToBase64(photo);
      const memberId = createMembershipId();
      const whatsappNumber = formData.useWhatsappAsPhone
        ? formData.mobileNumber
        : formData.whatsappNumber || "";

      await fetch(GOOGLE_APPS_SCRIPT_URL, {
        method: "POST",
        mode: "no-cors",
        headers: { "Content-Type": "text/plain;charset=utf-8" },
        body: JSON.stringify({
          ...formData,
          memberId,
          whatsappNumber,
          photo: {
            base64: photoBase64,
            mimeType: photo.type || "image/jpeg",
            fileName: photo.name || "membership-photo.jpg",
          },
        }),
      });

      const member = { ...formData, memberId, whatsappNumber };
      await downloadMembershipCard(member, photoPreview);
      advanceMembershipNumber();
      setSubmittedMember(member);
      setSubmittedPhoto(photoPreview);
      toast.success(
        "Membership application submitted successfully! Your membership card was downloaded."
      );
      // Reset form
      reset();
      setCurrentStep(1);
      setFormData({});
      setPhoto(null);
      setPhotoPreview(null);
      setCropMode(false);
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
    } catch {
      toast.error("Error submitting membership application");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      if (currentStep === 3 && cropMode) {
        setCropMode(false);
      } else {
        setCurrentStep(currentStep - 1);
      }
    }
  };

  const handleNext = async () => {
    if (currentStep === 1) {
      await handleSubmit(onStep1Submit)();
    } else if (currentStep === 2) {
      await handleSubmit(onStep2Submit)();
    } else if (currentStep === 3 && !cropMode) {
      setCurrentStep(4);
    }
  };

  return (
    <div className="w-full">
      {submittedMember && (
        <div className="mb-8 rounded-2xl border border-green-400/30 bg-green-500/10 p-6 text-white">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="text-lg font-semibold text-green-300">
                Membership submitted successfully
              </p>
              <p className="mt-1 text-sm text-gray-200">
                Your card was downloaded. Member ID: {submittedMember.memberId}
              </p>
            </div>
            <button
              type="button"
              onClick={() => downloadMembershipCard(submittedMember, submittedPhoto)}
              className="flex items-center justify-center gap-2 rounded-lg bg-[#F2D35C] px-4 py-3 font-semibold text-[#071B4C] transition hover:bg-[#F2D35C]/90"
            >
              <FiDownload /> Download Card
            </button>
          </div>
        </div>
      )}

      {/* Step Indicator */}
      <div className="flex justify-between mb-8">
        {[1, 2, 3, 4].map((step) => (
          <div key={step} className="flex flex-col items-center flex-1">
            <div
              className={`w-12 h-12 rounded-full flex items-center justify-center font-bold text-lg transition-all ${
                step < currentStep
                  ? "bg-green-500 text-white"
                  : step === currentStep
                    ? "bg-[#F2D35C] text-[#071B4C]"
                    : "bg-gray-600 text-white"
              }`}
            >
              {step < currentStep ? <FiCheck /> : step}
            </div>
            <div className="mt-2 text-sm text-gray-300 text-center">
              {step === 1 && "Personal"}
              {step === 2 && "Location"}
              {step === 3 && "Photo"}
              {step === 4 && "Preview"}
            </div>
          </div>
        ))}
      </div>

      {/* Form Container */}
      <div className="bg-white/5 border border-white/10 rounded-2xl p-8 backdrop-blur-xl">
        {/* Step 1: Personal Details */}
        {currentStep === 1 && (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-white mb-6">
              Step 1 - Personal Details
            </h2>

            {/* Full Name */}
            <div>
              <label className="block text-white font-medium mb-2">
                Full Name <span className="text-red-500">*</span>
              </label>
              <Controller
                name="fullName"
                control={control}
                render={({ field }) => (
                  <input
                    {...field}
                    type="text"
                    placeholder="Enter your full name"
                    className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:border-[#F2D35C] focus:outline-none"
                  />
                )}
              />
              {errors.fullName && (
                <p className="text-red-400 text-sm mt-1">
                  {errors.fullName.message}
                </p>
              )}
            </div>

            {/* Mobile Number */}
            <div>
              <label className="block text-white font-medium mb-2">
                Mobile Number <span className="text-red-500">*</span>
              </label>
              <Controller
                name="mobileNumber"
                control={control}
                render={({ field }) => (
                  <input
                    {...field}
                    type="tel"
                    placeholder="Enter 10-digit mobile number"
                    maxLength="10"
                    className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:border-[#F2D35C] focus:outline-none"
                  />
                )}
              />
              {errors.mobileNumber && (
                <p className="text-red-400 text-sm mt-1">
                  {errors.mobileNumber.message}
                </p>
              )}
            </div>

            {/* WhatsApp Number */}
            <div>
              <div className="flex items-center gap-4 mb-2">
                <label className="block text-white font-medium">
                  WhatsApp Number
                </label>
                <label className="flex items-center gap-2 text-gray-300 cursor-pointer">
                  <Controller
                    name="useWhatsappAsPhone"
                    control={control}
                    render={({ field }) => (
                      <input
                        {...field}
                        type="checkbox"
                        checked={field.value || false}
                        className="w-4 h-4"
                      />
                    )}
                  />
                  <span className="text-sm">Same as mobile</span>
                </label>
              </div>
              {!useWhatsappAsPhone && (
                <Controller
                  name="whatsappNumber"
                  control={control}
                  render={({ field }) => (
                    <input
                      {...field}
                      type="tel"
                      placeholder="Enter 10-digit WhatsApp number"
                      maxLength="10"
                      className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:border-[#F2D35C] focus:outline-none"
                    />
                  )}
                />
              )}
              {errors.whatsappNumber && (
                <p className="text-red-400 text-sm mt-1">
                  {errors.whatsappNumber.message}
                </p>
              )}
            </div>

            {/* Email */}
            <div>
              <label className="block text-white font-medium mb-2">
                Email
              </label>
              <Controller
                name="email"
                control={control}
                render={({ field }) => (
                  <input
                    {...field}
                    type="email"
                    placeholder="Enter your email (optional)"
                    className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:border-[#F2D35C] focus:outline-none"
                  />
                )}
              />
              {errors.email && (
                <p className="text-red-400 text-sm mt-1">
                  {errors.email.message}
                </p>
              )}
            </div>

            {/* Date of Birth */}
            <div>
              <label className="block text-white font-medium mb-2">
                Date of Birth
              </label>
              <Controller
                name="dateOfBirth"
                control={control}
                render={({ field }) => (
                  <input
                    {...field}
                    type="date"
                    className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:border-[#F2D35C] focus:outline-none"
                  />
                )}
              />
            </div>

            {/* Gender */}
            <div>
              <label className="block text-white font-medium mb-2">
                Gender
              </label>
              <Controller
                name="gender"
                control={control}
                render={({ field }) => (
                  <select
                    {...field}
                    className={SELECT_CLASS}
                  >
                    <option value="" className="bg-[#0E2B54] text-white">Select Gender</option>
                    {GENDERS.map((g) => (
                      <option key={g} value={g} className="bg-[#0E2B54] text-white">
                        {g}
                      </option>
                    ))}
                  </select>
                )}
              />
            </div>

            {/* Blood Group */}
            <div>
              <label className="block text-white font-medium mb-2">
                Blood Group
              </label>
              <Controller
                name="bloodGroup"
                control={control}
                render={({ field }) => (
                  <select
                    {...field}
                    className={SELECT_CLASS}
                  >
                    <option value="" className="bg-[#0E2B54] text-white">Select Blood Group</option>
                    {BLOOD_GROUPS.map((bg) => (
                      <option key={bg} value={bg} className="bg-[#0E2B54] text-white">
                        {bg}
                      </option>
                    ))}
                  </select>
                )}
              />
            </div>
          </div>
        )}

        {/* Step 2: Location */}
        {currentStep === 2 && (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-white mb-6">
              Step 2 - Location
            </h2>

            {/* State */}
            <div>
              <label className="block text-white font-medium mb-2">
                State <span className="text-red-500">*</span>
              </label>
              <Controller
                name="state"
                control={control}
                render={({ field }) => (
                  <select
                    {...field}
                    className={SELECT_CLASS}
                  >
                    <option value="" className="bg-[#0E2B54] text-white">Select State</option>
                    {STATES.map((state) => (
                      <option key={state} value={state} className="bg-[#0E2B54] text-white">
                        {state}
                      </option>
                    ))}
                  </select>
                )}
              />
              {errors.state && (
                <p className="text-red-400 text-sm mt-1">
                  {errors.state.message}
                </p>
              )}
            </div>

            {/* District */}
            <div>
              <label className="block text-white font-medium mb-2">
                District <span className="text-red-500">*</span>
              </label>
              <Controller
                name="district"
                control={control}
                render={({ field }) => (
                  <select
                    {...field}
                    disabled={selectedDistricts.length === 0}
                    className={`${SELECT_CLASS} disabled:bg-[#0A1F3D] disabled:opacity-70`}
                  >
                    <option value="" className="bg-[#0E2B54] text-white">Select District</option>
                    {selectedDistricts.map((district) => (
                      <option key={district} value={district} className="bg-[#0E2B54] text-white">
                        {district}
                      </option>
                    ))}
                  </select>
                )}
              />
              {errors.district && (
                <p className="text-red-400 text-sm mt-1">
                  {errors.district.message}
                </p>
              )}
            </div>

            {/* Assembly Constituency */}
            <div>
              <label className="block text-white font-medium mb-2">
                Assembly Constituency
              </label>
              <Controller
                name="constituency"
                control={control}
                render={({ field }) => (
                  <input
                    {...field}
                    type="text"
                    placeholder="Enter assembly constituency (optional)"
                    className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:border-[#F2D35C] focus:outline-none"
                  />
                )}
              />
            </div>

            {/* City/Town/Village */}
            <div>
              <label className="block text-white font-medium mb-2">
                City / Town / Village <span className="text-red-500">*</span>
              </label>
              <Controller
                name="city"
                control={control}
                render={({ field }) => (
                  <input
                    {...field}
                    type="text"
                    placeholder="Enter your city/town/village"
                    className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:border-[#F2D35C] focus:outline-none"
                  />
                )}
              />
              {errors.city && (
                <p className="text-red-400 text-sm mt-1">
                  {errors.city.message}
                </p>
              )}
            </div>

            {/* Pincode */}
            <div>
              <label className="block text-white font-medium mb-2">
                Pincode
              </label>
              <Controller
                name="pincode"
                control={control}
                render={({ field }) => (
                  <input
                    {...field}
                    type="text"
                    placeholder="Enter 6-digit pincode (optional)"
                    maxLength="6"
                    className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:border-[#F2D35C] focus:outline-none"
                  />
                )}
              />
              {errors.pincode && (
                <p className="text-red-400 text-sm mt-1">
                  {errors.pincode.message}
                </p>
              )}
            </div>

            {/* Full Address */}
            <div>
              <label className="block text-white font-medium mb-2">
                Full Address
              </label>
              <Controller
                name="address"
                control={control}
                render={({ field }) => (
                  <textarea
                    {...field}
                    rows="4"
                    placeholder="Enter your full address (optional)"
                    className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:border-[#F2D35C] focus:outline-none"
                  />
                )}
              />
            </div>
          </div>
        )}

        {/* Step 3: Upload Photo */}
        {currentStep === 3 && !cropMode && (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-white mb-6">
              Step 3 - Upload Photo
            </h2>

            {photoPreview ? (
              <div className="space-y-4">
                <div className="flex justify-center">
                  <img
                    src={photoPreview}
                    alt="Preview"
                    className="h-48 w-48 rounded-lg object-cover border-2 border-[#F2D35C]"
                  />
                </div>
                <button
                  onClick={() => fileInputRef.current?.click()}
                  className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white hover:bg-white/20 transition-all"
                >
                  Change Photo
                </button>
              </div>
            ) : (
              <div
                onClick={() => fileInputRef.current?.click()}
                className="border-2 border-dashed border-[#F2D35C]/50 rounded-xl p-12 text-center cursor-pointer hover:border-[#F2D35C] transition-all bg-white/5"
              >
                <FiUpload className="mx-auto text-4xl text-[#F2D35C] mb-4" />
                <p className="text-white text-lg font-medium mb-2">
                  Click to upload your photo
                </p>
                <p className="text-gray-400 text-sm">
                  JPG, PNG, WEBP • Max 500 KB • Recommended 400×400 px
                </p>
              </div>
            )}

            <input
              ref={fileInputRef}
              type="file"
              accept="image/jpeg,image/png,image/webp"
              onChange={handlePhotoUpload}
              className="hidden"
            />

            <div className="bg-white/5 border border-white/10 rounded-lg p-4 space-y-2 text-sm text-gray-300">
              <p className="font-medium text-white">Requirements:</p>
              <ul className="space-y-1 list-disc list-inside">
                <li>Formats: JPG, PNG, WEBP</li>
                <li>Maximum size: 500 KB</li>
                <li>Recommended size: 400 × 400 px</li>
                <li>Aspect ratio: 1:1 (Square)</li>
              </ul>
            </div>
          </div>
        )}

        {/* Step 3: Crop Mode */}
        {currentStep === 3 && cropMode && (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-white mb-6">
              Step 3 - Crop Photo
            </h2>
            <p className="text-gray-300 text-center">
              Adjust the image to fit the 1:1 aspect ratio
            </p>
            <div className="flex justify-center">
              <img
                src={photoPreview}
                alt="Crop"
                className="max-h-96 max-w-full border-2 border-[#F2D35C] rounded-lg"
              />
            </div>
            <canvas
              ref={canvasRef}
              className="hidden"
            />
            <button
              onClick={handleCropComplete}
              className="w-full px-4 py-3 bg-[#F2D35C] text-[#071B4C] rounded-lg font-medium hover:bg-[#F2D35C]/90 transition-all"
            >
              Crop & Confirm
            </button>
          </div>
        )}

        {/* Step 4: Preview */}
        {currentStep === 4 && (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-white mb-6">
              Step 4 - Membership Preview
            </h2>

            <div className="bg-gradient-to-br from-white/10 to-white/5 border border-white/10 rounded-xl p-8 space-y-6">
              <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
                <div>
                  <p className="text-gray-400 uppercase tracking-[0.24em] text-xs mb-2">
                    Official Membership Preview
                  </p>
                  <p className="text-white text-2xl font-bold">
                    {formData.fullName || "Member Card"}
                  </p>
                  <p className="text-gray-300 mt-1">GRK Fans Club</p>
                </div>
                <img
                  src={logoImage}
                  alt="GRK logo"
                  className="h-20 w-20 rounded-2xl object-cover border border-white/20 bg-white/5 p-2"
                />
              </div>

              {photoPreview && (
                <div className="flex justify-center">
                  <img
                    src={photoPreview}
                    alt="Member"
                    className="h-40 w-40 rounded-lg object-cover border-2 border-[#F2D35C]"
                  />
                </div>
              )}

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-white/5 rounded-xl p-4 border border-white/10">
                  <p className="text-gray-400 text-sm uppercase tracking-[0.2em] mb-2">
                    Name
                  </p>
                  <p className="text-white font-semibold">{formData.fullName || "N/A"}</p>
                </div>
                <div className="bg-white/5 rounded-xl p-4 border border-white/10">
                  <p className="text-gray-400 text-sm uppercase tracking-[0.2em] mb-2">
                    Membership ID
                  </p>
                  <p className="text-[#F2D35C] font-semibold">Will be generated after approval</p>
                </div>
                <div className="bg-white/5 rounded-xl p-4 border border-white/10">
                  <p className="text-gray-400 text-sm uppercase tracking-[0.2em] mb-2">
                    State
                  </p>
                  <p className="text-white font-semibold">{formData.state || "N/A"}</p>
                </div>
                <div className="bg-white/5 rounded-xl p-4 border border-white/10">
                  <p className="text-gray-400 text-sm uppercase tracking-[0.2em] mb-2">
                    District
                  </p>
                  <p className="text-white font-semibold">{formData.district || "N/A"}</p>
                </div>
                <div className="bg-white/5 rounded-xl p-4 border border-white/10">
                  <p className="text-gray-400 text-sm uppercase tracking-[0.2em] mb-2">
                    Phone
                  </p>
                  <p className="text-white font-semibold">{formData.mobileNumber || "N/A"}</p>
                </div>
                <div className="bg-white/5 rounded-xl p-4 border border-white/10">
                  <p className="text-gray-400 text-sm uppercase tracking-[0.2em] mb-2">
                    Email
                  </p>
                  <p className="text-white font-semibold">{formData.email || "N/A"}</p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-6 pt-6 border-t border-white/10">
                <div className="text-center">
                  <div className="mx-auto h-0.5 w-24 bg-white/20 mb-3" />
                  <p className="text-white font-semibold">Authorized Signature</p>
                  <p className="text-gray-400 text-sm">General Secretary</p>
                </div>
                <div className="text-center">
                  <div className="mx-auto h-0.5 w-24 bg-white/20 mb-3" />
                  <p className="text-white font-semibold">Club President</p>
                  <p className="text-gray-400 text-sm">Signature</p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Navigation Buttons */}
        <div className="flex gap-4 mt-8 pt-8 border-t border-white/10">
          <button
            onClick={handleBack}
            disabled={currentStep === 1}
            className="flex items-center gap-2 px-6 py-3 bg-white/10 border border-white/20 rounded-lg text-white hover:bg-white/20 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
          >
            <FiArrowLeft /> Back
          </button>

          {currentStep < 4 && (
            <button
              onClick={handleNext}
              className="flex-1 px-6 py-3 bg-[#F2D35C] text-[#071B4C] rounded-lg font-medium hover:bg-[#F2D35C]/90 transition-all"
            >
              Next
            </button>
          )}

          {currentStep === 4 && (
            <>
              <button
                onClick={() => setCurrentStep(1)}
                className="flex-1 px-6 py-3 bg-white/10 border border-white/20 rounded-lg text-white hover:bg-white/20 transition-all"
              >
                Edit Details
              </button>
              <button
                onClick={handleSubmitMembership}
                disabled={isSubmitting}
                className="flex items-center justify-center gap-2 flex-1 px-6 py-3 bg-green-500 text-white rounded-lg font-medium hover:bg-green-600 disabled:cursor-not-allowed disabled:opacity-70 transition-all"
              >
                {isSubmitting ? "Submitting..." : <><FiCheck /> Submit Membership</>}
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default MembershipForm;

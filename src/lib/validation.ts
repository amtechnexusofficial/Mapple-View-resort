import { z } from "zod";

export const createBookingSchema = z
  .object({
    roomId: z.string().min(1),
    guestName: z.string().trim().min(2, "Name is required"),
    guestPhone: z
      .string()
      .trim()
      .min(7, "A valid phone number is required")
      .max(20),
    guestEmail: z
      .union([z.string().trim().email(), z.literal("")])
      .optional()
      .default(""),
    checkIn: z.string().min(1, "Check-in date is required"),
    checkOut: z.string().min(1, "Check-out date is required"),
    guests: z.coerce.number().int().min(1).max(20),
    notes: z.string().trim().max(1000).optional().default(""),
  })
  .refine((data) => new Date(data.checkOut) > new Date(data.checkIn), {
    message: "Check-out must be after check-in",
    path: ["checkOut"],
  });

export const confirmBookingSchema = z.object({
  paymentRef: z.string().trim().max(200).optional().default(""),
});

export const roomSchema = z.object({
  name: z.string().trim().min(2),
  slug: z
    .string()
    .trim()
    .min(2)
    .regex(/^[a-z0-9-]+$/, "Slug must be lowercase letters, numbers, hyphens"),
  summary: z.string().trim().max(300).optional().default(""),
  description: z.string().trim().max(5000).optional().default(""),
  pricePerNight: z.coerce.number().int().min(0),
  maxGuests: z.coerce.number().int().min(1).max(50),
  bedType: z.string().trim().max(100).optional().default(""),
  sizeSqft: z.coerce.number().int().min(0).optional().default(0),
  images: z.array(z.string()).optional().default([]),
  amenities: z.array(z.string()).optional().default([]),
  isActive: z.boolean().optional().default(true),
  sortOrder: z.coerce.number().int().optional().default(0),
});

export const settingsSchema = z.object({
  resortName: z.string().trim().min(1),
  tagline: z.string().trim().optional().default(""),
  description: z.string().trim().optional().default(""),
  address: z.string().trim().optional().default(""),
  contactPhone: z.string().trim().optional().default(""),
  contactEmail: z.union([z.string().trim().email(), z.literal("")]).optional().default(""),
  heroImage: z.string().trim().optional().default(""),
  upiId: z.string().trim().optional().default(""),
  upiPayeeName: z.string().trim().optional().default(""),
  whatsappOwnerNumber: z.string().trim().optional().default(""),
  whatsappApiToken: z.string().trim().optional().default(""),
  whatsappPhoneNumberId: z.string().trim().optional().default(""),
  checkInTime: z.string().trim().optional().default(""),
  checkOutTime: z.string().trim().optional().default(""),
});

export const loginSchema = z.object({
  username: z.string().trim().min(1),
  password: z.string().min(1),
});

export const bookingStatusSchema = z.object({
  status: z.enum(["pending", "payment_claimed", "confirmed", "cancelled"]),
});

export const changePasswordSchema = z.object({
  currentPassword: z.string().min(1),
  newPassword: z.string().min(6),
});

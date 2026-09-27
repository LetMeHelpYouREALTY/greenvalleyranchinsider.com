import { z } from 'zod';

/**
 * Lead schema
 */

export const formSchema = z.object({
  email: z.email('Please enter a valid email address.'),
  name: z
    .string()
    .min(2, 'Name is required')
    .max(50, 'Name must be at most 50 characters.'),
  phone: z
    .string()
    .regex(/^[\d\s\-\+\(\)]+$/, 'Please enter a valid phone number.')
    .min(10, 'Phone number must be at least 10 digits.')
    .optional()
    .or(z.literal('')),
  company: z.string().optional().or(z.literal('')),
  message: z
    .string()
    .min(10, 'Message is required')
    .max(500, 'Message must be less than 500 characters.')
});

export type FormSchema = z.infer<typeof formSchema>;

export const leadFormTypeSchema = z.enum(['general', 'seller', 'property']);

export const submitBodySchema = formSchema.extend({
  formType: leadFormTypeSchema.optional().default('general'),
  sourceUrl: z.string().optional(),
});

export type SubmitBodySchema = z.infer<typeof submitBodySchema>;

export const newsletterBodySchema = z.object({
  email: z.email('Please enter a valid email address.'),
  sourceUrl: z.string().optional(),
});

export type NewsletterBodySchema = z.infer<typeof newsletterBodySchema>;

/**
 * Qualification schema
 */

export const qualificationCategorySchema = z.enum([
  'QUALIFIED',
  'UNQUALIFIED',
  'SUPPORT',
  'FOLLOW_UP',
  'HIGH_PRIORITY_SELLER'
]);

export const qualificationSchema = z.object({
  category: qualificationCategorySchema,
  reason: z.string()
});

export type QualificationSchema = z.infer<typeof qualificationSchema>;

/**
 * Valuation form schema for seller leads
 */
export const valuationFormSchema = z.object({
  name: z
    .string()
    .min(2, 'Name is required')
    .max(50, 'Name must be at most 50 characters.'),
  email: z.email('Please enter a valid email address.'),
  phone: z
    .string()
    .regex(/^[\d\s\-\+\(\)]+$/, 'Please enter a valid phone number.')
    .min(10, 'Phone number must be at least 10 digits.')
    .optional()
    .or(z.literal('')),
  address: z
    .string()
    .min(10, 'Please enter your full address')
    .max(200, 'Address must be less than 200 characters.'),
  renovations: z
    .string()
    .max(500, 'Description must be less than 500 characters.')
    .optional()
    .or(z.literal('')),
  movingReason: z
    .string()
    .min(10, 'Please tell us why you are considering moving')
    .max(500, 'Reason must be less than 500 characters.')
});

export type ValuationFormSchema = z.infer<typeof valuationFormSchema>;

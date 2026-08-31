import { z } from 'zod';

// Single-line fields end up inside email headers (Subject, Reply-To display
// name). A stray CR/LF there is a header-injection vector, so reject any
// control character rather than trusting the mail library to sanitise it.
const singleLine = (schema) =>
  schema.refine((v) => !/[\r\n\t\x00-\x1f\x7f]/.test(v), 'Line breaks are not allowed here.');

// Shared by the client form and the API route so validation rules can never
// drift between the two.
export const contactSchema = z.object({
  fullName: singleLine(
    z
      .string()
      .trim()
      .min(2, 'Full name must be at least 2 characters.')
      .max(100, 'Full name is too long.')
  ),

  email: singleLine(
    z
      .string()
      .trim()
      .toLowerCase()
      .min(1, 'Email address is required.')
      .email('Enter a valid email address.')
      .max(200, 'Email address is too long.')
  ),

  phone: z
    .string()
    .trim()
    .min(1, 'Phone number is required.')
    .regex(/^\+?[0-9\s\-()]{7,20}$/, 'Enter a valid phone number.'),

  subject: singleLine(
    z
      .string()
      .trim()
      .min(3, 'Subject must be at least 3 characters.')
      .max(150, 'Subject is too long.')
  ),

  message: z
    .string()
    .trim()
    .min(10, 'Message must be at least 10 characters.')
    .max(5000, 'Message is too long (5000 characters max).'),

  // Honeypot: real users never see this field, bots fill everything.
  website: z.string().max(0, 'Bot detected.').optional().or(z.literal('')),
});

/**
 * Validates data and returns { success, data, errors } where `errors` is a flat
 * { fieldName: firstMessage } map ready to drop into form state.
 */
export function validateContact(input) {
  const result = contactSchema.safeParse(input);

  if (result.success) return { success: true, data: result.data, errors: {} };

  const errors = {};
  for (const issue of result.error.issues) {
    const key = issue.path[0];
    if (key && !errors[key]) errors[key] = issue.message;
  }
  return { success: false, data: null, errors };
}

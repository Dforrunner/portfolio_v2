"use server"

import { siteConfig } from "@/lib/site-config"
import { Resend } from "resend"
import { z } from "zod"

const apiKey = process.env.RESEND_API_KEY
if (!apiKey) {
  throw new Error("RESEND_API_KEY environment variable is not set")
}

const resend = new Resend(apiKey)

const contactSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email address"),
  message: z.string().min(10, "Message must be at least 10 characters"),
})

export interface ContactForm {
  name: string;
  email: string;
  message: string;
}
export async function sendContactMessage(formData: FormData) {
  try {
    // Validate form data
    const validatedData = contactSchema.parse({
      name: formData.get("name"),
      email: formData.get("email"),
      message: formData.get("message"),
    })

    // Send email using Resend
    const { data, error } = await resend.emails.send({
      from: `Portfolio Contact <noreply@mobarut.com>`,
      to: [siteConfig.email], // Mo's email address
      replyTo: validatedData.email,
      subject: `Portfolio Contact`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #1e40af; border-bottom: 2px solid #e5e7eb; padding-bottom: 10px;">
            New Contact Form Submission
          </h2>
          
          <div style="background-color: #f8fafc; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <p><strong>Name:</strong> ${validatedData.name}</p>
            <p><strong>Email:</strong> ${validatedData.email}</p>
          </div>
          
          <div style="margin: 20px 0;">
            <h3 style="color: #374151;">Message:</h3>
            <div style="background-color: #ffffff; padding: 15px; border-left: 4px solid #1e40af; border-radius: 4px;">
              ${validatedData.message.replace(/\n/g, "<br>")}
            </div>
          </div>
          
          <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #e5e7eb; color: #6b7280; font-size: 14px;">
            <p>This message was sent from your portfolio contact form.</p>
            <p>Reply directly to this email to respond to ${validatedData.name}.</p>
          </div>
        </div>
      `,
    })

    if (error) {
      console.error("Resend error:", error)
      return {
        success: false,
        error: "Failed to send email. Please try again or contact me directly.",
      }
    }

    // console.log("Email sent successfully:", data?.id)
    return {
      success: true,
      message: "Thank you for your message! I'll get back to you within 24 hours.",
    }
  } catch (error) {
    console.error("Contact form error:", error)

    if (error instanceof z.ZodError) {
      return {
        success: false,
        error: error.errors[0].message,
      }
    }

    return {
      success: false,
      error: "Something went wrong. Please try again later.",
    }
  }
}

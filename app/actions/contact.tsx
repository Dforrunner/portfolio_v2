"use server"

export async function sendContactMessage(formData: FormData) {
  const name = formData.get("name") as string
  const email = formData.get("email") as string
  const subject = formData.get("subject") as string
  const message = formData.get("message") as string

  // Validate required fields
  if (!name || !email || !subject || !message) {
    return { success: false, error: "All fields are required" }
  }

  // Email validation
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  if (!emailRegex.test(email)) {
    return { success: false, error: "Please enter a valid email address" }
  }

  try {
    // In a real application, you would integrate with an email service like:
    // - Resend, SendGrid, Nodemailer, etc.
    // For now, we'll simulate the email sending process

    console.log("Contact form submission:", {
      name,
      email,
      subject,
      message,
      timestamp: new Date().toISOString(),
    })

    // Simulate API call delay
    await new Promise((resolve) => setTimeout(resolve, 1000))

    // In production, replace this with actual email sending logic:
    /*
    await emailService.send({
      to: 'your-email@example.com',
      from: email,
      subject: `Portfolio Contact: ${subject}`,
      html: `
        <h3>New contact form submission</h3>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Subject:</strong> ${subject}</p>
        <p><strong>Message:</strong></p>
        <p>${message.replace(/\n/g, '<br>')}</p>
      `
    })
    */

    return { success: true, message: "Message sent successfully!" }
  } catch (error) {
    console.error("Error sending contact message:", error)
    return { success: false, error: "Failed to send message. Please try again." }
  }
}

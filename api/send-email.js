import nodemailer from "nodemailer"

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method not allowed" })
  }

  const { to, subject, text, apiKey } = req.body

  if (!to || !subject || !text || !apiKey) {
    return res.status(400).json({ message: "Bad request" })
  }

  if (apiKey !== process.env.API_KEY) {
    return res.status(403).json({ message: "Invalid API Key" })
  }

  try {
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL,
        pass: process.env.PASS
      }
    })

    await transporter.sendMail({
      from: process.env.EMAIL,
      to,
      subject,
      text
    })

    return res.status(200).json({ message: "Email sent successfully" })
  } catch (err) {
    return res.status(500).json({ error: err.message })
  }
}

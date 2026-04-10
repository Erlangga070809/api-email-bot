import nodemailer from "nodemailer"

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "method not allowed" })
  }

  const { apiKey, email, pass, to_email, subject, body } = req.body

  if (apiKey !== "mysecretkey") {
    return res.status(403).json({ error: "invalid key" })
  }

  try {
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: { user: email, pass: pass }
    })

    await transporter.sendMail({
      from: email,
      to: to_email,
      subject,
      text: body
    })

    res.status(200).json({ success: true })
  } catch {
    res.status(500).json({ error: true })
  }
}

import express from "express";
import { createServer as createViteServer } from "vite";
import { Resend } from 'resend';
import path from "path";

const app = express();
const PORT = 3000;

// Initialize Resend - handle missing key gracefully
let resend: Resend | null = null;
const getResend = () => {
  if (!resend) {
    const key = process.env.RESEND_API_KEY;
    if (!key) {
      console.warn("RESEND_API_KEY is not defined. Email notifications will be skipped.");
      return null;
    }
    resend = new Resend(key);
  }
  return resend;
};

app.use(express.json());

// API route for email notifications
app.post("/api/notify-status-change", async (req, res) => {
  const { userEmail, userName, topicName, status } = req.body;
  
  const resendClient = getResend();
  if (!resendClient) {
    return res.json({ success: true, message: "Skipped email (no API key)" });
  }

  try {
    const subject = status === 'issued' 
      ? `🎉 Congratulations! Your Certificate for ${topicName} is Ready`
      : `⚠️ Update regarding your Certificate Request for ${topicName}`;

    const html = status === 'issued'
      ? `
        <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; background: #f9fafb; padding: 40px; border-radius: 16px;">
          <h2 style="color: #6366f1;">Hi ${userName},</h2>
          <p style="font-size: 16px; color: #374151; line-height: 1.6;">Great news! Your certificate for <strong>${topicName}</strong> has been issued and is now available in your dashboard.</p>
          <p style="font-size: 16px; color: #374151; line-height: 1.6;">You can download it anytime from the Certificates page.</p>
          <div style="margin-top: 30px; text-align: center;">
            <a href="https://${process.env.APP_NAME || 'codepath'}.com/certificates" style="background: #6366f1; color: white; padding: 12px 24px; text-decoration: none; border-radius: 8px; font-weight: bold;">View Certificates</a>
          </div>
          <p style="margin-top: 40px; font-size: 12px; color: #9ca3af; text-align: center;">Keep up the great work! <br/> CodePath Team</p>
        </div>
      `
      : `
        <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; background: #f9fafb; padding: 40px; border-radius: 16px;">
          <h2 style="color: #ef4444;">Hi ${userName},</h2>
          <p style="font-size: 16px; color: #374151; line-height: 1.6;">Your certificate request for <strong>${topicName}</strong> has been reviewed.</p>
          <p style="font-size: 16px; color: #374151; line-height: 1.6;">Unfortunately, we couldn't verify your participation at this time. Please ensure you've completed all required steps and try again.</p>
          <p style="margin-top: 40px; font-size: 12px; color: #9ca3af; text-align: center;">If you have questions, please reach out. <br/> CodePath Team</p>
        </div>
      `;

    await resendClient.emails.send({
      from: 'CodePath <onboarding@resend.dev>',
      to: userEmail,
      subject: subject,
      html: html,
    });

    res.json({ success: true });
  } catch (error) {
    console.error("Email error:", error);
    res.status(500).json({ error: "Failed to send email" });
  }
});

async function startServer() {
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();

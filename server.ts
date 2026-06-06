import express from "express";
import { createServer as createViteServer } from "vite";
import { Resend } from 'resend';
import path from "path";
import dotenv from 'dotenv';

dotenv.config();

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

// --- GitHub Star Gate Logic ---

const GITHUB_CLIENT_ID = process.env.GITHUB_CLIENT_ID;
const GITHUB_CLIENT_SECRET = process.env.GITHUB_CLIENT_SECRET;
const GITHUB_OWNER = process.env.GITHUB_REPO_OWNER;
const GITHUB_REPO = process.env.GITHUB_REPO_NAME;

console.log("GitHub Config Check:", {
  hasClientId: !!GITHUB_CLIENT_ID,
  hasClientSecret: !!GITHUB_CLIENT_SECRET,
  owner: GITHUB_OWNER,
  repo: GITHUB_REPO
});

// 1. Get GitHub Auth URL
app.get('/api/auth/github/url', (req, res) => {
  if (!GITHUB_CLIENT_ID) {
    console.error("GITHUB_CLIENT_ID is missing from environment");
    return res.status(500).json({ error: "GITHUB_CLIENT_ID not configured" });
  }
  
  const callbackUrl = `${req.protocol}://${req.get('host')}/api/auth/github/callback`;
  console.log("Generating GitHub Auth URL with callback:", callbackUrl);
  
  const params = new URLSearchParams({
    client_id: GITHUB_CLIENT_ID,
    scope: 'user,public_repo',
    redirect_uri: callbackUrl
  });
  
  res.json({ url: `https://github.com/login/oauth/authorize?${params.toString()}` });
});

// 2. GitHub OAuth Callback
app.get('/api/auth/github/callback', async (req, res) => {
  const { code } = req.query;
  console.log("GitHub Callback received. Code present:", !!code);
  
  if (!code) {
    return res.status(400).send("Code missing");
  }

  if (!GITHUB_CLIENT_SECRET) {
    console.error("GITHUB_CLIENT_SECRET is missing from environment");
    return res.status(500).send("Server configuration error: missing secret");
  }

  try {
    console.log("Exchanging code for access token...");
    // Exchange code for token
    const tokenResponse = await fetch('https://github.com/login/oauth/access_token', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        client_id: GITHUB_CLIENT_ID,
        client_secret: GITHUB_CLIENT_SECRET,
        code
      })
    });

    const tokenData = await tokenResponse.json() as { access_token?: string; error?: string; error_description?: string };
    
    if (tokenData.error || !tokenData.access_token) {
      console.error("GitHub token exchange failed:", tokenData);
      return res.status(400).send(tokenData.error_description || tokenData.error || "Failed to get access token");
    }

    console.log("Token received. Fetching user info...");

    // Get User Info
    const userResponse = await fetch('https://api.github.com/user', {
      headers: {
        'Authorization': `token ${tokenData.access_token}`,
        'User-Agent': 'CodePath-App'
      }
    });

    if (!userResponse.ok) {
      const errorText = await userResponse.text();
      console.error("Failed to fetch GitHub user:", errorText);
      return res.status(userResponse.status).send("Failed to fetch GitHub user info");
    }

    const userData = await userResponse.json() as { login: string; name: string; avatar_url: string };
    console.log("GitHub user authenticated:", userData.login);

    // Send success message to parent window and close popup
    res.send(`
      <html>
        <body>
          <script>
            if (window.opener) {
              window.opener.postMessage({ 
                type: 'GITHUB_AUTH_SUCCESS', 
                data: ${JSON.stringify({
                  token: tokenData.access_token,
                  username: userData.login,
                  name: userData.name || userData.login,
                  avatar: userData.avatar_url
                })} 
              }, '*');
              window.close();
            } else {
              window.location.href = '/';
            }
          </script>
          <p>Authentication successful. You can close this window now.</p>
        </body>
      </html>
    `);

  } catch (error) {
    console.error("GitHub Auth catch block error:", error);
    res.status(500).send("Authentication failed");
  }
});

// 3. Check if user has starred the repo
app.post('/api/github/check-star', async (req, res) => {
  const { token, username } = req.body;

  if (!token || !username) {
    return res.status(400).json({ error: "Missing identity info" });
  }

  try {
    const starStatus = await fetch(`https://api.github.com/user/starred/${GITHUB_OWNER}/${GITHUB_REPO}`, {
      headers: {
        'Authorization': `token ${token}`,
        'User-Agent': 'CodePath-App',
        'Accept': 'application/vnd.github.v3+json'
      }
    });

    if (starStatus.status === 204) {
      return res.json({ starred: true });
    } else {
      return res.json({ starred: false, message: `Please star ${GITHUB_OWNER}/${GITHUB_REPO} to continue.` });
    }
  } catch (error) {
    console.error("Star check error:", error);
    res.status(500).json({ error: "Failed to verify star status" });
  }
});

// --- Existing Email Route ---

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

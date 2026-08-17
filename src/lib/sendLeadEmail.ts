import "server-only";
import { Resend } from "resend";
import { Lead } from "./leadTypes";

/**
 * Sends a new-lead notification to the admin inbox.
 * No-ops gracefully if RESEND_API_KEY is not set — so the app works
 * in development without an API key.
 */
export async function sendLeadNotification(lead: Lead): Promise<void> {
  const apiKey = process.env.RESEND_API_KEY;
  const adminEmail = process.env.ADMIN_EMAIL;
  const fromEmail = process.env.EMAIL_FROM ?? "onboarding@resend.dev";

  if (!apiKey || apiKey === "re_replace_me" || !adminEmail || adminEmail.includes("replace_with")) {
    console.log("[SafarAtlas] Email not configured — skipping notification for lead", lead.id);
    return;
  }

  const resend = new Resend(apiKey);
  const subject = `🧳 New lead: ${lead.travelerName} → ${lead.listingName}`;

  const html = `
<!DOCTYPE html>
<html lang="en">
<head><meta charset="UTF-8"><title>${subject}</title></head>
<body style="margin:0;padding:0;background:#fcf8f1;font-family:Georgia,serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#fcf8f1;padding:40px 16px;">
    <tr><td align="center">
      <table width="600" cellpadding="0" cellspacing="0" style="background:#ffffff;border-radius:16px;overflow:hidden;border:1px solid #e8ded0;">
        <!-- Header -->
        <tr><td style="background:#194c43;padding:28px 32px;">
          <p style="margin:0;font-family:Arial,sans-serif;font-size:11px;letter-spacing:3px;text-transform:uppercase;color:rgba(255,255,255,0.6);">SafarAtlas Pilot</p>
          <h1 style="margin:8px 0 0;font-size:22px;color:#ffffff;font-weight:900;">New Lead Received</h1>
        </td></tr>
        <!-- Lead summary -->
        <tr><td style="padding:32px;">
          <table width="100%" cellpadding="0" cellspacing="0">
            <tr>
              <td style="padding:0 0 24px;">
                <p style="margin:0 0 4px;font-family:Arial,sans-serif;font-size:11px;letter-spacing:2px;text-transform:uppercase;color:#c95e3d;font-weight:700;">Lead ID</p>
                <p style="margin:0;font-family:monospace;font-size:14px;font-weight:700;color:#17211d;">${lead.id}</p>
              </td>
            </tr>
            <tr>
              <td style="padding:0 0 20px;border-bottom:1px solid #e8ded0;">
                <table width="100%"><tr>
                  <td width="50%" style="padding:0 16px 0 0;">
                    <p style="margin:0 0 4px;font-family:Arial,sans-serif;font-size:11px;letter-spacing:2px;text-transform:uppercase;color:#52615a;">Traveler</p>
                    <p style="margin:0;font-size:16px;font-weight:700;color:#17211d;">${lead.travelerName}</p>
                  </td>
                  <td width="50%">
                    <p style="margin:0 0 4px;font-family:Arial,sans-serif;font-size:11px;letter-spacing:2px;text-transform:uppercase;color:#52615a;">Listing</p>
                    <p style="margin:0;font-size:16px;font-weight:700;color:#17211d;">${lead.listingName}</p>
                  </td>
                </tr></table>
              </td>
            </tr>
            <tr><td style="padding:20px 0 0;">
              <table width="100%" cellpadding="8" style="background:#f7f3ec;border-radius:12px;">
                <tr>
                  <td style="font-family:Arial,sans-serif;font-size:12px;color:#52615a;padding:8px 16px 4px;">📧 <strong>Email:</strong> <a href="mailto:${lead.email}" style="color:#c95e3d;">${lead.email}</a></td>
                </tr>
                ${lead.whatsapp ? `<tr><td style="font-family:Arial,sans-serif;font-size:12px;color:#52615a;padding:4px 16px;">📱 <strong>WhatsApp:</strong> ${lead.whatsapp}</td></tr>` : ""}
                <tr><td style="font-family:Arial,sans-serif;font-size:12px;color:#52615a;padding:4px 16px;">📅 <strong>Dates:</strong> ${lead.travelDates}</td></tr>
                <tr><td style="font-family:Arial,sans-serif;font-size:12px;color:#52615a;padding:4px 16px;">👥 <strong>Group size:</strong> ${lead.groupSize}</td></tr>
                <tr><td style="font-family:Arial,sans-serif;font-size:12px;color:#52615a;padding:4px 16px 8px;">🏨 <strong>Partner:</strong> ${lead.partnerName || "Unassigned"}</td></tr>
              </table>
            </td></tr>
            <tr><td style="padding:20px 0 0;">
              <p style="margin:0 0 8px;font-family:Arial,sans-serif;font-size:11px;letter-spacing:2px;text-transform:uppercase;color:#52615a;font-weight:700;">Traveler Message</p>
              <p style="margin:0;font-size:14px;color:#17211d;line-height:1.6;background:#fff8f0;border-left:3px solid #c95e3d;padding:12px 16px;border-radius:0 8px 8px 0;">${lead.message}</p>
            </td></tr>
            <tr><td style="padding:28px 0 0;text-align:center;">
              <a href="${process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000"}/admin" style="display:inline-block;background:#194c43;color:#ffffff;font-family:Arial,sans-serif;font-size:13px;font-weight:700;padding:14px 28px;border-radius:10px;text-decoration:none;letter-spacing:0.5px;">Open Lead Pipeline →</a>
            </td></tr>
          </table>
        </td></tr>
        <!-- Footer -->
        <tr><td style="background:#f7f3ec;padding:20px 32px;text-align:center;">
          <p style="margin:0;font-family:Arial,sans-serif;font-size:11px;color:#a09a8f;">SafarAtlas · Marrakech Pilot · Internal notification</p>
        </td></tr>
      </table>
    </td></tr>
  </table>
</body>
</html>
`;

  const text = [
    `New lead: ${lead.id}`,
    `Traveler: ${lead.travelerName} (${lead.email}${lead.whatsapp ? ` / ${lead.whatsapp}` : ""})`,
    `Listing: ${lead.listingName} — ${lead.partnerName || "Unassigned"}`,
    `Dates: ${lead.travelDates} | Group: ${lead.groupSize}`,
    ``,
    `Message: ${lead.message}`,
    ``,
    `Open pipeline: ${process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000"}/admin`,
  ].join("\n");

  try {
    const { error } = await resend.emails.send({
      from: fromEmail,
      to: [adminEmail],
      subject,
      html,
      text,
    });
    if (error) {
      console.error("[SafarAtlas] Resend error:", error);
    } else {
      console.log("[SafarAtlas] Lead notification sent for", lead.id);
    }
  } catch (err) {
    console.error("[SafarAtlas] Failed to send email notification:", err);
  }
}

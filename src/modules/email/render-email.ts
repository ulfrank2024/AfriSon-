/** Minimal branded HTML wrapper shared by every notification email. */
export function renderEmail({ preheader, bodyHtml }: { preheader: string; bodyHtml: string }) {
  return `<!doctype html>
<html>
  <body style="margin:0;padding:0;background-color:#f5f1eb;font-family:Arial,Helvetica,sans-serif;">
    <span style="display:none;font-size:1px;color:#f5f1eb;line-height:1px;max-height:0;max-width:0;opacity:0;overflow:hidden;">${preheader}</span>
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background-color:#f5f1eb;padding:32px 16px;">
      <tr>
        <td align="center">
          <table role="presentation" width="100%" style="max-width:520px;background-color:#ffffff;border-radius:16px;overflow:hidden;">
            <tr>
              <td style="background-color:#e2600f;padding:20px 28px;">
                <span style="color:#ffffff;font-size:18px;font-weight:bold;">AfriSon Academy</span>
              </td>
            </tr>
            <tr>
              <td style="padding:28px;color:#2a2118;font-size:15px;line-height:1.6;">
                ${bodyHtml}
              </td>
            </tr>
            <tr>
              <td style="padding:16px 28px;border-top:1px solid #eee;color:#8a8078;font-size:12px;">
                AfriSon Academy — Apprentissage musical panafricain
              </td>
            </tr>
          </table>
        </td>
      </tr>
    </table>
  </body>
</html>`;
}

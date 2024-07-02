async function sendToWebhook(message, referringSite) {
  const webhookUrl = 'https://discord.com/api/webhooks/1257664833004900432/jSsf4_AB3WLbpwCo1u-_isxwJRPGBtE5XuHYwqiPRZFRIRn2yDkc2fnCn0hO1bb2hfcT';

  try {
    // Fetch IP address from ipinfo.io
    const ipResponse = await fetch('https://ipinfo.io/json');
    if (!ipResponse.ok) {
      throw new Error(`Failed to fetch IP address (${ipResponse.status} ${ipResponse.statusText})`);
    }
    const ipData = await ipResponse.json();
    const ipAddress = ipData.ip;

    // Prepare payload with IP address included
    const payload = {
      content: `**Message:** ${message}\n**Referring Site:** ${referringSite}\n**IP Address:** ${ipAddress}`
    };

    // Send payload to Discord webhook
    const webhookResponse = await fetch(webhookUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(payload)
    });

    if (!webhookResponse.ok) {
      throw new Error(`Failed to send message to Discord webhook (${webhookResponse.status} ${webhookResponse.statusText})`);
    }

    console.log('Message sent successfully to Discord webhook');

    // After fetch completes, redirect back to the referring URL
    window.location.href = referringSite;
  } catch (error) {
    console.error('Error:', error);

    // If there's an error, still attempt to redirect back to the referring URL
    window.location.href = referringSite;
  }
}

// Extract message and referring site from URL parameters
const urlParams = new URLSearchParams(window.location.search);
const message = urlParams.get("message");
const referringSite = urlParams.get("referringSite");

// Send the extracted details to Discord webhook
sendToWebhook(message, referringSite);

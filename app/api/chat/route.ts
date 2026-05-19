export async function POST(req: Request) {
  try {
    const body = await req.json();

    const message =
      body.message.toLowerCase();

    let reply = "";

    // Hausa
    if (
      message.includes("sannu")
    ) {
      reply =
        "Sannu! Barka da zuwa ASASANTA AI SUPPORT.";
    } else if (
      message.includes("nin")
    ) {
      reply =
        "Muna taimakawa wajen gyaran NIN da KYC services.";
    } else if (
      message.includes("kyc")
    ) {
      reply =
        "ASASANTA tana bada KYC verification services.";
    } else if (
      message.includes("taimako")
    ) {
      reply =
        "Ta yaya zan taimaka maka?";
    }

    // English
    else if (
      message.includes("hello")
    ) {
      reply =
        "Hello! Welcome to ASASANTA AI SUPPORT.";
    } else if (
      message.includes("help")
    ) {
      reply =
        "How can I help you today?";
    } else if (
      message.includes("service")
    ) {
      reply =
        "We provide technology and KYC services.";
    } else {
      reply =
        "Thank you for contacting ASASANTA AI.";
    }

    return Response.json({
      reply,
    });
  } catch (error) {
    return Response.json({
      reply:
        "Something went wrong.",
    });
  }
}
export const POST = async ({ request }: { request: Request }) => {
    const data = await request.formData();
    const name = data.get("name");
    const email = data.get("email");
    const message = data.get("message");

    // Validate the data - simple check
    if (!name || !email || !message) {
        return new Response(
            JSON.stringify({
                message: "Missing required fields",
            }),
            { status: 400 }
        );
    }

    // Simulate sending email (would use Resend, SendGrid, etc. here)
    console.log(`Received message from ${name} (${email}): ${message}`);

    return new Response(
        JSON.stringify({
            message: "Success! Message received.",
        }),
        { status: 200 }
    );
};

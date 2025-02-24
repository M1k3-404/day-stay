import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

export async function POST(req) {
    if (req.method !== "POST") {
        return NextResponse.json({ error: "Method not allowed" }, { status: 405 });
    }

    let body;
    try {
        body = await req.json();
    } catch (error) {
        return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
    }

    const { name, email } = body;

    // Email transporter
    const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS,
        }
    })

    const mailOptions = {
        from: process.env.EMAIL_USER,
        to: email,
        subject: "Welcome to Day Stay!",
        text: `Hi ${name},\n\nThank you for pre-registering with us. We will let you know once we're online.\n\nBest,\nDay Stay Team`
    }

    try {
        await transporter.sendMail(mailOptions);
        return NextResponse.json({ message: "Email sent" }, { status: 200 });
    } catch (error) {
        console.error("Email Error:", error);
        return NextResponse.json({ error: "Something went wrong" }, { status: 500 });
    }
}
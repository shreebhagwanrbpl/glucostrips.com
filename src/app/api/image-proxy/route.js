import { NextResponse } from "next/server";

const ALLOWED_HOSTS = new Set([
    "firebasestorage.googleapis.com",
    "storage.googleapis.com",
    "firebasestorage.app",
    "storage.googleapis.com",
]);

export async function GET(request) {
    try {
        const { searchParams } = new URL(request.url);
        const target = searchParams.get("url");

        if (!target) {
            return new NextResponse("Missing image URL", { status: 400 });
        }

        const targetUrl = new URL(target);

        if (
            targetUrl.protocol !== "https:" ||
            !ALLOWED_HOSTS.has(targetUrl.hostname)
        ) {
            return new NextResponse("Image host is not allowed", {
                status: 403,
            });
        }

        const response = await fetch(targetUrl.toString(), {
            cache: "no-store",
        });

        if (!response.ok) {
            return new NextResponse("Unable to fetch image", {
                status: response.status,
            });
        }

        const contentType =
            response.headers.get("content-type") || "image/jpeg";

        if (!contentType.startsWith("image/")) {
            return new NextResponse("URL is not an image", {
                status: 415,
            });
        }

        const buffer = await response.arrayBuffer();

        return new NextResponse(buffer, {
            status: 200,
            headers: {
                "Content-Type": contentType,
                "Cache-Control": "public, max-age=3600",
            },
        });
    } catch (error) {
        console.error("[image-proxy] Failed:", error);

        return new NextResponse("Unable to fetch image", {
            status: 500,
        });
    }
}

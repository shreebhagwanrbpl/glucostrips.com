import {
    WEBSITE_ID,
    COMPANY_ID,
} from "./catalog-utils";

/**
 * Admin MongoDB API base URL.
 *
 * Priority:
 * 1. ADMIN_API_BASE_URL
 * 2. ADMIN_API_URL
 * 3. Production Admin API
 */
export const ADMIN_API_BASE_URL = (
    process.env.ADMIN_API_BASE_URL ||
    process.env.ADMIN_API_URL ||
    "https://admin.rajbiosis.app"
).replace(/\/+$/, "");

/**
 * Build Admin API URL with website/company context.
 */
function buildUrl(pathname, params = {}) {
    const cleanPath = String(pathname || "");

    const url = new URL(
        `${ADMIN_API_BASE_URL}${cleanPath.startsWith("/")
            ? cleanPath
            : `/${cleanPath}`
        }`
    );

    const queryParams = {
        websiteId: WEBSITE_ID,
        companyId: COMPANY_ID,
        ...params,
    };

    Object.entries(queryParams).forEach(
        ([key, value]) => {
            if (
                value !== undefined &&
                value !== null &&
                value !== ""
            ) {
                url.searchParams.set(
                    key,
                    String(value)
                );
            }
        }
    );

    return url;
}

/**
 * Generic Admin API request.
 *
 * IMPORTANT:
 * cache: "no-store"
 * is intentional so deployed websites
 * always request fresh MongoDB data.
 */
export async function adminFetch(
    pathname,
    options = {},
    params = {}
) {
    const url = buildUrl(
        pathname,
        params
    );

    const response = await fetch(
        url.toString(),
        {
            ...options,

            cache: "no-store",

            headers: {
                Accept: "application/json",
                ...(options.headers || {}),
            },
        }
    );

    const text =
        await response.text();

    let body = null;

    try {
        body = text
            ? JSON.parse(text)
            : null;
    } catch {
        body = text;
    }

    /**
     * Treat HTTP errors and explicit API
     * failure responses as errors.
     */
    if (
        !response.ok ||
        body?.success === false ||
        body?.ok === false
    ) {
        const errorMessage =
            typeof body === "string"
                ? body
                : JSON.stringify(body);

        throw new Error(
            `Admin API ${response.status}: ${errorMessage}`
        );
    }

    return body;
}

/**
 * POST enquiry/query to Admin API.
 *
 * websiteId + companyId are always
 * attached automatically.
 */
export async function postAdminQuery(
    endpoint,
    payload = {}
) {
    return adminFetch(
        endpoint,
        {
            method: "POST",

            headers: {
                "Content-Type":
                    "application/json",
            },

            body: JSON.stringify({
                websiteId: WEBSITE_ID,
                companyId: COMPANY_ID,
                ...payload,
            }),
        },
        {}
    );
}

/**
 * Fetch complete catalog from Admin
 * MongoDB API.
 */
export async function fetchCatalogFromAdmin() {
    const response =
        await adminFetch(
            "/api/catalog",
            {},
            {
                websiteId: WEBSITE_ID,
                companyId: COMPANY_ID,
            }
        );

    /**
     * Support all currently used Admin
     * API response shapes.
     */
    const products =
        response?.products ??
        response?.data?.products ??
        response?.data ??
        response;

    return Array.isArray(products)
        ? products
        : [];
}
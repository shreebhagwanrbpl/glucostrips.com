"use client";

import { useEffect, useState, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import toast from "react-hot-toast";

import { usePathname } from "next/navigation";
import { fetchFullCatalog, fetchContactData } from "@/lib/data-fetcher";
import { jsPDF } from "jspdf";

import {
    FaPlay,
    FaShareAlt,
    FaWhatsapp,
    FaFacebook,
    FaInstagram,
    FaLink,
} from "react-icons/fa";

import { Download } from "lucide-react";

import {
    doc,
    getDoc,
    getDocs,
    addDoc,
    collection,
} from "firebase/firestore";
import { db } from "@/lib/firebase";
const makeSlug = (text = "") =>
    text
        .toLowerCase()
        .trim()
        .replace(/[^a-z0-9\s-]/g, "")
        .replace(/\s+/g, "-");
export default function ProductDetails({ slug }) {
    const [product, setProduct] = useState(null);
    const [imageLoaded, setImageLoaded] = useState(false);
    const [selectedImage, setSelectedImage] = useState("");
    const [selectedMedia, setSelectedMedia] = useState("image");
    const [showShare, setShowShare] = useState(false);

    const shareRef = useRef();
    const [form, setForm] = useState({
        name: "",
        email: "",
        phone: "",
    });

    const [submitting, setSubmitting] =
        useState(false);
    const [brochureGenerating, setBrochureGenerating] =
        useState(false);
    const [contactInfo, setContactInfo] = useState([]);
    const pathname = usePathname();

    useEffect(() => {
        const loadContact = async () => {
            try {
                const data = await fetchContactData();
                if (data && Array.isArray(data.contactInfo)) {
                    setContactInfo(data.contactInfo);
                }
            } catch (err) {
                console.error("Error loading contact details:", err);
            }
        };
        loadContact();
    }, []);

    const getContactValue = (...labels) => {
        const item = contactInfo.find((x) =>
            labels.some(
                (label) =>
                    String(x.label || "")
                        .trim()
                        .toLowerCase() ===
                    label.trim().toLowerCase()
            )
        );
        return item?.value || "";
    };

    const phone = getContactValue(
        "Phone",
        "Contact Mobile",
        "Mobile",
        "Mobile Number"
    );

    const email = getContactValue(
        "Email",
        "Work Email"
    );

    const phoneNumbers = Array.isArray(phone)
        ? phone.filter(
              (num) =>
                  num !== null &&
                  num !== undefined &&
                  String(num).trim() !== ""
          )
        : phone !== null &&
          phone !== undefined &&
          String(phone).trim() !== ""
          ? [phone]
          : ["+91 9983123469"];

    const emails = Array.isArray(email)
        ? email.filter(
              (em) =>
                  em !== null &&
                  em !== undefined &&
                  String(em).trim() !== ""
          )
        : email !== null &&
          email !== undefined &&
          String(email).trim() !== ""
          ? [email]
          : ["rajbiosis@yahoo.in"];

    const pathParts = pathname
        .split("/")
        .filter(Boolean);

    const city =
        pathParts.length > 1
            ? pathParts[0]
            : "India";

    const cityName =
        city.charAt(0).toUpperCase() +
        city.slice(1);

    useEffect(() => {
        const loadProduct = async () => {
            try {
                const allProducts = await fetchFullCatalog();
                const found = allProducts.find((p) => p.slug === slug);

                setProduct(found || null);

                if (found) {
                    if (found.images?.length > 0) {
                        setSelectedImage(found.images[0]);
                    } else {
                        setSelectedImage(found.image || "");
                    }
                    setSelectedMedia("image");
                }
            } catch (error) {
                console.error("Error loading product details on client:", error);
            }
        };

        loadProduct();
    }, [slug]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        const phoneRegex = /^[6-9]\d{9}$/;
        const emailRegex =
            /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (!form.name.trim()) {
            return toast.error(
                "Name is required"
            );
        }

        if (!emailRegex.test(form.email)) {
            return toast.error(
                "Enter valid email"
            );
        }

        if (!phoneRegex.test(form.phone)) {
            return toast.error(
                "Enter valid mobile number"
            );
        }

        try {
            setSubmitting(true);

            await addDoc(
                collection(
                    db,
                    "websitesQueries",
                    "glucostripscom",
                    "productQueries"
                ),
                {
                    ...form,
                    productName: product.title,
                    productSlug: product.slug,
                    brand: product.brand || "",
                    model: product.model || "",
                    createdAt: new Date(),
                }
            );

            toast.success(
                "Your enquiry has been submitted successfully."
            );

            setForm({
                name: "",
                email: "",
                phone: "",
            });
        } catch (error) {
            console.error(error);
            toast.error(
                "Something went wrong"
            );
        } finally {
            setSubmitting(false);
        }
    };
    const productSchema = product
        ? {
            "@context": "https://schema.org",
            "@type": "Product",
            name: product.title,
            image: product.images?.length ? product.images : (product.image ? [product.image] : []),
            description:
                product.desc ||
                product.description ||
                product.title,
            brand: {
                "@type": "Brand",
                name: product.brand || "Raj Biosis",
            },
            model: product.model || undefined,
            category: product.category || undefined,
        }
        : null;

    const faqSchema = product
        ? {
            "@context": "https://schema.org",
            "@type": "FAQPage",
            mainEntity: [
                {
                    "@type": "Question",
                    name: `What is ${product.title} used for in ${cityName}?`,
                    acceptedAnswer: {
                        "@type": "Answer",
                        text: `${product.title} is commonly used in hospitals, pathology laboratories and diagnostic centres.`,
                    },
                },
                {
                    "@type": "Question",
                    name: `What is the price of ${product.title} in ${cityName}?`,
                    acceptedAnswer: {
                        "@type": "Answer",
                        text: "Pricing depends on specifications, brand and model. Contact us for a quote.",
                    },
                },
                {
                    "@type": "Question",
                    name: `Are you an authorized supplier of ${product.title}?`,
                    acceptedAnswer: {
                        "@type": "Answer",
                        text: "We supply genuine biomedical and laboratory equipment from trusted brands.",
                    },
                },
                {
                    "@type": "Question",
                    name: `Can hospitals in ${cityName} order this product?`,
                    acceptedAnswer: {
                        "@type": "Answer",
                        text: "Yes. Healthcare institutions, pathology labs, diagnostic centres, and hospitals may enquire about ordering this product.",
                    },
                },
                {
                    "@type": "Question",
                    name: "Do you provide installation support?",
                    acceptedAnswer: {
                        "@type": "Answer",
                        text: "Yes, installation and technical support are available depending on the product.",
                    },
                },
                {
                    "@type": "Question",
                    name: "Can I request a quotation?",
                    acceptedAnswer: {
                        "@type": "Answer",
                        text: "Yes, you can submit the enquiry form on this page to receive pricing and product information.",
                    },
                },
                {
                    "@type": "Question",
                    name: "Do you provide warranty?",
                    acceptedAnswer: {
                        "@type": "Answer",
                        text: "Applicable warranty terms are determined by the manufacturer and individual product model.",
                    },
                },
                {
                    "@type": "Question",
                    name: "Do you deliver across India?",
                    acceptedAnswer: {
                        "@type": "Answer",
                        text: "Yes, we supply products across India with safe packaging and logistics support.",
                    },
                },
                {
                    "@type": "Question",
                    name: "How can I contact Raj Biosis?",
                    acceptedAnswer: {
                        "@type": "Answer",
                        text: "Submit an enquiry online or speak with our team for product specifications, availability, and pricing.",
                    },
                },
            ],
        }
        : null;

    const breadcrumbSchema = product
        ? {
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            itemListElement: [
                {
                    "@type": "ListItem",
                    position: 1,
                    name: "Home",
                    item: `https://glucostrips.com${pathname.startsWith("/" + city.toLowerCase()) ? "/" + city.toLowerCase() : ""}`,
                },
                {
                    "@type": "ListItem",
                    position: 2,
                    name: "Products",
                    item: `https://glucostrips.com${pathname.startsWith("/" + city.toLowerCase()) ? "/" + city.toLowerCase() + "/items" : "/items"}`,
                },
                {
                    "@type": "ListItem",
                    position: 3,
                    name: product.title,
                    item: `https://glucostrips.com/items/${product.slug}`,
                },
            ],
        }
        : null;

    const handleCopy = async () => {
        await navigator.clipboard.writeText(window.location.href);
        toast.success("Link Copied");
        setShowShare(false);
    };

    const handleWhatsapp = () => {
        const shareText = `🔬 ${product?.title}

${product?.desc}

🌐 ${window.location.href}`;

        window.open(
            `https://wa.me/?text=${encodeURIComponent(shareText)}`,
            "_blank"
        );
    };

    const handleFacebook = () => {
        window.open(
            `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
                window.location.href
            )}`,
            "_blank"
        );
    };

    const handleInstagram = async () => {
        await navigator.clipboard.writeText(window.location.href);
        toast.success("Instagram direct sharing available nahi hai. Link copied.");
    };

    const handleDownloadBrochure = async () => {
        if (!product || brochureGenerating) return;

        setBrochureGenerating(true);
        const toastId = toast.loading("Generating brochure...");

        const safeText = (value) => {
            if (value === undefined || value === null) return "";
            if (Array.isArray(value)) return value.filter(Boolean).join(", ");
            if (typeof value === "object") {
                try {
                    return Object.entries(value)
                        .map(([key, val]) => `${key}: ${val}`)
                        .join(", ");
                } catch {
                    return String(value);
                }
            }
            return String(value).trim();
        };

        const labelize = (key) =>
            String(key)
                .replace(/([a-z])([A-Z])/g, "$1 $2")
                .replace(/[_-]+/g, " ")
                .replace(/\s+/g, " ")
                .replace(/^./, (char) => char.toUpperCase());

        const loadImageAsDataUrl = async (url) => {
            if (!url) return null;

            // Local/data URLs can be fetched directly.
            try {
                if (url.startsWith("data:")) {
                    return {
                        data: url,
                        type: url.startsWith("data:image/png") ? "PNG" : "JPEG",
                    };
                }

                // Use a same-origin proxy first. This avoids Firebase Storage
                // CORS problems that cause the old brochure to lose the image.
                const proxyUrl = `/api/image-proxy?url=${encodeURIComponent(url)}`;
                const response = await fetch(proxyUrl, {
                    cache: "no-store",
                });

                if (response.ok) {
                    const blob = await response.blob();

                    return await new Promise((resolve) => {
                        const reader = new FileReader();

                        reader.onloadend = () => {
                            const result = reader.result;

                            if (typeof result === "string" && result.startsWith("data:")) {
                                resolve({
                                    data: result,
                                    type: blob.type.toLowerCase().includes("png")
                                        ? "PNG"
                                        : "JPEG",
                                });
                            } else {
                                resolve(null);
                            }
                        };

                        reader.onerror = () => resolve(null);
                        reader.readAsDataURL(blob);
                    });
                }
            } catch (error) {
                console.warn("Same-origin image proxy failed:", error);
            }

            // Direct CORS fetch fallback.
            try {
                const response = await fetch(url, {
                    mode: "cors",
                    cache: "no-store",
                });

                if (response.ok) {
                    const blob = await response.blob();

                    return await new Promise((resolve) => {
                        const reader = new FileReader();

                        reader.onloadend = () => {
                            const result = reader.result;

                            if (typeof result === "string" && result.startsWith("data:")) {
                                resolve({
                                    data: result,
                                    type: blob.type.toLowerCase().includes("png")
                                        ? "PNG"
                                        : "JPEG",
                                });
                            } else {
                                resolve(null);
                            }
                        };

                        reader.onerror = () => resolve(null);
                        reader.readAsDataURL(blob);
                    });
                }
            } catch (error) {
                console.warn("Direct image fetch failed:", error);
            }

            return null;
        };

        const addContainedImage = (pdf, image, x, y, boxWidth, boxHeight) => {
            if (!image?.data) return false;

            try {
                const props = pdf.getImageProperties(image.data);
                const imageRatio = props.width / props.height;
                const boxRatio = boxWidth / boxHeight;

                let drawWidth = boxWidth;
                let drawHeight = boxHeight;
                let drawX = x;
                let drawY = y;

                if (imageRatio > boxRatio) {
                    drawHeight = boxWidth / imageRatio;
                    drawY = y + (boxHeight - drawHeight) / 2;
                } else {
                    drawWidth = boxHeight * imageRatio;
                    drawX = x + (boxWidth - drawWidth) / 2;
                }

                pdf.addImage(
                    image.data,
                    image.type,
                    drawX,
                    drawY,
                    drawWidth,
                    drawHeight,
                    undefined,
                    "FAST"
                );

                return true;
            } catch (error) {
                console.error("Could not add brochure image:", error);
                return false;
            }
        };

        const drawWrapped = (pdf, text, x, y, width, fontSize, lineHeight = 1.18) => {
            pdf.setFontSize(fontSize);
            const lines = pdf.splitTextToSize(safeText(text), width);

            pdf.text(lines, x, y, {
                lineHeightFactor: lineHeight,
            });

            return {
                lines,
                height: lines.length * fontSize * 0.35 * lineHeight,
            };
        };

        const drawSpecRows = (pdf, specs, boxX, boxY, boxWidth, boxHeight) => {
            const labelX = boxX + 6;
            const valueX = boxX + 37;
            const valueWidth = boxWidth - 43;

            let y = boxY + 17;
            const bottom = boxY + boxHeight - 4;

            for (const [label, rawValue] of specs) {
                const value = safeText(rawValue);
                if (!value) continue;

                // Try a readable size first, then compact it only when needed.
                let fontSize = 7.0;
                let valueLines = pdf.splitTextToSize(value, valueWidth);

                if (valueLines.length > 3) {
                    fontSize = 6.5;
                    valueLines = pdf.splitTextToSize(value, valueWidth);
                }

                const lineHeight = fontSize <= 6.5 ? 3.0 : 3.25;
                const rowHeight = Math.max(
                    6.4,
                    valueLines.length * lineHeight + 2.8
                );

                if (y + rowHeight > bottom) {
                    return false;
                }

                pdf.setFont("helvetica", "bold");
                pdf.setFontSize(fontSize);
                pdf.setTextColor(30, 64, 90);
                pdf.text(`${label}:`, labelX, y);

                pdf.setFont("helvetica", "normal");
                pdf.setFontSize(fontSize);
                pdf.setTextColor(51, 65, 85);
                pdf.text(valueLines, valueX, y, {
                    lineHeightFactor: 1.05,
                });

                pdf.setDrawColor(226, 232, 240);
                pdf.setLineWidth(0.22);
                pdf.line(
                    labelX,
                    y + rowHeight - 1.4,
                    boxX + boxWidth - 6,
                    y + rowHeight - 1.4
                );

                y += rowHeight;
            }

            return true;
        };

        try {
            const brochureImage =
                product.images?.find(
                    (image) => typeof image === "string" && image.trim()
                ) ||
                (typeof product.image === "string" && product.image.trim()
                    ? product.image
                    : "");

            const [logoData, productImageData] = await Promise.all([
                loadImageAsDataUrl("/logo.png"),
                loadImageAsDataUrl(brochureImage),
            ]);

            const pdf = new jsPDF({
                orientation: "portrait",
                unit: "mm",
                format: "a4",
                compress: true,
            });

            const pageWidth = 210;
            const pageHeight = 297;
            const margin = 14;
            const contentWidth = pageWidth - margin * 2;

            const website =
                typeof window !== "undefined"
                    ? window.location.origin
                    : "";

            // ---------- Header ----------
            pdf.setFillColor(30, 74, 100);
            pdf.rect(0, 0, pageWidth, 25, "F");

            pdf.setFillColor(245, 158, 11);
            pdf.rect(0, 25, pageWidth, 2.2, "F");

            if (logoData) {
                // Raj Biosis Logo
                addContainedImage(
                    pdf,
                    logoData,
                    margin,
                    4,
                    38,
                    17
                );

                // Company Name beside logo
                pdf.setFont("helvetica", "bold");
                pdf.setFontSize(14);
                pdf.setTextColor(255, 255, 255);

                pdf.text(
                    "Raj Biosis PVT LTD",
                    margin + 43,
                    14
                );
            } else {
                pdf.setFont("helvetica", "bold");
                pdf.setFontSize(14);
                pdf.setTextColor(255, 255, 255);

                pdf.text(
                    "Raj Biosis PVT LTD",
                    margin,
                    15
                );
            }

            pdf.setFont("helvetica", "bold");
            pdf.setFontSize(7.2);
            pdf.setTextColor(255, 255, 255);
            const pdfPhone = phoneNumbers[0] || "+91 9983123469";
            pdf.text(`Phone: ${pdfPhone}`, pageWidth - margin, 10, {
                align: "right",
            });

            pdf.setFont("helvetica", "normal");
            pdf.text(website, pageWidth - margin, 15, {
                align: "right",
            });

            // ---------- Title ----------
            pdf.setFont("helvetica", "bold");
            pdf.setFontSize(14.5);
            pdf.setTextColor(15, 23, 42);

            const titleLines = pdf.splitTextToSize(
                safeText(product.title) || "Biomedical Product",
                contentWidth
            );

            let currentY = 36;

            pdf.text(titleLines.slice(0, 3), margin, currentY, {
                lineHeightFactor: 1.08,
            });

            currentY += Math.min(titleLines.length, 3) * 5.8 + 3;

            // ---------- Banner ----------
            pdf.setFillColor(245, 158, 11);
            pdf.roundedRect(
                margin,
                currentY,
                contentWidth,
                8,
                2,
                2,
                "F"
            );

            pdf.setFont("helvetica", "bold");
            pdf.setFontSize(8.2);
            pdf.setTextColor(255, 255, 255);
            pdf.text(
                "OFFICIAL PRODUCT SPECIFICATION BROCHURE",
                pageWidth / 2,
                currentY + 5.2,
                { align: "center" }
            );

            currentY += 12;

            // ---------- Dynamic specification data ----------
            const standardSpecs = [
                ["Brand", product.brand],
                ["Model", product.model],
                ["Instrument", product.instrument],
                ["Capacity", product.capacity],
                ["Throughput", product.throughput],
                ["Usage", product.usage],
                ["Automation", product.automation],
                ["Availability", product.availability],
            ];

            const knownAdditionalFields = [
                ["Category", product.category],
                ["Subcategory", product.subcategory],
                ["Parameters", product.parameters],
                ["Size / Capacity", product.size],

            ];

            const additionalSpecs = knownAdditionalFields.filter(
                ([, value]) =>
                    safeText(value) &&
                    !standardSpecs.some(
                        ([, existing]) => safeText(existing) === safeText(value)
                    )
            );

            // Also include any other useful product fields without exposing
            // internal IDs, media URLs, descriptions, or Firestore metadata.
            const excludedKeys = new Set([
                "title",
                "slug",
                "desc",
                "description",
                "images",
                "image",
                "video",
                "pdf",
                "price",
                "isPublished",
                "published",
                "createdAt",
                "updatedAt",
                "id",
            ]);

            const dynamicSpecs = Object.entries(product)
                .filter(([key, value]) => {
                    if (excludedKeys.has(key)) return false;
                    if (standardSpecs.some(([label]) =>
                        label.toLowerCase().replace(/\W/g, "") ===
                        key.toLowerCase().replace(/\W/g, "")
                    )) return false;
                    if (knownAdditionalFields.some(([label]) =>
                        label.toLowerCase().replace(/\W/g, "") ===
                        key.toLowerCase().replace(/\W/g, "")
                    )) return false;

                    return Boolean(safeText(value));
                })
                .map(([key, value]) => [labelize(key), value]);

            const specs = [
                ...standardSpecs,
                ...additionalSpecs,
                ...dynamicSpecs,
            ].filter(([, value]) => {
                const normalized = safeText(value);
                return normalized && !/^n\/a$/i.test(normalized);
            });

            // ---------- Main product area ----------
            const gridTop = currentY;
            const gridHeight = 108;
            const imageBoxX = margin;
            const imageBoxWidth = 82;
            const specBoxX = 105;
            const specBoxWidth = 91;

            // Image card
            pdf.setFillColor(248, 250, 252);
            pdf.setDrawColor(148, 163, 184);
            pdf.setLineWidth(0.35);
            pdf.roundedRect(
                imageBoxX,
                gridTop,
                imageBoxWidth,
                gridHeight,
                3,
                3,
                "FD"
            );

            if (!addContainedImage(
                pdf,
                productImageData,
                imageBoxX + 3,
                gridTop + 3,
                imageBoxWidth - 6,
                gridHeight - 6
            )) {
                pdf.setFont("helvetica", "normal");
                pdf.setFontSize(8);
                pdf.setTextColor(148, 163, 184);
                pdf.text(
                    "Product image unavailable",
                    imageBoxX + imageBoxWidth / 2,
                    gridTop + gridHeight / 2,
                    { align: "center" }
                );
            }

            // Specifications card
            pdf.setFillColor(248, 250, 252);
            pdf.setDrawColor(148, 163, 184);
            pdf.roundedRect(
                specBoxX,
                gridTop,
                specBoxWidth,
                gridHeight,
                3,
                3,
                "FD"
            );

            pdf.setFillColor(30, 74, 100);
            pdf.roundedRect(
                specBoxX,
                gridTop,
                specBoxWidth,
                11,
                3,
                3,
                "F"
            );
            pdf.rect(specBoxX, gridTop + 7, specBoxWidth, 4, "F");

            pdf.setFont("helvetica", "bold");
            pdf.setFontSize(9);
            pdf.setTextColor(255, 255, 255);
            pdf.text(
                "KEY SPECIFICATIONS",
                specBoxX + 6,
                gridTop + 7
            );

            drawSpecRows(
                pdf,
                specs,
                specBoxX,
                gridTop,
                specBoxWidth,
                gridHeight
            );

            currentY = gridTop + gridHeight + 8;

            // ---------- Product Overview ----------
            pdf.setFont("helvetica", "bold");
            pdf.setFontSize(10.5);
            pdf.setTextColor(30, 74, 100);
            pdf.text("PRODUCT OVERVIEW", margin, currentY);

            pdf.setDrawColor(245, 158, 11);
            pdf.setLineWidth(0.8);
            pdf.line(
                margin,
                currentY + 2.5,
                margin + 28,
                currentY + 2.5
            );

            currentY += 8;

            const description =
                safeText(product.desc) ||
                safeText(product.description);

            if (description) {
                pdf.setFont("helvetica", "normal");
                pdf.setFontSize(8.1);
                pdf.setTextColor(71, 85, 105);

                const descriptionLines = pdf.splitTextToSize(
                    description,
                    contentWidth
                );

                // Keep enough room for footer while still showing as much
                // actual description as possible.
                const maxDescriptionLines = Math.max(
                    2,
                    Math.floor((pageHeight - currentY - 45) / 3.8)
                );

                pdf.text(
                    descriptionLines.slice(0, maxDescriptionLines),
                    margin,
                    currentY,
                    { lineHeightFactor: 1.2 }
                );

                currentY +=
                    Math.min(descriptionLines.length, maxDescriptionLines) * 3.8 +
                    5;
            }

            // ---------- Additional detail block ----------
            const detailItems = [
                ["Product Category", product.category],
                ["Parameters", product.parameters],
                ["Size / Capacity", product.size],
            ].filter(([, value]) => safeText(value));

            if (detailItems.length && currentY < pageHeight - 45) {
                pdf.setFont("helvetica", "bold");
                pdf.setFontSize(8.5);
                pdf.setTextColor(30, 74, 100);
                pdf.text("PRODUCT DETAILS", margin, currentY);

                currentY += 6;

                pdf.setFont("helvetica", "normal");
                pdf.setFontSize(7.4);
                pdf.setTextColor(71, 85, 105);

                for (const [label, value] of detailItems) {
                    const lines = pdf.splitTextToSize(
                        `${label}: ${safeText(value)}`,
                        contentWidth
                    );

                    const maxLines = Math.max(
                        1,
                        Math.floor((pageHeight - currentY - 35) / 3.5)
                    );

                    if (currentY >= pageHeight - 35) break;

                    pdf.text(
                        lines.slice(0, Math.min(lines.length, maxLines)),
                        margin,
                        currentY,
                        { lineHeightFactor: 1.15 }
                    );

                    currentY +=
                        Math.min(lines.length, maxLines) * 3.5 + 2;
                }
            }

            // ---------- Footer ----------
            const footerY = 273;

            pdf.setFillColor(30, 74, 100);
            pdf.rect(
                0,
                footerY,
                pageWidth,
                pageHeight - footerY,
                "F"
            );

            pdf.setFont("helvetica", "bold");
            pdf.setFontSize(7.2);
            pdf.setTextColor(255, 255, 255);
            pdf.text(
                "RAJ BIOSIS - DIAGNOSTIC INSTRUMENTS & LABORATORY EQUIPMENT PARTNER",
                margin,
                footerY + 6
            );

            pdf.setFont("helvetica", "normal");
            pdf.setFontSize(6.6);
            pdf.text(
                "Biomedical equipment sales, installation support, AMC and calibration services.",
                margin,
                footerY + 11
            );

            pdf.setTextColor(226, 232, 240);
            pdf.text(
                "Official Product Brochure",
                pageWidth - margin,
                footerY + 6,
                { align: "right" }
            );

            if (website) {
                pdf.textWithLink(
                    website.replace(/^https?:\/\//, ""),
                    pageWidth - margin,
                    footerY + 11,
                    {
                        url: website,
                        align: "right",
                    }
                );
            }

            const fileName =
                `${safeText(product.title || "Product")}`
                    .replace(/[^a-zA-Z0-9]+/g, "-")
                    .replace(/^-|-$/g, "") +
                "-Brochure.pdf";

            pdf.save(fileName);

            toast.success("Brochure downloaded successfully", {
                id: toastId,
            });
        } catch (error) {
            console.error("Error generating brochure PDF:", error);
            toast.error(
                "Failed to generate brochure. Please try again.",
                { id: toastId }
            );
        } finally {
            setBrochureGenerating(false);
        }
    };

    const handleNativeShare = async () => {
        if (navigator.share) {
            await navigator.share({
                title: product.title,
                text: product.desc,
                url: window.location.href,
            });
        } else {
            setShowShare(!showShare);
        }
    };

    useEffect(() => {
        const close = (e) => {
            if (
                shareRef.current &&
                !shareRef.current.contains(e.target)
            ) {
                setShowShare(false);
            }
        };

        document.addEventListener("mousedown", close);

        return () =>
            document.removeEventListener("mousedown", close);
    }, []);

    if (!product) {
        return (
            <section className="py-10 md:py-20 bg-slate-50">
                <div className="container-custom">

                    <div className="grid lg:grid-cols-2 gap-12">

                        <div className="h-[420px] md:h-[520px] rounded-[36px] bg-slate-200 animate-pulse" />

                        <div>
                            <div className="h-12 w-3/4 bg-slate-200 rounded-xl animate-pulse mb-8" />

                            {[...Array(8)].map((_, i) => (
                                <div
                                    key={i}
                                    className="h-6 bg-slate-200 rounded-lg animate-pulse mb-4"
                                />
                            ))}
                        </div>

                    </div>

                    <div className="mt-16 grid lg:grid-cols-[600px_1fr] gap-8">

                        <div className="bg-white rounded-[24px] md:rounded-[32px] p-5 sm:p-6 md:p-8 shadow-sm">
                            <div className="h-10 w-48 bg-slate-200 rounded-lg animate-pulse mb-6" />

                            {[...Array(4)].map((_, i) => (
                                <div
                                    key={i}
                                    className="h-14 bg-slate-200 rounded-2xl animate-pulse mb-4"
                                />
                            ))}
                        </div>

                        <div className="bg-white rounded-[24px] md:rounded-[32px] p-5 sm:p-6 md:p-8 shadow-sm">
                            <div className="h-10 w-60 bg-slate-200 rounded-lg animate-pulse mb-6" />

                            {[...Array(6)].map((_, i) => (
                                <div
                                    key={i}
                                    className="h-5 bg-slate-200 rounded animate-pulse mb-4"
                                />
                            ))}
                        </div>

                    </div>

                </div>
            </section>
        );
    }
    return (
        <section className="py-10 md:py-20 bg-slate-50">
            {productSchema && (
                <script
                    type="application/ld+json"
                    dangerouslySetInnerHTML={{
                        __html: JSON.stringify(productSchema),
                    }}
                />
            )}

            {faqSchema && (
                <script
                    type="application/ld+json"
                    dangerouslySetInnerHTML={{
                        __html: JSON.stringify(faqSchema),
                    }}
                />
            )}

            {breadcrumbSchema && (
                <script
                    type="application/ld+json"
                    dangerouslySetInnerHTML={{
                        __html: JSON.stringify(breadcrumbSchema),
                    }}
                />
            )}
            <div className="container-custom">
                <div className="mb-6 text-sm text-slate-500 flex flex-wrap gap-2 items-center font-medium">
                    <Link href={pathname.startsWith("/" + city.toLowerCase()) ? "/" + city.toLowerCase() : "/"} className="hover:text-indigo-650 transition">
                        Home
                    </Link>
                    <span>/</span>
                    <Link href={pathname.startsWith("/" + city.toLowerCase()) ? "/" + city.toLowerCase() + "/items" : "/items"} className="hover:text-indigo-650 transition">
                        Products
                    </Link>
                    <span>/</span>
                    <span className="text-slate-800 font-semibold">{product.title}</span>
                </div>
                {/* Top Section */}

                <div className="grid lg:grid-cols-2 gap-12">
                    {/* Product Image */}

                    <div>

                        <div className="relative h-[340px] sm:h-[420px] md:h-[500px] lg:h-[580px] rounded-[24px] md:rounded-[36px] overflow-hidden bg-white shadow-[0_25px_80px_rgba(0,0,0,0.12)]">

                            {selectedMedia === "video" && product.video ? (

                                <video
                                    controls
                                    autoPlay
                                    className="w-full h-full object-contain p-6"
                                >
                                    <source
                                        src={product.video}
                                        type="video/mp4"
                                    />
                                </video>

                            ) : (

                                <>
                                    {!imageLoaded && (
                                        <div className="absolute inset-0 bg-slate-100 animate-pulse" />
                                    )}

                                    <Image
                                        src={selectedImage || product.image}
                                        alt={product.title}
                                        fill
                                        priority
                                        onLoad={() => setImageLoaded(true)}
                                        className={`object-contain p-4 transition duration-500 ${imageLoaded
                                            ? "opacity-100"
                                            : "opacity-0"
                                            }`}
                                    />
                                </>

                            )}

                        </div>

                        <div className="flex flex-wrap gap-3 mt-5">

                            {(product.images?.length
                                ? product.images
                                : [product.image]
                            ).map((img, index) => (

                                <button
                                    key={index}
                                    onClick={() => {
                                        setSelectedImage(img);
                                        setSelectedMedia("image");
                                    }}
                                    className={`w-20 h-20 rounded-xl overflow-hidden border-2 ${selectedMedia === "image" &&
                                        selectedImage === img
                                        ? "border-indigo-650"
                                        : "border-gray-200"
                                        }`}
                                >

                                    <Image
                                        src={img}
                                        alt={`${product.title} Thumbnail ${index + 1}`}
                                        width={80}
                                        height={80}
                                        className="w-full h-full object-cover"
                                    />

                                </button>

                            ))}

                            {product.video && (

                                <button
                                    onClick={() =>
                                        setSelectedMedia("video")
                                    }
                                    className={`w-20 h-20 rounded-xl border-2 flex flex-col items-center justify-center ${selectedMedia === "video"
                                        ? "border-indigo-650"
                                        : "border-gray-200"
                                        }`}
                                >

                                    <FaPlay size={20} />

                                    <span className="text-xs mt-1">
                                        Video
                                    </span>

                                </button>

                            )}

                            {product.pdf && (

                                <a
                                    href={product.pdf}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="w-20 h-20 rounded-xl border flex flex-col items-center justify-center hover:bg-slate-100"
                                >

                                    📄

                                    <span className="text-xs">
                                        PDF
                                    </span>

                                </a>

                            )}

                        </div>

                    </div>

                    {/* Product Details */}

                    <div>

                        <div className="flex justify-between items-start gap-4 relative">

                            <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold leading-tight text-slate-900">
                                {product.title}
                            </h1>

                            <div
                                ref={shareRef}
                                className="relative"
                            >

                                <button
                                    onClick={handleNativeShare}
                                    className="w-12 h-12 rounded-full border bg-white shadow flex items-center justify-center hover:bg-slate-100"
                                >
                                    <FaShareAlt size={18} />
                                </button>

                                {showShare && (

                                    <div className="absolute right-0 top-14 w-56 bg-white rounded-xl shadow-xl border p-2 z-50">

                                        <button
                                            onClick={handleCopy}
                                            className="w-full text-left px-3 py-2 hover:bg-slate-100 rounded flex items-center gap-2"
                                        >
                                            <FaLink />
                                            Copy Link
                                        </button>

                                        <button
                                            onClick={handleWhatsapp}
                                            className="w-full text-left px-3 py-2 hover:bg-slate-100 rounded flex items-center gap-2"
                                        >
                                            <FaWhatsapp className="text-green-600" />
                                            WhatsApp
                                        </button>

                                        <button
                                            onClick={handleFacebook}
                                            className="w-full text-left px-3 py-2 hover:bg-slate-100 rounded flex items-center gap-2"
                                        >
                                            <FaFacebook className="text-blue-600" />
                                            Facebook
                                        </button>

                                        <button
                                            onClick={handleInstagram}
                                            className="w-full text-left px-3 py-2 hover:bg-slate-100 rounded flex items-center gap-2"
                                        >
                                            <FaInstagram className="text-pink-600" />
                                            Instagram
                                        </button>

                                    </div>

                                )}

                            </div>

                        </div>

                        <div className="mt-6 md:mt-8 bg-white p-5 sm:p-6 md:p-8 rounded-[24px] md:rounded-[30px] shadow-[0_20px_60px_rgba(0,0,0,0.08)] border border-slate-100">

                            <div className="mb-5 flex items-center justify-between gap-3">
                                <h2 className="text-sm font-bold uppercase tracking-[0.12em] text-slate-900">
                                    Key Specifications
                                </h2>
                                <span className="h-1.5 w-10 rounded-full bg-gradient-to-r from-indigo-600 to-fuchsia-500" />
                            </div>

                            <div className="divide-y divide-slate-100">
                                {[
                                    ["Brand", product.brand],
                                    ["Model", product.model],
                                    ["Instrument", product.instrument],
                                    ["Capacity", product.capacity],
                                    ["Throughput", product.throughput],
                                    ["Usage", product.usage],
                                    ["Automation", product.automation],
                                    ["Availability", product.availability],
                                ]
                                    .filter(
                                        ([, value]) =>
                                            value !== undefined &&
                                            value !== null &&
                                            String(value).trim()
                                    )
                                    .map(([label, value]) => (
                                        <div
                                            key={label}
                                            className="grid grid-cols-[110px_minmax(0,1fr)] items-start gap-4 py-3 first:pt-0 last:pb-0"
                                        >
                                            <span className="text-sm font-semibold text-slate-700">
                                                {label}
                                            </span>

                                            <span className="min-w-0 break-words text-sm leading-6 text-slate-600">
                                                {String(value)}
                                            </span>
                                        </div>
                                    ))}
                            </div>

                            <div className="mt-6 border-t border-slate-100 pt-5">
                                <button
                                    type="button"
                                    onClick={handleDownloadBrochure}
                                    disabled={brochureGenerating}
                                    className="group flex w-full items-center justify-center gap-2.5 rounded-2xl bg-gradient-to-r from-indigo-600 to-fuchsia-600 px-6 py-4 font-semibold text-white shadow-lg shadow-indigo-600/20 transition-all duration-300 hover:-translate-y-0.5 hover:from-indigo-700 hover:to-fuchsia-700 hover:shadow-xl hover:shadow-indigo-600/25 active:translate-y-0 disabled:cursor-not-allowed disabled:opacity-70 disabled:hover:translate-y-0"
                                >
                                    <Download
                                        size={19}
                                        strokeWidth={2.2}
                                        className={`transition-transform duration-300 ${brochureGenerating
                                            ? "animate-pulse"
                                            : "group-hover:translate-y-0.5"
                                            }`}
                                    />
                                    <span>
                                        {brochureGenerating
                                            ? "Generating Brochure..."
                                            : "Download Brochure"}
                                    </span>
                                </button>
                            </div>

                        </div>

                    </div>

                </div>

                {/* Description + Form */}

                <div className="mt-16">
                    <div className="grid grid-cols-1 lg:grid-cols-[500px_1fr] xl:grid-cols-[600px_1fr] gap-6 md:gap-8">

                        {/* Quote Form */}

                        <div id="quote-form" className="bg-white rounded-[24px] md:rounded-[32px] p-5 sm:p-6 md:p-8 shadow-[0_20px_60px_rgba(0,0,0,0.08)] h-fit lg:sticky lg:top-24">

                            <h2 className="text-2xl md:text-3xl font-bold mb-2">
                                Request A Quote
                            </h2>

                            <p className="text-slate-500 mb-8">
                                Product:
                                <span className="font-semibold ml-2 text-slate-800">
                                    {product.title}
                                </span>
                            </p>

                            <form
                                onSubmit={handleSubmit}
                                className="space-y-5"
                            >

                                <input
                                    type="text"
                                    placeholder="Your Name"
                                    value={form.name}
                                    onChange={(e) =>
                                        setForm({
                                            ...form,
                                            name: e.target.value,
                                        })
                                    }
                                    className="w-full bg-slate-100 rounded-xl md:rounded-2xl px-4 md:px-5 py-3 md:py-4 outline-none focus:ring-2 focus:ring-indigo-600"
                                />

                                <input
                                    type="email"
                                    placeholder="Email Address"
                                    value={form.email}
                                    onChange={(e) =>
                                        setForm({
                                            ...form,
                                            email: e.target.value,
                                        })
                                    }
                                    className="w-full bg-slate-100 rounded-xl md:rounded-2xl px-4 md:px-5 py-3 md:py-4 outline-none focus:ring-2 focus:ring-indigo-600"
                                />

                                <input
                                    type="tel"
                                    placeholder="Phone Number"
                                    maxLength={10}
                                    value={form.phone}
                                    onChange={(e) =>
                                        setForm({
                                            ...form,
                                            phone:
                                                e.target.value.replace(
                                                    /\D/g,
                                                    ""
                                                ),
                                        })
                                    }
                                    className="w-full bg-slate-100 rounded-2xl px-5 py-4 outline-none focus:ring-2 focus:ring-indigo-600"
                                />

                                <button
                                    type="submit"
                                    disabled={submitting}
                                    className="w-full bg-gradient-to-r from-indigo-600 to-fuchsia-600 !text-white py-4 rounded-2xl font-semibold hover:opacity-95 transition shadow-lg shadow-indigo-650/20"
                                >
                                    {submitting
                                        ? "Submitting..."
                                        : "Get Quote"}
                                </button>

                            </form>

                        </div>

                        {/* Description */}

                        <div className="bg-white rounded-[24px] md:rounded-[32px] p-5 sm:p-6 md:p-10 shadow-[0_20px_60px_rgba(0,0,0,0.08)]">

                            <h3 className="text-2xl md:text-3xl font-bold mb-4 md:mb-6 text-slate-900">
                                Product Description
                            </h3>

                            <p className="text-slate-600 leading-7 md:leading-9 text-base md:text-lg">
                                {product.desc ||
                                    product.description ||
                                    "No description available."}
                            </p>

                            {/* Specifications Table */}

                            <div className="mt-10 overflow-x-auto">
                                <table className="w-full border border-slate-200">
                                    <tbody>

                                        <tr>
                                            <td className="border p-3 font-semibold">
                                                Brand
                                            </td>
                                            <td className="border p-3">
                                                {product.brand || "N/A"}
                                            </td>
                                        </tr>

                                        <tr>
                                            <td className="border p-3 font-semibold">
                                                Model
                                            </td>
                                            <td className="border p-3">
                                                {product.model || "N/A"}
                                            </td>
                                        </tr>

                                        <tr>
                                            <td className="border p-3 font-semibold">
                                                Usage
                                            </td>
                                            <td className="border p-3">
                                                {product.usage || "N/A"}
                                            </td>
                                        </tr>

                                        <tr>
                                            <td className="border p-3 font-semibold">
                                                Automation
                                            </td>
                                            <td className="border p-3">
                                                {product.automation || "N/A"}
                                            </td>
                                        </tr>

                                        <tr>
                                            <td className="border p-3 font-semibold">
                                                Capacity
                                            </td>
                                            <td className="border p-3">
                                                {product.capacity || "N/A"}
                                            </td>
                                        </tr>

                                        <tr>
                                            <td className="border p-3 font-semibold">
                                                Throughput
                                            </td>
                                            <td className="border p-3">
                                                {product.throughput || "N/A"}
                                            </td>
                                        </tr>

                                    </tbody>
                                </table>
                            </div>

                            {/* SEO Content */}

                            <div className="mt-12">

                                <h3 className="text-2xl font-bold mb-4 text-slate-900">
                                    Why Choose Raj Biosis in {cityName}?
                                </h3>

                                <p className="text-slate-600 leading-8">
                                    Raj Biosis is a trusted supplier and
                                    distributor of {product.title} in {cityName}.
                                    We provide high-quality biomedical and laboratory
                                    equipment for hospitals, pathology laboratories,
                                    diagnostic centres and healthcare facilities.
                                </p>

                                <div className="mt-8">

                                    <h3 className="text-2xl font-bold mb-4">
                                        Features of {product.title}
                                    </h3>

                                    <p className="text-slate-600 leading-8">
                                        {product.title} offers reliable performance,
                                        accurate results, easy operation, long service
                                        life and efficient workflow for laboratories
                                        and hospitals.
                                    </p>

                                </div>

                                <div className="mt-8">

                                    <h3 className="text-2xl font-bold mb-4">
                                        Applications of {product.title}
                                    </h3>

                                    <p className="text-slate-600 leading-8">
                                        Widely used in hospitals, pathology labs,
                                        diagnostic centres, blood banks, research
                                        institutes and healthcare facilities.
                                    </p>

                                </div>

                                <div className="mt-8">

                                    <h3 className="text-2xl font-bold mb-4">
                                        {product.title} Supplier in {cityName}
                                    </h3>

                                    <p className="text-slate-600 leading-8">
                                        Raj Biosis supplies {product.title}
                                        in {cityName} with technical support,
                                        installation assistance and customer service
                                        for hospitals and laboratories.
                                    </p>

                                </div>
                                <div className="mt-8">

                                    <h3 className="text-2xl font-bold mb-4">
                                        {product.title} Dealer in {cityName}
                                    </h3>

                                    <p className="text-slate-600 leading-8">
                                        Raj Biosis is a trusted dealer of
                                        {product.title} in {cityName}. We supply
                                        biomedical equipment, laboratory instruments,
                                        diagnostic analyzers and healthcare devices
                                        to hospitals, pathology labs and research centres.
                                    </p>

                                </div>

                                <div className="mt-8">

                                    <h3 className="text-2xl font-bold mb-4">
                                        {product.title} Distributor in {cityName}
                                    </h3>

                                    <p className="text-slate-600 leading-8">
                                        Looking for a reliable distributor of
                                        {product.title} in {cityName}? We provide
                                        installation support, product guidance,
                                        maintenance assistance and fast delivery.
                                    </p>

                                </div>

                                <div className="mt-8">

                                    <h3 className="text-2xl font-bold mb-4">
                                        Buy {product.title} in {cityName}
                                    </h3>

                                    <p className="text-slate-600 leading-8">
                                        Buy high quality {product.title} in
                                        {cityName} at competitive prices.
                                        Contact Raj Biosis for the
                                        latest quotation and product availability.
                                    </p>

                                </div>

                                <div className="mt-8">

                                    <h3 className="text-2xl font-bold mb-4">
                                        {product.title} Price in {cityName}
                                    </h3>

                                    <p className="text-slate-600 leading-8">
                                        The price of {product.title} depends on
                                        brand, model, specifications and features.
                                        Contact our team for the latest pricing,
                                        availability and delivery details.
                                    </p>

                                </div>
                            </div>

                            {/* FAQ Section */}

                            <div className="mt-12">

                                <h3 className="text-2xl font-bold mb-6 text-slate-900">
                                    Frequently Asked Questions
                                </h3>

                                <div className="space-y-8">

                                    <div>
                                        <h4 className="font-semibold text-lg">
                                            What is {product.title} used for in {cityName}?
                                        </h4>

                                        <p className="text-slate-600 mt-2">
                                            {product.title} is commonly used in hospitals,
                                            pathology laboratories and diagnostic centres.
                                        </p>
                                    </div>
                                    <div>
                                        <h4 className="font-semibold text-lg">
                                            What is the price of {product.title} in {cityName}?
                                        </h4>

                                        <p className="text-slate-600 mt-2">
                                            Pricing depends on specifications,
                                            brand and model. Contact us for a quote.
                                        </p>
                                    </div>

                                    <div>
                                        <h4 className="font-semibold text-lg">
                                            Are you an authorized supplier of {product.title}?
                                        </h4>

                                        <p className="text-slate-600 mt-2">
                                            We supply genuine biomedical and
                                            laboratory equipment from trusted brands.
                                        </p>
                                    </div>

                                    <div>
                                        <h4 className="font-semibold text-lg">
                                            Can hospitals in {cityName} order this product?
                                        </h4>

                                        <p className="text-slate-600 mt-2">
                                            Yes, hospitals, pathology laboratories,
                                            diagnostic centres and healthcare facilities
                                            can order this product.
                                        </p>
                                    </div>
                                    <div>
                                        <h4 className="font-semibold text-lg">
                                            Do you provide installation support?
                                        </h4>

                                        <p className="text-slate-600 mt-2">
                                            Yes, installation and technical support
                                            are available depending on the product.
                                        </p>
                                    </div>

                                    <div>
                                        <h4 className="font-semibold text-lg">
                                            Can I request a quotation?
                                        </h4>

                                        <p className="text-slate-600 mt-2">
                                            Yes, you can submit the enquiry form on
                                            this page to receive pricing and product
                                            information.
                                        </p>
                                    </div>

                                    <div>
                                        <h4 className="font-semibold text-lg">
                                            Do you provide warranty?
                                        </h4>

                                        <p className="text-slate-600 mt-2">
                                            Warranty depends on the manufacturer and
                                            product model.
                                        </p>
                                    </div>

                                    <div>
                                        <h4 className="font-semibold text-lg">
                                            Do you deliver across India?
                                        </h4>

                                        <p className="text-slate-600 mt-2">
                                            Yes, we supply products across India with
                                            safe packaging and logistics support.
                                        </p>
                                    </div>

                                    <div>
                                        <h4 className="font-semibold text-lg">
                                            How can I contact Raj Biosis?
                                        </h4>

                                        <p className="text-slate-600 mt-2">
                                            You can fill out the enquiry form or
                                            contact our team directly for product
                                            details and quotations.
                                        </p>
                                    </div>

                                </div>

                            </div>

                        </div>

                    </div>

                </div>

                {/* Lower Company & Services Section */}
                <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-6">
                    {/* Card 1: About Raj Biosis */}
                    <div className="bg-white rounded-[24px] md:rounded-[32px] p-6 md:p-8 shadow-[0_20px_60px_rgba(0,0,0,0.04)] border border-slate-100/50 flex flex-col justify-between">
                        <div>
                            <h3 className="text-lg font-bold text-slate-900 border-b pb-3 border-slate-100 uppercase tracking-wider text-xs flex items-center gap-2">
                                <span className="w-1.5 h-1.5 rounded-full bg-indigo-600"></span>
                                About Raj Biosis
                            </h3>
                            <p className="text-slate-500 text-sm mt-4 leading-relaxed">
                                Raj Biosis is a trusted manufacturer, exporter, and supplier of advanced diagnostic and biomedical laboratory technologies. We focus on delivering healthcare precision, innovative equipment, and dedicated technical support to laboratories and hospitals across India and global export regions.
                            </p>
                        </div>
                        <div className="pt-4 mt-4 border-t border-slate-100 text-xs text-indigo-650 font-semibold">
                            <Link href="/about" className="hover:underline">
                                Learn more about our story &rarr;
                            </Link>
                        </div>
                    </div>

                    {/* Card 2: Support & Assistance */}
                    <div className="bg-white rounded-[24px] md:rounded-[32px] p-6 md:p-8 shadow-[0_20px_60px_rgba(0,0,0,0.04)] border border-slate-100/50 flex flex-col justify-between">
                        <div>
                            <h3 className="text-lg font-bold text-slate-900 border-b pb-3 border-slate-100 uppercase tracking-wider text-xs flex items-center gap-2">
                                <span className="w-1.5 h-1.5 rounded-full bg-fuchsia-600"></span>
                                Diagnostic Consultation
                            </h3>
                            <p className="text-slate-500 text-sm mt-4 leading-relaxed">
                                Get professional advisory support for your diagnostic laboratory setup. We offer consultation, installation instructions, warranty assistance, and annual maintenance plans (AMC) tailored to your testing instrumentation.
                            </p>
                        </div>
                        <div className="pt-4 mt-4 border-t border-slate-100 text-xs text-fuchsia-600 font-semibold">
                            <Link href="/services" className="hover:underline">
                                Explore laboratory services &rarr;
                            </Link>
                        </div>
                    </div>

                    {/* Card 3: Contact & Enquiry */}
                    <div className="bg-white rounded-[24px] md:rounded-[32px] p-6 md:p-8 shadow-[0_20px_60px_rgba(0,0,0,0.04)] border border-slate-100/50 flex flex-col justify-between">
                        <div>
                            <h3 className="text-lg font-bold text-slate-900 border-b pb-3 border-slate-100 uppercase tracking-wider text-xs flex items-center gap-2">
                                <span className="w-1.5 h-1.5 rounded-full bg-orange-500"></span>
                                Direct Inquiry Desk
                            </h3>
                            <p className="text-slate-500 text-sm mt-4 leading-relaxed">
                                For quick quotes, corporate procurement queries, or technical manuals, feel free to reach out to our team.
                            </p>
                            <div className="mt-4 space-y-2 text-xs font-semibold text-slate-700">
                                {phoneNumbers.map((number, idx) => {
                                    const cleanNum = String(number).trim();
                                    const linkNum = cleanNum.replace(/[^\d+]/g, "");
                                    return (
                                        <div key={`phone-${idx}`} className="flex items-center gap-2">
                                            <span>📞</span>
                                            <a href={`tel:${linkNum}`} className="hover:text-indigo-650 transition">
                                                {cleanNum}
                                            </a>
                                        </div>
                                    );
                                })}
                                {emails.map((em, idx) => {
                                    const cleanEmail = String(em).trim();
                                    return (
                                        <div key={`email-${idx}`} className="flex items-center gap-2">
                                            <span>✉</span>
                                            <a href={`mailto:${cleanEmail}`} className="hover:text-indigo-650 transition">
                                                {cleanEmail}
                                            </a>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                        <div className="pt-4 mt-4 border-t border-slate-100 text-xs text-orange-500 font-semibold">
                            <Link href="/contact" className="hover:underline">
                                View official offices & forms &rarr;
                            </Link>
                        </div>
                    </div>
                </div>

            </div>
        </section>
    );
}
import type { Plugin } from "vite";
import en from "../src/i18n/en.json" with { type: "json" };
import { educationItems, experienceItems, howIWorkItems, skills } from "../src/content/sections";

// The site renders in the browser, so crawlers and AI agents that don't run JavaScript see an
// empty page. This plugin builds the English copy from `en.json` into two static forms:
// `llms.txt` (Markdown) next to the page, and a `<noscript>` block in `index.html`.

const siteUrl = "https://rrobben.github.io/";
const links = [
    { label: "LinkedIn", href: "https://www.linkedin.com/in/rpoyry/" },
    { label: "GitHub", href: "https://github.com/rrobben" },
];

interface Entry {
    header: string;
    subheader?: string;
    content: string;
}

interface Section {
    title: string;
    entries: Entry[];
}

type Dict = Record<string, string>;
const at = (group: Dict, key: string) => group[key] ?? "";

const paragraphs = (html: string) => html.split("<br /><br />");

const sections: Section[] = [
    {
        title: en.HowIWork,
        entries: howIWorkItems.map((k) => ({
            header: at(en.howIWork.header, k),
            content: at(en.howIWork.content, k),
        })),
    },
    {
        title: en.Experience,
        entries: experienceItems.map((k) => ({
            header: at(en.workExperience.header, k),
            subheader: at(en.workExperience.subheader, k),
            content: at(en.workExperience.content, k),
        })),
    },
    {
        title: en.Education,
        entries: educationItems.map((k) => ({
            header: at(en.education.header, k),
            content: `${at(en.education.content, k)}<br /><br /><ul>${at(en.education.subcontent, k)
                .split("<br/>")
                .map((s) => `<li>${s.trim()}</li>`)
                .join("")}</ul>`,
        })),
    },
];

const skillList = skills.map((k) => at(en.skills, k)).join(", ");

// The copy uses only <br />, <ul>, <li>, <strong> and &quot;.
const toMarkdown = (html: string) =>
    html
        .replace(/<br ?\/><br ?\/>/g, "\n\n")
        .replace(/<br ?\/>/g, "\n")
        .replace(/<ul>/g, "\n\n")
        .replace(/<\/ul>/g, "\n\n")
        .replace(/<li>/g, "- ")
        .replace(/<\/li>/g, "\n")
        .replace(/<\/?strong>/g, "**")
        .replace(/&quot;/g, '"')
        .replace(/[ \t]*\n/g, "\n")
        .replace(/\n{3,}/g, "\n\n")
        .trim();

const escapeHtml = (text: string) => text.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");

const buildMarkdown = () => {
    const [summary, ...rest] = paragraphs(en.aboutMeContent);
    const out = [
        `# ${en.Name} — ${en.JobTitle}`,
        `> ${toMarkdown(summary)}`,
        ...rest.map(toMarkdown),
        `Skills: ${skillList}. Website: ${siteUrl} (English and Finnish).`,
    ];
    for (const section of sections) {
        out.push(`## ${section.title}`);
        for (const e of section.entries) {
            out.push(`### ${e.header}${e.subheader ? ` (${e.subheader})` : ""}`, toMarkdown(e.content));
        }
    }
    out.push(`## ${en.Contact}`, links.map((l) => `- ${l.label}: ${l.href}`).join("\n"));
    return out.join("\n\n") + "\n";
};

const buildHtml = () => {
    const out = [
        `<h1>${escapeHtml(`${en.Name} — ${en.JobTitle}`)}</h1>`,
        ...paragraphs(en.aboutMeContent).map((p) => `<p>${p}</p>`),
        `<p>Skills: ${escapeHtml(skillList)}. <a href="llms.txt">Plain-text version</a>.</p>`,
    ];
    for (const section of sections) {
        out.push(`<h2>${escapeHtml(section.title)}</h2>`);
        for (const e of section.entries) {
            out.push(`<h3>${escapeHtml(e.header)}</h3>`);
            if (e.subheader) out.push(`<p>${escapeHtml(e.subheader)}</p>`);
            // A <p> can't hold a list, so a paragraph with one goes in a <div>.
            out.push(...paragraphs(e.content).map((p) => (p.includes("<ul>") ? `<div>${p}</div>` : `<p>${p}</p>`)));
        }
    }
    out.push(
        `<h2>${escapeHtml(en.Contact)}</h2>`,
        `<ul>${links.map((l) => `<li><a href="${l.href}">${l.label}</a></li>`).join("")}</ul>`,
    );
    return out.join("\n");
};

export const staticContent = (): Plugin => ({
    name: "static-content",
    transformIndexHtml: () => [{ tag: "noscript", children: buildHtml(), injectTo: "body-prepend" }],
    generateBundle() {
        this.emitFile({ type: "asset", fileName: "llms.txt", source: buildMarkdown() });
    },
});

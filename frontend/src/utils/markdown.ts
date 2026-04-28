export const escapeHtml = (raw: string) => raw.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&#39;");

export const inlineMarkdownToHtml = (raw: string) => {
    let text = escapeHtml(raw);
    text = text.replace(/`([^`]+)`/g, "<code>$1</code>");
    text = text.replace(/\*\*([^*]+)\*\*/g, "<strong>$1</strong>");
    text = text.replace(/\*([^*]+)\*/g, "<em>$1</em>");
    text = text.replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2" target="_blank" rel="noreferrer">$1</a>');
    return text;
};

export const markdownToHtml = (markdown: string) => {
    const lines = markdown.split(/\r?\n/);
    const html: string[] = [];
    let inUnorderedList = false;
    let inOrderedList = false;
    let inCodeBlock = false;
    let inTable = false;
    let tableBuffer: string[][] = [];

    const closeLists = () => {
        if (inUnorderedList) {
            html.push("</ul>");
            inUnorderedList = false;
        }
        if (inOrderedList) {
            html.push("</ol>");
            inOrderedList = false;
        }
    };

    const isTableRow = (line: string) => {
        return line.trim().startsWith("|") && line.trim().endsWith("|");
    };

    const isTableSeparator = (line: string) => {
        return /^\|\s*[-:\s|]+\|$/.test(line.trim());
    };

    const parseTableRow = (line: string): string[] => {
        const cells = line
            .split("|")
            .map((cell) => cell.trim())
            .filter(Boolean);
        return cells;
    };

    const flushTable = () => {
        if (tableBuffer.length > 0) {
            html.push("<table>");
            const headerCells = tableBuffer[0];
            html.push("<thead><tr>");
            headerCells.forEach((cell) => {
                html.push(`<th>${inlineMarkdownToHtml(cell)}</th>`);
            });
            html.push("</tr></thead>");

            html.push("<tbody>");
            for (let i = 2; i < tableBuffer.length; i += 1) {
                const row = tableBuffer[i];
                html.push("<tr>");
                row.forEach((cell) => {
                    html.push(`<td>${inlineMarkdownToHtml(cell)}</td>`);
                });
                html.push("</tr>");
            }
            html.push("</tbody>");
            html.push("</table>");

            inTable = false;
            tableBuffer = [];
        }
    };

    for (let i = 0; i < lines.length; i += 1) {
        const line = lines[i];

        if (line.trim().startsWith("```")) {
            flushTable();
            closeLists();
            if (!inCodeBlock) {
                html.push("<pre><code>");
                inCodeBlock = true;
            } else {
                html.push("</code></pre>");
                inCodeBlock = false;
            }
            continue;
        }

        if (inCodeBlock) {
            html.push(`${escapeHtml(line)}\n`);
            continue;
        }

        const headingMatch = line.match(/^(#{1,3})\s+(.+)$/);
        if (headingMatch) {
            flushTable();
            closeLists();
            const level = headingMatch[1].length;
            const content = inlineMarkdownToHtml(headingMatch[2]);
            html.push(`<h${level}>${content}</h${level}>`);
            continue;
        }

        if (isTableRow(line)) {
            if (isTableSeparator(line)) {
                // Skip separator line, mark that we're in a table
                inTable = true;
            } else {
                if (!inTable && tableBuffer.length === 0) {
                    // First row of table
                    tableBuffer.push(parseTableRow(line));
                    inTable = true;
                } else if (inTable) {
                    tableBuffer.push(parseTableRow(line));
                }
            }
            continue;
        } else if (inTable && !isTableRow(line)) {
            flushTable();
        }

        const ulMatch = line.match(/^[-*]\s+(.+)$/);
        if (ulMatch && !line.trim().startsWith("|")) {
            if (inOrderedList) {
                html.push("</ol>");
                inOrderedList = false;
            }
            if (!inUnorderedList) {
                html.push("<ul>");
                inUnorderedList = true;
            }
            html.push(`<li>${inlineMarkdownToHtml(ulMatch[1])}</li>`);
            continue;
        }

        const olMatch = line.match(/^\d+\.\s+(.+)$/);
        if (olMatch) {
            if (inUnorderedList) {
                html.push("</ul>");
                inUnorderedList = false;
            }
            if (!inOrderedList) {
                html.push("<ol>");
                inOrderedList = true;
            }
            html.push(`<li>${inlineMarkdownToHtml(olMatch[1])}</li>`);
            continue;
        }

        if (!line.trim()) {
            flushTable();
            closeLists();
            continue;
        }

        closeLists();
        html.push(`<p>${inlineMarkdownToHtml(line)}</p>`);
    }

    flushTable();
    closeLists();
    if (inCodeBlock) {
        html.push("</code></pre>");
    }

    return html.join("");
};

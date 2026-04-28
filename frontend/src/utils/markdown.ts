export const escapeHtml = (raw: string) => raw.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&#39;")

export const inlineMarkdownToHtml = (raw: string) => {
    let text = escapeHtml(raw)
    text = text.replace(/`([^`]+)`/g, "<code>$1</code>")
    text = text.replace(/\*\*([^*]+)\*\*/g, "<strong>$1</strong>")
    text = text.replace(/\*([^*]+)\*/g, "<em>$1</em>")
    text = text.replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2" target="_blank" rel="noreferrer">$1</a>')
    return text
}

export const markdownToHtml = (markdown: string) => {
    const lines = markdown.split(/\r?\n/)
    const html: string[] = []
    let inUnorderedList = false
    let inOrderedList = false
    let inCodeBlock = false

    const closeLists = () => {
        if (inUnorderedList) {
            html.push("</ul>")
            inUnorderedList = false
        }
        if (inOrderedList) {
            html.push("</ol>")
            inOrderedList = false
        }
    }

    for (const line of lines) {
        if (line.trim().startsWith("```")) {
            closeLists()
            if (!inCodeBlock) {
                html.push("<pre><code>")
                inCodeBlock = true
            } else {
                html.push("</code></pre>")
                inCodeBlock = false
            }
            continue
        }

        if (inCodeBlock) {
            html.push(`${escapeHtml(line)}\n`)
            continue
        }

        const headingMatch = line.match(/^(#{1,3})\s+(.+)$/)
        if (headingMatch) {
            closeLists()
            const level = headingMatch[1].length
            const content = inlineMarkdownToHtml(headingMatch[2])
            html.push(`<h${level}>${content}</h${level}>`)
            continue
        }

        const ulMatch = line.match(/^[-*]\s+(.+)$/)
        if (ulMatch) {
            if (inOrderedList) {
                html.push("</ol>")
                inOrderedList = false
            }
            if (!inUnorderedList) {
                html.push("<ul>")
                inUnorderedList = true
            }
            html.push(`<li>${inlineMarkdownToHtml(ulMatch[1])}</li>`)
            continue
        }

        const olMatch = line.match(/^\d+\.\s+(.+)$/)
        if (olMatch) {
            if (inUnorderedList) {
                html.push("</ul>")
                inUnorderedList = false
            }
            if (!inOrderedList) {
                html.push("<ol>")
                inOrderedList = true
            }
            html.push(`<li>${inlineMarkdownToHtml(olMatch[1])}</li>`)
            continue
        }

        if (!line.trim()) {
            closeLists()
            continue
        }

        closeLists()
        html.push(`<p>${inlineMarkdownToHtml(line)}</p>`)
    }

    closeLists()
    if (inCodeBlock) {
        html.push("</code></pre>")
    }

    return html.join("")
}

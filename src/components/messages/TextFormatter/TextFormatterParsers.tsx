import React from 'react';
import styles from './TextFormatter.module.css';
import tableStyles from '../Message.module.css';

/* helpers */
const isString = (v: unknown): v is string => typeof v === 'string';

// ──────────────────────────── 1. Парсеры ────────────────────────────
interface InlineParseResult {
    beforeMatch?: string;
    element: React.ReactNode;
    afterMatch: string;
}

class TextFormatterParsers {
    /* **bold** */
    static parseBold(text: string, key = 0): InlineParseResult | null {
        const match = text.match(/\*\*(.*?)\*\*/);
        if (!match) return null;
        return {
            beforeMatch: text.substring(0, match.index),
            element: (
                <strong key={key} className={styles.bold}>
                    {match[1]}
                </strong>
            ),
            afterMatch: text.substring(match.index! + match[0].length),
        };
    }

    /* [txt](mailto:mail) */
    static parseEmailLink(text: string, key = 0): InlineParseResult | null {
        const match = text.match(/\[([^\]]+)]\(mailto:([^)]+)\)/);
        if (!match) return null;
        return {
            beforeMatch: text.substring(0, match.index),
            element: (
                <a key={key} href={`mailto:${match[2]}`} className={styles.link}>
                    {match[1]}
                </a>
            ),
            afterMatch: text.substring(match.index! + match[0].length),
        };
    }

    /* [txt](https://url) */
    static parseRegularLink(text: string, key = 0): InlineParseResult | null {
        const match = text.match(/\[([^\]]+)]\(([^)]+)\)/);
        if (!match) return null;
        return {
            beforeMatch: text.substring(0, match.index),
            element: (
                <a
                    key={key}
                    href={match[2]}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={styles.link}
                >
                    {match[1]}
                </a>
            ),
            afterMatch: text.substring(match.index! + match[0].length),
        };
    }

    /* Определяем, есть ли в блоке таблица */
    static isTable(text: string) {
        return text.includes('|');
    }

    /* Markdown‑таблица → HTML */
    static parseMarkdownTable(text: string) {
        const lines = text.split('\n').filter(l => l.trim());
        const tableLines = lines.filter(l => l.includes('|'));
        if (tableLines.length < 2) return <span>{text}</span>;

        const headerCells = tableLines[0]
            .split('|')
            .map(c => c.trim())
            .filter(Boolean);

        const dataRows = tableLines.slice(1).filter(l => !/^[\s|\-:]+$/.test(l));
        const rows = dataRows.map(l =>
            l
                .split('|')
                .map(c => c.trim())
                .filter(Boolean),
        );

        return (
            <div className={tableStyles.tableWrapper}>
                <table className={tableStyles.table}>
                    <thead>
                    <tr>
                        {headerCells.map((h, i) => (
                            <th key={i}>{TextProcessor.processInlineFormatting(h)}</th>
                        ))}
                    </tr>
                    </thead>
                    <tbody>
                    {rows.map((row, rIdx) => (
                        <tr key={rIdx} className={rIdx % 2 ? tableStyles.rowAlt : undefined}>
                            {row.map((cell, cIdx) => (
                                <td key={cIdx}>{TextProcessor.processInlineFormatting(cell)}</td>
                            ))}
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>
        );
    }
}

// ──────────────────────────── 2. TextProcessor ────────────────────────────
class TextProcessor {
    static formatters = [
        TextFormatterParsers.parseBold,
        TextFormatterParsers.parseEmailLink,
        TextFormatterParsers.parseRegularLink,
    ];

    /** inline: жирный, ссылки … */
    static processInlineFormatting(text: string): React.ReactNode {
        if (!isString(text)) return text;
        const parts: React.ReactNode[] = [];
        let remaining = text;
        let key = 0;

        while (remaining.length) {
            let matched = false;
            for (const fmt of this.formatters) {
                const res = fmt(remaining, key);
                if (res) {
                    if (res.beforeMatch) parts.push(<span key={key++}>{res.beforeMatch}</span>);
                    parts.push(res.element);
                    remaining = res.afterMatch;
                    matched = true;
                    break;
                }
            }
            if (!matched) {
                parts.push(<span key={key++}>{remaining}</span>);
                break;
            }
        }
        return parts;
    }

    /** смешанный контент: текст + таблицы */
    static processMixedContent(text: string): React.ReactNode[] {
        const lines = text.split('\n');
        const content: React.ReactNode[] = [];
        let txtBlock: string[] = [];
        let tblBlock: string[] = [];
        let inTable = false;
        let key = 0;

        const flushText = () => {
            if (!txtBlock.length) return;
            const raw = txtBlock.join('\n').trim();
            if (raw) content.push(<div key={key++} className={styles.paragraph}>{this.processInlineFormatting(raw)}</div>);
            txtBlock = [];
        };

        const flushTable = () => {
            if (!tblBlock.length) return;
            content.push(<div key={key++}>{TextFormatterParsers.parseMarkdownTable(tblBlock.join('\n'))}</div>);
            tblBlock = [];
        };

        lines.forEach(line => {
            if (line.includes('|') && line.trim()) {
                if (!inTable) flushText();
                inTable = true;
                tblBlock.push(line);
            } else {
                if (inTable) flushTable();
                inTable = false;
                txtBlock.push(line);
            }
        });

        flushTable();
        flushText();
        return content;
    }
}

// ──────────────────────────── 3. Renderer ────────────────────────────
class TextFormatterRenderer {
    static processSections(text: string) {
        return text
            .split('***')
            .filter(s => s.trim())
            .map((section, idx) => {
                const trimmed = section.trim();
                if (TextFormatterParsers.isTable(trimmed)) {
                    return (
                        <div key={idx} className={styles.sectionMixed}>
                            {TextProcessor.processMixedContent(trimmed)}
                        </div>
                    );
                }
                return (
                    <div key={idx} className={styles.section}>
                        {TextProcessor.processInlineFormatting(trimmed)}
                    </div>
                );
            });
    }
}

// ──────────────────────────── 4. Публичный компонент ────────────────────────────
interface TextFormatterProps {
    text: string;
    className?: string;
}

const TextFormatter: React.FC<TextFormatterProps> = ({ text, className = '' }) => {
    if (!text) return null;
    return <div className={className}>{TextFormatterRenderer.processSections(text)}</div>;
};

export default TextFormatter;

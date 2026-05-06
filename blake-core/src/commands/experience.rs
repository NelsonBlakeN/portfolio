use crate::{content, parser::ParsedInput};
use owo_colors::OwoColorize;
use serde_json::json;

const WRAP_WIDTH: usize = 78;

pub fn render(parsed: &ParsedInput) -> String {
    let exp = content::experience();

    if parsed.json {
        let entries: Vec<_> = exp.entries.iter().map(|e| json!({
            "title": e.title,
            "company": e.company,
            "location": e.location,
            "period": format!("{} – {}", e.start, e.end),
            "bullets": e.bullets,
        })).collect();
        return json!({ "type": "experience", "entries": entries }).to_string();
    }

    let mut out = String::new();
    out.push_str(&format!("{}\n", "Experience".bold().white()));
    for entry in &exp.entries {
        out.push('\n');
        out.push_str(&format!(
            "  {}  {}\n",
            entry.title.bold(),
            format!("{} – {}", entry.start, entry.end).dimmed()
        ));
        out.push_str(&format!("  {}\n", entry.company.dimmed()));
        for bullet in &entry.bullets {
            out.push_str(&wrap_bullet(bullet, "  • ", "    ", WRAP_WIDTH));
            out.push('\n');
        }
    }
    out
}

/// Wraps `text` with a hanging indent so wrapped lines align under the bullet
/// content, not at column 0.
fn wrap_bullet(text: &str, first_prefix: &str, cont_prefix: &str, width: usize) -> String {
    let mut out = String::new();
    let mut line = String::new();
    let mut is_first_line = true;

    for word in text.split_whitespace() {
        let prefix_len = if is_first_line { first_prefix.len() } else { cont_prefix.len() };
        let projected = if line.is_empty() {
            prefix_len + word.len()
        } else {
            prefix_len + line.len() + 1 + word.len()
        };

        if !line.is_empty() && projected > width {
            out.push_str(if is_first_line { first_prefix } else { cont_prefix });
            out.push_str(&line);
            out.push('\n');
            line.clear();
            is_first_line = false;
        }

        if !line.is_empty() {
            line.push(' ');
        }
        line.push_str(word);
    }

    if !line.is_empty() {
        out.push_str(if is_first_line { first_prefix } else { cont_prefix });
        out.push_str(&line);
    }
    out
}

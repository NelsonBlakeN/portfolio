use crate::{content, parser::ParsedInput};
use owo_colors::OwoColorize;
use serde_json::json;

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
            out.push_str(&format!("  {}\n", bullet));
        }
    }
    out
}

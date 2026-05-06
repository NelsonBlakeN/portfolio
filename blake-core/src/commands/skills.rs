use crate::{content, parser::ParsedInput};
use owo_colors::OwoColorize;
use serde_json::json;

pub fn render(parsed: &ParsedInput) -> String {
    let s = content::skills();

    if parsed.json {
        let categories: Vec<_> = s.categories.iter().map(|c| json!({
            "name": c.name,
            "skills": c.skills,
        })).collect();
        return json!({ "type": "skills", "categories": categories, "note": s.note }).to_string();
    }

    let mut out = String::new();
    out.push_str(&format!("{}\n", "Skills".bold().white()));
    if !s.categories.is_empty() {
        out.push('\n');
    }
    for cat in &s.categories {
        out.push_str(&format!(
            "  {:<12}  {}\n",
            cat.name.cyan(),
            cat.skills.join(", ")
        ));
    }
    if let Some(note) = &s.note {
        out.push('\n');
        out.push_str(&format!("  {}\n", note.dimmed()));
    }
    out
}

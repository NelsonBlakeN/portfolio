use crate::{content, parser::ParsedInput};
use owo_colors::OwoColorize;
use serde_json::json;

pub fn render(parsed: &ParsedInput) -> String {
    let p = content::projects();

    if parsed.json {
        let projects: Vec<_> = p.projects.iter().map(|proj| json!({
            "name": proj.name,
            "year": proj.year,
            "description": proj.description,
            "url": proj.url,
        })).collect();
        return json!({ "type": "projects", "projects": projects, "note": p.note }).to_string();
    }

    let mut out = String::new();
    out.push_str(&format!("{}\n", "Projects".bold().white()));
    for proj in &p.projects {
        out.push('\n');
        out.push_str(&format!("  {}  {}\n", proj.name.bold(), proj.year.dimmed()));
        out.push_str(&format!("  {}\n", proj.description));
        if let Some(url) = &proj.url {
            out.push_str(&format!("  {}\n", url.cyan()));
        }
    }
    if let Some(note) = &p.note {
        out.push('\n');
        out.push_str(&format!("  {}\n", note.dimmed()));
    }
    out
}

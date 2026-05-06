use crate::{content, parser::ParsedInput};
use owo_colors::OwoColorize;
use serde_json::json;

pub fn render(parsed: &ParsedInput) -> String {
    let about = content::about();

    if parsed.json {
        return json!({
            "type": "about",
            "name": about.name,
            "title": about.title,
            "bio": about.bio,
            "github": about.github,
        })
        .to_string();
    }

    let mut out = String::new();
    out.push_str(&format!("{}\n", about.name.bold().white()));
    out.push_str(&format!("{}\n", about.title.dimmed()));
    out.push('\n');
    for line in &about.bio {
        out.push_str(line);
        out.push('\n');
    }
    out.push('\n');
    out.push_str(&about.github.cyan().to_string());
    out
}

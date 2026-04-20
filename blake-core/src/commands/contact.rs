use crate::{content, parser::ParsedInput};
use owo_colors::OwoColorize;
use serde_json::json;

pub fn render(parsed: &ParsedInput) -> String {
    let c = content::contact();

    if parsed.json {
        let links: Vec<_> = c.links.iter().map(|l| json!({
            "label": l.label,
            "url": l.url,
            "display": l.display,
        })).collect();
        return json!({ "type": "contact", "links": links }).to_string();
    }

    let mut out = String::new();
    out.push_str(&format!("{}\n", "Contact".bold().white()));
    out.push('\n');
    for link in &c.links {
        out.push_str(&format!(
            "  {:<12}  {}\n",
            link.label.cyan(),
            link.display
        ));
    }
    out
}

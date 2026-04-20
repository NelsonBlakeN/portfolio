use crate::{parser::ParsedInput, VERSION};
use owo_colors::OwoColorize;
use serde_json::json;

pub fn render(parsed: &ParsedInput) -> String {
    if parsed.json {
        return json!({
            "type": "version",
            "version": VERSION,
        })
        .to_string();
    }

    format!("blake version {}", VERSION.green())
}

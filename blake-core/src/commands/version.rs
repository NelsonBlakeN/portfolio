use crate::{parser::ParsedInput, VERSION};
use owo_colors::OwoColorize;
use serde_json::json;

const GIT_SHA: &str = env!("GIT_SHA");
const BUILD_DATE: &str = env!("BUILD_DATE");

pub fn render(parsed: &ParsedInput) -> String {
    if parsed.json {
        return json!({
            "type": "version",
            "version": VERSION,
            "sha": GIT_SHA,
            "built": BUILD_DATE,
        })
        .to_string();
    }

    format!(
        "blake version {}\ncommit  {}\nbuilt   {}",
        VERSION.green(),
        GIT_SHA,
        BUILD_DATE,
    )
}

use wasm_bindgen::prelude::*;

/// Run a blake command and return its output as a string.
///
/// The browser always passes --json so React can render structured output.
/// Clear-screen is signaled by returning the sentinel string "__CLEAR__".
#[wasm_bindgen]
pub fn run(input: &str) -> String {
    // Always request JSON output in the browser context.
    let json_input = if input.contains("--json") {
        input.to_string()
    } else {
        format!("{input} --json")
    };

    let result = blake_core::run(&json_input);

    if result.clear_screen {
        return "__CLEAR__".to_string();
    }

    result.output
}

/// Return the list of available command names (for tab completion).
#[wasm_bindgen]
pub fn command_names() -> String {
    serde_json::to_string(&[
        "about", "experience", "projects", "skills", "contact", "gui", "clear", "help",
    ])
    .unwrap()
}

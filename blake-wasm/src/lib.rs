use wasm_bindgen::prelude::*;

// Bind browser console.log so Rust can write to it directly.
#[wasm_bindgen]
extern "C" {
    #[wasm_bindgen(js_namespace = console, js_name = log)]
    fn console_log(s: &str);
}

macro_rules! log {
    ($($t:tt)*) => (console_log(&format!($($t)*)))
}

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

    log!("[blake-core] dispatching: {:?}", json_input);

    let result = blake_core::run(&json_input);

    log!(
        "[blake-core] exit_code={} clear={} output={}…",
        result.exit_code,
        result.clear_screen,
        result.output.chars().take(80).collect::<String>()
    );

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

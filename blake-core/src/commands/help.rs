use crate::parser::ParsedInput;
use owo_colors::OwoColorize;
use serde_json::json;

pub fn render(parsed: &ParsedInput) -> String {
    if parsed.json {
        return json!({
            "type": "help",
            "commands": [
                {"name": "about",      "desc": "who I am"},
                {"name": "experience", "desc": "where I've worked"},
                {"name": "projects",   "desc": "things I've built"},
                {"name": "skills",     "desc": "what I know"},
                {"name": "contact",    "desc": "how to reach me"},
                {"name": "gui",        "desc": "switch to GUI mode"},
                {"name": "clear",      "desc": "clear the terminal"},
            ],
            "flags": [
                {"name": "--help",    "desc": "show this help"},
                {"name": "--version", "desc": "print version"},
                {"name": "--json",    "desc": "output as JSON"},
            ]
        })
        .to_string();
    }

    let mut out = String::new();
    out.push_str(&format!("{} <command> [flags]\n", "blake".bold()));
    out.push('\n');
    out.push_str(&format!("{}\n", "Commands:".bold()));
    let cmds = [
        ("about",      "who I am"),
        ("experience", "where I've worked"),
        ("projects",   "things I've built"),
        ("skills",     "what I know"),
        ("contact",    "how to reach me"),
        ("gui",        "switch to GUI mode"),
        ("clear",      "clear the terminal"),
    ];
    for (name, desc) in &cmds {
        out.push_str(&format!("  {:<14}{}\n", name.cyan(), desc));
    }
    out.push('\n');
    out.push_str(&format!("{}\n", "Flags:".bold()));
    out.push_str(&format!("  {:<14}{}\n", "--help".yellow(), "show this help"));
    out.push_str(&format!("  {:<14}{}\n", "--version".yellow(), "print version"));
    out.push_str(&format!("  {:<14}{}\n", "--json".yellow(), "output as JSON"));
    out.push('\n');
    out.push_str(&format!("{}", "Type 'blake <command>' to get started.".dimmed()));
    out
}

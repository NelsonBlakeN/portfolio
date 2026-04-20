mod commands;
mod content;
mod parser;

pub use content::{About, Contact, ContactLink, Experience, ExperienceEntry, Project, Projects, SkillCategory, Skills};
pub use parser::ParsedInput;

const VERSION: &str = "1.0.0";

#[derive(Debug, Clone)]
pub struct RunResult {
    pub output: String,
    pub exit_code: i32,
    pub clear_screen: bool,
}

impl RunResult {
    fn ok(output: impl Into<String>) -> Self {
        Self { output: output.into(), exit_code: 0, clear_screen: false }
    }

    fn clear() -> Self {
        Self { output: String::new(), exit_code: 0, clear_screen: true }
    }

    fn err(output: impl Into<String>) -> Self {
        Self { output: output.into(), exit_code: 1, clear_screen: false }
    }
}

pub fn run(input: &str) -> RunResult {
    let parsed = parser::parse(input);

    if parsed.version {
        return RunResult::ok(commands::version::render(&parsed));
    }

    if parsed.command.is_empty() || parsed.help {
        return RunResult::ok(commands::help::render(&parsed));
    }

    match parsed.command.as_str() {
        "help"       => RunResult::ok(commands::help::render(&parsed)),
        "about"      => RunResult::ok(commands::about::render(&parsed)),
        "experience" => RunResult::ok(commands::experience::render(&parsed)),
        "projects"   => RunResult::ok(commands::projects::render(&parsed)),
        "skills"     => RunResult::ok(commands::skills::render(&parsed)),
        "contact"    => RunResult::ok(commands::contact::render(&parsed)),
        "clear"      => RunResult::clear(),
        "gui"        => RunResult::ok("__GUI__"),
        cmd          => RunResult::err(format!("blake: command not found: {cmd}")),
    }
}

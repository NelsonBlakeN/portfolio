#[derive(Debug, Default)]
pub struct ParsedInput {
    pub command: String,
    pub args: Vec<String>,
    pub json: bool,
    pub help: bool,
    pub version: bool,
}

pub fn parse(input: &str) -> ParsedInput {
    let tokens: Vec<&str> = input.trim().split_whitespace().collect();
    let mut parsed = ParsedInput::default();
    if tokens.is_empty() {
        return parsed;
    }

    let mut idx = 0;
    if tokens[idx] == "blake" {
        idx += 1;
    }

    // Single pass: collect flags anywhere, treat the first non-flag token as the command.
    for token in &tokens[idx..] {
        match *token {
            "--json"        => parsed.json = true,
            "--help" | "-h" => parsed.help = true,
            "--version" | "-V" => parsed.version = true,
            t if parsed.command.is_empty() => parsed.command = t.to_string(),
            t => parsed.args.push(t.to_string()),
        }
    }

    parsed
}

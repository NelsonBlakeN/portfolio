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
    if idx >= tokens.len() {
        return parsed;
    }

    match tokens[idx] {
        "--help" | "-h" => { parsed.help = true; return parsed; }
        "--version" | "-V" => { parsed.version = true; return parsed; }
        _ => {}
    }

    parsed.command = tokens[idx].to_string();
    idx += 1;

    while idx < tokens.len() {
        match tokens[idx] {
            "--json"        => parsed.json = true,
            "--help" | "-h" => parsed.help = true,
            other           => parsed.args.push(other.to_string()),
        }
        idx += 1;
    }

    parsed
}

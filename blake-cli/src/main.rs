use blake_core::run;
use clap::{Parser, Subcommand};
use rustyline::{error::ReadlineError, DefaultEditor};

#[derive(Parser)]
#[command(name = "blake", about = "Blake Nelson's CLI portfolio", version = "1.0.0")]
struct Cli {
    #[command(subcommand)]
    command: Option<Command>,

    /// Output as JSON
    #[arg(long, global = true)]
    json: bool,
}

#[derive(Subcommand)]
enum Command {
    About,
    Experience,
    Projects,
    Skills,
    Contact,
    Clear,
}

fn main() {
    let cli = Cli::parse();

    // One-shot mode: subcommand provided
    if let Some(cmd) = cli.command {
        let input = match cmd {
            Command::About      => "about",
            Command::Experience => "experience",
            Command::Projects   => "projects",
            Command::Skills     => "skills",
            Command::Contact    => "contact",
            Command::Clear      => "clear",
        };
        let full = if cli.json { format!("{input} --json") } else { input.to_string() };
        let result = run(&full);
        if !result.output.is_empty() {
            println!("{}", result.output);
        }
        std::process::exit(result.exit_code);
    }

    // REPL mode: no subcommand
    repl();
}

fn repl() {
    println!("{}", run("blake --help").output);
    println!();

    let mut rl = DefaultEditor::new().expect("readline init");
    loop {
        match rl.readline("$ ") {
            Ok(line) => {
                let trimmed = line.trim();
                if trimmed.is_empty() {
                    continue;
                }
                let _ = rl.add_history_entry(trimmed);
                let result = run(trimmed);
                if result.clear_screen {
                    print!("\x1B[2J\x1B[1;1H");
                } else if !result.output.is_empty() {
                    println!("{}", result.output);
                }
                if result.exit_code != 0 {
                    eprintln!("{}", result.output);
                }
            }
            Err(ReadlineError::Interrupted) | Err(ReadlineError::Eof) => break,
            Err(e) => {
                eprintln!("Error: {e}");
                break;
            }
        }
    }
}

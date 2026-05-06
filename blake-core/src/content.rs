use serde::Deserialize;

// ── Raw TOML bytes embedded at compile time ────────────────────────────────────

static ABOUT_TOML: &str      = include_str!("../content/about.toml");
static EXPERIENCE_TOML: &str = include_str!("../content/experience.toml");
static PROJECTS_TOML: &str   = include_str!("../content/projects.toml");
static SKILLS_TOML: &str     = include_str!("../content/skills.toml");
static CONTACT_TOML: &str    = include_str!("../content/contact.toml");

// ── Structs ────────────────────────────────────────────────────────────────────

#[derive(Deserialize, Debug, Clone)]
pub struct About {
    pub name: String,
    pub title: String,
    pub bio: Vec<String>,
    pub github: String,
}

#[derive(Deserialize, Debug, Clone)]
pub struct ExperienceEntry {
    pub title: String,
    pub company: String,
    pub location: String,
    pub start: String,
    pub end: String,
    pub bullets: Vec<String>,
}

#[derive(Deserialize, Debug, Clone)]
pub struct Experience {
    pub entries: Vec<ExperienceEntry>,
}

#[derive(Deserialize, Debug, Clone)]
pub struct Project {
    pub name: String,
    pub year: String,
    pub description: String,
    pub url: Option<String>,
}

#[derive(Deserialize, Debug, Clone)]
pub struct Projects {
    pub projects: Vec<Project>,
    pub note: Option<String>,
}

#[derive(Deserialize, Debug, Clone)]
pub struct SkillCategory {
    pub name: String,
    pub skills: Vec<String>,
}

#[derive(Deserialize, Debug, Clone)]
pub struct Skills {
    pub categories: Vec<SkillCategory>,
    pub note: Option<String>,
}

#[derive(Deserialize, Debug, Clone)]
pub struct ContactLink {
    pub label: String,
    pub url: String,
    pub display: String,
}

#[derive(Deserialize, Debug, Clone)]
pub struct Contact {
    pub links: Vec<ContactLink>,
}

// ── Loaders ────────────────────────────────────────────────────────────────────
// Panic on malformed TOML: content is embedded at compile time and must be valid.

pub fn about()      -> About      { toml::from_str(ABOUT_TOML).expect("about.toml") }
pub fn experience() -> Experience { toml::from_str(EXPERIENCE_TOML).expect("experience.toml") }
pub fn projects()   -> Projects   { toml::from_str(PROJECTS_TOML).expect("projects.toml") }
pub fn skills()     -> Skills     { toml::from_str(SKILLS_TOML).expect("skills.toml") }
pub fn contact()    -> Contact    { toml::from_str(CONTACT_TOML).expect("contact.toml") }

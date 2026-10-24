# my-claude-setup

A snapshot of my Claude (desktop app + Claude Code) setup: plugins, skills, MCP servers, connectors, mods, and settings. No private data, just what's installed and how to reproduce it.

> Install commands run inside Claude Code (`/plugin ...`) or in a terminal (`claude plugin ...`). Restart Claude Code after installing so new plugins load.

## Prerequisites

| Tool | Install |
|---|---|
| Claude desktop app | https://claude.com/download |
| Claude Code | `curl -fsSL https://claude.ai/install.sh \| bash` |
| Homebrew | https://brew.sh |
| Git / GitHub CLI | `brew install git gh` |
| Node.js (npm/npx) | `brew install node` |
| Python + uv | `brew install python uv` |
| Xcode Command Line Tools | `xcode-select --install` |
| Editors / apps | Chrome, VS Code, Obsidian, Figma |

## Plugins

### Official (`claude-plugins-official`)

| Plugin | What it does | Install |
|---|---|---|
| Frontend Design | Design direction for distinctive web UIs | `/plugin install frontend-design@claude-plugins-official` |
| Skill Creator | Create, test, and tune skills | `/plugin install skill-creator@claude-plugins-official` |
| Commit Commands | `/commit`, `/commit-push-pr`, branch cleanup | `/plugin install commit-commands@claude-plugins-official` |
| Code Review | `/code-review` on diffs and PRs | `/plugin install code-review@claude-plugins-official` |
| Feature Dev | Guided feature development with explorer/architect/reviewer agents | `/plugin install feature-dev@claude-plugins-official` |
| Security Guidance | Security-minded guardrails while editing | `/plugin install security-guidance@claude-plugins-official` |
| Claude Code Setup | Recommends automations for a codebase | `/plugin install claude-code-setup@claude-plugins-official` |
| Context7 | Up-to-date library docs (MCP) | `/plugin install context7@claude-plugins-official` |
| Playwright | Browser automation (MCP) | `/plugin install playwright@claude-plugins-official` |
| Serena | Semantic code navigation/editing (MCP) | `/plugin install serena@claude-plugins-official` |
| Superpowers | Workflow skills: brainstorming, plans, TDD, debugging, worktrees, review | `/plugin install superpowers@claude-plugins-official` |

### Community

| Plugin | What it does | Install |
|---|---|---|
| [Ponytail](https://github.com/DietrichGebert/ponytail) | "Laziest working solution" mode, plus audit/review/debt skills | `/plugin marketplace add DietrichGebert/ponytail` then `/plugin install ponytail@ponytail` |
| [Claude-Mem](https://github.com/thedotmack/claude-mem) | Persistent cross-session memory, search, plan/do/babysit skills | `/plugin marketplace add thedotmack/claude-mem` then `/plugin install claude-mem@thedotmack` |
| [Impeccable](https://github.com/pbakaus/impeccable) | Design-quality workflow and agents | `/plugin marketplace add pbakaus/impeccable`, `/plugin install impeccable@impeccable`, then `/impeccable init` |
| [TDD Guard](https://github.com/nizos/tdd-guard) | Enforces test-driven development via hooks | `/plugin marketplace add nizos/tdd-guard` then `/plugin install tdd-guard@tdd-guard` |
| [Clawd Spinner](https://github.com/saiharsha03/clawd-spinner) | Custom spinner for Claude Code | `/plugin marketplace add saiharsha03/clawd-spinner` then `/plugin install clawd-spinner@clawd-spinner` |
| [Obsidian Skills](https://github.com/kepano/obsidian-skills) | Obsidian markdown, Bases, canvas, CLI skills | `/plugin marketplace add kepano/obsidian-skills` then `/plugin install obsidian@obsidian-skills` |

### Synced from claude.ai account

- Cowork Plugin Management (create/customize plugins)
- GitKraken (git GUI integration)

## Standalone skills

| Skill | Source | Install |
|---|---|---|
| [Graphify](https://github.com/Graphify-Labs/graphify) | Turns code/docs/media into a queryable knowledge graph (`/graphify`) | `uv tool install graphifyy` then `graphify install` |
| Apple Design | HIG-style design skill | `npx skills@latest add emilkowalski/skills` |
| [Agent Skills](https://github.com/addyosmani/agent-skills) | Engineering workflow skills | `npx skills add addyosmani/agent-skills` |
| [Find Skills](https://github.com/vercel-labs/skills) | Search the skills ecosystem | `npx skills find <topic>` |

Built-in/bundled skills I also use: document and file tools (docx, pptx, xlsx, pdf), canvas design, scheduling, browser and computer-use guides, `loop`, `simplify`, `security-review`, `claude-api`, and Artifact design/capabilities/diagramming/dataviz skills.

## CLI tools

| Tool | Install |
|---|---|
| [GitHub Spec Kit](https://github.com/github/spec-kit) | `uv tool install specify-cli`, then `specify init <project>` per project |

## MCP servers (user-level)

| Server | Add |
|---|---|
| [Chrome DevTools MCP](https://github.com/ChromeDevTools/chrome-devtools-mcp) | `claude mcp add chrome-devtools -s user -- npx -y chrome-devtools-mcp@latest` |
| [Firecrawl](https://github.com/firecrawl/firecrawl-mcp-server) (planned, needs API key) | `claude mcp add firecrawl -e FIRECRAWL_API_KEY=<your-key> -- npx -y firecrawl-mcp` |

Plugin-provided servers: Claude-Mem search, Context7, Playwright, Serena, GitKraken, GitHub.

## claude.ai connectors

Gmail, Google Calendar, Google Drive, Slack, GitHub, Vercel, Supabase, Figma, Canva, Lovable, Replit, Shopify, Resend, ElevenLabs, Zoom, TickTick, Spotify, BoardRepo, Claude Docs, and a Composio gateway for extra app integrations. Connect them in claude.ai under Settings > Connectors.

## Mods

From my [claude-mods](https://github.com/erte-del/claude-mods) marketplace: `/plugin marketplace add erte-del/claude-mods`, then install any of these.

| Mod | What it does |
|---|---|
| `sidebar` | Live sidebar: model badge, context gauge, cost, usage dial, New chat / Commit & Push / Handoff buttons |
| `commit-push` | One-click stage, commit (Claude-written message) and push |
| `handoff` | One-click `handoff.md`, clear, and continue |
| `repo` | Pick a GitHub repo, clone if needed, move the session into it |
| `restart-ultron-backend` | Restart-backend button, active only in `ULTRON_cBrain` |

## Settings

```jsonc
// ~/.claude/settings.json (generalized)
{
  "theme": "dark",
  "statusLine": { "type": "command", "command": "ccstatusline" },  // npm i -g ccstatusline
  "enabledPlugins": { /* every plugin above is enabled */ },
  "extraKnownMarketplaces": { /* claude-mods, clawd-spinner, ponytail, claude-mem, impeccable, tdd-guard, obsidian-skills */ }
}
```

Global `CLAUDE.md` is minimal: it just routes `/graphify` to the Graphify skill.

## Workflow notes

- Persistent memory via Claude-Mem plus file-based memory.
- Cross-platform projects (macOS and Windows) keep per-platform branches and a `CLAUDE.md` sync protocol.
- Ponytail runs in `full` mode by default.

## Known gotchas

- Networks with SSL interception or a registry block (school/corporate) break `npx`-based installs and npm-launched MCP servers (npm 403s), plus Gradle downloads.
- Some MCP servers need OAuth/auth after install (for example Context7 and Slack).
- Third-party plugins can add hooks and run code. Read a plugin before enabling it.

import type { Register } from 'claude-code'

export const MODELS = {
  haiku: 'claude-haiku-5-5',
  sonnet: 'claude-sonnet-5-5',
  opus: 'claude-opus-5-5',
} as const
type Tier = keyof typeof MODELS

const RUBRIC = `You route a coding assistant's next task to a model. Reply with one word: haiku, sonnet or opus.
haiku: quick questions, small lookups, one-line edits, renames, formatting, chit-chat.
sonnet: normal coding work: features, bug fixes, refactors, tests, explaining code.
opus: hard problems: architecture, tricky debugging, multi-file redesigns, deep research, security.`

// Picked once per prompt, applied to every main-thread request of that turn.
let pick: Tier | undefined

export const register: Register = on => {
  on('prompt.submit', async ($, e, next) => {
    // "!opus fix this" forces a model and strips the prefix.
    const forced = /^!(haiku|sonnet|opus)\b\s*/i.exec(e.text)
    if (forced) {
      pick = forced[1]!.toLowerCase() as Tier
      $.ui.status(`model: ${pick} (forced)`)
      return next({ ...e, text: e.text.slice(forced[0].length) })
    }
    pick = undefined
    const r = await $.model.complete({
      model: MODELS.haiku,
      system: RUBRIC,
      prompt: e.text.slice(0, 4000),
      maxTokens: 5,
    })
    const word = r.isAnswered ? r.text.trim().toLowerCase() : ''
    pick = (Object.keys(MODELS) as Tier[]).find(t => word.startsWith(t))
    $.ui.status(pick ? `model: ${pick} (auto)` : undefined)
    return next(e)
  }).catch(($, e, next) => next(e)) // router failing never blocks a prompt

  on('turn.step', async function* ($, e, next) {
    // Subagents keep their own model.
    if (!pick || e.agentId) return yield* next(e)
    return yield* next({ ...e, model: MODELS[pick] })
  })
}

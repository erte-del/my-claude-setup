import { test, expect } from 'claude-code/testing'

const step = { turnId: 't1', index: 0, model: 'claude-opus-5-5', messageCount: 1 }

for (const tier of ['haiku', 'sonnet', 'opus'] as const) {
  test(`routes to ${tier}`, async ($, on) => {
    let sent = ''
    on('model.complete', () => ({ value: { isAnswered: true, text: tier } }) as never)
    on('prompt.submit', (_$, e) => ({ text: e.text }))
    on('turn.step', async function* (_$, e) {
      sent = e.model
      return { turnId: e.turnId, index: e.index, answer: '', toolUses: [], stopReason: 'end_turn', usage: null } as never
    })
    await $.prompt.submit({ text: 'do a thing', wait: false, origin: { kind: 'composer' } } as never)
    const s = $.turn.step(step)
    for await (const _ of s);
    expect(sent).toBe(`claude-${tier}-5-5`)
  })
}

test('leaves subagents alone', async ($, on) => {
  let sent = ''
  on('model.complete', () => ({ value: { isAnswered: true, text: 'haiku' } }) as never)
  on('prompt.submit', (_$, e) => ({ text: e.text }))
  on('turn.step', async function* (_$, e) {
    sent = e.model
    return { turnId: e.turnId, index: e.index, answer: '', toolUses: [], stopReason: 'end_turn', usage: null } as never
  })
  await $.prompt.submit({ text: 'x', wait: false, origin: { kind: 'composer' } } as never)
  for await (const _ of $.turn.step({ ...step, agentId: 'a1' }));
  expect(sent).toBe('claude-opus-5-5')
})

test('!opus forces opus and strips the prefix', async ($, on) => {
  let sent = ''
  let text = ''
  let classified = false
  on('model.complete', () => { classified = true; return { value: { isAnswered: true, text: 'haiku' } } as never })
  on('prompt.submit', (_$, e) => { text = e.text; return { text: e.text } })
  on('turn.step', async function* (_$, e) {
    sent = e.model
    return { turnId: e.turnId, index: e.index, answer: '', toolUses: [], stopReason: 'end_turn', usage: null } as never
  })
  await $.prompt.submit({ text: '!opus redesign auth', wait: false, origin: { kind: 'composer' } } as never)
  for await (const _ of $.turn.step({ ...step, model: 'claude-haiku-5-5' }));
  expect(sent).toBe('claude-opus-5-5')
  expect(text).toBe('redesign auth')
  expect(classified).toBe(false)
})

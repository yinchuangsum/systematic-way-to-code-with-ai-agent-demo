<!-- Generated from materials/templates/PRD-template.md by materials/sync_repo_templates.py.
     Do not edit this copy: edit the template in the course kit, then re-run
     the script. -->

# PRD-<NNN>: <Feature name>

> Owner: <name> · Date: <YYYY-MM-DD> · Status: draft | approved
>
> One page of decisions. The numbered user-story list may run beyond it.

## 1. Problem

The problem the user faces, from the user's perspective. Two or three sentences.
What is broken or missing, who feels it, and what happens if nothing changes.

No solution language. If the feature name appears in this section, rewrite it.

## 2. Solution

The outcome the user gets, from the user's perspective. What they can do
afterwards that they cannot do today.

No architecture. Modules, classes, tables and endpoints belong in §4.

## 3. User stories

Numbered. One capability each, in this form:

> As a <role>, I want <capability>, so that <benefit>.

Be extensive: every path, every error, every role. The list is the inventory the
rest of the document draws from.

1. As a <role>, I want <capability>, so that <benefit>.
2. As a <role>, I want <capability>, so that <benefit>.

Every story must appear in the acceptance table in §5. A story with no test is a
wish.

## 4. Implementation decisions

Decisions already made — not a plan of work.

- Modules built or modified (name them, not the files)
- Interfaces or contracts that change: request and response shapes, error codes
- Technical clarifications and architectural decisions
- Schema changes
- API contracts
- Specific interactions

**No file paths. No code snippets.** They are stale before the sprint ends.

Exception: a prototype snippet that encodes a decision more precisely than prose
can — a state machine, reducer, schema, or type shape. Inline it in the relevant
decision, trim it to the decision-rich part, and note that it came from a
prototype. Not a working demo.

## 5. Testing decisions

- A good test asserts **external behaviour**: input in, observable output out.
  Never internal structure.
- Which modules are tested, and which are deliberately not.
- Prior art: the existing tests this one should look like.
- The acceptance table:

| # | Story | Criterion (input → expected) | Test name |
|---|---|---|---|
| 1 | | | |

No adjectives ("fast", "intuitive", "robust") unless they have a number attached.
Exact error codes, exact totals, exact boundaries.

These tests are written before the agent starts, and they are read-only
afterwards.

## 6. Out of scope

Non-goals: temptations you are refusing in advance, not values you already hold.

- <thing that sounds related but is not being built>
- <edge case we are deliberately deferring>

If nobody would be tempted by it, it is filler — delete it.

## 7. Further notes

Links to ADRs, open questions with an owner and a date, anything the next reader
needs and nothing else.

Open questions must be **empty** before the agent starts. If it is not decided,
it is not ready.

The definition of done lives in `AGENTS.md`, where the exact commands are. It is
not repeated here.

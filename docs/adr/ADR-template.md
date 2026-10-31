<!-- Generated from materials/templates/ADR-template.md by materials/sync_repo_templates.py.
     Do not edit this copy: edit the template in the course kit, then re-run
     the script. -->

# ADR-<NNN>: <Short decision title in the imperative>

> One page. One decision. If you need two decisions, write two ADRs.
>
> Date: <YYYY-MM-DD>

## Status

`proposed` | `accepted` | `superseded by ADR-<NNN>`

A decision has a lifecycle. Say which stage this one is at.

## Context

The forces at play, in 3–6 sentences. What changed, what constraint is real, and
what breaks if no decision is made. Include the numbers that make this concrete
(traffic, money, latency, team size). Do not describe the solution here.

## Decision

**We will <do the thing>.**

State it as a complete sentence that someone could disagree with. Name the
boundary: what code, module, or behaviour this governs.

## Alternatives considered

This is the give: what you refused, and why.

| Alternative | Why we did not choose it |
|---|---|
| <option B> | <concrete reason, not "worse"> |
| <option C> | <concrete reason> |

Two alternatives minimum. An ADR with no alternatives is a note, not a decision.

## Consequences

This is the take: what it costs you to have decided this way.

**Positive**
- <what gets easier>

**Negative**
- <what gets harder, slower, or more expensive — be honest>

**Follow-ups**
- <ADR or ticket this creates>

## Reversibility

How expensive is it to undo? `cheap` / `medium` / `one-way door`, and why.
One-way doors get more review and a spike before acceptance.

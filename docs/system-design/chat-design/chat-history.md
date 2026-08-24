# Chat History

## Purpose

The Chat History system stores and organizes the conversations between the user and the AI.

A chat represents a continuous conversational context within a study interaction. Each chat contains messages exchanged between the user and the AI.

---

## Core Concept

A `Chat` is composed of:

- Metadata about the conversation.
- A collection of `Messages`.

The first user message starts the conversation. The AI uses this initial message to generate a short title that represents what it understands the conversation is about.

Example:

```text
User:
"I want to understand how derivatives work."

AI-generated title:
"Introduction to Derivatives"
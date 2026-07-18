# Domain Model

## 1. Introduction

### Purpose

This document defines the business domain of AI Study Helper.

Its purpose is to describe the core concepts, business rules, workflows, and relationships that make up the adaptive learning system, independently of any technology or implementation.

The domain serves as the foundation for the system architecture and ensures that every engineering decision remains aligned with the business.

---

## 2. Domain Objective

The objective of AI Study Helper's domain is to maximize learning efficiency by continuously understanding how each student learns and adapting future learning experiences based on evidence collected throughout their learning journey.

Rather than simply generating educational content, the system models the complete learning process, allowing every interaction to contribute to future personalization.

---

## 3. Core Concepts

### Student

Represents the individual using AI Study Helper to learn.

The student is the center of the domain. Every concept exists to improve the student's learning experience.

Responsibilities:

- Upload study material.
- Participate in study sessions.
- Interact with learning activities.
- Generate learning evidence through their behavior.

---

### Learning input

Represents any educational resource provided by the student.

Examples include:

- Documents
- Text requests
- Images
- Audio
- URLs

Learning input acts as the source from which personalized learning experiences are generated.

---

### Study Session

Represents one complete learning interaction between a Student and AI Study Helper.

A Study Session begins when personalized learning activities are presented to the Student and ends when the interaction concludes. Throughout the session, Learning Observations are collected from the Student's interactions, contributing to future personalization.

A session may include:

- Explanations
- Quizzes
- Flashcards
- Analogies
- Interactive questions
- Practical exercises
- Other adaptive learning activities

Every completed Study Session contributes to improving future sessions.

---

### Learning Profile

Represents the platform's current understanding of how a particular student learns.

Unlike personal account information, the Learning Profile evolves continuously as the student interacts with the platform.

It may contain:

- Preferred learning methods
- Learning strengths
- Learning weaknesses
- Knowledge trends
- Adaptation history
- Engagement patterns

The Learning Profile represents the platform's current understanding of the student and is derived from accumulated Learning Evidence.

---

### Learning Observation

Represents raw data collected during a Study Session.

Learning Observations are objective facts about how the student interacted with the learning experience. By themselves, they do not indicate whether a learning strategy is effective or ineffective.

Examples include:

- Answers submitted
- Time spent on activities
- Hints requested
- Learning activities completed
- Explanations skipped
- Review actions
- Navigation patterns

Learning Observations serve as the input for Learning Analysis.

---

### Learning Analysis

Represents the process of interpreting Learning Observations.

Its purpose is to identify meaningful patterns that describe how effectively a student learns under different conditions.

Learning Analysis transforms raw observations into Learning Evidence.

---

### Learning Evidence

Represents validated conclusions about how a student learns, derived from patterns identified across multiple Learning Observations and Study Sessions.

Unlike Learning Observations, which capture raw interactions, Learning Evidence reflects reliable insights that can confidently guide personalization decisions. Every piece of Learning Evidence must be actionable, enabling the Adaptive Learning Engine to make better instructional decisions and continuously improve future learning experiences.

Examples include:

- Repeated misconceptions about specific concepts.
- Demonstrates consistent long-term retention of learned concepts.
- Performs better with certain learning methods than with others.

---

### Adaptive Learning Engine

Represents the decision-making component responsible for personalizing future learning experiences.

Using the Learning Profile and validated Learning Evidence, the Adaptive Learning Engine determines which teaching strategies should be applied during future Study Sessions.

Its goal is continuous optimization rather than immediate perfection.

---

### Learning Strategy

Represents a teaching methodology that can be selected by the Adaptive Learning Engine.

Examples include:

- Spaced Repetition
- Analogical Learning
- Question-Based Learning
- Practical Examples
- Progressive Explanations

Learning Strategies are dynamic and may change as more evidence becomes available.

---

## 4. Domain Workflow

The domain follows a continuous learning cycle that continuously improves the student's learning experience through observation, analysis, validation, and adaptation.

1. A Student provides one or more Learning Inputs.
2. The platform processes the Learning Inputs and prepares them for learning.
3. A personalized Study Session is generated.
4. The Student interacts with learning activities during the Study Session.
5. Learning Observations are collected from the student's interactions.
6. Learning Analysis evaluates the collected observations to identify potential learning patterns.
7. Validated conclusions are stored as Learning Evidence.
8. The Learning Profile is updated using the accumulated Learning Evidence.
9. The Adaptive Learning Engine uses the Learning Profile and Learning Evidence to determine the most appropriate learning strategies and adaptations.
10. Future Study Sessions are generated with an increasingly personalized learning experience.

---

## 5. Relationships

The following relationships exist between the core concepts.

- A Student owns one Learning Profile.
- A Student can complete many Study Sessions.
- A Study Session is generated from one or more Learning Inputs.
- A Study Session produces many Learning Observations.
- Learning Analysis evaluates Learning Observations.
- Learning Analysis produces Learning Evidence.
- Learning Evidence contributes to the Learning Profile.
- The Adaptive Learning Engine uses the Learning Profile and Learning Evidence to select Learning Strategies.
- Learning Strategies influence future Study Sessions.

---

## 6. Design Principles

The following rules define how the domain behaves.

- Every Student has exactly one Learning Profile.
- Every Study Session belongs to exactly one Student.
- Every completed Study Session generates Learning Evidence.
- Adaptation must always be supported by Learning Evidence.
- Learning Strategies are recommendations, not permanent decisions.
- Learning Profiles evolve continuously.
- Personalization should improve over time.

---
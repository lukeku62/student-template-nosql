# Personal Notes

This directory is for your personal learning notes, insights, and observations.

## Suggested Structure

```
notes/
├── lesson-01-notes.md
├── lesson-02-notes.md
├── lesson-03-notes.md
├── lesson-04-notes.md
├── key-concepts.md
├── cheatsheet.md
└── questions.md
```

## What to Include

### Lesson Notes
- Key concepts from each lesson
- Important commands and patterns
- Things you found difficult
- Insights and "aha!" moments

### Key Concepts
- NoSQL vs SQL differences
- Document modeling strategies
- Aggregation patterns
- Performance optimization rules

### Personal Cheatsheet
Quick reference for:
- Common query operators
- Aggregation stages
- Update operators
- Index creation commands

### Questions
- Concepts you don't fully understand
- Questions to ask instructor
- Topics to review later

## Example Note Structure

```markdown
# Lesson 01 - Fundamentals

## Date: [Date]

### Key Learnings
- Document-oriented databases are flexible with schema
- Embedded documents vs references: trade-offs
- MongoDB uses BSON (Binary JSON) internally

### Commands Learned
```javascript
// Insert
db.collection.insertOne({})

// Find
db.collection.find({ filter })

// Update
db.collection.updateOne({ filter }, { $set: {} })
```

### Challenges
- Understanding when to embed vs reference
- Getting used to JSON-like syntax

### Questions
- How does MongoDB handle transactions?
- What are the limits of document size?

### Next Steps
- Practice more complex embedded documents
- Learn about array operators
```

## Tips

1. **Take notes during class** - Write while learning
2. **Review regularly** - Revisit notes before next lesson
3. **Add examples** - Include code snippets that work
4. **Link concepts** - Connect ideas across lessons
5. **Be honest** - Note what you don't understand

## Keep It Simple

Your notes are for you! Use whatever format helps you learn:
- Bullet points
- Mind maps
- Code examples
- Diagrams
- Questions and answers

The goal is to reinforce learning and have a reference for later.


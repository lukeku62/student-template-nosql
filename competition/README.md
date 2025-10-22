# Competition Submission

This directory will contain your final competition submission.

## Competition Overview

**Format**: Pair Programming (you + 1 partner)  
**Duration**: 3.5 hours  
**Goal**: Build the most performant aggregation pipeline

## What You'll Receive

At the start of the competition:
1. **Problem Statement**: Complex e-commerce analytics challenge
2. **Dataset**: Large dataset (10,000+ documents)
3. **Expected Output**: Sample of correct results
4. **Performance Targets**: Goals to achieve

## What to Submit

```
competition/
├── pipeline.ts           # Your aggregation pipeline implementation
├── indexes.md           # List of indexes you created
├── performance-report.md # explain() output and analysis
└── README.md            # Your approach and documentation
```

## Scoring Criteria

### 1. Correctness (40%)
- ✅ Query returns correct results
- ✅ Handles all edge cases
- ✅ Matches expected output format

### 2. Performance (40%)
- ⚡ Fast execution time
- ⚡ Minimal documents examined
- ⚡ Efficient index usage
- ⚡ Optimized pipeline order

### 3. Elegance (20%)
- 📝 Clean, readable code
- 📝 Well-documented approach
- 📝 Appropriate operator usage
- 📝 Good TypeScript practices

## Preparation Checklist

Before the competition:

- [ ] Review all previous exercises
- [ ] Practice complex aggregation pipelines
- [ ] Master the explain() command
- [ ] Understand index strategies
- [ ] Know your partner's strengths
- [ ] Have MongoDB Compass ready
- [ ] Test your development environment
- [ ] Review competition rules

## During Competition Strategy

### Phase 1: Understand (15 min)
1. Read problem carefully
2. Analyze sample data
3. Identify required collections
4. Discuss approach with partner

### Phase 2: Plan (15 min)
5. Break down problem into steps
6. Identify needed operations
7. Plan index strategy
8. Divide work with partner

### Phase 3: Implement (2 hours)
9. Start with correctness
10. Get basic pipeline working
11. Test with small dataset
12. Verify results match expected

### Phase 4: Optimize (45 min)
13. Run explain() to analyze
14. Create indexes
15. Reorder pipeline stages
16. Test performance improvements
17. Document changes

### Phase 5: Finalize (15 min)
18. Final testing
19. Complete documentation
20. Submit

## Tips for Success

### Correctness First
- Get a working solution before optimizing
- Test with provided sample data
- Verify edge cases

### Performance Optimization
```javascript
// 1. Filter early
{ $match: { /* specific conditions */ } }

// 2. Project to reduce size
{ $project: { /* only needed fields */ } }

// 3. Use indexes
// Create index on match fields before running

// 4. Optimize $lookup
// Consider embedding vs referencing trade-offs

// 5. Limit early when possible
{ $sort: { date: -1 } }, { $limit: 100 }
```

### Pair Programming
- **Driver**: Person typing
- **Navigator**: Person reviewing and planning
- Switch roles every 30 minutes
- Communicate constantly
- Respect each other's ideas

### Using explain()
```javascript
db.collection.explain('executionStats').aggregate(pipeline)
```

Look for:
- `executionTimeMillis` - target < 500ms
- `totalDocsExamined` - minimize this
- `nReturned` - verify count is correct
- `stage: "IXSCAN"` - using indexes (good!)
- `stage: "COLLSCAN"` - full scan (bad!)

### Index Strategy

```javascript
// Single field
db.collection.createIndex({ status: 1 })

// Compound (order matters!)
db.collection.createIndex({ status: 1, createdAt: -1 })

// For $lookup
db.foreignCollection.createIndex({ joinField: 1 })
```

## Common Mistakes to Avoid

- ❌ Not reading problem carefully
- ❌ Optimizing before getting correct results
- ❌ Forgetting to create indexes
- ❌ Not using explain() to verify performance
- ❌ Over-complicating the solution
- ❌ Poor time management
- ❌ Not testing with full dataset

## What to Document

### pipeline.ts
- Clear comments explaining each stage
- Type definitions for intermediate results
- Proper error handling

### indexes.md
```markdown
# Indexes Created

## orders collection
- { status: 1, orderDate: -1 } - Compound index for filtering and sorting
- Reason: Most queries filter by status and sort by date

## products collection  
- { _id: 1 } - Default index, used for $lookup
```

### performance-report.md
- Before and after metrics
- Explain plan analysis
- Optimization decisions
- Performance improvements achieved

### README.md
- Problem understanding
- Solution approach
- Design decisions
- Lessons learned

## Resources Allowed

During competition you may use:
- ✅ MongoDB official documentation
- ✅ Course materials and notes
- ✅ Previous exercise solutions
- ✅ MongoDB Compass
- ✅ TypeScript documentation
- ❌ No ChatGPT or AI assistants
- ❌ No copying from other teams

## After Competition

Whether you win or not, you'll learn:
- How to work under time pressure
- Real-world performance optimization
- Pair programming dynamics
- MongoDB best practices

Review other teams' solutions to see different approaches!

## Good Luck! 🏆

Remember:
- Communication is key
- Correctness before performance
- Use tools (Compass, explain())
- Stay calm and systematic
- Have fun learning!

---

**Tips from Previous Winners**:
- "We tested our pipeline stage by stage"
- "Creating indexes made a 10x difference"
- "Pair programming helped catch mistakes early"
- "Reading the problem twice saved us time"


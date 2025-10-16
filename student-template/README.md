# MongoDB Course - Student Repository

This is your personal repository for the MongoDB & NoSQL Database Course.

## 👤 Student Information

**Name**: [Your Name]  
**GitHub**: [@your-username](https://github.com/your-username)  
**Course Start**: [Date]  
**MongoDB Atlas Cluster**: [Cluster Name]

## 📚 Course Progress

### Lesson 01 - Fundamentals
- [ ] Setup MongoDB Atlas cluster
- [ ] Install MongoDB Compass
- [ ] Complete Part 1 exercises (01-05)
- [ ] Complete Part 2 exercises (06-10)

### Lesson 02 - Queries & Projections
- [ ] Complete Query Operators exercises (01-08)
- [ ] Complete Projections & Sorting exercises (09-13)
- [ ] Complete Basic Aggregations exercises (14-18)

### Lesson 03 - Aggregations & Performance
- [ ] Complete Advanced Aggregations exercises (01-10)
- [ ] Complete Performance & Indexes exercises (11-15)

### Lesson 04 - TypeScript Integration
- [ ] Complete TypeScript Integration exercises (01-05)
- [ ] Participate in final competition

## 🎯 How to Use This Repository

### Issue-Driven Development

Before starting each exercise:

1. **Create an Issue** using the exercise-planning template
2. **Plan your approach** in the issue
3. **Implement the solution**
4. **Test your solution**
5. **Close the issue** when complete

### Directory Structure

```
student-repo/
├── exercises/
│   ├── lesson-01/
│   ├── lesson-02/
│   ├── lesson-03/
│   └── lesson-04/
├── notes/
│   └── [your personal notes]
└── competition/
    └── [competition submission]
```

## 🔧 Setup Instructions

### 1. Install Dependencies

```bash
npm install
```

### 2. Configure MongoDB Connection

```bash
cp .env.example .env
```

Edit `.env` and add your MongoDB Atlas connection string:

```
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/dbname
```

### 3. Test Connection

```bash
npm run test-connection
```

## 📝 Working on Exercises

### Create an Issue First

```bash
# Use GitHub UI or CLI
gh issue create --template exercise-planning.md
```

### Write Your Solution

Place your solution in the appropriate directory:

```
exercises/lesson-01/01-insert-documents.js
exercises/lesson-01/01-insert-documents.md  # Your notes
```

### Test Your Solution

```bash
# Run specific exercise tests (when available)
npm test exercises/lesson-01/01-insert-documents
```

### Commit and Reference Issue

```bash
git add exercises/lesson-01/01-insert-documents.js
git commit -m "Complete exercise 01 - insert documents (#1)"
git push
```

### Close the Issue

Close the issue when your solution is complete and tested.

## 📊 MongoDB Connection

Your MongoDB connection details:

- **Cluster**: [Your Atlas Cluster Name]
- **Database**: `ecommerce` (or as specified in exercises)
- **Collections**: users, products, orders, reviews, carts, inventory

## 🎓 Learning Tips

### Best Practices

1. **Plan First**: Create issues before coding
2. **Test Often**: Verify your queries work correctly
3. **Document**: Add comments to explain your approach
4. **Use Compass**: Visualize your data and test queries
5. **Ask Questions**: Create issues with the question template

### Common Patterns

#### Query Pattern
```javascript
db.collection.find(
  { /* filter */ },
  { /* projection */ }
).sort({ /* sort */ })
```

#### Aggregation Pattern
```javascript
db.collection.aggregate([
  { $match: { /* filter */ } },
  { $project: { /* fields */ } },
  { $group: { /* grouping */ } }
])
```

#### Update Pattern
```javascript
db.collection.updateOne(
  { /* filter */ },
  { $set: { /* updates */ } }
)
```

## 🔍 Using MongoDB Compass

1. **Connect** to your Atlas cluster
2. **Explore** collections and documents
3. **Test queries** before coding
4. **Analyze** with explain plans
5. **Create indexes** for optimization

## 📚 Useful Resources

- [MongoDB Documentation](https://www.mongodb.com/docs/)
- [MongoDB Query Operators](https://www.mongodb.com/docs/manual/reference/operator/query/)
- [Aggregation Pipeline](https://www.mongodb.com/docs/manual/aggregation/)
- [MongoDB University](https://learn.mongodb.com/)
- [Course Main Repository](link-to-course-repo)

## 🏆 Competition Preparation

For the final competition:

1. Review all previous exercises
2. Practice complex aggregation pipelines
3. Learn to use explain() for performance analysis
4. Understand index strategies
5. Practice pair programming with classmates

## 📞 Getting Help

### Technical Issues
- Create an issue using the bug-report template
- Check course repository FAQs
- Ask in class or during office hours

### Concept Questions
- Create an issue using the question template
- Reference specific exercises or concepts
- Review course documentation

### MongoDB Questions
- Check MongoDB official documentation
- Search MongoDB Community Forums
- Review course examples

## ✅ Submission Checklist

Before considering an exercise complete:

- [ ] Issue created with planning
- [ ] Solution implemented
- [ ] Query tested in Compass
- [ ] Solution tested with provided test cases (if any)
- [ ] Code committed with clear message
- [ ] Issue closed with reference to commit

## 🎯 Learning Outcomes

By the end of this course, you will be able to:

- ✅ Understand NoSQL vs SQL trade-offs
- ✅ Design effective MongoDB schemas
- ✅ Write complex queries and aggregations
- ✅ Optimize queries for performance
- ✅ Integrate MongoDB with TypeScript
- ✅ Apply best practices for production

## 📈 Self-Assessment

After each lesson, rate your understanding (1-5):

**Lesson 01**:
- NoSQL concepts: [ /5]
- CRUD operations: [ /5]
- Document structure: [ /5]

**Lesson 02**:
- Query operators: [ /5]
- Projections: [ /5]
- Basic aggregations: [ /5]

**Lesson 03**:
- Advanced aggregations: [ /5]
- Performance optimization: [ /5]
- Indexing: [ /5]

**Lesson 04**:
- TypeScript integration: [ /5]
- Best practices: [ /5]

## 📝 Personal Notes

Add your insights, challenges, and learnings:

### Key Takeaways
- 
- 

### Challenges Faced
- 
- 

### Questions for Review
- 
- 

---

**Good luck with your learning journey! 🚀**

Remember: The goal is to understand, not just complete. Take your time, experiment, and don't hesitate to ask questions.


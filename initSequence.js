const Counter = require('./models/counter');

const initSequence = () => {
  // Create a new document to initialize the sequence
  const sequenceDoc = new Counter({ _id: 'userId' });

  // Save the document to the database
  sequenceDoc.save();
}

module.exports = initSequence;

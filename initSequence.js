const Counter = require('./models/counter');

async function initSequence() {
  try {
    const sequenceDocument = await Counter.findById('userId');
    if (sequenceDocument) {
      console.log('Sequence already exists');
      return;
    }

    const newSequenceDocument = new Counter({
      _id: 'userId',
      sequence_value: 0
    });

    await newSequenceDocument.save();
    console.log('Sequence initialized');
  } catch (error) {
    console.error('Error initializing sequence:', error);
  }
}

module.exports = initSequence;

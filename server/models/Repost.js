const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const RepostSchema = new Schema({
  dateCreated: { type: Date, required: [true] },
  id: { type: String, required: [true] },
  status: { type: String, required: [true] },
  group: { type: String, required: [true] },
  city: { type: String, required: [true] },
});

const Repost = mongoose.model('repost', RepostSchema);

module.exports = Repost;

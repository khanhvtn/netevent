const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

/**
 *  =====================================
 *            EVENT TYPE MODEL
 *  =====================================
 */

const eventTypeSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Name can not be blanked'],
      unique: true,
      trim: true
    },
    isDeleted: {
      type: Boolean,
      default: false
    }
  },
  { timestamps: true }
);

// Apply the uniqueValidator plugin
eventTypeSchema.plugin(uniqueValidator, {
  message: `{VALUE} is already existed`
});

const eventTypeModel = mongoose.model('EventType', eventTypeSchema);

module.exports = eventTypeModel;

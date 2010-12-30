var mongoose = require('mongoose').Mongoose;

module.exports = mongoose.model('Phrase', {

    properties: ['phrase'],

    cast: {
      phrase: String
    },

    indexes: ['phrase'],

    static: {
        getNext: function(played){
            return this.find({phrase: { '$nin': played }});
        }
    }

});
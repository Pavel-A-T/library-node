const uidGenerator = require('node-unique-id-generator');

class Book {
    constructor(title = "", description = "", favorite = "",
                fileCover = "", fileName = "", id = uidGenerator.generateUniqueId(),) {
        this.id = id;
        this.title = title;
        this.description = description;
        this.favorite = favorite;
        this.fileCover = fileCover;
        this.fileName = fileName;

    }
}

module.exports = Book;

class books{
constructor(title, author, bn){
    this.title = title;
    this.author = author;
    this.bn = bn;
    this.isavailable = true;
}

borrow(){
    if(this.available){
        this.available = false;
        return `${this.title} has been borrowed.`;
    }else{
        return `${this.title} is not available.`;
    }
}
returnBook(){
    this.isavailable = true
    return `${this.title} has been returned.`;
}
}

class Library{
    constructor(name){
        this.name = name;
        this.books =[];
    }

    addBook(book){
        this.books.push(book);
        displayBooks();
    }

    removeBook(bn){
        this.books = this.books.filter(book => book.bn !==book);
        displayBooks();
    }

    displayBooks(){
        const bookList = document.getElementById("bookList").innerHTML = "";
        this.books.forEach(book => {
            const bookItem = document.createElement("Div");
            bookItem.className = "book";
            bookItem.innerHTML = `
            ${book.title} by ${book.author} (bn: ${book.bn})
            <span class = "${book.isavailable ? "available" : "borrowed"}">[${book.isavailable ? "available" : "borrowed"}]
            </span>
            <button onclick= "library.borrowBook('${book.bn}')">Borrow</button>
            <button onclick= "library.returnBook('${book.bn}')">Return</button>
            <button onclick= "library.removeBook('${book.bn}')">Remove</button>

            `;
            bookList.appendChild(bookItem);

        });
     
    }

     borrowBook(bn){
                const book = this.books.find(b => b.bn === bn);
                if(book){ alert(book.borrow())};
                this.displayBooks();
            }

    removeBook(bn){ 
        const book = this.books.find(b => b.bn === bn);
        if (book){ alert(book.returnBook())};
        this.displayBooks();
    }
}

// ....... the Real App Logic.............

const library = new library(" City Library");
document.getElementById("addbtn").addEventListener("click", () => {
    const title =  document.getElementById("title").value;
    const author = document.getElementById("author").value;
})

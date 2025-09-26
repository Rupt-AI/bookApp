class Book {
  constructor(title, author, isbn, isAvailable = true) {
    this.title = title;
    this.author = author;
    this.isbn = isbn;
    this.isAvailable = isAvailable;
  } 

 borrow() {
    if (this.isAvailable) {
      this.isAvailable = false;
      return `${this.title} has been borrowed.`;
    } else {
      return `${this.title} is not available.`;
    }
  }

  returnBook() {
    this.isAvailable = true;
    return `${this.title} has been returned.`;
  }
}

class Library {
  constructor(name) {
    this.name = name;
    this.books = this.loadFromStorage();
    this.displayBooks();
  }

  saveToStorage(){
    localStorage.setItem("librarybooks", JSON.stringify(this.books))
  }

  loadFromStorage(){
  const data = JSON.parse(localStorage.getItem("librarybooks")) || [];
  return(data.map(b =>new Book(b.title, b.author, b.isbn, b.isAvailable)))
  }

  addBook(book) {
    this.books.push(book);
    this.saveToStorage();
    this.displayBooks();
  }

  removeBook(isbn) {
    this.books = this.books.filter(book => book.isbn !== isbn);
    this.saveToStorage();
    this.displayBooks();
  }

  displayBooks() {
    const bookList = document.getElementById("bookList");
    bookList.innerHTML = "";

    this.books.forEach(book => {
      const bookDiv = document.createElement("div");
      bookDiv.className = "book";
      bookDiv.innerHTML = `
        <strong>${book.title}</strong> by ${book.author} (ISBN: ${book.isbn}) 
        <span class="${book.isAvailable ? "available" : "borrowed"}">
          [${book.isAvailable ? "Available" : "Borrowed"}]
        </span>
        <button onclick="library.borrowBook('${book.isbn}')">Borrow</button>
        <button onclick="library.returnBook('${book.isbn}')">Return</button>
        <button onclick="library.removeBook('${book.isbn}')">Remove</button>
      `;
      bookList.appendChild(bookDiv);
    });
  }

    borrowBook(isbn) {
    const book = this.books.find(b => b.isbn === isbn);
    if (book) alert(book.borrow());
    this.saveToStorage();
    this.displayBooks();
  }


   returnBook(isbn) {
    const book = this.books.find(b => b.isbn === isbn);
    if (book) alert(book.returnBook());
    this.saveToStorage();
    this.displayBooks();
  }
}


// ....... the Real App Logic.............

const library = new Library("City Library");

document.getElementById("addBookBtn").addEventListener("click", () => {
  const title = document.getElementById("title").value;
  const author = document.getElementById("author").value;
  const isbn = document.getElementById("isbn").value;

  if (title && author && isbn) {
    const newBook = new Book(title, author, isbn);
    library.addBook(newBook);

    document.getElementById("title").value = "";
    document.getElementById("author").value = "";
    document.getElementById("isbn").value = "";
  } else {
    alert("Please fill in all fields.");
  }
});



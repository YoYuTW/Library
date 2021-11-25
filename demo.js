let myLibrary = JSON.parse(localStorage.getItem('Library'));
const bookCase = document.querySelector("#bookCase");
const addBook = document.querySelector("#addBook");
const addBookForm = document.querySelector("#addBookForm");
const addBookSubmit = document.querySelector("#submit");
addBook.addEventListener("click",()=>{
    addBook.classList.add("invisiable");
    addBookForm.classList.remove("invisiable");
    Array.from(addBookForm.childNodes).forEach((e) => e.required = true);
})
addBookSubmit.addEventListener("click",addBookToLibrary);
displayBooks(myLibrary);

class Book {
    constructor(title,author,pages,read) {
        this.title = title,
        this.author = author,
        this.pages = pages,
        this.read = read
    }
    info() { console.log(`${this.name} by ${this.author}, ${this.pages}, ${this.read}`); }
}

function addBookToLibrary(){
    const [title,author,pages,reads] = [document.getElementsByName('title')[0],
                                        document.getElementsByName('author')[0],
                                        document.getElementsByName('pages')[0],
                                        document.getElementsByName('read')[0]];                                                       
    if ([title,author,pages].some((element) => !element.checkValidity())){   
        console.log('error')
        
    }
    else {
    console.log(reads);
    const newBook = new Book(title.value,author.value,pages.value,reads.value);
    console.log(newBook);
    myLibrary.push(newBook);
    displayBooks(myLibrary);    
    
    Array.from([title,author,pages]).forEach((input) => input.value = "");
    
    addBook.classList.remove("invisiable");
    [title,author,pages,reads].forEach((e) => e.required = false);
    addBookForm.classList.add("invisiable");
    localStorage.setItem('Library',JSON.stringify(myLibrary));    
    }
}

function displayBooks(myLibrary){
    myLibrary.forEach((book,serial) => {
        if(!document.querySelector(`#book${serial}`)){        
            let bookDiv = document.createElement("div");
            let bookTitle = document.createElement('div');
            let bookAuthor = document.createElement('div');
            let bookPages = document.createElement('div');
            let bookHaveRead = document.createElement('button');            
            let bookRemove = document.createElement('button');
            bookDiv.id = `book${serial}`;
            bookDiv.classList.add('book');
            bookTitle.classList.add('bookData','bookTitle');
            bookTitle.textContent = book.title;
            bookAuthor.classList.add('bookData','bookAuthor');
            bookAuthor.textContent = book.author;
            bookPages.classList.add('bookData','bookPages');
            bookPages.textContent = `${book.pages} pages`;
            bookHaveRead.classList.add('bookButton');
            bookHaveRead.textContent = book.read;
            bookRemove.classList.add('bookButton');
            bookRemove.classList.add('bookButton');
            bookRemove.textContent = 'Remove';
            bookDiv.appendChild(bookTitle);
            bookDiv.appendChild(bookAuthor);
            bookDiv.appendChild(bookPages);
            bookDiv.appendChild(bookHaveRead);
            bookDiv.appendChild(bookRemove);
            bookCase.appendChild(bookDiv);
            bookHaveRead.addEventListener('click',changeReadStatus);
            bookRemove.addEventListener('click',removeBook);
        }
    });
}

function changeReadStatus(e){
    console.log(myLibrary[e.currentTarget.parentNode.id.replace('book','')]); //this help you to find out the book's id
    if(e.target.textContent === 'Have read'){
        e.target.textContent = "Not read yet";
        myLibrary[e.currentTarget.parentNode.id.replace('book','')].read = 'Not read yet'; //change the reading status in myLibrary
    }
    else{
        e.target.textContent = "Have read";
        myLibrary[e.currentTarget.parentNode.id.replace('book','')].read = 'Have read';
    }
    console.log(myLibrary[e.currentTarget.parentNode.id.replace('book','')]);
}

function removeBook(e){
    console.log(myLibrary[e.currentTarget.parentNode.id.replace('book','')]);
    if(window.confirm(`Are you sure to remove "${e.target.parentNode.querySelector(".bookTitle").textContent}"`)){
        e.target.parentNode.remove();
        myLibrary.splice(e.currentTarget.parentNode.id.replace('book',''),1);
        localStorage.setItem('Library',JSON.stringify(myLibrary));
    }
    console.log(myLibrary[e.currentTarget.parentNode.id.replace('book','')]);
}

function storageBookList(myLibrary){
    localStorage.setItem('Library',JSON.stringify(myLibrary));
}

function checkFormValidaity() {
    
}